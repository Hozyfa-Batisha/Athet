import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { loadConfig } from "../server/config.js";
import { openDatabase, migrate } from "../server/db/index.js";
import { createApp } from "../server/app.js";
import { hashPassword, verifyPassword, clientAddress, RateLimiter } from "../server/lib/security.js";
import { validatePassword } from "../server/lib/validation.js";
import { LoginThrottle } from "../server/services/login-throttle.js";
import { createUser } from "../server/repositories/users.js";
import { importLegacy } from "../server/services/legacy-import.js";

let db, config, server, origin, teacherA, teacherB;
test("new passwords use exactly six digits", () => {
  assert.equal(validatePassword("123456"), "123456");
  assert.equal(validatePassword("١٢٣٤٥٦"), "١٢٣٤٥٦");
  for (const invalid of ["12345", "1234567", "abcdef", "12345a"])
    assert.throws(() => validatePassword(invalid));
});
async function listen() {
  server = createApp({ db, config });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  config.publicUrl = origin;
}
async function closeServer() {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
}
before(async () => {
  config = loadConfig({ DB_DRIVER: "pglite", IMPORT_LEGACY_ON_START: "false" });
  db = await openDatabase(config);
  await migrate(db, config.root);
  await listen();
});
after(async () => {
  await closeServer();
  await db.close();
});

async function request(
  route,
  {
    account,
    data,
    method = data ? "POST" : "GET",
    csrf = true,
    headers = {},
    body,
  } = {},
) {
  const h = { Origin: origin, ...headers };
  if (account) {
    h.Cookie = account.cookie;
    if (csrf) h["X-CSRF-Token"] = account.csrf;
  }
  if (data) {
    h["Content-Type"] = "application/json";
    body = JSON.stringify(data);
  }
  return fetch(origin + route, {
    method,
    headers: h,
    body,
    redirect: "manual",
  });
}
async function signup(username, route = "/signup") {
  const body = new URLSearchParams({
    name: username,
    pass: "123456",
    pass2: "123456",
    phone: "01012345678",
  });
  const response = await request(route, {
    method: "POST",
    body: body.toString(),
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  assert.equal(response.status, 303);
  const cookieHeader = response.headers.get("set-cookie");
  assert.match(cookieHeader, /HttpOnly/);
  assert.match(cookieHeader, /SameSite=Strict/);
  assert.doesNotMatch(cookieHeader, /Max-Age|Expires/);
  if (route === "/setup")
    await db.query("UPDATE users SET role='user' WHERE username=$1", [username]);
  const account = { cookie: cookieHeader.split(";")[0] };
  account.csrf = (
    await (await request("/api/bootstrap", { account })).json()
  ).csrfToken;
  assert.equal(account.csrf.length, 64);
  return account;
}

test("authentication gates APIs and protects first-run setup", async () => {
  assert.equal((await request("/api/schedule")).status, 401);
  const guestHome = await request("/");
  assert.equal(guestHome.status, 200);
  assert.match(await guestHome.text(), /"me":null/);
  assert.equal((await request("/login")).headers.get("location"), "/setup");
  teacherA = await signup("teacher-a", "/setup");
  teacherB = await signup("teacher-b");
  const guestPage = await request("/");
  assert.equal(guestPage.status, 200);
  assert.match(await guestPage.text(), /id="profile-login"/);
  assert.equal((await request("/api/me")).status, 401);
  assert.equal((await request("/games/hurufi.html")).headers.get("location"), "/login");
  assert.equal((await request("/setup")).headers.get("location"), "/login");
  const profile = await (
    await request("/api/me", { account: teacherA })
  ).json();
  assert.equal(profile.user, "teacher-a");
  assert.match(profile.avatar, /^preset:[0-6]$/);
  assert.equal(profile.isVip, false);
  assert.ok(!("password_hash" in profile));
  const duplicate = await request("/signup", {
    method: "POST",
    body: new URLSearchParams({
      name: "TEACHER-A",
      pass: "123456",
      pass2: "123456",
      phone: "01012345678",
    }).toString(),
  });
  assert.equal(duplicate.status, 409);
});

test("accounts can sign in with the registered name and correct password", async () => {
  const response = await request("/login", {
    method: "POST",
    body: new URLSearchParams({
      name: "teacher-a",
      pass: "123456",
    }).toString(),
  });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("location"), "/");
  assert.match(response.headers.get("set-cookie"), /^sid=/);

  const rejected = await request("/login", {
    method: "POST",
    body: new URLSearchParams({
      name: "teacher-a",
      pass: "wrong-password",
    }).toString(),
  });
  assert.equal(rejected.status, 401);
  assert.match(await rejected.text(), /الاسم أو كلمة السر غير صحيحة/);
});

test("failed logins trigger a timed wait that survives a fresh server instance", async () => {
  await db.query("DELETE FROM login_attempts");
  const isolatedConfig = { ...config };
  const isolated = createApp({ db, config: isolatedConfig });
  await new Promise((resolve) => isolated.listen(0, "127.0.0.1", resolve));
  const localOrigin = `http://127.0.0.1:${isolated.address().port}`;
  isolatedConfig.publicUrl = localOrigin;
  const submit = (password) => fetch(`${localOrigin}/login`, {
    method: "POST",
    headers: { Origin: localOrigin, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ name: "teacher-a", pass: password }),
    redirect: "manual",
  });
  try {
    for (let i = 0; i < 4; i++)
      assert.equal((await submit("wrong-password")).status, 401);
    const locked = await submit("wrong-password");
    assert.equal(locked.status, 429);
    assert.equal(locked.headers.get("retry-after"), "30");
    const secondServer = await request("/login", {
      method: "POST",
      body: new URLSearchParams({ name: "teacher-a", pass: "123456" }).toString(),
    });
    assert.equal(secondServer.status, 429);
  } finally {
    isolated.closeAllConnections();
    await new Promise((resolve) => isolated.close(resolve));
    await db.query("DELETE FROM login_attempts");
  }
});

