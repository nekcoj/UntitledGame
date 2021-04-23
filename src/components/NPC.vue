<template>
  <div :id="'npc-'+index" class="npc">
    <div :id="'npc_sprite-'+index" class="npc_sprite pixelart"></div>
    <div id="npc_shadow" class="character_shadow pixelart"></div>
    <teleport to="#gameWindow">
      <Dialogue :show="toggle.showDialogue && dialogue.text != ''" :text="dialogue.text" :audio="dialogue.audio" />
    </teleport>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect, reactive } from 'vue';
import Store from '../helpers/Store';
import Dialogue from './Dialogue';

export default {
  name: 'npc',
  components: { Dialogue },
  props: {
    npc: Object,
    index: Number,
  },
  setup(props) {
    const { gameState, toggle } = Store();
    const npcTiles = [];
    const npcObj = ref(Object.assign({}, props.npc));

    const dialogue = reactive({
      text: "",
      audio: ""
    })

    const getNPCTiles = () => {
      gameState.level.blocked.forEach((row, i) => {
        row.forEach((col, j) => { 
          if (col === 3) {
            npcTiles.push([j, i]);
          }
        });
      });
    }

    const placeNPC = () => {
      const npc = document.getElementById('npc-'+props.index);
      if (npcTiles[props.index]) {
        npc.style.top = `calc(${npcTiles[props.index][1]} * var(--grid-cell))`;
        npc.style.left = `calc(${npcTiles[props.index][0]} * var(--grid-cell))`;
      }
    }

    watchEffect(() => {
      if(npcObj.value.currentHealth === 0){
        const npc = document.getElementById('npc-'+props.index);  
        npc.remove();
      }
    })

    const setSprite = () => {
      const npcSprite = document.querySelector(`#npc_sprite-${props.index}`)
      let file = require('../assets/NPCs/' + npcObj.value.name + '.png');
      npcSprite.style.background = `url(${file}) no-repeat no-repeat`;
      npcSprite.style.backgroundSize = '100%';
    }

    const activateDialogue = () => {
      toggle.showDialogue = !toggle.showDialogue;
      let rng = Math.floor(Math.random() * props.npc.dialogue.length);
      const {string: text, audio } = props.npc.dialogue[rng]; 
      dialogue.text = text;
      dialogue.audio = audio;
    }

    onMounted(() => {
      setSprite();
      getNPCTiles();
      placeNPC();
    })

    return { npcObj, activateDialogue, dialogue, toggle }
  }
}
</script>

<style lang="scss">
  .npc{
    width: var(--grid-cell);
    height: var(--grid-cell);
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    z-index: 2;
    p {
      padding: 0;
      margin: 0;
      font-size: 0.7rem;
    }
  }

  .npc_sprite {
    position: absolute;
    width: calc(var(--grid-cell) * 3);
    height: calc(var(--grid-cell) * 3);
    //animation: walkAnimation 0.6s steps(3) infinite;
  }

</style>