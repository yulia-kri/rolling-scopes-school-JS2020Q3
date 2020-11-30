export function setCurrentLevel(n) {
  localStorage.setItem('currentLevel', n);
}

export function getCurrentLevel() {
  return localStorage.getItem('currentLevel');
}
