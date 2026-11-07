'use strict';
// الحسابات + الجلسات + الحماية من التخمين. نفس صيغة الملفات القديمة بالظبط
// (auth.json / sessions.json) عشان البيانات القديمة تشتغل لو اتنقلت لـ DATA_DIR.
const crypto = require('crypto');
const store = require('./store');
const cfg = require('./config');

const AUTH = 'auth.json';
const SESS = 'sessions.json';

const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const hashPw = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString('hex');

function verifyPw(pw, user) {
  try {
    return crypto.timingSafeEqual(Buffer.from(hashPw(String(pw || ''), user.salt), 'hex'), Buffer.from(user.hash, 'hex'));
  } catch { return false; }
}

/* ---------- المستخدمين ---------- */
// auth.json = { users: [ {id, user, name, phone, avatar?, salt, hash, file} ] }
function getUsers() {
  const a = store.readJson(AUTH, null);
  if (!a) return [];
  if (Array.isArray(a.users)) return a.users;
  if (a.user && a.hash) return [Object.assign({ id: 'u1', file: 'schedule.json' }, a)]; // الصيغة القديمة (حساب واحد)
  return [];
}
const saveUsers = users => store.writeJson(AUTH, { users });
const hasAccount = () => getUsers().length > 0;
const isOwner = u => !!u && getUsers()[0] && getUsers()[0].id === u.id; // أول حساب = صاحب الموقع

(function migrateAuth() {
  const a = store.readJson(AUTH, null);
  if (a && !Array.isArray(a.users) && a.user && a.hash) {
    store.writeJson('auth-old-backup.json', a);
    saveUsers(getUsers());
  }
})();

function cleanProfile(name, phone) {
  name = String(name || '').trim().slice(0, 40);
  phone = String(phone || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  const digits = phone.replace(/\D/g, '');
  if (name.length < 2) return { error: 'اكتب الاسم (حرفين على الأقل)' };
  if (digits.length < 8 || digits.length > 15) return { error: 'رقم الهاتف غير صحيح' };
  return { name, phone: phone.replace(/[^\d+\s-]/g, '').trim() };
}

// تحقق من بيانات حساب جديد وتجهيزه
function buildUser(f, users) {
  const user = String(f.get('user') || '').trim(), pass = String(f.get('pass') || '');
  const prof = cleanProfile(f.get('name'), f.get('phone'));
  if (prof.error) return { error: prof.error };
  if (user.length < 3 || user.length > 40) return { error: 'اسم المستخدم لازم يكون ٣ حروف على الأقل' };
  if (pass.length < 6) return { error: 'كلمة السر لازم تكون ٦ حروف على الأقل' };
  if (pass !== String(f.get('pass2') || '')) return { error: 'كلمتا السر غير متطابقتين' };
  if (users.some(x => String(x.user).toLowerCase() === user.toLowerCase())) return { error: 'اسم المستخدم ده موجود قبل كده، اختار اسم تاني' };
  const id = crypto.randomBytes(5).toString('hex');
  const salt = crypto.randomBytes(16).toString('hex');
  return { u: { id, user, name: prof.name, phone: prof.phone, salt, hash: hashPw(pass, salt), file: users.length ? 'data-' + id + '.json' : 'schedule.json' } };
}

function patchUser(id, fn) {
  const users = getUsers();
  const u = users.find(x => x.id === id);
  if (!u) return null;
  fn(u);
  saveUsers(users);
  return u;
}

/* ---------- الجلسات ---------- */
let sessions = store.readJson(SESS, {}); // { sha256(token): {exp, uid} } — بنخزن الهاش بس، مش التوكن
(function fixOldSessions() {
  const first = (getUsers()[0] || {}).id;
  const now = Date.now();
  for (const k of Object.keys(sessions)) {
    if (typeof sessions[k] === 'number') sessions[k] = { exp: sessions[k], uid: first };
    if (!sessions[k] || sessions[k].exp < now) delete sessions[k];
  }
})();
const saveSessions = () => store.writeJson(SESS, sessions);

function newSession(days, uid) {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  for (const k of Object.keys(sessions)) if (!sessions[k] || sessions[k].exp < now) delete sessions[k];
  sessions[sha(token)] = { exp: now + days * 86400000, uid };
  saveSessions();
  return token;
}
function endSession(token) {
  if (token && sessions[sha(token)]) { delete sessions[sha(token)]; saveSessions(); }
}
function endOtherSessions(uid, keepToken) {
  const keep = keepToken ? sha(keepToken) : '';
  for (const k of Object.keys(sessions)) if (sessions[k].uid === uid && k !== keep) delete sessions[k];
  saveSessions();
}
function userFromToken(token) {
  if (!token) return null;
  const s = sessions[sha(token)];
  if (!s || s.exp <= Date.now()) return null;
  return getUsers().find(u => u.id === s.uid) || null;
}

/* ---------- الحماية من التخمين ---------- */
const attempts = new Map();
function locked(ip) { const a = attempts.get(ip); return !!a && a.until > Date.now(); }
function failed(ip) {
  const a = attempts.get(ip) || { n: 0, until: 0 };
  a.n++;
  a.t = Date.now();
  if (a.n >= cfg.LOGIN_MAX_TRIES) { a.until = Date.now() + cfg.LOGIN_LOCK_MS; a.n = 0; }
  attempts.set(ip, a);
}
const succeeded = ip => attempts.delete(ip);
setInterval(() => { // تنضيف عشان الـ Map ماتكبرش للأبد
  const now = Date.now();
  for (const [ip, a] of attempts) if (a.until < now && now - (a.t || 0) > 15 * 60 * 1000) attempts.delete(ip);
}, 10 * 60 * 1000).unref();

module.exports = {
  hashPw, verifyPw, getUsers, saveUsers, hasAccount, isOwner, cleanProfile, buildUser, patchUser,
  newSession, endSession, endOtherSessions, userFromToken, locked, failed, succeeded,
};
