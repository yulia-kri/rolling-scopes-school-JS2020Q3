import { levels } from './levels';
import { nextLevel } from './index';

const displayTask = document.querySelector('.task');
const displayGame = document.querySelector('.game-wrapper');
const displayHTML = document.querySelector('.html__markup');

export function displayLevel(level) {
  const content = levels[level];
  displayTask.innerText = content.task;
  displayGame.innerHTML = content.html;
  displayHTML.innerHTML = convertHTML(content.html);
}

function convertHTML(str) {
  let newStr = str.replace(/</g, '&lt;');
  newStr = newStr.replace(/>/g, '&gt;');
  return newStr;
}

const select = (elem) => document.querySelector(elem);

const checkAnswer = (level, answer) => levels[level].answer === answer;

export function submit(e, level) {
  e.preventDefault();

  const input = e.target.elements[0];
  const { value } = input;
  input.value = '';

  checkAnswer(level, value) ? levelCompleted(level) : wrongAnswer();
}

function levelCompleted(level) {
  const DOMelements = [];
  const elemArr = levels[level].result;
  const checkmark = select(`[data-level='${level}']`).querySelector(
    '.level__checkmark'
  );

  elemArr.map((obj) => DOMelements.push(select(obj)));
  DOMelements.forEach(
    (elem) => (elem.style.animation = 'slide-up 0.5s ease-in-out forwards')
  );

  checkmark.classList.add('completed');

  setTimeout(nextLevel, 700);
}

function wrongAnswer() {
  const editor = select('.editor');
  editor.style.animation = 'shake 0.7s ease-in-out';
  setTimeout(() => {
    editor.style.animation = '';
  }, 700);
}
