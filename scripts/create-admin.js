import { loadConfig } from "../server/config.js";
import path from "node:path";
import fs from "node:fs/promises";
import { openDatabase, migrate } from "../server/db/index.js";
import { hashPassword } from "../server/lib/security.js";
import { validatePassword } from "../server/lib/validation.js";
import { createUser, findUser, audit } from "../server/repositories/users.js";
import { importLegacy } from "../server/services/legacy-import.js";

const [username] = process.argv.slice(2);
if (!username || username.length < 3) {
  console.error("Usage: npm run admin:create -- <username>");
  process.exit(1);
}
if (!process.stdin.isTTY) throw new Error("Run this command in a terminal to enter the password privately.");
const password = await new Promise((resolve, reject) => {
  process.stdout.write("Admin password (input hidden): ");
  let value = "";
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", function read(chunk) {
    for (const char of chunk.toString("utf8")) {
      if (char === "\u0003") { process.stdin.off("data", read); process.stdin.setRawMode(false); process.stdin.pause(); reject(new Error("Cancelled.")); return; }
      if (char === "\r" || char === "\n") { process.stdin.off("data", read); process.stdin.setRawMode(false); process.stdin.pause(); process.stdout.write("\n"); resolve(value); return; }
      if (char === "\u007f" || char === "\b") value = value.slice(0, -1);
      else if (char >= " ") value += char;
    }
  });
});
validatePassword(password);
const local = !process.env.DATABASE_URL && !process.env.DB_DRIVER;
const config = local
  ? loadConfig({
      ...process.env,
      NODE_ENV: "development",
      DB_DRIVER: "pglite",
      PGLITE_PATH: path.resolve(
        process.env.ATHAR_LOCAL_DB_PATH || "data/athar-local-recovered",
      ),
      PUBLIC_URL: "",
      COOKIE_SECURE: "false",
      SESSION_COOKIE_NAME: "athar_local_sid",
    })
  : loadConfig();
if (local) await fs.mkdir(path.dirname(config.embeddedPath), { recursive: true });
const db = await openDatabase(config);
try {
  await migrate(db, config.root);
  if (local) await importLegacy(db, config.legacyDir);
  const user = await findUser(db, username);
  const credentials = await hashPassword(password);
  if (user) {
    await db.query("UPDATE users SET role='admin', password_salt=$1, password_hash=$2, updated_at=now() WHERE id=$3", [credentials.salt, credentials.hash, user.id]);
    await audit(db, user.id, "admin.promoted", { username: user.username });
    console.log(`Administrator access enabled for ${user.username}.`);
  } else {
    const userId = await createUser(db, { username, name: "", phone: "", ...credentials, role: "admin" });
    await audit(db, userId, "admin.created", { username });
    console.log(`Administrator account created for ${username}.`);
  }
} finally {
  await db.close();
}
