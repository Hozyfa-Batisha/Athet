import { escapeHtml as esc } from "../lib/http.js";

function page(title, inner) {
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800&family=Aref+Ruqaa:wght@400;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles/auth.css"></head><body><div class="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div><div class="wrap"><div class="card">${inner}</div></div></body></html>`;
}
const errorBox = (message) =>
  message ? `<div class="err" role="alert">${esc(message)}</div>` : "";

export function loginPage(message = "", allowSignup = true) {
  return page(
    "تسجيل الدخول",
    `<h1>تسجيل الدخول</h1><p class="sub">جدول الحصص الأسبوعي</p>${errorBox(message)}
<form method="POST" action="/login"><label for="username">اسم المستخدم</label><input id="username" type="text" name="user" required autofocus autocomplete="off" maxlength="80">
<label for="password">كلمة السر</label><input id="password" type="password" name="pass" required autocomplete="off" maxlength="256"><button type="submit">دخول</button></form>
${allowSignup ? '<a class="lnk" href="/signup">مفيش عندك حساب؟ إنشاء حساب جديد</a>' : ""}`,
  );
}

export function accountPage(mode, message = "") {
  const setup = mode === "setup";
  const title = setup ? "إنشاء حساب الدخول" : "إنشاء حساب جديد";
  return page(
    title,
    `<h1>${title}</h1><p class="sub">${setup ? "أول مرة؟ اختر اسم مستخدم وكلمة سر" : "كل حساب له جدوله وطلابه الخاصين"}</p>${errorBox(message)}
<form method="POST" action="/${mode}">
<label for="name">الاسم</label><input id="name" type="text" name="name" required autofocus autocomplete="off" maxlength="80">
<label for="phone">رقم الهاتف</label><input id="phone" type="text" name="phone" required inputmode="tel" autocomplete="off" maxlength="40" placeholder="مثال: 01012345678">
<label for="username">اسم المستخدم (للدخول)</label><input id="username" type="text" name="user" required autocomplete="off" minlength="3" maxlength="80">
<label for="password">كلمة السر (٦ حروف على الأقل)</label><input id="password" type="password" name="pass" required autocomplete="off" minlength="6" maxlength="256">
<label for="password-confirm">تأكيد كلمة السر</label><input id="password-confirm" type="password" name="pass2" required autocomplete="off" maxlength="256">
<button type="submit">إنشاء الحساب والدخول</button></form>
${setup ? "" : '<a class="lnk" href="/login">عندي حساب بالفعل - تسجيل الدخول</a>'}`,
  );
}
