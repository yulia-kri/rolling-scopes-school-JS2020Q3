import { setCurrentLevel } from './localStorage';
import displayLevel from './level';

const modalBg = document.querySelector('.modal-bg');
const modalMessage = document.querySelector('.modal__text');
const modalBtns = modalBg.querySelector('.modal__buttons');

const modal = [
  {
    message: 'Are you sure you want to reset your progress?',
    buttons: `<button class="modal__button">Nooo, please</button>
  <button class="modal__button confirm">Yes, let's do it!</button>`,
  },
  {
    message:
      'Congratulations! Now you rock at CSS selectors. And at planets in the Solar System, I hope.',
    buttons: '<button class="modal__button confirm">Start new game</button>',
  },
];

function resetGame() {
  const checkmarks = document.querySelectorAll('.level__checkmark');
  localStorage.removeItem('progress');
  checkmarks.forEach((checkmark) => {
    const elem = checkmark;
    elem.className = 'level__checkmark';
  });
  setCurrentLevel(0);
  displayLevel();
}

export default function showModal(isGameOver) {
  const index = isGameOver ? 1 : 0;

  modalBg.classList.add('modal-bg--active');

  modalMessage.innerText = modal[index].message;

  modalBtns.innerHTML = modal[index].buttons;

  modalBtns.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__button')) return;
    if (e.target.classList.contains('confirm')) {
      resetGame();
    }
    modalBg.classList.remove('modal-bg--active');
  });
}
