(() => {
  const stories = window.ATHAR_STORIES || [];
  const grid = document.getElementById("story-grid");
  const library = document.getElementById("library");
  const detail = document.getElementById("detail");
  const listen = document.getElementById("story-listen");
  const readPrevious = document.getElementById("story-previous");
  const readNext = document.getElementById("story-next");
  const readingProgress = document.getElementById("story-progress");
  const audioStatus = document.getElementById("story-audio-status");
  const storyTitle = document.getElementById("detail-title");
  const storyText = document.getElementById("story-text");
  const storyEnding = document.getElementById("ending");
  const two = (n) => String(n).padStart(2, "0");
  let activeStory = 0;
  let activeScene = 0;
  let storyAudio = null;
  let readingCues = [];
  let currentSentence = null;
  let readingRequest = 0;
  let playing = false;
  let sentenceEnd = null;
  let previewFrame = 0;

  function markSentence(element) {
    if (currentSentence === element) return;
    currentSentence?.removeAttribute("aria-current");
    currentSentence = element;
    currentSentence?.setAttribute("aria-current", "true");
  }

  function syncReading() {
    if (!storyAudio) return;
    const time = storyAudio.currentTime;
    if (playing && sentenceEnd !== null && time >= sentenceEnd) {
      pauseReading();
      return;
    }
    const cue = readingCues.find(({ start, end }) => time >= start && time < end);
    markSentence(playing && !storyAudio.paused ? cue?.element ?? null : null);
    syncPlayer();
  }

  function sentenceIndex() {
    return Math.max(0, readingCues.findLastIndex(({ start }) => start <= (storyAudio?.currentTime ?? 0)));
  }

  function syncPlayer() {
    const index = sentenceIndex();
    const label = playing ? "إيقاف القراءة مؤقتًا" : "تشغيل القراءة";
    listen.setAttribute("aria-label", label);
    listen.title = label;
    listen.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>';
    readPrevious.disabled = index === 0;
    readNext.disabled = index >= readingCues.length - 1;
    readingProgress.max = storyAudio && Number.isFinite(storyAudio.duration)
      ? storyAudio.duration
      : readingCues.at(-1)?.end || 1;
    readingProgress.value = storyAudio?.currentTime || 0;
  }

  function watchPreview() {
    syncReading();
    if (playing && sentenceEnd !== null) {
      previewFrame = requestAnimationFrame(watchPreview);
    }
  }

  function renderReading(story, timing) {
    storyTitle.textContent = story.title;
    storyEnding.textContent = story.end;
    storyText.replaceChildren();
    readingCues = [];
    if (!timing) {
      storyText.textContent = story.text;
      return;
    }
    let offset = 0;
    for (const [from, to, start, end] of timing.body) {
      const sentence = document.createElement("span");
      sentence.tabIndex = 0;
      sentence.setAttribute("role", "button");
      sentence.className = "story-sentence";
      sentence.textContent = story.text.slice(from, to);
      sentence.addEventListener("click", () => readStory(start, end));
      sentence.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          readStory(start, end);
        }
      });
      storyText.append(story.text.slice(offset, from), sentence);
      readingCues.push({ element: sentence, start, end });
      offset = to;
    }
    storyText.append(story.text.slice(offset));
  }

  function pauseReading() {
    readingRequest += 1;
    playing = false;
    sentenceEnd = null;
    cancelAnimationFrame(previewFrame);
    storyAudio?.pause();
    markSentence(null);
    audioStatus.hidden = true;
    syncPlayer();
    reportHeight();
  }

  function stopReading() {
    pauseReading();
    if (storyAudio) storyAudio.currentTime = 0;
    syncPlayer();
  }

  function showAudioStatus(message) {
    audioStatus.textContent = message;
    audioStatus.hidden = false;
    reportHeight();
  }

  async function readStory(start, end = null) {
    const audio = storyAudio;
    if (!audio) return;
    const request = ++readingRequest;
    playing = true;
    sentenceEnd = null;
    cancelAnimationFrame(previewFrame);
    syncPlayer();
    if (audio.paused) showAudioStatus("جارٍ تحميل القصة…");
    try {
      if (!audio.hasAttribute("src")) await audio.prepare();
      if (request !== readingRequest) return;
      if (start !== undefined) audio.currentTime = start;
      sentenceEnd = end;
      await audio.play();
      if (request !== readingRequest) return;
      audioStatus.hidden = true;
      syncReading();
      reportHeight();
      if (sentenceEnd !== null) watchPreview();
    } catch (error) {
      if (request !== readingRequest) return;
      pauseReading();
      showAudioStatus(
        error?.name === "NotAllowedError"
          ? "اضغط على «تشغيل» لتشغيل التسجيل."
          : "تعذّر تحميل تسجيل القصة. حدّث الصفحة وحاول مرة أخرى.",
      );
    }
  }

  function stepReading(delta) {
    const cue = readingCues[sentenceIndex() + delta];
    if (cue) readStory(cue.start);
  }

  const imagePath = (storyIndex, sceneIndex) => {
    const folder = "/highres";
    const extension = storyIndex < 9 ? "jpg" : "png";
    return `/images/stories${folder}/story${two(storyIndex + 1)}-scene${two(sceneIndex + 1)}.${extension}`;
  };

  function reportHeight() {
    requestAnimationFrame(() => {
      window.parent.postMessage(
        { type: "stories-frame-height", height: document.documentElement.scrollHeight },
        location.origin,
      );
    });
  }

  function showScene() {
    const story = stories[activeStory];
    const image = document.getElementById("scene-image");
    image.src = imagePath(activeStory, activeScene);
    document.getElementById("scene-backdrop").src = image.src;
    image.alt = `رسمة ${story.scenes[activeScene]} من حكاية ${story.title}`;
    document.getElementById("scene-caption").textContent = story.scenes[activeScene];
    document.getElementById("counter").textContent =
      `الصورة ${new Intl.NumberFormat("ar-EG").format(activeScene + 1)} من ${new Intl.NumberFormat("ar-EG").format(story.scenes.length)}`;
    document.getElementById("previous").disabled = activeScene === 0;
    document.getElementById("next").disabled = activeScene === story.scenes.length - 1;
    image.onload = reportHeight;
    reportHeight();
  }

  function openStory(index) {
    const story = stories[index];
    if (!story) return;
    stopReading();
    activeStory = index;
    activeScene = 0;
    storyAudio = createInPageAudio(`/audio/stories/story-${two(index + 1)}.json?v=3`);
    const audio = storyAudio;
    audio.ontimeupdate = () => { if (storyAudio === audio) syncReading(); };
    audio.onloadedmetadata = () => { if (storyAudio === audio) syncPlayer(); };
    audio.onended = () => { if (storyAudio === audio) stopReading(); };
    storyAudio.prepare().catch(() => {});
    renderReading(story, window.ATHAR_STORY_CUES?.[index]);
    syncPlayer();
    document.getElementById("detail-type").textContent = story.type;
    library.classList.add("hidden");
    detail.classList.remove("hidden");
    showScene();
    window.scrollTo(0, 0);
  }

  function makeCard(story, index) {
    const card = document.createElement("article");
    card.className = "story-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `افتح حكاية ${story.title}`);
    const cover = document.createElement("img");
    cover.src = imagePath(index, 0);
    cover.className = "cover";
    card.style.setProperty("--card-image", `url("${cover.src}")`);
    cover.alt = "";
    cover.loading = index < 4 ? "eager" : "lazy";
    const copy = document.createElement("div");
    copy.className = "card-copy";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = story.type.split(" · ")[0];
    const title = document.createElement("h2");
    title.textContent = story.title;
    const preview = document.createElement("p");
    preview.textContent = `${story.text.split(/[.!؟]/, 1)[0].trim()}…`;
    copy.append(badge, title, preview);
    card.append(cover, copy);
    card.addEventListener("click", () => openStory(index));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openStory(index);
      }
    });
    return card;
  }

  grid.replaceChildren(...stories.map(makeCard));
  listen.addEventListener("click", () => playing ? pauseReading() : readStory());
  readPrevious.addEventListener("click", () => stepReading(-1));
  readNext.addEventListener("click", () => stepReading(1));
  document.getElementById("previous").addEventListener("click", () => {
    if (activeScene > 0) {
      activeScene -= 1;
      showScene();
    }
  });
  document.getElementById("next").addEventListener("click", () => {
    if (activeScene < stories[activeStory].scenes.length - 1) {
      activeScene += 1;
      showScene();
    }
  });
  document.getElementById("back").addEventListener("click", () => {
    stopReading();
    detail.classList.add("hidden");
    library.classList.remove("hidden");
    window.scrollTo(0, 0);
    reportHeight();
  });
  window.addEventListener("keydown", (event) => {
    if (detail.classList.contains("hidden")) return;
    if (event.key === "ArrowLeft" && activeScene < stories[activeStory].scenes.length - 1) {
      activeScene += 1;
      showScene();
    } else if (event.key === "ArrowRight" && activeScene > 0) {
      activeScene -= 1;
      showScene();
    } else if (event.key === "Escape") {
      document.getElementById("back").click();
    }
  });
  window.addEventListener("resize", reportHeight);
  window.addEventListener("load", reportHeight);
  window.addEventListener("pagehide", stopReading);
  window.addEventListener("message", (event) => {
    if (event.origin === location.origin && event.source === window.parent &&
        event.data?.type === "stories-stop-reading") {
      stopReading();
    }
  });
  reportHeight();
})();
