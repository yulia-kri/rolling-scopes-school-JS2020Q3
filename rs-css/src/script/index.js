import '../styles/style.css';
import { displayLevel } from '../script/level';

let currentLevel = 0;

const levels = document.querySelector('.level-list');

window.addEventListener('DOMContentLoaded', () => {
  displayLevel(currentLevel);
});

levels.addEventListener('click', (e) => {
  const levelElem = e.target.closest('.level-list__level');
  if (!levelElem) return;
  currentLevel = levelElem.dataset.level;
  displayLevel(currentLevel);
});
