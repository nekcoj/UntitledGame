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

const characterState = reactive({
  maxHealth: 100,
  power: 10,
  currentHealth: 85,
  setHealth: (crementValue) => {
    characterState.currentHealth = characterState.currentHealth + crementValue > characterState.maxHealth ?
      characterState.maxHealth : characterState.currentHealth + crementValue <= 0 ? 0 : characterState.currentHealth += crementValue;
  },
  activeSkills: [
    {
      name: 'Fireball',
      baseDamage: 10,
      iconPosition: {
        x: 1,
        y: 0,
      },
      cooldown: 2,
      effect: () => {
        console.log('FIREBALL!');
      }
    },
    {
      name: 'Nånting',
      baseDamage: 10,
      iconPosition: {
        x: 4,
        y: 2,
      },
      cooldown: 10,
      effect: () => {
        console.log('NÅNTING!');
      }
    },
    {
      name: 'Heal',
      baseDamage: 20,
      iconPosition: {
        x: 5,
        y: 3,
      },
      cooldown: 5,
      effect: (spellNumber) => {
        characterState.setHealth(characterState.activeSkills[spellNumber].baseDamage);
      },
    },
  ]
  
})

const directions = {
  right: 'right',
  left: 'left',
  up: 'up',
  down: 'down'
}

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

const map = ref(null);
const character = ref(null);
const gameWindow = ref(null);

export default function Store() {
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
  return {
    map,
    keys,
    movement,
    gameState,
    pixelSize,
    character,
    directions,
    gameWindow,
    characterState,
  }
}