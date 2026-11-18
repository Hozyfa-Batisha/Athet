import crypto from "node:crypto";
import { promisify } from "node:util";
import { HttpError } from "./http.js";

const scrypt = promisify(crypto.scrypt);
export const sha256 = (value) =>
  crypto.createHash("sha256").update(value).digest("hex");

export async function hashPassword(
  password,
  salt = crypto.randomBytes(16).toString("hex"),
) {
  return { salt, hash: (await scrypt(password, salt, 64)).toString("hex") };
}

export async function verifyPassword(password, user) {
  const salt = user?.password_salt || "invalid-account-salt";
  const { hash } = await hashPassword(password, salt);
  const expected = Buffer.from(user?.password_hash || "0".repeat(128), "hex");
  const actual = Buffer.from(hash, "hex");
  return Boolean(
    user &&
      expected.length === actual.length &&
      crypto.timingSafeEqual(expected, actual),
  );
}

export function parseCookie(req, name) {
  const cookie = (req.headers.cookie || "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(name + "="));
  try {
    return cookie ? decodeURIComponent(cookie.slice(name.length + 1)) : "";
  } catch {
    return "";
  }
}

export function sessionCookie(token, config, expired = false) {
  // A session cookie has no persistent Max-Age; all actual data lives in PostgreSQL.
  return `sid=${token}; Path=/; HttpOnly; SameSite=Strict${config.secureCookie ? "; Secure" : ""}${expired ? "; Max-Age=0" : ""}`;
}

export function checkOrigin(req, config, { required = false } = {}) {
  const expected =
    config.publicUrl ||
    `${config.secureCookie ? "https" : "http"}://${req.headers.host}`;
  const origin = req.headers.origin;
  if (
    req.headers["sec-fetch-site"] === "cross-site" ||
    (origin && origin !== expected) ||
    (required && !origin)
  ) {
    throw new HttpError(403, "الطلب لازم ييجي من نفس الموقع.");
  }
}

export function checkCsrf(req, session) {
  const supplied = String(req.headers["x-csrf-token"] || "");
  const expected = String(session.csrf_token || "");
  if (
    !supplied ||
    supplied.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(supplied), Buffer.from(expected))
  )
    throw new HttpError(
      403,
      "انتهت صلاحية الصفحة. حدّث الصفحة وحاول مرة أخرى.",
    );
}

export function securityHeaders(res, config) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "same-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()",
  );
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; media-src 'self' data: blob: https:; connect-src 'self' https://api.quran.com; frame-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'",
  );
  if (config.secureCookie)
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
}

export class RateLimiter {
  constructor({ limit = 20, windowMs = 60000 } = {}) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.entries = new Map();
  }
  check(key) {
    const now = Date.now();
    if (this.entries.size > 10000)
      for (const [entry, record] of this.entries)
        if (record.until <= now) this.entries.delete(entry);
    const record = this.entries.get(key);
    if (!record || record.until <= now) {
      this.entries.set(key, { count: 1, until: now + this.windowMs });
      return;
    }
    if (record.count >= this.limit)
      throw new HttpError(429, "محاولات كتير. استنى دقيقة وحاول مرة أخرى.");
    record.count++;
  }
}
