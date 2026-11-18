import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { loadConfig } from "../server/config.js";
import { openDatabase, migrate } from "../server/db/index.js";
import { createApp } from "../server/app.js";
import { hashPassword, RateLimiter } from "../server/lib/security.js";
import { importLegacy } from "../server/services/legacy-import.js";

let db, config, server, origin, teacherA, teacherB;
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
    user: username,
    pass: "correct-password",
    pass2: "correct-password",
    name: "اسم تجريبي",
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
  const account = { cookie: cookieHeader.split(";")[0] };
  account.csrf = (
    await (await request("/api/bootstrap", { account })).json()
  ).csrfToken;
  assert.equal(account.csrf.length, 64);
  return account;
}

test("authentication gates APIs and protects first-run setup", async () => {
  assert.equal((await request("/api/schedule")).status, 401);
  assert.equal((await request("/")).headers.get("location"), "/setup");
  teacherA = await signup("teacher-a", "/setup");
  teacherB = await signup("teacher-b");
  assert.equal((await request("/setup")).headers.get("location"), "/login");
  const profile = await (
    await request("/api/me", { account: teacherA })
  ).json();
  assert.equal(profile.user, "teacher-a");
  assert.ok(!("password_hash" in profile));
  const duplicate = await request("/signup", {
    method: "POST",
    body: new URLSearchParams({
      user: "TEACHER-A",
      pass: "correct-password",
      pass2: "correct-password",
      name: "اسم تجريبي",
      phone: "01012345678",
    }).toString(),
  });
  assert.equal(duplicate.status, 409);
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
      pass: "correct-password",
    }).toString(),
  });
  const otherSession = {
    cookie: login.headers.get("set-cookie").split(";")[0],
  };
  assert.equal(
    (
      await request("/api/password", {
        account: teacherA,
        data: { old: "wrong", pass: "new-password" },
      })
    ).status,
    401,
  );
  assert.equal(
    (
      await request("/api/password", {
        account: teacherA,
        data: { old: "correct-password", pass: "new-password" },
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
  const audio = await request("/audio/001001.mp3", {
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
      await request("/audio/001001.mp3", {
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
