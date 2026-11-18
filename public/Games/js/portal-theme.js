(function () {
  var theme = null;
  try {
    var saved = window.ServerStore.getItem("hurufi-theme");
    if (saved === "dark" || saved === "light") theme = saved;
  } catch (_) {}
  if (!theme)
    theme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.content = theme === "dark" ? "#121a24" : "#f7faf8";
})();
