var _lbIdx = 0;
function lettersInit() {
  var g = document.getElementById("letters-grid");
  if (!g || g.dataset.ready) return;
  g.dataset.ready = "1";
  LETTERS.forEach(function (it, i) {
    var b = document.createElement("button");
    b.className = "letter-card";
    b.type = "button";
    b.setAttribute("aria-label", it.n + " - " + it.w);
    var box = document.createElement("div");
    box.className = "lc-img";
    var im = document.createElement("img");
    im.src = it.img;
    im.alt = it.n + " - " + it.w;
    im.decoding = "async";
    im.loading = "lazy";
    box.appendChild(im);
    var cap = document.createElement("div");
    cap.className = "lc-cap";
    var l = document.createElement("span");
    l.className = "lc-l";
    l.textContent = it.l;
    var n = document.createElement("span");
    n.className = "lc-n";
    n.textContent = it.n;
    cap.appendChild(n);
    cap.appendChild(l);
    b.appendChild(box);
    b.appendChild(cap);
    b.onclick = function () {
      lbOpen(i);
    };
    g.appendChild(b);
  });
  var lb = document.createElement("div");
  lb.id = "letter-lb";
  lb.innerHTML =
    '<img alt=""><button class="lb-x" aria-label="إغلاق">&times;</button><button class="lb-audio" type="button" aria-label="اسمع الحرف">♫</button><button class="lb-p" aria-label="السابق">&rsaquo;</button><button class="lb-n" aria-label="التالي">&lsaquo;</button>';
  document.body.appendChild(lb);
  lb.addEventListener("click", function (e) {
    if (e.target === lb || e.target.classList.contains("lb-x")) lbClose();
  });
  lb.querySelector(".lb-p").onclick = function (e) {
    e.stopPropagation();
    lbOpen(_lbIdx - 1);
  };
  lb.querySelector(".lb-n").onclick = function (e) {
    e.stopPropagation();
    lbOpen(_lbIdx + 1);
  };
  lb.querySelector(".lb-audio").onclick = function () {
    window.AlphabetAudio.play(LETTERS[_lbIdx].l);
  };
  addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") lbClose();
    else if (e.key === "ArrowRight") lbOpen(_lbIdx - 1);
    else if (e.key === "ArrowLeft") lbOpen(_lbIdx + 1);
  });
}
function lbOpen(i) {
  var lb = document.getElementById("letter-lb");
  _lbIdx = (i + LETTERS.length) % LETTERS.length;
  lb.querySelector("img").src = LETTERS[_lbIdx].img;
  lb.classList.add("open");
  window.AlphabetAudio.play(LETTERS[_lbIdx].l);
}
function lbClose() {
  document.getElementById("letter-lb").classList.remove("open");
  window.AlphabetAudio.stop();
}
(function () {
  function hideInPlay() {
    if (!document.documentElement.classList.contains("play-mode")) return;
    var h = document.querySelector("header.no-print");
    if (h) h.classList.add("hdr-hidden");
  }
  window.addEventListener("blur", function () {
    setTimeout(function () {
      if (document.activeElement === document.getElementById("play-frame"))
        hideInPlay();
    }, 0);
  });
  document.addEventListener("pointerdown", function (e) {
    var h = document.querySelector("header.no-print");
    if (h && !h.contains(e.target) && e.target.id !== "hdr-handle")
      hideInPlay();
  });
})();
