import snake from './snake.js';
import plants from './plants.js';

const ENTER = 13;
const ESC = 27;

let gameSpeed = 150;
let gameInterval = 0;
let score = 0;
let live = 3;

const main = document.querySelector('main');
const w = main.offsetWidth / 10;
const h = main.offsetHeight / 10;

snake.setGrid(w, h);
plants.setGrid(w, h);

const render = () => {
    main.innerHTML = snake.toHtml() + plants.toHtml();
};

const endGame = () => {
    render();
    clearInterval(gameInterval);
    gameInterval = 0;
    gameSpeed = 150;
};

const renderLives = () => {
    const liveDisplay = document.querySelector(".livePoints");
    liveDisplay.innerHTML = Array(live).fill(`<div>&hearts;</div> `).join('');
};

const renderScore = () => {
    const points = document.querySelector("span");
    points.innerHTML = `<span>${score}</span>`;
};

const processGameFrame = () => {
    render();
    snake.makeStep();

    if (
        //crashes with board
        snake.hasCrashedWithBoard() ||
        //crash with himself 
        snake.hasCrashedWithHimself()
    ) {
        live--;

        // restart
        if (live === 0) {
            renderLives();
            endGame();
            setTimeout(() => alert('Game Over!'));

            live = 3;
            score = 0;
            gameSpeed = gameSpeed + 20;
            snake.reset();
            console.log(`The speed of the snake drops. Now it's: ${gameSpeed} `);
            return;
        }

        snake.reset();
        renderLives();
        return;
    }

    // snake eats plant
    if (plants.some(snake.canEat)) {
        snake.eat();
        plants.remove(snake.getHeadCoords());
        score++;
        renderScore();
        gameSpeed = gameSpeed - 20;
        console.log(`Speed of the snake increasses. Now it's: ${gameSpeed} `);
        return;
    }

    // snake moves
    snake.move();
};

const startGame = () => {
    if (gameInterval) {
        return;
    }
    renderLives();
    plants.reset();
    gameInterval = setInterval(processGameFrame, gameSpeed);
};

const handleKeyUp = (e) => {
    console.log(e);
    switch (e.keyCode) {
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
    restartPoints.innerHTML = `< span > ${score}</span > `;
    snake.reset();
    plants.reset();
    render();
};

const pauzeGame = document.querySelector('.pauza');
pauzeGame.addEventListener('click', endGame);

const playGame = document.querySelector('.start');
playGame.addEventListener('click', startGame);

const restartGame = document.querySelector('.restart');
restartGame.addEventListener('click', restartFunction);
