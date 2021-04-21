<template>
  <div>
    <div class="targets">
      <div class="container">
        <div class="title">Enemies</div>
        <div class="target" v-for="(enemy, index) in enemyRefs" :key="index">
          <div class="enemy_name">{{enemy.enemyObj.currentHealth > 0 ? enemy.enemyObj.name : 'Dead'}}</div>
          <Health class="enemy_health" :max="enemy.enemyObj.maxHealth" :current="enemy.enemyObj.currentHealth"/>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../helpers/Store';
import Health from './Health';
export default {
  name: 'TargetList',
  components: { Health },
  setup() {
    const { enemyRefs } = Store();

    return { enemyRefs }
  }
}
</script>

<style lang="scss" scoped>
  .targets{
    width: calc(var(--grid-cell) * 2);
    padding: 10px 5px 5px 5px;
    background-color: wheat;
    position: absolute;
    bottom: 5px;
    right: 5px;
    z-index: 99;
    text-align: left;
    outline: 2px solid #000;
    border-radius: 2px;
  }

  .container {
    border: 1px solid black;
    padding: 15px 5px 5px 5px;
    position: relative;
  }

  .title {
    background-color: wheat;
    position: absolute;
    font-size: 0.8rem;
    top: -10px;
  }

  .target{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 
      "enemy_name enemy_name enemy_name"
      "health health health";
    border: 1px solid grey;
    border-radius: 2px;
    margin: 2px;
    padding: 3px;
    background-color: rgba(255, 255, 255, 0.6);
    &:hover{
      background: darken(rgba(255, 255, 255, 0.6), 20);
    }
  }

  .enemy_health{
    grid-area: health;
    margin: auto;
  }

  .enemy_name{
    grid-area: enemy_name;
    font-size: 0.6rem;
    text-align: center;
  }

  .enemy_health_text{
    grid-area: health_text;
    font-size: 0.6rem;
  }
</style>