import hljs from '../highlight/highlight.pack';
import '../highlight/styles/shades-of-purple.css';
import levels from './levels.data';
import { setCurrentLevel, getCurrentLevel } from './localStorage';
import { selectAll, addAnimation } from './utils';
import { showTooltip, hideTooltip } from './tooltip';

const displayCurrentLevel = document.querySelector('.current-level');
const displayTask = document.querySelector('.task');
const displayExample = document.querySelector('.example-container');
const displayHTML = document.querySelector('.panel__html');

const spinAnimation = 'spin 8s infinite linear';

function convertHTML(str, container) {
  const arrOfSubstr = str.split('\n');
  arrOfSubstr.forEach((substr) => {
    const div = document.createElement('code');
    div.classList.add('html');
    div.innerText = substr;
    container.append(div);
  });
}

function makeActive(level) {
  const levelsElem = document.querySelectorAll('.level-list__level');
  levelsElem.forEach((elem) => elem.classList.remove('active'));
  levelsElem[+level].classList.add('active');
}

export default function displayLevel() {
  if (!getCurrentLevel()) setCurrentLevel(0);

  const level = getCurrentLevel();
  const content = levels[level];

  displayCurrentLevel.innerText = parseInt(+level + 1, 10);
  displayTask.innerText = content.task;
  displayExample.innerHTML = content.html;
  displayHTML.innerText = '';
  convertHTML(content.html, displayHTML);

  document.querySelectorAll('.html').forEach((block) => {
    hljs.highlightBlock(block);
  });

  Array.from(displayExample.children).forEach((element, i) => {
    element.addEventListener('mouseenter', (e) => {
      const elem = e.target;
      const markup = displayHTML.children[i];

      showTooltip(elem, markup);
    });
    element.addEventListener('mouseleave', (e) => {
      const elem = e.target;
      const markup = displayHTML.children[i];

      hideTooltip(elem, markup);
    });
  });

  Array.from(displayHTML.children).forEach((html, i) => {
    html.addEventListener('mouseenter', (e) => {
      const elem = displayExample.children[i];
      const markup = e.target;

      showTooltip(elem, markup);
    });
    html.addEventListener('mouseleave', (e) => {
      const elem = displayExample.children[i];
      const markup = e.target;

      hideTooltip(elem, markup);
    });
  });

  const DOMelements = selectAll(content.selector);
  addAnimation(DOMelements, spinAnimation);

  makeActive(level);
}
