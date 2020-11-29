import '../styles/style.css';
// import './animation';
import { levels } from './levels.data';
import createLevelsList from './levels';
import { displayLevel, submit, getHint } from './level';

let currentLevel = 0;

const levelsList = document.querySelector('.level-list');
const form = document.querySelector('.css-form');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.right-col');
const hint = document.querySelector('.hint');

window.addEventListener('DOMContentLoaded', () => {
  createLevelsList(levels, levelsList);
  displayLevel(currentLevel);
});

levelsList.addEventListener('click', (e) => {
  const levelElem = e.target.closest('.level-list__level');
  if (!levelElem) return;
  const level = levelElem.dataset.level;
  displayLevel(level);
  currentLevel = level;
});

form.addEventListener('submit', (e) => {
  submit(e, currentLevel);
});

export function nextLevel() {
  currentLevel++;
  displayLevel(currentLevel);
}

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menu.classList.toggle('open');
});

hint.addEventListener('click', () => getHint(currentLevel));
