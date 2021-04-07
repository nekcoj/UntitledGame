<template>
    <div id="gameWindow" ref="gameWindow">
      <Health :max="characterState.maxHealth" :current="characterState.currentHealth"/>
      <div class="actionbar-container">
        <Actionbar class="actionbar"/>
      </div>
      <div class="map pixelart" ref="map">
        <Character
          :facing="movement.facing"
          :walking="movement.isWalking"
          :posx="movement.placeCharacter.x"
          :posy="movement.placeCharacter.y"
        />
      </div>


      <!-- For testing purposes START -->
      <teleport to="body">
        <div v-if="character" :style="{position: 'absolute', top: '25px', left: '25px', width: '150px', height: '300px' }">
          <p>{{getCoordinates()}}</p>
          <p>[{{character.getAttribute('posx')}}, {{character.getAttribute('posy')}}]</p>
          <div>{{characterState.currentHealth}}/{{characterState.maxHealth}}</div>
          <p>
            <button @click="characterState.setHealth(5)">+5</button>
            hp
            <button @click="characterState.setHealth(-5)">-5</button>
          </p>
        </div>
      </teleport>
      <!-- For testing purposes END -->
    </div>
</template>

<script>
import { onMounted, watchEffect } from 'vue';
import Character from './components/Character'
import Movement from './helpers/Movement';
import Store from './helpers/Store';
import GameSetup from './helpers/GameSetup';
import Health from './components/Health';
import Actionbar from './components/Actionbar';

export default {
  name: 'App',
  component: { Character, Health, Actionbar },
  setup() {
    const { loadLevel, loadObstacles } = GameSetup();
    const { placeCharacter, getCoordinates, loadCharacterOnMap, collision } = Movement();
    const { movement, map, character, gameWindow, pixelSize, gameState, characterState } = Store();
    
    const step = () => {
      placeCharacter();
      window.requestAnimationFrame(() => {
        step();
      })
    }

    watchEffect(() => {
      if (movement.x || movement.y) {
        let camera_left = pixelSize * 132;
        let camera_top = pixelSize * 84;
        map.value.style.transform = `translate3d( ${-movement.x*pixelSize+camera_left}px, ${-movement.y*pixelSize+camera_top}px, 0 )`;
      }
      if(gameState.currentLevel) {
        loadLevel();
      }
    })
    watchEffect(() => {
      if(gameState.level) {
        loadObstacles();
      }
    })
    
    onMounted(async () => {
      await loadLevel();
      loadCharacterOnMap();

      step();
      gameWindow.value.addEventListener('mousedown', (event) => {
        const { x, y } = event.target.getBoundingClientRect();
        const mouseX = event.clientX - x;
        const mouseY = event.clientY - y;
        console.log(mouseX, mouseY);
      })

      document.addEventListener('keydown', e => {
        if(e.code === 'KeyZ') {
          let coords = getCoordinates();
          console.log(coords);
        }
      })
      document.addEventListener('keydown', e => {
        if(e.code === 'KeyX') {
          collision();
        }
      })
    })

    return {
      movement,
      map,
      gameWindow,
      character,
      getCoordinates,
      collision,
      characterState,
    }
  }
}
</script>

<style lang="scss">
:root{
  --pixel-size: 2px;
  --grid-cell: calc(var(--pixel-size) * 16);
}

@media( min-width: 700px) {
  :root{
    --pixel-size: 2px;
  }
}
@media( min-width: 900px){
  :root{
    --pixel-size: 3px;
  }
}

body{ 
  background: wheat;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.pixelart {
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;
}

#gameWindow{
  background: #0F000F;
  width: calc(var(--pixel-size) * 267);
  height: calc(var(--pixel-size) * 213);
  border: 1px solid black;
  overflow: hidden;
  position: relative;
}

.map {
  -ms-interpolation-mode: nearest-neighbor;
  image-rendering: pixelated;
  background-image: url('./assets/untitledgame_map.png');
  background-size: 100%;
  width: calc(25 * var(--grid-cell));
  height: calc(20 * var(--grid-cell));
  position: relative;
}

.actionbar-container {
  display: flex;
  position: absolute;
  bottom: 5px;
  left: calc((var(--pixel-size) * 267) / 2 - (var(--grid-cell) * 3 / 2));
  z-index: 2;
}

.obstacle {
  width: var(--grid-cell);
  height: var(--grid-cell);
  position: absolute;
  /* background: red; 
  border: 1px solid black; */
}

</style>
