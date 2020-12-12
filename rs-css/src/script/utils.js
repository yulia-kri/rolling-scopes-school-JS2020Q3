export function selectAll(selector) {
  return document.querySelector('.example-container').querySelectorAll(selector);
}

export function select(selector) {
  return document.querySelector(selector);
}

export function addAnimation(elements, animation) {
  elements.forEach((item) => {
    const elem = item;
    elem.style.animation = animation;
  });
}
