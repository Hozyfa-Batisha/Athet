(() => {
  const letters = "ابتثجحخدذرزسشصضطظعغفقكلمنهويء";
  let current = null;

  function numberFor(letter) {
    const base = letter.replace(/ـ/g, "").replace(/^[أإآٱ]$/, "ا");
    return base.length === 1 ? letters.indexOf(base) + 1 : 0;
  }

  function stop() {
    current?.pause();
    current = null;
  }

  window.AlphabetAudio = {
    has: (letter) => numberFor(letter) > 0,
    play(letter) {
      const number = numberFor(letter);
      if (!number) return;
      stop();
      const audio = createInPageAudio(`/audio/letters/name-${String(number).padStart(2, "0")}.json`);
      audio.playbackRate = 0.8;
      current = audio;
      audio.play().catch(() => {
        if (current === audio) current = null;
      });
    },
    stop,
  };
  window.addEventListener("pagehide", stop);
})();
