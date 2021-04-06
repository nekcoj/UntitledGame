<template>
<div>
  <div
    v-for="(skill, index) in characterState.activeSkills"
    :key="index"
    :class="'action-'+index"
    :style="{ backgroundPositionX: -(skill.iconPosition.x * 16 * pixelSize) +'px', backgroundPositionY: -(skill.iconPosition.y * 16 * pixelSize) +'px' }"
  >
    <span class="actionbar-text">{{index+1}}</span>
    <div :id="'skill-'+index" class="cooldown">

    </div>
  </div>
</div>

</template>

<script>
import { onMounted } from 'vue';
import Store from '../helpers/Store';
export default {
  name: 'Actionbar',
  setup() {
    const { characterState, pixelSize } = Store();

    onMounted(() => {
      document.addEventListener('keydown', e => {
        switch(e.code) {
          case 'Digit1':
            performAction(e.code);
            break;
          case 'Digit2':
            performAction(e.code);
            break;
          case 'Digit3':
            performAction(e.code);
            break;
          default:
            break;
        }
      });
    });

    const performAction = (spell) => {
      let spellNumber = parseInt(spell.split('Digit')[1]) - 1;
      let action = document.getElementById(`skill-${spellNumber}`);
      if (action.classList.contains('onCooldown')) return;
      action.classList.add('onCooldown');
      action.style.animationDuration = characterState.activeSkills[spellNumber].cooldown + 's';
      characterState.activeSkills[spellNumber].effect(spellNumber);
      setTimeout(() => {
        action.classList.remove('onCooldown')
      }, (characterState.activeSkills[spellNumber].cooldown * 1000));
    }
    return { characterState, pixelSize }
  }
}
</script>

<style lang="scss">
  .actionbar{
    display: flex;
    position: absolute;
    width: calc(var(--grid-cell) * 3) + 10;
    height: var(-grid-cell);
    border: 3px solid wheat;
    background-color: wheat;
    justify-content: flex-start;
  }
  .actionbar-text {
    font-weight: 700;
    color: white;
    -webkit-text-stroke: 1px black;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    margin: 0;
    display: flex;
  }

  .action-0{
    background-image: url('../assets/icons.png');
    width: var(--grid-cell);
    height: var(--grid-cell);
    border: 2px solid black;
    outline: 1px solid grey;
    display: flex;
  }
  .action-1{
    background-image: url('../assets/icons.png');
    width: var(--grid-cell);
    height: var(--grid-cell);
    border: 2px solid black;
    outline: 1px solid grey;
    display: flex;
  }
  .action-2{
    background-image: url('../assets/icons.png');
    width: var(--grid-cell);
    height: var(--grid-cell);
    border: 2px solid black;
    outline: 1px solid grey;
    display: flex;
  }

  .cooldown{
    width: var(--grid-cell);
    height: var(--grid-cell);
    display: flex;
    position: absolute;
    overflow: hidden;
  }

  .onCooldown {
    background-color:rgba(46, 49, 49, 0.6);
    animation: cooldown;
    animation-timing-function: linear;
  }

  @keyframes cooldown {
   0% { width: var(--grid-cell); }
   100% { width: 0px; }
}
</style>