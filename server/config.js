import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

export function loadConfig(env = process.env, argv = process.argv.slice(2)) {
  const option = (name) => {
    const index = argv.indexOf(`--${name}`);
    return index >= 0 ? argv[index + 1] : undefined;
  };
  const production = env.NODE_ENV === "production";
  const port = Number(option("port") || env.PORT || 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535)
    throw new Error("Invalid PORT");
  if (production && !env.PUBLIC_URL)
    throw new Error("Set PUBLIC_URL before starting in production.");
  if (production && env.DB_DRIVER === "pglite")
    throw new Error("Production requires PostgreSQL via DATABASE_URL.");
  return {
    root,
    publicDir: path.join(root, "public"),
    port,
    host: option("host") || env.HOST || "0.0.0.0",
    production,
    publicUrl: env.PUBLIC_URL ? new URL(env.PUBLIC_URL).origin : null,
    secureCookie:
      env.COOKIE_SECURE === "true" ||
      Boolean(env.PUBLIC_URL?.startsWith("https://")),
    databaseUrl: env.DATABASE_URL,
    databaseSsl: env.DATABASE_SSL === "true",
    databaseCa: env.DATABASE_CA,
    driver: env.DB_DRIVER || "postgres",
    embeddedPath: env.PGLITE_PATH || "memory://",
    allowSignup: env.ALLOW_SIGNUP !== "false",
    sessionHours: Number(env.SESSION_HOURS || 24),
    legacyDir: path.resolve(root, env.LEGACY_DATA_DIR || "legacy-data"),
    importLegacy: env.IMPORT_LEGACY_ON_START !== "false",
    telegramToken: env.TELEGRAM_BOT_TOKEN || "",
    telegramChatId: env.TELEGRAM_CHAT_ID || "",
  };
}
