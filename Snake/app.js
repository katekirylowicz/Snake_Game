//snake move
const ENTER = 13;
const ESC = 27;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

let directions = [1, 0];
let gameSpeed = 200;
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
    [47, 30],
    [46, 30],
    [45, 30],
    [43, 30],
    [42, 30]
];

let snake = [...INITIAL_SNAKE];


let newPlant = [];

const renderPlants = () => {
    let plantsCords = [];

    for (let i = 0; i < 5; i++) {
        xplant = Math.floor(Math.random() * w);
        yplant = Math.floor(Math.random() * h);
        newPlant.push(`<div class="plants" style="top: ${yplant * 10}px; left: ${xplant * 10}px;"></div>`);
        plantsCords.push([xplant, yplant]);
    }


    console.log(`Plants CordS: ${plantsCords}`);
    console.log(newPlant);
}

const render = () => {

    const plant = `<div class="plants" style="top: ${yplant * 10}px; left: ${xplant * 10}px;"></div>`;



    main.innerHTML = snake.map((coords) => {
        const [x, y] = coords;
        return `<div class="snake" style="top: ${y * 10}px; left: ${x * 10}px;"></div>`;
    }).join('');

    for (let i = 0; i < 4; i++) {
        main.innerHTML += newPlant[i];
    }

};

const endGame = () => {
    render();
    clearInterval(gameInterval);
    gameInterval = 0;
    gameSpeed = 200;
};

const renderLives = () => {
    const liveDisplay = document.querySelector(".livePoints");
    liveDisplay.innerHTML = Array(live).fill(`<div>&hearts;</div>`).join('');
};

const hasCrashedWithBoard = (newCoords) => {
    return newCoords[0] === Math.floor(w) ||
        newCoords[0] === -1 ||
        newCoords[1] === -1 ||
        newCoords[1] === Math.floor(h)
};

const hasCrashedWithHimself = (coords, snake) => {
    for (let i = snake.length - 1; i > -1; i--) {
        if (snake[i][0] === coords[0] && snake[i][1] === coords[1]) {
            return true;
        }
    }
    return false
};

const processGameFrame = () => {
    render();

    const [x, y] = snake[0];
    const [deltaX, deltaY] = directions;

    const newCoords = [x + deltaX, y + deltaY];
    console.log(`snake[0]: ${snake[0]},  newCoords:${newCoords}`);

    // snake crashes
    if (
        //crashes with board
        hasCrashedWithBoard(newCoords) ||

        //crash with himself Check is it works??
        hasCrashedWithHimself(newCoords, snake)
    ) {
        live--;

        // restart
        if (live === 0) {
            renderLives();
            endGame();
            setTimeout(() => alert('Game Over!'));

            live = 3;
            points = 0;
            gameSpeed = gameSpeed + 5;
            snake = [...INITIAL_SNAKE];
            console.log(`The speed of the snake drops. Now is:${gameSpeed}`);
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
        gameSpeed = gameSpeed - 10;
        console.log(`Speed of the snake increasses. Now is: ${gameSpeed}`);
        console.log(`Snake cords are: ${snake}`);
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
    renderPlants();
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