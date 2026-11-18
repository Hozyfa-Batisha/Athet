import { html, redirect, readBody, HttpError } from "../lib/http.js";
import {
  hashPassword,
  verifyPassword,
  sessionCookie,
} from "../lib/security.js";
import { profile, text, validatePassword } from "../lib/validation.js";
import {
  findUser,
  createUser,
  hasUsers,
  audit,
} from "../repositories/users.js";
import { createSession } from "../services/sessions.js";
import { loginPage, accountPage } from "../views/auth.js";

export async function authRoutes(context) {
  const { req, res, url, db, config, session, authLimiter } = context;
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
    if (session) redirect(res, "/");
    else
      html(
        res,
        mode === "login"
          ? loginPage("", config.allowSignup)
          : accountPage(mode),
      );
    return true;
  }
  authLimiter.check(req.socket.remoteAddress || "unknown");
  try {
    const form = new URLSearchParams(await readBody(req, 12000));
    const username = text(form.get("user"), 80, "اسم المستخدم").trim();
    const password = text(form.get("pass"), 256, "كلمة السر");
    let userId;
    if (mode === "login") {
      const user = await findUser(db, username);
      if (!(await verifyPassword(password, user)))
        throw new HttpError(401, "اسم المستخدم أو كلمة السر غلط.");
      userId = user.id;
      await audit(db, userId, "account.login");
    } else {
      if (username.length < 3)
        throw new HttpError(400, "اسم المستخدم لازم يكون ٣ حروف على الأقل.");
      validatePassword(password);
      if (password !== form.get("pass2"))
        throw new HttpError(400, "كلمتا السر غير متطابقتين.");
      const details = profile(form.get("name"), form.get("phone"));
      const credentials = await hashPassword(password);
      userId = await createUser(
        db,
        { username, ...details, ...credentials },
        { setup: mode === "setup" },
      );
    }
    const token = await createSession(db, userId, config.sessionHours);
    redirect(res, "/", sessionCookie(token, config));
  } catch (error) {
    if (!(error instanceof HttpError)) throw error;
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
