'use strict';
// كل الإعدادات من متغيرات البيئة (Environment variables) — مفيش أسرار جوه الكود.
const path = require('path');

const bool = (v, def) => (v === undefined || v === '' ? def : /^(1|true|yes|on)$/i.test(String(v)));
const ROOT = path.join(__dirname, '..');

module.exports = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.HOST || '0.0.0.0',
  ROOT,
  PUBLIC_DIR: path.join(ROOT, 'public'),
  // مكان كل البيانات (حسابات، جلسات، جداول). خارج الكود عشان يتعمله باك أب ومايترفعش على GitHub.
  DATA_DIR: path.resolve(process.env.DATA_DIR || path.join(ROOT, 'data')),
  // إنشاء حسابات جديدة من صفحة /signup (الحساب الأول دايمًا من /setup).
  ALLOW_SIGNUP: bool(process.env.ALLOW_SIGNUP, false),
  // لو متحدد: صفحة /setup (أول حساب) محتاجة ?token=<SETUP_TOKEN> — عشان أول زائر على النت مايخدش الموقع.
  SETUP_TOKEN: process.env.SETUP_TOKEN || '',
  // ورا reverse proxy (Traefik/nginx): ناخد IP الزائر الحقيقي من X-Forwarded-For.
  TRUST_PROXY: bool(process.env.TRUST_PROXY, false),
  // كوكي الجلسة Secure (HTTPS بس). auto = لو الطلب جاي HTTPS.
  COOKIE_SECURE: (process.env.COOKIE_SECURE || 'auto').toLowerCase(),
  // نسخ احتياطي على تيليجرام (اختياري).
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN || '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID || '',
  BACKUP_EVERY_DAYS: Number(process.env.BACKUP_EVERY_DAYS) > 0 ? Number(process.env.BACKUP_EVERY_DAYS) : 7,
  // حماية تخمين كلمة السر
  LOGIN_MAX_TRIES: 5,
  LOGIN_LOCK_MS: 60 * 1000,
  SCHEDULE_MAX_BYTES: 20 * 1024 * 1024,
};
