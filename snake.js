const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

const INITIAL_SNAKE = [
  [52, 30],
  [51, 30],
  [50, 30],
  [49, 30],
  [48, 30],

];

let snake = [...INITIAL_SNAKE];
let newCoords = [];
let directions = [1, 0];
let boardWidth = 0;
let boardHeight = 0;

const setGrid = (w, h) => {
  boardWidth = w;
  boardHeight = h;
}


const hasCrashedWithBoard = () => {
  return newCoords[0] === Math.floor(boardWidth) ||
    newCoords[0] === -1 ||
    newCoords[1] === -1 ||
    newCoords[1] === Math.floor(boardHeight)
};

const hasCrashedWithHimself = () => {
  for (let i = snake.length - 1; i > -1; i--) {
    if (snake[i][0] === newCoords[0] && snake[i][1] === newCoords[1]) {
      return true;
    }
  }
  return false
};

const reset = () => {
  snake = [...INITIAL_SNAKE];
  directions = [1, 0];
};

const eat = () => {
  snake.unshift(newCoords);
};

const move = () => {
  snake.pop();
  snake.unshift(newCoords);
};

const makeStep = () => {
  const [x, y] = snake[0];
  const [deltaX, deltaY] = directions;

  newCoords = [x + deltaX, y + deltaY];
}

const toHtml = () => {
  return snake.map((coords) => {
    const [x, y] = coords;
    return `<div class="snake" style="top: ${y * 10}px; left: ${x * 10}px;"></div>`;
  }).join('');
}

const canEat = (plant) => newCoords[0] === plant[0] && newCoords[1] === plant[1];

const getHeadCoords = () => newCoords;

const handleKeyUp = (e) => {
  console.log(e);
  switch (e.keyCode) {
    //strzałka w górę - idzie w gore
    case ARROW_UP:
      directions = [0, -1];
      break;
    //strzałka w dół - idzie w dol
    case ARROW_DOWN:
      directions = [0, 1];
      break;
    case ARROW_LEFT:
      // idzie w lewo
      directions = [-1, 0];
      break;
    //strzałka w prawo - idzie w prawo
    case ARROW_RIGHT:
      directions = [1, 0];
      break;
    default:
    // void
  }
};

window.addEventListener('keyup', handleKeyUp);

export default {
  canEat,
  eat,
  hasCrashedWithBoard,
  hasCrashedWithHimself,
  makeStep,
  move,
  getHeadCoords,
  reset,
  setGrid,
  toHtml,
};