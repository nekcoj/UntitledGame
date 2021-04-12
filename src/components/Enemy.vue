<template>
  <div :id="'enemy-'+index" class="enemy" :ref="el => {enemyPosRefs[index] = el}">
    <p>{{enemyObj.name}}</p>
    <p>{{enemyObj.currentHealth}}/{{enemyObj.maxHealth}}</p>
    
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
    const { gameState, enemyPosRefs } = Store();
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


    onMounted(() => {
      getEnemyTiles();
      placeEnemy();
    })

    return { enemyObj, enemyPosRefs, setHealth }
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