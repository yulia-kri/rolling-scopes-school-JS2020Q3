export default function createLevelsList(list, container) {
  list.forEach((level, i) => {
    container.insertAdjacentHTML(
      'beforeend',
      `<a class="level-list__level" data-level="${i}">
          <span class="level__checkmark"></span>
          <span class="level__number">${i + 1}</span>
          ${level.name}
        </a>`
    );
  });
}
