(function () {
  // القرّاء (ملف لكل آية). g = مجموعة الاحتياط: لو التسجيل ما اشتغلش بيجرّب مصدر تاني لنفس القارئ بس
  const SOURCES = [
    {
      n: "الحصري - مرتّل",
      t: "الشيخ الحصري (المرتّل)",
      g: "h",
      u: "https://everyayah.com/data/Husary_128kbps/",
    },
    {
      n: "المنشاوي - مرتّل",
      t: "الشيخ المنشاوي (المرتّل)",
      g: "m",
      u: "https://everyayah.com/data/Minshawy_Murattal_128kbps/",
    },
    {
      n: "الحذيفي",
      t: "الشيخ علي الحذيفي",
      g: "z",
      u: "https://everyayah.com/data/Hudhaify_128kbps/",
    },
    { n: "بندر بليلة", t: "الشيخ بندر بليلة", g: "b", qc: 160 },
    {
      n: "الحصري - معلّم",
      t: "الشيخ الحصري (المعلّم)",
      g: "hm",
      u: "https://everyayah.com/data/Husary_Muallim_128kbps/",
    },
    {
      n: "الحصري - مجوّد",
      t: "الشيخ الحصري (المجوّد)",
      g: "hj",
      u: "https://everyayah.com/data/Husary_Mujawwad_128kbps/",
    },
    {
      n: "الحصري - سيرفر بديل",
      t: "الشيخ الحصري (المرتّل)",
      g: "h",
      u: "https://verses.quran.com/Husary/mp3/",
    },
    {
      n: "الحصري - على الجهاز (من غير إنترنت)",
      t: "الشيخ الحصري (المرتّل)",
      g: "h",
      u: "/audio/",
    },
  ];
  const SID = (s) => s.u || "qc" + s.qc;
  let srcIdx = 0,
    tried = 0;
  try {
    const v = SOURCES.findIndex(
      (x) => SID(x) === window.ServerStore.getItem("qsrcid"),
    );
    if (v >= 0) srcIdx = v;
  } catch (e) {}
  const base = () => SOURCES[srcIdx].u || "";
  // بندر بليلة: روابط الآيات بتتجاب من واجهة quran.com (تسجيل رقم 160) لكل سورة مرة واحدة
  const QC = {};
  let qcTok = 0;
  function qcLoad(id, ch) {
    QC[id] = QC[id] || {};
    if (QC[id][ch]) return Promise.resolve();
    return fetch(
      "https://api.quran.com/api/v4/recitations/" +
        id +
        "/by_chapter/" +
        ch +
        "?per_page=300",
    )
      .then((r) => {
        if (!r.ok) throw new Error("http");
        return r.json();
      })
      .then((j) => {
        const m = {};
        (j.audio_files || []).forEach((f) => {
          const ay = +String(f.verse_key).split(":")[1];
          let u = f.url || "";
          if (!/^https?:/.test(u))
            u =
              u.indexOf("//") === 0
                ? "https:" + u
                : "https://verses.quran.com/" + u.replace(/^\//, "");
          if (ay && u) m[ay] = u;
        });
        if (!Object.keys(m).length) throw new Error("empty");
        QC[id][ch] = m;
      });
  }
  const SUR = QURAN_DATA.surahs;
  const PS = QURAN_DATA.pageSurahs;
  const PAGES = QURAN_DATA.pages;
  const FIRST = 582,
    LAST = 604;
  const ICO_PLAY =
    '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><polygon points="7 4 20 12 7 20 7 4"/></svg>';
  const ICO_PAUSE =
    '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>';
  const pad = (n) => String(n).padStart(3, "0");
  const el = (id) => document.getElementById(id);
  const st = {
    s: 26,
    a: 0,
    page: FIRST,
    playing: false,
    rep: 1,
    left: 1,
    speed: 1,
    auto: false,
    bism: true,
    inBism: false,
    ready: false,
    mode: "text",
    built: -1,
    chipsFor: -1,
    listBuilt: false,
    scrolled: "",
  };
  // نصوص الآيات: من النص اللي قدمه المستخدم فقط (سورة بسورة). السور اللي ملهاش نص هنا بتتعرض كصفحات المصحف
  const TEXT = QURAN_DATA.text;
  const TEXT_SOURCE = "Tanzil.net";
  const AR = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]);
  const audio = new Audio();
  audio.preload = "auto";

  const N = () => SUR[st.s][2];
  const src = () => {
    const s = SOURCES[srcIdx];
    if (s.qc) {
      const ch = st.inBism ? 1 : SUR[st.s][0],
        ay = st.inBism ? 1 : st.a + 1;
      return ((QC[s.qc] || {})[ch] || {})[ay] || "";
    }
    return (
      base() +
      (st.inBism ? "001001" : pad(SUR[st.s][0]) + pad(st.a + 1)) +
      ".mp3"
    );
  }; // 001001 = البسملة (أول آية في أول سورة)
  const setMsg = (t) => {
    el("q-msg").textContent = t || "";
  };
  const syncSel = () => {
    const s = el("q-src");
    if (s) s.value = srcIdx;
    const r = el("q-rec-name");
    if (r) r.textContent = SOURCES[srcIdx].t;
  };
  (function () {
    const s = el("q-src");
    if (s) {
      s.innerHTML = SOURCES.map(
        (x, i) => '<option value="' + i + '">' + x.n + "</option>",
      ).join("");
      s.value = srcIdx;
    }
    syncSel();
  })();

  function playCur() {
    const s = SOURCES[srcIdx];
    if (s.qc) {
      const ch = st.inBism ? 1 : SUR[st.s][0];
      if (!(QC[s.qc] && QC[s.qc][ch])) {
        st.playing = true;
        paint();
        setMsg("جاري تحميل الصوت...");
        const my = ++qcTok;
        qcLoad(s.qc, ch)
          .then(() => {
            if (my === qcTok && st.playing) playNow();
          })
          .catch(() => {
            if (my === qcTok) {
              st.playing = false;
              setMsg(
                "تعذر تحميل صوت هذا القارئ. جرّبي قارئ تاني أو اتأكدي من الإنترنت.",
              );
              paint();
            }
          });
        return;
      }
    }
    playNow();
  }
  function playNow() {
    tried = 0;
    audio.src = src();
    audio.playbackRate = st.speed;
    st.playing = true;
    paint();
    audio
      .play()
      .then(() => setMsg(""))
      .catch((e) => {
        if (e && e.name === "AbortError") return;
        st.playing = false;
        setMsg("تعذر تشغيل الصوت. تأكد من الاتصال بالإنترنت.");
        paint();
      });
    if (!SOURCES[srcIdx].qc && !st.inBism && st.a + 1 < N()) {
      const pre = new Audio();
      pre.preload = "auto";
      pre.src = base() + pad(SUR[st.s][0]) + pad(st.a + 2) + ".mp3";
    }
  }
  const repCount = () => (st.rep === 0 ? 1 : st.rep);
  function startAt(a) {
    st.a = a;
    st.left = repCount();
    st.inBism = a === 0 && st.bism;
    playCur();
  }
  function onEnd() {
    if (st.inBism) {
      st.inBism = false;
      st.a = 0;
      st.left = repCount();
      playCur();
      return;
    }
    if (st.rep === 0) {
      playCur();
      return;
    }
    if (st.left > 1) {
      st.left--;
      playCur();
      return;
    }
    if (st.a < N() - 1) {
      st.a++;
      st.left = repCount();
      playCur();
      return;
    }
    if (st.auto && st.s < SUR.length - 1) {
      st.s++;
      st.page = SUR[st.s][3];
      startAt(0);
      return;
    }
    st.playing = false;
    st.a = 0;
    paint();
  }
  audio.addEventListener("ended", onEnd);
  audio.addEventListener("playing", () => {
    tried = 0;
    setMsg("");
    try {
      window.ServerStore.setItem("qsrcid", SID(SOURCES[srcIdx]));
    } catch (e) {}
  });
  audio.addEventListener("error", () => {
    if (!audio.getAttribute("src")) return;
    const grp = SOURCES.map((x, i) => i).filter(
      (i) => SOURCES[i].g === SOURCES[srcIdx].g,
    );
    if (tried < grp.length - 1) {
      // جرّب سيرفر تاني لنفس القارئ
      tried++;
      srcIdx = grp[(grp.indexOf(srcIdx) + 1) % grp.length];
      syncSel();
      setMsg("جاري تجربة مصدر تاني للصوت...");
      audio.src = src();
      audio.playbackRate = st.speed;
      audio.play().catch(() => {});
      return;
    }
    tried = 0;
    if (st.inBism) {
      st.inBism = false;
      st.a = 0;
      playCur();
      return;
    } // لو ملف البسملة مش موجود نكمل من الآية الأولى
    st.playing = false;
    setMsg(
      "الصوت مش بيتحمّل من أي مصدر. اتأكد من الإنترنت، أو افتح اللينك ده في المتصفح وقولّي بيطلع إيه: " +
        src(),
    );
    paint();
  });
  audio.addEventListener("timeupdate", () => {
    const b = el("q-bar");
    if (b && audio.duration)
      b.style.width =
        Math.min(100, (audio.currentTime / audio.duration) * 100) + "%";
  });

  function renderText(T, S) {
    const box = el("qt-list");
    if (st.built !== st.s) {
      el("qt-bism").textContent = T.bism;
      box.innerHTML = "";
      T.ayat.forEach((tx, i) => {
        const d = document.createElement("span");
        d.className = "qt-ayah";
        d.tabIndex = 0;
        d.setAttribute("role", "button");
        d.onclick = () => window.qAyah(i);
        d.onkeydown = (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            window.qAyah(i);
          }
        };
        const n = document.createElement("span");
        n.className = "aym";
        n.textContent = AR(i + 1);
        d.append(tx + " ", n);
        box.append(d, " ");
      });
      st.built = st.s;
      box.scrollTop = 0;
      st.scrolled = "";
    }
    el("qt-bism").classList.toggle("on", st.inBism);
    Array.prototype.forEach.call(box.children, (r, i) =>
      r.classList.toggle("on", i === st.a && !st.inBism),
    );
    const key = st.s + "-" + st.a;
    const row = box.children[st.a];
    if (st.playing && row && st.scrolled !== key && box.scrollTo) {
      st.scrolled = key;
      box.scrollTo({
        top: row.offsetTop - box.clientHeight / 2 + row.clientHeight / 2,
        behavior: "smooth",
      });
    }
    el("qt-src").innerHTML = TEXT_SOURCE
      ? 'مصدر النص: <a href="https://tanzil.net" target="_blank" rel="noopener" style="text-decoration:underline">' +
        TEXT_SOURCE +
        "</a>"
      : "";
  }

  function paint() {
    if (!st.ready) return;
    const S = SUR[st.s];
    const T = TEXT[S[0]];
    const mode = T ? (PAGES[st.page] ? st.mode : "text") : "page";
    el("q-name").textContent = "سورة " + S[1];
    el("q-sub").textContent = "رقم " + S[0] + " · " + S[2] + " آية";
    el("q-type").textContent = S[4];
    el("q-now").textContent =
      (st.inBism ? "البسملة" : "الآية " + (st.a + 1) + " من " + S[2]) +
      (st.playing ? "  ▸ جارٍ التشغيل" : "");
    el("q-play").innerHTML = st.playing ? ICO_PAUSE : ICO_PLAY;

    // أرقام الآيات: شبكة منظمة (تتبني مرة لكل سورة وبعدها بنغيّر الألوان بس)
    const grid = el("q-chips");
    if (st.chipsFor !== st.s) {
      let ch = "";
      for (let i = 0; i < S[2]; i++)
        ch +=
          '<button type="button" class="qr-n" onclick="qAyah(' +
          i +
          ')">' +
          (i + 1) +
          "</button>";
      grid.innerHTML = ch;
      st.chipsFor = st.s;
    }
    Array.prototype.forEach.call(grid.children, (c, i) => {
      c.classList.toggle("on", i === st.a);
      c.classList.toggle("done", i < st.a);
    });

    // قائمة السور: صف لكل سورة (رقم + اسم + عدد الآيات)
    const list = el("q-list");
    if (!st.listBuilt) {
      const JUZ = [
        [27, "", 52, 57],
        [28, "", 58, 66],
        [29, "تبارك", 67, 77],
        [30, "عمّ", 78, 114],
      ];
      let html = "";
      JUZ.forEach(function (j) {
        let items = "";
        SUR.forEach(function (x, k) {
          if (x[0] >= j[2] && x[0] <= j[3]) {
            items +=
              '<button type="button" class="qr-s" data-i="' +
              k +
              '" onclick="qGoSurah(' +
              k +
              ')"><b>' +
              x[0] +
              "</b><span>" +
              x[1] +
              "</span><em>" +
              x[2] +
              " آية</em></button>";
          }
        });
        html +=
          '<details class="qr-juz"><summary>الجزء ' +
          AR(j[0]) +
          (j[1] ? " · " + j[1] : "") +
          '</summary><div class="qr-juz-in">' +
          items +
          "</div></details>";
      });
      list.innerHTML = html;
      st.listBuilt = true;
    }
    Array.prototype.forEach.call(list.querySelectorAll(".qr-s"), function (c) {
      c.classList.toggle("on", +c.dataset.i === st.s);
    });
    if (st.listFor !== st.s) {
      st.listFor = st.s;
      const cur = list.querySelector('.qr-s[data-i="' + st.s + '"]');
      if (cur) {
        const box = cur.closest("details");
        if (box) box.open = true;
        list.scrollTop = cur.offsetTop - list.clientHeight / 2 + 22;
      }
    }

    // وضع العرض: نص الآيات أو صفحة المصحف
    el("q-modebar").style.display = T ? "" : "none";
    el("q-m-text").classList.toggle("on", mode === "text");
    el("q-m-page").classList.toggle("on", mode === "page");
    el("q-textcard").style.display = mode === "text" ? "" : "none";
    el("q-pagecard").style.display = mode === "page" ? "" : "none";
    el("q-pnote").textContent = T
      ? ""
      : "نص هذه السورة لسه ما اتضافش، وبتتعرض هنا من صفحات المصحف.";
    if (mode === "text") renderText(T, S);
    el("q-img").src = PAGES[st.page];
    el("q-plabel").textContent = "الصفحة " + st.page + " من 604";
    el("q-psurahs").textContent = (PS[st.page] || [])
      .map((i) => SUR[i][1])
      .join(" · ");
  }

  window.qInit = function () {
    if (!st.ready) {
      st.ready = true;
    }
    paint();
  };
  window.qToggle = function () {
    if (st.playing) {
      audio.pause();
      st.playing = false;
      paint();
      return;
    }
    if (audio.getAttribute("src") && audio.currentTime > 0 && !audio.ended) {
      st.playing = true;
      audio.play().catch(() => {});
      paint();
      return;
    }
    startAt(st.a);
  };
  window.qAyah = function (i) {
    startAt(i);
  };
  window.qGoSurah = function (i) {
    audio.pause();
    st.playing = false;
    audio.removeAttribute("src");
    st.s = i;
    st.a = 0;
    st.page = SUR[i][3];
    st.inBism = false;
    setMsg("");
    el("q-bar").style.width = "0%";
    paint();
  };
  window.qStepSurah = function (d) {
    const j = st.s + d;
    if (j >= 0 && j < SUR.length) window.qGoSurah(j);
  };
  window.qStepAyah = function (d) {
    const j = st.a + d;
    if (j < 0 || j >= N()) return;
    if (st.playing) startAt(j);
    else {
      st.a = j;
      paint();
    }
  };
  window.qMode = function (m) {
    st.mode = m;
    paint();
  };
  window.qPage = function (d) {
    const p = st.page + d;
    if (p >= FIRST && p <= LAST) {
      st.page = p;
      paint();
    }
  };
  window.qOpt = function (k, v) {
    if (k === "rep") {
      st.rep = +v;
      st.left = repCount();
    }
    if (k === "speed") {
      st.speed = +v;
      audio.playbackRate = st.speed;
    }
    if (k === "bism") st.bism = !!v;
    if (k === "auto") st.auto = !!v;
    if (k === "src") {
      srcIdx = +v;
      tried = 0;
      syncSel();
      try {
        window.ServerStore.setItem("qsrcid", SID(SOURCES[srcIdx]));
      } catch (e) {}
      if (st.playing) playCur();
    }
  };
})();
