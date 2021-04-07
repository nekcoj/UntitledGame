<template>
<div>
  <div
    v-for="(skill, index) in characterState.activeSkills"
    :key="index"
    :class="'action-'+index"
  >
    <div
      class="action-image pixelart"
      :style="{ backgroundPositionX: -(skill.iconPosition.x * 16 * pixelSize) +'px', backgroundPositionY: -(skill.iconPosition.y * 16 * pixelSize) +'px' }"
    />
    <div :id="'skill-'+index" class="cooldown">
    <span class="actionbar-text">{{index+1}}</span>

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
            console.log(e);
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
    width: calc(var(--grid-cell) * 3 + 10);
    height: calc(var(--grid-cell) + 10);
    border: 3px solid wheat;
    background-color: wheat;
    bottom: 0;
    margin: 0 auto;
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

  .action-0, .action-1, .action-2{
    width: calc(var(--grid-cell));
    height: calc(var(--grid-cell));
    border: 2px solid black;
    outline: 1px solid grey;
    position: relative;
    overflow: hidden;
  }
  .action-image {
    background: url('../assets/icons.png') no-repeat no-repeat;
    background-size: 100%;
    width: calc(var(--grid-cell) * 16);
    height: calc(var(--grid-cell) * 16);
    position: absolute;
  }

  .cooldown{
    width: var(--grid-cell);
    height: var(--grid-cell);
    position: absolute;
    overflow: hidden;
  }

  .onCooldown {
    background-color:rgba(46, 49, 49, 0.6);
    animation: cooldown;
    animation-timing-function: linear;
  }

  .attackSpell{
    width: calc(var(--grid-cell) / 2);
    height: calc(var(--grid-cell) / 2);
    background-color: black;
    position: absolute;
    animation: attackSpell;
    animation-timing-function: linear;
  }

  @keyframes cooldown {
    0% {
      width: var(--grid-cell);
    }
    100% {
      width: 0px;
    }
  }

  @keyframes attackSpell {
    from {
      left: var(--spell-start-x);
      top: var(--spell-start-y);
    }
    to {
      left: var(--mouse-x);
      top: var(--mouse-y);
    }
  }
</style>