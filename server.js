const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 3000;
const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.mp3': 'audio/mpeg', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8'
};
const DATA_FILE = path.join(__dirname, 'schedule.json');
const PUBLIC_DIR = path.join(__dirname, 'public');
const TG_FILE = path.join(__dirname, 'telegram.json');        // إعدادات تيليجرام (سرّية)
const STATE_FILE = path.join(__dirname, 'backup-state.json'); // آخر مرة اترفعت فيها نسخة
const AUTH_FILE = path.join(__dirname, 'auth.json');          // حساب الدخول (كلمة السر متشفرة)
const SESS_FILE = path.join(__dirname, 'sessions.json');      // الجلسات المفتوحة

if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '{}');
if (!fs.existsSync(TG_FILE)) {
  fs.writeFileSync(TG_FILE, JSON.stringify({ token: '', chatId: '', everyDays: 7 }, null, 2));
}

function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; }
}

/* ===== تسجيل الدخول ===== */
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const hashPw = (pw, salt) => crypto.scryptSync(pw, salt, 64).toString('hex');
// auth.json = { users: [ {id, user, name, phone, avatar?, salt, hash, file} ] }
// (لو لقى الصيغة القديمة - حساب واحد - بيحوّلها لوحده من غير ما يضيع حاجة)
function getUsers() {
  const a = readJson(AUTH_FILE, null);
  if (!a) return [];
  if (Array.isArray(a.users)) return a.users;
  if (a.user && a.hash) return [Object.assign({ id: 'u1', file: 'schedule.json' }, a)];
  return [];
}
function saveUsers(users) { fs.writeFileSync(AUTH_FILE, JSON.stringify({ users })); }
const hasAccount = () => getUsers().length > 0;
const dataFileOf = u => path.join(__dirname, u.file || 'schedule.json');
(function migrateAuth() {
  const a = readJson(AUTH_FILE, null);
  if (a && !Array.isArray(a.users) && a.user && a.hash) {
    fs.copyFileSync(AUTH_FILE, path.join(__dirname, 'auth-old-backup.json'));
    saveUsers(getUsers());
  }
})();

let sessions = readJson(SESS_FILE, {});           // { sha256(token): {exp, uid} }
(function fixOldSessions() {                      // جلسات الصيغة القديمة كانت رقم بس
  const first = (getUsers()[0] || {}).id;
  for (const k of Object.keys(sessions)) if (typeof sessions[k] === 'number') sessions[k] = { exp: sessions[k], uid: first };
})();
function saveSessions() { fs.writeFileSync(SESS_FILE, JSON.stringify(sessions)); }
function newSession(days, uid) {
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  for (const k of Object.keys(sessions)) if (!sessions[k] || sessions[k].exp < now) delete sessions[k];
  sessions[sha(token)] = { exp: now + days * 86400000, uid };
  saveSessions();
  return token;
}
function getCookie(req, name) {
  const m = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(name + '='));
  return m ? decodeURIComponent(m.slice(name.length + 1)) : '';
}
function currentUser(req) {
  const t = getCookie(req, 'sid');
  if (!t) return null;
  const s = sessions[sha(t)];
  if (!s || s.exp <= Date.now()) return null;
  return getUsers().find(u => u.id === s.uid) || null;
}
const isAuthed = req => !!currentUser(req);
function sessionCookie(token, days) {
  return 'sid=' + token + '; Path=/; HttpOnly; SameSite=Lax' + (days ? '; Max-Age=' + days * 86400 : '');
}

const attempts = new Map();                       // حماية من تخمين كلمة السر
function locked(ip) { const a = attempts.get(ip); return a && a.until > Date.now(); }
function failed(ip) {
  const a = attempts.get(ip) || { n: 0, until: 0 };
  a.n++;
  if (a.n >= 5) { a.until = Date.now() + 60 * 1000; a.n = 0; }
  attempts.set(ip, a);
}

