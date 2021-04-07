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
  },
  mousePosition: {
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
        let root = document.documentElement;
        root.style.setProperty('--mouse-x', movement.mousePosition.x + 'px');
        root.style.setProperty('--mouse-y', movement.mousePosition.y + 'px');
        let fireball = document.createElement('div');
        let posX = character.value.getAttribute('posx');
        let posY = character.value.getAttribute('posy');
        let size = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) * 16) / 2;
        fireball.style.left = parseInt(posX) + (size / 2) + 'px';
        fireball.style.top = parseInt(posY) + (size / 2) + 'px';
        root.style.setProperty('--spell-start-x', parseInt(posX) + (size / 2) + 'px');
        root.style.setProperty('--spell-start-y', parseInt(posY) + (size / 2) + 'px');
        fireball.classList.add('attackSpell');
        fireball.style.animationDuration = '0.7s';
        map.value.appendChild(fireball);
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