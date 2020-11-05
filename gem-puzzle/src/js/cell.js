export default class Cell {
  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;
    this.isEmpty = false;
    this.elem = this.createElem();
    this.cellWidth = 100;
    this.cellHeight = 100;

    if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
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
        (x === emptyX || y === emptyY) &&
        (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)
      ) {
        this.playSound();
        this.puzzle.numberOfMoves += 1;
        this.puzzle.displayMoves.innerText = `Moves: ${this.puzzle.numberOfMoves}`;
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
      }
    });

    return cellElem;
  }

  setBg() {
    this.elem.classList.add('cell');
    // const { left, top } = this.getPositionFromIndex(this.index);

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
    const step =
      (frameRate * Math.abs(destination - currentPosition)) / animationDuration;

    const id = setInterval(() => {
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

      this.elem.style[position] = `${currentPosition}px`;
    }, frameRate);
  }

  playSound() {
    const audioElement = new Audio('slide.mp3');
    audioElement.play();
  }
}
