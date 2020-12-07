import levels from './levels.data';
import { getCurrentLevel, getProgress, setProgress } from './localStorage';
import { select, selectAll, addAnimation } from './utils';
import checkProgress from './checkProgress';

export function levelCompleted(level, selector, isUsingHint) {
  const animation = 'slide-up 0.5s ease-in-out forwards';
  const attr = `[data-level='${level}']`;
  const checkmark = select(attr).querySelector('.level__checkmark');

  const DOMelements = selectAll(selector);
  addAnimation(DOMelements, animation);

  checkmark.classList.add(isUsingHint ? 'with-hint' : 'completed');

  let progress = {};
  if (!getProgress()) {
    progress[level] = { isUsingHint };
  } else {
    progress = getProgress();
    if (!progress[level]) {
      progress[level] = { isUsingHint };
    } else {
      progress[level].isUsingHint = isUsingHint;
    }
  }
  setProgress(progress);
  checkProgress(progress, level);
}

function wrongAnswer() {
  const editor = select('.editor');
  editor.style.animation = 'shake 0.7s ease-in-out';
  setTimeout(() => {
    editor.style.animation = '';
  }, 700);
}

function nodeListsAreEqual(list1, list2) {
  if (list1.length !== list2.length) {
    return false;
  }
  return Array.from(list1).every((node, index) => node === list2[index]);
}

function checkAnswer(level, answer) {
  try {
    const userSelect = selectAll(answer);
    const correctSelect = selectAll(levels[level].selector);
    return nodeListsAreEqual(userSelect, correctSelect);
  } catch {
    wrongAnswer();
  }
  return false;
}

export function submit(value) {
  const level = getCurrentLevel();

  if (checkAnswer(level, value)) {
    levelCompleted(level, value, false);
  } else {
    wrongAnswer();
  }
}
