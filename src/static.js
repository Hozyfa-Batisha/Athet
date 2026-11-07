'use strict';
// الملفات الثابتة (public/): Range للصوت، كاش للمتصفح، وضغط gzip/brotli للنصوص.
// الضغط بيتعمل مرة واحدة لكل ملف ويتحفظ في الذاكرة (index.html ‏358KB ← ~100KB).
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { PUBLIC_DIR } = require('./config');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.mp3': 'audio/mpeg', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json; charset=utf-8',
};
const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.svg', '.txt', '.webmanifest']);
const cache = new Map(); // filePath -> { mtimeMs, br, gzip, etag }

function compressed(filePath, st) {
  let c = cache.get(filePath);
  if (!c || c.mtimeMs !== st.mtimeMs) {
    const raw = fs.readFileSync(filePath);
    c = {
      mtimeMs: st.mtimeMs,
      etag: '"' + st.size.toString(36) + '-' + Math.floor(st.mtimeMs).toString(36) + '"',
      br: zlib.brotliCompressSync(raw, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 9 } }),
      gzip: zlib.gzipSync(raw, { level: 9 }),
    };
    cache.set(filePath, c);
  }
  return c;
}

function cacheControl(ext) {
  if (ext === '.html') return 'no-cache';                      // دايمًا اسأل السيرفر (ETag) عشان التحديثات توصل
  if (ext === '.mp3' || ext === '.webp') return 'public, max-age=2592000, immutable'; // الصوت وصفحات المصحف مابيتغيروش
  return 'public, max-age=86400';
}

function serveStatic(req, res, url) {
  const file = url === '/' ? '/index.html' : url;
  let rel;
  try { rel = decodeURIComponent(file); } catch { res.writeHead(400); return res.end(); }
  const filePath = path.join(PUBLIC_DIR, path.normalize(rel));
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) { res.writeHead(403); return res.end(); }
  fs.stat(filePath, (e, st) => {
    if (e || !st.isFile()) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Not found'); }
    const ext = path.extname(filePath).toLowerCase();
    const head = { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': cacheControl(ext) };

    if (COMPRESSIBLE.has(ext) && st.size > 1024) {
      const c = compressed(filePath, st);
      head.ETag = c.etag;
      head.Vary = 'Accept-Encoding';
      if (req.headers['if-none-match'] === c.etag) { res.writeHead(304, head); return res.end(); }
      const ae = String(req.headers['accept-encoding'] || '');
      const enc = /\bbr\b/.test(ae) ? 'br' : /\bgzip\b/.test(ae) ? 'gzip' : null;
      if (enc) {
        res.writeHead(200, Object.assign(head, { 'Content-Encoding': enc, 'Content-Length': c[enc].length }));
        return res.end(req.method === 'HEAD' ? undefined : c[enc]);
      }
    }

    head['Accept-Ranges'] = 'bytes';
    const m = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range || '');
    if (m && (m[1] || m[2])) {                                   // الصوت محتاج Range عشان التقديم والتأخير
      const start = m[1] ? parseInt(m[1], 10) : Math.max(0, st.size - parseInt(m[2], 10));
      const end = m[1] && m[2] ? Math.min(parseInt(m[2], 10), st.size - 1) : st.size - 1;
      if (start > end || start >= st.size) { res.writeHead(416, { 'Content-Range': 'bytes */' + st.size }); return res.end(); }
      res.writeHead(206, Object.assign(head, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + st.size, 'Content-Length': end - start + 1 }));
      return req.method === 'HEAD' ? res.end() : fs.createReadStream(filePath, { start, end }).pipe(res);
    }
    res.writeHead(200, Object.assign(head, { 'Content-Length': st.size }));
    return req.method === 'HEAD' ? res.end() : fs.createReadStream(filePath).pipe(res);
  });
}

module.exports = { serveStatic };
