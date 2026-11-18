import path from "node:path";
import { loadConfig } from "../server/config.js";
import { openDatabase, migrate } from "../server/db/index.js";
import { importLegacy } from "../server/services/legacy-import.js";
const config = loadConfig();
const db = await openDatabase(config);
try {
  await migrate(db, config.root);
  const supplied = process.argv
    .slice(2)
    .filter((argument) => argument !== "--")[0];
  console.log(
    await importLegacy(
      db,
      supplied ? path.resolve(supplied) : config.legacyDir,
    ),
  );
} finally {
  await db.close();
}
