import { noorGameRounds } from "../../data/noor-game-data.js";

const numbers = new Intl.NumberFormat("ar-EG");

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
  }
  return shuffled;
}

export function mountNoorGame(stage, id, { onComplete, onFeedback }) {
  const game = document.createElement("div");
  game.className = "ab-game noor-game";
  game.innerHTML = `
    <div class="noor-game-round">
      <div class="ab-topline"><span class="noor-game-counter"></span></div>
      <div class="ab-progress" role="progressbar" aria-label="الجولات المكتملة" aria-valuemin="0">
        <span></span>
      </div>
      <div class="ab-question">
        <h2 id="noor-game-prompt" tabindex="-1"></h2>
        <p class="noor-game-example noor-game-reading"></p>
      </div>
      <div class="ab-choices noor-game-choices" role="group" aria-labelledby="noor-game-prompt"></div>
      <p class="ab-status" role="status"></p>
      <button class="primary-button noor-game-next" type="button" hidden></button>
    </div>
    <div class="ab-result noor-game-result" hidden>
      <h2 tabindex="-1">أنهيتَ اللعبة!</h2>
      <p class="noor-game-score"></p>
      <button class="primary-button noor-game-replay" type="button">العب مرة أخرى</button>
    </div>
  `;
  stage.append(game);

  const roundPanel = game.querySelector(".noor-game-round");
  const counter = game.querySelector(".noor-game-counter");
  const progress = game.querySelector(".ab-progress");
  const prompt = game.querySelector("#noor-game-prompt");
  const example = game.querySelector(".noor-game-example");
  const choices = game.querySelector(".noor-game-choices");
  const status = game.querySelector('[role="status"]');
  const next = game.querySelector(".noor-game-next");
  const result = game.querySelector(".noor-game-result");
  let rounds;
  let roundIndex;
  let firstTry;
  let hadMistake;
  let answered;

  function updateProgress(completed) {
    progress.setAttribute("aria-valuenow", completed);
    progress.firstElementChild.style.width = `${(completed / rounds.length) * 100}%`;
  }

  function showRound() {
    const round = rounds[roundIndex];
    answered = false;
    hadMistake = false;
    next.hidden = true;
    next.textContent =
      roundIndex + 1 === rounds.length ? "شاهد النتيجة" : "الجولة التالية";
    status.className = "ab-status";
    status.textContent = "";
    prompt.textContent = round.prompt;
    example.textContent = round.example;
    counter.textContent = `الجولة ${numbers.format(roundIndex + 1)} من ${numbers.format(rounds.length)}`;
    updateProgress(roundIndex);
    choices.classList.toggle("noor-game-rules", Boolean(round.ruleChoices));
    choices.replaceChildren(
      ...shuffle(round.choices).map((choice) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ab-choice noor-game-option";
        if (!round.ruleChoices) button.classList.add("noor-game-reading");
        button.textContent = choice;
        button.addEventListener("click", () => answer(round, choice, button));
        return button;
      }),
    );
  }

  function answer(round, choice, button) {
    if (answered) return;
    const correct = choice === round.answer;
    button.classList.add(correct ? "ab-correct" : "ab-wrong");
    status.className = correct
      ? "ab-status ab-status-correct"
      : "ab-status ab-status-retry";
    if (!correct) {
      hadMistake = true;
      status.textContent = "جرّب اختيارًا آخر.";
      button.disabled = true;
      choices
        .querySelector("button:not(:disabled)")
        ?.focus({ preventScroll: true });
      onFeedback("retry");
      return;
    }

    answered = true;
    if (!hadMistake) firstTry++;
    for (const option of choices.children) option.disabled = true;
    status.textContent = `أحسنت! ${round.feedback}`;
    updateProgress(roundIndex + 1);
    next.hidden = false;
    next.focus({ preventScroll: true });
    onFeedback("correct");
  }

  function start() {
    rounds = shuffle(noorGameRounds.get(id)).slice(0, 8);
    roundIndex = 0;
    firstTry = 0;
    progress.setAttribute("aria-valuemax", rounds.length);
    result.hidden = true;
    roundPanel.hidden = false;
    showRound();
  }

  next.addEventListener("click", () => {
    if (!answered) return;
    roundIndex++;
    if (roundIndex < rounds.length) {
      showRound();
      prompt.focus({ preventScroll: true });
      return;
    }

    answered = false;
    const stars = Math.round((6 * firstTry) / rounds.length);
    result.querySelector(".noor-game-score").textContent =
      `أجبت من أول محاولة في ${numbers.format(firstTry)} من ${numbers.format(rounds.length)} جولات، وجمعت ${numbers.format(stars)} من ٦ نجوم.`;
    roundPanel.hidden = true;
    result.hidden = false;
    result.querySelector("h2").focus({ preventScroll: true });
    onComplete({ stars });
  });

  result.querySelector(".noor-game-replay").addEventListener("click", () => {
    start();
    prompt.focus({ preventScroll: true });
  });
  start();
  return () => game.remove();
}
