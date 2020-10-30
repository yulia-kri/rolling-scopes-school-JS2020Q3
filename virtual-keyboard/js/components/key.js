import create from '../utils/create.js';

export default class Key {
  constructor({ small, shift, code }) {
    this.small = small;
    this.shift = shift;
    this.code = code;
    this.isFnKey = Boolean(small.match(/Ctrl|Shift|Caps|Alt|Tab|Backspace|Del|Enter|arr|Win/));

    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
      this.subst = create('div', 'sub', shift);
    } else {
      this.subst = create('div', 'sub', '');
    }
    this.letter = create('div', 'letter', small);

    this.keyContainer = create('div', 'keyboard__key', [this.subst, this.letter], ['code', code],
      this.isFnKey ? ['fn', 'true'] : ['fn', 'false']);
  }
}
