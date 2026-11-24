import {
  noorGameCards,
  noorGameRounds,
  noorGameTopics,
  noorLessonGames,
} from "../../data/noor-game-data.js";
import { mountNoorGame } from "./noor-games.js";

(() => {
  var D = [
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
    ].map(([e, a, u, h], g) => ({
      char: e,
      name: a,
      word: u,
      emoji: h,
      index: g,
    })),
    v = (e) => Number(e).toLocaleString("ar-EG");
  function L(e, a = Math.random) {
    let u = [...e];
    for (let h = u.length - 1; h > 0; h--) {
      let g = Math.floor(a() * (h + 1));
      [u[h], u[g]] = [u[g], u[h]];
    }
    return u;
  }
  function de(e) {
    try {
      let a = JSON.parse(e.getItem("hurufi-progress-v1") || "{}");
      return {
        learned: [
          ...new Set(
            (Array.isArray(a.learned) ? a.learned : []).filter(
              (u) => Number.isInteger(u) && u >= 0 && u < 28,
            ),
          ),
        ],
        stars: Number.isSafeInteger(a.stars) && a.stars >= 0 ? a.stars : 0,
        best:
          Number.isInteger(a.best) && a.best >= 0 && a.best <= 10 ? a.best : 0,
      };
    } catch {
      return { learned: [], stars: 0, best: 0 };
    }
  }
  var Je = (e) => e.replace(/[\u064B-\u065F\u0670\u0640]/g, "");
  function ke(
    e,
    a,
    {
      onComplete: u = () => {},
      onSpeak: h = () => {},
      onFeedback: g = () => {},
    } = {},
  ) {
    let M = !1,
      n,
      d = new Set(),
      r = (o) => e.querySelector(o),
      k = (o, p) => {
        let t = setTimeout(() => {
          (d.delete(t), M || o());
        }, p);
        d.add(t);
      },
      m = (o) => r(o)?.focus({ preventScroll: !0 }),
      A = (o, p = "") => {
        let t = r(".edu-status");
        t && ((t.textContent = o), (t.className = `edu-status ${p}`));
      },
      q = (o, p) => {
        M ||
          n.completed ||
          ((n.completed = !0),
          u({ stars: Math.max(1, Math.min(6, o)), summary: p }));
      },
      S = (o, p, t) =>
        `<div class="edu-top"><div><span class="edu-kicker">${o}</span><p>${p}</p></div><span class="edu-stat">${t}</span></div>`;
    function _() {
      let o = L([0, 1, 4, 7, 11, 12, 20, 21, 22, 23, 25, 27]).slice(0, 6);
      ((n = {
        cards: L(o.flatMap((p) => [p, p])),
        open: [],
        matched: new Set(),
        moves: 0,
        locked: !1,
        completed: !1,
      }),
        (e.innerHTML = `<div class="edu-game edu-memory">
      ${S("\u0623\u0635\u062F\u0642\u0627\u0621 \u0645\u062A\u0634\u0627\u0628\u0647\u0648\u0646", "\u0627\u0642\u0644\u0628 \u0628\u0637\u0627\u0642\u062A\u064A\u0646\u060C \u0648\u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u062D\u0631\u0641 \u0646\u0641\u0633\u0647. \u062A\u0630\u0643\u0651\u0631 \u0645\u0643\u0627\u0646\u0647 \u0644\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629!", "\u0666 \u0623\u0632\u0648\u0627\u062C")}
      <div class="edu-memory-score"><span>\u0627\u0644\u0623\u0632\u0648\u0627\u062C <b data-memory-found>\u0660 / \u0666</b></span><span>\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0627\u062A <b data-memory-moves>\u0660</b></span></div>
      <div class="edu-memory-grid" aria-label="\u0628\u0637\u0627\u0642\u0627\u062A \u0644\u0639\u0628\u0629 \u0627\u0644\u0630\u0627\u0643\u0631\u0629">${n.cards.map((p, t) => `<button type="button" class="edu-memory-card" data-card="${t}" aria-label="\u0628\u0637\u0627\u0642\u0629 \u0645\u063A\u0644\u0642\u0629 \u0631\u0642\u0645 ${v(t + 1)}" aria-pressed="false"><span aria-hidden="true">\u2726</span></button>`).join("")}</div>
      <p class="edu-status" role="status" aria-live="polite">\u0644\u0646\u0628\u062F\u0623! \u0627\u062E\u062A\u0631 \u0623\u064A\u0651 \u0628\u0637\u0627\u0642\u0629.</p>
      <div class="edu-finish" hidden><div class="edu-win-icon" aria-hidden="true">\u{1F31F}</div><h3>\u0630\u0627\u0643\u0631\u062A\u0643 \u0645\u0644\u064A\u0626\u0629 \u0628\u0627\u0644\u0646\u062C\u0648\u0645!</h3><p data-memory-summary></p><button type="button" class="primary-button" data-action="restart">\u0646\u0644\u0639\u0628 \u0628\u0628\u0637\u0627\u0642\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u21BB</button></div>
    </div>`));
    }
    function z(o) {
      let p = Number(o.dataset.card);
      if (n.locked || n.completed || n.matched.has(p) || n.open.includes(p))
        return;
      let t = D[n.cards[p]];
      if (
        (n.open.push(p),
        o.classList.add("edu-revealed"),
        (o.innerHTML = `<span aria-hidden="true">${t.char}</span>`),
        o.setAttribute("aria-label", `\u062D\u0631\u0641 ${t.name}`),
        o.setAttribute("aria-pressed", "true"),
        h(t.index, "name"),
        n.open.length === 1)
      ) {
        (g("tap"),
          A(
            "\u062C\u0645\u064A\u0644! \u0627\u0628\u062D\u062B \u0627\u0644\u0622\u0646 \u0639\u0646 \u0635\u062F\u064A\u0642\u0647.",
          ));
        return;
      }
      (n.moves++, (r("[data-memory-moves]").textContent = v(n.moves)));
      let [f, b] = n.open;
      if (n.cards[f] === n.cards[b]) {
        for (let y of n.open) {
          n.matched.add(y);
          let N = r(`[data-card="${y}"]`);
          (N.classList.add("edu-matched"),
            (N.disabled = !0),
            N.setAttribute(
              "aria-label",
              `${D[n.cards[y]].name}\u060C \u0632\u0648\u062C \u0645\u0643\u062A\u0645\u0644`,
            ));
        }
        n.open = [];
        let x = n.matched.size / 2;
        if (
          ((r("[data-memory-found]").textContent = `${v(x)} / \u0666`),
          A(
            x === 6
              ? "\u0623\u062D\u0633\u0646\u062A! \u0648\u062C\u062F\u062A \u0627\u0644\u0623\u0632\u0648\u0627\u062C \u0627\u0644\u0633\u062A\u0651\u0629 \u0643\u0644\u0651\u0647\u0627."
              : "\u062A\u0637\u0627\u0628\u0642 \u062C\u0645\u064A\u0644! \u0646\u0628\u062D\u062B \u0639\u0646 \u0632\u0648\u062C \u0622\u062E\u0631\u061F",
            "edu-success",
          ),
          x === 6)
        ) {
          let y = Math.max(1, 6 - Math.floor((n.moves - 6) / 3));
          ((r(".edu-finish").hidden = !1),
            (r("[data-memory-summary]").textContent =
              `\u0648\u062C\u062F\u062A \u0666 \u0623\u0632\u0648\u0627\u062C \u0641\u064A ${v(n.moves)} \u0645\u062D\u0627\u0648\u0644\u0629\u060C \u0648\u062C\u0645\u0639\u062A ${v(y)} \u0646\u062C\u0648\u0645.`),
            q(
              y,
              `\u0645\u0637\u0627\u0628\u0642\u0629 \u0666 \u0623\u0632\u0648\u0627\u062C \u0641\u064A ${v(n.moves)} \u0645\u062D\u0627\u0648\u0644\u0629`,
            ),
            m('[data-action="restart"]'));
        } else g("correct");
      } else
        ((n.locked = !0),
          g("retry"),
          A(
            "\u0644\u064A\u0633\u0627 \u0645\u062A\u0634\u0627\u0628\u0647\u064A\u0646. \u0627\u062D\u0641\u0638 \u0645\u0643\u0627\u0646\u0647\u0645\u0627\u060C \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649.",
            "edu-gentle",
          ),
          k(() => {
            for (let x of [f, b]) {
              let y = r(`[data-card="${x}"]`);
              (y.classList.remove("edu-revealed"),
                (y.innerHTML = '<span aria-hidden="true">\u2726</span>'),
                y.setAttribute(
                  "aria-label",
                  `\u0628\u0637\u0627\u0642\u0629 \u0645\u063A\u0644\u0642\u0629 \u0631\u0642\u0645 ${v(x + 1)}`,
                ),
                y.setAttribute("aria-pressed", "false"));
            }
            ((n.open = []),
              (n.locked = !1),
              A(
                "\u0623\u064A\u0646 \u0631\u0623\u064A\u062A \u0627\u0644\u062D\u0631\u0641 \u0646\u0641\u0633\u0647\u061F \u062C\u0631\u0651\u0628 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649.",
              ));
          }, 1100));
    }
    function H() {
      ((n = {
        words: L([0, 4, 11, 12, 20, 21]),
        round: 0,
        correctFirst: 0,
        completed: !1,
      }),
        l());
    }
    function l() {
      let o = D[n.words[n.round]],
        p = Je(o.word),
        t = L(Array.from(p).map((f, b) => ({ char: f, index: b })));
      (t.map((f) => f.char).join("") === p && (t = [...t.slice(1), t[0]]),
        Object.assign(n, {
          spelling: p,
          chips: t,
          selected: [],
          firstTry: !0,
          solved: !1,
        }),
        (e.innerHTML = `<div class="edu-game edu-words">
      ${S("\u0645\u064F\u0631\u0643\u0651\u0628 \u0627\u0644\u0643\u0644\u0645\u0627\u062A", "\u0627\u0636\u063A\u0637 \u0627\u0644\u062D\u0631\u0648\u0641 \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631 \u0644\u062A\u0643\u0648\u0651\u0646 \u0627\u0633\u0645 \u0627\u0644\u0635\u0648\u0631\u0629.", `\u0627\u0644\u0643\u0644\u0645\u0629 ${v(n.round + 1)} / \u0666`)}
      <div class="edu-round-track" aria-hidden="true"><span style="width:${(n.round / 6) * 100}%"></span></div>
      <div class="edu-word-clue"><span class="edu-word-emoji" role="img" aria-label="\u0635\u0648\u0631\u0629 \u062A\u0633\u0627\u0639\u062F\u0643 \u0641\u064A \u0645\u0639\u0631\u0641\u0629 \u0627\u0644\u0643\u0644\u0645\u0629">${o.emoji}</span><button type="button" class="edu-listen" data-action="word-audio"><span aria-hidden="true">\u266B</span> \u0627\u0633\u0645\u0639 \u0627\u0644\u0643\u0644\u0645\u0629</button></div>
      <div class="edu-word-slots" dir="rtl" aria-label="\u0645\u0643\u0627\u0646 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062D\u0631\u0648\u0641">${Array.from(
        p,
      )
        .map(
          (f, b) =>
            `<span class="edu-word-slot" data-slot="${b}" aria-label="\u0645\u0648\u0636\u0639 \u0641\u0627\u0631\u063A ${v(b + 1)}"></span>`,
        )
        .join("")}</div>
      <div class="edu-letter-chips" dir="rtl" aria-label="\u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0645\u062A\u0627\u062D\u0629">${t.map((f, b) => `<button type="button" class="edu-letter-chip" data-chip="${b}" aria-label="\u062D\u0631\u0641 ${f.char}">${f.char}</button>`).join("")}</div>
      <div class="edu-word-tools"><button type="button" class="edu-quiet-button" data-action="undo" disabled>\u21B6 \u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u062D\u0631\u0641</button><button type="button" class="edu-quiet-button" data-action="clear" disabled>\u0646\u0628\u062F\u0623 \u0627\u0644\u0643\u0644\u0645\u0629 \u0645\u0646 \u062C\u062F\u064A\u062F</button></div>
      <p class="edu-status" role="status" aria-live="polite">\u0627\u0644\u0635\u0648\u0631\u0629 \u0648\u0627\u0644\u0635\u0648\u062A \u064A\u0633\u0627\u0639\u062F\u0627\u0646\u0643. \u062E\u0630 \u0648\u0642\u062A\u0643 \u2661</p>
      <button type="button" class="primary-button" data-action="check-word" disabled>\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 \u2713</button>
      <button type="button" class="primary-button" data-action="next-word" hidden>${n.round === 5 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u2190"}</button>
    </div>`));
    }
    function j() {
      (r(".edu-word-slots").classList.remove("edu-slots-wrong"),
        e.querySelectorAll("[data-slot]").forEach((o, p) => {
          let t = n.selected[p] === void 0 ? "" : n.chips[n.selected[p]].char;
          ((o.textContent = t),
            o.classList.toggle("edu-filled", !!t),
            o.setAttribute(
              "aria-label",
              t
                ? `\u062D\u0631\u0641 ${t}`
                : `\u0645\u0648\u0636\u0639 \u0641\u0627\u0631\u063A ${v(p + 1)}`,
            ));
        }),
        e.querySelectorAll("[data-chip]").forEach((o) => {
          o.disabled = n.selected.includes(Number(o.dataset.chip));
        }),
        (r('[data-action="undo"]').disabled = !n.selected.length),
        (r('[data-action="clear"]').disabled = !n.selected.length),
        (r('[data-action="check-word"]').disabled =
          n.selected.length !== n.chips.length),
        A(
          n.selected.length === n.chips.length
            ? "\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u062A\u0631\u062A\u064A\u0628! \u0627\u0636\u063A\u0637 \xAB\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u0643\u0644\u0645\u0629\xBB."
            : "\u0623\u062D\u0633\u0646\u062A! \u0623\u0643\u0645\u0644 \u0628\u0642\u064A\u0629 \u0627\u0644\u062D\u0631\u0648\u0641.",
        ));
    }
    function R() {
      if (n.solved || n.selected.length !== n.chips.length) return;
      if (n.selected.map((p) => n.chips[p].char).join("") !== n.spelling) {
        ((n.firstTry = !1),
          g("retry"),
          r(".edu-word-slots").classList.add("edu-slots-wrong"),
          A(
            "\u0627\u0644\u062D\u0631\u0648\u0641 \u0635\u062D\u064A\u062D\u0629\u060C \u0644\u0643\u0646 \u062A\u0631\u062A\u064A\u0628\u0647\u0627 \u064A\u062D\u062A\u0627\u062C \u0645\u062D\u0627\u0648\u0644\u0629 \u0623\u062E\u0631\u0649. \u0627\u0633\u062A\u062E\u062F\u0645 \xAB\u062A\u0631\u0627\u062C\u0639\xBB \u0623\u0648 \u0627\u0628\u062F\u0623 \u0645\u0646 \u062C\u062F\u064A\u062F.",
            "edu-gentle",
          ));
        return;
      }
      ((n.solved = !0),
        n.firstTry && n.correctFirst++,
        r(".edu-word-slots").classList.add("edu-slots-correct"),
        e
          .querySelectorAll(
            '[data-chip], [data-action="undo"], [data-action="clear"]',
          )
          .forEach((p) => {
            p.disabled = !0;
          }),
        (r('[data-action="check-word"]').hidden = !0),
        (r('[data-action="next-word"]').hidden = !1),
        A(
          `\u0643\u0644\u0645\u0629 \u062C\u0645\u064A\u0644\u0629! ${D[n.words[n.round]].word} \u2726`,
          "edu-success",
        ),
        h(n.words[n.round], "word"),
        n.round < 5 && g("correct"),
        m('[data-action="next-word"]'));
    }
    function $() {
      let o = Math.max(1, n.correctFirst);
      (q(
        o,
        "\u062A\u0631\u0643\u064A\u0628 \u0666 \u0643\u0644\u0645\u0627\u062A \u0639\u0631\u0628\u064A\u0629",
      ),
        (e.innerHTML = `<div class="edu-game edu-result"><span class="edu-result-illustration" aria-hidden="true">\u{1F4DA}</span><span class="edu-kicker">\u0643\u0644 \u062D\u0631\u0641 \u0641\u064A \u0645\u0643\u0627\u0646\u0647!</span><h3>\u0623\u0646\u062A \u0635\u062F\u064A\u0642 \u0627\u0644\u0643\u0644\u0645\u0627\u062A!</h3><p>\u0631\u062A\u0651\u0628\u062A \u0666 \u0643\u0644\u0645\u0627\u062A \u062C\u0645\u064A\u0644\u0629\u060C \u0648\u062C\u0645\u0639\u062A ${v(o)} \u0646\u062C\u0648\u0645.<br>\u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062C\u0639\u0644\u062A\u0643 \u0623\u0642\u0631\u0628 \u0625\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0628\u0629.</p><div class="edu-earned-stars" aria-label="${v(o)} \u0646\u062C\u0648\u0645">${"\u2605".repeat(o)}</div><button type="button" class="primary-button" data-action="restart">\u0646\u0631\u0643\u0651\u0628 \u0643\u0644\u0645\u0627\u062A \u0645\u0646 \u062C\u062F\u064A\u062F \u21BB</button></div>`),
        m('[data-action="restart"]'));
    }
    function T() {
      ((n = {
        queue: L(Array.from({ length: 10 }, (o, p) => p + 1)).slice(0, 5),
        round: 0,
        correctFirst: 0,
        completed: !1,
      }),
        E());
    }
    function E() {
      let o = n.queue[n.round],
        p = ["\u{1F34E}", "\u{1F98B}", "\u{1F353}", "\u{1F33C}", "\u{1F41F}"][
          n.round
        ],
        t = L([
          o,
          ...L(
            Array.from({ length: 10 }, (f, b) => b + 1).filter((f) => f !== o),
          ).slice(0, 3),
        ]);
      (Object.assign(n, { firstTry: !0, solved: !1, counted: [] }),
        (e.innerHTML = `<div class="edu-game edu-counting">
      ${S("\u0648\u0627\u062D\u062F\u060C \u0627\u062B\u0646\u0627\u0646\u2026 \u0647\u064A\u0627 \u0646\u0639\u062F\u0651!", "\u0639\u062F\u0651 \u0627\u0644\u0623\u0634\u064A\u0627\u0621\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0635\u062D\u064A\u062D. \u0627\u0644\u0645\u0633 \u0623\u064A\u0651 \u0634\u064A\u0621 \u0644\u062A\u0636\u0639 \u0639\u0644\u064A\u0647 \u0639\u0644\u0627\u0645\u0629 \u0648\u062A\u0633\u0647\u0651\u0644 \u0627\u0644\u0639\u062F\u0651.", `\u0627\u0644\u0633\u0624\u0627\u0644 ${v(n.round + 1)} / \u0665`)}
      <div class="edu-round-track" aria-hidden="true"><span style="width:${(n.round / 5) * 100}%"></span></div>
      <div class="edu-count-basket" aria-label="\u0623\u0634\u064A\u0627\u0621 \u0644\u0644\u0639\u062F\u0651">${Array.from({ length: o }, (f, b) => `<button type="button" class="edu-count-item" data-count-item="${b}" aria-label="\u0639\u0646\u0635\u0631 \u0644\u0644\u0639\u062F\u0651\u060C \u0627\u0636\u063A\u0637 \u0644\u0648\u0636\u0639 \u0639\u0644\u0627\u0645\u0629 \u0639\u0644\u064A\u0647" aria-pressed="false"><span aria-hidden="true">${p}</span><small aria-hidden="true"></small></button>`).join("")}</div>
      <div class="edu-count-choices" aria-label="\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0635\u062D\u064A\u062D">${t.map((f) => `<button type="button" class="edu-count-choice" data-count-answer="${f}" aria-label="\u0627\u0644\u0639\u062F\u062F ${v(f)}">${v(f)}</button>`).join("")}</div>
      <p class="edu-status" role="status" aria-live="polite">\u0643\u0645 \u0634\u064A\u0626\u064B\u0627 \u062A\u0631\u0649\u061F \u062E\u0630 \u0648\u0642\u062A\u0643 \u0641\u064A \u0627\u0644\u0639\u062F\u0651.</p>
      <button type="button" class="primary-button" data-action="next-count" hidden>${n.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u062A\u0627\u0644\u064A \u2190"}</button>
    </div>`));
    }
    function O(o) {
      let p = Number(o.dataset.countItem),
        t = n.counted.indexOf(p);
      (t === -1 ? n.counted.push(p) : n.counted.splice(t, 1),
        g("tap"),
        e.querySelectorAll("[data-count-item]").forEach((f) => {
          let b = n.counted.indexOf(Number(f.dataset.countItem));
          (f.classList.toggle("edu-counted", b !== -1),
            f.setAttribute("aria-pressed", String(b !== -1)),
            (f.querySelector("small").textContent = b === -1 ? "" : v(b + 1)));
        }));
    }
    function i(o) {
      if (n.solved || o.disabled) return;
      let p = n.queue[n.round];
      if (Number(o.dataset.countAnswer) !== p) {
        ((n.firstTry = !1),
          (o.disabled = !0),
          o.classList.add("edu-count-wrong"),
          g("retry"),
          A(
            "\u0644\u0646\u0639\u062F\u0651 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649 \u0628\u0647\u062F\u0648\u0621. \u064A\u0645\u0643\u0646\u0643 \u0644\u0645\u0633 \u0627\u0644\u0623\u0634\u064A\u0627\u0621 \u0644\u062A\u0636\u0639 \u0639\u0644\u064A\u0647\u0627 \u0639\u0644\u0627\u0645\u0627\u062A.",
            "edu-gentle",
          ));
        return;
      }
      ((n.solved = !0),
        n.firstTry && n.correctFirst++,
        o.classList.add("edu-count-correct"),
        e.querySelectorAll("[data-count-answer]").forEach((t) => {
          t.disabled = !0;
        }),
        A(
          `\u0645\u0645\u062A\u0627\u0632! \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0635\u062D\u064A\u062D \u0647\u0648 ${v(p)} \u2726`,
          "edu-success",
        ),
        n.round < 4 && g("correct"),
        (r('[data-action="next-count"]').hidden = !1),
        m('[data-action="next-count"]'));
    }
    function s() {
      let o = Math.max(1, n.correctFirst);
      (q(
        o,
        "\u0625\u0643\u0645\u0627\u0644 \u0665 \u062C\u0648\u0644\u0627\u062A \u0641\u064A \u0627\u0644\u0639\u062F\u0651",
      ),
        (e.innerHTML = `<div class="edu-game edu-result"><span class="edu-result-illustration" aria-hidden="true">\u{1F9FA}</span><span class="edu-kicker">\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0639\u062F\u0627\u062F \u0627\u0643\u062A\u0645\u0644\u062A!</span><h3>\u0623\u062D\u0633\u0646\u062A \u064A\u0627 \u0628\u0637\u0644 \u0627\u0644\u0623\u0631\u0642\u0627\u0645!</h3><p>\u0623\u0643\u0645\u0644\u062A \u0665 \u0623\u0633\u0626\u0644\u0629\u060C \u0648\u062C\u0645\u0639\u062A ${v(o)} \u0646\u062C\u0648\u0645.<br>\u0627\u0644\u0639\u062F\u0651 \u064A\u0635\u0628\u062D \u0623\u0633\u0647\u0644 \u0645\u0639 \u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629.</p><div class="edu-earned-stars" aria-label="${v(o)} \u0646\u062C\u0648\u0645">${"\u2605".repeat(o)}</div><button type="button" class="primary-button" data-action="restart">\u0646\u0639\u062F\u0651 \u0623\u0634\u064A\u0627\u0621 \u062C\u062F\u064A\u062F\u0629 \u21BB</button></div>`),
        m('[data-action="restart"]'));
    }
    function c() {
      (d.forEach(clearTimeout),
        d.clear(),
        a === "memory" ? _() : a === "words" ? H() : a === "counting" && T());
    }
    function w(o) {
      if (M) return;
      let p = o.target.closest("button");
      if (!p || !e.contains(p) || p.disabled) return;
      let t = p.dataset.action;
      if (t === "restart") {
        (g("tap"), c());
        return;
      }
      (a === "memory" && p.hasAttribute("data-card") && z(p),
        a === "words" &&
          (p.hasAttribute("data-chip") &&
            !n.solved &&
            (n.selected.push(Number(p.dataset.chip)), g("tap"), j()),
          t === "word-audio" && h(n.words[n.round], "word"),
          t === "undo" && !n.solved && (n.selected.pop(), g("tap"), j()),
          t === "clear" && !n.solved && ((n.selected = []), g("tap"), j()),
          t === "check-word" && R(),
          t === "next-word" &&
            n.solved &&
            (n.round < 5 ? (g("tap"), n.round++, l()) : $())),
        a === "counting" &&
          (p.hasAttribute("data-count-item") && O(p),
          p.hasAttribute("data-count-answer") && i(p),
          t === "next-count" &&
            n.solved &&
            (n.round < 4 ? (g("tap"), n.round++, E()) : s())));
    }
    return (
      e.addEventListener("click", w),
      ["memory", "words", "counting"].includes(a)
        ? c()
        : (e.innerHTML =
            '<p class="edu-status" role="status">\u0647\u0630\u0647 \u0627\u0644\u0644\u0639\u0628\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u0629 \u0623\u062E\u0631\u0649 \u0645\u0646 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.</p>'),
      () => {
        ((M = !0),
          d.forEach(clearTimeout),
          d.clear(),
          e.removeEventListener("click", w));
      }
    );
  }
  var Ze =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Zm4 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>',
    Ye = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  function qe(
    e,
    a,
    {
      onComplete: u = () => {},
      onSpeak: h = () => {},
      onFeedback: g = () => {},
    } = {},
  ) {
    let M = !1,
      n = new Set(),
      d = (o, p) => {
        let t = setTimeout(() => {
          (n.delete(t), M || o());
        }, p);
        return (n.add(t), t);
      },
      r = () => {
        (n.forEach(clearTimeout), n.clear());
      },
      k = (o) => {
        try {
          Promise.resolve(h(o, "name")).catch(() => {});
        } catch {}
      },
      m,
      A = (o, p, t = "") =>
        `<button type="button" class="${t || "primary-button"}" data-fun-action="${o}">${p}</button>`,
      q = () => e.querySelector(".fun-feedback"),
      S = (o, p = "") => {
        let t = q();
        t && ((t.textContent = o), (t.className = `fun-feedback ${p}`));
      },
      _ = (o) =>
        e
          .querySelector(`[data-fun-action="${o}"]`)
          ?.focus({ preventScroll: !0 }),
      z = (o, p) => {
        !m.awarded && !M && ((m.awarded = !0), u({ stars: o, summary: p }));
      };
    function H() {
      (r(),
        (m = {
          queue: L(D).slice(0, 5),
          round: 0,
          done: !1,
          awarded: !1,
          chosen: !1,
        }),
        l());
    }
    function l() {
      let o = m.queue[m.round],
        p = L([o, ...L(D.filter((t) => t.index !== o.index)).slice(0, 4)]);
      ((m.chosen = !1),
        (e.innerHTML = `<div class="fun-activity fun-balloon-game">
      <div class="fun-topline"><span>\u0627\u0644\u0645\u063A\u0627\u0645\u0631\u0629 ${v(m.round + 1)} \u0645\u0646 \u0665</span><span class="fun-score">${v(m.round)} / \u0665 <span aria-hidden="true">\u2605</span></span></div>
      <div class="fun-steps" aria-label="\u0627\u0644\u062A\u0642\u062F\u0645: ${v(m.round)} \u0645\u0646 \u0665">${Array.from({ length: 5 }, (t, f) => `<i class="${f < m.round ? "complete" : f === m.round ? "current" : ""}"></i>`).join("")}</div>
      <h2>\u0623\u064A\u0646 \u0627\u062E\u062A\u0628\u0623 \u062D\u0631\u0641 <span class="fun-target-letter">${o.char}</span>\u061F</h2>
      <p class="fun-instructions">\u0627\u0644\u0645\u0633 \u0627\u0644\u0628\u0627\u0644\u0648\u0646 \u0627\u0644\u0630\u064A \u064A\u062D\u0645\u0644 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628.</p>
      <button type="button" class="fun-hear" data-fun-action="hear">${Ze}<span>\u0627\u0633\u0645\u0639 \u062D\u0631\u0641 ${o.name}</span></button>
      <div class="fun-balloon-sky" aria-label="\u0627\u062E\u062A\u0631 \u0628\u0627\u0644\u0648\u0646 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628">${p.map((t, f) => `<button type="button" class="fun-balloon fun-balloon-${f}" data-balloon="${t.index}" aria-label="\u0628\u0627\u0644\u0648\u0646 \u062D\u0631\u0641 ${t.name}"><span class="fun-balloon-shine" aria-hidden="true"></span><span class="fun-balloon-letter">${t.char}</span><span class="fun-balloon-tail" aria-hidden="true"></span></button>`).join("")}<span class="fun-sky-cloud fun-cloud-one" aria-hidden="true"></span><span class="fun-sky-cloud fun-cloud-two" aria-hidden="true"></span></div>
      <div class="fun-feedback" aria-live="polite">\u062E\u0630 \u0631\u0627\u062D\u062A\u0643\u2026 \u0644\u0646 \u062A\u0637\u064A\u0631 \u0627\u0644\u0628\u0627\u0644\u0648\u0646\u0627\u062A \u0628\u0639\u064A\u062F\u064B\u0627 \u2661</div>
      <div class="fun-next-wrap">${A("balloon-next", m.round === 4 ? "\u0634\u0627\u0647\u062F \u0646\u062C\u0648\u0645\u0643 \u2726" : "\u062D\u0631\u0641 \u062C\u062F\u064A\u062F \u2190")}</div>
    </div>`),
        (e.querySelector('[data-fun-action="balloon-next"]').hidden = !0));
    }
    function j(o) {
      if (m.done || m.chosen || o.disabled) return;
      let p = m.queue[m.round];
      if (Number(o.dataset.balloon) !== p.index) {
        (o.classList.add("fun-balloon-wrong"),
          (o.disabled = !0),
          g("retry"),
          S(
            "\u0647\u0630\u0627 \u062D\u0631\u0641 \u0622\u062E\u0631. \u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0648\u062D\u0627\u0648\u0644 \u0645\u0631\u0651\u0629 \u062B\u0627\u0646\u064A\u0629 \u2661",
            "fun-feedback-gentle",
          ));
        return;
      }
      ((m.chosen = !0),
        o.classList.add("fun-balloon-pop"),
        g("pop"),
        e.querySelectorAll("[data-balloon]").forEach((f) => (f.disabled = !0)),
        S(
          `\u0623\u062D\u0633\u0646\u062A! \u0648\u062C\u062F\u062A \u062D\u0631\u0641 ${p.name}. \u0646\u062C\u0645\u0629 \u062C\u062F\u064A\u062F\u0629 \u0644\u0643 \u2605`,
          "fun-feedback-good",
        ));
      let t = e.querySelector('[data-fun-action="balloon-next"]');
      ((t.hidden = !1), t.focus({ preventScroll: !0 }));
    }
    function R() {
      if (!(!m.chosen || m.done)) {
        if (m.round < 4) {
          (g("tap"), m.round++, l(), _("hear"));
          return;
        }
        ((m.done = !0),
          z(
            5,
            "\u0648\u062C\u062F\u062A \u062E\u0645\u0633\u0629 \u062D\u0631\u0648\u0641 \u0641\u064A \u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u0628\u0627\u0644\u0648\u0646\u0627\u062A",
          ),
          (e.innerHTML = `<div class="fun-result"><span class="fun-result-icon" aria-hidden="true">\u{1F388}</span><span class="fun-kicker">\u0645\u063A\u0627\u0645\u0631\u0629 \u0645\u0643\u062A\u0645\u0644\u0629</span><h2>\u0623\u0646\u062A \u0635\u064A\u0651\u0627\u062F \u0627\u0644\u062D\u0631\u0648\u0641!</h2><p>\u0639\u062B\u0631\u062A \u0639\u0644\u0649 \u062E\u0645\u0633\u0629 \u062D\u0631\u0648\u0641\u060C \u0648\u062C\u0645\u0639\u062A \u062E\u0645\u0633 \u0646\u062C\u0648\u0645.</p><div class="fun-result-stars" aria-label="\u0665 \u0646\u062C\u0648\u0645">\u2605\u2605\u2605\u2605\u2605</div><div class="fun-found-letters" aria-label="\u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u062A\u064A \u0648\u062C\u062F\u062A\u0647\u0627">${m.queue.map((o) => `<span>${o.char}</span>`).join("")}</div>${A("balloon-replay", "\u0646\u0644\u0639\u0628 \u0628\u0627\u0644\u0628\u0627\u0644\u0648\u0646\u0627\u062A \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649")}</div>`),
          _("balloon-replay"));
      }
    }
    function $() {
      (r(),
        (m = {
          board: Array(9).fill(""),
          turn: "X",
          done: !1,
          awarded: !1,
          winner: null,
          line: null,
        }),
        (e.innerHTML = `<div class="fun-activity fun-xo-game">
      <div class="fun-xo-title"><span class="fun-xo-badge" aria-hidden="true">X O</span><h2>\u062B\u0644\u0627\u062B\u0629 \u0641\u064A \u0635\u0641\u0651 \u0648\u0627\u062D\u062F!</h2><p class="fun-instructions">\u0623\u0646\u062A <b class="fun-player-x">X</b> \u0648\u0635\u062F\u064A\u0642\u0643 \u0627\u0644\u0622\u0644\u064A <b class="fun-player-o">O</b>.<br>\u0643\u0648\u0651\u0646 \u0635\u0641\u0651\u064B\u0627 \u0623\u0641\u0642\u064A\u064B\u0627 \u0623\u0648 \u0631\u0623\u0633\u064A\u064B\u0627 \u0623\u0648 \u0645\u0627\u0626\u0644\u064B\u0627 \u0644\u062A\u0641\u0648\u0632.</p></div>
      <div class="fun-xo-players"><span class="fun-xo-player active" data-player="X"><b>X</b> \u0623\u0646\u062A</span><span class="fun-xo-versus">\u0645\u0639</span><span class="fun-xo-player" data-player="O"><b>O</b> \u0635\u062F\u064A\u0642\u0643 \u0627\u0644\u0622\u0644\u064A</span></div>
      <div class="fun-xo-board" aria-label="\u0644\u0648\u062D\u0629 \u0625\u0643\u0633 \u0623\u0648\u060C \u062B\u0644\u0627\u062B\u0629 \u0635\u0641\u0648\u0641 \u0648\u062B\u0644\u0627\u062B\u0629 \u0623\u0639\u0645\u062F\u0629">${m.board.map((o, p) => `<button type="button" class="fun-xo-cell" data-cell="${p}" aria-label="\u0627\u0644\u0635\u0641 ${v(Math.floor(p / 3) + 1)}\u060C \u0627\u0644\u0639\u0645\u0648\u062F ${v((p % 3) + 1)}\u060C \u0641\u0627\u0631\u063A"></button>`).join("")}</div>
      <div class="fun-feedback" aria-live="polite">\u062F\u0648\u0631\u0643! \u0627\u062E\u062A\u0631 \u0623\u064A \u0645\u0631\u0628\u0651\u0639 \u0641\u0627\u0631\u063A.</div>
      <div class="fun-xo-result" hidden></div>
      <div class="fun-xo-actions">${A("xo-replay", "\u0646\u0628\u062F\u0623 \u0645\u0646 \u062C\u062F\u064A\u062F", "secondary-button")}</div>
    </div>`));
    }
    function T(o) {
      for (let p of Ye) {
        let [t, f, b] = p;
        if (o[t] && o[t] === o[f] && o[t] === o[b])
          return { winner: o[t], line: p };
      }
      return o.every(Boolean) ? { winner: "draw", line: null } : null;
    }
    function E() {
      (e.querySelectorAll("[data-cell]").forEach((o) => {
        let p = Number(o.dataset.cell),
          t = m.board[p];
        ((o.textContent = t),
          (o.disabled = !!t || m.turn !== "X" || m.done),
          o.classList.toggle("fun-xo-x", t === "X"),
          o.classList.toggle("fun-xo-o", t === "O"),
          o.classList.toggle("fun-xo-winning", !!m.line?.includes(p)),
          o.setAttribute(
            "aria-label",
            `\u0627\u0644\u0635\u0641 ${v(Math.floor(p / 3) + 1)}\u060C \u0627\u0644\u0639\u0645\u0648\u062F ${v((p % 3) + 1)}\u060C ${t || "\u0641\u0627\u0631\u063A"}`,
          ));
      }),
        e
          .querySelectorAll("[data-player]")
          .forEach((o) =>
            o.classList.toggle(
              "active",
              !m.done && o.dataset.player === m.turn,
            ),
          ));
    }
    function O() {
      let o = T(m.board);
      if (!o) return !1;
      ((m.done = !0), (m.winner = o.winner), (m.line = o.line), E());
      let p = o.winner === "X",
        t = o.winner === "draw",
        f = p ? 5 : t ? 3 : 1;
      S(
        p
          ? "\u0631\u0627\u0626\u0639! \u0643\u0648\u0651\u0646\u062A \u062B\u0644\u0627\u062B\u0629 \u0641\u064A \u0635\u0641\u0651 \u0648\u0627\u062D\u062F."
          : t
            ? "\u062A\u0639\u0627\u062F\u0644 \u062C\u0645\u064A\u0644! \u0623\u0646\u062A\u0645\u0627 \u0635\u062F\u064A\u0642\u0627\u0646 \u0628\u0627\u0631\u0639\u0627\u0646."
            : "\u0641\u0627\u0632 \u0635\u062F\u064A\u0642\u0643 \u0647\u0630\u0647 \u0627\u0644\u0645\u0631\u0651\u0629. \u0643\u0644 \u062C\u0648\u0644\u0629 \u062A\u0639\u0644\u0651\u0645\u0643 \u062D\u064A\u0644\u0629 \u062C\u062F\u064A\u062F\u0629!",
        p || t ? "fun-feedback-good" : "fun-feedback-gentle",
      );
      let x = e.querySelector(".fun-xo-result");
      ((x.hidden = !1),
        (x.innerHTML = `<span aria-label="${v(f)} \u0646\u062C\u0648\u0645">${"\u2605".repeat(f)}</span><small>${p ? "\u0665 \u0646\u062C\u0648\u0645 \u0644\u0628\u0637\u0644 \u0627\u0644\u062C\u0648\u0644\u0629" : t ? "\u0663 \u0646\u062C\u0648\u0645 \u0644\u0644\u0639\u0628 \u0627\u0644\u062C\u0645\u064A\u0644" : "\u0646\u062C\u0645\u0629 \u0644\u0645\u062D\u0627\u0648\u0644\u062A\u0643 \u0627\u0644\u062C\u0645\u064A\u0644\u0629"}</small>`));
      let y = e.querySelector('[data-fun-action="xo-replay"]');
      return (
        (y.textContent =
          "\u062C\u0648\u0644\u0629 \u062C\u062F\u064A\u062F\u0629 \u0645\u0639 \u0635\u062F\u064A\u0642\u064A"),
        (y.className = "primary-button"),
        y.focus({ preventScroll: !0 }),
        z(
          f,
          p
            ? "\u0641\u0632\u062A \u0641\u064A \u0644\u0639\u0628\u0629 \u0625\u0643\u0633 \u0623\u0648"
            : t
              ? "\u062A\u0639\u0627\u062F\u0644\u062A \u0645\u0639 \u0635\u062F\u064A\u0642\u0643 \u0641\u064A \u0625\u0643\u0633 \u0623\u0648"
              : "\u0623\u0643\u0645\u0644\u062A \u062C\u0648\u0644\u0629 \u0625\u0643\u0633 \u0623\u0648",
        ),
        !0
      );
    }
    function i() {
      let o = m.board.map((t, f) => (t ? -1 : f)).filter((t) => t >= 0);
      for (let t of ["O", "X"])
        for (let f of o) {
          let b = [...m.board];
          if (((b[f] = t), T(b)?.winner === t)) return f;
        }
      return o.includes(4)
        ? 4
        : (L(o.filter((t) => [0, 2, 6, 8].includes(t)))[0] ?? L(o)[0]);
    }
    function s(o) {
      let p = Number(o.dataset.cell);
      m.done ||
        m.turn !== "X" ||
        m.board[p] ||
        o.disabled ||
        ((m.board[p] = "X"),
        g("tap"),
        !O() &&
          ((m.turn = "O"),
          E(),
          S(
            "\u0635\u062F\u064A\u0642\u0643 \u064A\u0641\u0643\u0651\u0631\u2026",
          ),
          d(() => {
            let t = i();
            t !== void 0 &&
              ((m.board[t] = "O"),
              !O() &&
                ((m.turn = "X"),
                E(),
                S(
                  "\u062F\u0648\u0631\u0643 \u0627\u0644\u0622\u0646! \u0641\u0643\u0651\u0631 \u0623\u064A\u0646 \u062A\u0636\u0639 X.",
                ),
                e
                  .querySelector("[data-cell]:not(:disabled)")
                  ?.focus({ preventScroll: !0 })));
          }, 380)));
    }
    function c(o) {
      if (M) return;
      let p = o.target.closest("button");
      !p ||
        !e.contains(p) ||
        p.disabled ||
        (a === "balloons" &&
          (p.dataset.balloon !== void 0 && j(p),
          p.dataset.funAction === "hear" && k(m.queue[m.round].index),
          p.dataset.funAction === "balloon-next" && R(),
          p.dataset.funAction === "balloon-replay" && (g("tap"), H())),
        a === "xo" &&
          (p.dataset.cell !== void 0 && s(p),
          p.dataset.funAction === "xo-replay" && (g("tap"), $())));
    }
    function w(o) {
      let p = o.target.closest("[data-cell]");
      if (a !== "xo" || !p || m.done || m.turn !== "X") return;
      let t = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3 };
      if (!(o.key in t) && o.key !== "Home" && o.key !== "End") return;
      o.preventDefault();
      let f = Number(p.dataset.cell);
      o.key === "Home"
        ? (f = 0)
        : o.key === "End"
          ? (f = 8)
          : (f = (f + t[o.key] + 9) % 9);
      for (let b = 0; b < 9; b++) {
        let x = e.querySelector(`[data-cell="${f}"]`);
        if (x && !x.disabled) {
          x.focus();
          break;
        }
        f = (f + (t[o.key] ?? 1) + 9) % 9;
      }
    }
    if (
      (e.addEventListener("click", c),
      e.addEventListener("keydown", w),
      a === "balloons")
    )
      H();
    else if (a === "xo") $();
    else throw new Error(`Unknown fun game: ${a}`);
    return () => {
      ((M = !0),
        r(),
        e.removeEventListener("click", c),
        e.removeEventListener("keydown", w));
    };
  }
  var Fe = new URL("/data/game-quran.json", location.origin),
    ea = 0,
    U = (e) => Number(e).toLocaleString("ar-EG"),
    W = (e) =>
      String(e).replace(
        /[&<>"']/g,
        (a) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[a],
      );
  function ue(e, a = Math.random) {
    let u = [...e];
    for (let h = u.length - 1; h > 0; h--) {
      let g = Math.floor(a() * (h + 1));
      [u[h], u[g]] = [u[g], u[h]];
    }
    return u;
  }
  function aa(e, a = Math.random) {
    return ue(e.ayahs, a)
      .slice(0, Math.min(5, e.ayahs.length))
      .map((u) => ({
        missing: u.number,
        choices: ue(
          [
            u,
            ...ue(
              e.ayahs.filter((h) => h.number !== u.number),
              a,
            ).slice(0, 3),
          ],
          a,
        ),
      }));
  }
  function ta(e, a) {
    return Math.max(1, Math.min(5, Math.ceil((e / Math.max(1, a)) * 5)));
  }
  function Le(
    e,
    a,
    {
      onComplete: u = () => {},
      onSpeak: h,
      onFeedback: g = () => {},
      onNarrationChange: M = () => {},
      isMuted: n = () => !1,
    } = {},
  ) {
    if (!["quran-order", "quran-complete"].includes(a))
      throw new Error("Unknown Quran activity");
    let d = new AbortController(),
      r = `qur-${++ea}`,
      k = a === "quran-order",
      m = !1,
      A = null,
      q = null,
      S = null,
      _ = 0,
      z = "",
      H = !1,
      l = null,
      j = (b) => {
        !m && !S && g(b);
      };
    e.classList.add("qur-mount");
    function R() {
      O();
      let b = ue(q.ayahs);
      (b.every((x, y) => x.number === y + 1) && ([b[0], b[1]] = [b[1], b[0]]),
        (l = {
          bank: b,
          chosen: [],
          mistakes: 0,
          checked: !1,
          finished: !1,
          reported: !1,
          rounds: aa(q),
          round: 0,
          firstCorrect: 0,
          wrong: [],
          answered: !1,
          feedback: "",
          feedbackKind: "",
          stars: 0,
        }));
    }
    function $(b, x) {
      m ||
        l.reported ||
        (O(), (l.reported = !0), (l.stars = b), u({ stars: b, summary: x }));
    }
    function T() {
      return `<div class="qur-audio-row"><button class="secondary-button qur-listen" data-qur-action="listen" aria-pressed="${!!S}"><span data-qur-audio-icon aria-hidden="true">${S ? "\u25A0" : "\u25B6"}</span><span data-qur-audio-label>${S ? "\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0644\u0627\u0648\u0629" : "\u0627\u0633\u062A\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u0633\u0648\u0631\u0629"}</span></button><span class="qur-reciter">\u062A\u0644\u0627\u0648\u0629 \u0645\u0634\u0627\u0631\u064A \u0627\u0644\u0639\u0641\u0627\u0633\u064A</span></div><p class="qur-audio-status" role="status" data-qur-audio-status>${W(z)}</p>`;
    }
    function E() {
      if (m) return;
      let b = e.querySelector('[data-qur-action="listen"]');
      b &&
        (b.setAttribute("aria-pressed", String(!!S)),
        b.classList.toggle("qur-playing", H),
        (b.querySelector("[data-qur-audio-label]").textContent = S
          ? "\u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u0644\u0627\u0648\u0629"
          : "\u0627\u0633\u062A\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u0633\u0648\u0631\u0629"),
        (b.querySelector("[data-qur-audio-icon]").textContent = S
          ? "\u25A0"
          : "\u25B6"));
      let x = e.querySelector("[data-qur-audio-status]");
      x && (x.textContent = z);
    }
    function O() {
      (_++,
        S &&
          ((S.onplaying = null),
          (S.onended = null),
          (S.onerror = null),
          S.pause(),
          S.removeAttribute("src"),
          S.load(),
          (S = null)),
        (H = !1),
        (z = ""),
        M(!1),
        E());
    }
    async function i() {
      if (S) {
        O();
        return;
      }
      if (n()) {
        ((z =
          "\u0627\u0644\u0635\u0648\u062A \u0645\u0643\u062A\u0648\u0645. \u0641\u0639\u0651\u0644 \u0627\u0644\u0635\u0648\u062A \u0645\u0646 \u0632\u0631 \u0627\u0644\u0635\u0648\u062A \u0623\u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629 \u0644\u0644\u0627\u0633\u062A\u0645\u0627\u0639 \u0625\u0644\u0649 \u0627\u0644\u062A\u0644\u0627\u0648\u0629."),
          E());
        return;
      }
      let b = ++_,
        x = new GameAudio(
          new URL(`./${q.audio}`, "https://offline.hurufi/").href,
        );
      ((S = x),
        (z =
          "\u062C\u0627\u0631\u064D \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062A\u0644\u0627\u0648\u0629\u2026"),
        E());
      let y = () => {
        m ||
          b !== _ ||
          (O(),
          (z =
            "\u062A\u0639\u0630\u0651\u0631 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u062A\u0644\u0627\u0648\u0629. \u0627\u0636\u063A\u0637 \xAB\u0627\u0633\u062A\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u0633\u0648\u0631\u0629\xBB \u0644\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649."),
          E());
      };
      ((x.onplaying = () => {
        m ||
          b !== _ ||
          ((H = !0),
          (z = `\u062A\u0633\u062A\u0645\u0639 \u0627\u0644\u0622\u0646 \u0625\u0644\u0649 \u0633\u0648\u0631\u0629 ${q.name}.`),
          E());
      }),
        (x.onended = () => {
          m ||
            b !== _ ||
            (O(),
            (z =
              "\u0627\u0646\u062A\u0647\u062A \u0627\u0644\u062A\u0644\u0627\u0648\u0629."),
            E());
        }),
        (x.onerror = y),
        M(!0));
      try {
        await x.play();
      } catch {
        y();
      }
    }
    function s(b, x = null) {
      return `<span class="qur-verse-text">${W(b)}</span>${x === null ? "" : `<span class="qur-ayah-number" aria-label="\u0627\u0644\u0622\u064A\u0629 ${U(x)}">${U(x)}</span>`}`;
    }
    function c() {
      return `<p class="qur-feedback ${l.feedbackKind ? `qur-feedback-${l.feedbackKind}` : ""}" role="status" tabindex="-1" data-qur-feedback>${W(l.feedback)}</p>`;
    }
    function w() {
      let b = l.chosen
          .map((y, N) => {
            let I = q.ayahs.find((Ve) => Ve.number === y);
            return `<li><button class="qur-verse-card qur-selected-card${l.checked ? (y === N + 1 ? " qur-card-correct" : " qur-card-wrong") : ""}" data-qur-action="remove" data-qur-number="${y}" ${l.finished ? "disabled" : ""} aria-label="\u0627\u0644\u0645\u0648\u0636\u0639 ${U(N + 1)}: ${W(I.text)}${l.finished ? "" : "\u060C \u0627\u0636\u063A\u0637 \u0644\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0622\u064A\u0629 \u0625\u0644\u0649 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A"}"><span class="qur-slot-number" aria-hidden="true">${U(N + 1)}</span>${s(I.text)}</button></li>`;
          })
          .join(""),
        x = Array.from(
          { length: q.ayahs.length - l.chosen.length },
          (y, N) =>
            `<li class="qur-empty-slot"><span class="qur-slot-number">${U(l.chosen.length + N + 1)}</span><span>\u0627\u062E\u062A\u0631 \u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0623\u062A\u064A \u0647\u0646\u0627</span></li>`,
        ).join("");
      return `<div class="qur-order-layout"><section class="qur-arrangement" aria-labelledby="${r}-arrangement"><div class="qur-section-heading"><h3 id="${r}-arrangement">\u062A\u0631\u062A\u064A\u0628\u0643 \u0644\u0644\u0622\u064A\u0627\u062A</h3><span>${U(l.chosen.length)} / ${U(q.ayahCount)}</span></div><ol class="qur-ordered-list">${b}${x}</ol></section>${
        l.finished
          ? ""
          : `<section class="qur-verse-bank" aria-labelledby="${r}-bank"><h3 id="${r}-bank">\u0627\u0636\u063A\u0637 \u0627\u0644\u0622\u064A\u0627\u062A \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628</h3><div class="qur-bank-cards">${l.bank
              .filter((y) => !l.chosen.includes(y.number))
              .map(
                (y) =>
                  `<button class="qur-verse-card" data-qur-action="add" data-qur-number="${y.number}">${s(y.text)}</button>`,
              )
              .join(
                "",
              )}</div>${l.chosen.length === q.ayahCount ? '<p class="qur-bank-empty">\u0648\u0636\u0639\u062A \u0643\u0644 \u0627\u0644\u0622\u064A\u0627\u062A. \u0627\u0636\u063A\u0637 \xAB\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u062A\u0631\u062A\u064A\u0628\xBB.</p>' : ""}</section>`
      }</div>${c()}${l.finished ? p() : `<div class="qur-actions"><button class="primary-button" data-qur-action="check" ${l.chosen.length !== q.ayahCount ? "disabled" : ""}>\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u062A\u0631\u062A\u064A\u0628</button><button class="secondary-button" data-qur-action="undo" ${l.chosen.length ? "" : "disabled"}>\u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0622\u062E\u0631 \u0622\u064A\u0629</button><button class="qur-text-button" data-qur-action="clear" ${l.chosen.length ? "" : "disabled"}>\u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0645\u0646 \u062C\u062F\u064A\u062F</button></div>`}`;
    }
    function o() {
      if (l.finished) return p();
      let b = l.rounds[l.round],
        x = q.ayahs
          .map((y) =>
            y.number === b.missing
              ? `<li class="qur-missing-verse" aria-label="\u0627\u0644\u0622\u064A\u0629 ${U(y.number)} \u0646\u0627\u0642\u0635\u0629"><span class="qur-missing-dots" aria-hidden="true">\u2022\u2022\u2022</span><span>\u0645\u0627 \u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u0646\u0627\u0642\u0635\u0629\u061F</span><span class="qur-ayah-number">${U(y.number)}</span></li>`
              : `<li class="qur-reading-verse">${s(y.text, y.number)}</li>`,
          )
          .join("");
      return `<div class="qur-round-heading"><span>\u0627\u0644\u0633\u0624\u0627\u0644 ${U(l.round + 1)} \u0645\u0646 ${U(l.rounds.length)}</span><span>\u062A\u0623\u0645\u0651\u0644 \u062B\u0645 \u0627\u062E\u062A\u0631</span></div><div class="qur-round-track" role="progressbar" aria-label="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" aria-valuemin="0" aria-valuemax="${l.rounds.length}" aria-valuenow="${l.round}"><span style="width:${(l.round / l.rounds.length) * 100}%"></span></div><ol class="qur-reading-list" aria-label="\u0633\u0648\u0631\u0629 ${W(q.name)} \u0645\u0639 \u0622\u064A\u0629 \u0646\u0627\u0642\u0635\u0629">${x}</ol><h3 class="qur-choices-title">\u0627\u062E\u062A\u0631 \u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629</h3><div class="qur-choices">${b.choices.map((y) => `<button class="qur-verse-card${l.wrong.includes(y.number) ? " qur-card-wrong" : ""}${l.answered && y.number === b.missing ? " qur-card-correct" : ""}" data-qur-action="answer" data-qur-number="${y.number}" ${l.answered || l.wrong.includes(y.number) ? "disabled" : ""}>${s(y.text)}</button>`).join("")}</div>${c()}${l.answered ? `<div class="qur-actions"><button class="primary-button" data-qur-action="next">${l.round + 1 === l.rounds.length ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643" : "\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u062A\u0627\u0644\u064A"}</button></div>` : ""}`;
    }
    function p() {
      return `<section class="qur-result" aria-labelledby="${r}-result"><span class="qur-result-mark" aria-hidden="true">\u2726</span><h3 id="${r}-result">\u0623\u062D\u0633\u0646\u062A! \u0623\u062A\u0645\u0645\u062A \u0627\u0644\u0646\u0634\u0627\u0637</h3><p>${k ? `\u0631\u062A\u0651\u0628\u062A \u0622\u064A\u0627\u062A \u0633\u0648\u0631\u0629 ${W(q.name)} \u0643\u0627\u0645\u0644\u0629.` : `\u062A\u062F\u0631\u0651\u0628\u062A \u0639\u0644\u0649 ${U(l.rounds.length)} \u0622\u064A\u0627\u062A \u0645\u0646 \u0633\u0648\u0631\u0629 ${W(q.name)}.`}</p><div class="qur-result-stars" aria-label="\u062D\u0635\u0644\u062A \u0639\u0644\u0649 ${U(l.stars)} \u0645\u0646 \u0665 \u0646\u062C\u0648\u0645"><span aria-hidden="true">${"\u2605".repeat(l.stars)}${"\u2606".repeat(5 - l.stars)}</span></div><button class="primary-button" data-qur-action="restart">\u0646\u062A\u062F\u0631\u0651\u0628 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649</button></section>`;
    }
    function t(b = null) {
      m ||
        !A ||
        ((e.innerHTML = `<section class="qur-game" dir="rtl" aria-label="${k ? "\u062A\u0631\u062A\u064A\u0628 \u0622\u064A\u0627\u062A \u0627\u0644\u0633\u0648\u0631\u0629" : "\u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u0646\u0627\u0642\u0635\u0629"}"><p class="qur-instruction">${k ? "\u0627\u062E\u062A\u0631 \u0627\u0644\u0622\u064A\u0627\u062A \u0645\u0646 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A\u060C \u0648\u0636\u0639\u0647\u0627 \u0628\u062A\u0631\u062A\u064A\u0628\u0647\u0627 \u0641\u064A \u0627\u0644\u0633\u0648\u0631\u0629." : "\u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u0633\u0648\u0631\u0629\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u0646\u0627\u0642\u0635\u0629 \u0645\u0646 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A."}</p><div class="qur-toolbar"><label class="qur-surah-label" for="${r}-surah">\u0627\u062E\u062A\u0631 \u0627\u0644\u0633\u0648\u0631\u0629<select id="${r}-surah" data-qur-select>${A.surahs.map((x) => `<option value="${x.number}" ${x.number === q.number ? "selected" : ""}>\u0633\u0648\u0631\u0629 ${W(x.name)} \xB7 ${U(x.ayahCount)} \u0622\u064A\u0627\u062A</option>`).join("")}</select></label>${T()}</div><div class="qur-basmala" aria-label="\u0627\u0644\u0628\u0633\u0645\u0644\u0629">${W(A.basmala)}</div><p class="qur-numbering-note">\u0627\u0644\u0628\u0633\u0645\u0644\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u0639\u0646 \u062A\u0631\u0642\u064A\u0645 \u0622\u064A\u0627\u062A \u0647\u0630\u0647 \u0627\u0644\u0633\u0648\u0631.</p>${k ? w() : o()}<details class="qur-sources"><summary>\u0645\u0635\u0627\u062F\u0631 \u0627\u0644\u0646\u0635 \u0648\u0627\u0644\u062A\u0644\u0627\u0648\u0629</summary><p>\u0627\u0644\u0646\u0635 \u0628\u0627\u0644\u0631\u0633\u0645 \u0627\u0644\u0639\u062B\u0645\u0627\u0646\u064A \u0645\u0646 <a href="${W(q.sourceUrl)}" target="_blank" rel="noopener noreferrer">AlQuran Cloud</a>\u060C \u0648\u0627\u0644\u062A\u0644\u0627\u0648\u0629 \u0628\u0635\u0648\u062A \u0645\u0634\u0627\u0631\u064A \u0627\u0644\u0639\u0641\u0627\u0633\u064A \u0628\u0631\u0648\u0627\u064A\u0629 \u062D\u0641\u0635 \u0639\u0646 \u0639\u0627\u0635\u0645 \u0645\u0646 <a href="https://mp3quran.net/ar/afs" target="_blank" rel="noopener noreferrer">MP3Quran</a>.</p></details></section>`),
        E(),
        b && e.querySelector(b)?.focus({ preventScroll: !0 }));
    }
    async function f() {
      e.innerHTML =
        '<p class="qur-loading" role="status">\u0646\u062C\u0647\u0651\u0632 \u0623\u0646\u0634\u0637\u0629 \u0627\u0644\u0642\u0631\u0622\u0646 \u0627\u0644\u0643\u0631\u064A\u0645\u2026</p>';
      try {
        let b = await fetch(Fe, { signal: d.signal });
        if (!b.ok) throw new Error("Quran data unavailable");
        let x = await b.json();
        if (m) return;
        if (
          x.surahs?.length !== 3 ||
          x.surahs.some(
            (y) =>
              ![112, 113, 114].includes(y.number) ||
              y.ayahs.length !== y.ayahCount,
          )
        )
          throw new Error("Invalid Quran data");
        ((A = x), (q = A.surahs[0]), R(), t());
      } catch (b) {
        if (m || b.name === "AbortError") return;
        e.innerHTML =
          '<div class="qur-load-error" role="alert"><p>\u062A\u0639\u0630\u0651\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0633\u0648\u0631. \u062D\u0627\u0648\u0644 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649.</p><button class="secondary-button" data-qur-action="retry">\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629</button></div>';
      }
    }
    return (
      e.addEventListener(
        "change",
        (b) => {
          if (!b.target.matches("[data-qur-select]") || !A) return;
          let x = A.surahs.find((y) => y.number === Number(b.target.value));
          x && ((q = x), R(), j("tap"), t("[data-qur-select]"));
        },
        { signal: d.signal },
      ),
      e.addEventListener(
        "click",
        (b) => {
          let x = b.target.closest?.("[data-qur-action]");
          if (!x || !e.contains(x) || x.disabled || m) return;
          let y = x.dataset.qurAction;
          if (y === "retry") {
            (j("tap"), f());
            return;
          }
          if (!l) return;
          if (y === "listen") {
            i();
            return;
          }
          if (y === "restart") {
            (R(), j("tap"), t("[data-qur-select]"));
            return;
          }
          let N = Number(x.dataset.qurNumber);
          if (k && !l.finished)
            if (
              y === "add" &&
              !l.chosen.includes(N) &&
              q.ayahs.some((I) => I.number === N)
            )
              (l.chosen.push(N),
                (l.checked = !1),
                (l.feedback = ""),
                (l.feedbackKind = ""),
                j("tap"),
                t(
                  l.chosen.length === q.ayahCount
                    ? '[data-qur-action="check"]'
                    : '[data-qur-action="add"]',
                ));
            else if (y === "remove")
              ((l.chosen = l.chosen.filter((I) => I !== N)),
                (l.checked = !1),
                (l.feedback = ""),
                (l.feedbackKind = ""),
                j("tap"),
                t(`[data-qur-action="add"][data-qur-number="${N}"]`));
            else if (y === "undo") {
              let I = l.chosen.pop();
              ((l.checked = !1),
                (l.feedback = ""),
                (l.feedbackKind = ""),
                j("tap"),
                t(`[data-qur-action="add"][data-qur-number="${I}"]`));
            } else
              y === "clear"
                ? ((l.chosen = []),
                  (l.checked = !1),
                  (l.feedback = ""),
                  (l.feedbackKind = ""),
                  j("tap"),
                  t('[data-qur-action="add"]'))
                : y === "check" &&
                  l.chosen.length === q.ayahCount &&
                  ((l.checked = !0),
                  l.chosen.every((I, J) => I === J + 1)
                    ? ((l.finished = !0),
                      (l.feedback =
                        "\u062A\u0631\u062A\u064A\u0628 \u0635\u062D\u064A\u062D\u060C \u0623\u062D\u0633\u0646\u062A!"),
                      (l.feedbackKind = "success"),
                      $(
                        Math.max(1, 5 - l.mistakes),
                        `\u0631\u062A\u0651\u0628 \u0622\u064A\u0627\u062A \u0633\u0648\u0631\u0629 ${q.name} \u0643\u0627\u0645\u0644\u0629.`,
                      ),
                      t('[data-qur-action="restart"]'))
                    : (l.mistakes++,
                      (l.feedback =
                        "\u0628\u0639\u0636 \u0627\u0644\u0622\u064A\u0627\u062A \u062A\u062D\u062A\u0627\u062C \u0625\u0644\u0649 \u062A\u063A\u064A\u064A\u0631 \u0645\u0648\u0636\u0639\u0647\u0627. \u0627\u0636\u063A\u0637 \u0627\u0644\u0622\u064A\u0629 \u0644\u0625\u0639\u0627\u062F\u062A\u0647\u0627 \u0625\u0644\u0649 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A\u060C \u0623\u0648 \u0627\u0633\u062A\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u0633\u0648\u0631\u0629 \u062B\u0645 \u062D\u0627\u0648\u0644."),
                      (l.feedbackKind = "retry"),
                      j("retry"),
                      t("[data-qur-feedback]")));
          else if (!k && !l.finished) {
            let I = l.rounds[l.round];
            y === "answer" &&
            !l.answered &&
            !l.wrong.includes(N) &&
            I.choices.some((J) => J.number === N)
              ? N === I.missing
                ? ((l.answered = !0),
                  l.wrong.length || l.firstCorrect++,
                  (l.feedback =
                    "\u0623\u062D\u0633\u0646\u062A! \u0647\u0630\u0647 \u0647\u064A \u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629."),
                  (l.feedbackKind = "success"),
                  l.round + 1 < l.rounds.length && j("correct"),
                  t('[data-qur-action="next"]'))
                : (l.wrong.push(N),
                  (l.feedback =
                    "\u062D\u0627\u0648\u0644 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649. \u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u0622\u064A\u0627\u062A \u0623\u0648 \u0627\u0633\u062A\u0645\u0639 \u0625\u0644\u0649 \u0627\u0644\u0633\u0648\u0631\u0629."),
                  (l.feedbackKind = "retry"),
                  j("retry"),
                  t('[data-qur-action="answer"]:not(:disabled)'))
              : y === "next" &&
                l.answered &&
                (l.round + 1 === l.rounds.length
                  ? ((l.finished = !0),
                    $(
                      ta(l.firstCorrect, l.rounds.length),
                      `\u0623\u0643\u0645\u0644 ${U(l.rounds.length)} \u0622\u064A\u0627\u062A \u0641\u064A \u0633\u0648\u0631\u0629 ${q.name}.`,
                    ),
                    t('[data-qur-action="restart"]'))
                  : (l.round++,
                    (l.wrong = []),
                    (l.answered = !1),
                    (l.feedback = ""),
                    (l.feedbackKind = ""),
                    j("tap"),
                    t('[data-qur-action="answer"]')));
          }
        },
        { signal: d.signal },
      ),
      e.ownerDocument.addEventListener(
        "visibilitychange",
        () => {
          e.ownerDocument.hidden && O();
        },
        { signal: d.signal },
      ),
      e.ownerDocument.addEventListener(
        "hurufi-mute",
        () => {
          n() && O();
        },
        { signal: d.signal },
      ),
      f(),
      () => {
        m ||
          ((m = !0),
          d.abort(),
          O(),
          e.classList.remove("qur-mount"),
          e.replaceChildren());
      }
    );
  }
  var Ae = [
      {
        id: "red",
        name: "\u0627\u0644\u0623\u062D\u0645\u0631",
        hex: "#e96663",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0627\u0644\u0641\u0631\u0627\u0648\u0644\u0629",
      },
      {
        id: "blue",
        name: "\u0627\u0644\u0623\u0632\u0631\u0642",
        hex: "#4e91dc",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0627\u0644\u0633\u0645\u0627\u0621 \u0627\u0644\u0635\u0627\u0641\u064A\u0629",
      },
      {
        id: "yellow",
        name: "\u0627\u0644\u0623\u0635\u0641\u0631",
        hex: "#f3ca4c",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0627\u0644\u0644\u064A\u0645\u0648\u0646",
      },
      {
        id: "green",
        name: "\u0627\u0644\u0623\u062E\u0636\u0631",
        hex: "#63aa77",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0623\u0648\u0631\u0627\u0642 \u0627\u0644\u0634\u062C\u0631",
      },
      {
        id: "orange",
        name: "\u0627\u0644\u0628\u0631\u062A\u0642\u0627\u0644\u064A",
        hex: "#ee9954",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0627\u0644\u0628\u0631\u062A\u0642\u0627\u0644",
      },
      {
        id: "purple",
        name: "\u0627\u0644\u0628\u0646\u0641\u0633\u062C\u064A",
        hex: "#9a72ce",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0632\u0647\u0648\u0631 \u0627\u0644\u0628\u0646\u0641\u0633\u062C",
      },
      {
        id: "pink",
        name: "\u0627\u0644\u0648\u0631\u062F\u064A",
        hex: "#e58ab3",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u0628\u0639\u0636 \u0627\u0644\u0648\u0631\u0648\u062F",
      },
      {
        id: "brown",
        name: "\u0627\u0644\u0628\u0646\u064A",
        hex: "#a67c5a",
        object:
          "\u0645\u062B\u0644 \u0644\u0648\u0646 \u062C\u0630\u0639 \u0627\u0644\u0634\u062C\u0631\u0629",
      },
    ],
    Se = [
      {
        id: "circle",
        name: "\u062F\u0627\u0626\u0631\u0629",
        description:
          "\u0634\u0643\u0644 \u0645\u0633\u062A\u062F\u064A\u0631 \u0628\u0644\u0627 \u0623\u0636\u0644\u0627\u0639 \u0623\u0648 \u0632\u0648\u0627\u064A\u0627",
        explanation:
          "\u0627\u0644\u062F\u0627\u0626\u0631\u0629 \u0645\u0633\u062A\u062F\u064A\u0631\u0629\u060C \u0648\u0644\u064A\u0633 \u0644\u0647\u0627 \u0623\u0636\u0644\u0627\u0639 \u0623\u0648 \u0632\u0648\u0627\u064A\u0627.",
        svg: '<circle cx="70" cy="70" r="49"/>',
      },
      {
        id: "triangle",
        name: "\u0645\u062B\u0644\u062B",
        description:
          "\u0634\u0643\u0644 \u0644\u0647 \u062B\u0644\u0627\u062B\u0629 \u0623\u0636\u0644\u0627\u0639 \u0648\u062B\u0644\u0627\u062B \u0632\u0648\u0627\u064A\u0627",
        explanation:
          "\u0644\u0644\u0645\u062B\u0644\u062B \u062B\u0644\u0627\u062B\u0629 \u0623\u0636\u0644\u0627\u0639 \u0648\u062B\u0644\u0627\u062B \u0632\u0648\u0627\u064A\u0627.",
        svg: '<path d="M70 19 124 115H16Z"/>',
      },
      {
        id: "square",
        name: "\u0645\u0631\u0628\u0639",
        description:
          "\u0634\u0643\u0644 \u0644\u0647 \u0623\u0631\u0628\u0639\u0629 \u0623\u0636\u0644\u0627\u0639 \u0645\u062A\u0633\u0627\u0648\u064A\u0629 \u0648\u0623\u0631\u0628\u0639 \u0632\u0648\u0627\u064A\u0627 \u0642\u0627\u0626\u0645\u0629",
        explanation:
          "\u0644\u0644\u0645\u0631\u0628\u0639 \u0623\u0631\u0628\u0639\u0629 \u0623\u0636\u0644\u0627\u0639 \u0645\u062A\u0633\u0627\u0648\u064A\u0629 \u0648\u0623\u0631\u0628\u0639 \u0632\u0648\u0627\u064A\u0627 \u0642\u0627\u0626\u0645\u0629.",
        svg: '<rect x="24" y="24" width="92" height="92" rx="2"/>',
      },
      {
        id: "rectangle",
        name: "\u0645\u0633\u062A\u0637\u064A\u0644",
        description:
          "\u0634\u0643\u0644 \u0644\u0647 \u0636\u0644\u0639\u0627\u0646 \u0637\u0648\u064A\u0644\u0627\u0646 \u0648\u0636\u0644\u0639\u0627\u0646 \u0642\u0635\u064A\u0631\u0627\u0646 \u0648\u0623\u0631\u0628\u0639 \u0632\u0648\u0627\u064A\u0627 \u0642\u0627\u0626\u0645\u0629",
        explanation:
          "\u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0633\u062A\u0637\u064A\u0644 \u0636\u0644\u0639\u0627\u0646 \u0637\u0648\u064A\u0644\u0627\u0646 \u0648\u0636\u0644\u0639\u0627\u0646 \u0642\u0635\u064A\u0631\u0627\u0646\u060C \u0648\u0623\u0631\u0628\u0639 \u0632\u0648\u0627\u064A\u0627 \u0642\u0627\u0626\u0645\u0629.",
        svg: '<rect x="10" y="37" width="120" height="66" rx="2"/>',
      },
      {
        id: "star",
        name: "\u0646\u062C\u0645\u0629",
        description:
          "\u0634\u0643\u0644 \u0644\u0647 \u062E\u0645\u0633\u0629 \u0631\u0624\u0648\u0633 \u0628\u0627\u0631\u0632\u0629",
        explanation:
          "\u0647\u0630\u0647 \u0646\u062C\u0645\u0629 \u0630\u0627\u062A \u062E\u0645\u0633\u0629 \u0631\u0624\u0648\u0633 \u0628\u0627\u0631\u0632\u0629.",
        svg: '<path d="m70 12 17 35 39 6-28 27 7 39-35-18-35 18 7-39-28-27 39-6Z"/>',
      },
    ],
    sa = [
      [
        {
          id: "apple",
          symbol: "\u{1F34E}",
          name: "\u062A\u0641\u0627\u062D\u0629",
        },
        {
          id: "lemon",
          symbol: "\u{1F34B}",
          name: "\u0644\u064A\u0645\u0648\u0646\u0629",
        },
        { id: "grapes", symbol: "\u{1F347}", name: "\u0639\u0646\u0628" },
        {
          id: "strawberry",
          symbol: "\u{1F353}",
          name: "\u0641\u0631\u0627\u0648\u0644\u0629",
        },
      ],
      [
        { id: "cat", symbol: "\u{1F431}", name: "\u0642\u0637\u0651\u0629" },
        {
          id: "chick",
          symbol: "\u{1F425}",
          name: "\u0643\u062A\u0643\u0648\u062A",
        },
        { id: "rabbit", symbol: "\u{1F430}", name: "\u0623\u0631\u0646\u0628" },
        { id: "bear", symbol: "\u{1F43B}", name: "\u062F\u0628\u0651" },
      ],
      [
        { id: "sun", symbol: "\u2600\uFE0F", name: "\u0634\u0645\u0633" },
        {
          id: "cloud",
          symbol: "\u2601\uFE0F",
          name: "\u0633\u062D\u0627\u0628\u0629",
        },
        { id: "flower", symbol: "\u{1F33C}", name: "\u0632\u0647\u0631\u0629" },
        { id: "moon", symbol: "\u{1F319}", name: "\u0642\u0645\u0631" },
      ],
      [
        {
          id: "car",
          symbol: "\u{1F697}",
          name: "\u0633\u064A\u0651\u0627\u0631\u0629",
        },
        {
          id: "bus",
          symbol: "\u{1F68C}",
          name: "\u062D\u0627\u0641\u0644\u0629",
        },
        {
          id: "bike",
          symbol: "\u{1F6B2}",
          name: "\u062F\u0631\u0651\u0627\u062C\u0629",
        },
        { id: "train", symbol: "\u{1F682}", name: "\u0642\u0637\u0627\u0631" },
      ],
      [
        {
          id: "butterfly",
          symbol: "\u{1F98B}",
          name: "\u0641\u0631\u0627\u0634\u0629",
        },
        { id: "bee", symbol: "\u{1F41D}", name: "\u0646\u062D\u0644\u0629" },
        {
          id: "ladybird",
          symbol: "\u{1F41E}",
          name: "\u062F\u0639\u0633\u0648\u0642\u0629",
        },
        {
          id: "snail",
          symbol: "\u{1F40C}",
          name: "\u062D\u0644\u0632\u0648\u0646",
        },
      ],
    ],
    pe = {
      colors:
        "\u0631\u062D\u0644\u0629 \u0627\u0644\u0623\u0644\u0648\u0627\u0646",
      shapes:
        "\u0623\u0635\u062F\u0642\u0627\u0621 \u0627\u0644\u0623\u0634\u0643\u0627\u0644",
      addition: "\u0633\u0644\u0651\u0629 \u0627\u0644\u062C\u0645\u0639",
      patterns:
        "\u0645\u0627\u0630\u0627 \u064A\u0623\u062A\u064A \u0628\u0639\u062F\u061F",
    },
    na = {
      colors:
        "\u062A\u0645\u064A\u064A\u0632 \u062E\u0645\u0633\u0629 \u0623\u0644\u0648\u0627\u0646",
      shapes:
        "\u0627\u0644\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u062E\u0645\u0633\u0629 \u0623\u0634\u0643\u0627\u0644",
      addition:
        "\u0625\u0643\u0645\u0627\u0644 \u062E\u0645\u0633 \u0645\u0633\u0627\u0626\u0644 \u062C\u0645\u0639",
      patterns:
        "\u0625\u0643\u0645\u0627\u0644 \u062E\u0645\u0633\u0629 \u0623\u0646\u0645\u0627\u0637 \u0645\u062A\u0643\u0631\u0651\u0631\u0629",
    };
  function je(
    e,
    a,
    {
      onComplete: u = () => {},
      onFeedback: h = () => {},
      onSpeak: g = () => {},
      isMuted: M = () => !1,
    } = {},
  ) {
    let n = !1,
      d = null,
      r = ($) => e.querySelector($),
      k = ($) => r($)?.focus({ preventScroll: !0 }),
      m = ($, T = "") => {
        let E = r(".dis-status");
        E && ((E.textContent = $), (E.className = `dis-status ${T}`));
      },
      A = ($, T) =>
        a === "colors"
          ? `<button type="button" class="dis-choice dis-color-choice" data-dis-choice="${T}" aria-label="\u0627\u0644\u0644\u0648\u0646 ${$.name}"><span class="dis-color-swatch" style="--swatch:${$.hex}" aria-hidden="true"></span><span>${$.name}</span><i class="dis-choice-mark" aria-hidden="true"></i></button>`
          : a === "shapes"
            ? `<button type="button" class="dis-choice dis-shape-choice" data-dis-choice="${T}"><span>${$.name}</span><i class="dis-choice-mark" aria-hidden="true"></i></button>`
            : a === "addition"
              ? `<button type="button" class="dis-choice dis-number-choice" data-dis-choice="${T}" aria-label="\u0627\u0644\u0639\u062F\u062F ${v($.value)}"><span>${v($.value)}</span><i class="dis-choice-mark" aria-hidden="true"></i></button>`
              : `<button type="button" class="dis-choice dis-pattern-choice" data-dis-choice="${T}" aria-label="${$.name}"><span class="dis-option-symbol" aria-hidden="true">${$.symbol}</span><span>${$.name}</span><i class="dis-choice-mark" aria-hidden="true"></i></button>`;
    function q() {
      if (a === "colors")
        return L(Ae)
          .slice(0, 5)
          .map((E) => ({
            target: E,
            options: L([E, ...L(Ae.filter((O) => O.id !== E.id)).slice(0, 3)]),
          }));
      if (a === "shapes")
        return L(Se).map((E) => ({
          target: E,
          options: L([E, ...L(Se.filter((O) => O.id !== E.id)).slice(0, 3)]),
        }));
      if (a === "addition") {
        let E = L(
            Array.from({ length: 25 }, (i, s) => ({
              a: Math.floor(s / 5) + 1,
              b: (s % 5) + 1,
            })),
          ),
          O = new Set();
        return E.filter((i) => {
          let s = i.a + i.b;
          return O.has(s) ? !1 : (O.add(s), !0);
        })
          .slice(0, 5)
          .map((i) => {
            let s = i.a + i.b;
            return {
              ...i,
              target: { value: s },
              options: L([
                { value: s },
                ...L(
                  Array.from({ length: 10 }, (c, w) => w + 1).filter(
                    (c) => c !== s,
                  ),
                )
                  .slice(0, 3)
                  .map((c) => ({ value: c })),
              ]),
            };
          });
      }
      let $ = L([
          { rule: [0, 1], visible: 7 },
          { rule: [0, 0, 1], visible: 7 },
          { rule: [0, 1, 2], visible: 8 },
          { rule: [0, 1, 1], visible: 8 },
          { rule: [0, 1], visible: 6 },
        ]),
        T = L(sa);
      return $.map(({ rule: E, visible: O }, i) => {
        let s = L(T[i]);
        return {
          rule: E,
          sequence: Array.from({ length: O }, (c, w) => s[E[w % E.length]]),
          target: s[E[O % E.length]],
          options: L(s),
          explanation: E.map((c) => s[c].name).join("\u060C "),
        };
      });
    }
    function S($) {
      return a === "colors"
        ? `<div class="dis-color-question"><span class="dis-question-icon" aria-hidden="true">\u{1F3A8}</span><h3>\u0623\u064A\u0646 \u0627\u0644\u0644\u0648\u0646 <strong class="dis-target-name">${$.target.name}</strong>\u061F</h3><p>\u0627\u0646\u0638\u0631 \u0625\u0644\u0649 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0645\u0637\u0644\u0648\u0628.</p></div>`
        : a === "shapes"
          ? `<div class="dis-shape-question"><div class="dis-shape-art"><svg viewBox="0 0 140 140" role="img" aria-label="${$.target.description}">${$.target.svg}</svg></div><h3>\u0645\u0627 \u0627\u0633\u0645 \u0647\u0630\u0627 \u0627\u0644\u0634\u0643\u0644\u061F</h3><p>\u062A\u0623\u0645\u0651\u0644 \u062D\u062F\u0648\u062F\u0647 \u0648\u0632\u0648\u0627\u064A\u0627\u0647\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0633\u0645\u0647.</p></div>`
          : a === "addition"
            ? `<div class="dis-addition-question"><h3>\u0643\u0645 \u062A\u0641\u0651\u0627\u062D\u0629 \u0641\u064A \u0627\u0644\u0633\u0644\u0651\u062A\u064A\u0646 \u0645\u0639\u064B\u0627\u061F</h3><p>\u0639\u062F\u0651 \u0627\u0644\u062A\u0641\u0651\u0627\u062D\u0627\u062A\u060C \u0623\u0648 \u0627\u062C\u0645\u0639 \u0627\u0644\u0639\u062F\u062F\u064A\u0646.</p><div class="dis-fruit-equation" dir="ltr"><div class="dis-fruit-group" role="group" aria-label="\u0627\u0644\u0633\u0644\u0651\u0629 \u0627\u0644\u0623\u0648\u0644\u0649">${Array.from({ length: $.a }, () => '<span role="img" aria-label="\u062A\u0641\u0651\u0627\u062D\u0629">\u{1F34E}</span>').join("")}<b class="dis-add-number">${v($.a)}</b></div><span class="dis-plus" aria-label="\u0632\u0627\u0626\u062F">+</span><div class="dis-fruit-group" role="group" aria-label="\u0627\u0644\u0633\u0644\u0651\u0629 \u0627\u0644\u062B\u0627\u0646\u064A\u0629">${Array.from({ length: $.b }, () => '<span role="img" aria-label="\u062A\u0641\u0651\u0627\u062D\u0629">\u{1F34E}</span>').join("")}<b class="dis-add-number">${v($.b)}</b></div></div><div class="dis-equation" dir="ltr" aria-label="${v($.a)} \u0632\u0627\u0626\u062F ${v($.b)} \u064A\u0633\u0627\u0648\u064A \u0643\u0645\u061F"><span>${v($.a)}</span><span>+</span><span>${v($.b)}</span><span>=</span><span>\u061F</span></div></div>`
            : `<div class="dis-pattern-question"><h3>\u0623\u064A\u0651 \u0635\u0648\u0631\u0629 \u062A\u0643\u0645\u0644 \u0627\u0644\u0646\u0645\u0637\u061F</h3><p>\u0627\u062A\u0628\u0639 \u0627\u0644\u0635\u0648\u0631 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631\u060C \u0648\u0627\u0643\u062A\u0634\u0641 \u0645\u0627 \u064A\u062A\u0643\u0631\u0651\u0631.</p><ol class="dis-sequence" dir="rtl" aria-label="\u062A\u0633\u0644\u0633\u0644 \u0627\u0644\u0635\u0648\u0631 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631">${$.sequence.map((T) => `<li class="dis-sequence-item" aria-label="${T.name}"><span aria-hidden="true">${T.symbol}</span></li>`).join("")}<li class="dis-sequence-missing" aria-label="\u0627\u0644\u0635\u0648\u0631\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u0646\u0627\u0642\u0635\u0629">\u061F</li></ol></div>`;
    }
    function _() {
      let $ = d.rounds[d.round];
      ((d.solved = !1),
        (d.firstTry = !0),
        (d.wrong = new Set()),
        (e.innerHTML = `<section class="dis-game dis-${a}" dir="rtl" aria-label="${pe[a]}"><div class="dis-topline"><span class="dis-game-name">${pe[a]}</span><span class="dis-round-label">\u0627\u0644\u0633\u0624\u0627\u0644 ${v(d.round + 1)} \u0645\u0646 \u0665</span></div><div class="dis-progress" role="progressbar" aria-label="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${d.round}"><span style="width:${(d.round / 5) * 100}%"></span></div>${S($)}<div class="dis-choices" aria-label="\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629">${$.options.map(A).join("")}</div><p class="dis-status" role="status" aria-live="polite">\u0644\u0627 \u062F\u0627\u0639\u064A \u0644\u0644\u0627\u0633\u062A\u0639\u062C\u0627\u0644. \u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0639\u0644\u0651\u0645\u0646\u0627 \u0634\u064A\u0626\u064B\u0627 \u2661</p><button type="button" class="primary-button dis-next" data-dis-action="next" hidden>${d.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u062A\u0627\u0644\u064A \u2190"}</button></section>`));
    }
    function z($) {
      return a === "colors"
        ? `\u2713 \u0623\u062D\u0633\u0646\u062A! \u0647\u0630\u0627 \u0647\u0648 \u0627\u0644\u0644\u0648\u0646 ${$.target.name}\u060C ${$.target.object}.`
        : a === "shapes"
          ? `\u2713 \u0635\u062D\u064A\u062D! ${$.target.explanation}`
          : a === "addition"
            ? `\u2713 \u0645\u0645\u062A\u0627\u0632! ${v($.a)} + ${v($.b)} = ${v($.target.value)}. \u0627\u062C\u062A\u0645\u0639\u062A \u0627\u0644\u062A\u0641\u0651\u0627\u062D\u0627\u062A \u0645\u0639\u064B\u0627!`
            : `\u2713 \u0627\u0643\u062A\u0634\u0641\u062A \u0627\u0644\u0646\u0645\u0637! \u062A\u062A\u0643\u0631\u0651\u0631 \u0647\u0630\u0647 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629: ${$.explanation}.`;
    }
    function H($) {
      if (n || d.finished || d.solved || $.disabled) return;
      let T = d.rounds[d.round],
        E = Number($.dataset.disChoice),
        O = T.options[E];
      if (!O || d.wrong.has(E)) return;
      if (
        !(a === "addition" ? O.value === T.target.value : O.id === T.target.id)
      ) {
        ((d.firstTry = !1),
          d.wrong.add(E),
          ($.disabled = !0),
          $.classList.add("dis-wrong"),
          ($.querySelector(".dis-choice-mark").textContent = "\u21B6"),
          m(
            a === "patterns"
              ? "\u0644\u0646\u0646\u0638\u0631 \u0625\u0644\u0649 \u0627\u0644\u062C\u0632\u0621 \u0627\u0644\u0645\u062A\u0643\u0631\u0651\u0631 \u0645\u0646 \u062C\u062F\u064A\u062F. \u062C\u0631\u0651\u0628 \u0635\u0648\u0631\u0629 \u0623\u062E\u0631\u0649."
              : a === "addition"
                ? "\u0644\u0646\u0639\u062F\u0651 \u0627\u0644\u062A\u0641\u0651\u0627\u062D\u0627\u062A \u0641\u064A \u0627\u0644\u0633\u0644\u0651\u062A\u064A\u0646 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649. \u062C\u0631\u0651\u0628 \u0639\u062F\u062F\u064B\u0627 \u0622\u062E\u0631."
                : "\u0647\u0630\u0647 \u0645\u062D\u0627\u0648\u0644\u0629 \u062C\u064A\u0651\u062F\u0629. \u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u0633\u0624\u0627\u0644 \u0648\u062C\u0631\u0651\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u064B\u0627 \u0622\u062E\u0631.",
            "dis-status-retry",
          ),
          h("retry"));
        return;
      }
      ((d.solved = !0),
        d.firstTry && d.firstCorrect++,
        $.classList.add("dis-correct"),
        ($.querySelector(".dis-choice-mark").textContent = "\u2713"),
        e.querySelectorAll("[data-dis-choice]").forEach((s) => {
          s.disabled = !0;
        }),
        m(z(T), "dis-status-correct"),
        (r('[data-dis-action="next"]').hidden = !1),
        d.round < 4 && h("correct"),
        k('[data-dis-action="next"]'));
    }
    function l() {
      if (n || d.finished) return;
      d.finished = !0;
      let $ = Math.max(1, d.firstCorrect),
        T = {
          colors: "\u{1F3A8}",
          shapes: "\u{1F537}",
          addition: "\u{1F9FA}",
          patterns: "\u{1F9E9}",
        };
      ((e.innerHTML = `<section class="dis-game dis-result" dir="rtl"><span class="dis-result-art" aria-hidden="true">${T[a]}</span><span class="dis-result-kicker">\u062E\u0645\u0633\u0629 \u0627\u0643\u062A\u0634\u0627\u0641\u0627\u062A \u062C\u0645\u064A\u0644\u0629!</span><h3>\u0623\u062D\u0633\u0646\u062A \u064A\u0627 \u0628\u0637\u0644!</h3><p>\u0623\u0643\u0645\u0644\u062A \u0645\u063A\u0627\u0645\u0631\u0629 \xAB${pe[a]}\xBB\u060C \u0648\u062C\u0645\u0639\u062A ${v($)} \u0646\u062C\u0648\u0645.<br>\u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062C\u0639\u0644\u062A\u0643 \u0623\u0643\u062B\u0631 \u062E\u0628\u0631\u0629.</p><div class="dis-result-stars" aria-label="${v($)} \u0645\u0646 \u062E\u0645\u0633 \u0646\u062C\u0648\u0645"><span aria-hidden="true">${"\u2605".repeat($)}${"\u2606".repeat(5 - $)}</span></div><button type="button" class="primary-button" data-dis-action="restart">\u0645\u063A\u0627\u0645\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u21BB</button></section>`),
        u({ stars: $, summary: na[a] }),
        k('[data-dis-action="restart"]'));
    }
    function j() {
      ((d = {
        rounds: q(),
        round: 0,
        firstCorrect: 0,
        finished: !1,
        solved: !1,
        wrong: new Set(),
      }),
        _());
    }
    function R($) {
      if (n) return;
      let T = $.target.closest?.("button");
      !T ||
        !e.contains(T) ||
        T.disabled ||
        (T.hasAttribute("data-dis-choice")
          ? H(T)
          : T.dataset.disAction === "next" && d.solved && !d.finished
            ? d.round < 4
              ? (d.round++, _(), k("[data-dis-choice]"))
              : l()
            : T.dataset.disAction === "restart" && j());
    }
    return (
      e.addEventListener("click", R),
      Object.hasOwn(pe, a)
        ? j()
        : (e.innerHTML =
            '<p class="dis-status" role="status">\u0647\u0630\u0647 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u0629 \u0623\u062E\u0631\u0649 \u0645\u0646 \u0627\u0644\u0645\u0643\u062A\u0628\u0629.</p>'),
      () => {
        n || ((n = !0), e.removeEventListener("click", R));
      }
    );
  }
  var B = (e) => Number(e).toLocaleString("ar-EG"),
    Ee = (e, a = Math.random) => {
      let u = [...e];
      for (let h = u.length - 1; h > 0; h--) {
        let g = Math.floor(a() * (h + 1));
        [u[h], u[g]] = [u[g], u[h]];
      }
      return u;
    },
    F = Object.freeze(
      [
        [
          "#######",
          "#S....#",
          "#.###.#",
          "#...#.#",
          "###.#.#",
          "#...#G#",
          "#######",
        ],
        [
          "#######",
          "#S#...#",
          "#.#.#.#",
          "#...#.#",
          "###.#.#",
          "#...#G#",
          "#######",
        ],
        [
          "#########",
          "#S..#...#",
          "###.#.#.#",
          "#...#.#.#",
          "#.###.#.#",
          "#.....#.#",
          "#.#####.#",
          "#.....#G#",
          "#########",
        ],
      ].map((e) => Object.freeze(e)),
    ),
    ra = [
      [
        "\u{1F333}",
        "\u0634\u062C\u0631\u0629",
        "\u{1F334}",
        "\u0646\u062E\u0644\u0629",
      ],
      [
        "\u{1F337}",
        "\u0632\u0647\u0631\u0629 \u062A\u0648\u0644\u064A\u0628",
        "\u{1F33B}",
        "\u062F\u0648\u0651\u0627\u0631 \u0627\u0644\u0634\u0645\u0633",
      ],
      [
        "\u{1F98B}",
        "\u0641\u0631\u0627\u0634\u0629",
        "\u{1F41D}",
        "\u0646\u062D\u0644\u0629",
      ],
      [
        "\u{1F407}",
        "\u0623\u0631\u0646\u0628",
        "\u{1F408}",
        "\u0642\u0637\u0651\u0629",
      ],
      [
        "\u{1F34E}",
        "\u062A\u0641\u0651\u0627\u062D\u0629",
        "\u{1F350}",
        "\u0643\u0645\u0651\u062B\u0631\u0649",
      ],
      [
        "\u2600\uFE0F",
        "\u0634\u0645\u0633",
        "\u2601\uFE0F",
        "\u0633\u062D\u0627\u0628\u0629",
      ],
      [
        "\u{1F426}",
        "\u0639\u0635\u0641\u0648\u0631",
        "\u{1F989}",
        "\u0628\u0648\u0645\u0629",
      ],
      [
        "\u{1F344}",
        "\u0641\u0637\u0631",
        "\u{1F335}",
        "\u0635\u0628\u0651\u0627\u0631",
      ],
      [
        "\u{1F343}",
        "\u0623\u0648\u0631\u0627\u0642 \u0634\u062C\u0631",
        "\u2618\uFE0F",
        "\u0646\u0628\u062A\u0629 \u0628\u0631\u0633\u064A\u0645",
      ],
      [
        "\u{1F41E}",
        "\u062F\u0639\u0633\u0648\u0642\u0629",
        "\u{1F40C}",
        "\u062D\u0644\u0632\u0648\u0646",
      ],
      [
        "\u{1F339}",
        "\u0648\u0631\u062F\u0629",
        "\u{1F33C}",
        "\u0632\u0647\u0631\u0629 \u0635\u0641\u0631\u0627\u0621",
      ],
      [
        "\u{1F34B}",
        "\u0644\u064A\u0645\u0648\u0646\u0629",
        "\u{1F34A}",
        "\u0628\u0631\u062A\u0642\u0627\u0644\u0629",
      ],
      [
        "\u{1F986}",
        "\u0628\u0637\u0651\u0629",
        "\u{1F425}",
        "\u0643\u062A\u0643\u0648\u062A",
      ],
      [
        "\u{1F994}",
        "\u0642\u0646\u0641\u0630",
        "\u{1F422}",
        "\u0633\u0644\u062D\u0641\u0627\u0629",
      ],
      [
        "\u{1F353}",
        "\u0641\u0631\u0627\u0648\u0644\u0629",
        "\u{1F352}",
        "\u0643\u0631\u0632",
      ],
      [
        "\u{1F308}",
        "\u0642\u0648\u0633 \u0642\u0632\u062D",
        "\u2B50",
        "\u0646\u062C\u0645\u0629",
      ],
      [
        "\u{1F33F}",
        "\u063A\u0635\u0646 \u0623\u062E\u0636\u0631",
        "\u{1F33E}",
        "\u0633\u0646\u0627\u0628\u0644 \u0642\u0645\u062D",
      ],
      [
        "\u{1F331}",
        "\u0646\u0628\u062A\u0629 \u0635\u063A\u064A\u0631\u0629",
        "\u{1FAB4}",
        "\u0646\u0628\u062A\u0629 \u0641\u064A \u0623\u0635\u064A\u0635",
      ],
    ];
  function ia(e = Math.random) {
    let a = Ee(ra, e).slice(0, 16),
      u = Ee(
        Array.from({ length: 16 }, (h, g) => g),
        e,
      ).slice(0, 5);
    return {
      left: a.map(([h, g]) => ({ emoji: h, name: g })),
      right: a.map(([h, g, M, n], d) =>
        u.includes(d) ? { emoji: M, name: n } : { emoji: h, name: g },
      ),
      changed: u,
    };
  }
  function Ce(
    e,
    a,
    {
      onComplete: u = () => {},
      onFeedback: h = () => {},
      onSpeak: g,
      isMuted: M,
    } = {},
  ) {
    if (!["maze", "differences"].includes(a))
      throw new Error(`Unknown adventure: ${a}`);
    let n = !1,
      d,
      r = null,
      k = (t) => e.querySelector(t),
      m = (t) => {
        n || h(t);
      },
      A = (t) => k(t)?.focus({ preventScroll: !0 }),
      q = (t, f = "") => {
        let b = k("[data-adv-status]");
        b &&
          ((b.textContent = t),
          (b.className = `adv-status ${f ? `adv-status-${f}` : ""}`));
      },
      S = (t, f) => {
        n || d.awarded || ((d.awarded = !0), u({ stars: t, summary: f }));
      },
      _ = (t) => {
        let f, b;
        return (
          t.forEach((x, y) =>
            [...x].forEach((N, I) => {
              (N === "S" && (f = [y, I]), N === "G" && (b = [y, I]));
            }),
          ),
          { start: f, goal: b }
        );
      },
      z = (t, f) =>
        `\u0627\u0644\u0635\u0641 ${B(t + 1)}\u060C \u0627\u0644\u0639\u0645\u0648\u062F ${B(f + 1)}`;
    function H() {
      ((d = {
        level: 0,
        moves: 0,
        position: _(F[0]).start,
        finishedLevel: !1,
        done: !1,
        awarded: !1,
      }),
        R());
    }
    function l(t, f) {
      let b = F[d.level],
        x = b[t][f] === "#",
        y = d.position[0] === t && d.position[1] === f,
        N = b[t][f] === "G",
        I = b[t][f] === "S",
        J = y
          ? N
            ? "\u0627\u0644\u0623\u0631\u0646\u0628 \u0648\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u062C\u0632\u0631\u0629"
            : "\u0627\u0644\u0623\u0631\u0646\u0628 \u0647\u0646\u0627"
          : x
            ? "\u0633\u064A\u0627\u062C\u060C \u0637\u0631\u064A\u0642 \u0645\u063A\u0644\u0642"
            : N
              ? "\u0627\u0644\u062C\u0632\u0631\u0629\u060C \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u0637\u0631\u064A\u0642"
              : I
                ? "\u0628\u062F\u0627\u064A\u0629 \u0627\u0644\u0637\u0631\u064A\u0642"
                : "\u0645\u0645\u0631\u0651 \u0645\u0641\u062A\u0648\u062D";
      return `<span class="adv-maze-cell ${x ? "adv-maze-wall" : "adv-maze-path"}${y ? " adv-maze-player" : ""}${N ? " adv-maze-goal" : ""}" role="gridcell" aria-label="${z(t, f)}: ${J}" data-maze-cell="${t},${f}"><span aria-hidden="true">${y ? "\u{1F407}" : N ? "\u{1F955}" : I ? "\xB7" : ""}</span></span>`;
    }
    function j() {
      let t = F[d.level];
      return `<div class="adv-maze-board" role="grid" tabindex="0" data-maze-board aria-label="\u0645\u062A\u0627\u0647\u0629 \u0627\u0644\u0623\u0631\u0646\u0628\u060C ${B(t.length)} \u0635\u0641\u0648\u0641 \u0648${B(t[0].length)} \u0623\u0639\u0645\u062F\u0629" aria-describedby="adv-maze-help" style="--maze-size:${t.length}">${t.map((f, b) => `<div role="row" class="adv-maze-row">${[...f].map((x, y) => l(b, y)).join("")}</div>`).join("")}</div>`;
    }
    function R() {
      e.innerHTML = `<section class="adv-game adv-maze-game" aria-label="\u0645\u063A\u0627\u0645\u0631\u0629 \u0645\u062A\u0627\u0647\u0629 \u0627\u0644\u0623\u0631\u0646\u0628">
      <div class="adv-top"><span class="adv-kicker">\u0623\u0631\u0646\u0628 \u0635\u063A\u064A\u0631\u060C \u0648\u0645\u063A\u0627\u0645\u0631\u0629 \u0643\u0628\u064A\u0631\u0629</span><span class="adv-counter">\u0627\u0644\u0645\u062A\u0627\u0647\u0629 ${B(d.level + 1)} \u0645\u0646 \u0663</span></div>
      <h2>\u0644\u0646\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u062C\u0632\u0631\u0629!</h2><p class="adv-instructions" id="adv-maze-help">\u062D\u0631\u0651\u0643 \u0627\u0644\u0623\u0631\u0646\u0628 \u0628\u0623\u0632\u0631\u0627\u0631 \u0627\u0644\u0623\u0633\u0647\u0645 \u0623\u0648 \u0628\u0623\u0633\u0647\u0645 \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0628\u0639\u062F \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u062A\u0627\u0647\u0629.<br>\u0627\u062A\u0628\u0639 \u0627\u0644\u0645\u0645\u0631\u0651\u0627\u062A\u060C \u0641\u0627\u0644\u0623\u0631\u0646\u0628 \u0644\u0627 \u064A\u0633\u062A\u0637\u064A\u0639 \u0639\u0628\u0648\u0631 \u0627\u0644\u0633\u064A\u0627\u062C.</p>
      <div class="adv-maze-layout"><div class="adv-maze-frame">${j()}</div>
      <div class="adv-maze-controls"><span class="adv-control-caption">\u0625\u0644\u0649 \u0623\u064A\u0646 \u0646\u062A\u062D\u0631\u0651\u0643\u061F</span><div class="adv-direction-pad" role="group" aria-label="\u062A\u062D\u0631\u064A\u0643 \u0627\u0644\u0623\u0631\u0646\u0628"><button type="button" class="adv-direction adv-direction-up" data-move="up" aria-label="\u062D\u0631\u0651\u0643 \u0627\u0644\u0623\u0631\u0646\u0628 \u0625\u0644\u0649 \u0623\u0639\u0644\u0649">\u2191</button><button type="button" class="adv-direction adv-direction-left" data-move="left" aria-label="\u062D\u0631\u0651\u0643 \u0627\u0644\u0623\u0631\u0646\u0628 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631">\u2190</button><span class="adv-direction-center" aria-hidden="true">\u{1F43E}</span><button type="button" class="adv-direction adv-direction-right" data-move="right" aria-label="\u062D\u0631\u0651\u0643 \u0627\u0644\u0623\u0631\u0646\u0628 \u0625\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646">\u2192</button><button type="button" class="adv-direction adv-direction-down" data-move="down" aria-label="\u062D\u0631\u0651\u0643 \u0627\u0644\u0623\u0631\u0646\u0628 \u0625\u0644\u0649 \u0623\u0633\u0641\u0644">\u2193</button></div><span class="adv-move-count">\u062E\u0637\u0648\u0627\u062A\u0643: <b data-maze-moves>${B(d.moves)}</b></span><span class="adv-no-rush">\u0644\u0627 \u0633\u0628\u0627\u0642 \u0647\u0646\u0627\u2026 \u0641\u0643\u0651\u0631 \u0639\u0644\u0649 \u0645\u0647\u0644\u0643 \u2661</span></div></div>
      <p class="adv-status" role="status" aria-live="polite" data-adv-status>\u0627\u0644\u0623\u0631\u0646\u0628 \u0639\u0646\u062F \u0627\u0644\u0628\u062F\u0627\u064A\u0629. \u0633\u0627\u0639\u062F\u0647 \u0641\u064A \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u0637\u0631\u064A\u0642 \u0625\u0644\u0649 \u0627\u0644\u062C\u0632\u0631\u0629!</p>
      <div class="adv-maze-next" hidden data-maze-next><button type="button" class="primary-button" data-adv-action="maze-next">\u0645\u062A\u0627\u0647\u0629 \u062C\u062F\u064A\u062F\u0629 \u2190</button></div>
      <div class="adv-finish" hidden data-adv-finish><span class="adv-finish-symbol" aria-hidden="true">\u{1F407} \u{1F955}</span><h3>\u0623\u0646\u062A \u062F\u0644\u064A\u0644 \u0627\u0644\u0623\u0631\u0646\u0628 \u0627\u0644\u0634\u062C\u0627\u0639!</h3><p data-maze-summary></p><span class="adv-earned-stars" aria-label="\u0665 \u0646\u062C\u0648\u0645">\u2605\u2605\u2605\u2605\u2605</span><button type="button" class="primary-button" data-adv-action="maze-replay">\u0646\u0643\u062A\u0634\u0641 \u0627\u0644\u0637\u0631\u064A\u0642 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649</button></div>
    </section>`;
    }
    function $() {
      let t = F[d.level],
        f = k("[data-maze-board]");
      ((f.innerHTML = t
        .map(
          (b, x) =>
            `<div role="row" class="adv-maze-row">${[...b].map((y, N) => l(x, N)).join("")}</div>`,
        )
        .join("")),
        (k("[data-maze-moves]").textContent = B(d.moves)));
    }
    function T(t) {
      if (n || d.done || d.finishedLevel) return;
      let f = { up: [-1, 0], down: [1, 0], left: [0, -1], right: [0, 1] };
      if (!f[t]) return;
      let b = F[d.level],
        [x, y] = f[t],
        [N, I] = [d.position[0] + x, d.position[1] + y];
      if (!b[N] || b[N][I] === void 0 || b[N][I] === "#") {
        (m("retry"),
          q(
            "\u0647\u0630\u0627 \u0633\u064A\u0627\u062C \u0635\u063A\u064A\u0631. \u062C\u0631\u0651\u0628 \u0645\u0645\u0631\u0651\u064B\u0627 \u0622\u062E\u0631\u060C \u0648\u0633\u062A\u062C\u062F \u0627\u0644\u0637\u0631\u064A\u0642!",
            "gentle",
          ));
        return;
      }
      if (((d.position = [N, I]), d.moves++, $(), b[N][I] !== "G")) {
        (m("tap"),
          q(
            `\u062E\u0637\u0648\u0629 \u062C\u0645\u064A\u0644\u0629! \u0627\u0644\u0623\u0631\u0646\u0628 \u0627\u0644\u0622\u0646 \u0641\u064A ${z(N, I)}.`,
          ));
        return;
      }
      ((d.finishedLevel = !0),
        e.querySelectorAll("[data-move]").forEach((J) => (J.disabled = !0)),
        d.level < F.length - 1
          ? (m("correct"),
            q(
              "\u0648\u0635\u0644 \u0627\u0644\u0623\u0631\u0646\u0628 \u0625\u0644\u0649 \u0627\u0644\u062C\u0632\u0631\u0629! \u0647\u0644 \u0646\u0643\u062A\u0634\u0641 \u0637\u0631\u064A\u0642\u064B\u0627 \u062C\u062F\u064A\u062F\u064B\u0627\u061F",
              "good",
            ),
            (k("[data-maze-next]").hidden = !1),
            A('[data-adv-action="maze-next"]'))
          : ((d.done = !0),
            q(
              "\u0623\u062D\u0633\u0646\u062A! \u0633\u0627\u0639\u062F\u062A \u0627\u0644\u0623\u0631\u0646\u0628 \u0641\u064A \u0627\u062C\u062A\u064A\u0627\u0632 \u0627\u0644\u0645\u062A\u0627\u0647\u0627\u062A \u0627\u0644\u062B\u0644\u0627\u062B.",
              "good",
            ),
            (k("[data-maze-summary]").textContent =
              `\u0627\u0643\u062A\u0634\u0641\u062A \u0663 \u0637\u0631\u0642\u060C \u0648\u0645\u0634\u064A\u062A ${B(d.moves)} \u062E\u0637\u0648\u0629. \u062E\u0645\u0633 \u0646\u062C\u0648\u0645 \u0644\u0630\u0643\u0627\u0626\u0643 \u0648\u0635\u0628\u0631\u0643!`),
            (k("[data-adv-finish]").hidden = !1),
            S(
              5,
              `\u0623\u0643\u0645\u0644\u062A \u062B\u0644\u0627\u062B \u0645\u062A\u0627\u0647\u0627\u062A \u0641\u064A ${B(d.moves)} \u062E\u0637\u0648\u0629`,
            ),
            A('[data-adv-action="maze-replay"]')));
    }
    function E() {
      !d.finishedLevel ||
        d.done ||
        (m("tap"),
        d.level++,
        (d.position = _(F[d.level]).start),
        (d.finishedLevel = !1),
        R(),
        A("[data-maze-board]"));
    }
    function O() {
      let t = ia();
      (r &&
        JSON.stringify(t.left) === JSON.stringify(r.left) &&
        (t.left.push(t.left.shift()),
        t.right.push(t.right.shift()),
        (t.changed = t.changed.map((f) => (f + 15) % 16))),
        (r = t),
        (d = {
          scene: t,
          found: new Set(),
          hinted: new Set(),
          hintsUsed: 0,
          awarded: !1,
          done: !1,
        }),
        s());
    }
    function i(t, f, b) {
      let x = `${z(Math.floor(f / 4), f % 4)}: ${t.name}`;
      return b
        ? `<button type="button" class="adv-garden-cell" data-difference="${f}" aria-label="${x}"><span aria-hidden="true">${t.emoji}</span><i class="adv-found-check" aria-hidden="true">\u2713</i></button>`
        : `<span class="adv-garden-cell" data-original="${f}" role="img" aria-label="${x}"><span aria-hidden="true">${t.emoji}</span><i class="adv-found-check" aria-hidden="true">\u2713</i></span>`;
    }
    function s() {
      e.innerHTML = `<section class="adv-game adv-differences-game" aria-label="\u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629">
      <div class="adv-top"><span class="adv-kicker">\u0639\u064A\u0646\u0627\u0646 \u0641\u0636\u0648\u0644\u064A\u0651\u062A\u0627\u0646 \u062A\u0643\u062A\u0634\u0641\u0627\u0646 \u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644</span><span class="adv-counter">\u0648\u062C\u062F\u062A <b data-difference-count>\u0660</b> \u0645\u0646 \u0665</span></div>
      <h2>\u0647\u0644 \u062A\u063A\u064A\u0651\u0631 \u0634\u064A\u0621 \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629\u061F</h2><p class="adv-instructions">\u0642\u0627\u0631\u0646 \u0627\u0644\u062D\u062F\u064A\u0642\u062A\u064A\u0646\u060C \u0648\u0627\u0636\u063A\u0637 \u0639\u0644\u0649 \u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A \u0627\u0644\u062E\u0645\u0633\u0629 \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u064A\u0645\u0646\u0649.<br>\u062A\u062E\u062A\u0644\u0641 \u0628\u0639\u0636 \u0627\u0644\u0623\u0634\u064A\u0627\u0621\u2026 \u0631\u0627\u0642\u0628 \u0643\u0644\u0651 \u0635\u0641\u0651 \u0628\u0647\u062F\u0648\u0621.</p>
      <div class="adv-scenes"><section class="adv-scene adv-scene-original" aria-label="\u0627\u0644\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629 \u0639\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631" dir="rtl"><h3><span aria-hidden="true">\u{1F33F}</span> \u0627\u0644\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u0623\u0635\u0644\u064A\u0629</h3><span class="adv-scene-note">\u0642\u0627\u0631\u0646 \u0628\u0647\u0630\u0647 \u0627\u0644\u062D\u062F\u064A\u0642\u0629</span><div class="adv-garden-grid" data-adv-scene="left" dir="ltr">${d.scene.left.map((t, f) => i(t, f, !1)).join("")}</div></section><section class="adv-scene adv-scene-search" aria-label="\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u0628\u062D\u062B \u0639\u0644\u0649 \u0627\u0644\u064A\u0645\u064A\u0646" dir="rtl"><h3><span aria-hidden="true">\u{1F50E}</span> \u0627\u0628\u062D\u062B \u0647\u0646\u0627</h3><span class="adv-scene-note">\u0627\u0644\u0645\u0633 \u0627\u0644\u0623\u0634\u064A\u0627\u0621 \u0627\u0644\u0645\u062E\u062A\u0644\u0641\u0629</span><div class="adv-garden-grid" data-adv-scene="right" dir="ltr">${d.scene.right.map((t, f) => i(t, f, !0)).join("")}</div></section></div>
      <div class="adv-difference-tools"><span class="adv-found-progress" aria-label="\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0635\u0641\u0631 \u0645\u0646 \u062E\u0645\u0633\u0629 \u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A" data-difference-progress>\u2606 \u2606 \u2606 \u2606 \u2606</span><button type="button" class="secondary-button adv-hint-button" data-adv-action="hint"><span aria-hidden="true">\u2726</span> \u062A\u0644\u0645\u064A\u062D <span data-hints-left>\u0662</span></button></div>
      <p class="adv-status" role="status" aria-live="polite" data-adv-status>\u0627\u0628\u062F\u0623 \u0628\u0623\u064A\u0651 \u0635\u0641\u0651\u060C \u0648\u0627\u0628\u062D\u062B \u0639\u0646 \u0634\u064A\u0621 \u0645\u062E\u062A\u0644\u0641 \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u064A\u0645\u0646\u0649.</p>
      <div class="adv-finish" hidden data-adv-finish><span class="adv-finish-symbol" aria-hidden="true">\u{1F33B} \u{1F98B}</span><h3>\u0645\u0627 \u0623\u062F\u0642\u0651 \u0645\u0644\u0627\u062D\u0638\u062A\u0643!</h3><p data-difference-summary></p><span class="adv-earned-stars" data-difference-stars></span><button type="button" class="primary-button" data-adv-action="differences-replay">\u062D\u062F\u064A\u0642\u0629 \u062C\u062F\u064A\u062F\u0629\u060C \u0648\u0627\u0643\u062A\u0634\u0627\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629</button></div>
    </section>`;
    }
    function c(t) {
      let f = Number(t.dataset.difference);
      if (n || d.done || d.found.has(f) || t.disabled) return;
      if (!d.scene.changed.includes(f)) {
        (m("retry"),
          q(
            "\u0647\u0630\u0627\u0646 \u0627\u0644\u0634\u064A\u0626\u0627\u0646 \u0645\u062A\u0634\u0627\u0628\u0647\u0627\u0646. \u0642\u0627\u0631\u0646 \u0634\u064A\u0626\u064B\u0627 \u0622\u062E\u0631 \u0641\u064A \u0627\u0644\u0635\u0641\u0651 \u0646\u0641\u0633\u0647 \u2661",
            "gentle",
          ));
        return;
      }
      (d.found.add(f),
        (t.disabled = !0),
        t.classList.add("adv-found"),
        t.classList.remove("adv-hint"),
        k(`[data-original="${f}"]`).classList.add("adv-found"));
      let b = d.scene.right[f];
      (t.setAttribute(
        "aria-label",
        `${z(Math.floor(f / 4), f % 4)}: ${b.name}\u060C \u062A\u0645\u0651 \u0627\u0643\u062A\u0634\u0627\u0641 \u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0641`,
      ),
        (k("[data-difference-count]").textContent = B(d.found.size)));
      let x = k("[data-difference-progress]");
      if (
        ((x.textContent =
          `${"\u2605 ".repeat(d.found.size)}${"\u2606 ".repeat(5 - d.found.size)}`.trim()),
        x.setAttribute(
          "aria-label",
          `\u0648\u062C\u062F\u062A ${B(d.found.size)} \u0645\u0646 \u062E\u0645\u0633\u0629 \u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A`,
        ),
        d.found.size < 5)
      ) {
        (m("correct"),
          q(
            `\u0631\u0627\u0626\u0639! \u0648\u062C\u062F\u062A \u0627\u062E\u062A\u0644\u0627\u0641\u064B\u0627 \u062C\u062F\u064A\u062F\u064B\u0627. \u0628\u0642\u064A ${B(5 - d.found.size)}.`,
            "good",
          ));
        return;
      }
      ((d.done = !0),
        e
          .querySelectorAll("[data-difference]")
          .forEach((I) => (I.disabled = !0)),
        (k('[data-adv-action="hint"]').disabled = !0));
      let y = 5 - d.hintsUsed;
      k("[data-difference-summary]").textContent =
        `\u0648\u062C\u062F\u062A \u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A \u0627\u0644\u062E\u0645\u0633\u0629! \u062D\u0635\u0644\u062A \u0639\u0644\u0649 ${B(y)} \u0646\u062C\u0648\u0645${d.hintsUsed ? " \u0645\u0639 \u0628\u0639\u0636 \u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u062C\u0645\u064A\u0644\u0629." : " \u0628\u0639\u064A\u0646\u064A\u0643 \u0627\u0644\u0641\u0636\u0648\u0644\u064A\u0651\u062A\u064A\u0646."}`;
      let N = k("[data-difference-stars]");
      ((N.textContent = "\u2605".repeat(y)),
        N.setAttribute("aria-label", `${B(y)} \u0646\u062C\u0648\u0645`),
        (k("[data-adv-finish]").hidden = !1),
        q(
          "\u0623\u062D\u0633\u0646\u062A! \u0627\u0643\u062A\u0634\u0641\u062A \u0643\u0644\u0651 \u0645\u0627 \u062A\u063A\u064A\u0651\u0631 \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629.",
          "good",
        ),
        S(
          y,
          "\u0627\u0643\u062A\u0634\u0641\u062A \u062E\u0645\u0633\u0629 \u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A \u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629",
        ),
        A('[data-adv-action="differences-replay"]'));
    }
    function w() {
      if (d.done || d.hintsUsed >= 2) return;
      let t = d.scene.changed.filter((x) => !d.found.has(x)),
        f = t.filter((x) => !d.hinted.has(x)),
        b = (f.length ? f : t)[0];
      b !== void 0 &&
        (m("tap"),
        d.hintsUsed++,
        d.hinted.add(b),
        e
          .querySelectorAll(".adv-hint")
          .forEach((x) => x.classList.remove("adv-hint")),
        k(`[data-difference="${b}"]`).classList.add("adv-hint"),
        (k("[data-hints-left]").textContent = B(2 - d.hintsUsed)),
        (k('[data-adv-action="hint"]').disabled = d.hintsUsed === 2),
        q(
          `\u062A\u0644\u0645\u064A\u062D \u0635\u063A\u064A\u0631: \u0642\u0627\u0631\u0646 \u0627\u0644\u0634\u064A\u0621 \u0641\u064A ${z(Math.floor(b / 4), b % 4)} \u0645\u0646 \u0627\u0644\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u064A\u0645\u0646\u0649.`,
        ));
    }
    function o(t) {
      let f = t.target.closest("button");
      n ||
        !f ||
        !e.contains(f) ||
        f.disabled ||
        (a === "maze"
          ? (f.dataset.move && T(f.dataset.move),
            f.dataset.advAction === "maze-next" && E(),
            f.dataset.advAction === "maze-replay" &&
              (m("tap"), H(), A("[data-maze-board]")))
          : (f.dataset.difference !== void 0 && c(f),
            f.dataset.advAction === "hint" && w(),
            f.dataset.advAction === "differences-replay" &&
              (m("tap"), O(), A("[data-difference]"))));
    }
    function p(t) {
      if (n || t.altKey || t.ctrlKey || t.metaKey) return;
      let f = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };
      if (f[t.key])
        if (a === "maze") {
          if (!t.target.closest("[data-maze-board], [data-move]")) return;
          (t.preventDefault(), T(f[t.key]));
        } else {
          let b = t.target.closest("[data-difference]");
          if (!b) return;
          t.preventDefault();
          let x = { up: -4, down: 4, left: -1, right: 1 }[f[t.key]],
            y = Number(b.dataset.difference);
          for (let N = 0; N < 16; N++) {
            y = (y + x + 16) % 16;
            let I = k(`[data-difference="${y}"]`);
            if (!I.disabled) {
              I.focus();
              break;
            }
          }
        }
    }
    return (
      e.classList.add("adv-mounted"),
      e.addEventListener("click", o),
      e.addEventListener("keydown", p),
      a === "maze" ? H() : O(),
      () => {
        ((n = !0),
          e.removeEventListener("click", o),
          e.removeEventListener("keydown", p),
          e.classList.remove("adv-mounted"));
      }
    );
  }
  var Me = {
      correct: "audio/effects/correct.mp3",
      retry: "audio/effects/retry.mp3",
      pop: "audio/effects/pop.mp3",
      tap: "audio/effects/pop.mp3",
      fanfare: "audio/effects/fanfare.mp3",
      applause: "audio/effects/applause.mp3",
      cheer: "audio/effects/cheer.mp3",
    },
    oa = {
      correct: 0.38,
      retry: 0.24,
      pop: 0.32,
      tap: 0.13,
      fanfare: 0.35,
      applause: 0.5,
      cheer: 0.5,
    };
  function Te({
    isMuted: e = () => !1,
    AudioClass: a = GameAudio,
    document: u = globalThis.document,
  } = {}) {
    let h = null,
      g = [],
      M = !1,
      n = !1,
      d = 0,
      r = "",
      k = -1 / 0,
      m = () => n || e() || u?.hidden;
    function A() {
      (d++,
        h && ((h.onended = null), (h.onerror = null), h.pause(), (h = null)));
    }
    function q() {
      ((g = []), (M = !1), (r = ""), (k = -1 / 0), A());
    }
    function S() {
      if (m()) {
        q();
        return;
      }
      if (M || h || !g.length) return;
      let l = g.shift(),
        j;
      try {
        j = new a(Me[l]);
      } catch {
        g = [];
        return;
      }
      let R = ++d;
      ((h = j), (j.volume = oa[l]), (j.preload = "auto"));
      let $ = () => {
        R === d && ((j.onended = null), (j.onerror = null), (h = null), S());
      };
      ((j.onended = $), (j.onerror = $));
      try {
        Promise.resolve(j.play()).catch($);
      } catch {
        $();
      }
    }
    function _(l) {
      if (m()) {
        q();
        return;
      }
      if ((l === "match" && (l = "correct"), l !== "celebrate" && !Me[l]))
        return;
      let j = Date.now();
      (l === r && j - k < (l === "tap" ? 70 : 180)) ||
        ((r = l),
        (k = j),
        A(),
        (g = l === "celebrate" ? ["fanfare", "applause", "cheer"] : [l]),
        S());
    }
    function z(l, { discard: j = !1 } = {}) {
      ((M = !!l), (j || M) && ((g = []), A()), M || S());
    }
    let H = () => {
      u.hidden && q();
    };
    return (
      u?.addEventListener("visibilitychange", H),
      {
        play: _,
        stop: q,
        setNarrating: z,
        destroy() {
          (q(), (n = !0), u?.removeEventListener("visibilitychange", H));
        },
      }
    );
  }
  var Ie = [
      "\u0628\u062A\u062B",
      "\u062C\u062D\u062E",
      "\u062F\u0630",
      "\u0631\u0632",
      "\u0633\u0634",
      "\u0635\u0636",
      "\u0637\u0638",
      "\u0639\u063A",
      "\u0641\u0642",
    ],
    fe = {
      "letter-hunt":
        "\u0635\u064A\u0651\u0627\u062F \u0627\u0644\u062D\u0631\u0648\u0641",
      "alphabet-train":
        "\u0642\u0637\u0627\u0631 \u0627\u0644\u062D\u0631\u0648\u0641",
      "letter-forms":
        "\u0623\u0634\u0643\u0627\u0644 \u0627\u0644\u062D\u0631\u0641",
      "letter-dots":
        "\u0623\u0633\u0631\u0627\u0631 \u0627\u0644\u0646\u0651\u0650\u0642\u0627\u0637",
    },
    la = [
      [
        "\u0628",
        "\u0628\u064E\u0637\u0651\u064E\u0629",
        "\u062C\u064E\u0628\u064E\u0644",
        "\u0643\u064E\u0644\u0652\u0628",
      ],
      [
        "\u062A",
        "\u062A\u064F\u0641\u0651\u064E\u0627\u062D",
        "\u0643\u0650\u062A\u064E\u0627\u0628",
        "\u0628\u0650\u0646\u0652\u062A",
      ],
      [
        "\u062B",
        "\u062B\u064E\u0639\u0652\u0644\u064E\u0628",
        "\u0645\u064E\u062B\u064E\u0644",
        "\u0628\u064E\u062D\u0652\u062B",
      ],
      [
        "\u062C",
        "\u062C\u064E\u0645\u064E\u0644",
        "\u062D\u064E\u062C\u064E\u0631",
        "\u062B\u064E\u0644\u0652\u062C",
      ],
      [
        "\u062D",
        "\u062D\u0650\u0635\u064E\u0627\u0646",
        "\u0628\u064E\u062D\u0652\u0631",
        "\u0645\u0650\u0644\u0652\u062D",
      ],
      [
        "\u062E",
        "\u062E\u064E\u0631\u064F\u0648\u0641",
        "\u0646\u064E\u062E\u0652\u0644",
        "\u0645\u064E\u0637\u0652\u0628\u064E\u062E",
      ],
      [
        "\u0633",
        "\u0633\u064E\u0645\u064E\u0643\u064E\u0629",
        "\u0645\u064E\u0633\u0652\u062C\u0650\u062F",
        "\u0634\u064E\u0645\u0652\u0633",
      ],
      [
        "\u0634",
        "\u0634\u064E\u0645\u0652\u0633",
        "\u062E\u064E\u0634\u064E\u0628",
        "\u0631\u0650\u064A\u0634",
      ],
      [
        "\u0635",
        "\u0635\u064E\u0642\u0652\u0631",
        "\u0628\u064E\u0635\u064E\u0644",
        "\u0642\u064E\u0641\u064E\u0635",
      ],
      [
        "\u0636",
        "\u0636\u0650\u0641\u0652\u062F\u064E\u0639",
        "\u062E\u064E\u0636\u064E\u0631",
        "\u0628\u064E\u064A\u0652\u0636",
      ],
      [
        "\u0637",
        "\u0637\u064E\u0627\u0626\u0650\u0631",
        "\u0645\u064E\u0637\u064E\u0631",
        "\u0642\u0650\u0637\u0651",
      ],
      [
        "\u0638",
        "\u0638\u064E\u0628\u0652\u064A",
        "\u0646\u064E\u0638\u064E\u0631",
        "\u062D\u064E\u0638\u0651",
      ],
      [
        "\u0639",
        "\u0639\u0650\u0646\u064E\u0628",
        "\u0644\u064E\u0639\u0650\u0628\u064E",
        "\u0634\u064E\u0645\u0652\u0639",
      ],
      [
        "\u063A",
        "\u063A\u064E\u0632\u064E\u0627\u0644",
        "\u0635\u064E\u063A\u0650\u064A\u0631",
        "\u0635\u064E\u0645\u0652\u063A",
      ],
      [
        "\u0641",
        "\u0641\u064E\u0631\u064E\u0627\u0634\u064E\u0629",
        "\u0633\u064E\u0641\u064E\u0631",
        "\u0643\u064E\u062A\u0650\u0641",
      ],
      [
        "\u0642",
        "\u0642\u064E\u0645\u064E\u0631",
        "\u0628\u064E\u0642\u064E\u0631",
        "\u0637\u064E\u0628\u064E\u0642",
      ],
      [
        "\u0643",
        "\u0643\u0650\u062A\u064E\u0627\u0628",
        "\u0645\u064E\u0643\u0652\u062A\u064E\u0628",
        "\u0633\u064E\u0645\u064E\u0643",
      ],
      [
        "\u0644",
        "\u0644\u064E\u064A\u0652\u0645\u064F\u0648\u0646",
        "\u0642\u064E\u0644\u064E\u0645",
        "\u062C\u064E\u0645\u064E\u0644",
      ],
      [
        "\u0645",
        "\u0645\u064E\u0648\u0652\u0632",
        "\u062C\u064E\u0645\u064E\u0644",
        "\u0642\u064E\u0644\u064E\u0645",
      ],
      [
        "\u0646",
        "\u0646\u064E\u062D\u0652\u0644\u064E\u0629",
        "\u0639\u0650\u0646\u064E\u0628",
        "\u0644\u064E\u0628\u064E\u0646",
      ],
      [
        "\u0647",
        "\u0647\u0650\u0644\u064E\u0627\u0644",
        "\u0646\u064E\u0647\u064E\u0631",
        "\u0648\u064E\u062C\u0652\u0647",
      ],
      [
        "\u064A",
        "\u064A\u064E\u062F",
        "\u0628\u064E\u064A\u0652\u062A",
        "\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651",
      ],
    ],
    ca = [
      [
        "\u0627",
        "\u0627\u0628\u0652\u0646",
        "\u0628\u064E\u0627\u0628",
        "\u0639\u064E\u0635\u064E\u0627",
      ],
      [
        "\u062F",
        "\u062F\u064F\u0628\u0651",
        "\u0628\u064E\u062F\u0652\u0631",
        "\u064A\u064E\u062F",
      ],
      [
        "\u0630",
        "\u0630\u064F\u0631\u064E\u0629",
        "\u0628\u064E\u0630\u0652\u0631",
        "\u0641\u064E\u062E\u0650\u0630",
      ],
      [
        "\u0631",
        "\u0631\u064F\u0645\u0651\u064E\u0627\u0646",
        "\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651",
        "\u0642\u064E\u0645\u064E\u0631",
      ],
      [
        "\u0632",
        "\u0632\u064E\u0647\u0652\u0631\u064E\u0629",
        "\u062C\u064E\u0632\u0652\u0631",
        "\u062E\u064F\u0628\u0652\u0632",
      ],
      [
        "\u0648",
        "\u0648\u064E\u0631\u0652\u062F\u064E\u0629",
        "\u062D\u064F\u0648\u062A",
        "\u064A\u064E\u062F\u0652\u0639\u064F\u0648",
      ],
    ],
    Ne = [
      ...la.map(([e, ...a]) => ({
        char: e,
        joinsNext: !0,
        shapes: [`${e}\u0640`, `\u0640${e}\u0640`, `\u0640${e}`],
        examples: a,
      })),
      ...ca.map(([e, ...a]) => ({
        char: e,
        joinsNext: !1,
        shapes: [e, `\u0640${e}`, `\u0640${e}`],
        examples: a,
      })),
    ],
    ze = {
      ب: [1, "\u062A\u062D\u062A"],
      ت: [2, "\u0641\u0648\u0642"],
      ث: [3, "\u0641\u0648\u0642"],
      ج: [1, "\u062A\u062D\u062A"],
      ح: [0, ""],
      خ: [1, "\u0641\u0648\u0642"],
      د: [0, ""],
      ذ: [1, "\u0641\u0648\u0642"],
      ر: [0, ""],
      ز: [1, "\u0641\u0648\u0642"],
      س: [0, ""],
      ش: [3, "\u0641\u0648\u0642"],
      ص: [0, ""],
      ض: [1, "\u0641\u0648\u0642"],
      ط: [0, ""],
      ظ: [1, "\u0641\u0648\u0642"],
      ع: [0, ""],
      غ: [1, "\u0641\u0648\u0642"],
      ف: [1, "\u0641\u0648\u0642"],
      ق: [2, "\u0641\u0648\u0642"],
    },
    da = Ie.flatMap((e) =>
      [...e].map((a) => ({
        char: a,
        family: e,
        count: ze[a][0],
        position: ze[a][1],
      })),
    ),
    Oe = [
      "\u0623\u0648\u0651\u0644 \u0627\u0644\u0643\u0644\u0645\u0629",
      "\u0648\u0633\u0637 \u0627\u0644\u0643\u0644\u0645\u0629",
      "\u0622\u062E\u0631 \u0627\u0644\u0643\u0644\u0645\u0629",
    ],
    se = (e) => D.find((a) => a.char === e),
    He = (e) =>
      e.count === 0
        ? "\u0628\u0644\u0627 \u0646\u0642\u0627\u0637"
        : e.count === 1
          ? `\u0646\u0642\u0637\u0629 \u0648\u0627\u062D\u062F\u0629 ${e.position} \u0627\u0644\u062D\u0631\u0641`
          : e.count === 2
            ? `\u0646\u0642\u0637\u062A\u0627\u0646 ${e.position} \u0627\u0644\u062D\u0631\u0641`
            : `\u062B\u0644\u0627\u062B \u0646\u0642\u0627\u0637 ${e.position} \u0627\u0644\u062D\u0631\u0641`;
  function _e(
    e,
    a,
    {
      onComplete: u = () => {},
      onFeedback: h = () => {},
      onSpeak: g = () => {},
    } = {},
  ) {
    let M = !1,
      n,
      d = (i) => e.querySelector(i),
      r = (i, s = "") => {
        let c = d(".af-status");
        c && ((c.textContent = i), (c.className = `af-status ${s}`));
      },
      k = (i) => d(i)?.focus({ preventScroll: !0 }),
      m = (i) => {
        M || h(i);
      };
    function A() {
      return a === "letter-hunt"
        ? L(D)
            .slice(0, 5)
            .map((i) => {
              let s = Ie.find((p) => p.includes(i.char)),
                c = s ? [...s].filter((p) => p !== i.char).map(se) : [],
                w = [
                  ...c,
                  ...L(
                    D.filter((p) => p.index !== i.index && !c.includes(p)),
                  ).slice(0, 4),
                ],
                o = 3 + Math.floor(Math.random() * 2);
              return {
                target: i,
                count: o,
                tiles: L([
                  ...Array(o).fill(i),
                  ...Array.from({ length: 12 - o }, (p, t) => w[t % w.length]),
                ]),
              };
            })
        : a === "alphabet-train"
          ? L(Array.from({ length: 25 }, (i, s) => s))
              .slice(0, 5)
              .map((i) => {
                let s = D.slice(i, i + 4),
                  c = L(s);
                return (
                  c.every((w, o) => w.index === s[o].index) &&
                    (c = [...c.slice(1), c[0]]),
                  { answer: s, chips: c }
                );
              })
          : a === "letter-forms"
            ? L(Ne)
                .slice(0, 5)
                .map((i, s) => {
                  let c = [
                    0,
                    1,
                    2,
                    Math.floor(Math.random() * 3),
                    Math.floor(Math.random() * 3),
                  ][s];
                  return {
                    target: i,
                    position: c,
                    options: L([
                      i,
                      ...L(Ne.filter((w) => w.char !== i.char)).slice(0, 3),
                    ]),
                  };
                })
            : L(da)
                .slice(0, 5)
                .map((i) => ({ ...i, options: L([...i.family]) }));
    }
    function q() {
      return `<div class="af-topline"><span>${a === "letter-hunt" || a === "alphabet-train" ? "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0623\u0648\u0651\u0644 \xB7 \u0623\u0643\u062A\u0634\u0641 \u0627\u0644\u062D\u0631\u0648\u0641" : "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062B\u0627\u0646\u064A \xB7 \u0634\u0643\u0644 \u0627\u0644\u062D\u0631\u0641"}</span><span>\u0627\u0644\u062C\u0648\u0644\u0629 ${v(n.round + 1)} \u0645\u0646 \u0665</span></div><div class="af-track" role="progressbar" aria-label="\u0627\u0644\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${n.round}"><span style="width:${(n.round / 5) * 100}%"></span></div>`;
    }
    let S = () =>
      '<button type="button" class="secondary-button af-audio" data-af-action="hear">\u266B \u0627\u0633\u0645\u0639 \u0627\u0633\u0645 \u0627\u0644\u062D\u0631\u0641</button>';
    function _(i) {
      return a === "letter-hunt"
        ? `<div class="af-question"><span class="af-kicker">\u0639\u064A\u0646 \u0627\u0644\u0645\u0633\u062A\u0643\u0634\u0641</span><h3>\u0627\u0639\u062B\u0631 \u0639\u0644\u0649 \u062D\u0631\u0641 <bdi class="af-target">${i.target.char}</bdi></h3><p>\u0641\u064A \u0627\u0644\u062D\u062F\u064A\u0642\u0629 ${v(i.count)} \u0628\u0637\u0627\u0642\u0627\u062A \u062A\u062D\u0645\u0644 \u0647\u0630\u0627 \u0627\u0644\u062D\u0631\u0641. \u0627\u062E\u062A\u0631\u0647\u0627 \u0643\u0644\u0651\u0647\u0627.</p>${S()}</div><div class="af-hunt-grid" aria-label="\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u062D\u0631\u0648\u0641">${i.tiles.map((s, c) => `<button type="button" class="af-hunt-tile" data-af-tile="${c}" aria-label="\u062D\u0631\u0641 ${s.name}"><bdi>${s.char}</bdi><span class="af-tile-mark" aria-hidden="true"></span></button>`).join("")}</div><p class="af-found">\u0648\u062C\u062F\u062A <b data-af-found>\u0660</b> \u0645\u0646 ${v(i.count)}</p>`
        : a === "alphabet-train"
          ? `<div class="af-question"><span class="af-kicker">\u062D\u0631\u0641 \u0648\u0631\u0627\u0621 \u062D\u0631\u0641</span><h3>\u0631\u062A\u0651\u0628 \u0639\u0631\u0628\u0627\u062A \u0627\u0644\u0642\u0637\u0627\u0631</h3><p>\u0627\u0628\u062F\u0623 \u0628\u062D\u0631\u0641 <bdi class="af-inline-letter">${i.answer[0].char}</bdi>\u060C \u062B\u0645 \u0636\u0639 \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u062D\u0633\u0628 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0647\u062C\u0627\u0621.</p>${S()}</div><div class="af-train" dir="rtl" aria-label="\u0639\u0631\u0628\u0627\u062A \u0627\u0644\u062D\u0631\u0648\u0641 \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628">${i.answer.map((s, c) => `<span class="af-wagon" data-af-slot="${c}" aria-label="\u0627\u0644\u0639\u0631\u0628\u0629 ${v(c + 1)} \u0641\u0627\u0631\u063A\u0629"></span>`).join("")}<span class="af-engine" aria-hidden="true">\u{1F682}</span></div><div class="af-chips" dir="rtl" aria-label="\u062D\u0631\u0648\u0641 \u0627\u0644\u0642\u0637\u0627\u0631">${i.chips.map((s, c) => `<button type="button" class="af-chip" data-af-chip="${c}" aria-label="\u062D\u0631\u0641 ${s.name}">${s.char}</button>`).join("")}</div><div class="af-tools"><button type="button" data-af-action="undo" disabled>\u21B6 \u062A\u0631\u0627\u062C\u0639</button><button type="button" data-af-action="clear" disabled>\u0623\u0641\u0631\u063A \u0627\u0644\u0639\u0631\u0628\u0627\u062A</button></div><button type="button" class="primary-button" data-af-action="check" disabled>\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u2713</button>`
          : a === "letter-forms"
            ? `<div class="af-question"><span class="af-kicker">\u0627\u0644\u062D\u0631\u0641 \u064A\u063A\u064A\u0651\u0631 \u062B\u0648\u0628\u0647</span><h3>\u0643\u064A\u0641 \u0646\u0643\u062A\u0628 <bdi class="af-target">${i.target.char}</bdi> \u0641\u064A ${Oe[i.position]}\u061F</h3><p>\u0627\u062E\u062A\u0631 \u0634\u0643\u0644\u0647 \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 \u0645\u062A\u0651\u0635\u0644\u064B\u0627 \u0628\u0645\u0627 \u064A\u0645\u0643\u0646\u0647 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0647.</p>${S()}</div><div class="af-form-choices" aria-label="\u0623\u0634\u0643\u0627\u0644 \u0627\u0644\u062D\u0631\u0648\u0641">${i.options.map((s, c) => `<button type="button" class="af-form-choice" data-af-choice="${c}" aria-label="\u0627\u0644\u0634\u0643\u0644 ${v(c + 1)}: ${s.shapes[i.position]}"><bdi>${s.shapes[i.position]}</bdi><span class="af-choice-mark" aria-hidden="true"></span></button>`).join("")}</div><p class="af-form-example" data-af-example hidden></p>`
            : `<div class="af-question"><span class="af-kicker">\u0627\u0644\u0646\u0642\u0627\u0637 \u062A\u0635\u0646\u0639 \u0641\u0631\u0642\u064B\u0627</span><h3>\u0623\u064A\u0651 \u062D\u0631\u0641 ${i.count ? "\u0644\u0647 " : ""}${He(i)}\u061F</h3><p>\u0627\u0628\u062D\u062B \u0641\u064A \u0639\u0627\u0626\u0644\u0629 <span class="af-dot-family">${[...i.family].join(" \xB7 ")}</span>.</p></div><div class="af-dot-clue" aria-hidden="true"><span>${i.count === 0 ? "\u0628\u0644\u0627 \u0646\u0642\u0627\u0637" : "\u25CF".repeat(i.count)}</span><small>${i.count === 0 ? "\u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u062D\u0631\u0641 \u062C\u064A\u062F\u064B\u0627" : i.position + " \u0627\u0644\u062D\u0631\u0641"}</small></div><div class="af-dot-choices" aria-label="\u062D\u0631\u0648\u0641 \u0627\u0644\u0639\u0627\u0626\u0644\u0629">${i.options.map((s, c) => `<button type="button" class="af-form-choice" data-af-choice="${c}" aria-label="\u062D\u0631\u0641 ${se(s).name}"><bdi>${s}</bdi><span class="af-choice-mark" aria-hidden="true"></span></button>`).join("")}</div><button type="button" class="secondary-button af-audio" data-af-action="hear" hidden>\u266B \u0627\u0633\u0645\u0639 \u0627\u0633\u0645 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0630\u064A \u0648\u062C\u062F\u062A\u0647</button>`;
    }
    function z() {
      let i = n.rounds[n.round];
      (Object.assign(n, {
        solved: !1,
        firstTry: !0,
        found: new Set(),
        chosen: [],
      }),
        (e.innerHTML = `<section class="af-game af-${a}" dir="rtl" aria-label="${fe[a]}">${q()}${_(i)}<p class="af-status" role="status" aria-live="polite">\u062E\u0630 \u0648\u0642\u062A\u0643. \u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0641\u062A\u062D \u0628\u0627\u0628\u064B\u0627 \u062C\u062F\u064A\u062F\u064B\u0627 \u2661</p><button type="button" class="primary-button af-next" data-af-action="next" hidden>${n.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0627\u0644\u062C\u0648\u0644\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u2190"}</button></section>`));
    }
    function H(i) {
      n.solved ||
        ((n.solved = !0),
        n.firstTry && n.firstCorrect++,
        e
          .querySelectorAll(
            '[data-af-tile],[data-af-chip],[data-af-choice],[data-af-action="check"],[data-af-action="undo"],[data-af-action="clear"]',
          )
          .forEach((s) => (s.disabled = !0)),
        r(i, "af-success"),
        (d('[data-af-action="next"]').hidden = !1),
        n.round < 4 && m("correct"),
        k('[data-af-action="next"]'));
    }
    function l(i) {
      let s = n.rounds[n.round],
        c = Number(i.dataset.afTile);
      if (s.tiles[c].index !== s.target.index) {
        ((n.firstTry = !1),
          (i.disabled = !0),
          i.classList.add("af-wrong"),
          (i.querySelector(".af-tile-mark").textContent = "\u21B6"),
          r(
            "\u0647\u0630\u0627 \u062D\u0631\u0641 \u0622\u062E\u0631. \u062A\u0623\u0645\u0651\u0644 \u0634\u0643\u0644 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u0651\u062F\u064B\u0627.",
            "af-retry",
          ),
          m("retry"));
        return;
      }
      (n.found.add(c),
        (i.disabled = !0),
        i.classList.add("af-correct"),
        (i.querySelector(".af-tile-mark").textContent = "\u2713"),
        (d("[data-af-found]").textContent = v(n.found.size)),
        n.found.size === s.count
          ? H(
              `\u0623\u062D\u0633\u0646\u062A! \u0648\u062C\u062F\u062A \u062D\u0631\u0648\u0641 ${s.target.name} \u0643\u0644\u0651\u0647\u0627.`,
            )
          : (r(
              "\u0627\u0643\u062A\u0634\u0627\u0641 \u062C\u0645\u064A\u0644! \u0628\u0642\u064A\u062A \u062D\u0631\u0648\u0641 \u0623\u062E\u0631\u0649 \u0645\u0646 \u0627\u0644\u0634\u0643\u0644 \u0646\u0641\u0633\u0647.",
            ),
            m("tap")));
    }
    function j() {
      let i = n.rounds[n.round];
      (e.querySelectorAll("[data-af-slot]").forEach((s, c) => {
        let w = i.chips[n.chosen[c]];
        ((s.textContent = w?.char || ""),
          s.classList.toggle("af-filled", !!w),
          s.setAttribute(
            "aria-label",
            `\u0627\u0644\u0639\u0631\u0628\u0629 ${v(c + 1)}${w ? "\u060C \u062D\u0631\u0641 " + w.name : " \u0641\u0627\u0631\u063A\u0629"}`,
          ));
      }),
        e
          .querySelectorAll("[data-af-chip]")
          .forEach(
            (s) => (s.disabled = n.chosen.includes(Number(s.dataset.afChip))),
          ),
        (d('[data-af-action="undo"]').disabled = n.chosen.length === 0),
        (d('[data-af-action="clear"]').disabled = n.chosen.length === 0),
        (d('[data-af-action="check"]').disabled = n.chosen.length !== 4),
        d(".af-train").classList.remove("af-train-wrong"),
        r(
          "\u0636\u0639 \u0643\u0644\u0651 \u062D\u0631\u0641 \u0641\u064A \u0639\u0631\u0628\u062A\u0647\u060C \u062B\u0645 \u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u062A\u0631\u062A\u064A\u0628.",
        ));
    }
    function R() {
      let i = n.rounds[n.round];
      n.chosen.length === 4 &&
        (n.chosen.every((s, c) => i.chips[s].index === i.answer[c].index)
          ? (H(
              "\u0623\u062D\u0633\u0646\u062A! \u0627\u0644\u0639\u0631\u0628\u0627\u062A \u0627\u0644\u0622\u0646 \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0647\u062C\u0627\u0626\u064A.",
            ),
            d(".af-train").classList.add("af-train-correct"))
          : ((n.firstTry = !1),
            d(".af-train").classList.add("af-train-wrong"),
            r(
              "\u0628\u0639\u0636 \u0627\u0644\u0639\u0631\u0628\u0627\u062A \u062A\u062D\u062A\u0627\u062C \u0645\u0643\u0627\u0646\u064B\u0627 \u0622\u062E\u0631. \u062A\u0631\u0627\u062C\u0639 \u0623\u0648 \u0623\u0641\u0631\u063A \u0627\u0644\u0639\u0631\u0628\u0627\u062A \u0648\u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u062F\u064B\u0627.",
              "af-retry",
            ),
            m("retry")));
    }
    function $(i) {
      let s = n.rounds[n.round],
        c = Number(i.dataset.afChoice);
      if (
        !(a === "letter-forms"
          ? s.options[c].char === s.target.char
          : s.options[c] === s.char)
      ) {
        ((n.firstTry = !1),
          (i.disabled = !0),
          i.classList.add("af-wrong"),
          (i.querySelector(".af-choice-mark").textContent = "\u21B6"),
          r(
            a === "letter-dots"
              ? "\u0627\u0646\u0638\u0631 \u0625\u0644\u0649 \u0639\u062F\u062F \u0627\u0644\u0646\u0642\u0627\u0637 \u0648\u0645\u0643\u0627\u0646\u0647\u0627 \u062F\u0627\u062E\u0644 \u0627\u0644\u0639\u0627\u0626\u0644\u0629\u060C \u062B\u0645 \u062C\u0631\u0651\u0628 \u062D\u0631\u0641\u064B\u0627 \u0622\u062E\u0631."
              : "\u0647\u0630\u0627 \u0634\u0643\u0644 \u062D\u0631\u0641 \u0622\u062E\u0631. \u0642\u0627\u0631\u0646 \u062C\u0633\u0645 \u0627\u0644\u062D\u0631\u0641 \u0648\u0646\u0642\u0627\u0637\u0647\u060C \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u0651\u062F\u064B\u0627.",
            "af-retry",
          ),
          m("retry"));
        return;
      }
      if (
        (i.classList.add("af-correct"),
        (i.querySelector(".af-choice-mark").textContent = "\u2713"),
        a === "letter-forms")
      ) {
        let o = d("[data-af-example]");
        ((o.hidden = !1),
          (o.textContent = `\u0645\u062B\u0644 \u0643\u0644\u0645\u0629 \xAB${s.target.examples[s.position]}\xBB. ${s.target.joinsNext ? "\u064A\u062A\u0651\u0635\u0644 \u0647\u0630\u0627 \u0627\u0644\u062D\u0631\u0641 \u0628\u0645\u0627 \u0642\u0628\u0644\u0647 \u0648\u0645\u0627 \u0628\u0639\u062F\u0647 \u0639\u0646\u062F\u0645\u0627 \u062A\u0633\u0645\u062D \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0645\u062C\u0627\u0648\u0631\u0629." : "\u0647\u0630\u0627 \u0627\u0644\u062D\u0631\u0641 \u0644\u0627 \u064A\u062A\u0651\u0635\u0644 \u0628\u0645\u0627 \u0628\u0639\u062F\u0647\u061B \u0642\u062F \u064A\u062A\u0651\u0635\u0644 \u0628\u0645\u0627 \u0642\u0628\u0644\u0647 \u0641\u0642\u0637."}`),
          H(
            `\u0646\u0639\u0645\u060C \u0647\u0630\u0627 \u0634\u0643\u0644 ${se(s.target.char).name} \u0641\u064A ${Oe[s.position]}.`,
          ));
      } else
        ((d('[data-af-action="hear"]').hidden = !1),
          H(
            `\u0635\u062D\u064A\u062D! \u062D\u0631\u0641 ${se(s.char).name} ${s.count ? "\u0644\u0647 " : ""}${He(s)}.`,
          ));
    }
    function T() {
      if (n.finished) return;
      n.finished = !0;
      let i = Math.max(1, n.firstCorrect);
      ((e.innerHTML = `<section class="af-game af-result" dir="rtl"><span class="af-result-icon" aria-hidden="true">${a === "letter-hunt" ? "\u{1F50E}" : a === "alphabet-train" ? "\u{1F682}" : a === "letter-forms" ? "\u270D\uFE0F" : "\u2726"}</span><span class="af-kicker">\u062E\u0645\u0633 \u062E\u0637\u0648\u0627\u062A \u062C\u062F\u064A\u062F\u0629 \u0641\u064A \u0631\u062D\u0644\u0629 \u0627\u0644\u062D\u0631\u0648\u0641</span><h3>\u0623\u062D\u0633\u0646\u062A \u064A\u0627 \u0645\u0633\u062A\u0643\u0634\u0641!</h3><p>\u0623\u0643\u0645\u0644\u062A \u0644\u0639\u0628\u0629 \xAB${fe[a]}\xBB \u0648\u062C\u0645\u0639\u062A ${v(i)} \u0646\u062C\u0648\u0645.</p><div class="af-result-stars" aria-label="${v(i)} \u0646\u062C\u0648\u0645">${"\u2605".repeat(i)}${"\u2606".repeat(5 - i)}</div><button type="button" class="primary-button" data-af-action="restart">\u0645\u063A\u0627\u0645\u0631\u0629 \u062D\u0631\u0648\u0641 \u062C\u062F\u064A\u062F\u0629 \u21BB</button></section>`),
        u({
          stars: i,
          summary: `\u0625\u0643\u0645\u0627\u0644 \u062E\u0645\u0633 \u062C\u0648\u0644\u0627\u062A \u0645\u0646 ${fe[a]}`,
        }),
        k('[data-af-action="restart"]'));
    }
    function E() {
      ((n = { rounds: A(), round: 0, firstCorrect: 0, finished: !1 }), z());
    }
    function O(i) {
      if (M) return;
      let s = i.target.closest?.("button");
      if (!s || !e.contains(s) || s.disabled) return;
      let c = s.dataset.afAction;
      if (c === "restart") {
        E();
        return;
      }
      if (c === "hear") {
        let w = n.rounds[n.round],
          o =
            a === "letter-hunt"
              ? w.target.char
              : a === "alphabet-train"
                ? w.answer[0].char
                : a === "letter-forms"
                  ? w.target.char
                  : w.char;
        g(se(o).index, "name");
        return;
      }
      if (c === "next" && n.solved && !n.finished) {
        n.round < 4
          ? (n.round++,
            z(),
            k(
              a === "letter-hunt"
                ? "[data-af-tile]"
                : a === "alphabet-train"
                  ? "[data-af-chip]"
                  : "[data-af-choice]",
            ))
          : T();
        return;
      }
      n.finished ||
        n.solved ||
        (s.hasAttribute("data-af-tile")
          ? l(s)
          : s.hasAttribute("data-af-choice")
            ? $(s)
            : s.hasAttribute("data-af-chip")
              ? (n.chosen.push(Number(s.dataset.afChip)), j(), m("tap"))
              : c === "undo"
                ? (n.chosen.pop(), j(), m("tap"))
                : c === "clear"
                  ? ((n.chosen = []), j(), m("tap"))
                  : c === "check" && R());
    }
    return (
      e.addEventListener("click", O),
      Object.hasOwn(fe, a)
        ? E()
        : (e.innerHTML =
            '<p role="status">\u0647\u0630\u0647 \u0627\u0644\u0645\u063A\u0627\u0645\u0631\u0629 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F\u0629. \u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u0629 \u0623\u062E\u0631\u0649.</p>'),
      () => {
        ((M = !0), e.removeEventListener("click", O));
      }
    );
  }
  var be = [
      {
        id: "fatha",
        mark: "\u064E",
        name: "\u0627\u0644\u0641\u062A\u062D\u0629",
        long: "\u0627",
        hint: "\u0627\u0644\u0641\u062A\u062D\u0629 \u062A\u0646\u0627\u0633\u0628\u0647\u0627 \u0627\u0644\u0623\u0644\u0641 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0645\u0642\u0627\u0637\u0639.",
      },
      {
        id: "kasra",
        mark: "\u0650",
        name: "\u0627\u0644\u0643\u0633\u0631\u0629",
        long: "\u064A",
        hint: "\u0627\u0644\u0643\u0633\u0631\u0629 \u062A\u0646\u0627\u0633\u0628\u0647\u0627 \u0627\u0644\u064A\u0627\u0621 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0645\u0642\u0627\u0637\u0639.",
      },
      {
        id: "damma",
        mark: "\u064F",
        name: "\u0627\u0644\u0636\u0645\u0629",
        long: "\u0648",
        hint: "\u0627\u0644\u0636\u0645\u0629 \u062A\u0646\u0627\u0633\u0628\u0647\u0627 \u0627\u0644\u0648\u0627\u0648 \u0641\u064A \u0647\u0630\u0647 \u0627\u0644\u0645\u0642\u0627\u0637\u0639.",
      },
    ],
    ua = [1, 2, 4, 5, 9, 11, 19, 21, 22, 23, 24],
    pa = [
      {
        word: "\u0628\u064E\u0627\u0628",
        parts: ["\u0628\u064E\u0627", "\u0628"],
        emoji: "\u{1F6AA}",
        name: "\u0628\u0627\u0628",
      },
      {
        word: "\u062F\u064E\u0627\u0631",
        parts: ["\u062F\u064E\u0627", "\u0631"],
        emoji: "\u{1F3E0}",
        name: "\u062F\u0627\u0631",
      },
      {
        word: "\u0646\u064F\u0648\u0631",
        parts: ["\u0646\u064F\u0648", "\u0631"],
        emoji: "\u{1F4A1}",
        name: "\u0646\u0648\u0631",
      },
      {
        word: "\u0641\u0650\u064A\u0644",
        parts: ["\u0641\u0650\u064A", "\u0644"],
        emoji: "\u{1F418}",
        name: "\u0641\u064A\u0644",
      },
      {
        word: "\u062D\u064F\u0648\u062A",
        parts: ["\u062D\u064F\u0648", "\u062A"],
        emoji: "\u{1F40B}",
        name: "\u062D\u0648\u062A",
      },
      {
        word: "\u062A\u0650\u064A\u0646",
        parts: ["\u062A\u0650\u064A", "\u0646"],
        emoji: "\u{1F333}",
        name: "\u062A\u064A\u0646",
      },
      {
        word: "\u0631\u0650\u064A\u0634",
        parts: ["\u0631\u0650\u064A", "\u0634"],
        emoji: "\u{1FAB6}",
        name: "\u0631\u064A\u0634",
      },
      {
        word: "\u0633\u064F\u0648\u0631",
        parts: ["\u0633\u064F\u0648", "\u0631"],
        emoji: "\u{1F9F1}",
        name: "\u0633\u0648\u0631",
      },
      {
        word: "\u0645\u064E\u0627\u0644",
        parts: ["\u0645\u064E\u0627", "\u0644"],
        emoji: "\u{1FA99}",
        name: "\u0645\u0627\u0644",
      },
      {
        word: "\u0646\u064E\u0627\u0631",
        parts: ["\u0646\u064E\u0627", "\u0631"],
        emoji: "\u{1F525}",
        name: "\u0646\u0627\u0631",
      },
    ],
    Re = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 17, 19, 20, 21, 22, 23, 24,
      26, 27,
    ],
    ne = {
      "vowel-match":
        "\u0627\u0644\u062D\u0631\u0641 \u0648\u0627\u0644\u062D\u0631\u0643\u0629",
      "long-vowels":
        "\u0623\u0635\u062F\u0642\u0627\u0621 \u0627\u0644\u0645\u062F\u0651",
      "syllable-builder":
        "\u062C\u0633\u0631 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u0643\u062A\u0648\u0628\u0629",
      "word-picture":
        "\u0627\u0644\u0643\u0644\u0645\u0629 \u0648\u0635\u0648\u0631\u062A\u0647\u0627",
    },
    fa = {
      "vowel-match":
        "\u062A\u0645\u064A\u064A\u0632 \u062E\u0645\u0633 \u062D\u0631\u0643\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u062D\u0631\u0648\u0641",
      "long-vowels":
        "\u0631\u0628\u0637 \u062E\u0645\u0633 \u062D\u0631\u0643\u0627\u062A \u0628\u062D\u0631\u0648\u0641 \u0627\u0644\u0645\u062F\u0651",
      "syllable-builder":
        "\u062A\u0631\u0643\u064A\u0628 \u062E\u0645\u0633 \u0643\u0644\u0645\u0627\u062A \u0645\u0646 \u0645\u0642\u0627\u0637\u0639 \u0645\u0643\u062A\u0648\u0628\u0629",
      "word-picture":
        "\u0645\u0637\u0627\u0628\u0642\u0629 \u062E\u0645\u0633 \u0643\u0644\u0645\u0627\u062A \u0628\u0635\u0648\u0631\u0647\u0627",
    };
  function De(
    e,
    a,
    {
      onComplete: u = () => {},
      onFeedback: h = () => {},
      onSpeak: g = () => {},
      onPrompt: M = () => {},
      isMuted: n = () => !1,
      focus,
    } = {},
  ) {
    let d = !1,
      r = null,
      k = (i) => e.querySelector(i),
      m = (i) => k(i)?.focus({ preventScroll: !0 }),
      A = (i, s = "") => {
        let c = k(".ab-status");
        c && ((c.textContent = i), (c.className = `ab-status ${s}`));
      },
      q = a === "syllable-builder";
    function S() {
      if (a === "word-picture")
        return L(Re)
          .slice(0, 5)
          .map((c) => ({
            target: D[c],
            choices: L([c, ...L(Re.filter((w) => w !== c)).slice(0, 3)]).map(
              (w) => D[w],
            ),
          }));
      if (q)
        return L(pa)
          .slice(0, 5)
          .map((c) => ({ target: c }));
      const targetVowel = be.find((vowel) => vowel.id === focus);
      let i = L(ua).slice(0, 5),
        s = targetVowel ? i.map(() => targetVowel) : L([...be, ...L(be).slice(0, 2)]);
      return i.map((c, w) => ({
        letter: D[c],
        vowel: s[w],
        choices: L(be).map((o) => ({
          id: o.id,
          text: D[c].char + o.mark + (a === "long-vowels" ? o.long : ""),
          name: o.name,
        })),
      }));
    }
    function _() {
      return `<div class="ab-topline"><span>${ne[a]}</span><span>\u0627\u0644\u0633\u0624\u0627\u0644 ${v(r.round + 1)} \u0645\u0646 \u0665</span></div><div class="ab-progress" role="progressbar" aria-label="\u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${r.round}"><span style="width:${(r.round / 5) * 100}%"></span></div>`;
    }
    function z(i) {
      return a === "vowel-match"
        ? `<div class="ab-question"><span class="ab-prompt-icon" aria-hidden="true">\u2726</span><h3>\u0627\u062E\u062A\u0631 \u062D\u0631\u0641 ${i.letter.name} \u0645\u0639 <strong class="ab-vowel-name">${i.vowel.name}</strong></h3><p>\u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u0639\u0644\u0627\u0645\u0629 \u0641\u0648\u0642 \u0627\u0644\u062D\u0631\u0641 \u0623\u0648 \u062A\u062D\u062A\u0647\u060C \u062B\u0645 \u0627\u062E\u062A\u0631.</p><div class="ab-vowel-guide" aria-label="\u062A\u0630\u0643\u064A\u0631 \u0628\u0627\u0644\u062D\u0631\u0643\u0627\u062A"><span>\u0628\u064E <small>\u0641\u062A\u062D\u0629</small></span><span>\u0628\u0650 <small>\u0643\u0633\u0631\u0629</small></span><span>\u0628\u064F <small>\u0636\u0645\u0651\u0629</small></span></div><button type="button" class="ab-listen" data-ab-action="letter-audio">\u266B \u0627\u0633\u0645\u0639 \u0627\u0633\u0645 \u0627\u0644\u062D\u0631\u0641</button></div>`
        : a === "long-vowels"
          ? `<div class="ab-question"><h3>\u0623\u064A\u0651 \u0645\u0642\u0637\u0639 \u064A\u0646\u0627\u0633\u0628 \u0627\u0644\u062D\u0631\u0643\u0629\u061F</h3><p>\u0627\u062E\u062A\u0631 \u0627\u0644\u0645\u062F\u0651 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0645\u0643\u062A\u0648\u0628\u0629.</p><div class="ab-long-clue"><span class="ab-short-syllable">${i.letter.char + i.vowel.mark}</span><span class="ab-clue-arrow" aria-hidden="true">\u2190</span><span class="ab-long-question">\u061F</span></div><div class="ab-rule-guide"><span>\u064E + \u0627</span><span>\u0650 + \u064A</span><span>\u064F + \u0648</span></div><p class="ab-learning-note">\u0646\u0637\u064A\u0644 \u0627\u0644\u0641\u062A\u062D\u0629 \u0628\u0627\u0644\u0623\u0644\u0641\u060C \u0648\u0627\u0644\u0643\u0633\u0631\u0629 \u0628\u0627\u0644\u064A\u0627\u0621\u060C \u0648\u0627\u0644\u0636\u0645\u0651\u0629 \u0628\u0627\u0644\u0648\u0627\u0648.</p></div>`
          : `<div class="ab-question"><span class="ab-picture" role="img" aria-label="${i.target.word}">${i.target.emoji}</span><h3>\u0623\u064A\u0651 \u0643\u0644\u0645\u0629 \u062A\u0635\u0641 \u0627\u0644\u0635\u0648\u0631\u0629\u061F</h3><p>\u0627\u0642\u0631\u0623 \u0627\u0644\u0643\u0644\u0645\u0627\u062A\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0627\u0633\u0645 \u0627\u0644\u0635\u0648\u0631\u0629.</p><button type="button" class="ab-listen" data-ab-action="word-audio">\u266B \u0627\u0633\u0645\u0639 \u0627\u0633\u0645 \u0627\u0644\u0635\u0648\u0631\u0629</button></div>`;
    }
    function H() {
      let i = r.rounds[r.round];
      if (
        ((r.solved = !1),
        (r.firstTry = !0),
        (r.wrong = new Set()),
        (r.selected = []),
        q)
      ) {
        l(i);
        return;
      }
      e.innerHTML = `<section class="ab-game ab-${a}" dir="rtl" aria-label="${ne[a]}">${_()}${z(i)}<div class="ab-choices ${a === "word-picture" ? "ab-word-choices" : ""}" aria-label="\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629">${i.choices.map((s, c) => `<button type="button" class="ab-choice" data-ab-choice="${c}"><span class="ab-choice-text">${a === "word-picture" ? s.word : s.text}</span><i class="ab-choice-mark" aria-hidden="true"></i></button>`).join("")}</div><p class="ab-status" role="status" aria-live="polite">\u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0633\u0627\u0639\u062F\u0643 \u0639\u0644\u0649 \u0627\u0644\u062A\u0639\u0644\u0651\u0645. \u062E\u0630 \u0648\u0642\u062A\u0643 \u2661</p><button type="button" class="primary-button" data-ab-action="next" hidden>${r.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u062A\u0627\u0644\u064A \u2190"}</button></section>`;
    }
    function l(i) {
      ((r.chips = L(i.target.parts.map((s, c) => ({ text: s, index: c })))),
        r.chips.map((s) => s.text).join("") === i.target.word &&
          r.chips.reverse(),
        (e.innerHTML = `<section class="ab-game ab-syllable-builder" dir="rtl" aria-label="${ne[a]}">${_()}<div class="ab-question"><span class="ab-picture" role="img" aria-label="${i.target.name}">${i.target.emoji}</span><h3>\u0627\u0642\u0631\u0623 \u0627\u0644\u0643\u0644\u0645\u0629\u060C \u062B\u0645 \u0643\u0648\u0651\u0646\u0647\u0627</h3><span class="ab-model-word">${i.target.word}</span><p>\u0631\u062A\u0651\u0628 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u0643\u062A\u0648\u0628\u0629 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631\u060C \u0645\u062B\u0644 \u0627\u0644\u0643\u0644\u0645\u0629.</p></div><div class="ab-part-slots" dir="rtl" aria-label="\u0623\u0645\u0627\u0643\u0646 \u0627\u0644\u0645\u0642\u0627\u0637\u0639">${i.target.parts.map((s, c) => `<span class="ab-part-slot" data-ab-slot="${c}" aria-label="\u0645\u0643\u0627\u0646 \u0641\u0627\u0631\u063A ${v(c + 1)}"></span>`).join("")}</div><p class="ab-joined-word" aria-live="polite" aria-label="\u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u062A\u064A \u0643\u0648\u0651\u0646\u062A\u0647\u0627"></p><div class="ab-part-chips" dir="rtl" aria-label="\u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u062A\u0627\u062D\u0629">${r.chips.map((s, c) => `<button type="button" class="ab-part-chip" data-ab-chip="${c}">${s.text}</button>`).join("")}</div><div class="ab-tools"><button type="button" class="ab-quiet-button" data-ab-action="undo" disabled>\u21B6 \u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0645\u0642\u0637\u0639</button><button type="button" class="ab-quiet-button" data-ab-action="clear" disabled>\u0627\u0628\u062F\u0623 \u0627\u0644\u0643\u0644\u0645\u0629 \u0645\u0646 \u062C\u062F\u064A\u062F</button></div><p class="ab-status" role="status" aria-live="polite">\u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0645\u0643\u062A\u0648\u0628\u0629 \u0623\u062C\u0632\u0627\u0621 \u0645\u0646 \u0627\u0644\u0643\u0644\u0645\u0629. \u0627\u062C\u0645\u0639\u0647\u0627 \u0648\u0627\u0642\u0631\u0623\u0647\u0627.</p><button type="button" class="primary-button" data-ab-action="check" disabled>\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 \u2713</button><button type="button" class="primary-button" data-ab-action="next" hidden>${r.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0627\u0644\u0643\u0644\u0645\u0629 \u0627\u0644\u062A\u0627\u0644\u064A\u0629 \u2190"}</button></section>`));
    }
    function j(i) {
      if (r.solved || r.finished || i.disabled) return;
      let s = r.rounds[r.round],
        c = Number(i.dataset.abChoice),
        w = s.choices[c];
      if (!w || r.wrong.has(c)) return;
      if (
        !(a === "word-picture"
          ? w.index === s.target.index
          : w.id === s.vowel.id)
      ) {
        ((r.firstTry = !1),
          r.wrong.add(c),
          (i.disabled = !0),
          i.classList.add("ab-wrong"),
          (i.querySelector(".ab-choice-mark").textContent = "\u21B6"),
          A(
            a === "word-picture"
              ? "\u0644\u0646\u0642\u0631\u0623 \u0627\u0644\u0643\u0644\u0645\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649. \u0627\u0644\u0635\u0648\u0631\u0629 \u0648\u0627\u0644\u0635\u0648\u062A \u064A\u0633\u0627\u0639\u062F\u0627\u0646\u0643."
              : "\u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0643\u062A\u0648\u0628\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649\u060C \u062B\u0645 \u062C\u0631\u0651\u0628 \u0627\u062E\u062A\u064A\u0627\u0631\u064B\u0627 \u0622\u062E\u0631.",
            "ab-status-retry",
          ),
          h("retry"));
        return;
      }
      ((r.solved = !0),
        r.firstTry && r.firstCorrect++,
        i.classList.add("ab-correct"),
        (i.querySelector(".ab-choice-mark").textContent = "\u2713"),
        e
          .querySelectorAll("[data-ab-choice]")
          .forEach((p) => (p.disabled = !0)),
        A(
          a === "word-picture"
            ? `\u2713 \u0623\u062D\u0633\u0646\u062A! \u0647\u0630\u0647 \u0643\u0644\u0645\u0629 ${s.target.word}.`
            : a === "vowel-match"
              ? `\u2713 \u0635\u062D\u064A\u062D! ${w.text} \u062D\u0631\u0641 ${s.letter.name} \u0645\u0639 ${s.vowel.name}.`
              : `\u2713 \u0631\u0627\u0626\u0639! ${s.vowel.hint} ${s.letter.char + s.vowel.mark} \u2190 ${w.text}`,
          "ab-status-correct",
        ),
        a === "word-picture" && g(s.target.index, "word"),
        r.round < 4 && h("correct"),
        (k('[data-ab-action="next"]').hidden = !1),
        m('[data-ab-action="next"]'));
    }
    function R() {
      let i = r.selected.map((s) => r.chips[s].text);
      (e.querySelectorAll("[data-ab-slot]").forEach((s, c) => {
        ((s.textContent = i[c] || ""),
          s.classList.toggle("ab-filled", c < i.length),
          s.setAttribute(
            "aria-label",
            i[c]
              ? `\u0645\u0642\u0637\u0639 ${i[c]}`
              : `\u0645\u0643\u0627\u0646 \u0641\u0627\u0631\u063A ${v(c + 1)}`,
          ));
      }),
        e
          .querySelectorAll("[data-ab-chip]")
          .forEach(
            (s) => (s.disabled = r.selected.includes(Number(s.dataset.abChip))),
          ),
        (k(".ab-joined-word").textContent = i.join("")),
        k(".ab-part-slots").classList.remove("ab-slots-wrong"),
        (k('[data-ab-action="undo"]').disabled = !i.length),
        (k('[data-ab-action="clear"]').disabled = !i.length),
        (k('[data-ab-action="check"]').disabled = i.length !== r.chips.length),
        A(
          i.length === r.chips.length
            ? "\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u062C\u0645\u0639! \u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0637\u0639."
            : "\u0623\u0636\u0641 \u0627\u0644\u0645\u0642\u0637\u0639 \u0627\u0644\u062A\u0627\u0644\u064A\u060C \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.",
        ));
    }
    function $() {
      if (r.solved || r.selected.length !== r.chips.length) return;
      let i = r.rounds[r.round];
      if (r.selected.map((c) => r.chips[c].text).join("") !== i.target.word) {
        ((r.firstTry = !1),
          k(".ab-part-slots").classList.add("ab-slots-wrong"),
          A(
            "\u0644\u0646\u0631\u0627\u062C\u0639 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u0645\u0642\u0627\u0637\u0639. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0623\u0648 \u0627\u0644\u0628\u062F\u0621 \u0645\u0646 \u062C\u062F\u064A\u062F.",
            "ab-status-retry",
          ),
          h("retry"));
        return;
      }
      ((r.solved = !0),
        r.firstTry && r.firstCorrect++,
        k(".ab-part-slots").classList.add("ab-slots-correct"),
        e
          .querySelectorAll(
            '[data-ab-chip],[data-ab-action="undo"],[data-ab-action="clear"]',
          )
          .forEach((c) => (c.disabled = !0)),
        (k('[data-ab-action="check"]').hidden = !0),
        (k('[data-ab-action="next"]').hidden = !1),
        A(
          `\u2713 \u0623\u062D\u0633\u0646\u062A! ${i.target.word}\u2026 \u0635\u0627\u0631\u062A \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0643\u0644\u0645\u0629 \u0643\u0627\u0645\u0644\u0629.`,
          "ab-status-correct",
        ),
        r.round < 4 && h("correct"),
        m('[data-ab-action="next"]'));
    }
    function T() {
      if (r.finished) return;
      r.finished = !0;
      let i = Math.max(1, r.firstCorrect);
      ((e.innerHTML = `<section class="ab-game ab-result" dir="rtl"><span class="ab-result-art" aria-hidden="true">${q ? "\u{1F309}" : a === "word-picture" ? "\u{1F5BC}\uFE0F" : "\u2728"}</span><span class="ab-result-kicker">\u062E\u0645\u0633\u0629 \u0627\u0643\u062A\u0634\u0627\u0641\u0627\u062A \u062C\u062F\u064A\u062F\u0629!</span><h3>${q ? "\u062C\u0645\u0639\u062A \u0627\u0644\u0645\u0642\u0627\u0637\u0639\u2026 \u0648\u0642\u0631\u0623\u062A \u0627\u0644\u0643\u0644\u0645\u0627\u062A!" : "\u0623\u062D\u0633\u0646\u062A \u064A\u0627 \u0645\u0633\u062A\u0643\u0634\u0641 \u0627\u0644\u0639\u0631\u0628\u064A\u0629!"}</h3><p>\u0623\u0643\u0645\u0644\u062A \u0645\u063A\u0627\u0645\u0631\u0629 \xAB${ne[a]}\xBB \u0648\u062C\u0645\u0639\u062A ${v(i)} \u0646\u062C\u0648\u0645.<br>\u0643\u0644 \u0645\u062D\u0627\u0648\u0644\u0629 \u062A\u0642\u0631\u0651\u0628\u0643 \u0645\u0646 \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0628\u062B\u0642\u0629.</p><div class="ab-result-stars" aria-label="${v(i)} \u0645\u0646 \u062E\u0645\u0633 \u0646\u062C\u0648\u0645"><span aria-hidden="true">${"\u2605".repeat(i)}${"\u2606".repeat(5 - i)}</span></div><button type="button" class="primary-button" data-ab-action="restart">\u0646\u062C\u0631\u0651\u0628 \u0645\u063A\u0627\u0645\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u21BB</button></section>`),
        u({ stars: i, summary: fa[a] }),
        m('[data-ab-action="restart"]'));
    }
    function E() {
      ((r = {
        rounds: S(),
        round: 0,
        firstCorrect: 0,
        solved: !1,
        finished: !1,
      }),
        H());
    }
    function O(i) {
      if (d) return;
      let s = i.target.closest?.("button");
      if (!s || !e.contains(s) || s.disabled) return;
      let c = s.dataset.abAction;
      if (c === "restart") {
        E();
        return;
      }
      r.finished ||
        (s.hasAttribute("data-ab-choice")
          ? j(s)
          : c === "letter-audio"
            ? g(r.rounds[r.round].letter.index, "name")
            : c === "word-audio"
              ? g(r.rounds[r.round].target.index, "word")
              : s.hasAttribute("data-ab-chip") && !r.solved
                ? (r.selected.push(Number(s.dataset.abChip)), R(), h("tap"))
                : c === "undo" && !r.solved
                  ? (r.selected.pop(), R(), h("tap"))
                  : c === "clear" && !r.solved
                    ? ((r.selected = []), R(), h("tap"))
                    : c === "check"
                      ? $()
                      : c === "next" &&
                        r.solved &&
                        (r.round < 4
                          ? (r.round++,
                            H(),
                            m(q ? "[data-ab-chip]" : "[data-ab-choice]"))
                          : T()));
    }
    return (
      e.addEventListener("click", O),
      Object.hasOwn(ne, a)
        ? E()
        : (e.innerHTML =
            '<p class="ab-status" role="status">\u0627\u062E\u062A\u0631 \u0645\u063A\u0627\u0645\u0631\u0629 \u0623\u062E\u0631\u0649 \u0645\u0646 \u0645\u0633\u0627\u0631 \u0627\u0644\u062A\u0639\u0644\u0651\u0645.</p>'),
      () => {
        ((d = !0), e.removeEventListener("click", O));
      }
    );
  }
  var ha = [
      {
        id: "sentence-01",
        text: "\u0623\u064E\u0646\u064E\u0627 \u0623\u064F\u062D\u0650\u0628\u0651\u064F \u0627\u0644\u0652\u0642\u0650\u0631\u064E\u0627\u0621\u064E\u0629\u064E.",
        emoji: "\u{1F4DA}",
      },
      {
        id: "sentence-02",
        text: "\u062A\u064E\u0634\u0652\u0631\u064E\u0628\u064F \u0627\u0644\u0652\u0642\u0650\u0637\u0651\u064E\u0629\u064F \u0627\u0644\u0652\u062D\u064E\u0644\u0650\u064A\u0628\u064E.",
        emoji: "\u{1F408} \u{1F95B}",
      },
      {
        id: "sentence-03",
        text: "\u064A\u064E\u0644\u0652\u0639\u064E\u0628\u064F \u0639\u064F\u0645\u064E\u0631\u064F \u0641\u0650\u064A \u0627\u0644\u0652\u062D\u064E\u062F\u0650\u064A\u0642\u064E\u0629\u0650.",
        emoji: "\u{1F9D2} \u{1F333}",
      },
      {
        id: "sentence-04",
        text: "\u0627\u0644\u0652\u0643\u0650\u062A\u064E\u0627\u0628\u064F \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0637\u0651\u064E\u0627\u0648\u0650\u0644\u064E\u0629\u0650.",
        emoji: "\u{1F4D5}",
      },
      {
        id: "sentence-05",
        text: "\u062A\u064E\u0633\u0652\u0642\u0650\u064A \u0644\u064E\u064A\u0652\u0644\u064E\u0649 \u0627\u0644\u0632\u0651\u064E\u0647\u0652\u0631\u064E\u0629\u064E.",
        emoji: "\u{1F467} \u{1F337}",
      },
    ].map((e) => ({
      ...e,
      words: e.text.replace(/[.،؟!]$/u, "").split(" "),
      file: `audio/reading/${e.id}.mp3`,
    })),
    ma = [
      {
        id: "passage-01",
        text: "\u062E\u064E\u0631\u064E\u062C\u064E \u0633\u064E\u0627\u0645\u0650\u064A \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0652\u062D\u064E\u062F\u0650\u064A\u0642\u064E\u0629\u0650. \u0631\u064E\u0623\u064E\u0649 \u0641\u064E\u0631\u064E\u0627\u0634\u064E\u0629\u064B \u062C\u064E\u0645\u0650\u064A\u0644\u064E\u0629\u064B.",
        emoji: "\u{1F333} \u{1F98B}",
        question:
          "\u0645\u064E\u0627\u0630\u064E\u0627 \u0631\u064E\u0623\u064E\u0649 \u0633\u064E\u0627\u0645\u0650\u064A \u0641\u0650\u064A \u0627\u0644\u0652\u062D\u064E\u062F\u0650\u064A\u0642\u064E\u0629\u0650\u061F",
        answers: [
          "\u0641\u064E\u0631\u064E\u0627\u0634\u064E\u0629\u064B",
          "\u0643\u064F\u0631\u064E\u0629\u064B",
          "\u0642\u0650\u0637\u0651\u064E\u0629\u064B",
        ],
      },
      {
        id: "passage-02",
        text: "\u062C\u064E\u0644\u064E\u0633\u064E\u062A\u0652 \u0644\u064E\u064A\u0652\u0644\u064E\u0649 \u062A\u064E\u062D\u0652\u062A\u064E \u0627\u0644\u0634\u0651\u064E\u062C\u064E\u0631\u064E\u0629\u0650. \u0642\u064E\u0631\u064E\u0623\u064E\u062A\u0652 \u0642\u0650\u0635\u0651\u064E\u0629\u064B \u0642\u064E\u0635\u0650\u064A\u0631\u064E\u0629\u064B.",
        emoji: "\u{1F467} \u{1F4D6}",
        question:
          "\u0623\u064E\u064A\u0652\u0646\u064E \u062C\u064E\u0644\u064E\u0633\u064E\u062A\u0652 \u0644\u064E\u064A\u0652\u0644\u064E\u0649\u061F",
        answers: [
          "\u062A\u064E\u062D\u0652\u062A\u064E \u0627\u0644\u0634\u0651\u064E\u062C\u064E\u0631\u064E\u0629\u0650",
          "\u0641\u0650\u064A \u0627\u0644\u0652\u0645\u064E\u0643\u0652\u062A\u064E\u0628\u064E\u0629\u0650",
          "\u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0633\u0651\u064E\u0631\u0650\u064A\u0631\u0650",
        ],
      },
      {
        id: "passage-03",
        text: "\u0639\u0650\u0646\u0652\u062F\u064E \u0645\u064E\u0631\u0652\u064A\u064E\u0645\u064E \u0642\u0650\u0637\u0651\u064E\u0629\u064C \u0635\u064E\u063A\u0650\u064A\u0631\u064E\u0629\u064C. \u0642\u064E\u062F\u0651\u064E\u0645\u064E\u062A\u0652 \u0644\u064E\u0647\u064E\u0627 \u0627\u0644\u0652\u0645\u064E\u0627\u0621\u064E.",
        emoji: "\u{1F408} \u{1F4A7}",
        question:
          "\u0645\u064E\u0627\u0630\u064E\u0627 \u0642\u064E\u062F\u0651\u064E\u0645\u064E\u062A\u0652 \u0645\u064E\u0631\u0652\u064A\u064E\u0645\u064F \u0644\u0650\u0642\u0650\u0637\u0651\u064E\u062A\u0650\u0647\u064E\u0627\u061F",
        answers: [
          "\u0627\u0644\u0652\u0645\u064E\u0627\u0621\u064E",
          "\u0627\u0644\u0652\u062E\u064F\u0628\u0652\u0632\u064E",
          "\u0627\u0644\u0644\u0651\u064F\u0639\u0652\u0628\u064E\u0629\u064E",
        ],
      },
      {
        id: "passage-04",
        text: "\u0630\u064E\u0647\u064E\u0628\u064E \u0639\u064F\u0645\u064E\u0631\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0652\u0645\u064E\u0643\u0652\u062A\u064E\u0628\u064E\u0629\u0650. \u0627\u0633\u0652\u062A\u064E\u0639\u064E\u0627\u0631\u064E \u0643\u0650\u062A\u064E\u0627\u0628\u064B\u0627 \u0639\u064E\u0646\u0650 \u0627\u0644\u0652\u062D\u064E\u064A\u064E\u0648\u064E\u0627\u0646\u064E\u0627\u062A\u0650.",
        emoji: "\u{1F4DA} \u{1F992}",
        question:
          "\u0639\u064E\u0646\u0652 \u0645\u064E\u0627\u0630\u064E\u0627 \u0643\u064E\u0627\u0646\u064E \u0627\u0644\u0652\u0643\u0650\u062A\u064E\u0627\u0628\u064F\u061F",
        answers: [
          "\u0639\u064E\u0646\u0650 \u0627\u0644\u0652\u062D\u064E\u064A\u064E\u0648\u064E\u0627\u0646\u064E\u0627\u062A\u0650",
          "\u0639\u064E\u0646\u0650 \u0627\u0644\u0652\u0623\u064E\u0644\u0652\u0648\u064E\u0627\u0646\u0650",
          "\u0639\u064E\u0646\u0650 \u0627\u0644\u0652\u0628\u0650\u062D\u064E\u0627\u0631\u0650",
        ],
      },
      {
        id: "passage-05",
        text: "\u0633\u064E\u0642\u064E\u0637\u064E \u0627\u0644\u0652\u0645\u064E\u0637\u064E\u0631\u064F \u0635\u064E\u0628\u064E\u0627\u062D\u064B\u0627. \u062D\u064E\u0645\u064E\u0644\u064E\u062A\u0652 \u0633\u064E\u0627\u0631\u064E\u0629\u064F \u0645\u0650\u0638\u064E\u0644\u0651\u064E\u0629\u064B \u0632\u064E\u0631\u0652\u0642\u064E\u0627\u0621\u064E.",
        emoji: "\u{1F327}\uFE0F \u2602\uFE0F",
        question:
          "\u0645\u064E\u0627 \u0644\u064E\u0648\u0652\u0646\u064F \u0645\u0650\u0638\u064E\u0644\u0651\u064E\u0629\u0650 \u0633\u064E\u0627\u0631\u064E\u0629\u064E\u061F",
        answers: [
          "\u0632\u064E\u0631\u0652\u0642\u064E\u0627\u0621\u064F",
          "\u062D\u064E\u0645\u0652\u0631\u064E\u0627\u0621\u064F",
          "\u0635\u064E\u0641\u0652\u0631\u064E\u0627\u0621\u064F",
        ],
      },
    ].map((e) => ({ ...e, file: `audio/reading/${e.id}.mp3` }));
  function Ge(
    e,
    a,
    {
      onComplete: u = () => {},
      onFeedback: h = () => {},
      onSpeak: g = () => {},
      onPrompt: M = () => {},
      isMuted: n = () => !1,
    } = {},
  ) {
    if (!["sentence-builder", "reading-detective"].includes(a))
      throw new Error("Unknown Arabic reading game");
    let d = !1,
      r,
      k = (s) => e.querySelector(s),
      m = (s) => k(s)?.focus({ preventScroll: !0 }),
      A = (s, c = "") => {
        let w = k("[data-ar-status]");
        w && ((w.textContent = s), (w.className = `ar-status ${c}`));
      },
      q =
        a === "sentence-builder"
          ? "\u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u062C\u0645\u0644\u0629"
          : "\u0627\u0644\u0645\u062D\u0642\u0651\u0642 \u0627\u0644\u0642\u0627\u0631\u0626",
      S =
        a === "sentence-builder"
          ? "\u0627\u0633\u0645\u0639 \u0627\u0644\u062C\u0645\u0644\u0629"
          : "\u0627\u0633\u0645\u0639 \u0627\u0644\u0641\u0642\u0631\u0629",
      _ = () => {
        d || r.finished || M(r.items[r.round].file);
      };
    function z() {
      ((r = {
        items: L(a === "sentence-builder" ? ha : ma),
        round: 0,
        firstCorrect: 0,
        finished: !1,
        reported: !1,
      }),
        j());
    }
    function H() {
      return `<div class="ar-topline"><span>\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u062E\u0627\u0645\u0633 \xB7 ${q}</span><span>\u0627\u0644\u062A\u062D\u062F\u0651\u064A ${v(r.round + 1)} \u0645\u0646 \u0665</span></div><div class="ar-track" role="progressbar" aria-label="\u0627\u0644\u062A\u062D\u062F\u064A\u0627\u062A \u0627\u0644\u0645\u0643\u062A\u0645\u0644\u0629" aria-valuemin="0" aria-valuemax="5" aria-valuenow="${r.round}"><span style="width:${(r.round / 5) * 100}%"></span></div>`;
    }
    function l() {
      return `<button type="button" class="secondary-button ar-listen" data-ar-action="listen"><span aria-hidden="true">\u266B</span>${S}</button>`;
    }
    function j() {
      ((r.solved = !1),
        (r.firstTry = !0),
        (r.selected = []),
        (r.wrong = new Set()));
      let s = r.items[r.round];
      a === "sentence-builder"
        ? ((r.chips = L(s.words.map((c, w) => ({ text: c, index: w })))),
          r.chips.every((c, w) => c.text === s.words[w]) &&
            r.chips.push(r.chips.shift()),
          (e.innerHTML = `<section class="ar-game ar-sentence" dir="rtl" aria-label="\u0631\u062A\u0651\u0628 \u0627\u0644\u062C\u0645\u0644\u0629 \u0645\u062B\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C">${H()}<div class="ar-illustration" aria-hidden="true">${s.emoji}</div><h3>\u0646\u0642\u0631\u0623\u060C \u062B\u0645 \u0646\u0631\u062A\u0651\u0628 \u0645\u062B\u0644 \u0627\u0644\u062C\u0645\u0644\u0629</h3><p class="ar-instruction">\u0627\u0646\u0638\u0631 \u0625\u0644\u0649 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u060C \u062B\u0645 \u0627\u0636\u063A\u0637 \u0627\u0644\u0643\u0644\u0645\u0627\u062A \u0628\u0627\u0644\u062A\u0631\u062A\u064A\u0628 \u0645\u0646 \u0627\u0644\u064A\u0645\u064A\u0646 \u0625\u0644\u0649 \u0627\u0644\u064A\u0633\u0627\u0631.</p><div class="ar-model"><span>\u0627\u0644\u062C\u0645\u0644\u0629 \u0627\u0644\u062A\u064A \u0646\u062A\u0639\u0644\u0651\u0645\u0647\u0627</span><p data-ar-model>${s.text}</p>${l()}</div><div class="ar-slots" dir="rtl" aria-label="\u062A\u0631\u062A\u064A\u0628 \u0643\u0644\u0645\u0627\u062A \u0627\u0644\u062C\u0645\u0644\u0629">${s.words.map((c, w) => `<span class="ar-slot" data-ar-slot="${w}" aria-label="\u0645\u0643\u0627\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 ${v(w + 1)}"></span>`).join("")}</div><div class="ar-chips" dir="rtl" aria-label="\u0627\u0644\u0643\u0644\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629">${r.chips.map((c, w) => `<button type="button" class="ar-chip" data-ar-chip="${w}">${c.text}</button>`).join("")}</div><div class="ar-tools"><button type="button" class="ar-quiet" data-ar-action="undo" disabled>\u21B6 \u062A\u0631\u0627\u062C\u0639 \u0639\u0646 \u0643\u0644\u0645\u0629</button><button type="button" class="ar-quiet" data-ar-action="clear" disabled>\u0631\u062A\u0651\u0628 \u0645\u0646 \u062C\u062F\u064A\u062F</button></div><p class="ar-status" role="status" data-ar-status>\u0627\u0644\u062C\u0645\u0644\u0629 \u0623\u0645\u0627\u0645\u0643 \u0644\u062A\u0633\u0627\u0639\u062F\u0643. \u062E\u0630 \u0648\u0642\u062A\u0643 \u2661</p><button type="button" class="primary-button" data-ar-action="check" disabled>\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u062C\u0645\u0644\u0629 \u2713</button><button type="button" class="primary-button" data-ar-action="next" hidden>${r.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u062C\u0645\u0644\u0629 \u062C\u062F\u064A\u062F\u0629 \u2190"}</button></section>`))
        : ((r.answers = L(
            s.answers.map((c, w) => ({ text: c, correct: w === 0 })),
          )),
          (e.innerHTML = `<section class="ar-game ar-detective" dir="rtl" aria-label="\u0627\u0642\u0631\u0623 \u0648\u0627\u0641\u0647\u0645">${H()}<div class="ar-illustration" aria-hidden="true">${s.emoji}</div><h3>\u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0629 \u0645\u062E\u062A\u0628\u0626\u0629 \u0628\u064A\u0646 \u0627\u0644\u0643\u0644\u0645\u0627\u062A!</h3><p class="ar-instruction">\u0627\u0642\u0631\u0623 \u0627\u0644\u0641\u0642\u0631\u0629\u060C \u062B\u0645 \u0627\u0628\u062D\u062B \u0641\u064A\u0647\u0627 \u0639\u0646 \u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0633\u0624\u0627\u0644. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0639 \u0623\u064A\u0636\u064B\u0627.</p><div class="ar-passage"><p data-ar-passage>${s.text}</p>${l()}</div><h4 class="ar-question" data-ar-question>${s.question}</h4><div class="ar-answers" aria-label="\u0627\u062E\u062A\u0631 \u0627\u0644\u0625\u062C\u0627\u0628\u0629">${r.answers.map((c, w) => `<button type="button" class="ar-answer" data-ar-answer="${w}"><span>${c.text}</span><i class="ar-answer-mark" aria-hidden="true"></i></button>`).join("")}</div><p class="ar-status" role="status" data-ar-status>\u0639\u062F \u0625\u0644\u0649 \u0627\u0644\u0641\u0642\u0631\u0629 \u0643\u0644\u0651\u0645\u0627 \u0627\u062D\u062A\u062C\u062A. \u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0627\u0643\u062A\u0634\u0627\u0641!</p><button type="button" class="primary-button" data-ar-action="next" hidden>${r.round === 4 ? "\u0634\u0627\u0647\u062F \u0625\u0646\u062C\u0627\u0632\u0643 \u2726" : "\u0641\u0642\u0631\u0629 \u062C\u062F\u064A\u062F\u0629 \u2190"}</button></section>`));
    }
    function R() {
      (e.querySelectorAll("[data-ar-slot]").forEach((s, c) => {
        let w = r.chips[r.selected[c]];
        ((s.textContent = w?.text || ""),
          s.classList.toggle("ar-filled", !!w),
          s.setAttribute(
            "aria-label",
            w
              ? w.text
              : `\u0645\u0643\u0627\u0646 \u0627\u0644\u0643\u0644\u0645\u0629 ${v(c + 1)}`,
          ));
      }),
        e
          .querySelectorAll("[data-ar-chip]")
          .forEach(
            (s) => (s.disabled = r.selected.includes(Number(s.dataset.arChip))),
          ),
        (k('[data-ar-action="undo"]').disabled = !r.selected.length),
        (k('[data-ar-action="clear"]').disabled = !r.selected.length),
        (k('[data-ar-action="check"]').disabled =
          r.selected.length !== r.chips.length),
        k(".ar-slots").classList.remove("ar-slots-wrong"),
        A(
          r.selected.length === r.chips.length
            ? "\u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u062A\u0631\u062A\u064A\u0628! \u0644\u0646\u062A\u062D\u0642\u0651\u0642 \u0645\u0646 \u0627\u0644\u062C\u0645\u0644\u0629."
            : "\u062C\u0645\u064A\u0644! \u0623\u0643\u0645\u0644 \u062A\u0631\u062A\u064A\u0628 \u0628\u0642\u064A\u0629 \u0627\u0644\u0643\u0644\u0645\u0627\u062A.",
        ));
    }
    function $() {
      ((r.solved = !0),
        r.firstTry && r.firstCorrect++,
        r.round < 4 && h("correct"));
      let s = k('[data-ar-action="next"]');
      ((s.hidden = !1), m('[data-ar-action="next"]'));
    }
    function T() {
      if (r.solved || r.selected.length !== r.chips.length) return;
      let s = r.items[r.round];
      if (!r.selected.every((w, o) => r.chips[w].text === s.words[o])) {
        ((r.firstTry = !1),
          k(".ar-slots").classList.add("ar-slots-wrong"),
          A(
            "\u0627\u0644\u0643\u0644\u0645\u0627\u062A \u062C\u0645\u064A\u0644\u0629\u060C \u0644\u0643\u0646 \u062A\u0631\u062A\u064A\u0628\u0647\u0627 \u0645\u062E\u062A\u0644\u0641 \u0639\u0646 \u0627\u0644\u0646\u0645\u0648\u0630\u062C. \u062C\u0631\u0651\u0628 \u0627\u0644\u062A\u0631\u0627\u062C\u0639 \u0623\u0648 \u0627\u0628\u062F\u0623 \u0645\u0646 \u062C\u062F\u064A\u062F.",
            "ar-gentle",
          ),
          h("retry"));
        return;
      }
      (e
        .querySelectorAll(
          '[data-ar-chip],[data-ar-action="undo"],[data-ar-action="clear"]',
        )
        .forEach((w) => (w.disabled = !0)),
        k(".ar-slots").classList.add("ar-slots-correct"),
        (k('[data-ar-action="check"]').hidden = !0),
        A(
          "\u2713 \u0623\u062D\u0633\u0646\u062A! \u0631\u062A\u0651\u0628\u062A \u0627\u0644\u062C\u0645\u0644\u0629 \u0645\u062B\u0644 \u0627\u0644\u0646\u0645\u0648\u0630\u062C\u060C \u0648\u0642\u0631\u0623\u062A \u0643\u0644\u0645\u0627\u062A\u0647\u0627.",
          "ar-good",
        ),
        $());
    }
    function E(s) {
      if (r.solved || s.disabled) return;
      let c = Number(s.dataset.arAnswer);
      if (!r.answers[c].correct) {
        ((r.firstTry = !1),
          r.wrong.add(c),
          (s.disabled = !0),
          s.classList.add("ar-answer-wrong"),
          (s.querySelector("i").textContent = "\u21BB"),
          A(
            "\u0646\u0642\u0631\u0623 \u0627\u0644\u0641\u0642\u0631\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649 \u0628\u0647\u062F\u0648\u0621\u060C \u062B\u0645 \u0646\u062E\u062A\u0627\u0631 \u0625\u062C\u0627\u0628\u0629 \u0623\u062E\u0631\u0649.",
            "ar-gentle",
          ),
          h("retry"));
        return;
      }
      (s.classList.add("ar-answer-correct"),
        (s.querySelector("i").textContent = "\u2713"),
        e
          .querySelectorAll("[data-ar-answer]")
          .forEach((o) => (o.disabled = !0)),
        A(
          "\u2713 \u0627\u0643\u062A\u0634\u0641\u062A \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0628\u064A\u0646 \u0627\u0644\u0643\u0644\u0645\u0627\u062A. \u064A\u0627 \u0644\u0643 \u0645\u0646 \u0642\u0627\u0631\u0626 \u0645\u0646\u062A\u0628\u0647!",
          "ar-good",
        ),
        $());
    }
    function O() {
      if (r.finished) return;
      r.finished = !0;
      let s = Math.max(1, r.firstCorrect);
      ((e.innerHTML = `<section class="ar-game ar-result" dir="rtl"><span class="ar-result-art" aria-hidden="true">${a === "sentence-builder" ? "\u{1F4DA}" : "\u{1F50E}"}</span><span class="ar-result-kicker">\u062E\u0645\u0633 \u062E\u0637\u0648\u0627\u062A \u0641\u064A \u0639\u0627\u0644\u0645 \u0627\u0644\u0642\u0631\u0627\u0621\u0629</span><h3>${a === "sentence-builder" ? "\u0623\u0646\u062A \u0645\u0647\u0646\u062F\u0633 \u0627\u0644\u062C\u0645\u0644!" : "\u0623\u0646\u062A \u0642\u0627\u0631\u0626 \u064A\u0644\u0627\u062D\u0638 \u0648\u064A\u0641\u0647\u0645!"}</h3><p>\u0623\u0643\u0645\u0644\u062A \u062E\u0645\u0633\u0629 \u062A\u062D\u062F\u0651\u064A\u0627\u062A\u060C \u0648\u062C\u0645\u0639\u062A ${v(s)} \u0646\u062C\u0648\u0645.<br>\u0627\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0648\u0627\u0644\u0642\u0631\u0627\u0621\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649 \u062A\u0633\u0627\u0639\u062F\u0627\u0646\u0646\u0627 \u0639\u0644\u0649 \u0627\u0644\u062A\u0639\u0644\u0651\u0645.</p><div class="ar-result-stars" aria-label="${v(s)} \u0645\u0646 \u062E\u0645\u0633 \u0646\u062C\u0648\u0645"><span aria-hidden="true">${"\u2605".repeat(s)}${"\u2606".repeat(5 - s)}</span></div><button type="button" class="primary-button" data-ar-action="restart">\u0646\u0642\u0631\u0623 \u0648\u0646\u0643\u062A\u0634\u0641 \u0645\u0646 \u062C\u062F\u064A\u062F \u21BB</button></section>`),
        r.reported ||
          ((r.reported = !0),
          u({
            stars: s,
            summary:
              a === "sentence-builder"
                ? "\u062A\u0631\u062A\u064A\u0628 \u062E\u0645\u0633 \u062C\u0645\u0644 \u0639\u0631\u0628\u064A\u0629"
                : "\u0642\u0631\u0627\u0621\u0629 \u062E\u0645\u0633 \u0641\u0642\u0631\u0627\u062A \u0648\u0641\u0647\u0645 \u0645\u0639\u0646\u0627\u0647\u0627",
          })),
        m('[data-ar-action="restart"]'));
    }
    function i(s) {
      if (d) return;
      let c = s.target.closest("button");
      if (!c || !e.contains(c) || c.disabled) return;
      let w = c.dataset.arAction;
      if (w === "restart") {
        (h("tap"), z(), m("[data-ar-chip],[data-ar-answer]"));
        return;
      }
      if (!r.finished) {
        if (w === "listen") {
          _();
          return;
        }
        if (w === "next" && r.solved) {
          r.round < 4
            ? (r.round++, j(), m("[data-ar-chip],[data-ar-answer]"))
            : O();
          return;
        }
        r.solved ||
          (c.hasAttribute("data-ar-chip") &&
            (r.selected.push(Number(c.dataset.arChip)), R(), h("tap")),
          w === "undo" &&
            r.selected.length &&
            (r.selected.pop(), R(), h("tap")),
          w === "clear" &&
            r.selected.length &&
            ((r.selected = []), R(), h("tap")),
          w === "check" && T(),
          c.hasAttribute("data-ar-answer") && E(c));
      }
    }
    return (
      e.addEventListener("click", i),
      z(),
      () => {
        ((d = !0), e.removeEventListener("click", i));
      }
    );
  }
  var he = new WeakMap(),
    Ue = (e) => e === "dark" || e === "light";
  function Be({ document: e = globalThis.document, storage: a } = {}) {
    if (!e) return { destroy() {} };
    he.get(e)?.destroy();
    let u = e.defaultView || globalThis,
      h = a;
    if (h === void 0)
      try {
        h = u.ServerStore;
      } catch {}
    let g = u.matchMedia?.("(prefers-color-scheme: dark)"),
      M = null;
    try {
      let q = h?.getItem("hurufi-theme");
      Ue(q) && (M = q);
    } catch {}
    function n(q) {
      let S = q === "dark";
      ((e.documentElement.dataset.theme = q),
        (e.documentElement.style.colorScheme = q));
      let _ = e.querySelector('meta[name="theme-color"]');
      (_ && (_.content = S ? "#121a24" : "#f7faf8"),
        e.querySelectorAll("[data-theme-toggle]").forEach((z) => {
          let H = S
            ? "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D"
            : "\u062A\u0641\u0639\u064A\u0644 \u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646";
          (z.setAttribute("aria-pressed", String(S)),
            z.setAttribute("aria-label", H),
            (z.title = H));
          let l = z.querySelector("[data-theme-icon]");
          (l ||
            ((l = e.createElement("span")),
            (l.dataset.themeIcon = ""),
            l.setAttribute("aria-hidden", "true"),
            z.prepend(l)),
            (l.textContent = S ? "\u2600" : "\u263E"));
          let j = z.querySelector("[data-theme-label]");
          j && (j.textContent = H);
        }));
    }
    let d = () => (g?.matches ? "dark" : "light"),
      r = (q) => {
        let S = q.target.closest?.("[data-theme-toggle]");
        if (!(!S || S.disabled)) {
          (q.preventDefault(),
            (M =
              e.documentElement.dataset.theme === "dark" ? "light" : "dark"));
          try {
            h?.setItem("hurufi-theme", M);
          } catch {}
          n(M);
        }
      },
      k = () => {
        M || n(d());
      },
      m = (q) => {
        (q.key !== "hurufi-theme" && q.key !== null) ||
          ((M = Ue(q.newValue) ? q.newValue : null), n(M || d()));
      };
    (e.addEventListener("click", r),
      u.addEventListener?.("athar:settings", m),
      g?.addEventListener
        ? g.addEventListener("change", k)
        : g?.addListener?.(k),
      n(M || d()));
    let A = {
      destroy() {
        (e.removeEventListener("click", r),
          u.removeEventListener?.("athar:settings", m),
          g?.removeEventListener
            ? g.removeEventListener("change", k)
            : g?.removeListener?.(k),
          he.get(e) === A && he.delete(e));
      },
    };
    return (he.set(e, A), A);
  }
  Be();
  var C = (e) => document.getElementById(e),
    me = {
      arabic:
        "\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629",
      quran:
        "\u0627\u0644\u0642\u0631\u0622\u0646 \u0627\u0644\u0643\u0631\u064A\u0645",
      noor: "نور البيان",
      thinking: "\u0623\u0631\u0642\u0627\u0645 \u0648\u0630\u0643\u0627\u0621",
      fun: "\u0623\u0644\u0639\u0627\u0628 \u0648\u0645\u0631\u062D",
    },
    ae = [
      {
        id: "letters",
        title:
          "\u062D\u062F\u064A\u0642\u0629 \u0627\u0644\u062D\u0631\u0648\u0641",
        description:
          "\u0646\u0643\u062A\u0634\u0641 \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0640\u0662\u0668\u060C \u0648\u0646\u0633\u0645\u0639 \u0623\u0633\u0645\u0627\u0621\u0647\u0627 \u0648\u0643\u0644\u0645\u0627\u062A\u0647\u0627.",
        category: "arabic",
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F524}",
        art: "letters",
        bg: "#f7ead9",
        ink: "#bca078",
        href: "letters.html#learn",
        badge: "\u0627\u0628\u062F\u0623 \u0645\u0646 \u0647\u0646\u0627",
      },
      {
        id: "quran-order",
        title: "\u0631\u062A\u0651\u0628 \u0627\u0644\u0622\u064A\u0627\u062A",
        description:
          "\u0627\u0642\u0631\u0623 \u0648\u062A\u0630\u0643\u0651\u0631\u060C \u062B\u0645 \u0631\u062A\u0651\u0628 \u0622\u064A\u0627\u062A \u0627\u0644\u0633\u0648\u0631\u0629 \u062E\u0637\u0648\u0629 \u0628\u062E\u0637\u0648\u0629.",
        category: "quran",
        age: "\u0665\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F4D6}",
        art: "book",
        bg: "#e8f0e2",
        ink: "#8ca17f",
        badge: "\u0645\u0639 \u0627\u0644\u0642\u0631\u0622\u0646",
      },
      {
        id: "memory",
        title:
          "\u0630\u0627\u0643\u0631\u0629 \u0627\u0644\u062D\u0631\u0648\u0641",
        description:
          "\u0627\u0642\u0644\u0628 \u0627\u0644\u0628\u0637\u0627\u0642\u0627\u062A\u060C \u0648\u0627\u0639\u062B\u0631 \u0639\u0644\u0649 \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0645\u062A\u0634\u0627\u0628\u0647\u0629.",
        category: "arabic",
        age: "\u0664\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F9E9}",
        art: "memory",
        bg: "#eee8f5",
        ink: "#a48dbd",
        badge: "\u0645\u0631\u0651\u0646 \u0630\u0627\u0643\u0631\u062A\u0643",
      },
      {
        id: "listen",
        title: "\u0627\u0633\u0645\u0639 \u0648\u0627\u062E\u062A\u0631",
        description:
          "\u0623\u064E\u0635\u063A\u0650 \u0625\u0644\u0649 \u0627\u0644\u062D\u0631\u0641\u060C \u0648\u0627\u0639\u062B\u0631 \u0639\u0644\u064A\u0647 \u0628\u064A\u0646 \u0623\u0635\u062F\u0642\u0627\u0626\u0647.",
        category: "arabic",
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F3A7}",
        art: "listen",
        bg: "#faf0dd",
        ink: "#bc9a65",
        href: "letters.html#play",
        badge: "\u0628\u0627\u0644\u0635\u0648\u062A",
      },
      {
        id: "words",
        title: "\u0643\u0648\u0651\u0646 \u0627\u0644\u0643\u0644\u0645\u0629",
        description:
          "\u0627\u062C\u0645\u0639 \u0627\u0644\u062D\u0631\u0648\u0641\u060C \u0644\u062A\u0643\u062A\u0634\u0641 \u0643\u0644\u0645\u0629 \u0648\u0635\u0648\u0631\u0629 \u062C\u062F\u064A\u062F\u0629.",
        category: "arabic",
        age: "\u0665\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F34B}",
        art: "words",
        bg: "#f7eddb",
        ink: "#baa273",
        badge: "\u0627\u0642\u0631\u0623 \u0648\u0627\u0643\u062A\u0634\u0641",
      },
      {
        id: "quran-complete",
        title: "\u0623\u0643\u0645\u0644 \u0627\u0644\u0633\u0648\u0631\u0629",
        description:
          "\u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u0622\u064A\u0627\u062A\u060C \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0622\u064A\u0629 \u0627\u0644\u062A\u064A \u062A\u0643\u0645\u0644 \u0627\u0644\u0633\u0648\u0631\u0629.",
        category: "quran",
        age: "\u0665\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F319}",
        art: "ayahs",
        bg: "#ecf1df",
        ink: "#9ba774",
        badge:
          "\u062A\u0630\u0643\u0651\u0631 \u0648\u062A\u0639\u0644\u0651\u0645",
      },
      {
        id: "balloons",
        title:
          "\u0628\u0627\u0644\u0648\u0646\u0627\u062A \u0627\u0644\u062D\u0631\u0648\u0641",
        description:
          "\u0623\u064A\u0646 \u0627\u062E\u062A\u0628\u0623 \u0627\u0644\u062D\u0631\u0641\u061F \u0627\u0639\u062B\u0631 \u0639\u0644\u064A\u0647 \u0628\u064A\u0646 \u0627\u0644\u0628\u0627\u0644\u0648\u0646\u0627\u062A!",
        category: "fun",
        age: "\u0664\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F388}",
        art: "balloons",
        bg: "#f6e9ee",
        ink: "#bd96a5",
        badge: "\u0648\u0642\u062A \u0627\u0644\u0645\u0631\u062D",
      },
      {
        id: "counting",
        title:
          "\u0647\u064A\u0627 \u0646\u0639\u062F\u0651 \u0645\u0639\u064B\u0627",
        description:
          "\u0639\u062F\u0651 \u0627\u0644\u062B\u0645\u0627\u0631 \u0648\u0627\u0644\u0623\u0635\u062F\u0642\u0627\u0621\u060C \u0648\u0627\u062E\u062A\u0631 \u0627\u0644\u0639\u062F\u062F \u0627\u0644\u0635\u062D\u064A\u062D.",
        category: "thinking",
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F34E}",
        art: "counting",
        bg: "#eff1df",
        ink: "#a2ac7b",
        badge: "\u0623\u0631\u0642\u0627\u0645 \u0648\u0630\u0643\u0627\u0621",
      },
      {
        id: "xo",
        title: "\u062B\u0644\u0627\u062B\u0629 \u0639\u0644\u0649 \u062E\u0637",
        description:
          "\u0644\u0639\u0628\u0629 XO \u0645\u0639 \u0635\u062F\u064A\u0642\u0646\u0627 \u0627\u0644\u062D\u0627\u0633\u0648\u0628. \u0641\u0643\u0651\u0631 \u0641\u064A \u062E\u0637\u0648\u062A\u0643!",
        category: "fun",
        age: "\u0665\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u2B55",
        art: "xo",
        bg: "#ede9f5",
        ink: "#a492bd",
        badge: "\u0641\u0643\u0651\u0631 \u0648\u0627\u0644\u0639\u0628",
      },
      {
        id: "colors",
        title:
          "\u0623\u0644\u0648\u0627\u0646 \u0645\u0646 \u062D\u0648\u0644\u0646\u0627",
        description:
          "\u0646\u062A\u0639\u0631\u0651\u0641 \u0639\u0644\u0649 \u0627\u0644\u0623\u0644\u0648\u0627\u0646\u060C \u0648\u0646\u062C\u062F \u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0645\u0646\u0627\u0633\u0628 \u0641\u064A \u0643\u0644 \u062C\u0648\u0644\u0629.",
        category: "thinking",
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F3A8}",
        art: "colors",
        bg: "#f7e8ea",
        ink: "#bd929c",
        badge: "\u062C\u062F\u064A\u062F",
      },
      {
        id: "shapes",
        title:
          "\u0623\u0635\u062F\u0642\u0627\u0621 \u0627\u0644\u0623\u0634\u0643\u0627\u0644",
        description:
          "\u062F\u0627\u0626\u0631\u0629\u060C \u0645\u062B\u0644\u062B\u060C \u0623\u0645 \u0645\u0631\u0628\u0651\u0639\u061F \u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0634\u0643\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628.",
        category: "thinking",
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F53A}",
        art: "shapes",
        bg: "#e6edf7",
        ink: "#8ea3bd",
        badge: "\u062C\u062F\u064A\u062F",
      },
      {
        id: "addition",
        title: "\u062C\u0645\u0639 \u0627\u0644\u0641\u0648\u0627\u0643\u0647",
        description:
          "\u0646\u062C\u0645\u0639 \u0627\u0644\u062B\u0645\u0627\u0631 \u0641\u064A \u0633\u0644\u0651\u062A\u0646\u0627\u060C \u0648\u0646\u0643\u062A\u0634\u0641 \u0645\u062C\u0645\u0648\u0639\u0647\u0627 \u0645\u0639\u064B\u0627.",
        category: "thinking",
        age: "\u0665\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F353}",
        art: "addition",
        bg: "#f8eddf",
        ink: "#bfa17c",
        badge: "\u062C\u062F\u064A\u062F",
      },
      {
        id: "patterns",
        title: "\u0623\u0643\u0645\u0644 \u0627\u0644\u0646\u0645\u0637",
        description:
          "\u0644\u0627\u062D\u0638 \u0627\u0644\u062A\u0631\u062A\u064A\u0628\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0645\u0627 \u064A\u0623\u062A\u064A \u0628\u0639\u062F\u0647. \u0645\u0627 \u0627\u0644\u0633\u0631\u0651\u061F",
        category: "thinking",
        age: "\u0664\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F7E3}",
        art: "patterns",
        bg: "#efe8f7",
        ink: "#ab93bf",
        badge: "\u062C\u062F\u064A\u062F",
      },
      {
        id: "maze",
        title:
          "\u0645\u062A\u0627\u0647\u0629 \u0627\u0644\u0623\u0631\u0646\u0628",
        description:
          "\u0633\u0627\u0639\u062F \u0627\u0644\u0623\u0631\u0646\u0628 \u0644\u064A\u0635\u0644 \u0625\u0644\u0649 \u0627\u0644\u062C\u0632\u0631\u060C \u0648\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0637\u0631\u064A\u0642.",
        category: "fun",
        age: "\u0665\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F430}",
        art: "maze",
        bg: "#e8f1e2",
        ink: "#92aa7e",
        badge: "\u062C\u062F\u064A\u062F",
      },
      {
        id: "differences",
        title:
          "\u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A",
        description:
          "\u0635\u0648\u0631\u062A\u0627\u0646 \u0645\u062A\u0634\u0627\u0628\u0647\u062A\u0627\u0646\u2026 \u0647\u0644 \u062A\u062C\u062F \u0627\u0644\u0627\u062E\u062A\u0644\u0627\u0641\u0627\u062A \u0627\u0644\u062E\u0645\u0633\u0629\u061F",
        category: "fun",
        age: "\u0664\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F50E}",
        art: "differences",
        bg: "#eef0db",
        ink: "#a8ad7c",
        badge: "\u062C\u062F\u064A\u062F",
      },
      {
        id: "letter-hunt",
        title:
          "\u0635\u064A\u0651\u0627\u062F \u0627\u0644\u062D\u0631\u0648\u0641",
        description:
          "\u0627\u0628\u062D\u062B \u0628\u0639\u064A\u0646\u064A\u0643 \u0648\u0623\u0630\u0646\u064A\u0643 \u0639\u0646 \u0627\u0644\u062D\u0631\u0641 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u0628\u064A\u0646 \u0623\u0635\u062F\u0642\u0627\u0626\u0647.",
        category: "arabic",
        level: 1,
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F50E}",
        art: "hunt",
        bg: "#e9f1e5",
        ink: "#91a77b",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0661",
      },
      {
        id: "alphabet-train",
        title: "\u0642\u0637\u0627\u0631 \u0627\u0644\u062D\u0631\u0648\u0641",
        description:
          "\u0631\u062A\u0651\u0628 \u0639\u0631\u0628\u0627\u062A \u0627\u0644\u0642\u0637\u0627\u0631\u060C \u0648\u0627\u0643\u062A\u0634\u0641 \u062A\u0631\u062A\u064A\u0628 \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u0639\u0631\u0628\u064A\u0629.",
        category: "arabic",
        level: 1,
        age: "\u0664\u2013\u0667 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F682}",
        art: "train",
        bg: "#f7ecdf",
        ink: "#b5a071",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0661",
      },
      {
        id: "letter-forms",
        title:
          "\u0627\u0644\u062D\u0631\u0641 \u064A\u063A\u064A\u0651\u0631 \u0634\u0643\u0644\u0647",
        description:
          "\u0623\u0648\u0651\u0644 \u0627\u0644\u0643\u0644\u0645\u0629\u060C \u0648\u0633\u0637\u0647\u0627\u060C \u0623\u0645 \u0622\u062E\u0631\u0647\u0627\u061F \u0627\u0639\u0631\u0641 \u0627\u0644\u062D\u0631\u0641 \u0641\u064A \u0643\u0644 \u0645\u0648\u0636\u0639.",
        category: "arabic",
        level: 2,
        age: "\u0665\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u270D\uFE0F",
        art: "forms",
        bg: "#e8eef7",
        ink: "#91a2b8",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0662",
      },
      {
        id: "letter-dots",
        title: "\u0633\u0631\u0651 \u0627\u0644\u0646\u0642\u0627\u0637",
        description:
          "\u0646\u0642\u0637\u0629 \u0623\u0645 \u0646\u0642\u0637\u062A\u0627\u0646\u061F \u0627\u0643\u062A\u0634\u0641 \u0627\u0644\u062D\u0631\u0648\u0641 \u0627\u0644\u062A\u064A \u062A\u0646\u062A\u0645\u064A \u0644\u0644\u0639\u0627\u0626\u0644\u0629 \u0646\u0641\u0633\u0647\u0627.",
        category: "arabic",
        level: 2,
        age: "\u0665\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F535}",
        art: "dots",
        bg: "#eee9f7",
        ink: "#a18bbd",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0662",
      },
      {
        id: "vowel-match",
        title:
          "\u0623\u0635\u062F\u0642\u0627\u0621 \u0627\u0644\u062D\u0631\u0643\u0627\u062A",
        description:
          "\u0627\u0644\u0641\u062A\u062D\u0629 \u0648\u0627\u0644\u0643\u0633\u0631\u0629 \u0648\u0627\u0644\u0636\u0645\u0651\u0629: \u0627\u062E\u062A\u0631 \u0627\u0644\u062D\u0631\u0641 \u0645\u0639 \u0627\u0644\u062D\u0631\u0643\u0629 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629.",
        category: "arabic",
        level: 3,
        age: "\u0665\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F3B5}",
        art: "vowels",
        bg: "#f8e9e4",
        ink: "#b99589",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0663",
      },
      {
        id: "long-vowels",
        title: "\u062C\u0633\u0631 \u0627\u0644\u0645\u062F\u0648\u062F",
        description:
          "\u0646\u0645\u062F\u0651 \u0627\u0644\u0623\u0644\u0641 \u0648\u0627\u0644\u0648\u0627\u0648 \u0648\u0627\u0644\u064A\u0627\u0621\u060C \u0648\u0646\u0643\u062A\u0634\u0641 \u0627\u0644\u0645\u0642\u0627\u0637\u0639 \u0627\u0644\u0637\u0648\u064A\u0644\u0629.",
        category: "arabic",
        level: 3,
        age: "\u0665\u2013\u0668 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F309}",
        art: "long",
        bg: "#e7f1ec",
        ink: "#8cac9a",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0663",
      },
      {
        id: "syllable-builder",
        title:
          "\u0645\u0635\u0646\u0639 \u0627\u0644\u0645\u0642\u0627\u0637\u0639",
        description:
          "\u0631\u062A\u0651\u0628 \u0645\u0642\u0627\u0637\u0639 \u0645\u0643\u062A\u0648\u0628\u0629\u060C \u0648\u0627\u0628\u0646\u0650 \u0645\u0646\u0647\u0627 \u0643\u0644\u0645\u0629 \u0643\u0627\u0645\u0644\u0629.",
        category: "arabic",
        level: 4,
        age: "\u0666\u2013\u0669 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F9F1}",
        art: "syllables",
        bg: "#f7efdc",
        ink: "#b8a16d",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0664",
      },
      {
        id: "word-picture",
        title:
          "\u0627\u0644\u0643\u0644\u0645\u0629 \u0648\u0635\u0648\u0631\u062A\u0647\u0627",
        description:
          "\u062A\u0623\u0645\u0651\u0644 \u0627\u0644\u0635\u0648\u0631\u0629\u060C \u0648\u0627\u0642\u0631\u0623 \u0627\u0644\u0643\u0644\u0645\u0627\u062A\u060C \u062B\u0645 \u0627\u062E\u062A\u0631 \u0635\u062F\u064A\u0642\u062A\u0647\u0627.",
        category: "arabic",
        level: 4,
        age: "\u0666\u2013\u0669 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F981}",
        art: "picture",
        bg: "#f4e8ed",
        ink: "#b28fa2",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0664",
      },
      {
        id: "sentence-builder",
        title:
          "\u062D\u0643\u0627\u064A\u0629 \u0645\u0646 \u0643\u0644\u0645\u0627\u062A",
        description:
          "\u0631\u062A\u0651\u0628 \u0627\u0644\u0643\u0644\u0645\u0627\u062A \u0645\u062B\u0644 \u0627\u0644\u062C\u0645\u0644\u0629\u060C \u0648\u0627\u0642\u0631\u0623 \u062D\u0643\u0627\u064A\u062A\u0643 \u0627\u0644\u0635\u063A\u064A\u0631\u0629.",
        category: "arabic",
        level: 5,
        age: "\u0666\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F4DA}",
        art: "sentence",
        bg: "#e8edf6",
        ink: "#96a5bd",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0665",
      },
      {
        id: "reading-detective",
        title:
          "\u0645\u062D\u0642\u0651\u0642 \u0627\u0644\u0642\u0631\u0627\u0621\u0629",
        description:
          "\u0627\u0642\u0631\u0623 \u062D\u0643\u0627\u064A\u0629 \u0642\u0635\u064A\u0631\u0629\u060C \u0648\u0627\u0628\u062D\u062B \u0639\u0646 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0628\u064A\u0646 \u0633\u0637\u0648\u0631\u0647\u0627.",
        category: "arabic",
        level: 5,
        age: "\u0666\u2013\u0661\u0660 \u0633\u0646\u0648\u0627\u062A",
        emoji: "\u{1F575}\uFE0F",
        art: "detective",
        bg: "#eee9f6",
        ink: "#a58eb7",
        badge: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649 \u0665",
      },
    ];
  ae.push(...noorGameCards);
  for (let e of ae)
    (["letters", "listen", "memory"].includes(e.id) && (e.level = 1),
      e.id === "words" && (e.level = 4));
  var ve = [
      {
        id: 1,
        title:
          "\u0623\u0643\u062A\u0634\u0641 \u0627\u0644\u062D\u0631\u0648\u0641",
        skill:
          "\u0623\u0633\u0645\u0627\u0624\u0647\u0627 \u0648\u0623\u0635\u0648\u0627\u062A\u0647\u0627 \u0648\u062A\u0631\u062A\u064A\u0628\u0647\u0627",
        emoji: "\u{1F331}",
      },
      {
        id: 2,
        title:
          "\u0623\u0645\u064A\u0651\u0632 \u0634\u0643\u0644 \u0627\u0644\u062D\u0631\u0641",
        skill:
          "\u0627\u0644\u0645\u0648\u0627\u0636\u0639 \u0648\u0639\u0627\u0626\u0644\u0627\u062A \u0627\u0644\u0646\u0642\u0627\u0637",
        emoji: "\u{1F33F}",
      },
      {
        id: 3,
        title:
          "\u0623\u0641\u0647\u0645 \u0627\u0644\u062D\u0631\u0643\u0627\u062A \u0648\u0627\u0644\u0645\u062F\u0648\u062F",
        skill:
          "\u0641\u062A\u062D\u0629 \u0648\u0643\u0633\u0631\u0629 \u0648\u0636\u0645\u0651\u0629 \u0648\u0645\u062F\u0651",
        emoji: "\u{1F33C}",
      },
      {
        id: 4,
        title:
          "\u0623\u0628\u0646\u064A \u0627\u0644\u0643\u0644\u0645\u0627\u062A",
        skill:
          "\u0645\u0642\u0627\u0637\u0639 \u0648\u0643\u0644\u0645\u0627\u062A \u0648\u0635\u0648\u0631",
        emoji: "\u{1F333}",
      },
      {
        id: 5,
        title: "\u0623\u0642\u0631\u0623 \u0648\u0623\u0641\u0647\u0645",
        skill:
          "\u062C\u0645\u0644 \u0642\u0635\u064A\u0631\u0629 \u0648\u062D\u0643\u0627\u064A\u0627\u062A",
        emoji: "\u{1F4DA}",
      },
    ],
    V;
  try {
    V = window.ServerStore;
  } catch {
    V = { getItem: () => null, setItem: () => {} };
  }
  var X = $e(),
    G = "all",
    K = null,
    ge = null,
    ie = null,
    Z = null,
    re = 0,
    Ke,
    P = V.getItem("hurufi-muted") === "true",
    Q = Te({ isMuted: () => P });
  function $e() {
    try {
      let e = JSON.parse(V.getItem("hurufi-arcade-v1") || "{}");
      return {
        completed:
          Number.isSafeInteger(e.completed) && e.completed >= 0
            ? e.completed
            : 0,
        games:
          e.games && typeof e.games == "object" && !Array.isArray(e.games)
            ? e.games
            : {},
        recent: Array.isArray(e.recent)
          ? e.recent
              .filter(
                (a) =>
                  a &&
                  ae.some((u) => u.id === a.id) &&
                  Number.isInteger(a.stars) &&
                  a.stars >= 0 &&
                  a.stars <= 10,
              )
              .slice(0, 5)
          : [],
      };
    } catch {
      return { completed: 0, games: {}, recent: [] };
    }
  }
  var Pe = (e, a = "") =>
    `<svg class="${a}" aria-hidden="true"><use href="#p-${e}"/></svg>`;
  function ba(e) {
    return (
      {
        letters:
          '<span class="art-letter">\u0623</span><span class="art-letter">\u0628</span><span class="art-letter">\u062A</span>',
        memory:
          '<div class="art-mem-grid"><span>\u061F</span><span>\u0628</span><span>\u061F</span><span>\u0628</span><span>\u061F</span><span>\u061F</span></div>',
        book: '<span class="book-crescent">\u263E</span><div class="art-book"><i class="book-lines"></i></div>',
        listen: `<span class="art-sound-letter">\u062D</span>${Pe("sound", "art-sound-svg")}`,
        words:
          '<div class="art-word"><i>\u{1F34C}</i><span>\u0645</span><span>\u0648</span><span>\u0632</span></div>',
        balloons:
          '<span class="art-balloon">\u0623</span><span class="art-balloon">\u0628</span><span class="art-balloon">\u062A</span>',
        counting:
          '<div class="art-count"><div class="art-count-fruit"><span>\u{1F34E}</span><span>\u{1F34E}</span><span>\u{1F34E}</span><span>\u{1F34E}</span></div><span class="art-count-number">\u0664</span></div>',
        xo: '<div class="art-xo"><span>\xD7</span><span>\u25CB</span><span></span><span></span><span>\xD7</span><span>\u25CB</span><span>\u25CB</span><span></span><span>\xD7</span></div>',
        ayahs:
          '<div class="art-ayahs"><span><b>\u0661</b><i></i></span><span><b>\u0662</b><i></i></span><span><b>\u0663</b><i></i></span></div>',
        colors: '<div class="art-paints"><i></i><i></i><i></i><i></i></div>',
        shapes: '<div class="art-shapes"><i></i><i></i><i></i></div>',
        addition:
          '<div class="art-addition"><span>\u{1F353}</span><b>+</b><span>\u{1F353}</span><i>\u061F</i></div>',
        patterns:
          '<div class="art-patterns"><i></i><b></b><i></i><b></b><span>\u061F</span></div>',
        maze: '<div class="art-maze"><span>\u{1F430}</span><i></i><b></b><span>\u{1F955}</span></div>',
        differences:
          '<div class="art-differences"><span>\u{1F33B}<i>\u{1F98B}</i>\u{1F333}</span><span>\u{1F33B}<i>\u{1F41D}</i>\u{1F333}</span></div>',
        hunt: '<div class="art-mem-grid"><span>\u0628</span><span>\u062A</span><span>\u0628</span><span>\u062B</span><span>\u0628</span><span>\u062A</span></div>',
        train:
          '<div class="curr-art-chips"><em>\u{1F682}</em><span>\u0628</span><span>\u062A</span><span>\u062B</span></div>',
        forms:
          '<div class="curr-art-chips"><span>\u0647\u0640</span><span>\u0640\u0647\u0640</span><span>\u0640\u0647</span></div>',
        dots: '<div class="curr-art-chips"><span>\u0628</span><span>\u062A</span><span>\u062B</span></div>',
        vowels:
          '<div class="curr-art-chips"><span>\u0628\u064E</span><span>\u0628\u0650</span><span>\u0628\u064F</span></div>',
        long: '<div class="curr-art-chips"><span>\u0628\u064E\u0627</span><span>\u0628\u0650\u064A</span><span>\u0628\u064F\u0648</span></div>',
        syllables:
          '<div class="curr-art-chips"><span>\u0628\u064E\u0627</span><b>+</b><span>\u0628</span></div>',
        noorSukun:
          '<div class="curr-art-chips noor-game-reading"><span>قْ</span><span>مْ</span><span>بْ</span></div>',
        noorTanween:
          '<div class="curr-art-chips noor-game-reading"><span>بًا</span><span>بٍ</span><span>بٌ</span></div>',
        noorShadda:
          '<div class="curr-art-chips noor-game-reading"><span>دَّ</span><span>دِّ</span><span>دُّ</span></div>',
        noorShaddaTanween:
          '<div class="curr-art-chips noor-game-reading"><span>قًّا</span><span>قٍّ</span><span>قٌّ</span></div>',
        picture:
          '<div class="curr-art-reading"><span>\u{1F981}</span><strong>\u0623\u064E\u0633\u064E\u062F</strong></div>',
        sentence:
          '<div class="curr-art-words"><span>\u0623\u064E\u0646\u064E\u0627</span><span>\u0623\u064F\u062D\u0650\u0628\u0651\u064F</span><span>\u0627\u0644\u0652\u0642\u0650\u0631\u064E\u0627\u0621\u064E\u0629\u064E</span></div>',
        detective:
          '<div class="curr-art-reading"><span>\u{1F50E}</span><strong>\u062D\u0650\u0643\u064E\u0627\u064A\u064E\u0629</strong></div>',
      }[e] || ""
    );
  }
  function Xe(e) {
    return e
      .normalize("NFKD")
      .replace(/[\u064b-\u065f\u0670]/g, "")
      .replace(/[أإآٱ]/g, "\u0627")
      .toLowerCase()
      .trim();
  }
  function le() {
    let e = Xe(C("game-search").value),
      a = ae.filter(
        (u) =>
          (G === "all" ||
            (G === "noor" ? noorGameTopics.has(u.id) : u.category === G)) &&
          (!K || u.level === K) &&
          Xe(
            `${u.title} ${u.description} ${me[u.category]} ${ve.find((h) => h.id === u.level)?.title || ""} ${noorGameTopics.get(u.id)?.join(" ") || ""}`,
          ).includes(e),
      );
    ((C("game-library").innerHTML = a
      .map(
        (u) =>
          `<a class="library-card" href="${u.href || "#play/" + u.id}" style="--card-bg:${u.bg};--card-ink:${u.ink}" aria-label="\u0627\u0644\u0639\u0628 ${u.title}"><div class="card-art card-art-${u.art}" aria-hidden="true"><span class="card-badge">${u.badge}</span>${ba(u.art)}<span class="art-star">\u2726</span></div><div class="card-info"><span class="card-kicker"><i></i>${me[u.category]}</span><h3>${u.title}</h3><p>${u.description}</p><div class="card-bottom">${u.age ? `<span class="card-age">${u.age}</span>` : ""}<span class="card-play">\u0647\u064A\u0627 \u0646\u0644\u0639\u0628${Pe("arrow")}</span></div></div></a>`,
      )
      .join("")),
      (C("no-games").hidden = a.length > 0),
      (C("visible-games").textContent = a.length
        ? `${v(a.length)} ${a.length === 1 || a.length >= 11 ? "\u0645\u063A\u0627\u0645\u0631\u0629" : "\u0645\u063A\u0627\u0645\u0631\u0627\u062A"} \u0628\u0627\u0646\u062A\u0638\u0627\u0631\u0643`
        : "\u0644\u0627 \u062A\u0648\u062C\u062F \u0623\u0644\u0639\u0627\u0628 \u0645\u0637\u0627\u0628\u0642\u0629"),
      document.querySelectorAll("[data-filter]").forEach((u) => {
        (u.classList.toggle("selected", u.dataset.filter === G),
          u.setAttribute("aria-pressed", u.dataset.filter === G));
      }),
      (C("level-controls").hidden = G !== "arabic"),
      document.querySelectorAll("[data-level-filter]").forEach((u) => {
        let h =
          Number(u.dataset.levelFilter) === K ||
          (u.dataset.levelFilter === "all" && !K);
        (u.classList.toggle("selected", h), u.setAttribute("aria-pressed", h));
      }),
      (C("games-title").innerHTML = K
        ? `\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${v(K)}: ${ve[K - 1].title} <span>\u2726</span>`
        : G === "noor"
          ? "ألعاب نور البيان"
          : "\u0628\u0645\u0627\u0630\u0627 \u0646\u0644\u0639\u0628 \u0627\u0644\u064A\u0648\u0645\u061F <span>\u2726</span>"));
  }
  function ee() {
    (re++,
      Z && (Z.pause(), (Z = null)),
      window.speechSynthesis?.cancel(),
      Q.setNarrating(!1, { discard: !0 }));
  }
  function va(e, a = "name") {
    D[e] &&
      We(
        `audio/${String(e + 1).padStart(2, "0")}-${a === "word" ? "word" : "name"}.mp3`,
        a === "name" ? e : null,
      );
  }
  function ga(e) {
    /^audio\/reading\/(sentence|passage)-\d{2}\.mp3$/.test(e) && We(e);
  }
  function We(e, a = null) {
    if ((ee(), P)) {
      oe(
        "\u0627\u0644\u0635\u0648\u062A \u0645\u0643\u062A\u0648\u0645. \u0641\u0639\u0651\u0644\u0647 \u0645\u0646 \u0632\u0631 \u0627\u0644\u0635\u0648\u062A \u0623\u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629.",
      );
      return;
    }
    let u = re;
    (Q.setNarrating(!0),
      (Z = new GameAudio(e)),
      (Z.onplaying = () => {
        if (a !== null && u === re) {
          let M = de(V);
          M.learned.includes(a) ||
            (M.learned.push(a), ye("hurufi-progress-v1", M), te());
        }
      }),
      (Z.onended = () => {
        u === re && Q.setNarrating(!1);
      }));
    let h = !1,
      g = () => {
        h ||
          u !== re ||
          ((h = !0),
          Q.setNarrating(!1),
          oe(
            "\u062A\u0639\u0630\u0651\u0631 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0635\u0648\u062A. \u062A\u0623\u0643\u0651\u062F \u0645\u0646 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0648\u0645\u0633\u062A\u0648\u0649 \u0627\u0644\u0635\u0648\u062A\u060C \u062B\u0645 \u062D\u0627\u0648\u0644 \u0645\u062C\u062F\u0651\u062F\u064B\u0627.",
          ));
      };
    ((Z.onerror = g), Z.play().catch(g));
  }
  function ye(e, a) {
    try {
      V.setItem(e, JSON.stringify(a));
    } catch {}
  }
  function ya(e, a) {
    if (ie !== e) return;
    let u = Math.max(0, Math.min(6, Math.floor(Number(a.stars) || 0))),
      h = de(V);
    ((h.stars += u), ye("hurufi-progress-v1", h), (X = $e()), X.completed++);
    let g = X.games[e];
    ((X.games[e] = {
      plays: (Number.isInteger(g?.plays) ? g.plays : 0) + 1,
      best: Math.max(Number(g?.best) || 0, u),
    }),
      (X.recent = [{ id: e, stars: u }, ...X.recent].slice(0, 5)),
      ye("hurufi-arcade-v1", X),
      te(),
      oe(
        `\u0623\u062D\u0633\u0646\u062A! \u0623\u0636\u0641\u062A ${v(u)} ${u === 1 ? "\u0646\u062C\u0645\u0629" : "\u0646\u062C\u0648\u0645"} \u0644\u0631\u0635\u064A\u062F\u0643 \u2726`,
      ),
      wa(),
      Q.play("celebrate"));
  }
  function te() {
    let e = de(V);
    ((X = $e()),
      (C("portal-star-total").textContent = v(e.stars)),
      (C("total-stars").textContent = v(e.stars)),
      (C("total-letters").textContent = v(e.learned.length)),
      (C("total-completed").textContent = v(X.completed)));
    let a = [
      [
        "\u{1F331}",
        "\u0623\u0648\u0651\u0644 \u0627\u0643\u062A\u0634\u0627\u0641",
        "\u0627\u0633\u0645\u0639 \u0623\u0648\u0651\u0644 \u062D\u0631\u0641",
        e.learned.length > 0,
      ],
      [
        "\u2B50",
        "\u062C\u0627\u0645\u0639 \u0627\u0644\u0646\u062C\u0648\u0645",
        "\u0627\u062C\u0645\u0639 \u0661\u0660 \u0646\u062C\u0648\u0645",
        e.stars >= 10,
      ],
      [
        "\u{1F9E9}",
        "\u0645\u0633\u062A\u0643\u0634\u0641 \u0635\u063A\u064A\u0631",
        "\u0623\u0643\u0645\u0644 \u0663 \u0645\u063A\u0627\u0645\u0631\u0627\u062A",
        X.completed >= 3,
      ],
      [
        "\u{1F333}",
        "\u0635\u062F\u064A\u0642 \u0627\u0644\u062D\u0631\u0648\u0641",
        "\u0627\u0643\u062A\u0634\u0641 \u0662\u0668 \u062D\u0631\u0641\u064B\u0627",
        e.learned.length === 28,
      ],
    ];
    ((C("portal-badges").innerHTML = a
      .map(
        ([u, h, g, M]) =>
          `<div class="portal-badge ${M ? "earned" : ""}"><span aria-hidden="true">${u}</span>${h}<small>${M ? "\u062D\u0642\u0651\u0642\u062A\u0647\u0627\u060C \u064A\u0627 \u0628\u0637\u0644!" : g}</small></div>`,
      )
      .join("")),
      (C("recent-games").innerHTML = X.recent.length
        ? X.recent
            .map((u) => {
              let h = ae.find((g) => g.id === u.id);
              return `<a class="recent-game" href="${h.href || "#play/" + h.id}"><span aria-hidden="true">${h.emoji}</span><strong>${h.title}</strong><small>${v(u.stars)} \u2726</small></a>`;
            })
            .join("")
        : '<p class="recent-empty">\u0643\u0644 \u062D\u0643\u0627\u064A\u0629 \u062A\u0628\u062F\u0623 \u0628\u062E\u0637\u0648\u0629. \u0627\u062E\u062A\u0631 \u0644\u0639\u0628\u062A\u0643 \u0627\u0644\u0623\u0648\u0644\u0649!</p>'),
      $a(e));
  }
  function $a(e) {
    C("learning-levels").innerHTML = ve
      .map((a) => {
        let u = ae.filter((g) => g.level === a.id),
          h = u.filter((g) =>
            g.id === "letters"
              ? e.learned.length === 28
              : Number(X.games[g.id]?.plays) > 0,
          ).length;
        return `<a class="learning-level ${h === u.length ? "level-complete" : ""}" href="#level/${a.id}" aria-label="\u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${v(a.id)}\u060C ${a.title}\u060C \u0623\u0643\u0645\u0644\u062A ${v(h)} \u0645\u0646 ${v(u.length)} \u0623\u0646\u0634\u0637\u0629"><span class="level-top"><b>${v(a.id)}</b><span aria-hidden="true">${a.emoji}</span></span><strong>${a.title}</strong><small>${a.skill}</small><span class="level-completion">${h === u.length ? "\u2713 \u0627\u0643\u062A\u0645\u0644 \u0627\u0644\u0645\u0633\u062A\u0648\u0649" : `${v(h)} \u0645\u0646 ${v(u.length)} \u0623\u0646\u0634\u0637\u0629`}</span><span class="level-meter" aria-hidden="true"><i style="width:${(h / u.length) * 100}%"></i></span></a>`;
      })
      .join("");
  }
  function oe(e) {
    (clearTimeout(Ke),
      (C("portal-toast").textContent = e),
      (C("portal-toast").hidden = !1),
      (Ke = setTimeout(() => (C("portal-toast").hidden = !0), 5500)));
  }
  function wa() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let e = Array.from({ length: 30 }, () => {
      let a = document.createElement("i");
      return (
        (a.style.left = `${20 + Math.random() * 60}%`),
        a.style.setProperty("--drift", `${(Math.random() - 0.5) * 250}px`),
        (a.style.animationDelay = `${Math.random() * 0.2}s`),
        a
      );
    });
    (C("portal-confetti").append(...e),
      setTimeout(() => e.forEach((a) => a.remove()), 1800));
  }
  function we() {
    (ge?.(), (ge = null), (ie = null), ee(), Q.stop());
  }
  function Qe(e, lesson) {
    let a = ae.find((h) => h.id === e && !h.href);
    if (!a) {
      location.hash = "games";
      return;
    }
    (we(),
      (ie = e),
      (C("home-page").hidden = !0),
      (C("portal-progress").hidden = !0),
      (C("activity-page").hidden = !1),
      (C("activity-title").textContent = lesson?.title ?? a.title),
      (C("activity-description").textContent = a.description),
      (C("activity-emoji").textContent = a.emoji),
      (C("activity-category").textContent =
        me[a.category] +
        (a.level
          ? ` \xB7 \u0627\u0644\u0645\u0633\u062A\u0648\u0649 ${v(a.level)}`
          : "")),
      C("activity-stage").replaceChildren());
    let u = {
      onComplete: (h) => ya(e, h),
      onSpeak: va,
      onPrompt: ga,
      isMuted: () => P,
      onFeedback: (h) => Q.play(h),
      onNarrationChange: (h) => Q.setNarrating(h),
      focus: lesson?.focus,
    };
    const back = C("activity-back");
    const fromNoor = lesson || G === "noor";
    back.href = fromNoor ? "#category/noor" : "#games";
    back.querySelector("span").textContent =
      fromNoor ? "ألعاب نور البيان" : "كلّ الألعاب";
    try {
      const mount = noorGameRounds.has(e) ? mountNoorGame : (
        ["memory", "words", "counting"].includes(e)
          ? ke
          : ["balloons", "xo"].includes(e)
            ? qe
            : ["colors", "shapes", "addition", "patterns"].includes(e)
              ? je
              : ["maze", "differences"].includes(e)
                ? Ce
                : [
                      "letter-hunt",
                      "alphabet-train",
                      "letter-forms",
                      "letter-dots",
                    ].includes(e)
                  ? _e
                  : [
                        "vowel-match",
                        "long-vowels",
                        "syllable-builder",
                        "word-picture",
                      ].includes(e)
                    ? De
                    : ["sentence-builder", "reading-detective"].includes(e)
                      ? Ge
                      : Le
      );
      ge = mount(C("activity-stage"), e, u);
    } catch (h) {
      ((C("activity-stage").innerHTML =
        '<div class="load-error"><h2>\u0644\u0645 \u062A\u0643\u062A\u0645\u0644 \u062A\u0647\u064A\u0626\u0629 \u0627\u0644\u0644\u0639\u0628\u0629</h2><p>\u0627\u0636\u063A\u0637 \xAB\u0627\u0628\u062F\u0623 \u0645\u0646 \u062C\u062F\u064A\u062F\xBB \u0644\u0644\u0645\u062D\u0627\u0648\u0644\u0629 \u0645\u0631\u0651\u0629 \u0623\u062E\u0631\u0649.</p></div>'),
        console.error("Game initialization failed", h));
    }
    ((document.title = `${lesson?.title ?? a.title} \u2014 \u062D\u0631\u0648\u0641\u064A`),
      (C("activity-title").tabIndex = -1),
      C("activity-title").focus({ preventScroll: !0 }),
      Y(a.category));
  }
  function Y(e) {
    document.querySelectorAll("[data-nav]").forEach((a) => {
      let u = a.dataset.nav === e;
      (a.classList.toggle("current", u),
        u
          ? a.setAttribute("aria-current", "page")
          : a.removeAttribute("aria-current"));
    });
  }
  function ce(e = !1) {
    let a = location.hash.slice(1) || "home";
    if (a.startsWith("play/")) {
      const [, game, source, page] = a.split("/");
      const lesson = source === "noor" ? noorLessonGames.get(Number(page)) : undefined;
      Qe(game, lesson?.id === game ? lesson : undefined);
      if (!e) window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }
    we();
    let u = a === "progress";
    if (
      ((C("home-page").hidden = u),
      (C("activity-page").hidden = !0),
      (C("portal-progress").hidden = !u),
      (document.title =
        "\u062D\u0631\u0648\u0641\u064A \u2014 \u0639\u0627\u0644\u0645 \u0635\u063A\u064A\u0631\u060C \u0627\u0643\u062A\u0634\u0627\u0641\u0627\u062A \u0643\u0628\u064A\u0631\u0629"),
      u)
    ) {
      (te(),
        Y("progress"),
        e || window.scrollTo({ top: 0, behavior: "instant" }));
      return;
    }
    if (/^level\/[1-5]$/.test(a))
      ((G = "arabic"),
        (K = Number(a.slice(6))),
        (C("game-search").value = ""),
        Y("arabic"));
    else if (a.startsWith("category/")) {
      let h = a.slice(9);
      ((G = me[h] ? h : "all"),
        (K = null),
        (C("game-search").value = ""),
        Y(G));
    } else
      (a === "home" || a === "games") &&
        ((G = "all"), (K = null), (C("game-search").value = ""), Y("home"));
    (le(),
      a === "games" || a.startsWith("category/") || a.startsWith("level/")
        ? requestAnimationFrame(() =>
            C("games").scrollIntoView({
              behavior: e ? "instant" : "smooth",
              block: "start",
            }),
          )
        : e || window.scrollTo({ top: 0, behavior: "instant" }));
  }
  document.querySelectorAll("[data-filter]").forEach((e) =>
    e.addEventListener("click", () => {
      ((G = e.dataset.filter),
        (K = null),
        history.replaceState(
          null,
          "",
          G === "all" ? "#games" : `#category/${G}`,
        ),
        le(),
        Y(G === "all" ? "home" : G));
    }),
  );
  document.querySelectorAll("[data-level-filter]").forEach((e) =>
    e.addEventListener("click", () => {
      ((K =
        e.dataset.levelFilter === "all" ? null : Number(e.dataset.levelFilter)),
        (G = "arabic"),
        history.replaceState(null, "", K ? `#level/${K}` : "#category/arabic"),
        le(),
        Y("arabic"));
    }),
  );
  document
    .querySelectorAll(".portal-nav a, .path-strip a, .path-start")
    .forEach((e) =>
      e.addEventListener("click", () => {
        e.getAttribute("href") === location.hash && ce();
      }),
    );
  C("learning-levels").addEventListener("click", (e) => {
    e.target.closest("a[href]")?.getAttribute("href") === location.hash && ce();
  });
  C("game-search").addEventListener("input", le);
  C("sound-demo").addEventListener("click", () => {
    if (P) {
      oe(
        "\u0641\u0639\u0651\u0644 \u0627\u0644\u0635\u0648\u062A \u0645\u0646 \u0627\u0644\u0632\u0631 \u0623\u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629\u060C \u062B\u0645 \u062C\u0631\u0651\u0628 \u0627\u0644\u062A\u0634\u062C\u064A\u0639.",
      );
      return;
    }
    Q.play("celebrate");
  });
  C("clear-search").addEventListener("click", () => {
    ((G = "all"),
      (K = null),
      history.replaceState(null, "", "#games"),
      (C("game-search").value = ""),
      le(),
      Y("home"),
      C("game-search").focus());
  });
  C("restart-activity").addEventListener("click", () => {
    ie && ce(!0);
  });
  C("activity-stage").addEventListener(
    "click",
    (e) => {
      let a = e.target.closest("button");
      if (!a || a.disabled) return;
      let u =
        a.dataset.action ||
        a.dataset.funAction ||
        a.dataset.qurAction ||
        a.dataset.disAction ||
        a.dataset.advAction ||
        a.dataset.afAction ||
        a.dataset.abAction ||
        a.dataset.arAction;
      [
        "restart",
        "balloon-replay",
        "xo-replay",
        "replay",
        "maze-replay",
        "differences-replay",
      ].includes(u)
        ? (ee(), Q.stop())
        : u === "next" &&
          (a.dataset.afAction || a.dataset.abAction || a.dataset.arAction) &&
          ee();
    },
    !0,
  );
  function xe() {
    (C("portal-sound").setAttribute("aria-pressed", P),
      C("portal-sound").setAttribute(
        "aria-label",
        P
          ? "\u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0635\u0648\u062A"
          : "\u0643\u062A\u0645 \u0627\u0644\u0635\u0648\u062A",
      ));
  }
  C("portal-sound").addEventListener("click", () => {
    P = !P;
    try {
      V.setItem("hurufi-muted", String(P));
    } catch {}
    (P && ee(),
      xe(),
      document.dispatchEvent(
        new CustomEvent("hurufi-mute", { detail: { muted: P } }),
      ),
      oe(
        P
          ? "\u062A\u0645 \u0643\u062A\u0645 \u0627\u0644\u0635\u0648\u062A"
          : "\u0627\u0644\u0635\u0648\u062A \u0645\u0641\u0639\u0651\u0644. \u0647\u064A\u0627 \u0646\u0633\u062A\u0645\u0639!",
      ));
  });
  window.addEventListener("hashchange", () => ce());
  window.addEventListener("athar:settings", te);
  window.addEventListener("pagehide", we);
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      try {
        P = V.getItem("hurufi-muted") === "true";
      } catch {}
      (xe(), te(), ce(!0));
    }
  });
  document.addEventListener("visibilitychange", () => {
    document.hidden && ee();
  });
  xe();
  te();
  ce(!0);
})();
