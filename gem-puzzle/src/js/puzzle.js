import Cell from './cell';
import { updateGame, startGame } from './index';

export default class Puzzle {
  constructor(config) {
    this.container = null;
    this.playingBoard = null;
    this.displayMoves = null;
    this.displayMoves = null;
    this.dimension = config.dimension || 4;
    this.imageSrc = config.image;
    this.isSoundOn = true;
    this.width = 400;
    this.cells = [];
    this.numberOfMoves = 0;
  }

  init() {
    this.container = document.createElement('div');
    this.container.classList.add('container');

    this.playingBoard = document.createElement('div');
    this.playingBoard.classList.add('game-board');

    const overlay = document.createElement('div');
    overlay.classList.add('playing-board__overlay', 'visible');
    overlay.innerText = 'Play';
    overlay.addEventListener('click', updateGame);

    this.state = document.createElement('div');
    this.state.classList.add('state');

    const button = document.createElement('button');
    button.classList.add('play-button');
    button.innerText = 'Start';
    this.state.append(button);
    button.addEventListener('click', updateGame);

    this.displayMoves = document.createElement('div');
    this.displayMoves.innerText = 'Moves: 0';
    this.state.append(this.displayMoves);

    this.displayTime = document.createElement('div');
    this.displayTime.dataset.id = 'time';
    this.displayTime.innerText = 'Time: 00:00';
    this.state.append(this.displayTime);

    document.body.append(this.state);
    document.body.append(this.container);
    this.container.prepend(overlay);
    this.container.append(this.playingBoard);
    this.createCells();
  }

  createCells() {
    for (let i = 0; i < this.dimension * this.dimension; i++) {
      this.cells.push(new Cell(this, i));
    }
    this.shuffleCells();
  }

  shuffleCells() {
    for (let i = this.cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      this.swapCells(i, j);
    }
  }

  swapCells(i, j, animate) {
    this.cells[i].setPosition(j, animate, i);
    this.cells[j].setPosition(i);

    [this.cells[i], this.cells[j]] = [this.cells[j], this.cells[i]];

    if (this.checkBoard()) {
      setTimeout(() => {
        alert(
          `Ура! Вы решили головоломку за ${
            this.displayTime.innerText.split(' ')[1]
          } и ${this.numberOfMoves} ходов`
        );
        startGame();
      }, 500);
    }
  }

  checkBoard() {
    for (let i = 0; i < this.cells.length; i++) {
      console.log(this.dimension, i, this.cells[i].index);
      if (i != this.cells[i].index) {
        if (
          this.dimension === 3 &&
          i === 6 &&
          this.cells[i].index === 8 &&
          this.cells[i + 1].index === i + 1
        ) {
          return true;
        }
        return false;
      }
    }
    return true;
  }

  findPosition(currentIndex) {
    return this.cells.findIndex((cell) => cell.index === currentIndex);
  }

  findEmpty() {
    return this.cells.findIndex((cell) => cell.isEmpty);
  }

  findDraggingCell() {
    return this.cells.findIndex((cell) => cell.draggingCell);
  }

  destroy() {
    this.container.parentNode.removeChild(this.container);
    this.state.parentNode.removeChild(this.state);
  }
}
