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
  npcs: null,
})

const characterState = reactive({
  maxHealth: 100,
  power: 10,
  currentHealth: 85,
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
      type: 'support',
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
        character.value.setHealth(characterState.activeSkills[spellNumber].baseDamage);
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
const enemyRefs = ref([]);
const npcRefs = ref([]);

const toggle = reactive({
  spellbook: false,
  playMusic: true,
  showDialogue: false,
});

export default function Store() {
  const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
  return {
    map,
    keys,
    toggle,
    npcRefs,
    movement,
    gameState,
    pixelSize,
    character,
    enemyRefs,
    directions,
    gameWindow,
    characterState,
  }
}