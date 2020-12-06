import hljs from '../highlight/highlight.pack';
import '../highlight/styles/shades-of-purple.css';
import { levels } from './levels.data';
import {
  setCurrentLevel,
  getCurrentLevel,
  setProgress,
  getProgress,
} from './localStorage';
import showModal from './modal';

const displayTask = document.querySelector('.task');
const displayExample = document.querySelector('.example-container');
const displayHTML = document.querySelector('.panel__html');
const tooltipElem = document.querySelector('.tooltip');
const spinAnimation = 'spin 8s infinite linear';
const shadow = `drop-shadow(5px 5px 16px rgba(255, 255, 255, 0.4))
drop-shadow(-5px -5px 16px rgba(255, 255, 255, 0.4))`;
const delay = 700;

export function displayLevel() {
  if (!getCurrentLevel()) setCurrentLevel(0);
  const level = getCurrentLevel();
  const content = levels[level];
  displayTask.innerText = content.task;
  displayExample.innerHTML = content.html;
  displayHTML.innerText = '';
  convertHTML(content.html, displayHTML);

  document.querySelectorAll('.html').forEach((block) => {
    hljs.highlightBlock(block);
  });

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

  const DOMelements = selectAll(content.selector);
  addAnimation(DOMelements, spinAnimation);

  addActive(level);
}

export function getHint(container) {
  const level = getCurrentLevel();
  const answer = levels[level].selector;
  animateTyping(answer, level, container);
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
  markup.classList.add('highlight');
}

function hideTooltip(elem, markup) {
  tooltipElem.style.display = 'none';

  elem.style.filter = '';
  markup.classList.remove('highlight');
}

function convertHTML(str, container) {
  const arrOfSubstr = str.split('\n');
  arrOfSubstr.forEach((substr) => {
    const div = document.createElement('code');
    div.classList.add('html');
    div.innerText = substr;
    container.append(div);
  });
}

const selectAll = (selector) =>
  document.querySelector('.example-container').querySelectorAll(selector);
const select = (selector) => document.querySelector(selector);

function nodeListsAreEqual(list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  }
  return Array.from(list1).every((node, index) => node === list2[index]);
}

function checkAnswer(level, answer) {
  try {
    const userSelect = selectAll(answer);
    const rightSelect = selectAll(levels[level].selector);
    return nodeListsAreEqual(userSelect, rightSelect);
  } catch {
    wrongAnswer();
  }
}

export function submit(value) {
  const level = getCurrentLevel();

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

  let progress = {};
  if (!getProgress()) {
    progress[level] = { isUsingHint };
  } else {
    progress = getProgress();
    if (!progress[level]) {
      progress[level] = { isUsingHint };
    } else {
      progress[level].isUsingHint = isUsingHint;
    }
  }
  setProgress(progress);
  checkProgress(progress, level);
}

function checkProgress(progress, currentLevel) {
  const numOfCompleted = Object.keys(progress).length;
  if (numOfCompleted === levels.length) {
    showModal();
  } else if (+currentLevel === levels.length - 1) {
    const completed = Object.keys(progress);
    const startAtLevel = firstIncompleted(completed);
    setCurrentLevel(startAtLevel);
    displayLevel();
  } else {
    setTimeout(nextLevel, delay);
  }
}

function firstIncompleted(completed) {
  for (let i = 0; i < levels.length - 1; i++) {
    if (i !== +completed[i]) {
      return i;
    }
  }
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

function animateTyping(string, level, container) {
  const arrText = new Array(string);
  const speed = 200;
  let index = 0;
  const arrLength = arrText[0].length;
  let textPos = 0;

  (function typewriter() {
    container.setValue(arrText[index].substring(0, textPos) + '|');
    if (textPos++ == arrLength) {
      textPos = 0;
      setTimeout(() => {
        container.setValue('');
        levelCompleted(level, string, true);
      }, delay);
    } else {
      setTimeout(typewriter, speed);
    }
  })();
}

function nextLevel() {
  let currentLevel = getCurrentLevel();
  currentLevel++;
  setCurrentLevel(currentLevel);
  displayLevel();
}

function addActive(level) {
  const levelsElem = document.querySelectorAll('.level-list__level');
  levelsElem.forEach((elem) => elem.classList.remove('active'));
  levelsElem[+level].classList.add('active');
}
