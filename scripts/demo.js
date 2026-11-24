/** Disposable UI test/demo. Production always uses server/index.js. */
import { loadConfig } from "../server/config.js";
import { openDatabase, migrate } from "../server/db/index.js";
import { createApp } from "../server/app.js";
import { createUser } from "../server/repositories/users.js";
import { saveSchedule } from "../server/repositories/schedule.js";
import { createSession } from "../server/services/sessions.js";
import { hashPassword } from "../server/lib/security.js";
import crypto from "node:crypto";

if (process.env.NODE_ENV === "production")
  throw new Error(
    "The disposable demo is not a production entry point. Use npm start.",
  );
const config = loadConfig({
  ...process.env,
  NODE_ENV: "development",
  DB_DRIVER: "pglite",
  PGLITE_PATH: "memory://",
  IMPORT_LEGACY_ON_START: "false",
  PUBLIC_URL: "",
  COOKIE_SECURE: "false",
});
const db = await openDatabase(config);
await migrate(db, config.root);
const credentials = await hashPassword(crypto.randomBytes(32).toString("hex"));
const userId = await createUser(db, {
  username: "demo-teacher",
  name: "حساب تجريبي",
  phone: "01000000000",
  ...credentials,
});
if (process.env.DEMO_EXPIRED_TRIAL === "1")
  await db.query("UPDATE users SET created_at=now() - interval '8 days' WHERE id=$1", [userId]);
await saveSchedule(db, userId, {
  revision: 0,
  schedule: {
    "السبت-الأولى": { students: "أحمد - عمر", time: "8 - 10", ampm: "صباحًا" },
    "الأحد-الثانية": { students: "مريم", time: "4 - 5", ampm: "مساءً" },
    "الإثنين-الأولى": {
      students: "مجموعة الحروف",
      time: "9 - 10",
      ampm: "صباحًا",
    },
  },
  students: [
    {
      id: "demo1",
      name: "أحمد",
      date: "2026-11-14",
      day: "السبت",
      period: "الأولى",
      time: "8 - 10",
      ampm: "صباحًا",
      note: "تسجيل تجريبي لا يدخل نسخة الإنتاج",
    },
  ],
});
const token = await createSession(db, userId, 24);
const server = createApp({ db, config });
// Only this in-memory demo account exists; no real account or import is loaded.
server.prependListener("request", (req) => {
  req.headers.cookie = `sid=${token}`;
});
server.listen(config.port, config.host, () => {
  const port = server.address().port;
  console.log(`Disposable Athar demo running on port ${port}`);
  if (process.send) process.send({ type: "athar-ready", port });
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () =>
    server.close(async () => {
      await db.close();
      process.exit(0);
    }),
  );
