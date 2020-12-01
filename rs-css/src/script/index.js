import '../styles/style.css';
// import './animation';
import { levels } from './levels.data';
import createLevelsList from './levels';
import { displayLevel, submit, getHint } from './level';
import { setCurrentLevel, getCurrentLevel } from './localStorage';
import { showModal } from './modal';

const levelsList = document.querySelector('.level-list');
const form = document.querySelector('.css-form');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.right-col');
const hint = document.querySelector('.hint');
const resetBtn = document.querySelector('.reset-btn');

window.addEventListener('DOMContentLoaded', () => {
  if (!getCurrentLevel()) setCurrentLevel(0);
  let currentLevel = getCurrentLevel();
  createLevelsList(levels, levelsList);
  displayLevel(currentLevel);
});

levelsList.addEventListener('click', (e) => {
  const levelElem = e.target.closest('.level-list__level');
  if (!levelElem) return;
  const level = levelElem.dataset.level;
  displayLevel(level);
  setCurrentLevel(level);
});

form.addEventListener('submit', (e) => {
  submit(e, getCurrentLevel());
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menu.classList.toggle('open');
});

hint.addEventListener('click', () => getHint(getCurrentLevel()));

resetBtn.addEventListener('click', showModal);
