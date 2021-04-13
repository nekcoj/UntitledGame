<template>
  <div :id="'enemy-'+index" class="enemy">
    <div :id="'enemy_sprite-'+index" class="enemy_sprite pixelart"></div>
    <div id="enemy_shadow" class="character_shadow pixelart"></div>
    <!-- <div class="enemy_text">
      <p>{{enemyObj.name}}</p>
      <p>{{enemyObj.currentHealth}}/{{enemyObj.maxHealth}}</p>
    </div> -->
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import Store from '../helpers/Store';
export default {
  name: 'Enemy',
  props: {
    enemy: Object,
    index: Number,
  },
  setup(props) {
    const { gameState } = Store();
    const enemyTiles = [];
    const enemyObj = ref(Object.assign({}, props.enemy));

    const getEnemyTiles = () => {
      gameState.level.blocked.forEach((row, i) => {
        row.forEach((col, j) => { 
          if (col === 4) {
            enemyTiles.push([j, i]);
          }
        });
      });
    }

    const placeEnemy = () => {
      const enemy = document.getElementById('enemy-'+props.index);
      if (enemyTiles[props.index]) {
        enemy.style.top = `calc(${enemyTiles[props.index][1]} * var(--grid-cell))`;
        enemy.style.left = `calc(${enemyTiles[props.index][0]} * var(--grid-cell))`;
      }
    }

    const setHealth = (crementValue) => {
      console.log(enemyObj);
      enemyObj.value.currentHealth = enemyObj.value.currentHealth + crementValue > enemyObj.value.maxHealth ?
        enemyObj.value.maxHealth : enemyObj.value.currentHealth + crementValue <= 0 ? 0 : enemyObj.value.currentHealth += crementValue;
    }

    const setSprite = () => {
      const enemySprite = document.querySelector(`#enemy_sprite-${props.index}`)
      let url = '../assets/Enemy' + enemyObj.value.sprite;
      console.log(url);
      enemySprite.style.background = 'url(' + `${require('../assets/Enemy' + enemyObj.value.sprite)}` + ') no-repeat no-repeat';
      enemySprite.style.backgroundSize = '100%';
      //test\src\assets\Enemy\Enemy04-1.png
    }

    onMounted(() => {
      setSprite();
      getEnemyTiles();
      placeEnemy();
    })

    return { enemyObj, setHealth }
  }
}
</script>

<style lang="scss">
  .enemy{
    width: var(--grid-cell);
    height: var(--grid-cell);
    //background-color: teal;
    pointer-events: none;
    position: absolute;
    overflow: hidden;
    p {
      padding: 0;
      margin: 0;
      font-size: 0.7rem;
    }
  }

  .enemy_sprite {
    position: absolute;
    width: calc(var(--grid-cell) * 3);
    height: calc(var(--grid-cell) * 3);
    z-index: 1;
  }

  .enemy_text {
    position: absolute;
    top: 0;
    left: 0;
  }

</style>