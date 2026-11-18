import { HttpError, json, readJson } from "../lib/http.js";
import { readSchedule, saveSchedule } from "../repositories/schedule.js";
import {
  readSettings,
  saveSettings,
  readNotifications,
  bootstrap,
} from "../repositories/settings.js";
import { exportAccount, sendTelegramBackup } from "../services/backup.js";

export async function dataRoutes({
  req,
  res,
  url,
  db,
  session,
  config,
  backupLimiter,
}) {
  const route = `${req.method} ${url.pathname}`;
  if (route === "GET /api/schedule") {
    json(res, await readSchedule(db, session.id));
  } else if (route === "POST /api/schedule") {
    json(
      res,
      await saveSchedule(db, session.id, await readJson(req, 8 * 1024 * 1024)),
    );
  } else if (route === "GET /api/settings") {
    json(res, await readSettings(db, session.id));
  } else if (route === "PATCH /api/settings") {
    const data = await readJson(req, 512000);
    json(res, await saveSettings(db, session.id, data.changes));
  } else if (route === "GET /api/bootstrap") {
    json(res, await bootstrap(db, session, session));
  } else if (route === "GET /api/notifications") {
    json(res, await readNotifications(db, session.id));
  } else if (route === "POST /api/notifications/read") {
    const { ids } = await readJson(req, 12000);
    if (
      !Array.isArray(ids) ||
      ids.length > 100 ||
      ids.some((id) => typeof id !== "string" || id.length > 100)
    )
      throw new HttpError(400, "الإشعارات غير صالحة.");
    await db.query(
      "UPDATE notifications SET read_at=now() WHERE user_id=$1 AND id=ANY($2::text[]) AND read_at IS NULL",
      [session.id, ids],
    );
    json(res, { ok: true });
  } else if (route === "GET /api/export") {
    json(res, await exportAccount(db, session), 200, {
      "Content-Disposition": 'attachment; filename="athar-account-backup.json"',
    });
  } else if (route === "POST /api/backup-now") {
    backupLimiter.check(session.id);
    json(res, await sendTelegramBackup(db, session, config));
  } else return false;
  return true;
}
