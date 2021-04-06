import JsonHelper from './JsonHelper'
import Store from './Store';

export default function GameSetup() {
  const { readJsonFile } = JsonHelper();
  const { map, gameState, pixelSize } = Store();

  async function loadLevel() {
    const levels = await readJsonFile()
    gameState.level = levels[gameState.currentLevel];
  }

  function loadObstacles() {
    gameState.level.blocked.forEach((row, i) => {
      row.forEach((col, j) => {
        if (col === 0) {
          let el = document.createElement('div');
          el.classList.add('obstacle')
          el.style.top = i * (16 * pixelSize)+'px';
          el.style.left = j * (16 * pixelSize) + 'px';
          map.value.appendChild(el);
        }
      })
    })
    
  }
  return {
    loadLevel,
    loadObstacles,
  }
}