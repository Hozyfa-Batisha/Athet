// ===== العب و تعلم: مكتبة الألعاب =====
const HURUFI_SRC = "games/hurufi.html?v=3";
const FREE_TABS = new Set(["schedule", "students", "harvest"]);
window.atharHasPremiumAccess = function () {
  const profile = window.AppBootstrap?.me;
  if (!profile) return false;
  return Boolean(
    (profile.vipUntil && Date.parse(profile.vipUntil) > Date.now()) ||
    (profile.trialEndsAt && Date.parse(profile.trialEndsAt) > Date.now())
  );
};
function showVipPrompt() {
  const dialog = document.getElementById("vip-gate");
  dialog.classList.remove("hidden");
  dialog.querySelector(".vip-gate-close").focus();
}
function closeVipPrompt() {
  document.getElementById("vip-gate").classList.add("hidden");
}
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeVipPrompt();
});
function playFit() {
  const f = document.getElementById("play-frame");
  if (!f || !document.documentElement.classList.contains("play-mode")) return;
  window.scrollTo(0, 0);
  const top = f.getBoundingClientRect().top;
  f.style.height = Math.max(320, Math.floor(window.innerHeight - top)) + "px";
}
window.addEventListener("resize", playFit);
window.addEventListener("orientationchange", () => setTimeout(playFit, 200));
function playRender(fragment) {
  const f = document.getElementById("play-frame");
  const src = HURUFI_SRC + fragment;
  if (f && (!f.getAttribute("src") || (fragment && f.getAttribute("src") !== src))) {
    f.src = src;
  }
}

function showTab(name, gameFragment = "") {
  if (!FREE_TABS.has(name) && !window.atharHasPremiumAccess()) {
    showVipPrompt();
    return false;
  }

  window.AlphabetAudio?.stop();
  document.documentElement.classList.toggle("stories-mode", name === "stories");
  document.documentElement.classList.toggle("board-mode", name === "board");

  [
    "schedule",
    "students",
    "harvest",
    "play",
    "board",
    "quran",
    "letters",
    "stories",
    "noor",
  ].forEach((t) => {
    const selected = t === name;
    const button = document.getElementById("tab-" + t);
    document.getElementById("view-" + t).classList.toggle("hidden", !selected);
    button.classList.toggle("active", selected);
    if (t === "noor") button.setAttribute("aria-pressed", String(selected));
  });
  if (name === "noor") {
    document.querySelector("#noor-lessons details[open]")?.removeAttribute("open");
    window.scrollTo(0, 0);
  }
  if (name === "students") renderStudents();
  const storiesFrame = document.getElementById("stories-frame");
  if (name === "stories" && storiesFrame && !storiesFrame.getAttribute("src")) {
    storiesFrame.src = storiesFrame.dataset.src;
  } else if (name !== "stories" && storiesFrame?.hasAttribute("src")) {
    storiesFrame.contentWindow?.postMessage({ type: "stories-stop-reading" }, location.origin);
  }
  if (name === "harvest") renderHarvest();
  if (name === "board") window.scrollTo(0, 0);
  if (name === "quran") qInit();
  document
    .querySelector("main")
    .classList.toggle("letters-mode", name === "letters" || name === "play");
  document.documentElement.classList.toggle("play-mode", name === "play");
  {
    const h = document.querySelector("header.no-print");
    if (h) {
      if (name === "play") h.classList.add("hdr-hidden");
      else if (window.scrollY < 80) h.classList.remove("hdr-hidden");
    }
  }
  if (name === "play") {

    playFit();
    setTimeout(playFit, 120);
    setTimeout(playFit, 500);
  }
  if (name === "letters") lettersInit();
  if (name === "play") playRender(gameFragment);
  if (name !== "play") {
    const f = document.getElementById("play-frame");
    if (f && f.getAttribute("src")) f.removeAttribute("src");
  }
}

window.addEventListener("message", (event) => {
  const frame = document.getElementById("stories-frame");
  if (
    event.origin === window.location.origin &&
    frame &&
    event.source === frame.contentWindow &&
    event.data?.type === "stories-frame-height"
  ) {
    frame.style.height = `${Math.max(640, Number(event.data.height) || 0)}px`;
  }
});