test("login wait expires and a successful login resets failed attempts", async () => {
  let now = Date.now();
  const throttle = new LoginThrottle(db, () => now);
  const key = throttle.key("reset-check", "127.0.0.2");
  try {
    for (let i = 0; i < 4; i++) await throttle.fail(key);
    await assert.rejects(throttle.fail(key), { status: 429 });
    now += 31_000;
    await throttle.check(key);
    await throttle.clear(key);
    await throttle.fail(key);
    assert.equal((await db.query("SELECT failures FROM login_attempts WHERE key_hash=$1", [key])).rows[0].failures, 1);
  } finally {
    await throttle.clear(key);
  }
});

test("new password hashes are strengthened while old hashes remain valid", async () => {
  const current = await hashPassword("123456");
  assert.match(current.salt, /^s2:/);
  assert.equal(await verifyPassword("123456", { password_salt: current.salt, password_hash: current.hash }), true);
  const legacy = await hashPassword("123456", "legacy-salt");
  assert.equal(await verifyPassword("123456", { password_salt: legacy.salt, password_hash: legacy.hash }), true);
});

test("forwarded client addresses are trusted only when explicitly configured", () => {
  const req = { headers: { "x-forwarded-for": "203.0.113.4" }, socket: { remoteAddress: "127.0.0.1" } };
  assert.equal(clientAddress(req, { trustProxy: false }), "127.0.0.1");
  assert.equal(clientAddress(req, { trustProxy: true }), "203.0.113.4");
  req.headers["x-forwarded-for"] = "203.0.113.4, 127.0.0.1";
  assert.equal(clientAddress(req, { trustProxy: true }), "127.0.0.1");
});

test("legacy accounts can sign in with their displayed name", async () => {
  const credentials = await hashPassword("legacy-correct-password");
  await createUser(db, {
    username: "legacy-login-user",
    name: "الاسم القديم",
    phone: "01012345678",
    ...credentials,
  });

  const response = await request("/login", {
    method: "POST",
    body: new URLSearchParams({
      name: "الاسم القديم",
      pass: "legacy-correct-password",
    }).toString(),
  });
  assert.equal(response.status, 303);
  assert.equal(response.headers.get("location"), "/");
  assert.match(response.headers.get("set-cookie"), /^sid=/);
});

