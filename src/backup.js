'use strict';
// نسخة احتياطية على تيليجرام: ملف JSON واحد فيه بيانات *كل* الحسابات
// (النسخة القديمة كانت بتبعت schedule.json بس = أول حساب، والباقي كان بيضيع).
// مفيش هاش كلمات السر في النسخة — بيانات الجداول والملف الشخصي بس.
const store = require('./store');
const auth = require('./auth');
const cfg = require('./config');

const STATE = 'backup-state.json';
const configured = () => !!(cfg.TELEGRAM_TOKEN && cfg.TELEGRAM_CHAT_ID);

function buildBundle() {
  return {
    app: 'athar', exportedAt: new Date().toISOString(),
    users: auth.getUsers().map(u => ({
      id: u.id, user: u.user, name: u.name || '', phone: u.phone || '', file: u.file,
      data: store.readJson(u.file || 'schedule.json', {}),
    })),
  };
}

async function sendBackup(reason) {
  if (!configured()) return { ok: false, msg: 'النسخ الاحتياطي على تيليجرام مش متظبط (TELEGRAM_TOKEN و TELEGRAM_CHAT_ID).' };
  const stamp = new Date().toISOString().slice(0, 10);
  const form = new FormData();
  form.append('chat_id', String(cfg.TELEGRAM_CHAT_ID));
  form.append('caption', 'نسخة احتياطية - ' + stamp + (reason ? ' (' + reason + ')' : ''));
  form.append('document', new Blob([JSON.stringify(buildBundle())], { type: 'application/json' }), 'athar-backup-' + stamp + '.json');
  try {
    const res = await fetch('https://api.telegram.org/bot' + cfg.TELEGRAM_TOKEN + '/sendDocument', {
      method: 'POST', body: form, signal: AbortSignal.timeout(30000),
    });
    const j = await res.json();
    if (j.ok) {
      store.writeJson(STATE, { last: Date.now() });
      return { ok: true, msg: 'تم رفع النسخة الاحتياطية على تيليجرام ✔' };
    }
    return { ok: false, msg: 'رفض تيليجرام الطلب: ' + j.description };
  } catch (e) {
    return { ok: false, msg: 'تعذر الاتصال بتيليجرام: ' + e.message };
  }
}

async function checkBackup() {
  if (!configured() || !auth.hasAccount()) return;
  const last = store.readJson(STATE, { last: 0 }).last || 0;
  if (Date.now() - last >= cfg.BACKUP_EVERY_DAYS * 86400000) {
    const r = await sendBackup('تلقائي');
    console.log('[backup]', r.ok ? 'ok' : 'failed', '-', r.msg);
  }
}

function startScheduler() {
  setTimeout(checkBackup, 15 * 1000).unref();
  setInterval(checkBackup, 60 * 60 * 1000).unref();
}

module.exports = { sendBackup, buildBundle, startScheduler, configured };
