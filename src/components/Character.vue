<template>
  <div class="character" ref="character" :facing="facing" :walking="walking">
    <div id="character_sprite" class="character_sprite pixelart"></div>
    <div id="character_shadow" class="character_shadow pixelart"></div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';

export default {
  name: 'Character',
  props: {
    facing: String,
    walking: String,
    posx: Number,
    posy: Number,
  },
  setup (props) {
    const character = ref(null);
    

    watchEffect(() => {
      if(props.posx || props.posy) {
        character.value.style.transform = `translate3d( ${props.posx}px, ${props.posy}px, 0 )`;
      }
    })
    return { character }
  }
}
</script>

<style lang="scss">
  .pixelart {
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: pixelated;
  }

  .character {
    width: calc(var(--grid-cell));
    height: calc(var(--grid-cell));
    overflow: hidden;
    position: absolute;
  }
  .character_shadow {
    width: calc( var(--grid-cell) * 3);
    height: calc( var(--grid-cell) * 3);
    position: absolute;
    left: 0;
    top: 0;
    background: url('../assets/Shadow1.png') no-repeat no-repeat;
    background-size: 100%;
  }

  .character_sprite {
    position: absolute;
    background: url('../assets/Enemy_02-1.png') no-repeat no-repeat;
    background-size: 100%;
    width: calc(var(--grid-cell) * 3);
    height: calc(var(--grid-cell) * 3);
  }

  .character[facing="left"] .character_sprite {
    background-position-y: calc( var(--pixel-size) * -16);
  }
  .character[facing="right"] .character_sprite {
    background-position-y: calc( var(--pixel-size) * -32);
  }
  .character[facing="up"] .character_sprite {
    background-position-y: calc( var(--pixel-size) * -48);
  }
  .character[walking="true"] .character_sprite {
    animation: walkAnimation 0.6s steps(3) infinite; 
  }

  @keyframes walkAnimation {
    from {
      transform: translate3d(0px, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0 ,0);
    }
  }
</style>