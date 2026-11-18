import fs from "node:fs/promises";
import path from "node:path";
import pg from "pg";

export async function openDatabase(config) {
  let db;
  if (config.driver === "pglite") {
    const { PGlite } = await import("@electric-sql/pglite");
    const engine = new PGlite(config.embeddedPath);
    db = {
      query: (text, values = []) => engine.query(text, values),
      exec: (text) => engine.exec(text),
      transaction: (work) =>
        engine.transaction((tx) =>
          work({
            query: (text, values = []) => tx.query(text, values),
            exec: (text) => tx.exec(text),
          }),
        ),
      close: () => engine.close(),
      driver: "pglite",
    };
  } else {
    if (!config.databaseUrl)
      throw new Error("DATABASE_URL is required. See README.md.");
    const pool = new pg.Pool({
      connectionString: config.databaseUrl,
      ssl: config.databaseSsl
        ? {
            rejectUnauthorized: true,
            ...(config.databaseCa ? { ca: config.databaseCa } : {}),
          }
        : undefined,
      max: 10,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      statement_timeout: 15000,
    });
    pool.on("error", () =>
      console.error("A database connection was interrupted."),
    );
    db = {
      query: (text, values = []) => pool.query(text, values),
      exec: (text) => pool.query(text),
      async transaction(work) {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          const result = await work({
            query: (text, values = []) => client.query(text, values),
            exec: (text) => client.query(text),
          });
          await client.query("COMMIT");
          return result;
        } catch (error) {
          await client.query("ROLLBACK");
          throw error;
        } finally {
          client.release();
        }
      },
      close: () => pool.end(),
      driver: "postgres",
    };
  }
  await db.query("SELECT 1");
  return db;
}

export async function migrate(db, root) {
  const folder = path.join(root, "server/db/migrations");
  await db.transaction(async (tx) => {
    if (db.driver === "postgres")
      await tx.query("SELECT pg_advisory_xact_lock(82917401)");
    await tx.exec(
      "CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );
    const { rows } = await tx.query("SELECT name FROM schema_migrations");
    const applied = new Set(rows.map((row) => row.name));
    for (const filename of (await fs.readdir(folder))
      .filter((name) => name.endsWith(".sql"))
      .sort()) {
      if (applied.has(filename)) continue;
      await tx.exec(await fs.readFile(path.join(folder, filename), "utf8"));
      await tx.query("INSERT INTO schema_migrations (name) VALUES ($1)", [
        filename,
      ]);
    }
  });
}