test("login and signup forms expose a single name field", async () => {
  const login = await (await request("/login")).text();
  const signupPage = await (await request("/signup")).text();
  assert.match(login, /name="name"/);
  assert.doesNotMatch(login, /name="user"/);
  assert.match(signupPage, /name="name"/);
  assert.doesNotMatch(signupPage, /name="user"/);
});
test("VIP status follows its expiry and removing a custom avatar restores the account preset", async () => {
  await db.query("UPDATE users SET vip_until=now() + interval '1 day' WHERE username='teacher-a'");
  const active = await (await request("/api/me", { account: teacherA })).json();
  assert.equal(active.isVip, true);

  await db.query("UPDATE users SET vip_until=now() - interval '1 second' WHERE username='teacher-a'");
  const expired = await (await request("/api/me", { account: teacherA })).json();
  assert.equal(expired.isVip, false);
  await db.query("UPDATE users SET vip_until=NULL WHERE username='teacher-a'");

  const before = expired.avatar;
  const removed = await request("/api/avatar", { account: teacherA, data: { image: "" } });
  const result = await removed.json();
  assert.equal(removed.status, 200);
  assert.equal(result.avatar, before);
});

test("trial ends after seven days while active VIP keeps access", async () => {
  await db.query("UPDATE users SET created_at=now() - interval '8 days', vip_until=NULL WHERE username='teacher-b'");
  const expired = await (await request("/api/me", { account: teacherB })).json();
  assert.ok(new Date(expired.trialEndsAt).getTime() < Date.now());
  assert.equal(expired.isVip, false);
  await db.query("UPDATE users SET vip_until=now() + interval '1 day' WHERE username='teacher-b'");
  const subscribed = await (await request("/api/me", { account: teacherB })).json();
  assert.ok(new Date(subscribed.vipUntil).getTime() > Date.now());
  assert.equal(subscribed.isVip, true);
  await db.query("UPDATE users SET created_at=now(), vip_until=NULL WHERE username='teacher-b'");
});
test("admin accounts are routed to the admin page and blocked from app APIs", async () => {
  await db.query("UPDATE users SET role='admin' WHERE username='teacher-b'");
  try {
    const home = await request("/", { account: teacherB });
    assert.equal(home.status, 303);
    assert.equal(home.headers.get("location"), "/admin");
    const dashboard = await request("/admin", { account: teacherB });
    assert.equal(dashboard.status, 200);
    const dashboardHtml = await dashboard.text();
    assert.match(dashboardHtml, /إدارة الحسابات/);
    assert.match(dashboardHtml, /action="\/logout"/);
    assert.match(dashboardHtml, /تسجيل الخروج/);
    assert.equal((await request("/api/me", { account: teacherB })).status, 403);
  } finally {
    await db.query("UPDATE users SET role='user' WHERE username='teacher-b'");
  }
});
test("admin can grant and revoke VIP while ordinary accounts cannot", async () => {
  const target = (await db.query("SELECT id FROM users WHERE username='teacher-a'")).rows[0].id;
  const until = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  const body = new URLSearchParams({ user_id: target, vip_until: until }).toString();
  await db.query("UPDATE users SET role='admin' WHERE username='teacher-b'");
  try {
    const denied = await request("/admin", { account: teacherA, method: "POST", body });
    assert.equal(denied.status, 403);
    const granted = await request("/admin", { account: teacherB, method: "POST", body });
    assert.equal(granted.status, 200);
    assert.equal((await (await request("/api/me", { account: teacherA })).json()).isVip, true);
    const revoked = await request("/admin", {
      account: teacherB,
      method: "POST",
      body: new URLSearchParams({ user_id: target, vip_until: "" }).toString(),
    });
    assert.equal(revoked.status, 200);
    assert.equal((await (await request("/api/me", { account: teacherA })).json()).isVip, false);
  } finally {
    await db.query("UPDATE users SET role='user' WHERE username='teacher-b'");
  }
});
const sample = (revision = 0) => ({
  revision,
  schedule: {
    "السبت-الأولى": {
      students: "طالب تجريبي",
      time: "8 - 10",
      ampm: "صباحًا",
      custom: "preserved",
    },
  },
  students: [
    {
      id: "lesson_1",
      name: "عائلة تجريبية",
      members: ["طالب أول", "طالب ثان"],
      isGroup: true,
      date: "2026-11-14",
      day: "السبت",
      period: "الأولى",
      time: "8 - 10",
      ampm: "صباحًا",
      note: "ملاحظة",
      futureField: 123,
    },
  ],
});

