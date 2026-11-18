import { loadConfig } from "../server/config.js";
import { openDatabase, migrate } from "../server/db/index.js";
const config = loadConfig();
const db = await openDatabase(config);
try {
  await migrate(db, config.root);
  console.log("Database migrations completed.");
} finally {
  await db.close();
}
