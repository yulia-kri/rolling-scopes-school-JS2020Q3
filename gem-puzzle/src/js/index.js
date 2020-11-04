import '../styles/style.css';
import Puzzle from './puzzle';

const puzzle = new Puzzle();
let paused = true;
let gameOver = false;

let min = 0;
let sec = 0;

function displayTime() {
  const timer = document.querySelector('[data-id="time"]');
  if (!paused) {
    if (min === 59 && sec === 59) {
      min = 0;
      sec = 0;
    }
    if (sec === 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }
    timer.innerText = `Time: ${addZero(min)}:${addZero(sec)}`;
  } else {
    let currentTime = timer.innerText;
    let arr = currentTime.split(':');
    min = parseInt(arr[1]);
    sec = parseInt(arr[2]);
    timer.innerText = `Time: ${addZero(min)}:${addZero(sec)}`;
  }
  setTimeout(displayTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');
  overlay.innerText = 'Play';
  document.querySelector('.container').prepend(overlay);
  overlay.addEventListener('click', updateGame);
}

export function updateGame() {
  paused = !paused;
  if (paused === true) {
    document.querySelector('.play-button').innerText = 'Start';
    document.querySelector('.overlay').classList.add('active');
  } else {
    document.querySelector('.play-button').innerText = 'Pause';
    document.querySelector('.overlay').classList.remove('active');
  }
}

puzzle.init();
displayTime();
createOverlay();
