import { getCurrentLevel } from './localStorage';
import levels from './levels.data';
import { levelCompleted } from './checkAnswer';

function animateTyping(string, level, container) {
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
