import { categories } from "./questions-data.js";

const params = new URLSearchParams(window.location.search);
const categoryId = params.get("category") || categories[0].id;
const category = categories.find((item) => item.id === categoryId) || categories[0];

const state = {
  queue: [],
  seen: new Set(),
  currentQuestion: null
};

const activeCategory = document.querySelector("#active-category");
const questionCount = document.querySelector("#question-count");
const questionText = document.querySelector("#question-text");
const answerPanel = document.querySelector("#answer-panel");
const answerText = document.querySelector("#answer-text");
const revealButton = document.querySelector("#reveal-answer");
const nextButton = document.querySelector("#next-question");
const resetButton = document.querySelector("#reset-cycle");

document.title = `${category.name} | คำถามระบบเศรษฐกิจ`;
document.documentElement.style.setProperty("--active-accent", category.accent);

function shuffle(values) {
  const items = [...values];
  for (let index = items.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [items[index], items[randomIndex]] = [items[randomIndex], items[index]];
  }
  return items;
}

function resetCycle() {
  state.queue = shuffle(category.questions.map((_, index) => index));
  state.seen = new Set();
}

function drawQuestion() {
  if (state.queue.length === 0) {
    resetCycle();
  }

  const questionIndex = state.queue.pop();
  state.seen.add(questionIndex);
  state.currentQuestion = category.questions[questionIndex];
  renderQuestion();
}

function renderQuestion() {
  activeCategory.textContent = category.name;
  questionCount.textContent = `${state.seen.size}/${category.questions.length}`;
  questionText.textContent = state.currentQuestion.q;
  answerText.textContent = state.currentQuestion.a;
  answerPanel.hidden = true;
  revealButton.disabled = false;
}

function revealAnswer() {
  answerPanel.hidden = false;
  revealButton.disabled = true;
}

function resetAndDraw() {
  resetCycle();
  drawQuestion();
}

resetCycle();
drawQuestion();

revealButton.addEventListener("click", revealAnswer);
nextButton.addEventListener("click", drawQuestion);
resetButton.addEventListener("click", resetAndDraw);
