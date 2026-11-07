'use strict';
// اختبارات تكامل: بنشغل السيرفر الحقيقي على بورت عشوائي ومجلد بيانات مؤقت.
const { test, before, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DATA = fs.mkdtempSync(path.join(os.tmpdir(), 'athar-test-'));
Object.assign(process.env, { DATA_DIR: DATA, SETUP_TOKEN: 'tok123', ALLOW_SIGNUP: 'false', TRUST_PROXY: 'true' });
const { server } = require('../src/server');

let base;
before(() => new Promise(r => server.listen(0, '127.0.0.1', () => { base = `http://127.0.0.1:${server.address().port}`; r(); })));
after(() => { server.close(); fs.rmSync(DATA, { recursive: true, force: true }); });

const form = o => new URLSearchParams(o).toString();
const post = (p, body, headers = {}) => fetch(base + p, { method: 'POST', body, redirect: 'manual', headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers } });
const cookieOf = r => (r.headers.get('set-cookie') || '').split(';')[0];
const acct = { name: 'Omar', phone: '01012345678', user: 'omar', pass: 'secret12', pass2: 'secret12' };
let sid;

test('health endpoint works without login', async () => {
  const r = await fetch(base + '/healthz');
  assert.equal(r.status, 200);
  assert.deepEqual(await r.json(), { ok: true });
});

test('fresh install: / redirects to /setup, and /setup needs the token', async () => {
  const r = await fetch(base + '/', { redirect: 'manual' });
  assert.equal(r.status, 302);
  assert.equal(r.headers.get('location'), '/setup');
  assert.equal((await fetch(base + '/setup')).status, 403);
  assert.equal((await fetch(base + '/setup?token=wrong')).status, 403);
  assert.equal((await fetch(base + '/setup?token=tok123')).status, 200);
  assert.equal((await post('/setup', form({ ...acct, token: 'nope' }))).status, 403);
});

test('setup with token creates the owner and logs in', async () => {
  const r = await post('/setup', form({ ...acct, token: 'tok123' }));
  assert.equal(r.status, 302);
  sid = cookieOf(r);
  assert.match(sid, /^sid=[0-9a-f]{64}$/);
  const auth = JSON.parse(fs.readFileSync(path.join(DATA, 'auth.json'), 'utf8'));
  assert.equal(auth.users.length, 1);
  assert.ok(!JSON.stringify(auth).includes('secret12'), 'password must be hashed');
  assert.equal((await fetch(base + '/setup?token=tok123', { redirect: 'manual' })).status, 302, 'setup closes after first account');
});

test('signup is closed when ALLOW_SIGNUP=false', async () => {
  assert.equal((await fetch(base + '/signup')).status, 403);
  assert.equal((await post('/signup', form({ ...acct, user: 'evil' }))).status, 403);
  assert.ok(!(await (await fetch(base + '/login')).text()).includes('href="/signup"'));
});

test('API needs a session; schedule round-trips', async () => {
  assert.equal((await fetch(base + '/api/schedule')).status, 401);
  const me = await (await fetch(base + '/api/me', { headers: { Cookie: sid } })).json();
  assert.equal(me.user, 'omar');
  const data = { students: [{ name: 'أحمد', day: 'السبت' }] };
  const w = await fetch(base + '/api/schedule', { method: 'POST', headers: { Cookie: sid }, body: JSON.stringify(data) });
  assert.equal(w.status, 200);
  const g = await (await fetch(base + '/api/schedule', { headers: { Cookie: sid } })).json();
  assert.deepEqual(g, data);
  const bad = await fetch(base + '/api/schedule', { method: 'POST', headers: { Cookie: sid }, body: '[1,2]' });
  assert.equal(bad.status, 400, 'only JSON objects are accepted');
});

test('login brute-force lock is per real client IP (X-Forwarded-For)', async () => {
  const wrong = ip => post('/login', form({ user: 'omar', pass: 'nope' }), { 'X-Forwarded-For': ip });
  for (let i = 0; i < 5; i++) assert.equal((await wrong('10.0.0.1')).status, 401);
  assert.equal((await wrong('10.0.0.1')).status, 429, 'attacker IP is locked');
  const ok = await post('/login', form({ user: 'omar', pass: 'secret12' }), { 'X-Forwarded-For': '10.0.0.2' });
  assert.equal(ok.status, 302, 'other users are not locked out');
});

test('session cookie is Secure behind HTTPS proxy', async () => {
  const r = await post('/login', form({ user: 'omar', pass: 'secret12' }), { 'X-Forwarded-For': '10.0.0.3', 'X-Forwarded-Proto': 'https' });
  assert.match(r.headers.get('set-cookie'), /; Secure/);
});

test('static: compression, caching, ranges and no path traversal', async () => {
  const r = await fetch(base + '/', { headers: { Cookie: sid, 'Accept-Encoding': 'br' } });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('content-encoding'), 'br');
  assert.equal(r.headers.get('x-content-type-options'), 'nosniff');
  const etag = r.headers.get('etag');
  assert.equal((await fetch(base + '/', { headers: { Cookie: sid, 'If-None-Match': etag } })).status, 304);
  const audio = fs.readdirSync(path.join(__dirname, '..', 'public', 'audio'))[0];
  const part = await fetch(base + '/audio/' + audio, { headers: { Cookie: sid, Range: 'bytes=0-99' } });
  assert.equal(part.status, 206);
  assert.equal((await part.arrayBuffer()).byteLength, 100);
  for (const p of ['/..%2f..%2fpackage.json', '/%2e%2e/src/config.js']) {
    assert.ok([403, 404].includes((await fetch(base + p, { headers: { Cookie: sid } })).status), p);
  }
});

test('backup-now is owner-only and reports missing config', async () => {
  const r = await fetch(base + '/api/backup-now', { headers: { Cookie: sid } });
  assert.equal(r.status, 502);
  assert.match(await r.text(), /TELEGRAM_TOKEN/);
});

test('oversized body gets 413 instead of a dropped connection', async () => {
  const r = await post('/login', 'x'.repeat(20000));
  assert.equal(r.status, 413);
});

test('a write failure returns 500 and does not crash the server', async () => {
  fs.chmodSync(DATA, 0o500);                       // data dir becomes read-only
  try {
    const r = await fetch(base + '/api/schedule', { method: 'POST', headers: { Cookie: sid }, body: '{"a":1}' });
    assert.equal(r.status, 500);
  } finally { fs.chmodSync(DATA, 0o700); }
  assert.equal((await fetch(base + '/healthz')).status, 200, 'server still alive');
});

test('icons and manifest load without a session; other files do not', async () => {
  for (const p of ['/favicon.ico', '/icons/icon.svg', '/icons/icon-512.png', '/manifest.webmanifest']) {
    assert.equal((await fetch(base + p)).status, 200, p);
  }
  assert.equal((await fetch(base + '/css/app.css', { redirect: 'manual' })).status, 302);
  assert.match(await (await fetch(base + '/login')).text(), /rel="icon"/);
});
