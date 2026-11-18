import { readSchedule } from "../repositories/schedule.js";
import { publicProfile, audit } from "../repositories/users.js";
import { readNotifications, readSettings } from "../repositories/settings.js";

export async function exportAccount(db, user) {
  return {
    format: "athar-account-v2",
    exportedAt: new Date().toISOString(),
    profile: publicProfile(user),
    ...(await readSchedule(db, user.id)),
    settings: await readSettings(db, user.id),
    notifications: await readNotifications(db, user.id),
  };
}

export async function sendTelegramBackup(db, user, config) {
  if (!config.telegramToken || !config.telegramChatId)
    return {
      ok: false,
      msg: "النسخ على تيليجرام غير مُفعّل. يمكنك تنزيل نسخة من /api/export.",
    };
  const backup = await exportAccount(db, user);
  const form = new FormData();
  form.append("chat_id", config.telegramChatId);
  form.append(
    "caption",
    "نسخة احتياطية لحساب أثر — " + new Date().toISOString().slice(0, 10),
  );
  form.append(
    "document",
    new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }),
    "athar-backup.json",
  );
  const response = await fetch(
    `https://api.telegram.org/bot${config.telegramToken}/sendDocument`,
    { method: "POST", body: form, signal: AbortSignal.timeout(20000) },
  );
  const result = await response.json();
  if (!response.ok || !result.ok)
    return { ok: false, msg: "تعذر إرسال النسخة إلى تيليجرام." };
  await audit(db, user.id, "backup.telegram");
  return { ok: true, msg: "تم إرسال النسخة الاحتياطية ✅" };
}