test("relational storage round-trips groups, notes, dates and extension fields", async () => {
  const response = await request("/api/schedule", {
    account: teacherA,
    data: sample(),
  });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).revision, 1);
  const saved = await (
    await request("/api/schedule", { account: teacherA })
  ).json();
  assert.deepEqual(saved, { ...sample(), revision: 1 });
  assert.equal(
    (await db.query("SELECT count(*)::integer AS n FROM registrations")).rows[0]
      .n,
    1,
  );
  const other = await (
    await request("/api/schedule", { account: teacherB })
  ).json();
  assert.deepEqual(other, { schedule: {}, students: [], revision: 0 });
});

test("concurrent saves reject an outdated revision rather than overwrite data", async () => {
  const results = await Promise.all([
    request("/api/schedule", { account: teacherA, data: sample(1) }),
    request("/api/schedule", {
      account: teacherA,
      data: { ...sample(1), students: [] },
    }),
  ]);
  assert.deepEqual(
    results.map((response) => response.status).sort(),
    [200, 409],
  );
  const before = await (
    await request("/api/schedule", { account: teacherA })
  ).json();
  const stale = await request("/api/schedule", {
    account: teacherA,
    data: sample(0),
  });
  assert.equal(stale.status, 409);
  assert.deepEqual(
    await (await request("/api/schedule", { account: teacherA })).json(),
    before,
  );
});

test("invalid data is rejected atomically without deleting existing records", async () => {
  const before = await (
    await request("/api/schedule", { account: teacherA })
  ).json();
  for (const bad of [
    {
      ...sample(before.revision),
      schedule: { "unknown-slot": { students: "bad" } },
    },
    {
      ...sample(before.revision),
      students: [{ ...sample().students[0], id: "x');alert(1)//" }],
    },
    {
      ...sample(before.revision),
      students: [{ ...sample().students[0], date: "2026-02-31" }],
    },
    {
      ...sample(before.revision),
      students: [sample().students[0], sample().students[0]],
    },
  ])
    assert.equal(
      (await request("/api/schedule", { account: teacherA, data: bad })).status,
      400,
    );
  assert.deepEqual(
    await (await request("/api/schedule", { account: teacherA })).json(),
    before,
  );
});

