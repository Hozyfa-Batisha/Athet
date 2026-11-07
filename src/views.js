'use strict';
// صفحات الدخول/التسجيل (HTML من السيرفر). نفس التصميم الأصلي.
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function page(title, inner) {
  return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="icon" href="/favicon.ico" sizes="48x48"><link rel="icon" href="/icons/icon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icons/apple-touch-icon.png"><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#0E6B55">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;800&family=Aref+Ruqaa:wght@400;700&family=Reem+Kufi:wght@500;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;flex-direction:column;font-family:'Cairo',sans-serif;background:#0B3B30;
background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23E3C27A' stroke-opacity='.14' stroke-width='1.2'%3E%3Crect x='20' y='20' width='40' height='40'/%3E%3Crect x='20' y='20' width='40' height='40' transform='rotate(45 40 40)'/%3E%3Ccircle cx='40' cy='40' r='9'/%3E%3C/g%3E%3C/svg%3E")}
.basmala{background:linear-gradient(90deg,#083B30,#0E6B55 50%,#083B30);color:#EBD28F;text-align:center;font-family:'Aref Ruqaa',serif;font-size:1.2rem;line-height:2;border-bottom:2px solid #C9A24B}
.wrap{flex:1;display:flex;align-items:center;justify-content:center;padding:20px}
.card{width:100%;max-width:400px;background:#FFFDF6;border:2px solid #C9A24B;border-radius:24px;padding:28px;box-shadow:0 20px 50px rgba(0,0,0,.35)}
h1{font-family:'Reem Kufi','Cairo',sans-serif;font-size:1.6rem;margin:0 0 4px;color:#0A4F40;text-align:center}
p.sub{margin:0 0 18px;text-align:center;color:#6b6a5e;font-size:.85rem;font-weight:700}
label{display:block;font-size:.8rem;font-weight:800;color:#334155;margin:12px 0 4px}
input[type=text],input[type=password]{width:100%;padding:11px 14px;border:2px solid #C9A24B;border-radius:12px;background:#F6F1E2;font-family:inherit;font-size:1rem;font-weight:700;outline:none}
input:focus{border-color:#0E6B55}
.chk{display:flex;align-items:center;gap:8px;margin-top:14px;font-size:.85rem;font-weight:700;color:#334155}
button{width:100%;margin-top:18px;padding:12px;border:0;border-radius:12px;background:#0E6B55;color:#fff;font-family:inherit;font-size:1rem;font-weight:800;cursor:pointer}
button:hover{background:#0A4F40}
.lnk{display:block;text-align:center;margin-top:14px;font-size:.85rem;font-weight:800;color:#0E6B55;text-decoration:none}
.lnk:hover{text-decoration:underline}
.err{background:#fee2e2;color:#b91c1c;border-radius:10px;padding:8px 12px;font-size:.85rem;font-weight:700;margin-bottom:6px;text-align:center}
</style></head><body><div class="basmala">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div><div class="wrap"><div class="card">${inner}</div></div></body></html>`;
}
const err = m => (m ? `<div class="err">${m}</div>` : '');
const loginPage = (m, signupOpen) => page('تسجيل الدخول', `<h1>تسجيل الدخول</h1><p class="sub">جدول الحصص الأسبوعي</p>${err(m)}
<form method="POST" action="/login"><label>اسم المستخدم</label><input type="text" name="user" required autofocus autocomplete="username">
<label>كلمة السر</label><input type="password" name="pass" required autocomplete="current-password">
<div class="chk"><input type="checkbox" id="rm" name="remember" value="1" checked><label for="rm" style="margin:0">تذكّرني على هذا الجهاز (٣٠ يوم)</label></div>
<button type="submit">دخول</button></form>
${signupOpen ? '<a class="lnk" href="/signup">مفيش عندك حساب؟ إنشاء حساب جديد</a>' : ''}`);
const accountForm = (title, sub, action, btn, m, extra, hidden) => page(title, `<h1>${title}</h1><p class="sub">${sub}</p>${err(m)}
<form method="POST" action="${action}">${hidden || ''}<label>الاسم</label><input type="text" name="name" required autofocus autocomplete="name">
<label>رقم الهاتف</label><input type="text" name="phone" required inputmode="tel" autocomplete="tel" placeholder="مثال: 01012345678">
<label>اسم المستخدم (للدخول)</label><input type="text" name="user" required autocomplete="username">
<label>كلمة السر (٦ حروف على الأقل)</label><input type="password" name="pass" required autocomplete="new-password">
<label>تأكيد كلمة السر</label><input type="password" name="pass2" required autocomplete="new-password">
<button type="submit">${btn}</button></form>${extra || ''}`);
const setupPage = (m, token) => accountForm('إنشاء حساب الدخول', 'أول مرة؟ اختر اسم مستخدم وكلمة سر', '/setup', 'إنشاء الحساب والدخول', m, '', token ? `<input type="hidden" name="token" value="${esc(token)}">` : '');
const signupPage = m => accountForm('إنشاء حساب جديد', 'كل حساب له جدوله وطلابه الخاصين', '/signup', 'إنشاء الحساب والدخول', m, '\n<a class="lnk" href="/login">عندي حساب بالفعل - تسجيل الدخول</a>');

const closedPage = () => page('التسجيل مقفول', `<h1>التسجيل مقفول</h1><p class="sub">إنشاء حسابات جديدة مقفول على السيرفر ده. كلّم صاحب الموقع.</p>
<a class="lnk" href="/login">رجوع لتسجيل الدخول</a>`);
const setupLockedPage = () => page('الإعداد الأول', `<h1>الإعداد الأول</h1><p class="sub">الموقع لسه ماتعملهوش أول حساب. افتح رابط الإعداد اللي فيه الـ token (من صاحب السيرفر).</p>`);

module.exports = { page, loginPage, setupPage, signupPage, closedPage, setupLockedPage, esc };
