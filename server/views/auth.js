import { escapeHtml as esc } from "../lib/http.js";

function page(title, inner, dark = false) {
  return `<!DOCTYPE html><html lang="ar" dir="rtl" class="${dark ? "dark" : ""}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800&family=Aref+Ruqaa:wght@400;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/styles/auth.css"></head><body><div class="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div><div class="wrap"><div class="card">${inner}</div></div></body></html>`;
}
const errorBox = (message) =>
  message ? `<div class="err" role="alert">${esc(message)}</div>` : "";

export function loginPage(message = "", allowSignup = true) {
  return page(
    "تسجيل الدخول | أثر",
    `<div class="brand"><img src="/assets/media/c34b66558d65ceb69057.png" alt="أثر"></div><h1>مرحباً بك</h1><p class="sub">اكتب الاسم الذي أنشأت به حسابك للمتابعة</p>${errorBox(message)}
<form method="POST" action="/login"><label for="name">الاسم</label><input id="name" type="text" name="name" required autofocus autocomplete="name" maxlength="80" placeholder="اكتب اسمك">
<label for="password">كلمة المرور</label><div class="input-wrap"><input id="password" type="password" name="pass" required autocomplete="current-password" maxlength="256" placeholder="أدخل كلمة المرور"><button type="button" class="toggle-pass" aria-label="إظهار كلمة المرور" onclick="const i=document.getElementById('password');i.type=i.type==='password'?'text':'password';this.textContent=i.type==='password'?'إظهار':'إخفاء'">إظهار</button></div><button class="submit" type="submit">تسجيل الدخول</button></form>
${allowSignup ? '<a class="lnk" href="/signup">ليس لديك حساب؟ أنشئ حساباً</a>' : ""}<p class="foot">نبسّط العلم لنصنع المستقبل</p>`,
    true,
  );
}

export function accountPage(mode, message = "") {
  const setup = mode === "setup";
  const title = setup ? "إنشاء حساب الدخول" : "إنشاء حساب جديد";
  return page(
    title,
    `<h1>${title}</h1><p class="sub">${setup ? "أول مرة؟ أنشئ حساب المدير باسمك وكلمة السر" : "كل حساب له جدوله وطلابه الخاصين"}</p>${errorBox(message)}
<form method="POST" action="/${mode}">
<label for="name">الاسم</label><input id="name" type="text" name="name" required autofocus autocomplete="name" maxlength="80">
<label for="phone">رقم الهاتف</label><input id="phone" type="text" name="phone" required inputmode="tel" autocomplete="tel" maxlength="40" placeholder="مثال: 01012345678">

<label for="password">كلمة السر (٦ أرقام)</label><input id="password" type="password" name="pass" required autocomplete="new-password" inputmode="numeric" pattern="[0-9٠-٩]{6}" minlength="6" maxlength="6">
<label for="password-confirm">تأكيد كلمة السر</label><input id="password-confirm" type="password" name="pass2" required autocomplete="new-password" inputmode="numeric" pattern="[0-9٠-٩]{6}" minlength="6" maxlength="6">
<button class="submit" type="submit">إنشاء الحساب والدخول</button></form>
${setup ? "" : '<a class="lnk" href="/login">عندي حساب بالفعل - تسجيل الدخول</a>'}`,
    true,
  );
}
