import en from '../data/en.js';
import ru from '../data/ru.js';
import create from '../utils/create.js';
import Key from './key.js';

const languages = {};
languages.en = en;
languages.ru = ru;

const main = create('div', 'main-container');

export default class Keyboard {
    constructor(keysOrder) {
      this.keysOrder = keysOrder;
      this.keysPressed = {};
      this.isCaps = false;
    }

    init() {
        this.keyboardLayout = languages.en;
        this.textarea = create('textarea', 'use-keyboard-input', null,
          ['placeholder', 'Start type something...'],
          ['rows', 5],
          ['cols', 50],
          ['spellcheck', false],
          ['autocorrect', 'off']);
        this.keysContainer = create('div', 'keyboard', null, ['language', 'en']);
    
        main.append(this.textarea);
        main.append(this.keysContainer);
    
        document.body.prepend(main);
        return this;
      }

      createKeys() {
        this.keyButtons = [];
        this.keysOrder.forEach((row) => {
          const rowElement = create('div', 'keyboard__row', null);
          rowElement.style.gridTemplateColumns = `repeat(${row.length}, 1fr)`;
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
      }
}
