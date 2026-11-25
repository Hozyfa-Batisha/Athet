(function () {
  var hdr = document.querySelector("header.no-print"),
    bas = document.querySelector(".basmala");
  if (!hdr || !bas) return;
  function setH() {
    document.documentElement.style.setProperty(
      "--basmala-h",
      bas.offsetHeight + "px",
    );
  }
  setH();
  addEventListener("resize", setH);
  addEventListener("load", setH);
  var last = scrollY,
    ticking = false;
  function upd() {
    var y = scrollY,
      d = y - last;
    var menuOpen = document.querySelector("#profile-menu:not(.hidden), #site-tabs.mobile-open");
    if (y < 80 || menuOpen) hdr.classList.remove("hdr-hidden");
    else if (d > 6) hdr.classList.add("hdr-hidden"); // نزول → يختفي
    // الطلوع لفوق مش بيظهره — بيظهر بس لما توصل لأول الصفحة
    last = y;
    ticking = false;
  }
  addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(upd);
      }
    },
    { passive: true },
  );
})();
