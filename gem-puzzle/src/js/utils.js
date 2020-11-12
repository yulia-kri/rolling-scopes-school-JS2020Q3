import { puzzle } from './index';

export function toggleSound() {
  const optionON = document.querySelector('[data-option="on"]');
  const optionOFF = document.querySelector('[data-option="off"]');

  if (this.checked !== true) {
    puzzle.isSoundOn = true;
    optionON.classList.add('active');
    optionOFF.classList.remove('active');
  } else {
    puzzle.isSoundOn = false;
    optionOFF.classList.add('active');
    optionON.classList.remove('active');
  }
}
