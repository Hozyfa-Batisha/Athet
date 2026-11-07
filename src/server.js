'use strict';
// أثر — السيرفر. Node.js بدون أي مكتبات خارجية (http + fs + crypto بس).
const http = require('http');
const cfg = require('./config');
const store = require('./store');
const auth = require('./auth');
const views = require('./views');
const backup = require('./backup');
const { serveStatic } = require('./static');

const PUBLIC_PATHS = /^\/(favicon\.ico|manifest\.webmanifest|icons\/[\w.-]+)$/;

/* ---------- أدوات ---------- */
function clientIp(req) {
  if (cfg.TRUST_PROXY) {
    const xff = String(req.headers['x-forwarded-for'] || '').split(',').map(s => s.trim()).filter(Boolean);
    if (xff.length) return xff[xff.length - 1]; // آخر عنوان = اللي الـ proxy بتاعنا شافه
  }
  return req.socket.remoteAddress;
}
function isHttps(req) {
  if (cfg.COOKIE_SECURE === 'true') return true;
  if (cfg.COOKIE_SECURE === 'false') return false;
  return cfg.TRUST_PROXY && String(req.headers['x-forwarded-proto'] || '').split(',')[0].trim() === 'https';
}
function getCookie(req, name) {
  const m = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(name + '='));
  if (!m) return '';
  try { return decodeURIComponent(m.slice(name.length + 1)); } catch { return ''; }
}
function sessionCookie(req, token, days) {
  return 'sid=' + token + '; Path=/; HttpOnly; SameSite=Lax' + (isHttps(req) ? '; Secure' : '') + (days ? '; Max-Age=' + days * 86400 : '');
}
function json(res, obj, code) {
  res.writeHead(code || 200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}
function html(res, body, code) {
  res.writeHead(code || 200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(body);
}
function redirect(res, to, cookie) {
  const h = { Location: to };
  if (cookie) h['Set-Cookie'] = cookie;
  res.writeHead(302, h);
  res.end();
}
function readBody(req, res, limit, cb) {
  const chunks = [];
  let size = 0, done = false;
  req.on('data', c => {
    if (done) return;
    size += c.length;
    if (size > limit) {
      done = true;
      res.writeHead(413, { 'Content-Type': 'application/json', Connection: 'close' });
      res.end('{"ok":false,"error":"too large"}');
      req.destroy();
      return;
    }
    chunks.push(c);
  });
  req.on('end', () => {
    if (done) return;
    done = true;
    try { cb(Buffer.concat(chunks).toString('utf8')); } catch (e) { // خطأ في طلب واحد مايوقعش السيرفر كله
      console.error('[error]', req.method, req.url, e);
      if (!res.headersSent) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('حصل خطأ في السيرفر، جرّب تاني.'); }
    }
  });
  req.on('error', () => { done = true; });
}
const parseJson = s => { try { return JSON.parse(s); } catch { return null; } };
const setupTokenOk = t => !cfg.SETUP_TOKEN || t === cfg.SETUP_TOKEN;

function securityHeaders(res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');        // الألعاب بتتفتح في iframe من نفس الموقع
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), geolocation=(), microphone=()');
}

