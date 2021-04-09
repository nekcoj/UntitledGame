import JsonHelper from './JsonHelper'
import Store from './Store';

export default function GameSetup() {
  const { readJsonFile } = JsonHelper();
  const { map, gameState } = Store();

  async function loadLevel() {
    const levels = await readJsonFile('levels')
    gameState.level = levels[gameState.currentLevel];
  }

  function loadObstacles() {
    gameState.level.blocked.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === 0) {
          let el = document.createElement('div');
          el.classList.add('obstacle')
          el.style.top = `calc(${i} * var(--grid-cell))`;
          el.style.left = `calc(${j} * var(--grid-cell))`;
          map.value.appendChild(el);
        }
      });
    }); 
  }

  function setupLevel() {
    loadLevel();
    loadEnemies();
  }

  async function loadEnemies() {
    const enemies = await readJsonFile('enemies');
    gameState.enemies = enemies;
  }
  return {
    setupLevel,
    loadEnemies,
    loadObstacles,
  }
}