import { loadConfig } from "./config.js";
import { openDatabase, migrate } from "./db/index.js";
import { importLegacy } from "./services/legacy-import.js";
import { createApp } from "./app.js";

const config = loadConfig();
const db = await openDatabase(config);
try {
  await migrate(db, config.root);
  if (config.importLegacy) {
    const result = await importLegacy(db, config.legacyDir);
    if (result.users)
      console.log(
        `Imported ${result.users} legacy accounts into the database.`,
      );
  }
} catch (error) {
  await db.close();
  throw error;
}
const server = createApp({ db, config });
server.listen(config.port, config.host, () =>
  console.log(`Athar is running on port ${server.address().port}`),
);

const cleanup = setInterval(
  () =>
    db
      .query("DELETE FROM sessions WHERE expires_at < now()")
      .catch(() => console.error("Session cleanup failed.")),
  3600000,
);
cleanup.unref();
let shuttingDown = false;
async function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  clearInterval(cleanup);
  const deadline = setTimeout(() => process.exit(1), 10000).unref();
  server.close(async () => {
    await db.close();
    clearTimeout(deadline);
    process.exit(0);
  });
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
