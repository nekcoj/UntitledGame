<template>
  <div class="spellbook">
    <div class="container">
      <div class="title">Active skills</div>
      <div class="spell" v-for="(skill, index) in characterState.activeSkills" :key="index">
        <div class="icon">
          <div
            class="spell-icon"
            :style="{ backgroundPositionX: -(skill.iconPosition.x * 16 * pixelSize) +'px', backgroundPositionY: -(skill.iconPosition.y * 16 * pixelSize) +'px' }"
          ></div>
        </div>
        <div class="spell-name">
          {{skill.name}}
        </div>
        <div class="spell-damage">
          {{skill.type === 'attack' ? `Damage: ${skill.baseDamage}` : `Healing: ${skill.baseDamage}`}}
        </div>
        <div class="spell-description">
          {{skill.description}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../helpers/Store';
export default {
  name: 'Spellbook',
  setup() {
    const { characterState, pixelSize } = Store();
    
    return { characterState, pixelSize }
  }
}
</script>

<style lang="scss">
  .spellbook{
    width: calc(var(--grid-cell) * 5);
    padding: 10px 5px 5px 5px;
    background-color: wheat;
    position: absolute;
    top: 5px;
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

  .spell{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: auto;
    grid-template-areas: 
      "name . . . icon"
      "damage damage damage . icon"
      "desc desc desc desc icon";
    border: 1px solid grey;
    border-radius: 2px;
    margin: 2px;
    padding: 3px;
    background-color: rgba(255, 255, 255, 0.6);
    &:hover{
      background: darken(rgba(255, 255, 255, 0.6), 20);
    }
  }

  .icon{
    grid-area: icon;
    width: var(--grid-cell);
    height: var(--grid-cell);
    overflow: hidden;
  }
    
  .spell-icon{
    background: url('../assets/icons.png') no-repeat no-repeat;
    background-size: 100%;
    width: calc(var(--grid-cell) * 16);
    height: calc(var(--grid-cell) * 16);
  }

  .spell-name{
    grid-area: name;
  }

  .spell-damage{
    grid-area: damage;
    font-size: 0.6rem;
  }

  .spell-description{
    grid-area: desc;
    font-size: 0.6rem;
  }
</style>