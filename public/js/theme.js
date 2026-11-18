function applyTheme(t) {
  document.documentElement.classList.toggle("dark", t === "dark");
  var b = document.getElementById("theme-toggle");
  if (b) b.setAttribute("aria-checked", t === "dark" ? "true" : "false");
  // مزامنة مع لعبة حروفي (نفس المفتاح اللي تستخدمه اللعبة)
  try {
    if (window.ServerStore.getItem("hurufi-theme") !== t)
      window.ServerStore.setItem("hurufi-theme", t);
  } catch (e) {}
}
// لو اتغيّر الوضع من داخل اللعبة → يتطبق على الموقع
window.addEventListener("athar:settings", function (e) {
  if (
    e.key !== "hurufi-theme" ||
    (e.newValue !== "dark" && e.newValue !== "light")
  )
    return;
  var root = document.documentElement;
  if (root.classList.contains("dark") === (e.newValue === "dark")) return;
  root.classList.add("theme-anim");
  applyTheme(e.newValue);
  setTimeout(function () {
    root.classList.remove("theme-anim");
  }, 500);
  try {
    window.ServerStore.setItem("theme", e.newValue);
  } catch (_) {}
});
function toggleTheme() {
  var root = document.documentElement;
  var t = root.classList.contains("dark") ? "light" : "dark";
  root.classList.add("theme-anim");
  applyTheme(t);
  setTimeout(function () {
    root.classList.remove("theme-anim");
  }, 500);
  try {
    window.ServerStore.setItem("theme", t);
  } catch (e) {}
}
