# أثر — نظام الحصص والطلاب

تطبيق ويب لإدارة حصص الطلاب للمعلّم: جدول الحصص، سجل الطلاب، حصاد الشهر، ألعاب تعليمية (الشدّة والحروف والحركات والمدود)، عرض القرآن الكريم (الأجزاء 27–30) مع تلاوة صوتية لكل آية، وسبورة تفاعلية. فيه وضع فاتح وداكن، وكل معلّم له حساب وجدول خاص بيه.

## التشغيل

### على جهازك (Windows)
محتاج [Node.js](https://nodejs.org) نسخة 20 أو أحدث. دوس مرتين على `start.bat` وهيفتح `http://localhost:3000`.
أول مرة هيطلب منك تعمل حساب.

### على جهازك (أي نظام)
```bash
cp .env.example .env      # اختياري
npm start                 # أو: npm run dev (بيعيد التشغيل لوحده لما تعدّل الكود، والتسجيل مفتوح)
```

### على سيرفر (Docker)
```bash
docker build -t athar .
docker run -d --name athar -p 3000:3000 -v $PWD/data:/data \
  -e SETUP_TOKEN=$(openssl rand -hex 16) -e TRUST_PROXY=true athar
```
افتح `/setup?token=<SETUP_TOKEN>` عشان تعمل أول حساب (صاحب الموقع). من غير التوكن محدش يقدر "ياخد" الموقع قبلك.

## الإعدادات (Environment variables)

| المتغير | الافتراضي | الوظيفة |
|---|---|---|
| `PORT` | `3000` | البورت |
| `DATA_DIR` | `./data` | مكان كل البيانات (الحسابات، الجلسات، الجداول) |
| `ALLOW_SIGNUP` | `false` | السماح بإنشاء حسابات جديدة من `/signup` |
| `SETUP_TOKEN` | فاضي | لو متحدد، `/setup` (أول حساب) محتاج `?token=` |
| `TRUST_PROXY` | `false` | `true` لو ورا Traefik/nginx (عشان IP الزائر الحقيقي و HTTPS) |
| `COOKIE_SECURE` | `auto` | كوكي الدخول HTTPS بس (`auto` = لو الطلب HTTPS) |
| `TELEGRAM_TOKEN` / `TELEGRAM_CHAT_ID` | فاضي | نسخ احتياطي تلقائي على تيليجرام |
| `BACKUP_EVERY_DAYS` | `7` | كل كام يوم يتبعت نسخة |

## هيكل المشروع

```
src/
  server.js    السيرفر والراوتر (كل الـ routes)
  config.js    الإعدادات من environment variables
  auth.js      الحسابات (scrypt)، الجلسات، الحماية من تخمين كلمة السر
  store.js     تخزين JSON في DATA_DIR بكتابة آمنة (atomic)
  backup.js    النسخ الاحتياطي على تيليجرام (كل الحسابات)
  static.js    الملفات الثابتة: ضغط brotli/gzip، كاش، Range للصوت
  views.js     صفحات الدخول والتسجيل
public/        الواجهة (index.html، الألعاب، الصوت، css/ المبني)
styles/        مصدر Tailwind + إعداداته
scripts/       تحميل صوت التلاوة (download-audio)
tests/         اختبارات (node --test)
Dockerfile     بناء على مرحلتين: Tailwind ثم Node بس
```

السيرفر **من غير أي مكتبات خارجية** (Node.js built-ins بس) — Tailwind أداة بناء بس.

## التطوير

```bash
npm install          # Tailwind (للبناء بس)
npm run build:css    # بعد أي تعديل في classes بتاعة Tailwind في index.html أو الألعاب
npm test             # 10 اختبارات: الدخول، الإعداد، الجداول، الحماية، الملفات الثابتة
```

## البيانات والنسخ الاحتياطي

- كل البيانات في `DATA_DIR`: `auth.json` (المستخدمين، كلمات السر متشفرة scrypt)، `sessions.json`، وملف جدول لكل حساب (`schedule.json` / `data-<id>.json`).
- **ماترفعش مجلد البيانات على GitHub** — `.gitignore` بيمنع ده.
- نقل بيانات النسخة القديمة: انسخ ملفات `auth.json` و `sessions.json` و `schedule.json` و `data-*.json` لمجلد `DATA_DIR` — نفس الصيغة بالظبط.
- النسخة الاحتياطية على تيليجرام فيها جداول **كل** الحسابات (من غير كلمات السر). صاحب الموقع يقدر يبعت نسخة يدوي من `/api/backup-now`.

## صوت التلاوة

الصوت (جزء عمّ، الشيخ الحصري) موجود في `public/audio`. لتحميله من جديد: `npm run download-audio` (أو `scripts/download-audio.bat`).
النصوص القرآنية من [Tanzil](https://tanzil.net).
