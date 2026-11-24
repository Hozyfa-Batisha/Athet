const inPageAudioUrls = new Map();

function createInPageAudio(source) {
  const audio = new Audio();
  const url = new URL(source, location.href);
  const encoded = url.pathname.endsWith(".json");
  const playbackUrl = encoded ? url.href : `/media/play${url.pathname.slice(0, -4)}`;
  const play = audio.play.bind(audio);
  const pause = audio.pause.bind(audio);
  let playback = 0;

  function loadUrl() {
    if (!inPageAudioUrls.has(playbackUrl)) {
      const pending = fetch(playbackUrl)
        .then(async (response) => {
          if (!response.ok) throw new Error(`Audio request failed (${response.status})`);
          if (encoded) {
            const { mp3 } = await response.json();
            if (!mp3) throw new Error("Missing recording");
            const bytes = Uint8Array.from(atob(mp3), (char) => char.charCodeAt(0));
            return URL.createObjectURL(new Blob([bytes], { type: "audio/mpeg" }));
          }
          const data = await response.blob();
          return URL.createObjectURL(data.slice(0, data.size, "audio/mpeg"));
        })
        .catch((error) => {
          inPageAudioUrls.delete(playbackUrl);
          throw error;
        });
      inPageAudioUrls.set(playbackUrl, pending);
    }
    return inPageAudioUrls.get(playbackUrl);
  }

  audio.prepare = async () => {
    if (audio.hasAttribute("src")) return;
    const objectUrl = await loadUrl();
    if (!audio.hasAttribute("src")) audio.src = objectUrl;
  };
  audio.play = async () => {
    const attempt = ++playback;
    if (!audio.hasAttribute("src")) {
      const objectUrl = await loadUrl();
      if (attempt !== playback) return;
      if (!audio.hasAttribute("src")) audio.src = objectUrl;
    }
    return play();
  };
  audio.pause = () => {
    playback += 1;
    pause();
  };
  return audio;
}
