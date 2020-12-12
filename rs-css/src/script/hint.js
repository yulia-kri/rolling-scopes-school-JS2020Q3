import { getCurrentLevel } from './localStorage';
import levels from './levels.data';
import { levelCompleted } from './checkAnswer';

function animateTyping(string, level, container) {
  const hintBtn = document.querySelector('.hint');
  const levelElements = document.querySelectorAll('.level-list__level');
  const arrText = new Array(string);
  const speed = 200;
  const index = 0;
  const arrLength = arrText[0].length;
  let textPos = 0;

  function typewriter() {
    container.setValue(`${arrText[index].substring(0, textPos)}|`);

    if (textPos++ === arrLength) {
      textPos = 0;
      setTimeout(() => {
        container.setValue('');
        levelCompleted(level, string, true);
        hintBtn.disabled = false;
        levelElements.forEach((element) => {
          const levelElem = element;
          levelElem.classList.remove('disable');
        });
      }, 700);
    } else {
      setTimeout(typewriter, speed);
    }
  }

  typewriter();
}

export default function getHint(container) {
  const level = getCurrentLevel();
  const answer = levels[level].selector;
  animateTyping(answer, level, container);
}
