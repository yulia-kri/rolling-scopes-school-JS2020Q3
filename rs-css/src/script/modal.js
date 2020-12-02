import { setCurrentLevel } from './localStorage';
import { displayLevel } from './level';

export function showModal() {
  const modalBg = document.querySelector('.modal-bg');
  const modalBtns = modalBg.querySelector('.modal__buttons');

  modalBg.classList.add('modal-bg--active');

  modalBtns.addEventListener('click', (e) => {
    if (!e.target.classList.contains('modal__button')) return;
    if (e.target.classList.contains('confirm')) {
      const checkmarks = document.querySelectorAll('.level__checkmark');
      // add function resetGame()
      localStorage.removeItem('progress');
      checkmarks.forEach((elem) => (elem.className = 'level__checkmark'));
      setCurrentLevel(0);
      displayLevel();
    }
    modalBg.classList.remove('modal-bg--active');
  });
}