function cleanProfile(name, phone) {
  name = String(name || '').trim().slice(0, 40);
  phone = String(phone || '').replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)).trim();
  const digits = phone.replace(/\D/g, '');
  if (name.length < 2) return { error: 'اكتب الاسم (حرفين على الأقل)' };
  if (digits.length < 8 || digits.length > 15) return { error: 'رقم الهاتف غير صحيح' };
  return { name, phone: phone.replace(/[^\d+\s-]/g, '').trim() };
}
function json(res, obj, code) {
  res.writeHead(code || 200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(obj));
}

function readBody(req, limit, cb) {
  let b = '', big = false;
  req.on('data', c => { b += c; if (b.length > limit) { big = true; req.destroy(); } });
  req.on('end', () => { if (!big) cb(b); });
}
function redirect(res, to, cookie) {
  const h = { Location: to };
  if (cookie) h['Set-Cookie'] = cookie;
  res.writeHead(302, h);
  res.end();
}
function html(res, body, code) {
  res.writeHead(code || 200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(body);
}

function page(title, inner) {
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800&family=Aref+Ruqaa:wght@400;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;font-family:'Cairo',sans-serif;background:#0B3B30;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23E3C27A' stroke-opacity='.14' stroke-width='1.2'%3E%3Crect x='20' y='20' width='40' height='40'/%3E%3Crect x='20' y='20' width='40' height='40' transform='rotate(45 40 40)'/%3E%3Ccircle cx='40' cy='40' r='9'/%3E%3C/g%3E%3C/svg%3E")}
.basmala{background:linear-gradient(90deg,#083B30,#0E6B55 50%,#083B30);color:#EBD28F;text-align:center;font-family:'Aref Ruqaa',serif;font-size:1.2rem;line-height:2;border-bottom:2px solid #C9A24B}
.wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:20px}
.card{width:100%;max-width:400px;background:#FFFDF6;border:2px solid #C9A24B;border-radius:24px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
h1{font-family:'Reem Kufi','Cairo',sans-serif;font-size:1.6rem;margin:0 0 4px;color:#0A4F40;text-align:center}
p.sub{margin:0 0 18px;text-align:center;color:#6b6a5e;font-size:.85rem;font-weight:700}
label{display:block;font-size:.8rem;font-weight:800;color:#334155;margin:12px 0 4px}
input[type=text],input[type=password]{width:100%;padding:11px 14px;border:2px solid #C9A24B;border-radius:12px;background:#F6F1E2;font-family:inherit;font-size:1rem;font-weight:700;outline:none}
input:focus{border-color:#0E6B55}
.chk{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:.85rem;font-weight:700;color:#334155}
button{width:100%;margin-top:18px;padding:12px;border:0;border-radius:12px;background:#0E6B55;color:#fff;font-family:inherit;font-size:1rem;font-weight:800;cursor:pointer}
button:hover{background:#0A4F40}
.lnk{display:block;text-align:center;margin-top:14px;font-size:.85rem;font-weight:800;color:#0E6B55;text-decoration:none}
.lnk:hover{text-decoration:underline}
.err{background:#fee2e2;color:#b91c1c;border-radius:10px;padding:8px 12px;font-size:.85rem;font-weight:700;margin-bottom:6px;text-align:center}
</style></head><body><div class="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div><div class="wrap"><div class="card">${inner}</div></div></body></html>`;
}
const err = m => (m ? `<div class="err">${m}</div>` : '');
const loginPage = m => page('تسجيل الدخول', `<h1>تسجيل الدخول</h1><p class="sub">جدول الحصص الأسبوعي</p>${err(m)}
<form method="POST" action="/login"><label>اسم المستخدم</label><input type="text" name="user" required autofocus autocomplete="username">
<label>كلمة السر</label><input type="password" name="pass" required autocomplete="current-password">
<div class="chk"><input type="checkbox" id="rm" name="remember" value="1" checked><label for="rm" style="margin:0">تذكّرني على هذا الجهاز (٣٠ يوم)</label></div>
<button type="submit">دخول</button></form>
<a class="lnk" href="/signup">مفيش عندك حساب؟ إنشاء حساب جديد</a>`);
const accountForm = (title, sub, action, btn, m, extra) => page(title, `<h1>${title}</h1><p class="sub">${sub}</p>${err(m)}
<form method="POST" action="${action}"><label>الاسم</label><input type="text" name="name" required autofocus autocomplete="name">
<label>رقم الهاتف</label><input type="text" name="phone" required inputmode="tel" autocomplete="tel" placeholder="مثال: 01012345678">
<label>اسم المستخدم (للدخول)</label><input type="text" name="user" required autocomplete="username">
<label>كلمة السر (٦ حروف على الأقل)</label><input type="password" name="pass" required autocomplete="new-password">
<label>تأكيد كلمة السر</label><input type="password" name="pass2" required autocomplete="new-password">
<button type="submit">${btn}</button></form>${extra || ''}`);
const setupPage = m => accountForm('إنشاء حساب الدخول', 'أول مرة؟ اختر اسم مستخدم وكلمة سر', '/setup', 'إنشاء الحساب والدخول', m);
const signupPage = m => accountForm('إنشاء حساب جديد', 'كل حساب له جدوله وطلابه الخاصين', '/signup', 'إنشاء الحساب والدخول', m, '\n<a class="lnk" href="/login">عندي حساب بالفعل - تسجيل الدخول</a>');

// تحقق من بيانات حساب جديد وتجهيزه
function buildUser(f, users) {
  const user = String(f.get('user') || '').trim(), pass = String(f.get('pass') || '');
  const prof = cleanProfile(f.get('name'), f.get('phone'));
  if (prof.error) return { error: prof.error };
  if (user.length < 3) return { error: 'اسم المستخدم لازم يكون ٣ حروف على الأقل' };
  if (pass.length < 6) return { error: 'كلمة السر لازم تكون ٦ حروف على الأقل' };
  if (pass !== String(f.get('pass2') || '')) return { error: 'كلمتا السر غير متطابقتين' };
  if (users.some(x => String(x.user).toLowerCase() === user.toLowerCase())) return { error: 'اسم المستخدم ده موجود قبل كده، اختار اسم تاني' };
  const id = crypto.randomBytes(5).toString('hex');
  const salt = crypto.randomBytes(16).toString('hex');
  return { u: { id, user, name: prof.name, phone: prof.phone, salt, hash: hashPw(pass, salt), file: users.length ? 'data-' + id + '.json' : 'schedule.json' } };
}

/* ===== النسخ الاحتياطي على تيليجرام ===== */
async function sendBackup(reason) {
  const cfg = readJson(TG_FILE, {});
  if (!cfg.token || !cfg.chatId) return { ok: false, msg: 'لم يتم ضبط ملف telegram.json بعد (التوكن ورقم الشات).' };

  const stamp = new Date().toISOString().slice(0, 10);
  const form = new FormData();
  form.append('chat_id', String(cfg.chatId));
  form.append('caption', 'نسخة احتياطية - ' + stamp + (reason ? ' (' + reason + ')' : ''));
  form.append('document', new Blob([fs.readFileSync(DATA_FILE)], { type: 'application/json' }), 'schedule-backup-' + stamp + '.json');

  try {
    const res = await fetch('https://api.telegram.org/bot' + cfg.token + '/sendDocument', { method: 'POST', body: form });
    const j = await res.json();
    if (j.ok) {
      fs.writeFileSync(STATE_FILE, JSON.stringify({ last: Date.now() }));
      return { ok: true, msg: 'حفتراوي بيعمل المستحيييل' };
    }
    return { ok: false, msg: 'رفض تيليجرام الطلب: ' + j.description };
  } catch (e) {
    return { ok: false, msg: 'تعذر الاتصال بتيليجرام: ' + e.message };
  }
}

async function checkBackup() {
  const cfg = readJson(TG_FILE, {});
  if (!cfg.token || !cfg.chatId) return;
  const days = Number(cfg.everyDays) > 0 ? Number(cfg.everyDays) : 7;
  const last = readJson(STATE_FILE, { last: 0 }).last || 0;
  if (Date.now() - last >= days * 24 * 3600 * 1000) {
    const r = await sendBackup('تلقائي');
    console.log('[نسخة احتياطية]', r.msg);
  }
}
setTimeout(checkBackup, 15 * 1000);
setInterval(checkBackup, 60 * 60 * 1000);

/* ===== السيرفر ===== */
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  const ip = req.socket.remoteAddress;

  // --- صفحات الدخول (متاحة بدون تسجيل) ---
  if (url === '/login' && req.method === 'GET') {
    if (!hasAccount()) return redirect(res, '/setup');
    if (isAuthed(req)) return redirect(res, '/');
    return html(res, loginPage(''));
  }
  if (url === '/login' && req.method === 'POST') {
    if (!hasAccount()) return redirect(res, '/setup');
    return readBody(req, 10000, body => {
      if (locked(ip)) return html(res, loginPage('محاولات كتير غلط. استنى دقيقة وجرّب تاني.'), 429);
      const f = new URLSearchParams(body);
      const u = getUsers().find(x => x.user === String(f.get('user') || ''));
      let ok = false;
      try {
        ok = !!u && crypto.timingSafeEqual(Buffer.from(hashPw(String(f.get('pass') || ''), u.salt), 'hex'), Buffer.from(u.hash, 'hex'));
      } catch { ok = false; }
      if (!ok) { failed(ip); return html(res, loginPage('اسم المستخدم أو كلمة السر غلط'), 401); }
      attempts.delete(ip);
      const days = f.get('remember') ? 30 : 1;
      redirect(res, '/', sessionCookie(newSession(days, u.id), f.get('remember') ? days : 0));
    });
  }
  if (url === '/setup' && req.method === 'GET') {
    if (hasAccount()) return redirect(res, '/login');
    return html(res, setupPage(''));
  }
  if (url === '/setup' && req.method === 'POST') {
    if (hasAccount()) { res.writeHead(403); return res.end(); }
    return readBody(req, 10000, body => {
      const r = buildUser(new URLSearchParams(body), []);
      if (r.error) return html(res, setupPage(r.error), 400);
      saveUsers([r.u]);
      redirect(res, '/', sessionCookie(newSession(30, r.u.id), 30));
    });
  }
  if (url === '/signup' && req.method === 'GET') {
    if (!hasAccount()) return redirect(res, '/setup');
    return html(res, signupPage(''));
  }
  if (url === '/signup' && req.method === 'POST') {
    if (!hasAccount()) return redirect(res, '/setup');
    return readBody(req, 10000, body => {
      const users = getUsers();
      const r = buildUser(new URLSearchParams(body), users);
      if (r.error) return html(res, signupPage(r.error), 400);
      users.push(r.u);
      saveUsers(users);
      fs.writeFileSync(dataFileOf(r.u), '{}');
      redirect(res, '/', sessionCookie(newSession(30, r.u.id), 30));
    });
  }
  if (url === '/logout' && req.method === 'POST') {
    const t = getCookie(req, 'sid');
    if (t) { delete sessions[sha(t)]; saveSessions(); }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Set-Cookie': 'sid=; Path=/; HttpOnly; Max-Age=0' });
    return res.end('{"ok":true}');
  }

  // --- كل اللي تحت يحتاج تسجيل دخول ---
  if (!isAuthed(req)) {
    if (url.startsWith('/api/')) { res.writeHead(401, { 'Content-Type': 'application/json' }); return res.end('{"ok":false,"error":"auth"}'); }
    return redirect(res, hasAccount() ? '/login' : '/setup');
  }

  const me = currentUser(req);
  function patchMe(fn) {
    const users = getUsers();
    const u = users.find(x => x.id === me.id);
    fn(u);
    saveUsers(users);
    return u;
  }

  // --- الملف الشخصي والإعدادات ---
  if (url === '/api/me' && req.method === 'GET') {
    return json(res, { user: me.user || '', name: me.name || '', phone: me.phone || '', avatar: me.avatar || '' });
  }
  if (url === '/api/profile' && req.method === 'POST') {
    return readBody(req, 10000, body => {
      let d = {};
      try { d = JSON.parse(body); } catch {}
      const prof = cleanProfile(d.name, d.phone);
      if (prof.error) return json(res, { ok: false, error: prof.error }, 400);
      const u = patchMe(x => { x.name = prof.name; x.phone = prof.phone; });
      json(res, { ok: true, name: u.name, phone: u.phone });
    });
  }
  if (url === '/api/avatar' && req.method === 'POST') {
    return readBody(req, 600000, body => {
      let d = {};
      try { d = JSON.parse(body); } catch {}
      const img = String(d.image || '');
      if (img && (img.length > 400000 || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(img))) {
        return json(res, { ok: false, error: 'الصورة غير صالحة أو كبيرة' }, 400);
      }
      const u = patchMe(x => { if (img) x.avatar = img; else delete x.avatar; });
      json(res, { ok: true, avatar: u.avatar || '' });
    });
  }
  if (url === '/api/password' && req.method === 'POST') {
    return readBody(req, 10000, body => {
      if (locked(ip)) return json(res, { ok: false, error: 'محاولات كتير غلط. استنى دقيقة.' }, 429);
      let d = {};
      try { d = JSON.parse(body); } catch {}
      let ok = false;
      try { ok = crypto.timingSafeEqual(Buffer.from(hashPw(String(d.old || ''), me.salt), 'hex'), Buffer.from(me.hash, 'hex')); } catch { ok = false; }
      if (!ok) { failed(ip); return json(res, { ok: false, error: 'كلمة السر الحالية غلط' }, 401); }
      const np = String(d.pass || '');
      if (np.length < 6) return json(res, { ok: false, error: 'كلمة السر الجديدة لازم تكون ٦ حروف على الأقل' }, 400);
      attempts.delete(ip);
      const salt = crypto.randomBytes(16).toString('hex');
      patchMe(x => { x.salt = salt; x.hash = hashPw(np, salt); });
      const cur = sha(getCookie(req, 'sid'));                 // نسيب الجلسة الحالية بس ونقفل باقي أجهزة نفس الحساب
      for (const k of Object.keys(sessions)) if (sessions[k].uid === me.id && k !== cur) delete sessions[k];
      saveSessions();
      json(res, { ok: true });
    });
  }

  if (url === '/api/schedule' && req.method === 'GET') {
    const f = dataFileOf(me);
    if (!fs.existsSync(f)) fs.writeFileSync(f, '{}');
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(fs.readFileSync(f, 'utf8'));
  }

  if (url === '/api/schedule' && req.method === 'POST') {
    return readBody(req, 20 * 1024 * 1024, body => {
      try {
        JSON.parse(body);
        fs.writeFileSync(dataFileOf(me), body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end('{"ok":true}');
      } catch {
        res.writeHead(400);
        res.end('{"ok":false}');
      }
    });
  }

  if (url === '/api/backup-now') {
    return sendBackup('يدوي').then(r => {
      html(res, '<h2 dir="rtl" style="font-family:sans-serif;padding:24px">' + r.msg + '</h2>');
    });
  }

  const file = url === '/' ? '/index.html' : url;
  let rel; try { rel = decodeURIComponent(file); } catch { res.writeHead(400); return res.end(); }
  const filePath = path.join(PUBLIC_DIR, path.normalize(rel));
  if (!filePath.startsWith(PUBLIC_DIR)) { res.writeHead(403); return res.end(); }
  fs.stat(filePath, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404); return res.end('Not found'); }
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    const head = { 'Content-Type': type, 'Accept-Ranges': 'bytes' };
    const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (m && (m[1] || m[2])) {                                   // الصوت محتاج Range عشان التقديم والتأخير
      let start = m[1] ? parseInt(m[1], 10) : Math.max(0, st.size - parseInt(m[2], 10));
      let end = m[1] && m[2] ? Math.min(parseInt(m[2], 10), st.size - 1) : st.size - 1;
      if (start > end || start >= st.size) { res.writeHead(416, { 'Content-Range': 'bytes */' + st.size }); return res.end(); }
      res.writeHead(206, Object.assign(head, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + st.size, 'Content-Length': end - start + 1 }));
      return fs.createReadStream(filePath, { start, end }).pipe(res);
    }
    res.writeHead(200, Object.assign(head, { 'Content-Length': st.size }));
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => console.log('شغال على http://localhost:' + PORT));
