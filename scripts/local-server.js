import path from "node:path";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { loadConfig } from "../server/config.js";
import { openDatabase, migrate } from "../server/db/index.js";
import { importLegacy } from "../server/services/legacy-import.js";
import { createApp } from "../server/app.js";
import { LoginThrottle } from "../server/services/login-throttle.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const config = loadConfig({
  ...process.env,
  NODE_ENV: "development",
  DB_DRIVER: "pglite",
  PGLITE_PATH: path.resolve(root, process.env.ATHAR_LOCAL_DB_PATH || "data/athar-local-recovered"),
  IMPORT_LEGACY_ON_START: "true",
  PUBLIC_URL: "",
  COOKIE_SECURE: "false",
  SESSION_COOKIE_NAME: "athar_local_sid",
});
await fs.mkdir(path.dirname(config.embeddedPath), { recursive: true });
const db = await openDatabase(config);
try {
  await migrate(db, config.root);
  if (config.importLegacy) {
    const result = await importLegacy(db, config.legacyDir);
    if (result.users) console.log(`Imported ${result.users} saved accounts.`);
  }
} catch (error) {
  await db.close();
  throw error;
}
const server = createApp({ db, config });
const cleanup = setInterval(() =>
  db.query("DELETE FROM sessions WHERE expires_at < now()")
    .then(() => new LoginThrottle(db).cleanup())
    .catch(() => console.error("Local security cleanup failed.")),
3600000);
cleanup.unref();
server.listen(config.port, config.host, () => {
  const port = server.address().port;
  console.log(`Athar is running with a saved local database on port ${port}.`);
  if (process.send) process.send({ type: "athar-ready", port });
});
let closing = false;
async function shutdown() {
  if (closing) return;
  closing = true;
  clearInterval(cleanup);
  server.close(async () => {
    await db.close();
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
