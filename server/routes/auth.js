import { html, redirect, readBody, HttpError } from "../lib/http.js";
import {
  hashPassword,
  verifyPassword,
  sessionCookie,
  clientAddress,
} from "../lib/security.js";
import { profile, text, validatePassword } from "../lib/validation.js";
import {
  findLoginCandidates,
  createUser,
  hasUsers,
  audit,
} from "../repositories/users.js";
import { createSession } from "../services/sessions.js";
import { loginPage, accountPage } from "../views/auth.js";

export async function authRoutes(context) {
  const { req, res, url, db, config, session, authLimiter, loginThrottle } = context;
  if (!["/login", "/setup", "/signup"].includes(url.pathname)) return false;
  if (!["GET", "POST"].includes(req.method))
    throw new HttpError(405, "طريقة الطلب غير مسموحة.");

  const mode = url.pathname.slice(1);
  const exists = await hasUsers(db);
  if (mode === "setup" && exists) {
    redirect(res, "/login");
    return true;
  }
  if (mode !== "setup" && !exists) {
    redirect(res, "/setup");
    return true;
  }
  if (mode === "signup" && !config.allowSignup)
    throw new HttpError(403, "إنشاء حسابات جديدة غير مُفعّل.");

  if (req.method === "GET") {
    if (session) redirect(res, session.role === "admin" ? "/admin" : "/");
    else
      html(
        res,
        mode === "login"
          ? loginPage("", config.allowSignup)
          : accountPage(mode),
      );
    return true;
  }

  try {
    const address = clientAddress(req, config);
    authLimiter.check(address);
    const form = new URLSearchParams(await readBody(req, 12000));
    const name = text(form.get("name") ?? form.get("user"), 80, "الاسم").trim();
    const password = text(form.get("pass"), 256, "كلمة السر");
    let userId;
    let isAdmin = mode === "setup";

    if (mode === "login") {
      const attemptKey = loginThrottle.key(name, address);
      await loginThrottle.check(attemptKey);
      const candidates = await findLoginCandidates(db, name);
      let user = null;
      for (const candidate of candidates) {
        if (await verifyPassword(password, candidate)) {
          user = candidate;
          break;
        }
      }
      if (!user) {
        await loginThrottle.fail(attemptKey);
        throw new HttpError(401, "الاسم أو كلمة السر غير صحيحة.");
      }
      await loginThrottle.clear(attemptKey);
      userId = user.id;
      isAdmin = user.role === "admin";
      await db.query("UPDATE users SET last_login_at=now() WHERE id=$1", [userId]);
      await audit(db, userId, "account.login");
    } else {
      if (name.length < 2) throw new HttpError(400, "اكتب اسمًا صحيحًا.");
      validatePassword(password);
      if (password !== form.get("pass2"))
        throw new HttpError(400, "كلمتا السر غير متطابقتين.");

      const details = profile(name, form.get("phone"));
      const credentials = await hashPassword(password);
      userId = await createUser(
        db,
        {
          username: details.name,
          ...details,
          ...credentials,
          role: mode === "setup" ? "admin" : "user",
        },
        { setup: mode === "setup" },
      );
    }

    const token = await createSession(db, userId, config.sessionHours);
    redirect(res, isAdmin ? "/admin" : "/", sessionCookie(token, config));
  } catch (error) {
    if (!(error instanceof HttpError)) throw error;
    if (error.status === 429 && error.retryAfter)
      res.setHeader("Retry-After", String(error.retryAfter));
    html(
      res,
      mode === "login"
        ? loginPage(error.message, config.allowSignup)
        : accountPage(mode, error.message),
      error.status,
    );
  }
  return true;
}
