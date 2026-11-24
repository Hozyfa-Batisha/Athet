import { noorLessons, noorTextPages } from "../data/noor-albayan.js";
import { readingPages } from "../data/noor-albayan-transcription.js";
import { noorLessonGames } from "../data/noor-game-data.js";

const colors = [270, 332, 204, 150, 39, 179, 18, 247, 56, 4];
const darkHues = { 247: 81, 270: 163 };
const lessons = document.getElementById("noor-lessons");

function color(element, index) {
  const hue = colors[index % colors.length];
  element.style.setProperty("--noor-hue", hue);
  element.style.setProperty("--noor-dark-hue", darkHues[hue] ?? hue);
}

function wordCards(entries, startIndex) {
  const list = document.createElement("ul");
  list.className = "noor-words";
  list.setAttribute("role", "list");

  entries.forEach((entry, index) => {
    const card = document.createElement("li");
    card.className = "noor-color noor-word";
    color(card, startIndex + index);

    if (Array.isArray(entry)) {
      const [letter, name] = entry;
      const caption = document.createElement("span");
      caption.className = "noor-letter-name";
      caption.textContent = name;
      if (window.AlphabetAudio.has(letter)) {
        const listen = document.createElement("button");
        listen.type = "button";
        listen.className = "noor-letter-play";
        listen.setAttribute("aria-label", `اسمع حرف ${name}`);
        listen.append(letter, caption);
        listen.addEventListener("click", () => window.AlphabetAudio.play(letter));
        card.classList.add("noor-word-with-audio");
        card.append(listen);
      } else {
        card.append(letter, caption);
      }
    } else {
      card.textContent = entry;
      if (entry.includes(" ")) card.classList.add("noor-phrase");
      if (entry.length > 110) card.classList.add("noor-passage");
    }

    list.append(card);
  });
  return list;
}

function practiceLink(lesson, game) {
  const link = document.createElement("a");
  link.className = "noor-practice";
  link.href = `/games/hurufi.html?v=3#play/${game.id}/noor/${lesson.first}`;

  const image = document.createElement("img");
  image.src = `/images/noor-practice/${lesson.first}.webp`;
  image.alt = `العب وتدرّب على ${lesson.title}`;
  image.width = image.height = 850;
  image.decoding = "async";
  link.append(image);

  if (game.id === "noor-tajweed-review") {
    const caption = document.createElement("span");
    caption.className = "noor-practice-caption";
    caption.setAttribute("aria-hidden", "true");
    caption.textContent = lesson.title;
    link.append(caption);
  }

  link.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.showTab("play", link.hash);
  });
  return link;
}

function lessonCard(lesson, index) {
  const card = document.createElement("details");
  card.className = "noor-lesson";
  card.name = "noor-lesson";
  const game = noorLessonGames.get(lesson.first);
  if (game) card.classList.add("noor-lesson-with-game");

  const summary = document.createElement("summary");
  summary.className = "noor-color noor-lesson-label";
  summary.textContent = lesson.title;
  color(summary, index);
  card.append(summary);

  function renderWords() {
    if (!card.open) return;
    const { first, last, opening = first } = lesson;
    const pages = Array.from(
      { length: last - first + 1 },
      (_, offset) => first + offset,
    );
    const order = [opening, ...pages.filter((page) => page !== opening)];
    const content = document.createElement("div");
    content.className = "noor-content";

    const back = document.createElement("button");
    back.type = "button";
    back.className = "noor-color noor-back";
    back.textContent = "الرجوع للدروس";
    color(back, index);
    back.addEventListener("click", () => {
      card.open = false;
      summary.focus();
    });
    content.append(back);
    if (game) content.append(practiceLink(lesson, game));

    let wordIndex = 0;
    for (const page of order) {
      const entries =
        noorTextPages[page] ??
        readingPages[page].split("|").map((entry) => entry.trim());
      content.append(wordCards(entries, wordIndex));
      wordIndex += entries.length;
    }
    card.append(content);
    card.removeEventListener("toggle", renderWords);
  }

  card.addEventListener("toggle", renderWords);
  if (lesson.first === 3) {
    card.addEventListener("toggle", () => {
      if (!card.open) window.AlphabetAudio.stop();
    });
  }
  return card;
}

lessons.append(...noorLessons.map(lessonCard));
