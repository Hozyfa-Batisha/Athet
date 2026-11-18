const frame = document.getElementById("game");
const pages = { portal: "/games/portal.html", letters: "/games/letters.html" };
window.addEventListener("message", (event) => {
  if (event.origin !== location.origin || event.source !== frame.contentWindow)
    return;
  const destination = pages[event.data?.hurufiView];
  if (destination)
    frame.src =
      destination +
      (event.data.hash ? "#" + encodeURIComponent(event.data.hash) : "");
});
