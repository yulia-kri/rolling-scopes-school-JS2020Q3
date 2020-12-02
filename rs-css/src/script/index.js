import '../styles/style.css';
// import './animation';
import createLevelsList from './levels';
import { displayLevel, submit, getHint } from './level';
import { setCurrentLevel, getCurrentLevel } from './localStorage';

const levelsList = document.querySelector('.level-list');
const form = document.querySelector('.css-form');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.right-col');
const hint = document.querySelector('.hint');

window.addEventListener('DOMContentLoaded', () => {
  createLevelsList();
  displayLevel();
});

levelsList.addEventListener('click', (e) => {
  const levelElem = e.target.closest('.level-list__level');
  if (!levelElem) return;
  const level = levelElem.dataset.level;
  setCurrentLevel(level);
  displayLevel();
});

form.addEventListener('submit', (e) => {
  submit(e, getCurrentLevel());
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menu.classList.toggle('open');
});

hint.addEventListener('click', () => getHint(getCurrentLevel()));
