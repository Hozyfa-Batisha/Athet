(function () {
  var DUR = 7;
  var reduce =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function ease(v) {
    v = Math.max(0, Math.min(1, v));
    return v * v * v * (v * (v * 6 - 15) + 10);
  }
  function ph(t, a, b) {
    return ease((t - a) / (b - a));
  }
  function render(ctx, img, cw, ch, t) {
    var w = img.naturalWidth,
      h = img.naturalHeight;
    ctx.clearRect(0, 0, cw, ch);
    var W = cw,
      H = ch,
      split = 0.8,
      tailLeft = 0.62,
      tailTop = 0.79,
      latinBottom = 0.54,
      boundary = W * split;
    var delta = (cw / 2 - W * 0.81) * (1 - ph(t, 1, 2.2));
    ctx.save();
    ctx.translate(delta, 0);
    ctx.globalAlpha = ph(t, 0.1, 1.05);
    ctx.beginPath();
    ctx.moveTo(boundary, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W, H);
    ctx.lineTo(W * tailLeft, H);
    ctx.lineTo(W * tailLeft, H * tailTop);
    ctx.lineTo(boundary, H * tailTop);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, 0, 0, W, H);
    ctx.restore();
    if (t > 2.15) {
      var p = ph(t, 2.15, 4.65),
        off = boundary * (1 - p);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, H * latinBottom, boundary, H * (tailTop - latinBottom));
      ctx.clip();
      ctx.drawImage(
        img,
        0,
        h * latinBottom,
        w * split,
        h * (tailTop - latinBottom),
        off,
        H * latinBottom,
        boundary,
        H * (tailTop - latinBottom),
      );
      ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha = ph(t, 4.45, 5.25);
    ctx.drawImage(
      img,
      0,
      0,
      w * split,
      h * latinBottom,
      0,
      0,
      boundary,
      H * latinBottom,
    );
    ctx.restore();
    if (t >= 5.25) ctx.drawImage(img, 0, 0, W, H);
  }
  function play(canvas, src) {
    var ctx = canvas.getContext("2d");
    var cw = canvas.width,
      ch = canvas.height,
      token = 0;
    function run() {
      var id = ++token,
        start = null;
      function frame(now) {
        if (id !== token) return;
        if (start === null) start = now;
        var t = Math.min(DUR, (now - start) / 1000);
        render(ctx, src, cw, ch, t);
        if (t < DUR) requestAnimationFrame(frame);
        else if (!reduce)
          setTimeout(function () {
            if (id === token) run();
          }, 4000);
      }
      requestAnimationFrame(frame);
    }
    if (reduce) render(ctx, src, cw, ch, DUR);
    else run();
    canvas.style.cursor = "pointer";
    canvas.addEventListener("click", function () {
      if (!reduce) run();
    });
  }
  document.querySelectorAll("canvas.ather-logo").forEach(function (c) {
    var src = document.getElementById(c.getAttribute("data-src"));
    if (!src) return;
    function go() {
      play(c, src);
    }
    if (src.complete && src.naturalWidth) go();
    else src.addEventListener("load", go);
  });
})();
