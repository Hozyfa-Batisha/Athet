(() => {
  var C = [
      [
        "\u0627",
        "\u0623\u064E\u0644\u0650\u0641",
        "\u0623\u064E\u0633\u064E\u062F",
        "\u{1F981}",
      ],
      [
        "\u0628",
        "\u0628\u064E\u0627\u0621",
        "\u0628\u064E\u0637\u0651\u064E\u0629",
        "\u{1F986}",
      ],
      [
        "\u062A",
        "\u062A\u064E\u0627\u0621",
        "\u062A\u064F\u0641\u0651\u064E\u0627\u062D",
        "\u{1F34E}",
      ],
      [
        "\u062B",
        "\u062B\u064E\u0627\u0621",
        "\u062B\u064E\u0639\u0652\u0644\u064E\u0628",
        "\u{1F98A}",
      ],
      [
        "\u062C",
        "\u062C\u0650\u064A\u0645",
        "\u062C\u064E\u0645\u064E\u0644",
        "\u{1F42A}",
      ],
      [
        "\u062D",
        "\u062D\u064E\u0627\u0621",
        "\u062D\u0650\u0635\u064E\u0627\u0646",
        "\u{1F434}",
      ],
      [
        "\u062E",
        "\u062E\u064E\u0627\u0621",
        "\u062E\u064E\u0631\u064F\u0648\u0641",
        "\u{1F411}",
      ],
      [
        "\u062F",
        "\u062F\u064E\u0627\u0644",
        "\u062F\u064F\u0628\u0651",
        "\u{1F43B}",
      ],
      [
        "\u0630",
        "\u0630\u064E\u0627\u0644",
        "\u0630\u064F\u0631\u064E\u0629",
        "\u{1F33D}",
      ],
      [
        "\u0631",
        "\u0631\u064E\u0627\u0621",
        "\u0631\u064F\u0645\u0651\u064E\u0627\u0646",
        "\u{1F534}",
      ],
      [
        "\u0632",
        "\u0632\u064E\u0627\u064A",
        "\u0632\u064E\u0631\u064E\u0627\u0641\u064E\u0629",
        "\u{1F992}",
      ],
      [
        "\u0633",
        "\u0633\u0650\u064A\u0646",
        "\u0633\u064E\u0645\u064E\u0643\u064E\u0629",
        "\u{1F41F}",
      ],
      [
        "\u0634",
        "\u0634\u0650\u064A\u0646",
        "\u0634\u064E\u0645\u0652\u0633",
        "\u2600\uFE0F",
      ],
      [
        "\u0635",
        "\u0635\u064E\u0627\u062F",
        "\u0635\u064E\u0642\u0652\u0631",
        "\u{1F985}",
      ],
      [
        "\u0636",
        "\u0636\u064E\u0627\u062F",
        "\u0636\u0650\u0641\u0652\u062F\u064E\u0639",
        "\u{1F438}",
      ],
      [
        "\u0637",
        "\u0637\u064E\u0627\u0621",
        "\u0637\u064E\u0627\u0626\u0650\u0631",
        "\u{1F426}",
      ],
      [
        "\u0638",
        "\u0638\u064E\u0627\u0621",
        "\u0638\u064E\u0628\u0652\u064A",
        "\u{1F98C}",
      ],
      [
        "\u0639",
        "\u0639\u064E\u064A\u0652\u0646",
        "\u0639\u0650\u0646\u064E\u0628",
        "\u{1F347}",
      ],
      [
        "\u063A",
        "\u063A\u064E\u064A\u0652\u0646",
        "\u063A\u064E\u0632\u064E\u0627\u0644",
        "\u{1F98C}",
      ],
      [
        "\u0641",
        "\u0641\u064E\u0627\u0621",
        "\u0641\u064E\u0631\u064E\u0627\u0634\u064E\u0629",
        "\u{1F98B}",
      ],
      [
        "\u0642",
        "\u0642\u064E\u0627\u0641",
        "\u0642\u064E\u0645\u064E\u0631",
        "\u{1F319}",
      ],
      [
        "\u0643",
        "\u0643\u064E\u0627\u0641",
        "\u0643\u0650\u062A\u064E\u0627\u0628",
        "\u{1F4D6}",
      ],
      [
        "\u0644",
        "\u0644\u064E\u0627\u0645",
        "\u0644\u064E\u064A\u0652\u0645\u064F\u0648\u0646",
        "\u{1F34B}",
      ],
      [
        "\u0645",
        "\u0645\u0650\u064A\u0645",
        "\u0645\u064E\u0648\u0652\u0632",
        "\u{1F34C}",
      ],
      [
        "\u0646",
        "\u0646\u064F\u0648\u0646",
        "\u0646\u064E\u062D\u0652\u0644\u064E\u0629",
        "\u{1F41D}",
      ],
      [
        "\u0647",
        "\u0647\u064E\u0627\u0621",
        "\u0647\u0650\u0644\u064E\u0627\u0644",
        "\u{1F319}",
      ],
      [
        "\u0648",
        "\u0648\u064E\u0627\u0648",
        "\u0648\u064E\u0631\u0652\u062F\u064E\u0629",
        "\u{1F337}",
      ],
      ["\u064A", "\u064A\u064E\u0627\u0621", "\u064A\u064E\u062F", "\u270B"],
    ].map(([e, r, n, s], i) => ({
      char: e,
      name: r,
      word: n,
      emoji: s,
      index: i,
    })),
    y = (e) => Number(e).toLocaleString("ar-EG");
  function j(e, r = Math.random) {
    let n = [...e];
    for (let s = n.length - 1; s > 0; s--) {
      let i = Math.floor(r() * (s + 1));
      [n[s], n[i]] = [n[i], n[s]];
    }
    return n;
  }
  function H(e) {
    return j([e, ...j(C.filter((r) => r.index !== e.index)).slice(0, 3)]);
  }
  function P(e) {
    try {
      let r = JSON.parse(e.getItem("hurufi-progress-v1") || "{}");
      return {
        learned: [
          ...new Set(
            (Array.isArray(r.learned) ? r.learned : []).filter(
              (n) => Number.isInteger(n) && n >= 0 && n < 28,
            ),
          ),
        ],
        stars: Number.isSafeInteger(r.stars) && r.stars >= 0 ? r.stars : 0,
        best:
          Number.isInteger(r.best) && r.best >= 0 && r.best <= 10 ? r.best : 0,
      };
    } catch {
      return { learned: [], stars: 0, best: 0 };
    }
  }
  var J = {
      correct: "audio/effects/correct.mp3",
      retry: "audio/effects/retry.mp3",
      pop: "audio/effects/pop.mp3",
      tap: "audio/effects/pop.mp3",
      fanfare: "audio/effects/fanfare.mp3",
      applause: "audio/effects/applause.mp3",
      cheer: "audio/effects/cheer.mp3",
    },
    Z = {
      correct: 0.38,
      retry: 0.24,
      pop: 0.32,
      tap: 0.13,
      fanfare: 0.35,
      applause: 0.5,
      cheer: 0.5,
    };
  function O({
    isMuted: e = () => !1,
    AudioClass: r = globalThis.Audio,
    document: n = globalThis.document,
  } = {}) {
    let s = null,
      i = [],
      d = !1,
      b = !1,
      v = 0,
      h = "",
      p = -1 / 0,
      L = () => b || e() || n?.hidden;
    function g() {
      (v++,
        s && ((s.onended = null), (s.onerror = null), s.pause(), (s = null)));
    }
    function o() {
      ((i = []), (d = !1), (h = ""), (p = -1 / 0), g());
    }
    function m() {
      if (L()) {
        o();
        return;
      }
      if (d || s || !i.length) return;
      let l = i.shift(),
        u;
      try {
        u = new r(J[l]);
      } catch {
        i = [];
        return;
      }
      let Y = ++v;
      ((s = u), (u.volume = Z[l]), (u.preload = "auto"));
      let V = () => {
        Y === v && ((u.onended = null), (u.onerror = null), (s = null), m());
      };
      ((u.onended = V), (u.onerror = V));
      try {
        Promise.resolve(u.play()).catch(V);
      } catch {
        V();
      }
    }
    function M(l) {
      if (L()) {
        o();
        return;
      }
      if ((l === "match" && (l = "correct"), l !== "celebrate" && !J[l]))
        return;
      let u = Date.now();
      (l === h && u - p < (l === "tap" ? 70 : 180)) ||
        ((h = l),
        (p = u),
        g(),
        (i = l === "celebrate" ? ["fanfare", "applause", "cheer"] : [l]),
        m());
    }
    function E(l, { discard: u = !1 } = {}) {
      ((d = !!l), (u || d) && ((i = []), g()), d || m());
    }
    let $ = () => {
      n.hidden && o();
    };
    return (
      n?.addEventListener("visibilitychange", $),
      {
        play: M,
        stop: o,
        setNarrating: E,
        destroy() {
          (o(), (b = !0), n?.removeEventListener("visibilitychange", $));
        },
      }
    );
  }
  var z = new WeakMap(),
    F = (e) => e === "dark" || e === "light";
  function G({ document: e = globalThis.document, storage: r } = {}) {
    if (!e) return { destroy() {} };
    z.get(e)?.destroy();
    let n = e.defaultView || globalThis,
      s = r;
    if (s === void 0)
      try {
        s = n.ServerStore;
      } catch {}
    let i = n.matchMedia?.("(prefers-color-scheme: dark)"),
      d = null;
    try {
      let o = s?.getItem("hurufi-theme");
      F(o) && (d = o);
    } catch {}
    function b(o) {
      let m = o === "dark";
      ((e.documentElement.dataset.theme = o),
        (e.documentElement.style.colorScheme = o));
      let M = e.querySelector('meta[name="theme-color"]');
      (M && (M.content = m ? "#121a24" : "#f7faf8"),
        e.querySelectorAll("[data-theme-toggle]").forEach((E) => {
          let $ = m
            ? "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D"
            : "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646";
          (E.setAttribute("aria-pressed", String(m)),
            E.setAttribute("aria-label", $),
            (E.title = $));
          let l = E.querySelector("[data-theme-icon]");
          (l ||
            ((l = e.createElement("span")),
            (l.dataset.themeIcon = ""),
            l.setAttribute("aria-hidden", "true"),
            E.prepend(l)),
            (l.textContent = m ? "\u2600" : "\u263E"));
          let u = E.querySelector("[data-theme-label]");
          u && (u.textContent = $);
        }));
    }
    let v = () => (i?.matches ? "dark" : "light"),
      h = (o) => {
        let m = o.target.closest?.("[data-theme-toggle]");
        if (!(!m || m.disabled)) {
          (o.preventDefault(),
            (d =
              e.documentElement.dataset.theme === "dark" ? "light" : "dark"));
          try {
            s?.setItem("hurufi-theme", d);
          } catch {}
          b(d);
        }
      },
      p = () => {
        d || b(v());
      },
      L = (o) => {
        (o.key !== "hurufi-theme" && o.key !== null) ||
          ((d = F(o.newValue) ? o.newValue : null), b(d || v()));
      };
    (e.addEventListener("click", h),
      n.addEventListener?.("athar:settings", L),
      i?.addEventListener
        ? i.addEventListener("change", p)
        : i?.addListener?.(p),
      b(d || v()));
    let g = {
      destroy() {
        (e.removeEventListener("click", h),
          n.removeEventListener?.("athar:settings", L),
          i?.removeEventListener
            ? i.removeEventListener("change", p)
            : i?.removeListener?.(p),
          z.get(e) === g && z.delete(e));
      },
    };
    return (z.set(e, g), g);
  }
  G();
  var t = (e) => document.getElementById(e),
    S;
  try {
    S = window.ServerStore;
  } catch {
    S = { getItem: () => null, setItem: () => {} };
  }
  var c = P(S),
    x = !1;
  try {
    x = S.getItem("hurufi-muted") === "true";
  } catch {}
  var w = O({ isMuted: () => x }),
    f = 0,
    D = "learn",
    q = null,
    A = 0,
    a = null,
    ee = [
      ["#fcf0e5", "#af7050"],
      ["#edf4ed", "#5c8b6a"],
      ["#f1edfa", "#8972b5"],
      ["#fceeed", "#bd8583"],
    ],
    te = {
      check:
        '<svg class="tile-visited" aria-hidden="true"><use href="#i-check"/></svg>',
    };
  function R() {
    try {
      S.setItem("hurufi-progress-v1", JSON.stringify(c));
    } catch {}
    B();
  }
  function B() {
    ((t("star-total").textContent = y(c.stars)),
      (t("learned-count").textContent = y(c.learned.length)),
      (t("learn-progress-fill").style.width =
        `${(c.learned.length / 28) * 100}%`),
      t("learn-progress").setAttribute("aria-valuenow", c.learned.length),
      (t("progress-caption").textContent =
        c.learned.length === 28
          ? "\u0627\u0643\u062A\u0634\u0641\u062A\u0647\u0627 \u0643\u0644\u0651\u0647\u0627!"
          : c.learned.length > 14
            ? "\u0627\u0642\u062A\u0631\u0628\u062A \u0645\u0646 \u0627\u0644\u0642\u0645\u0651\u0629!"
            : c.learned.length > 5
              ? "\u0627\u0633\u062A\u0645\u0631\u0651 \u064A\u0627 \u0628\u0637\u0644!"
              : "\u0628\u062F\u0627\u064A\u0629 \u062C\u0645\u064A\u0644\u0629!"),
      (t("stat-learned").textContent = y(c.learned.length)),
      (t("stat-stars").textContent = y(c.stars)),
      (t("stat-best").textContent = `${y(c.best)} / \u0661\u0660`));
    let e = [
      [
        "\u{1F331}",
        "\u0623\u0648\u0651\u0644 \u0627\u0643\u062A\u0634\u0627\u0641",
        "\u0627\u0633\u0645\u0639 \u0623\u0648\u0651\u0644 \u062D\u0631\u0641",
        c.learned.length > 0,
      ],
      [
        "\u{1F31F}",
        "\u062C\u0627\u0645\u0639 \u0627\u0644\u0646\u062C\u0648\u0645",
        "\u0627\u062C\u0645\u0639 \u0661\u0660 \u0646\u062C\u0648\u0645",
        c.stars >= 10,
      ],
      [
        "\u{1F333}",
        "\u0635\u062F\u064A\u0642 \u0627\u0644\u062D\u0631\u0648\u0641",
        "\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0640\u0662\u0668",
        c.learned.length === 28,
      ],
    ];
    ((t("badges").innerHTML = e
      .map(
        ([r, n, s, i]) =>
          `<div class="badge ${i ? "unlocked" : ""}"><span class="badge-icon" aria-hidden="true">${r}</span><span>${n}</span><small>${i ? "\u0623\u062D\u0633\u0646\u062A\u060C \u062D\u0642\u0651\u0642\u062A\u0647\u0627!" : s}</small></div>`,
      )
      .join("")),
      W());
  }
  function W() {
    let e = document.activeElement?.dataset?.letter;
    ((t("alphabet-grid").innerHTML = C.map(
      (r) =>
        `<button class="letter-tile ${f === r.index ? "active" : ""}" data-letter="${r.index}" aria-label="${r.name}${c.learned.includes(r.index) ? "\u060C \u062A\u0645\u0651 \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639" : ""}" aria-pressed="${f === r.index}">${r.char}${c.learned.includes(r.index) ? te.check : ""}</button>`,
    ).join("")),
      e !== void 0 &&
        t("alphabet-grid")
          .querySelector(`[data-letter="${e}"]`)
          ?.focus({ preventScroll: !0 }));
  }
  function k() {
    (A++,
      q && (q.pause(), (q.currentTime = 0), (q = null)),
      "speechSynthesis" in window && window.speechSynthesis.cancel(),
      document
        .querySelectorAll(".is-playing")
        .forEach((e) => e.classList.remove("is-playing")),
      w.setNarrating(!1, { discard: !0 }));
  }
  function re(e) {
    c.learned.includes(e) || (c.learned.push(e), R());
  }
  async function T(e, r = "name", n = null, s = null) {
    if ((k(), x)) {
      ((t("sound-status").textContent =
        "\u0627\u0644\u0635\u0648\u062A \u0645\u0643\u062A\u0648\u0645. \u0641\u0639\u0651\u0644\u0647 \u0645\u0646 \u0632\u0631 \u0627\u0644\u0635\u0648\u062A \u0623\u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u0627\u0633\u0645\u0639 \u0627\u0644\u062D\u0631\u0641\xBB."),
        (t("sound-status").hidden = !1));
      return;
    }
    let i = A;
    (w.setNarrating(!0), (t("sound-status").hidden = !0));
    let d = new GameAudio(`audio/${String(e + 1).padStart(2, "0")}-${r}.mp3`);
    q = d;
    let b = !1,
      v = () => {
        i !== A ||
          b ||
          ((b = !0),
          r === "name" && re(e),
          n?.classList.add("is-playing"),
          s?.());
      },
      h = () => {
        (n?.classList.remove("is-playing"), i === A && w.setNarrating(!1));
      };
    ((d.onplaying = v), (d.onended = h));
    let p = !1,
      L = () => {
        if (i !== A || p) return;
        ((p = !0), h());
        let g = window.speechSynthesis
          ?.getVoices()
          .find((o) => /^ar[-_]?/i.test(o.lang));
        if (g && "SpeechSynthesisUtterance" in window) {
          let o = new SpeechSynthesisUtterance(
            C[e][r === "word" ? "word" : "name"],
          );
          (w.setNarrating(!0),
            (o.voice = g),
            (o.lang = g.lang),
            (o.rate = 0.8),
            (o.onstart = v),
            (o.onend = () => {
              i === A && h();
            }),
            (o.onerror = (m) => {
              i !== A ||
                ["canceled", "interrupted"].includes(m.error) ||
                (h(), U());
            }),
            window.speechSynthesis.speak(o));
        } else U();
      };
    d.onerror = L;
    try {
      await d.play();
    } catch {
      L();
    }
  }
  function U() {
    ((t("sound-status").textContent =
      "\u062A\u0639\u0630\u0651\u0631 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0635\u0648\u062A. \u062A\u0623\u0643\u0651\u062F \u0645\u0646 \u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0635\u0648\u062A\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \xAB\u0627\u0633\u0645\u0639 \u0627\u0644\u062D\u0631\u0641\xBB \u0644\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649."),
      (t("sound-status").hidden = !1));
  }
  function I(e, r = !0) {
    f = Math.max(0, Math.min(27, e));
    let n = C[f],
      [s, i] = ee[f % 4];
    ((t("big-letter").textContent = n.char),
      (t("letter-name").textContent = n.name),
      (t("letter-position").textContent =
        `\u0627\u0644\u062D\u0631\u0641 ${y(f + 1)} \u0645\u0646 \u0662\u0668`),
      (t("example-word").textContent = n.word),
      (t("example-art").textContent = n.emoji),
      (t("letter-stage").style.background = s),
      (t("big-letter").style.color = i),
      (t("letter-name").style.color = i),
      t("listen-main").setAttribute(
        "aria-label",
        `\u0627\u0633\u0645\u0639 \u062D\u0631\u0641 ${n.name}`,
      ),
      t("listen-word").setAttribute(
        "aria-label",
        `\u0627\u0633\u0645\u0639 \u0643\u0644\u0645\u0629 ${n.word}`,
      ),
      (t("previous-letter").disabled = f === 0),
      (t("next-letter").disabled = f === 27),
      W(),
      r && T(f, "name", t("listen-letter")));
  }
  function N(e, r = !1) {
    (["learn", "play", "progress"].includes(e) || (e = "learn"),
      e !== D && (k(), w.stop()),
      (D = e));
    for (let n of ["learn", "play", "progress"])
      t(n + "-view").hidden = n !== e;
    (document.querySelectorAll("[data-view]").forEach((n) => {
      let s = n.dataset.view === e;
      (n.classList.contains("nav-link") &&
        (n.classList.toggle("active", s),
        s
          ? n.setAttribute("aria-current", "page")
          : n.removeAttribute("aria-current")),
        n.classList.contains("mode-tab") &&
          (n.classList.toggle("active", s),
          n.setAttribute("aria-selected", s),
          (n.tabIndex = s ? 0 : -1)));
    }),
      history.replaceState(null, "", `#${e}`),
      r &&
        document.querySelector(".workspace-toolbar").scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
          block: "start",
        }),
      B());
  }
  function _() {
    (k(),
      w.stop(),
      (a = {
        queue: j(C).slice(0, 10),
        round: 0,
        score: 0,
        firstTry: !0,
        answered: !1,
        heard: !1,
        finished: !1,
      }),
      (t("game-intro").hidden = !0),
      (t("game-result").hidden = !0),
      (t("game-round").hidden = !1),
      K());
  }
  function K() {
    k();
    let e = a.queue[a.round];
    ((a.firstTry = !0),
      (a.answered = !1),
      (a.heard = !1),
      (t("round-count").textContent =
        `\u0627\u0644\u0633\u0624\u0627\u0644 ${y(a.round + 1)} \u0645\u0646 \u0661\u0660`),
      (t("round-score").textContent = y(a.score)),
      (t("round-progress").style.width = `${(a.round / 10) * 100}%`),
      (t("game-feedback").textContent = ""),
      t("game-feedback").classList.remove("try-again"),
      (t("game-help").textContent =
        "\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u0635\u0648\u062A\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0631\u0641"),
      (t("next-round").hidden = !0),
      (t("quiz-choices").innerHTML = H(e)
        .map(
          (r) =>
            `<button class="choice" data-choice="${r.index}" aria-label="\u0627\u0644\u062D\u0631\u0641 ${r.char}" disabled>${r.char}</button>`,
        )
        .join("")),
      t("quiz-listen").focus({ preventScroll: !0 }));
  }
  function ne() {
    !a ||
      a.finished ||
      T(a.queue[a.round].index, "name", t("quiz-listen"), () => {
        !a ||
          a.finished ||
          a.answered ||
          ((a.heard = !0),
          t("quiz-choices")
            .querySelectorAll(".choice:not(.wrong)")
            .forEach((e) => (e.disabled = !1)),
          (t("game-help").textContent =
            "\u0631\u0627\u0626\u0639! \u0623\u064A\u0651 \u062D\u0631\u0641 \u0633\u0645\u0639\u062A\u061F"));
      });
  }
  function ae(e) {
    if (!a || !a.heard || a.answered || e.disabled) return;
    let r = Number(e.dataset.choice),
      n = a.queue[a.round];
    if (r !== n.index) {
      ((a.firstTry = !1),
        (e.disabled = !0),
        e.classList.add("wrong"),
        t("game-feedback").classList.add("try-again"),
        (t("game-feedback").textContent =
          "\u062D\u0627\u0648\u0644 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639 \u0645\u0646 \u062C\u062F\u064A\u062F \u2661"),
        w.play("retry"));
      return;
    }
    ((a.answered = !0),
      e.classList.add("correct"),
      t("quiz-choices")
        .querySelectorAll("button")
        .forEach((s) => (s.disabled = !0)),
      t("game-feedback").classList.remove("try-again"),
      (t("game-feedback").textContent = a.firstTry
        ? "\u0623\u062D\u0633\u0646\u062A! \u0646\u062C\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u0643 \u2726"
        : "\u0631\u0627\u0626\u0639! \u0648\u062C\u062F\u062A \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0635\u062D\u064A\u062D. \u0627\u0644\u062A\u0639\u0644\u0651\u0645 \u0628\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629!"),
      w.play("correct"),
      a.firstTry && (a.score++, c.stars++, R(), Q(15)),
      (t("round-score").textContent = y(a.score)),
      (t("next-round").textContent =
        a.round === 9
          ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726"
          : "\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u062A\u0627\u0644\u064A \u2190"),
      (t("next-round").hidden = !1),
      t("next-round").focus({ preventScroll: !0 }));
  }
  function se() {
    a?.answered && (a.round < 9 ? (a.round++, K()) : ie());
  }
  function ie() {
    if (!a.finished) {
      (k(), (a.finished = !0), (c.best = Math.max(c.best, a.score)), R());
      try {
        let e = JSON.parse(S.getItem("hurufi-arcade-v1") || "{}");
        ((!e || typeof e != "object" || Array.isArray(e)) && (e = {}),
          (e.completed =
            (Number.isSafeInteger(e.completed) && e.completed >= 0
              ? e.completed
              : 0) + 1),
          (!e.games || typeof e.games != "object" || Array.isArray(e.games)) &&
            (e.games = {}));
        let r = e.games.listen;
        ((e.games.listen = {
          plays: (Number.isInteger(r?.plays) && r.plays >= 0 ? r.plays : 0) + 1,
          best: Math.max(Number(r?.best) || 0, a.score),
        }),
          (e.recent = [
            { id: "listen", stars: a.score },
            ...(Array.isArray(e.recent) ? e.recent : []),
          ].slice(0, 5)),
          S.setItem("hurufi-arcade-v1", JSON.stringify(e)));
      } catch {}
      ((t("game-round").hidden = !0),
        (t("game-result").hidden = !1),
        (t("result-title").textContent =
          a.score >= 8
            ? "\u0623\u0646\u062A \u0646\u062C\u0645 \u0627\u0644\u062D\u0631\u0648\u0641!"
            : a.score >= 4
              ? "\u0623\u062D\u0633\u0646\u062A \u064A\u0627 \u0628\u0637\u0644!"
              : "\u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u062C\u0639\u0644\u0643 \u0623\u0641\u0636\u0644!"),
        (t("result-description").textContent =
          a.score === 10
            ? "\u0643\u0644 \u0625\u062C\u0627\u0628\u0627\u062A\u0643 \u0635\u062D\u064A\u062D\u0629 \u0645\u0646 \u0623\u0648\u0651\u0644 \u0645\u062D\u0627\u0648\u0644\u0629. \u064A\u0627 \u0644\u0643 \u0645\u0646 \u0645\u0633\u062A\u0643\u0634\u0641 \u0631\u0627\u0626\u0639!"
            : "\u062A\u0639\u0644\u0651\u0645\u062A \u062D\u0631\u0648\u0641\u064B\u0627 \u062C\u062F\u064A\u062F\u0629\u060C \u0648\u0647\u0630\u0647 \u0623\u062C\u0645\u0644 \u0628\u062F\u0627\u064A\u0629. \u0646\u0644\u0639\u0628 \u0648\u0646\u062A\u0639\u0644\u0651\u0645 \u0623\u0643\u062B\u0631\u061F"),
        (t("result-score").innerHTML =
          `${y(a.score)} <span aria-hidden="true">\u2605</span><small>\u0646\u062C\u0648\u0645 \u0645\u0646 \u0661\u0660</small>`),
        t("play-again").focus({ preventScroll: !0 }),
        a.score > 0 && Q(45),
        w.play("celebrate"));
    }
  }
  function Q(e) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let r = Array.from({ length: e }, () => {
      let n = document.createElement("i");
      return (
        (n.style.left = `${15 + Math.random() * 70}%`),
        n.style.setProperty("--drift", `${(Math.random() - 0.5) * 260}px`),
        (n.style.animationDelay = `${Math.random() * 0.3}s`),
        n
      );
    });
    (t("confetti").append(...r),
      setTimeout(() => r.forEach((n) => n.remove()), 2e3));
  }
  t("alphabet-grid").addEventListener("click", (e) => {
    let r = e.target.closest("[data-letter]");
    r && I(Number(r.dataset.letter));
  });
  t("alphabet-grid").addEventListener("keydown", (e) => {
    let r = e.target.closest("[data-letter]");
    if (!r) return;
    let n = Number(r.dataset.letter),
      s = getComputedStyle(t("alphabet-grid")).gridTemplateColumns.split(
        " ",
      ).length;
    if (e.key === "ArrowLeft") n++;
    else if (e.key === "ArrowRight") n--;
    else if (e.key === "ArrowDown") n += s;
    else if (e.key === "ArrowUp") n -= s;
    else return;
    (e.preventDefault(),
      I(n),
      t("alphabet-grid").querySelector(`[data-letter="${f}"]`)?.focus());
  });
  t("listen-main").addEventListener("click", () =>
    T(f, "name", t("listen-letter")),
  );
  t("listen-letter").addEventListener("click", () =>
    T(f, "name", t("listen-letter")),
  );
  t("listen-word").addEventListener("click", () =>
    T(f, "word", t("listen-word")),
  );
  t("previous-letter").addEventListener("click", () => I(f - 1));
  t("next-letter").addEventListener("click", () => I(f + 1));
  document
    .querySelectorAll("button[data-view]")
    .forEach((e) =>
      e.addEventListener("click", () =>
        N(e.dataset.view, e.classList.contains("challenge-banner")),
      ),
    );
  document.querySelector(".brand").addEventListener("click", (e) => {
    e.currentTarget.getAttribute("href").startsWith("#") &&
      (e.preventDefault(), N("learn"));
  });
  document.querySelector(".mode-tabs").addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    let r =
      e.key === "Home"
        ? "learn"
        : e.key === "End" || D === "learn"
          ? "play"
          : "learn";
    (N(r), t(`tab-${D}`).focus());
  });
  t("start-game").addEventListener("click", _);
  t("play-again").addEventListener("click", _);
  t("quiz-listen").addEventListener("click", ne);
  t("quiz-choices").addEventListener("click", (e) => {
    let r = e.target.closest("[data-choice]");
    r && ae(r);
  });
  t("next-round").addEventListener("click", se);
  function X() {
    let e = t("legacy-sound");
    (e.setAttribute("aria-pressed", x),
      e.setAttribute(
        "aria-label",
        x
          ? "\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0635\u0648\u062A"
          : "\u0643\u062A\u0645 \u0627\u0644\u0635\u0648\u062A",
      ));
  }
  t("legacy-sound").addEventListener("click", () => {
    x = !x;
    try {
      S.setItem("hurufi-muted", String(x));
    } catch {}
    (x ? k() : (t("sound-status").hidden = !0), X());
  });
  window.addEventListener("hashchange", () => N(location.hash.slice(1)));
  document.addEventListener("visibilitychange", () => {
    document.hidden && k();
  });
  window.addEventListener("pagehide", () => {
    (k(), w.stop());
  });
  X();
  I(0, !1);
  N(location.hash.slice(1) || "learn");
})();
