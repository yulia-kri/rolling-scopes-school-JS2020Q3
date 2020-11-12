import { page } from './index';

export function toggleSound() {
  const optionON = document.querySelector('[data-option="on"]');
  const optionOFF = document.querySelector('[data-option="off"]');

  if (this.checked !== true) {
    page.puzzle.isSoundOn = true;
    optionON.classList.add('active');
    optionOFF.classList.remove('active');
  } else {
    page.puzzle.isSoundOn = false;
    optionOFF.classList.add('active');
    optionON.classList.remove('active');
  }
}
