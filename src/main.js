import "./style.css";
import { letter } from "./letter.js";

const app = document.getElementById("app");
const LETTER_PATH = "/letter";

function getRoute() {
  return window.location.pathname === LETTER_PATH ? LETTER_PATH : "/";
}

function navigate(path) {
  if (window.location.pathname !== path) {
    history.pushState({ path }, "", path);
  }
  render();
}

function createStars() {
  const container = document.createElement("div");
  container.className = "stars";
  container.setAttribute("aria-hidden", "true");

  const count = window.innerWidth < 480 ? 40 : 65;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");
    star.className = Math.random() > 0.75 ? "stars__sparkle" : "stars__dot";

    star.style.left = `${Math.random() * 100}%`;
    star.style.setProperty("--drift-x", `${-40 + Math.random() * 80}px`);
    star.style.setProperty("--scale", (0.3 + Math.random() * 1.1).toFixed(2));
    star.style.setProperty("--opacity", (0.25 + Math.random() * 0.55).toFixed(2));
    star.style.animationDuration = `${10 + Math.random() * 18}s`;
    star.style.animationDelay = `${Math.random() * 12}s`;

    container.appendChild(star);
  }

  for (let i = 0; i < 4; i++) {
    const shooting = document.createElement("span");
    shooting.className = "stars__shooting";
    shooting.style.top = `${5 + Math.random() * 45}%`;
    shooting.style.left = `${Math.random() * 70}%`;
    shooting.style.animationDelay = `${2 + i * 6 + Math.random() * 4}s`;
    shooting.style.animationDuration = `${2.8 + Math.random() * 1.5}s`;
    container.appendChild(shooting);
  }

  return container;
}

function createIntro(onOpen) {
  const intro = document.createElement("section");
  intro.className = "intro";
  intro.setAttribute("aria-label", "Open the letter");

  intro.appendChild(createStars());

  const stage = document.createElement("div");
  stage.className = "intro__stage";
  stage.innerHTML = `
      <div class="envelope">
        <div class="envelope__shadow"></div>
        <div class="envelope__back"></div>
        <div class="envelope__letter-peek" aria-hidden="true"></div>
        <div class="envelope__front" aria-hidden="true"></div>
        <div class="envelope__flap">
          <span class="envelope__flap-edge" aria-hidden="true"></span>
        </div>
        <button type="button" class="envelope__seal" aria-label="Break the seal">
          <span class="envelope__seal-mark" aria-hidden="true">♥</span>
        </button>
      </div>
      <p class="intro__hint">Tap the seal to open</p>
  `;

  intro.appendChild(stage);

  const envelope = stage.querySelector(".envelope");
  const seal = stage.querySelector(".envelope__seal");

  const open = () => {
    if (envelope.classList.contains("opening")) return;
    envelope.classList.add("opening");
    intro.classList.add("intro--opening");
    setTimeout(() => {
      intro.classList.add("intro--done");
      onOpen();
    }, 1400);
  };

  seal.addEventListener("click", open);

  seal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });

  return intro;
}

function createLetter() {
  const scene = document.createElement("main");
  scene.className = "letter-scene";

  const paragraphs = letter.paragraphs
    .map((text) => `<p class="letter__paragraph">${escapeHtml(text)}</p>`)
    .join("");

  scene.innerHTML = `
    <article class="letter">
      <span class="letter__corner letter__corner--tl" aria-hidden="true">❧</span>
      <span class="letter__corner letter__corner--tr" aria-hidden="true">❧</span>
      <span class="letter__corner letter__corner--bl" aria-hidden="true">❧</span>
      <span class="letter__corner letter__corner--br" aria-hidden="true">❧</span>
      <div class="letter__fold" aria-hidden="true"></div>
      <header class="letter__header">
        <p class="letter__date">${escapeHtml(letter.date)}</p>
      </header>
      <p class="letter__recipient">${escapeHtml(letter.recipient)}</p>
      <p class="letter__greeting">${escapeHtml(letter.greeting)}</p>
      ${paragraphs}
      <footer class="letter__footer">
        <p class="letter__closing">${escapeHtml(letter.closing)}</p>
        <p class="letter__signature">${escapeHtml(letter.signature)}</p>
      </footer>
    </article>
  `;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => scene.classList.add("visible"));
  });

  return scene;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function clearView() {
  app.innerHTML = "";
}

function showEnvelope() {
  clearView();
  document.body.classList.remove("body--letter");

  const intro = createIntro(() => {
    navigate(LETTER_PATH);
  });

  app.appendChild(intro);
}

function showLetter() {
  clearView();
  document.body.classList.add("body--letter");
  app.appendChild(createLetter());
}

function render() {
  if (getRoute() === LETTER_PATH) {
    showLetter();
  } else {
    showEnvelope();
  }
}

window.addEventListener("popstate", render);
render();
