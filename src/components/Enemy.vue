<template>
  <div :id="'enemy-'+index" class="enemy">
    {{enemy.name}}
  </div>
</template>

<script>
import { onMounted } from 'vue';
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


    onMounted(() => {
      getEnemyTiles();
      placeEnemy();
    })

    return {}
  }
}
</script>

<style>
  .enemy{
    width: var(--grid-cell);
    height: var(--grid-cell);
    background-color: teal;
    pointer-events: none;
    position: absolute;
  }

</style>