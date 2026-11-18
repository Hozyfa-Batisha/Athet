import fs from "node:fs/promises";
import crypto from "node:crypto";
const password = crypto.randomBytes(24).toString("hex");
const publicUrl = process.argv[2] || "http://localhost:3000";
const origin = new URL(publicUrl).origin;
const contents = `NODE_ENV=production
PORT=3000
HOST=0.0.0.0
PUBLIC_URL=${origin}
COOKIE_SECURE=${origin.startsWith("https://")}
DATABASE_URL=postgresql://athar:${password}@127.0.0.1:5432/athar
DATABASE_SSL=false
POSTGRES_PASSWORD=${password}
ALLOW_SIGNUP=true
IMPORT_LEGACY_ON_START=true
LEGACY_DATA_DIR=legacy-data
SESSION_HOURS=24
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
`;
try {
  await fs.writeFile(".env", contents, { flag: "wx", mode: 0o600 });
  console.log(
    "Created .env with a random database password. Configure PUBLIC_URL for your domain.",
  );
} catch (error) {
  if (error.code === "EEXIST") {
    console.error(".env already exists; no settings were overwritten.");
    process.exitCode = 1;
  } else throw error;
}