/* ---------- الراوتر ---------- */
async function handle(req, res) {
  securityHeaders(res);
  const [url, query = ''] = req.url.split('?');
  const qs = new URLSearchParams(query);
  const ip = clientIp(req);
  const M = req.method;

  if (url === '/healthz') return json(res, { ok: true });
  // الأيقونات والـ manifest متاحين من غير تسجيل (تاب المتصفح، صفحة الدخول، الشاشة الرئيسية للموبايل)
  if ((M === 'GET' || M === 'HEAD') && PUBLIC_PATHS.test(url)) return serveStatic(req, res, url);

  // --- صفحات الدخول (متاحة بدون تسجيل) ---
  if (url === '/login' && M === 'GET') {
    if (!auth.hasAccount()) return redirect(res, '/setup');
    if (auth.userFromToken(getCookie(req, 'sid'))) return redirect(res, '/');
    return html(res, views.loginPage('', cfg.ALLOW_SIGNUP));
  }
  if (url === '/login' && M === 'POST') {
    if (!auth.hasAccount()) return redirect(res, '/setup');
    return readBody(req, res, 10000, body => {
      if (auth.locked(ip)) return html(res, views.loginPage('محاولات كتير غلط. استنى دقيقة وجرّب تاني.', cfg.ALLOW_SIGNUP), 429);
      const f = new URLSearchParams(body);
      const u = auth.getUsers().find(x => x.user === String(f.get('user') || ''));
      if (!u || !auth.verifyPw(f.get('pass'), u)) {
        auth.failed(ip);
        return html(res, views.loginPage('اسم المستخدم أو كلمة السر غلط', cfg.ALLOW_SIGNUP), 401);
      }
      auth.succeeded(ip);
      const days = f.get('remember') ? 30 : 1;
      redirect(res, '/', sessionCookie(req, auth.newSession(days, u.id), f.get('remember') ? days : 0));
    });
  }
  if (url === '/setup' && M === 'GET') {
    if (auth.hasAccount()) return redirect(res, '/login');
    if (!setupTokenOk(qs.get('token'))) return html(res, views.setupLockedPage(), 403);
    return html(res, views.setupPage('', qs.get('token')));
  }
  if (url === '/setup' && M === 'POST') {
    if (auth.hasAccount()) { res.writeHead(403); return res.end(); }
    return readBody(req, res, 10000, body => {
      const f = new URLSearchParams(body);
      if (!setupTokenOk(f.get('token'))) return html(res, views.setupLockedPage(), 403);
      const r = auth.buildUser(f, []);
      if (r.error) return html(res, views.setupPage(r.error, f.get('token')), 400);
      auth.saveUsers([r.u]);
      redirect(res, '/', sessionCookie(req, auth.newSession(30, r.u.id), 30));
    });
  }
  if (url === '/signup') {
    if (!auth.hasAccount()) return redirect(res, '/setup');
    if (!cfg.ALLOW_SIGNUP) return html(res, views.closedPage(), 403);
    if (M === 'GET') return html(res, views.signupPage(''));
    if (M === 'POST') {
      return readBody(req, res, 10000, body => {
        const users = auth.getUsers();
        const r = auth.buildUser(new URLSearchParams(body), users);
        if (r.error) return html(res, views.signupPage(r.error), 400);
        users.push(r.u);
        auth.saveUsers(users);
        store.writeJson(r.u.file, {});
        redirect(res, '/', sessionCookie(req, auth.newSession(30, r.u.id), 30));
      });
    }
  }
  if (url === '/logout' && M === 'POST') {
    auth.endSession(getCookie(req, 'sid'));
    res.writeHead(200, { 'Content-Type': 'application/json', 'Set-Cookie': 'sid=; Path=/; HttpOnly; Max-Age=0' });
    return res.end('{"ok":true}');
  }

  // --- كل اللي تحت يحتاج تسجيل دخول ---
  const me = auth.userFromToken(getCookie(req, 'sid'));
  if (!me) {
    if (url.startsWith('/api/')) return json(res, { ok: false, error: 'auth' }, 401);
    return redirect(res, auth.hasAccount() ? '/login' : '/setup');
  }

  // --- الملف الشخصي والإعدادات ---
  if (url === '/api/me' && M === 'GET') {
    return json(res, { user: me.user || '', name: me.name || '', phone: me.phone || '', avatar: me.avatar || '' });
  }
  if (url === '/api/profile' && M === 'POST') {
    return readBody(req, res, 10000, body => {
      const d = parseJson(body) || {};
      const prof = auth.cleanProfile(d.name, d.phone);
      if (prof.error) return json(res, { ok: false, error: prof.error }, 400);
      const u = auth.patchUser(me.id, x => { x.name = prof.name; x.phone = prof.phone; });
      json(res, { ok: true, name: u.name, phone: u.phone });
    });
  }
  if (url === '/api/avatar' && M === 'POST') {
    return readBody(req, res, 600000, body => {
      const d = parseJson(body) || {};
      const img = String(d.image || '');
      if (img && (img.length > 400000 || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img))) {
        return json(res, { ok: false, error: 'الصورة غير صالحة أو كبيرة' }, 400);
      }
      const u = auth.patchUser(me.id, x => { if (img) x.avatar = img; else delete x.avatar; });
      json(res, { ok: true, avatar: u.avatar || '' });
    });
  }
  if (url === '/api/password' && M === 'POST') {
    return readBody(req, res, 10000, body => {
      if (auth.locked(ip)) return json(res, { ok: false, error: 'محاولات كتير غلط. استنى دقيقة.' }, 429);
      const d = parseJson(body) || {};
      if (!auth.verifyPw(d.old, me)) { auth.failed(ip); return json(res, { ok: false, error: 'كلمة السر الحالية غلط' }, 401); }
      const np = String(d.pass || '');
      if (np.length < 6) return json(res, { ok: false, error: 'كلمة السر الجديدة لازم تكون ٦ حروف على الأقل' }, 400);
      auth.succeeded(ip);
      const crypto = require('crypto');
      const salt = crypto.randomBytes(16).toString('hex');
      auth.patchUser(me.id, x => { x.salt = salt; x.hash = auth.hashPw(np, salt); });
      auth.endOtherSessions(me.id, getCookie(req, 'sid')); // نسيب الجلسة الحالية بس ونقفل باقي الأجهزة
      json(res, { ok: true });
    });
  }

  if (url === '/api/schedule' && M === 'GET') {
    const f = me.file || 'schedule.json';
    if (!store.exists(f)) store.writeJson(f, {});
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
    return res.end(store.readRaw(f, '{}'));
  }
  if (url === '/api/schedule' && M === 'POST') {
    return readBody(req, res, cfg.SCHEDULE_MAX_BYTES, body => {
      const d = parseJson(body);
      if (!d || typeof d !== 'object' || Array.isArray(d)) return json(res, { ok: false }, 400);
      store.writeRaw(me.file || 'schedule.json', body);
      json(res, { ok: true });
    });
  }

  if (url === '/api/backup-now') { // صاحب الموقع (أول حساب) بس
    if (!auth.isOwner(me)) return json(res, { ok: false, error: 'forbidden' }, 403);
    const r = await backup.sendBackup('يدوي');
    return html(res, '<h2 dir="rtl" style="font-family:sans-serif;padding:24px">' + views.esc(r.msg) + '</h2>', r.ok ? 200 : 502);
  }

  if (M !== 'GET' && M !== 'HEAD') { res.writeHead(405); return res.end(); }
  return serveStatic(req, res, url);
}

const server = http.createServer((req, res) => {
  Promise.resolve(handle(req, res)).catch(e => {
    console.error('[error]', req.method, req.url, e);
    if (!res.headersSent) { res.writeHead(500); res.end(); }
  });
});
server.requestTimeout = 60 * 1000;
server.headersTimeout = 20 * 1000;

if (require.main === module) {
  server.listen(cfg.PORT, cfg.HOST, () => {
    console.log(`أثر شغال على http://localhost:${cfg.PORT}  (data: ${cfg.DATA_DIR}, signup: ${cfg.ALLOW_SIGNUP ? 'on' : 'off'})`);
    if (!auth.hasAccount()) console.log(cfg.SETUP_TOKEN ? 'أول حساب: افتح /setup?token=<SETUP_TOKEN>' : 'أول حساب: افتح /setup');
  });
  backup.startScheduler();
  const stop = sig => { console.log('[shutdown]', sig); server.close(() => process.exit(0)); setTimeout(() => process.exit(0), 5000).unref(); };
  process.on('SIGTERM', stop);
  process.on('SIGINT', stop);
}

module.exports = { server, handle };
