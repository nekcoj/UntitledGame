<template>
  <div v-if="show" class="dialogue-box">
    {{text}}
  </div>
</template>

<script>
export default {
  name: "Dialogue",
  props: {
    show: Boolean,
    text: String,
    audio: String,
  }
  

}
</script>

<style lang="scss">
  .dialogue-box {
    position: absolute;
    bottom: 5px;
    left: 50px;
    padding: 2%;
    height: calc(var(--grid-cell) * 1);
    width: calc(var(--grid-cell) * 9);
    background: wheat;
    border: 3px solid brown;
    border-radius: 5px;
    z-index: 5;
    text-align: left;
  }
</style>