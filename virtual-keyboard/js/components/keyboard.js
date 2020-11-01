import en from '../data/en.js';
import ru from '../data/ru.js';
import create from '../utils/create.js';
import Key from './key.js';

const languages = {};
languages.en = en;
languages.ru = ru;

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export default class Keyboard {
  constructor(keysOrder) {
    this.keysOrder = keysOrder;
    this.keysPressed = {};
    this.isCaps = false;
    this.isShift = false;
    this.isKeyboardOpen = true;
    this.isSoundOn = true;
    this.isRecording = false;
    this.recognition = null;
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

  open() {
    this.isKeyboardOpen = true;
    this.keysContainer.classList.remove('keyboard--hidden');
  }

  close() {
    this.isKeyboardOpen = false;
    this.keysContainer.classList.add('keyboard--hidden');
    this.textarea.blur();
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

  preEventHandler = (event) => {
    event.stopPropagation();
    const keyDiv = event.target.closest('.keyboard__key');
    if (!keyDiv) return;
    const {
      dataset: { code },
    } = keyDiv;
    if (!code.match(/CapsLock|Shift/)) {
      keyDiv.addEventListener('mouseleave', this.resetButtonState);
    }
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
        if (type == 'keydown') {
          this.isShift = true;
        } else if (type == 'mousedown') {
          if (!this.isShift) {
            this.isShift = true;
          } else {
            this.isShift = false;
            pressedKeyObj.keyContainer.classList.remove('active');
          }
        }
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

      if (code == 'Record') {
        this.toggleRecognition();
        return;
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
      if (this.isSoundOn) this.playSound(code);

      if (!code.match(/CapsLock|Shift/)) {
        pressedKeyObj.keyContainer.classList.remove('active');
      }

      if (code.match(/Shift/) && type == 'keyup') {
        this.isShift = false;
        this.switchUpperCase();
        pressedKeyObj.keyContainer.classList.remove('active');
      }

      if (code == 'Sound') this.toggleSound();

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
      Record: () => {
        this.textarea.value = `${leftArea}${symbol || ''}${rightArea}`;
        carriagePos += symbol.length;
      },
    };

    if (fnBtnHandler[keyObj.code]) fnBtnHandler[keyObj.code]();
    else if (!keyObj.isFnKey) {
      this.textarea.value = `${leftArea}${symbol || ''}${rightArea}`;
      carriagePos += 1;
    }
    this.textarea.setSelectionRange(carriagePos, carriagePos);
  }

  toggleSound() {
    if (this.isSoundOn == true) {
      document.querySelector('.keyboard__key[data-code="Sound"] i').innerText =
        'volume_off';
      this.isSoundOn = false;
    } else if (this.isSoundOn == false) {
      document.querySelector('.keyboard__key[data-code="Sound"] i').innerText =
        'volume_up';
      this.isSoundOn = true;
    }
  }

  playSound(keyCode) {
    let type;
    if (keyCode.match('Shift|Caps|Backspace|Enter')) {
      type = 'fn-key';
    } else if (this.keysContainer.dataset.language == 'en') {
      type = 'en-key';
    } else {
      type = 'ru-key';
    }
    const audio = document.querySelector(`audio[data-key="${type}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }

  toggleRecognition() {
    this.isRecording = !this.isRecording;

    if (this.isRecording) {
      this.recognition = new SpeechRecognition();
      this.recognition.interimResults = false;
      this.recognition.lang = `${this.keysContainer.dataset.language}`;
      this.recognition.addEventListener('result', this.recognizeSpeech);
      this.recognition.addEventListener('end', this.recognition.start);
      this.recognition.start();
      document.querySelector('.keyboard__key[data-code="Record"] i').innerText =
        'mic';
      document.querySelector('[data-code="Record"]').classList.add('recording');
    } else {
      this.recognition.removeEventListener('result', this.recognizeSpeech);
      this.recognition.removeEventListener('end', this.recognition.start);
      this.recognition.stop();
      this.recognition = null;
      document.querySelector('.keyboard__key[data-code="Record"] i').innerText =
        'mic_none';
      document
        .querySelector('[data-code="Record"]')
        .classList.remove('recording');
    }
  }

  recognizeSpeech = (e) => {
    const recordKey = this.keyButtons.find(
      (keyButton) => keyButton.code === 'Record'
    );
    if (!recordKey) return;

    const transcript =
      Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join('') + ' ';

    this.print(recordKey, transcript);
  };
}
