/** Preserve the supplied game recordings while serving deduplicated files. */
function GameAudio(source) {
  let key = String(source || "");
  try {
    key = new URL(key, "https://offline.hurufi/").pathname.slice(1);
  } catch {}
  return new Audio(GAME_AUDIO[key] || source);
}
