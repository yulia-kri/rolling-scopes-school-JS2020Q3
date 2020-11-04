class Cell {
  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;
    this.isEmpty = false;
    this.elem = this.createElem();
    this.cellWidth = 100;
    this.cellHeight = 100;

    if (this.index == this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.isEmpty = true;
      this.elem.classList.add('empty');
    } else {
      this.setBg();
    }

    puzzle.playingBoard.append(this.elem);
  }

  createElem() {
    const cellElem = document.createElement('div');

    cellElem.addEventListener('click', () => {
      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();

      const { x, y } = this.getCoordinates(currentCellIndex);
      const { x: emptyX, y: emptyY } = this.getCoordinates(emptyCellIndex);

      if (
        (x == emptyX || y == emptyY) &&
        (Math.abs(x - emptyX) == 1 || Math.abs(y - emptyY) == 1) &&
        gameStart
      ) {
        this.puzzle.numberOfMoves++;
        this.puzzle.displayMoves.innerText = `Moves: ${this.puzzle.numberOfMoves}`;
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
      }
    });

    return cellElem;
  }

  setBg() {
    this.elem.classList.add('cell');
    const { left, top } = this.getPositionFromIndex(this.index);

    this.elem.style.width = `${this.cellWidth}px`;
    this.elem.style.height = `${this.cellHeight}px`;

    this.elem.innerText = this.index + 1;
  }

  setPosition(destinationIndex, animate, currentIndex) {
    const { left, top } = this.getPositionFromIndex(destinationIndex);
    const { left: currentLeft, top: currentTop } = this.getPositionFromIndex(
      currentIndex
    );

    if (animate) {
      if (left !== currentLeft) {
        this.animate('left', currentLeft, left);
      } else if (top !== currentTop) {
        this.animate('top', currentTop, top);
      }
    } else {
      this.elem.style.left = `${left}px`;
      this.elem.style.top = `${top}px`;
    }
  }

  getPositionFromIndex(index) {
    const { x, y } = this.getCoordinates(index);
    return {
      left: this.cellWidth * x,
      top: this.cellHeight * y,
    };
  }

  getCoordinates(index) {
    return {
      x: index % this.puzzle.dimension,
      y: Math.floor(index / this.puzzle.dimension),
    };
  }

  animate(position, currentPosition, destination) {
    const animationDuration = 500;
    const frameRate = 10;
    let step =
      (frameRate * Math.abs(destination - currentPosition)) / animationDuration;

    let id = setInterval(() => {
      if (currentPosition < destination) {
        currentPosition = Math.min(destination, currentPosition + step);
        if (currentPosition >= destination) {
          clearInterval(id);
        }
      } else {
        currentPosition = Math.max(destination, currentPosition - step);
        if (currentPosition <= destination) {
          clearInterval(id);
        }
      }

      this.elem.style[position] = currentPosition + 'px';
    }, frameRate);
  }
}

let gameStart = false;

class Puzzle {
  constructor(dimension = 4) {
    this.playingBoard = null;
    this.displayMoves = null;
    this.playButton = document.createElement('button');
    this.dimension = dimension;
    this.cells = [];
    this.numberOfMoves = 0;
  }

  init() {
    const container = document.createElement('div');
    container.classList.add('container');

    this.playingBoard = document.createElement('div');
    this.playingBoard.classList.add('game-board');

    const stateField = document.createElement('div');
    stateField.classList.add('state');

    this.playButton.classList.add('play-button');
    this.playButton.innerText = 'Start';
    stateField.append(this.playButton);
    this.playButton.addEventListener('click', this.toogleGameStatus);

    this.displayMoves = document.createElement('div');
    this.displayMoves.innerText = 'Moves: 0';
    stateField.append(this.displayMoves);

    const displayTime = document.createElement('div');
    displayTime.dataset.id = 'time';
    displayTime.innerText = 'Time: 00:00';
    stateField.append(displayTime);

    document.body.append(stateField);
    document.body.append(container);
    container.append(this.playingBoard);
    this.createCells();
  }

  toogleGameStatus() {
    gameStart = !gameStart;
    if (gameStart == true) {
      document.querySelector('.play-button').innerText = 'Pause';
    } else {
      document.querySelector('.play-button').innerText = 'Start';
    }
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
      console.log('you win!');
    }
  }

  checkBoard() {
    for (let i = 0; i < this.cells.length; i++) {
      if (i != this.cells[i].index) {
        return false;
      }
    }
    return true;
  }

  findPosition(currentIndex) {
    return this.cells.findIndex((cell) => cell.index == currentIndex);
  }

  findEmpty() {
    return this.cells.findIndex((cell) => cell.isEmpty);
  }
}

let min = 0;
let sec = 0;

function displayTime() {
  let timer = document.querySelector('[data-id="time"]');
  if (gameStart) {
    if (min == 59 && sec == 59) {
      min = 0;
      sec = 0;
    }
    if (sec == 59) {
      min++;
      sec = 0;
    } else {
      sec++;
    }
    timer.innerText = `Time: ${addZero(min)}:${addZero(sec)}`;
  } else {
    let currentTime = timer.innerText;
    let arr = currentTime.split(':');
    min = parseInt(arr[1]);
    sec = parseInt(arr[2]);
    timer.innerText = `Time: ${addZero(min)}:${addZero(sec)}`;
  }
  setTimeout(displayTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function createOverlay() {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'active');
  overlay.innerText = 'Play';
  document.querySelector('.container').prepend(overlay);
  overlay.addEventListener('click', startGame);
}

function startGame() {
  console.log('start!');
}

const puzzle = new Puzzle(4);
puzzle.init();
displayTime();
createOverlay();
