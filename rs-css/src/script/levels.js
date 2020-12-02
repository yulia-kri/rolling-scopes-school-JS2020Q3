import { getProgress } from './localStorage';
import { levels } from './levels.data';

const levelsList = document.querySelector('.level-list');

export default function createLevelsList() {
  const completedLevels = getProgress();
  levels.forEach((level, i) => {
    let completed = '';
    if (completedLevels && completedLevels[i]) {
      completed = completedLevels[i].isUsingHint ? 'with-hint' : 'completed';
    }
    levelsList.insertAdjacentHTML(
      'beforeend',
      `<a class="level-list__level" data-level="${i}">
          <span class="level__checkmark ${completed}"></span>
          <span class="level__number">${i + 1}</span>
          ${level.name}
        </a>`
    );
  });
}
