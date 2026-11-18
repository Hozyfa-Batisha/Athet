export class HttpError extends Error {
  constructor(status, message, details = {}) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function json(res, data, status = 200, headers = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...headers,
  });
  res.end(body);
}

export function html(res, body, status = 200, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "text/html; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...headers,
  });
  res.end(body);
}

export function redirect(res, location, cookie) {
  res.writeHead(303, {
    Location: location,
    ...(cookie ? { "Set-Cookie": cookie } : {}),
  });
  res.end();
}

export async function readBody(req, limit = 512000) {
  if (Number(req.headers["content-length"]) > limit)
    throw new HttpError(413, "حجم الطلب أكبر من المسموح.");
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > limit) throw new HttpError(413, "حجم الطلب أكبر من المسموح.");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export async function readJson(req, limit) {
  if (!String(req.headers["content-type"] || "").startsWith("application/json"))
    throw new HttpError(415, "أرسل البيانات بصيغة JSON.");
  try {
    const value = JSON.parse(await readBody(req, limit));
    if (!value || typeof value !== "object" || Array.isArray(value))
      throw new Error();
    return value;
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(400, "بيانات الطلب غير صالحة.");
  }
}

export const escapeHtml = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

export const safeJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
