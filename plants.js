const PLANTS_NUMBER = 10;
const EXPIRE_TIMEOUT = 5000;

let boardHeight = 0;
let boardWidth = 0;
let expireInterval = 0;
let plants = [];

const setGrid = (w, h) => {
  boardWidth = w;
  boardHeight = h;
}
//randomize new plant coords
const getNewPlant = () => [
  Math.floor(Math.random() * boardWidth),
  Math.floor(Math.random() * boardHeight),
];

const remove = function removeAndAppendPlant(plant) {
  plants = plants.filter(item => item[0] !== plant[0] && item[1] !== plant[1]);
  while (plants.length < PLANTS_NUMBER) {
    plants.push(getNewPlant());
  }
}

const expirePlant = function expireRandomPlant() {
  const randomIndex = Math.floor(Math.random() * plants.length);
  remove(plants[randomIndex]);
}

const reset = () => {
  clearInterval(expireInterval);
  plants = new Array(PLANTS_NUMBER).fill(null).map(getNewPlant);
  expireInterval = setInterval(expirePlant, EXPIRE_TIMEOUT);
};

const toHtml = () => {
  return plants
    .map(([xplant, yplant]) => `<div class="plants" style="top: ${yplant * 10}px; left: ${xplant * 10}px;"></div>`)
    .join('');
}

const some = (callback) => plants.some(callback);

export default {
  remove,
  reset,
  setGrid,
  some,
  toHtml,
}