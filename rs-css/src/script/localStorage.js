export function setCurrentLevel(n) {
  localStorage.setItem('currentLevel', n);
}

export function getCurrentLevel() {
  return Number(localStorage.getItem('currentLevel'));
}

export function setProgress(obj) {
  localStorage.setItem('progress', JSON.stringify(obj));
}

export function getProgress() {
  return JSON.parse(localStorage.getItem('progress'));
}
