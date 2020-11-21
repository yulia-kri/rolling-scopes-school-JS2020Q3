import { page } from './index';

const base =
  'https://raw.githubusercontent.com/irinainina/image-data/master/box/';

export function toggleSound() {
  const optionON = document.querySelector('[data-option="on"]');
  const optionOFF = document.querySelector('[data-option="off"]');

  if (!this.checked) {
    page.puzzle.isSoundOn = true;
    optionON.classList.add('active');
    optionOFF.classList.remove('active');
  } else {
    page.puzzle.isSoundOn = false;
    optionOFF.classList.add('active');
    optionON.classList.remove('active');
  }
}

function getRandomInteger() {
  return Math.floor(Math.random() * 150) + 1;
}

export function getRandomImage() {
  return `${base}${getRandomInteger()}.jpg`;
}
