import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { HttpError, html, safeJson } from "./http.js";
import { bootstrap } from "../repositories/settings.js";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
};

export async function serveStatic({ req, res, url, db, session, config }) {
  if (!["GET", "HEAD"].includes(req.method))
    throw new HttpError(405, "طريقة الطلب غير مسموحة.");
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    throw new HttpError(400, "مسار غير صالح.");
  }
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/Games/hurufi.html") pathname = "/games/hurufi.html";
  if (
    pathname.includes("\0") ||
    pathname.includes("\\") ||
    pathname.split("/").some((segment) => segment.startsWith("."))
  )
    throw new HttpError(404, "الملف غير موجود.");
  const target = path.resolve(config.publicDir, "." + pathname);
  if (!target.startsWith(config.publicDir + path.sep))
    throw new HttpError(404, "الملف غير موجود.");
  let stat, real;
  try {
    real = await fsp.realpath(target);
    stat = await fsp.stat(real);
  } catch {
    throw new HttpError(404, "الملف غير موجود.");
  }
  if (!real.startsWith(config.publicDir + path.sep) || !stat.isFile())
    throw new HttpError(404, "الملف غير موجود.");
  const extension = path.extname(real).toLowerCase();
  if (!MIME[extension]) throw new HttpError(404, "الملف غير موجود.");
  if (extension === ".html") {
    const template = await fsp.readFile(real, "utf8");
    const body = template.includes("__ATHAR_BOOTSTRAP_JSON__")
      ? template.replace(
          "__ATHAR_BOOTSTRAP_JSON__",
          safeJson(await bootstrap(db, session, session)),
        )
      : template;
    if (req.method === "HEAD") {
      res.writeHead(200, {
        "Content-Type": MIME[extension],
        "Content-Length": Buffer.byteLength(body),
      });
      res.end();
    } else html(res, body);
    return;
  }
  let start = 0,
    end = stat.size - 1,
    status = 200;
  const headers = { "Content-Type": MIME[extension], "Accept-Ranges": "bytes" };
  if (req.headers.range) {
    const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if (!match || (!match[1] && !match[2]))
      throw new HttpError(416, "النطاق غير صالح.");
    start = match[1]
      ? Number(match[1])
      : Math.max(0, stat.size - Number(match[2]));
    end =
      match[1] && match[2]
        ? Math.min(Number(match[2]), stat.size - 1)
        : stat.size - 1;
    if (
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) ||
      start > end ||
      start >= stat.size
    ) {
      res.setHeader("Content-Range", `bytes */${stat.size}`);
      throw new HttpError(416, "النطاق غير صالح.");
    }
    headers["Content-Range"] = `bytes ${start}-${end}/${stat.size}`;
    status = 206;
  }
  headers["Content-Length"] = Math.max(0, end - start + 1);
  res.writeHead(status, headers);
  if (req.method === "HEAD" || stat.size === 0) {
    res.end();
    return;
  }
  const stream = fs.createReadStream(real, { start, end });
  stream.on("error", () => res.destroy());
  res.on("close", () => stream.destroy());
  stream.pipe(res);
}
