import { validateSettings } from "../lib/validation.js";
import { publicProfile } from "./users.js";

export async function readSettings(db, userId) {
  return Object.fromEntries(
    (
      await db.query("SELECT key,value FROM user_settings WHERE user_id=$1", [
        userId,
      ])
    ).rows.map((row) => [row.key, row.value]),
  );
}

export async function saveSettings(db, userId, data) {
  const changes = validateSettings(data);
  // The website and the embedded games use the same account-level theme.
  if ("hurufi-theme" in changes) changes.theme = changes["hurufi-theme"];
  else if ("theme" in changes) changes["hurufi-theme"] = changes.theme;
  await db.transaction(async (tx) => {
    for (const [key, value] of Object.entries(changes)) {
      if (value === null)
        await tx.query(
          "DELETE FROM user_settings WHERE user_id=$1 AND key=$2",
          [userId, key],
        );
      else
        await tx.query(
          "INSERT INTO user_settings (user_id,key,value) VALUES ($1,$2,$3::jsonb) ON CONFLICT (user_id,key) DO UPDATE SET value=excluded.value,updated_at=now()",
          [userId, key, JSON.stringify(value)],
        );
    }
  });
  return { ok: true };
}

export async function readNotifications(db, userId) {
  const { rows } = await db.query(
    "SELECT id,text,read_at,created_at FROM notifications WHERE user_id=$1 ORDER BY created_at,id",
    [userId],
  );
  return rows.map((row) => ({
    id: row.id,
    text: row.text,
    read: Boolean(row.read_at),
    time: new Date(row.created_at).getTime(),
  }));
}

export async function bootstrap(db, user, session) {
  return {
    me: publicProfile(user),
    csrfToken: session.csrf_token,
    settings: await readSettings(db, user.id),
    notifications: await readNotifications(db, user.id),
  };
}
