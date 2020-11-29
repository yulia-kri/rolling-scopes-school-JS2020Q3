import { levels } from './levels';
import { nextLevel } from './index';

const displayTask = document.querySelector('.task');
const displayExample = document.querySelector('.example-container');
const displayHTML = document.querySelector('.panel__html');
const tooltipElem = document.querySelector('.tooltip');
const spinAnimation = 'spin 8s infinite linear';
const shadow = `drop-shadow(5px 5px 16px rgba(255, 255, 255, 0.4))
drop-shadow(-5px -5px 16px rgba(255, 255, 255, 0.4))`;
const delay = 700;

export function displayLevel(level) {
  const content = levels[level];
  displayTask.innerText = content.task;
  displayExample.innerHTML = content.html;
  convertHTML(content.html, displayHTML);

  Array.from(displayExample.children).forEach((elem, i) => {
    elem.addEventListener('mouseenter', (e) => {
      const elem = e.target;
      const markup = displayHTML.children[i];

      displayTooltip(elem, markup);
    });
    elem.addEventListener('mouseleave', (e) => {
      const elem = e.target;
      const markup = displayHTML.children[i];

      hideTooltip(elem, markup);
    });
  });

  Array.from(displayHTML.children).forEach((html, i) => {
    html.addEventListener('mouseenter', (e) => {
      const elem = displayExample.children[i];
      const markup = e.target;

      displayTooltip(elem, markup);
    });
    html.addEventListener('mouseleave', (e) => {
      const elem = displayExample.children[i];
      const markup = e.target;

      hideTooltip(elem, markup);
    });
  });

  const DOMelements = selectAll(content.answer);
  addAnimation(DOMelements, spinAnimation);
}

export function getHint(level) {
  const { answer } = levels[level];
  animateTyping(answer, level);
}

function displayTooltip(elem, markup) {
  const top = elem.offsetTop - 20;
  const left = elem.offsetLeft + elem.offsetWidth / 2;
  const tooltipText = markup.innerText;
  tooltipElem.innerText = tooltipText;
  tooltipElem.style.top = `${top}px`;
  tooltipElem.style.left = `${left}px`;
  tooltipElem.style.display = 'block';

  elem.style.filter = shadow;
  markup.style.color = '#ae0076';
}

function hideTooltip(elem, markup) {
  tooltipElem.style.display = 'none';

  elem.style.filter = '';
  markup.style.color = '#ffffff';
}

function convertHTML(str, container) {
  const arrOfSubstr = str.split('\n');
  arrOfSubstr.forEach((substr) => {
    const div = document.createElement('div');
    div.innerText = substr;
    container.append(div);
  });
}

const selectAll = (selector) =>
  document.querySelector('.example-container').querySelectorAll(selector);
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
