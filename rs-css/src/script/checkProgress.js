import levels from './levels.data';
import { getCurrentLevel, setCurrentLevel } from './localStorage';
import displayLevel from './level';
import showModal from './modal';

function firstIncompleted(completed) {
  for (let i = 0; i < levels.length - 1; i++) {
    if (i !== +completed[i]) {
      return i;
    }
  }
  return false;
}

function nextLevel() {
  let currentLevel = getCurrentLevel();
  currentLevel++;
  setCurrentLevel(currentLevel);
  displayLevel();
}

export default function checkProgress(progress, currentLevel) {
  const numOfCompleted = Object.keys(progress).length;
  if (numOfCompleted === levels.length) {
    showModal(true);
  } else if (+currentLevel === levels.length - 1) {
    const completed = Object.keys(progress);
    const startAtLevel = firstIncompleted(completed);
    setCurrentLevel(startAtLevel);
    displayLevel();
  } else {
    setTimeout(nextLevel, 700);
  }
}
