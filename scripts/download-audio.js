// تحميل صوت الشيخ الحصري (جزء عمّ) مرة واحدة على الجهاز، عشان الموقع يشتغل بالصوت من غير إنترنت.
// التشغيل: دوس مرتين على download-audio.bat  (محتاج إنترنت المرة دي بس)
// ممكن تكمّل لو اتقطع: بيسيب الملفات اللي نزلت وينزّل الناقص بس.
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'audio');
const BASE_HOST = process.env.EVERYAYAH_BASE || 'https://everyayah.com/data/';
const STYLES = {
  muallim: 'Husary_Muallim_128kbps',
  murattal: 'Husary_128kbps',
  mujawwad: 'Husary_Mujawwad_128kbps'
};
const SUR = [[78,40],[79,46],[80,42],[81,29],[82,19],[83,36],[84,25],[85,22],[86,17],[87,19],[88,26],[89,30],[90,20],[91,15],[92,21],[93,11],[94,8],[95,8],[96,19],[97,5],[98,8],[99,8],[100,11],[101,11],[102,8],[103,3],[104,9],[105,5],[106,4],[107,7],[108,3],[109,6],[110,3],[111,5],[112,4],[113,5],[114,6]];   // [رقم السورة، عدد آياتها] للسور 78 إلى 114

const pad = n => String(n).padStart(3, '0');
const want = (process.argv[2] || 'muallim').toLowerCase();
const order = [want].concat(Object.keys(STYLES).filter(k => k !== want));

async function get(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error('ملف صغير جدًا');
  return buf;
}

async function pickStyle() {
  for (const k of order) {
    if (!STYLES[k]) continue;
    try { await get(BASE_HOST + STYLES[k] + '/078001.mp3'); return k; } catch (e) { console.log('مش شغّال: ' + STYLES[k] + ' (' + e.message + ')'); }
  }
  return null;
}

(async () => {
  console.log('=== تحميل صوت الحصري لجزء عمّ ===');
  const style = await pickStyle();
  if (!style) {
    console.log('\nمعرفتش أوصل لأي تسجيل. اتأكد إن الإنترنت شغال وجرّب تاني.');
    process.exit(1);
  }
  console.log('هنحمّل: ' + STYLES[style] + '\n');
  fs.mkdirSync(OUT, { recursive: true });

  const files = ['001001'];                       // البسملة
  for (const [s, n] of SUR) for (let a = 1; a <= n; a++) files.push(pad(s) + pad(a));

  let done = 0, skipped = 0, failed = [];
  let i = 0;
  async function worker() {
    while (i < files.length) {
      const name = files[i++];
      const dest = path.join(OUT, name + '.mp3');
      if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) { skipped++; continue; }
      let ok = false;
      for (let t = 1; t <= 3 && !ok; t++) {
        try {
          const buf = await get(BASE_HOST + STYLES[style] + '/' + name + '.mp3');
          fs.writeFileSync(dest + '.part', buf);
          fs.renameSync(dest + '.part', dest);
          ok = true; done++;
        } catch (e) { await new Promise(r => setTimeout(r, 800 * t)); }
      }
      if (!ok) failed.push(name);
      const total = done + skipped + failed.length;
      if (total % 20 === 0 || total === files.length) process.stdout.write('\r' + total + ' / ' + files.length + '   ');
    }
  }
  await Promise.all([worker(), worker(), worker(), worker()]);

  fs.writeFileSync(path.join(OUT, 'source.txt'), STYLES[style] + '\n');
  console.log('\n\nخلصنا: نزل ' + done + '، كان موجود ' + skipped + '، فشل ' + failed.length);
  if (failed.length) console.log('الناقص: ' + failed.join(' ') + '\nشغّل الملف تاني وهيكمّل الناقص.');
  else console.log('تمام! الصوت بقى على جهازك في public\\audio وبيشتغل من غير إنترنت.');
})();
