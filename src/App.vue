<template>
<div>
  <canvas ref="canvas" id="gameWindow" :width="state.width" :height="state.height">
  </canvas>
    <div class="Character">
        <img id="character_sprite" class="Character_sprite pixelart" src="./assets/Enemy_02-1.png" alt="">

    </div>

  <button @click="reset">Woohoo</button>
</div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
// keycodes: W: 87, A: 65, S: 83, D: 68
export default {
  name: 'App',
  setup() {
    const canvas = ref(null);
    const width = 800;
    const height = 600;
    let character_image;
    const state = reactive({
      ctx: null,
      width,
      height,
      posX: (width / 2) - 16,
      posY: (height / 2) - 16,
      startX: 0,
      startY: 0,
    })

    let isKeyDown = false;
    
    const reset = () => {
      state.posX = (width / 2) - 16;
      state.posY =  (height / 2) - 16;
      state.ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      const character_image = document.getElementById('character_sprite');
      state.ctx.drawImage(character_image, state.startX, state.startY, 32, 32, state.posX, state.posY, 32, 32);
      /* 
      state.ctx.fillStyle = '#fac';
      state.ctx.fillRect(state.posX, state.posY, 32, 32); */
    }
    onMounted(() => {
      character_image = document.getElementById('character_sprite');
      state.ctx = canvas.value.getContext('2d');
      state.ctx.drawImage(character_image, state.startX, state.startY, 32, 32, state.posX, state.posY, 32, 32);
      //canvas.value.requestPointerLock || canvas.value.mozRequestPointerLock
      window.addEventListener('keydown', checkPressedKey, true);
      canvas.value.addEventListener('mousedown', (event) => {
        const { x, y } = event.target.getBoundingClientRect();
        const mouseX = event.clientX - x;
        const mouseY = event.clientY - y;
        console.log(mouseX, mouseY);
      })
    })

    function checkPressedKey(e) {
      isKeyDown = true;
      if(isKeyDown) console.log('hooooooo');
      switch (e.keyCode) {
        case 87: // W
          state.posY -= 32;
          break;
        case 65: // A
          state.posX -= 32;
          break;
        case 83: // S
          state.posY += 32;
          break;
        case 68: // D
          state.posX += 32;
          break;
          case 38: // Arrow UP
          state.posY -= 32;
          break;
        case 37: // Arrow Left
          state.posX -= 32;
          break;
        case 40: // Arrow Down
          state.posY += 32;
          break;
        case 39: // Arrow Right
          state.posX += 32;
          break;
        default:
          break;
      }
      state.ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
      state.ctx.drawImage(character_image, state.startX, state.startY, 32, 32, state.posX, state.posY, 32, 32);
      isKeyDown = false;
    }

    return { state, canvas, reset, checkPressedKey }
  }
}
</script>

<style lang="scss">
:root{
  --pixel-size: 2;
}

body{ 
  background: wheat;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#gameWindow{
  background: white;
  width: 800px;
  height: 600px;
  border: 1px solid black;
}

.pixelart {
  image-rendering: pixelated;
}

.Character {
  width: calc(32px * var(--pixel-size));
  height: calc(32px * var(--pixel-size));
  margin: 3em auto;
  overflow: hidden;
  position: relative;
}

.Character_sprite {
  width: calc(96px * var(--pixel-size));
  /* top: calc(-32px * var(--pixel-size)); */
  position: relative;
  animation: walkDown 1s steps(3) infinite;
}

@keyframes walkDown {
  from {
    transform: translate3d(0px, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0 ,0);
  }
}
</style>
