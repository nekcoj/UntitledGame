<template>
  <div :id="'enemy-'+index" class="enemy" :ref="el => {enemyPosRefs[index] = el}">
    <p>{{enemy.name}}</p>
    <p>{{enemy.currentHealth}}/{{enemy.maxHealth}}</p>
    
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
    const { gameState, enemyPosRefs } = Store();
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

    return { enemyPosRefs }
  }
}
</script>

<style lang="scss">
  .enemy{
    width: var(--grid-cell);
    height: var(--grid-cell);
    background-color: teal;
    pointer-events: none;
    position: absolute;
    p {
      padding: 0;
      margin: 0;
      font-size: 0.7rem;
    }
  }

</style>