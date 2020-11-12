export default class Cell {
  constructor(puzzle, index) {
    this.puzzle = puzzle;
    this.index = index;
    this.isEmpty = false;
    this.draggingCell = false;
    this.cellWidth = this.puzzle.width / this.puzzle.dimension;
    this.cellHeight = this.cellWidth;
    this.elem = this.createElem();

    if (this.index === this.puzzle.dimension * this.puzzle.dimension - 1) {
      this.isEmpty = true;
      this.elem.classList.add('empty');
      this.elem.addEventListener('dragover', this.dragOver);
      this.elem.addEventListener('dragenter', this.dragEnter);
      this.elem.addEventListener('dragleave', this.dragLeave);
      this.elem.addEventListener('drop', (e) => {
        if (this.elem.classList.contains('hovered')) {
          this.elem.classList.remove('hovered');
        }
        const emptyCellIndex = this.puzzle.findEmpty();
        const currentCellIndex = this.puzzle.findDraggingCell();
        this.preSwapCells(currentCellIndex, emptyCellIndex, e);
      });
    } else {
      this.setBg();
    }

    this.puzzle.playingBoard.append(this.elem);
  }

  createElem() {
    const cellElem = document.createElement('div');

    cellElem.style.width = `${this.cellWidth}px`;
    cellElem.style.height = `${this.cellHeight}px`;

    cellElem.addEventListener('click', (e) => {
      const currentCellIndex = this.puzzle.findPosition(this.index);
      const emptyCellIndex = this.puzzle.findEmpty();
      this.preSwapCells(currentCellIndex, emptyCellIndex, e);
    });

    cellElem.addEventListener('dragstart', () => {
      this.draggingCell = true;
      this.dragStart();
    });
    cellElem.addEventListener('dragend', () => {
      this.dragEnd();
    });

    return cellElem;
  }

  dragStart() {
    this.elem.className += ' hold';
    setTimeout(() => (this.elem.className = 'invisible'), 0);
  }

  dragEnd() {
    this.elem.className = 'fill';
    const draggedElem = this.puzzle.cells.find((cell) => cell.draggingCell);
    draggedElem.draggingCell = false;
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragEnter(e) {
    e.preventDefault();
    this.classList.add('hovered');
  }

  dragLeave() {
    this.classList.remove('hovered');
  }

  preSwapCells(currentCellIndex, emptyCellIndex, event) {
    const { x, y } = this.getCoordinates(currentCellIndex);
    const { x: emptyX, y: emptyY } = this.getCoordinates(emptyCellIndex);

    if (
      (x === emptyX || y === emptyY) &&
      (Math.abs(x - emptyX) === 1 || Math.abs(y - emptyY) === 1)
    ) {
      this.playSound();
      this.puzzle.numberOfMoves += 1;
      this.puzzle.displayMoves.innerText = `Moves: ${this.puzzle.numberOfMoves}`;
      if (event.type === 'click') {
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, true);
      } else {
        this.puzzle.swapCells(currentCellIndex, emptyCellIndex, false);
      }
    }
  }

  setBg() {
    this.elem.classList.add('fill');
    this.elem.setAttribute('draggable', true);

    if (typeof this.puzzle.imageSrc === 'undefined') {
      this.elem.innerText = this.index + 1;
    } else {
      const { left, top } = this.getPositionFromIndex(this.index);

      const img = document.createElement('img');
      img.src = this.puzzle.imageSrc;
      img.onload = () => {
        this.elem.style.background = `url(${this.puzzle.imageSrc})`;
        this.elem.style.backgroundSize = `${this.puzzle.width}px ${this.puzzle.width}px`;
        this.elem.style.backgroundPosition = `-${left}px -${top}px`;
      };
    }
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
    const animationDuration = 300;
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
    const audioElement = new Audio('Woosh 03.wav');
    audioElement.currentTime = 0;
    audioElement.volume = 0.3;
    audioElement.play();
  }
}
