const WORLD = [
  {
    g: "أوروبا",
    items: [
      ["ألمانيا", "Europe/Berlin"],
      ["فرنسا", "Europe/Paris"],
      ["إيطاليا", "Europe/Rome"],
      ["إسبانيا", "Europe/Madrid"],
      ["إنجلترا", "Europe/London"],
    ],
  },
  {
    g: "أمريكا",
    items: [
      ["كندا", "America/Toronto"],
      ["الولايات المتحدة (نيويورك)", "America/New_York"],
      ["الولايات المتحدة (لوس أنجلوس)", "America/Los_Angeles"],
    ],
  },
];
let calY = 0,
  calM = 0,
  lastDay = "";
const fmtCache = {};
function tzFmt(tz) {
  if (!fmtCache[tz]) {
    try {
      fmtCache[tz] = {
        time: new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        day: new Intl.DateTimeFormat("en-CA", {
          timeZone: tz,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
      };
    } catch (e) {
      fmtCache[tz] = null;
    }
  }
  return fmtCache[tz];
}

function initSide() {
  const n = new Date();
  calY = n.getFullYear();
  calM = n.getMonth();
  document.getElementById("world-list").innerHTML = WORLD.map(
    (g) =>
      `<div class="w-head sub">${g.g}</div>` +
      g.items
        .map(
          (it) =>
            `<div class="w-row"><div class="w-name">${it[0]}</div><div class="w-cell w-time dir-ltr" data-tz="${it[1]}">--</div></div>`,
        )
        .join(""),
  ).join("");
  renderCalendar();
  tick();
  setInterval(tick, 1000);
}

function tick() {
  const now = new Date();
  document.getElementById("w-clock").textContent = new Intl.DateTimeFormat(
    "ar-EG-u-nu-latn",
    { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true },
  ).format(now);
  document.getElementById("w-date").textContent = new Intl.DateTimeFormat(
    "ar-EG-u-nu-latn",
    { weekday: "long", day: "numeric", month: "long", year: "numeric" },
  ).format(now);
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura-nu-latn", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch (e) {}
  document.getElementById("w-hijri").textContent = hijri;

  const localDay = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
  document.querySelectorAll("#world-list [data-tz]").forEach((el) => {
    const f = tzFmt(el.dataset.tz);
    if (!f) {
      el.textContent = "—";
      return;
    }
    const d = f.day.format(now);
    const tag = d > localDay ? "غدًا" : d < localDay ? "أمس" : "";
    el.innerHTML = f.time.format(now) + (tag ? `<small>${tag}</small>` : "");
  });

  updateNextClass();

  if (localDay !== lastDay) {
    lastDay = localDay;
    renderCalendar();
  }
}

/* ===== حصاد الشهر ===== */
const MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
const JS_DAY = [6, 0, 1, 2, 3, 4, 5]; // ترتيب DAYS (السبت أولًا) مقابل getDay()

function initHarvest() {
  const n = new Date();
  document.getElementById("hv-month").innerHTML = MONTHS.map(
    (m, i) => `<option value="${i}">${m}</option>`,
  ).join("");
  let ys = "";
  for (let y = n.getFullYear() - 2; y <= n.getFullYear() + 1; y++)
    ys += `<option value="${y}">${y}</option>`;
  document.getElementById("hv-year").innerHTML = ys;
  document.getElementById("hv-month").value = n.getMonth();
  document.getElementById("hv-year").value = n.getFullYear();
  renderHarvest();
}

function countWeekday(y, m, dayIdx) {
  const total = new Date(y, m + 1, 0).getDate();
  let c = 0;
  for (let d = 1; d <= total; d++)
    if (new Date(y, m, d).getDay() === JS_DAY[dayIdx]) c++;
  return c;
}

function hoursHtml(min) {
  const h = Math.floor(min / 60),
    m = Math.round(min % 60);
  const dec = Math.round((min / 60) * 100) / 100;
  return `${dec} ساعة<small>${h} س${m ? " و " + m + " د" : ""}</small>`;
}

function renderHarvest() {
  const mSel = document.getElementById("hv-month");
  if (!mSel || !mSel.options.length) return;
  const y = +document.getElementById("hv-year").value,
    m = +mSel.value;
  const prefix = y + "-" + pad2(m + 1) + "-";
  const map = {};
  let unclear = 0;
  students.forEach((r) => {
    const d = regDate(r);
    if (!d || !d.startsWith(prefix)) return; // حصة مش مسجلة في الشهر ده: متتحسبش
    const sl = parseSlot(r.time, r.ampm);
    if (!sl) unclear++;
    const o = (map[r.name] = map[r.name] || { sessions: 0, minutes: 0 });
    o.sessions += 1;
    o.minutes += sl ? sl.end - sl.start : 60;
  });
  const names = Object.keys(map).sort((a, b) => a.localeCompare(b, "ar"));
  const body = document.getElementById("hv-body"),
    foot = document.getElementById("hv-foot");
  document.getElementById("hv-warn").textContent = unclear
    ? "تنبيه: " + unclear + " حصة بدون توقيت واضح اتحسبت كل واحدة ساعة."
    : "";
  if (!names.length) {
    body.innerHTML =
      '<tr><td colspan="3" class="px-4 py-8 text-center text-slate-400 font-bold">لا توجد حصص مسجلة في ' +
      MONTHS[m] +
      " " +
      y +
      ".</td></tr>";
    foot.innerHTML = "";
    return;
  }
  let ts = 0,
    tm = 0;
  body.innerHTML = names
    .map((n) => {
      ts += map[n].sessions;
      tm += map[n].minutes;
      return `<tr><td class="hv-name">${escapeHtml(n)}</td><td class="hv-cell">${map[n].sessions}</td><td class="hv-cell">${hoursHtml(map[n].minutes)}</td></tr>`;
    })
    .join("");
  foot.innerHTML = `<tr><td class="hv-total">الإجمالي (${names.length} طالب)</td><td class="hv-total">${ts}</td><td class="hv-total">${hoursHtml(tm)}</td></tr>`;
}

/* ===== الوقت المتبقي على أقرب حصة ===== */
function todayName() {
  return DAYS[(new Date().getDay() + 1) % 7];
}

function timeToken(tok) {
  tok = tok.replace(",", ".");
  if (tok.includes(":")) {
    const p = tok.split(":");
    return { h: +p[0], m: +p[1] };
  }
  const p = tok.split(".");
  let m = 0;
  if (p[1])
    m = p[1].length === 1 ? Math.round(+("0." + p[1]) * 60) : +p[1].slice(0, 2); // 10.5 = 10:30  و 7.45 = 7:45
  return { h: +p[0], m };
}

// يحوّل نص مثل "10 - 8" أو "7.45 _ 7" إلى بداية ونهاية بالدقائق من منتصف الليل
function parseSlot(time, ampm) {
  const t = String(time || "").replace(/[٠-٩]/g, (d) =>
    "٠١٢٣٤٥٦٧٨٩".indexOf(d),
  );
  const toks = t.match(/\d{1,2}(?:[.:,]\d{1,2})?/g);
  if (!toks) return null;
  const a = timeToken(toks[0]);
  let start = a,
    dur = 60;
  if (toks.length >= 2) {
    const b = timeToken(toks[1]);
    const A = (a.h % 12) * 60 + a.m,
      B = (b.h % 12) * 60 + b.m;
    const dAB = (B - A + 720) % 720,
      dBA = (A - B + 720) % 720;
    if (dAB <= dBA) {
      start = a;
      dur = dAB;
    } else {
      start = b;
      dur = dBA;
    } // الأقصر مدة هي الصحيحة، فلا يهم ترتيب الكتابة
    if (dur === 0) dur = 60;
  }
  const pm =
    ampm === "مساءً"
      ? true
      : ampm === "صباحًا"
        ? false
        : !(start.h >= 7 && start.h <= 11);
  let h = start.h % 12;
  let startMin = (h + (pm ? 12 : 0)) * 60 + start.m;
  if (h === 0 && !pm) startMin = 12 * 60 + start.m; // 12 صباحًا تعني الظهر
  return { start: startMin, end: startMin + dur };
}

function fmtCountdown(sec) {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec / 3600),
    m = Math.floor((sec % 3600) / 60),
    x = sec % 60;
  return [h, m, x].map((v) => String(v).padStart(2, "0")).join(":");
}

function updateNextClass() {
  const now = new Date();
  const nowSec =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const day = todayName();
  const list = [];
  let total = 0;
  PERIODS.forEach((p) => {
    const i = scheduleData[day + "-" + p];
    if (!i || !i.students) return;
    total++;
    const sl = parseSlot(i.time, i.ampm);
    if (sl)
      list.push({
        p,
        names: i.students,
        start: sl.start * 60,
        end: sl.end * 60,
      });
  });
  const set = (label, names, count, sub) => {
    document.getElementById("nc-label").textContent = label;
    document.getElementById("nc-names").textContent = names;
    document.getElementById("nc-count").textContent = count;
    document.getElementById("nc-sub").textContent = sub;
  };
  if (!total) return set("لا توجد حصص في جدول اليوم", "", "", day);
  if (!list.length)
    return set(
      "تعذّر قراءة توقيت حصص اليوم",
      "",
      "",
      "اكتب التوقيت مثل: 10 - 8",
    );
  const cur = list.find((x) => nowSec >= x.start && nowSec < x.end);
  const next = list
    .filter((x) => x.start > nowSec)
    .sort((a, b) => a.start - b.start)[0];
  if (next) {
    set(
      "أقرب حصة بعد",
      next.names,
      fmtCountdown(next.start - nowSec),
      cur ? "الجارية الآن: " + cur.names : "الحصة " + next.p + " - " + day,
    );
  } else if (cur) {
    set(
      "الحصة الجارية الآن",
      cur.names,
      fmtCountdown(cur.end - nowSec),
      "متبقي على انتهائها",
    );
  } else {
    set("انتهت حصص اليوم", "", "", day);
  }
}

function calMove(delta) {
  calM += delta;
  if (calM < 0) {
    calM = 11;
    calY--;
  }
  if (calM > 11) {
    calM = 0;
    calY++;
  }
  renderCalendar();
}
function calToday() {
  const n = new Date();
  calY = n.getFullYear();
  calM = n.getMonth();
  renderCalendar();
}

function renderCalendar() {
  const n = new Date();
  const title = new Intl.DateTimeFormat("ar-EG-u-nu-latn", {
    month: "long",
    year: "numeric",
  }).format(new Date(calY, calM, 1));
  const offset = (new Date(calY, calM, 1).getDay() + 1) % 7; // الأسبوع يبدأ من السبت
  const total = new Date(calY, calM + 1, 0).getDate();
  const heads = ["س", "ح", "ن", "ث", "ر", "خ", "ج"]
    .map((d) => `<div class="cal-dh">${d}</div>`)
    .join("");
  let cells = "";
  for (let i = 0; i < offset; i++)
    cells += '<div class="cal-cell empty">0</div>';
  for (let d = 1; d <= total; d++) {
    const isToday =
      d === n.getDate() && calM === n.getMonth() && calY === n.getFullYear();
    cells += `<div class="cal-cell${isToday ? " today" : ""}">${d}</div>`;
  }
  document.getElementById("w-cal").innerHTML = `
    <div class="w-head flex items-center justify-between" style="padding:6px 4px">
      <button class="cal-nav" onclick="calMove(-1)" title="الشهر السابق"><svg class="ico " viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></button>
      <button class="cal-nav" style="font-weight:800;font-size:1rem" onclick="calToday()" title="العودة لشهر اليوم">${title}</button>
      <button class="cal-nav" onclick="calMove(1)" title="الشهر التالي"><svg class="ico " viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
    </div>
    <div class="cal-grid">${heads}${cells}</div>`;
}
