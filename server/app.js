import http from "node:http";
import { randomUUID } from "node:crypto";
import { HttpError, json, html, redirect, escapeHtml } from "./lib/http.js";
import {
  RateLimiter,
  securityHeaders,
  checkOrigin,
  checkCsrf,
  sessionCookie,
} from "./lib/security.js";
import { getSession, deleteSession } from "./services/sessions.js";
import { LoginThrottle } from "./services/login-throttle.js";
import { authRoutes } from "./routes/auth.js";
import { accountRoutes } from "./routes/account.js";
import { dataRoutes } from "./routes/data.js";
import { adminRoutes } from "./routes/admin.js";
import { serveStatic } from "./lib/static.js";

export function createApp({ db, config }) {
  const authLimiter = new RateLimiter({ limit: 15 });
  const loginThrottle = new LoginThrottle(db);
  const backupLimiter = new RateLimiter({ limit: 2 });
  const mutationLimiter = new RateLimiter({ limit: 240 });
  return http.createServer(
    { maxHeaderSize: 16384, requestTimeout: 30000, headersTimeout: 15000 },
    async (req, res) => {
      securityHeaders(res, config);
      const requestId = randomUUID();
      res.setHeader("X-Request-Id", requestId);
      let url;
      try {
        url = new URL(req.url, "http://internal");
        if (url.pathname === "/healthz" && req.method === "GET") {
          await db.query("SELECT 1");
          json(res, { ok: true });
          return;
        }
        const mutating = !["GET", "HEAD", "OPTIONS"].includes(req.method);
        if (mutating)
          checkOrigin(req, config, {
            required: ["/login", "/setup", "/signup"].includes(url.pathname),
          });
        const session = await getSession(db, req, config);
        const context = {
          req,
          res,
          url,
          db,
          config,
          session,
          authLimiter,
          loginThrottle,
          backupLimiter,
        };
        if (await authRoutes(context)) return;
        if (!session) {
          if (url.pathname.startsWith("/api/") || url.pathname === "/logout" || mutating)
            json(res, { ok: false, error: "auth" }, 401);
          else if (url.pathname === "/admin") redirect(res, "/login");
          else await serveStatic(context);
          return;
        }
        if (session && mutating) {
          checkCsrf(req, session);
          mutationLimiter.check(session.id);
        }
        if (url.pathname === "/logout" && req.method === "POST") {
          await deleteSession(db, session);
          json(res, { ok: true }, 200, {
            "Set-Cookie": sessionCookie("", config, true),
            "Clear-Site-Data": '"cache", "storage"',
          });
          return;
        }
        if (session?.role === "admin" && url.pathname !== "/admin" && url.pathname !== "/logout") {
          if (url.pathname.startsWith("/api/") || mutating)
            throw new HttpError(403, "حساب المدير مخصص للوحة الإدارة فقط.");
          redirect(res, "/admin");
          return;
        }
        if (session && (await adminRoutes(context))) return;
        if (session && req.method === "GET" && url.pathname === "/")
          await db.query("INSERT INTO visitor_events (user_id) VALUES ($1)", [session.id]);
        if (
          session &&
          ((await accountRoutes(context)) || (await dataRoutes(context)))
        )
          return;
        if (url.pathname.startsWith("/api/"))
          throw new HttpError(404, "الخدمة غير موجودة.");
        await serveStatic(context);
      } catch (error) {
        if (res.headersSent) {
          res.destroy();
          return;
        }
        const status = error instanceof HttpError ? error.status : 500;
        if (status === 429 && error.retryAfter)
          res.setHeader("Retry-After", String(error.retryAfter));
        if (status === 500)
          console.error(
            JSON.stringify({
              event: "request.failed",
              requestId,
              code: error.code || error.name,
            }),
          );
        const message =
          status === 500 ? "حصل خطأ في السيرفر. حاول مرة أخرى." : error.message;
        if (url?.pathname.startsWith("/api/") || req.method !== "GET")
          json(
            res,
            { ok: false, error: message, ...(error.details || {}), requestId },
            status,
          );
        else
          html(
            res,
            `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>أثر</title><p>${escapeHtml(message)}</p><a href="/">العودة للموقع</a></html>`,
            status,
          );
      }
    },
  );
}
