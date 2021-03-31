import { reactive, ref } from 'vue';

const movement = reactive({
  speed: 1,
  facing: 'down',
  isWalking: 'false',
  x: 0,
  y: 0,
  held_directions: [],
  placeCharacter: {
    x: 0,
    y: 0,
  }
});
const gameState = reactive({
  currentLevel: 0,
  tiles: {
    width: 25,
    height: 20,
  },
  level: null,
})

const directions = {
  right: 'right',
  left: 'left',
  up: 'up',
  down: 'down'
}

const map = ref(null);
const character = ref(null);
const gameWindow = ref(null);

const keys = {
  'ArrowUp': directions.up,
  'ArrowLeft': directions.left,
  'ArrowRight': directions.right,
  'ArrowDown': directions.down,
  'KeyW': directions.up,
  'KeyA': directions.left,
  'KeyD': directions.right,
  'KeyS': directions.down,
}

export default function Store() {
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
 /*  gameState.width = pixelSize * 267;
  gameState.height = pixelSize * 213; */
  
  return {
    map,
    keys,
    movement,
    gameState,
    pixelSize,
    character,
    directions,
    gameWindow,
  }
}