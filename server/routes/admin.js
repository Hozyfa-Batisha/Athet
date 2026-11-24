import { escapeHtml as esc, html, HttpError, readBody } from "../lib/http.js";
import { audit } from "../repositories/users.js";

const page = (body, csrfToken) => `<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="csrf-token" content="${esc(csrfToken)}"><title>إدارة أثر</title><style>
:root{font-family:system-ui,"Segoe UI",sans-serif;color:#17202a;background:#f3f6f5}*{box-sizing:border-box}body{margin:0;padding:24px}.wrap{max-width:1120px;margin:auto}.top,.card{background:white;border:1px solid #e2e8e6;border-radius:16px;padding:20px;margin-bottom:16px}.top{display:flex;align-items:center;justify-content:space-between;gap:14px}.stats{display:flex;gap:12px;flex-wrap:wrap}.stat{background:#f4f8f7;padding:12px 18px;border-radius:12px}.stat b{display:block;font-size:1.3rem}form.search{display:flex;gap:8px}input,button,a.button{font:inherit;padding:9px 12px;border:1px solid #cbd5d1;border-radius:9px}button,a.button{background:#166b57;color:white;border:0;cursor:pointer;text-decoration:none}table{width:100%;border-collapse:collapse;background:white}th,td{text-align:right;padding:11px;border-bottom:1px solid #edf0ef}th{background:#f6f8f7}.table-wrap{overflow:auto}.muted{color:#66736e}.vip{color:#08734f;font-weight:700}.off{color:#8b9290}.note{padding:12px;border-radius:10px;background:#eaf7ef;margin-bottom:12px}.actions{min-width:220px}.actions form{display:flex;gap:6px;align-items:center}.actions input{max-width:155px}.logout-form{margin:0}.logout-form button{background:#fff;color:#8b3b2e;border:1px solid #dfb4a8}h1{margin:0 0 6px}@media(max-width:650px){body{padding:10px}.top{align-items:flex-start;flex-direction:column}th,td{padding:8px}}
</style><main class="wrap">${body}</main><script>
document.addEventListener("submit", async (event) => {
  const form = event.target;
  if (form.method.toLowerCase() !== "post") return;
  event.preventDefault();
  const csrf = document.querySelector("meta[name=csrf-token]").content;
  const response = await fetch(form.action, {
    method: "POST",
    headers: { "X-CSRF-Token": csrf, "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(form)),
  });
  if (new URL(form.action).pathname === "/logout") {
    if (response.ok) location.assign("/login");
    return;
  }
  document.open();
  document.write(await response.text());
  document.close();
});
</script></html>`;
const stamp = (value) => value ? new Intl.DateTimeFormat("ar-EG", { dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Cairo" }).format(new Date(value)) : "—";

export async function adminRoutes({ req, res, url, db, session }) {
  if (url.pathname !== "/admin") return false;
  if (session.role !== "admin") throw new HttpError(403, "الصفحة دي للمدير فقط.");
  if (!["GET", "POST"].includes(req.method)) throw new HttpError(405, "طريقة الطلب غير مسموحة.");
  let notice = "";
  if (req.method === "POST") {
    const form = new URLSearchParams(await readBody(req, 12000));
    const userId = String(form.get("user_id") || "");
    const value = String(form.get("vip_until") || "");
    if (!userId) throw new HttpError(400, "الحساب غير محدد.");
    let until = null;
    if (value) {
      const parsed = new Date(`${value}T12:00:00Z`);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== value)
        throw new HttpError(400, "اختار تاريخ انتهاء صحيح.");
      until = value;
    }
    const result = await db.query(
      "UPDATE users SET vip_until=CASE WHEN $1::date IS NULL THEN NULL ELSE ($1::date + time '23:59:59.999') AT TIME ZONE 'Africa/Cairo' END, updated_at=now() WHERE id=$2 AND role <> 'admin' RETURNING username",
      [until, userId],
    );
    if (!result.rows.length) throw new HttpError(404, "الحساب غير موجود أو لا يمكن تعديل VIP له.");
    await audit(db, session.id, until ? "admin.vip-enabled" : "admin.vip-disabled", { target: userId, username: result.rows[0].username, vipUntil: until });
    notice = until ? `تم تفعيل VIP للحساب ${esc(result.rows[0].username)}.` : `تم إيقاف VIP للحساب ${esc(result.rows[0].username)}.`;
  }

  const q = String(url.searchParams.get("q") || "").trim().slice(0, 80);
  const pattern = `%${q.replace(/[\\%_]/g, "\\$&")}%`;
  const [counts, users, views] = await Promise.all([
    db.query("SELECT count(*)::int AS total, count(*) FILTER (WHERE vip_until > now())::int AS vip FROM users"),
    db.query("SELECT id,username,name,phone,role,created_at,last_login_at,vip_until FROM users WHERE ($1 = '' OR username ILIKE $2 ESCAPE E'\\\\' OR name ILIKE $2 ESCAPE E'\\\\') ORDER BY created_at DESC", [q, pattern]),
    db.query("SELECT count(*)::int AS today FROM visitor_events WHERE visited_at >= date_trunc('day', now())"),
  ]);
  const summary = counts.rows[0];
  const rows = users.rows.map((u) => `<tr><td><b>${esc(u.username)}</b><br><span class="muted">${esc(u.name || "")}${u.role === "admin" ? " · مدير" : ""}</span></td><td>${esc(u.phone || "—")}</td><td>${stamp(u.created_at)}</td><td>${stamp(u.last_login_at)}</td><td class="${u.vip_until && new Date(u.vip_until) > new Date() ? "vip" : "off"}">${u.vip_until && new Date(u.vip_until) > new Date() ? `VIP حتى ${stamp(u.vip_until)}` : "غير مفعّل"}</td><td class="actions">${u.role === "admin" ? "—" : `<form method="post" action="/admin"><input type="hidden" name="user_id" value="${esc(u.id)}"><input type="date" name="vip_until" aria-label="تاريخ انتهاء VIP" value="${u.vip_until && new Date(u.vip_until) > new Date() ? new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Cairo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(u.vip_until)) : ""}"><button type="submit">${u.vip_until && new Date(u.vip_until) > new Date() ? "تحديث VIP" : "تفعيل VIP"}</button></form>`}</td></tr>`).join("");
  html(res, page(`<section class="top"><div><h1>إدارة الحسابات</h1><div class="muted">أهلًا ${esc(session.username)} · بيانات الحسابات وإدارة VIP</div></div><form class="logout-form" method="post" action="/logout"><button type="submit">تسجيل الخروج</button></form></section>${notice ? `<p class="note">${notice}</p>` : ""}<section class="card"><div class="stats"><div class="stat"><b>${summary.total}</b>إجمالي الحسابات</div><div class="stat"><b>${summary.vip}</b>حساب VIP نشط</div><div class="stat"><b>${views.rows[0].today}</b>زيارات الموقع اليوم</div></div><p class="muted">الزيارات تُسجّل عند فتح الصفحة الرئيسية من حساب مسجّل الدخول.</p></section><section class="card"><form class="search" method="get" action="/admin"><input type="search" name="q" value="${esc(q)}" placeholder="ابحث باسم المستخدم أو الاسم"><button>بحث</button></form></section><section class="card table-wrap"><table><thead><tr><th>الحساب</th><th>الهاتف</th><th>تاريخ الإنشاء</th><th>آخر دخول</th><th>VIP</th><th>إدارة VIP</th></tr></thead><tbody>${rows || `<tr><td colspan="6">لا توجد حسابات مطابقة.</td></tr>`}</tbody></table></section>`, session.csrf_token));
  return true;
}
