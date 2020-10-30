import en from '../data/en.js';
import ru from '../data/ru.js';
import create from '../utils/create.js';
import Key from './key.js';

const languages = {};
languages.en = en;
languages.ru = ru;

export default class Keyboard {
  constructor(keysOrder) {
    this.keysOrder = keysOrder;
    this.keysPressed = {};
    this.isCaps = false;
    this.isKeyboardOpen = true;
  }

  init() {
    this.keyboardLayout = languages.en;
    this.textarea = create(
      'textarea',
      'use-keyboard-input',
      null,
      ['placeholder', 'Start type something...'],
      ['rows', 5],
      ['cols', 50],
      ['spellcheck', false],
      ['autocorrect', 'off']
    );
    this.keysContainer = create('div', 'keyboard', null, ['language', 'en']);

    document.body.append(this.textarea);
    document.body.append(this.keysContainer);

    this.textarea.addEventListener('focus', () => {
      if (!this.isKeyboardOpen) {
        this.open();
      }
    });

    return this;
  }

  createKeys() {
    this.keyButtons = [];
    this.keysOrder.forEach((row) => {
      const rowElement = create('div', 'keyboard__row', null);
      row.forEach((keyCode) => {
        const keyObj = this.keyboardLayout.find((key) => key.code === keyCode);
        if (keyObj) {
          const keyButton = new Key(keyObj);
          this.keyButtons.push(keyButton);
          rowElement.append(keyButton.keyContainer);
        }
      });
      this.keysContainer.append(rowElement);
    });

    document.addEventListener('keyup', this.eventHandler);
    document.addEventListener('keydown', this.eventHandler);
    this.keysContainer.addEventListener('mousedown', this.preEventHandler);
    this.keysContainer.addEventListener('mouseup', this.preEventHandler);
  }

  resetButtonState = ({
    target: {
      dataset: { code },
    },
  }) => {
    const pressedKey = this.keyButtons.find(
      (keyButton) => keyButton.code === code
    );
    pressedKey.keyContainer.classList.remove('active');
    pressedKey.keyContainer.removeEventListener(
      'mouseleave',
      this.resetButtonState
    );
  };

  open() {
    this.isKeyboardOpen = true;
    this.keysContainer.classList.remove('keyboard--hidden');
  }

  close() {
    this.isKeyboardOpen = false;
    this.keysContainer.classList.add('keyboard--hidden');
    this.textarea.blur();
  }

  preEventHandler = (event) => {
    event.stopPropagation();
    const keyDiv = event.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const {
      dataset: { code },
    } = keyDiv;
    keyDiv.addEventListener('mouseleave', this.resetButtonState);
    this.eventHandler({ code, type: event.type });
  };

  eventHandler = (event) => {
    if (event.stopPropagation) event.stopPropagation();
    const { code, type } = event;
    const pressedKeyObj = this.keyButtons.find(
      (keyButton) => keyButton.code === code
    );
    if (!pressedKeyObj) return;
    this.textarea.focus();

    if (type.match(/keydown|mousedown/)) {
      if (type.match(/key/)) event.preventDefault();
      pressedKeyObj.keyContainer.classList.add('active');

      if (code.match(/Shift/)) {
        this.isShift = true;
        this.switchUpperCase();
      }

      if (code == 'CapsLock') {
        if (!this.isCaps) {
          this.isCaps = true;
        } else {
          this.isCaps = false;
          pressedKeyObj.keyContainer.classList.remove('active');
        }
        this.switchUpperCase();
      }

      if (!this.isCaps) {
        this.print(
          pressedKeyObj,
          this.isShift ? pressedKeyObj.shift : pressedKeyObj.small
        );
      } else if (this.isCaps) {
        if (this.isShift) {
          this.print(
            pressedKeyObj,
            pressedKeyObj.subst.innerHTML
              ? pressedKeyObj.shift
              : pressedKeyObj.small
          );
        } else if (!this.isShift) {
          this.print(
            pressedKeyObj,
            !pressedKeyObj.subst.innerHTML
              ? pressedKeyObj.shift
              : pressedKeyObj.small
          );
        }
      }
    } else if (type.match(/keyup|mouseup/)) {
      if (code != 'CapsLock')
        pressedKeyObj.keyContainer.classList.remove('active');

      if (code.match(/Shift/)) {
        this.isShift = false;
        this.switchUpperCase();
      }

      if (code == 'Lang') this.switchLanguage();

      if (code == 'Done') {
        this.close();
      }
    }
  };

