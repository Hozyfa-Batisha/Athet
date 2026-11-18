(function () {
  var t = null;
  try {
    t = window.ServerStore.getItem("theme");
  } catch (e) {}
  if (!t) {
    t =
      window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  }
  if (t === "dark") document.documentElement.classList.add("dark");
})();
