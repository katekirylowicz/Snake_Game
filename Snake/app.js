//snake move
const ENTER = 13;
const ESC = 27;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

let directions = [1, 0];
let gameSpeed = 500;
let gameInterval = 0;
let score = 0;
let live = 3;

const main = document.querySelector('main');
const w = main.offsetWidth / 10;
const h = main.offsetHeight / 10;

let xplant = Math.floor(Math.random() * w);
let yplant = Math.floor(Math.random() * h);

const INITIAL_SNAKE = [
    [52, 30],
    [51, 30],
    [50, 30],
    [49, 30],
    [48, 30],
];

let snake = [...INITIAL_SNAKE];

const render = () => {
    const plant = `<div class="plants" style="top: ${yplant * 10}px; left: ${xplant * 10}px;"></div>`;

    main.innerHTML = snake.map((coords) => {
        const [x, y] = coords;
        return `<div class="snake" style="top: ${y * 10}px; left: ${x * 10}px;"></div>`;
    }).join('') + plant;
};

const endGame = () => {
    clearInterval(gameInterval);
    gameInterval = 0;
};

const renderLives = () => {
    const liveDisplay = document.querySelector(".livePoints");
    liveDisplay.innerHTML = Array(live).fill(`<div>&hearts;</div>`).join('');
};

const processGameFrame = () => {
    render();

    const [x, y] = snake[0];
    const [deltaX, deltaY] = directions;

    const newCoords = [x + deltaX, y + deltaY];

    // snake crashes
    if (
        newCoords[0] === Math.floor(w) ||
        newCoords[0] === -1 ||
        newCoords[1] === -1 ||
        newCoords[1] === Math.floor(h)

    ) {
        live--;

        // restart
        if (live === 0) {
            renderLives();
            alert('Game Over!')
            endGame();

            live = 3;
            points = 0;
            snake = [...INITIAL_SNAKE];
            return;
        }

        snake = [...INITIAL_SNAKE];
        directions = [1, 0];
        renderLives();
        return;
    }

    console.log(newCoords, xplant, yplant);

    // snake eats plant
    if (
        newCoords[0] === xplant &&
        newCoords[1] === yplant
    ) {
        xplant = Math.floor(Math.random() * w);
        yplant = Math.floor(Math.random() * h);
        snake.unshift(newCoords);
        score++;
        const points = document.querySelector("span");
        points.innerHTML = `<span>${score}</span>`;

        return;
    }

    // snake moves
    snake.pop();
    snake.unshift(newCoords);
};

const startGame = () => {
    if (gameInterval) {
        return;
    }
    renderLives();
    gameInterval = setInterval(processGameFrame, gameSpeed);
};

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
            // enter - start
        case ENTER:
            startGame();
            break;
            // esc - koniec gry
        case ESC:
            endGame();
            break;
        default:
            // void
    }
};

window.addEventListener('keyup', handleKeyUp);

//button events
const restartFunction = () => {

    alert('Game Over!');
    endGame();
    startGame();
    live = 3;
    renderLives();
    score = 0;
    const restartPoints = document.querySelector("span");
    restartPoints.innerHTML = `<span>${score}</span>`;
    snake = [...INITIAL_SNAKE];
    render();
};

const pauzeGame = document.querySelector('.pauza');
pauzeGame.addEventListener('click', endGame);

const playGame = document.querySelector('.start');
playGame.addEventListener('click', startGame);

const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', restartFunction);