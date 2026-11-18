// ===== العب و تعلم: مكتبة الألعاب =====
const HURUFI_SRC = "games/hurufi.html";
function playFit() {
  const f = document.getElementById("play-frame");
  if (!f || !document.documentElement.classList.contains("play-mode")) return;
  window.scrollTo(0, 0);
  const top = f.getBoundingClientRect().top;
  f.style.height = Math.max(320, Math.floor(window.innerHeight - top)) + "px";
}
window.addEventListener("resize", playFit);
window.addEventListener("orientationchange", () => setTimeout(playFit, 200));
function playRender() {
  const f = document.getElementById("play-frame");
  if (f && !f.getAttribute("src")) f.src = HURUFI_SRC;
}

function showTab(name) {
  [
    "schedule",
    "students",
    "harvest",
    "play",
    "board",
    "quran",
    "letters",
  ].forEach((t) => {
    document.getElementById("view-" + t).classList.toggle("hidden", t !== name);
    document.getElementById("tab-" + t).classList.toggle("active", t === name);
  });
  if (name === "students") renderStudents();
  if (name === "harvest") renderHarvest();
  if (name === "board") boardShow();
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
    window.scrollTo(0, 0);
    playFit();
    setTimeout(playFit, 120);
    setTimeout(playFit, 500);
  }
  if (name === "letters") lettersInit();
  if (name === "play") playRender();
  if (name !== "play") {
    const f = document.getElementById("play-frame");
    if (f && f.getAttribute("src")) f.removeAttribute("src");
  }
}
