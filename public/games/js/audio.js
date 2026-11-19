/** Preserve the supplied game recordings while serving deduplicated files. */
function GameAudio(source) {
  let key = String(source || "");
  try {
    key = new URL(key, "https://offline.hurufi/").pathname.slice(1);
  } catch {}
  const audio = createInPageAudio(GAME_AUDIO[key] || source);
  if (/^audio\/\d{2}-name\.mp3$/.test(key)) audio.playbackRate = 0.8;
  return audio;
}
