(() => {
  const nav = document.getElementById("site-tabs");
  const toggle = document.getElementById("site-nav-toggle");
  if (!nav || !toggle) return;

  function setOpen(open) {
    nav.classList.toggle("mobile-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "إغلاق قائمة الأقسام" : "فتح قائمة الأقسام");
  }

  toggle.addEventListener("click", () => setOpen(!nav.classList.contains("mobile-open")));
  nav.addEventListener("click", (event) => {
    if (event.target.closest(".tab-btn")) setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  window.addEventListener("resize", () => {
    if (innerWidth > 640) setOpen(false);
  });
  window.closeMobileNav = () => setOpen(false);
  window.openMobileNav = () => setOpen(true);
})();
