<template>
    <div id="gameWindow" ref="gameWindow">
      <div class="map pixelart" ref="map">
          <!-- 
          -->
        <Character
          :facing="state.facing"
          :walking="state.isWalking"
            :posx="state.placeCharacter.x"
            :posy="state.placeCharacter.y"
        />
        <!-- <div class="character" ref="character" facing="down" walking="true">
            <div id="character_sprite" class="character_sprite pixelart"></div>
            <div id="character_shadow" class="character_shadow pixelart"></div>
        </div> -->
      </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import Character from './components/Character'
export default {
  name: 'App',
  component: { Character },
  setup() {
    const character = ref(null);
    const map = ref(null);
    const gameWindow = ref(null);
    let pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    const width = pixelSize * 267;
    const height = pixelSize * 213;
    const state = reactive({
      width,
      height,
      speed: 1,
      x: 0,
      y: 0,
      held_directions: [],
      isWalking: false,
      facing: 'down',
      placeCharacter: {
        x: 0,
        y: 0,
      },
    })

    const directions = {
      right: 'right',
      left: 'left',
      up: 'up',
      down: 'down'
    }

    const placeCharacter = () => {
      const held_direction = state.held_directions[0];
      if (held_direction) {
        if (held_direction === directions.right) { state.x += state.speed; }
        if (held_direction === directions.left) { state.x -= state.speed; }
        if (held_direction === directions.down) { state.y += state.speed; }
        if (held_direction === directions.up) { state.y -= state.speed; }
        state.facing = held_direction;
      }
      state.isWalking = held_direction ? 'true' : 'false';

      let leftLimit = 0;
      let rightLimit = (16 * 11)+8;
      let topLimit = -8 + 32;
      let bottomLimit = (16 * 7);
      if (state.x < leftLimit) { state.x = leftLimit; }
      if (state.x > rightLimit) { state.x = rightLimit; }
      if (state.y < topLimit) { state.y = topLimit; }
      if (state.y > bottomLimit) { state.y = bottomLimit; }

      let camera_left = pixelSize * 132;
      let camera_top = pixelSize * 84;

      map.value.style.transform = `translate3d( ${-state.x*pixelSize+camera_left}px, ${-state.y*pixelSize+camera_top}px, 0 )`;
      //character.value.style.transform = `translate3d( ${state.x*pixelSize}px, ${state.y*pixelSize}px, 0 )`;
      state.placeCharacter = { x: state.x * pixelSize, y: state.y * pixelSize}
      
    }

    const step = () => {
      placeCharacter();
      window.requestAnimationFrame(() => {
        step();
      })
    }
    
    onMounted(() => {
      step();
      document.addEventListener("keydown", (e) => {
        let dir = keys[e.code];
        if (dir && state.held_directions.indexOf(dir) === -1) {
            state.held_directions.unshift(dir)
        }
      })
      document.addEventListener("keyup", (e) => {
        let dir = keys[e.code];
        let index = state.held_directions.indexOf(dir);
        if (index > -1) {
            state.held_directions.splice(index, 1)
        }
      });
      gameWindow.value.addEventListener('mousedown', (event) => {
        const { x, y } = event.target.getBoundingClientRect();
        const mouseX = event.clientX - x;
        const mouseY = event.clientY - y;
        console.log(mouseX, mouseY);
      })
    })

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

    return {
      state,
      map,
      gameWindow,
      character,
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
    --pixel-size: 3px;
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
  width: calc(var(--pixel-size) * 267);
  height: calc(var(--pixel-size) * 213);
  border: 1px solid black;
  overflow: hidden;
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

</style>
