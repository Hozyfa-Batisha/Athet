import { loadConfig } from "../server/config.js";
import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { openDatabase, migrate } from "../server/db/index.js";
import { hashPassword, verifyPassword } from "../server/lib/security.js";
import { validatePassword } from "../server/lib/validation.js";
import { createUser, findUser, audit } from "../server/repositories/users.js";
import { importLegacy } from "../server/services/legacy-import.js";

if (!process.stdin.isTTY)
  throw new Error(
    "Run this command in a terminal to enter the password privately.",
  );
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
process.stdin.setRawMode(true);
process.stdin.resume();
function readLine(label, hidden = false) {
  return new Promise((resolve, reject) => {
    process.stdout.write(label);
    let value = "";
    function read(chunk) {
      for (const char of chunk.toString("utf8")) {
        if (char === "\u0003") {
          process.stdin.off("data", read);
          reject(new Error("Cancelled."));
          return;
        }
        if (char === "\r" || char === "\n") {
          process.stdin.off("data", read);
          process.stdout.write("\n");
          resolve(value);
          return;
        }
        if (char === "\u007f" || char === "\b") {
          if (value) {
            value = value.slice(0, -1);
            if (!hidden) process.stdout.write("\b \b");
          }
        } else if (char >= " ") {
          value += char;
          if (!hidden) process.stdout.write(char);
        }
      }
    }
    process.stdin.on("data", read);
  });
}
let username;
let password;
try {
  username =
    process.argv.slice(2).join(" ").trim() ||
    (await readLine("Admin account name: ")).trim();
  if (username.length < 3 || username.length > 80)
    throw new Error("Admin account name must contain 3 to 80 characters.");
  password = await readLine("Admin password (input hidden): ", true);
} finally {
  process.stdin.setRawMode(false);
  process.stdin.pause();
}
validatePassword(password);
const config = loadConfig({
  ...process.env,
  NODE_ENV: "development",
  DB_DRIVER: "pglite",
  PGLITE_PATH: path.resolve(
    root,
    process.env.ATHAR_LOCAL_DB_PATH || "data/athar-local-recovered",
  ),
  PUBLIC_URL: "",
  COOKIE_SECURE: "false",
  SESSION_COOKIE_NAME: "athar_local_sid",
});
await fs.mkdir(path.dirname(config.embeddedPath), { recursive: true });
console.log(
  "Creating an administrator for the local site opened by start.bat (not npm run dev).",
);
const db = await openDatabase(config);
try {
  await migrate(db, config.root);
  await importLegacy(db, config.legacyDir);
  const user = await findUser(db, username);
  const credentials = await hashPassword(password);
  let resultMessage;
  if (user) {
    await db.query(
      "UPDATE users SET role='admin', password_salt=$1, password_hash=$2, updated_at=now() WHERE id=$3",
      [credentials.salt, credentials.hash, user.id],
    );
    await audit(db, user.id, "admin.promoted", { username: user.username });
    resultMessage = `Administrator access enabled for ${user.username}.`;
  } else {
    const userId = await createUser(db, {
      username,
      name: "",
      phone: "",
      ...credentials,
      role: "admin",
    });
    await audit(db, userId, "admin.created", { username });
    resultMessage = `Administrator account created for ${username}.`;
  }
  const saved = await findUser(db, username);
  if (saved?.role !== "admin" || !(await verifyPassword(password, saved)))
    throw new Error("The account could not be verified after saving.");
  console.log(resultMessage);
  console.log(
    "The account was checked. Reopen start.bat and sign in with this exact name and password.",
  );
} finally {
  await db.close();
}
