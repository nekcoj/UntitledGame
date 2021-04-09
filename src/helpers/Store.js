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
  enemies: null,
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
      type: 'attack',
      cooldown: 1,
      distance: 200,
      effect: () => {
        console.log('FIREBALL!');
        let root = document.documentElement;
        root.style.setProperty('--spell-end-x', movement.mousePosition.x + 'px');
        root.style.setProperty('--spell-end-y', movement.mousePosition.y + 'px');
        let spell = document.createElement('div');
        let posX = character.value.getAttribute('posx');
        let posY = character.value.getAttribute('posy');
        let size = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size')) * 16) / 2;
        spell.style.left = parseInt(posX) + (size / 2) + 'px';
        spell.style.top = parseInt(posY) + (size / 2) + 'px';
        root.style.setProperty('--spell-start-x', parseInt(posX) + (size / 2) + 'px');
        root.style.setProperty('--spell-start-y', parseInt(posY) + (size / 2) + 'px');
        let duration = 0.7;
        spell.style.animationDuration = duration + 's';
        let dy = movement.mousePosition.y - (parseInt(posY) + (size / 2));
        let dx = movement.mousePosition.x - (parseInt(posX) + (size / 2));
        let theta = Math.atan2(dy, dx);
        theta *= 180 / Math.PI;
        spell.style.transform = `rotate(${theta}deg)`;
        spell.classList.add('attackSpell');
        map.value.appendChild(spell);
        
        setTimeout(() => {
          spell.remove();
        }, duration * 1000);

      },
      description: "It's a Fireball!",
    },
    {
      name: 'Nånting',
      baseDamage: 10,
      iconPosition: {
        x: 4,
        y: 2,
      },
      type: 'attack',
      cooldown: 10,
      effect: () => {
        console.log('NÅNTING!');
      },
      description: "Does something? or nothing?",
    },
    {
      name: 'Heal',
      baseDamage: 20,
      iconPosition: {
        x: 5,
        y: 3,
      },
      type: 'support',
      cooldown: 5,
      effect: (spellNumber) => {
        let char = document.getElementById('character_shadow');
        char.classList.add('heal');
        setTimeout(() => {
          char.classList.remove('heal');
        }, 600);

        characterState.setHealth(characterState.activeSkills[spellNumber].baseDamage);
      },
      description: "Heal yourself!",
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