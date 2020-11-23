import { levels } from './levels';
import { nextLevel } from './index';

const displayTask = document.querySelector('.task');
const displayGame = document.querySelector('.game-wrapper');
const displayHTML = document.querySelector('.html__markup');
const spinAnimation = 'spin 8s infinite linear';
const delay = 700;

export function displayLevel(level) {
  const content = levels[level];
  displayTask.innerText = content.task;
  displayGame.innerHTML = content.html;
  displayHTML.innerHTML = convertHTML(content.html);

  const DOMelements = selectAll(content.answer);
  addAnimation(DOMelements, spinAnimation);
}

export function getHint(level) {
  const { answer } = levels[level];
  animateTyping(answer, level);
}

function convertHTML(str) {
  let newStr = str.replace(/</g, '&lt;');
  newStr = newStr.replace(/>/g, '&gt;');
  return newStr;
}

const selectAll = (selector) =>
  document.querySelector('.game-wrapper').querySelectorAll(selector);
const select = (selector) => document.querySelector(selector);

const checkAnswer = (level, answer) => levels[level].answer === answer;

export function submit(e, level) {
  e.preventDefault();

  const input = e.target.elements[0];
  const { value } = input;
  input.value = '';

  checkAnswer(level, value)
    ? levelCompleted(level, value, false)
    : wrongAnswer();
}

function levelCompleted(level, selector, isUsingHint) {
  const animation = 'slide-up 0.5s ease-in-out forwards';
  const checkmark = select(`[data-level='${level}']`).querySelector(
    '.level__checkmark'
  );

  const DOMelements = selectAll(selector);
  addAnimation(DOMelements, animation);

  checkmark.classList.add(isUsingHint ? 'with-hint' : 'completed');

  setTimeout(nextLevel, delay);
}

function wrongAnswer() {
  const editor = select('.editor');
  editor.style.animation = 'shake 0.7s ease-in-out';
  setTimeout(() => {
    editor.style.animation = '';
  }, delay);
}

function addAnimation(elements, animation) {
  elements.forEach((elem) => (elem.style.animation = animation));
}

function animateTyping(string, level) {
  const arrText = new Array(string);
  const speed = 200;
  let index = 0;
  const arrLength = arrText[0].length;
  let textPos = 0;

  (function typewriter() {
    const input = document.querySelector('.css-form__input');

    input.value = arrText[index].substring(0, textPos) + '|';
    if (textPos++ == arrLength) {
      textPos = 0;
      setTimeout(() => {
        input.value = '';
        levelCompleted(level, string, true);
      }, delay);
    } else {
      setTimeout(typewriter, speed);
    }
  })();
}
