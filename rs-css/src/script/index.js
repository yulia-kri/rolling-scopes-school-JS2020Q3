import '../styles/style.css';
import { displayLevel, submit } from '../script/level';

let currentLevel = 0;

const levels = document.querySelector('.level-list');
const form = document.querySelector('.css-form');

window.addEventListener('DOMContentLoaded', () => {
  displayLevel(currentLevel);
});

levels.addEventListener('click', (e) => {
  const levelElem = e.target.closest('.level-list__level');
  if (!levelElem) return;
  currentLevel = levelElem.dataset.level;
  console.log('current level is', currentLevel);
  displayLevel(currentLevel);
});

form.addEventListener('submit', (e) => {
  submit(e, currentLevel);
});

export function nextLevel() {
  currentLevel += 1;
  displayLevel(currentLevel);
}
