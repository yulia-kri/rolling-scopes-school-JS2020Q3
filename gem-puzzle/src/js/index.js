import '../styles/style.css';
import Puzzle from './puzzle';
import createPlayingBoardOverlay from './overlay';
import { createSettingsButton, createPopup, createBlackout } from './settings';

const puzzle = new Puzzle();
let paused = true;
// let gameOver = false;

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

export function updateGame() {
  const playButton = document.querySelector('.play-button');
  const overlay = document.querySelector('.playing-board__overlay');

  paused = !paused;
  if (paused === true) {
    playButton.innerText = 'Start';
    overlay.classList.add('visible');
  } else {
    playButton.innerText = 'Pause';
    overlay.classList.remove('visible');
  }
}

export function showPopup() {
  const popup = document.querySelector('.popup');
  const blackout = document.querySelector('.blackout');
  const playButton = document.querySelector('.play-button');
  const overlay = document.querySelector('.playing-board__overlay');

  if (
    popup.classList.contains('visible') &&
    blackout.classList.contains('visible')
  ) {
    popup.classList.remove('visible');
    blackout.classList.remove('visible');
    if (paused === true && !overlay.classList.contains('visible')) {
      paused = false;
      playButton.innerText = 'Pause';
    }
  } else {
    popup.classList.add('visible');
    blackout.classList.add('visible');
    if (paused === false) {
      paused = true;
      playButton.innerText = 'Paused';
    }
  }
}

puzzle.init();
displayTime();
createBlackout();
createPlayingBoardOverlay();
createSettingsButton();
createPopup();
