import { getProgress } from './localStorage';

export default function createLevelsList(list, container) {
  const completedLevels = getProgress();
  list.forEach((level, i) => {
    let completed = '';
    if (completedLevels[i]) {
      completed = completedLevels[i].isUsingHint ? 'with-hint' : 'completed';
    }
    container.insertAdjacentHTML(
      'beforeend',
      `<a class="level-list__level" data-level="${i}">
          <span class="level__checkmark ${completed}"></span>
          <span class="level__number">${i + 1}</span>
          ${level.name}
        </a>`
    );
  });
}