  switchLanguage() {
    if (this.keysContainer.dataset.language == 'en') {
      this.keysContainer.dataset.language = 'ru';
      this.keyboardLayout = languages.ru;
    } else {
      this.keysContainer.dataset.language = 'en';
      this.keyboardLayout = languages.en;
    }

    this.keyButtons.forEach((button) => {
      const curLangBtn = this.keyboardLayout.find(
        (key) => key.code === button.code
      );
      if (!curLangBtn) return;
      button.small = curLangBtn.small;
      button.shift = curLangBtn.shift;
      if (curLangBtn.shift && curLangBtn.shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/g)) {
        button.subst.innerHTML = curLangBtn.shift;
      } else {
        button.subst.innerHTML = '';
      }
      button.letter.innerHTML = curLangBtn.small;
    });
  }

  switchUpperCase() {
    const symbolKeyButtons = this.keyButtons.filter(
      (button) => button.isFnKey === false
    );
    symbolKeyButtons.forEach((button) => {
      if (button.subst.innerHTML) {
        if (this.isShift) {
          button.subst.classList.add('sub-active');
          button.letter.classList.add('sub-inactive');
        } else if (!this.isShift) {
          button.subst.classList.remove('sub-active');
          button.letter.classList.remove('sub-inactive');
        }
      } else if (!button.subst.innerHTML) {
        if (this.isCaps) {
          this.isShift
            ? (button.letter.innerHTML = button.small)
            : (button.letter.innerHTML = button.shift);
        } else if (!this.isCaps) {
          this.isShift
            ? (button.letter.innerHTML = button.shift)
            : (button.letter.innerHTML = button.small);
        }
      }
    });
  }

  print(keyObj, symbol) {
    let carriagePos = this.textarea.selectionStart;
    const leftArea = this.textarea.value.slice(0, carriagePos);
    const rightArea = this.textarea.value.slice(carriagePos);
    const fnBtnHandler = {
      Tab: () => {
        this.textarea.value = `${leftArea}\t${rightArea}`;
        carriagePos += 1;
      },
      Enter: () => {
        this.textarea.value = `${leftArea}\n${rightArea}`;
        carriagePos += 1;
      },
      Space: () => {
        this.textarea.value = `${leftArea} ${rightArea}`;
        carriagePos += 1;
      },
      Backspace: () => {
        this.textarea.value = `${leftArea.slice(0, -1)}${rightArea}`;
        carriagePos -= 1;
      },
      Delete: () => {
        this.textarea.value = `${leftArea}${rightArea.slice(1)}`;
      },
      ArrowLeft: () => {
        carriagePos = carriagePos - 1 >= 0 ? carriagePos - 1 : 0;
      },
      ArrowRight: () => {
        carriagePos += 1;
      },
      ArrowUp: () => {
        const posFromLineBreak = leftArea.match(/(\n).*$(?!\1)/g) || [[1]];
        carriagePos -= posFromLineBreak[0].length;
      },
      ArrowDown: () => {
        const posFromLineBreak = rightArea.match(/^.*(\n).*(?!\1)/) || [[1]];
        carriagePos += posFromLineBreak[0].length;
      },
    };

    if (fnBtnHandler[keyObj.code]) fnBtnHandler[keyObj.code]();
    else if (!keyObj.isFnKey) {
      this.textarea.value = `${leftArea}${symbol || ''}${rightArea}`;
      carriagePos += 1;
    }
    this.textarea.setSelectionRange(carriagePos, carriagePos);
  }
}