test("CSRF, foreign origins, malformed JSON and oversize bodies are rejected", async () => {
  assert.equal(
    (
      await request("/api/schedule", {
        account: teacherA,
        data: sample(),
        csrf: false,
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await request("/api/settings", {
        account: teacherA,
        method: "PATCH",
        data: { changes: { theme: "light" } },
        headers: { Origin: "https://foreign.example" },
      })
    ).status,
    403,
  );
  assert.equal(
    (
      await request("/api/profile", {
        account: teacherA,
        method: "POST",
        body: "{bad",
        headers: { "Content-Type": "application/json" },
      })
    ).status,
    400,
  );
  assert.equal(
    (
      await request("/api/profile", {
        account: teacherA,
        data: { name: "a".repeat(13000) },
      })
    ).status,
    413,
  );
});

test("settings, game progress and notifications are private to each account", async () => {
  const progress = JSON.stringify({ learned: [1, 2], stars: 7, best: 3 });
  assert.equal(
    (
      await request("/api/settings", {
        account: teacherA,
        method: "PATCH",
        data: {
          changes: {
            theme: "dark",
            "hurufi-progress-v1": progress,
            "hurufi-muted": "true",
            "site-tour-v1-complete": "yes",
            "ui-language": "en",
          },
        },
      })
    ).status,
    200,
  );
  const settings = await (
    await request("/api/settings", { account: teacherA })
  ).json();
  assert.equal(settings.theme, "dark");
  assert.equal(settings["hurufi-theme"], "dark");
  assert.equal(settings["hurufi-progress-v1"], progress);
  assert.equal(settings["site-tour-v1-complete"], "yes");
  assert.equal(settings["ui-language"], "en");
  assert.deepEqual(
    await (await request("/api/settings", { account: teacherB })).json(),
    {},
  );
  await request("/api/notifications/read", {
    account: teacherA,
    data: { ids: ["welcome"] },
  });
  assert.equal(
    (
      await (await request("/api/notifications", { account: teacherA })).json()
    )[0].read,
    true,
  );
  assert.equal(
    (
      await (await request("/api/notifications", { account: teacherB })).json()
    )[0].read,
    false,
  );
  assert.equal(
    (
      await request("/api/settings", {
        account: teacherA,
        method: "PATCH",
        data: { changes: { arbitraryServerKey: "bad" } },
      })
    ).status,
    400,
  );
  assert.equal(
    (await request("/api/settings", {
      account: teacherA,
      method: "PATCH",
      data: { changes: { "ui-language": "invalid" } },
    })).status,
    400,
  );
});

test("profile updates, avatar validation and password changes preserve account isolation", async () => {
  assert.equal(
    (
      await request("/api/profile", {
        account: teacherA,
        data: { name: "اسم جديد", phone: "٠١٠١٢٣٤٥٦٧٨" },
      })
    ).status,
    200,
  );
  assert.equal(
    (
      await request("/api/avatar", {
        account: teacherA,
        data: { image: "data:image/svg+xml;base64,PHN2Zz4=" },
      })
    ).status,
    400,
  );
  const login = await request("/login", {
    method: "POST",
    body: new URLSearchParams({
      user: "teacher-a",
      pass: "123456",
    }).toString(),
  });
  const otherSession = {
    cookie: login.headers.get("set-cookie").split(";")[0],
  };
  assert.equal(
    (
      await request("/api/password", {
        account: teacherA,
        data: { old: "wrong", pass: "654321" },
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await request("/api/password", {
        account: teacherA,
        data: { old: "123456", pass: "654321" },
      })
    ).status,
    200,
  );
  assert.equal(
    (await request("/api/me", { account: otherSession })).status,
    401,
  );
  assert.equal((await request("/api/me", { account: teacherA })).status, 200);
  assert.equal((await request("/api/me", { account: teacherB })).status, 200);
});

test("exports contain only the current account and never credentials or session tokens", async () => {
  const response = await request("/api/export", { account: teacherA });
  const data = await response.json();
  assert.equal(data.profile.user, "teacher-a");
  assert.equal(data.format, "athar-account-v2");
  assert.doesNotMatch(
    JSON.stringify(data),
    /password_hash|password_salt|token_hash|csrfToken/,
  );
  assert.match(response.headers.get("content-disposition"), /attachment/);
});

test("static serving protects private files, supports audio ranges and has no-store headers", async () => {
  for (const route of [
    "/../legacy-data/auth.json",
    "/%2e%2e/server/config.js",
    "/server/config.js",
    "/.env",
    "/Games/missing.html",
  ])
    assert.equal((await request(route, { account: teacherA })).status, 404);
  const audio = await request("/audio/stories/story-01.mp3", {
    account: teacherA,
    headers: { Range: "bytes=0-99" },
  });
  assert.equal(audio.status, 206);
  assert.equal((await audio.arrayBuffer()).byteLength, 100);
  assert.equal(audio.headers.get("cache-control"), "no-store");
  const font = await request('/assets/media/23ecf11b405b7674b811.woff', { account: teacherA, method: 'HEAD' });
  assert.equal(font.status, 200);
  assert.equal(font.headers.get('content-type'), 'font/woff');
  assert.equal(
    (
      await request("/audio/stories/story-01.mp3", {
        account: teacherA,
        headers: { Range: "bytes=-0" },
      })
    ).status,
    416,
  );
  const page = await request("/", { account: teacherA });
  assert.match(await page.text(), /"csrfToken"/);
  assert.match(
    page.headers.get("content-security-policy"),
    /frame-ancestors 'self'/,
  );
  assert.equal(
    (await request("/Games/hurufi.html", { account: teacherA })).status,
    200,
  );
});

test("sessions, data and preferences survive an HTTP server restart", async () => {
  await closeServer();
  await listen();
  assert.equal((await request("/api/me", { account: teacherA })).status, 200);
  assert.equal(
    (await (await request("/api/settings", { account: teacherA })).json())
      .theme,
    "dark",
  );
  assert.equal(
    (await request("/api/schedule", { account: teacherA })).status,
    200,
  );
});

test("logout revokes only the current session", async () => {
  const response = await request("/logout", {
    account: teacherB,
    method: "POST",
  });
  assert.equal(response.status, 200);
  assert.match(response.headers.get("set-cookie"), /Max-Age=0/);
  assert.equal((await request("/api/me", { account: teacherB })).status, 401);
  assert.equal((await request("/api/me", { account: teacherA })).status, 200);
});

test("legacy migration preserves old hashes and schedules, is transactional and runs once", async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "athar-import-"));
  const legacyDb = await openDatabase(loadConfig({ DB_DRIVER: "pglite" }));
  try {
    await migrate(legacyDb, config.root);
    const credentials = await hashPassword("legacy-password");
    await fs.writeFile(
      path.join(folder, "auth.json"),
      JSON.stringify({
        users: [
          {
            id: "legacy",
            user: "legacy-user",
            file: "schedule.json",
            ...credentials,
          },
        ],
      }),
    );
    await fs.writeFile(path.join(folder, "schedule.json"), "{malformed");
    await assert.rejects(importLegacy(legacyDb, folder));
    assert.equal(
      (await legacyDb.query("SELECT count(*)::integer AS n FROM users")).rows[0]
        .n,
      0,
    );
    await fs.writeFile(
      path.join(folder, "schedule.json"),
      JSON.stringify(sample()),
    );
    assert.deepEqual(await importLegacy(legacyDb, folder), {
      users: 1,
      skipped: false,
    });
    assert.deepEqual(await importLegacy(legacyDb, folder), {
      users: 0,
      skipped: true,
    });
    assert.equal(
      (await legacyDb.query("SELECT password_hash FROM users")).rows[0]
        .password_hash,
      credentials.hash,
    );
    assert.equal(
      (await legacyDb.query("SELECT count(*)::integer AS n FROM registrations"))
        .rows[0].n,
      1,
    );
  } finally {
    await legacyDb.close();
    await fs.rm(folder, { recursive: true });
  }
});

test("rate limits bound repeated failed authentication attempts", () => {
  const limiter = new RateLimiter({ limit: 2 });
  limiter.check("ip");
  limiter.check("ip");
  assert.throws(() => limiter.check("ip"), { status: 429 });
  assert.doesNotThrow(() => limiter.check("another-ip"));
});

test("database records survive closing and reopening a file-backed engine", async () => {
  const folder = await fs.mkdtemp(path.join(os.tmpdir(), "athar-durable-"));
  const durableConfig = loadConfig({
    DB_DRIVER: "pglite",
    PGLITE_PATH: path.join(folder, "database"),
  });
  let durableDb;
  try {
    durableDb = await openDatabase(durableConfig);
    await migrate(durableDb, config.root);
    await durableDb.query(
      "INSERT INTO app_settings (key,value) VALUES ('durability-check',$1::jsonb)",
      [JSON.stringify({ persisted: true })],
    );
    await durableDb.close();
    durableDb = await openDatabase(durableConfig);
    assert.deepEqual(
      (
        await durableDb.query(
          "SELECT value FROM app_settings WHERE key='durability-check'",
        )
      ).rows[0].value,
      { persisted: true },
    );
  } finally {
    if (durableDb) await durableDb.close();
    await fs.rm(folder, { recursive: true });
  }
});
