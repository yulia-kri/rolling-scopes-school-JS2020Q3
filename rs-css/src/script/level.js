import { levels } from './levels';

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
