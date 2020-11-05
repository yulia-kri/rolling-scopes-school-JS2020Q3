import { updateGame } from './index';

export default function createPlayingBoardOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('playing-board__overlay', 'visible');
  overlay.innerText = 'Play';
  document.querySelector('.container').prepend(overlay);
  overlay.addEventListener('click', updateGame);
}
