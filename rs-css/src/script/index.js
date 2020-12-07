/* eslint-disable comma-dangle */
import '../styles/style.css';
import CodeMirror from '../codemirror/lib/codemirror';
import '../codemirror/lib/codemirror.css';
import '../codemirror/mode/css/css';
import '../codemirror/addon/display/placeholder';
import './animation';
import createLevelsList from './levels';
import displayLevel from './level';
import getHint from './hint';
import { submit } from './checkAnswer';
import { setCurrentLevel } from './localStorage';

const levelsList = document.querySelector('.level-list');
const submitBtn = document.querySelector('.css-form__submit');
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.right-col');
const hint = document.querySelector('.hint');

window.addEventListener('DOMContentLoaded', () => {
  createLevelsList();
  displayLevel();

  const editor = CodeMirror.fromTextArea(
    document.querySelector('.css-form__input'),
    {
      mode: 'css',
      extraKeys: {
        Enter: function preSubmit() {
          const answer = editor.getValue();
          submit(answer);
          editor.setValue('');
        },
      },
    }
  );

  submitBtn.addEventListener('click', () => {
    const answer = editor.getValue();
    submit(answer);
    editor.setValue('');
  });

  hint.addEventListener('click', () => {
    getHint(editor);
  });

  levelsList.addEventListener('click', (e) => {
    const levelElem = e.target.closest('.level-list__level');
    if (!levelElem) return;
    const { level } = levelElem.dataset;
    setCurrentLevel(level);
    displayLevel();
    menuBtn.classList.toggle('open');
    menu.classList.toggle('open');
  });

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    menu.classList.toggle('open');
  });
});
