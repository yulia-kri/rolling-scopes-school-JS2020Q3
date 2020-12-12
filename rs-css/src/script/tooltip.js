const tooltipElem = document.querySelector('.tooltip');
const shadow = `drop-shadow(5px 5px 16px rgba(255, 255, 255, 0.4))
drop-shadow(-5px -5px 16px rgba(255, 255, 255, 0.4))`;

export function showTooltip(elem, markup) {
  const top = elem.offsetTop - 20;
  const left = elem.offsetLeft + elem.offsetWidth / 2;
  const tooltipText = markup.innerText;

  tooltipElem.innerText = tooltipText;
  tooltipElem.style.top = `${top}px`;
  tooltipElem.style.left = `${left}px`;
  tooltipElem.style.display = 'block';

  const htmlElem = elem;
  htmlElem.style.filter = shadow;
  markup.classList.add('highlight');
}

export function hideTooltip(elem, markup) {
  tooltipElem.style.display = 'none';

  const htmlElem = elem;
  htmlElem.style.filter = '';
  markup.classList.remove('highlight');
}
