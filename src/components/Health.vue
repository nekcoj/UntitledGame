<template>
  <svg class="healthbar" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 25 9" shape-rendering="crispEdges">
    <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
    <path stroke="#ffffff" d="M0 1h0M2 1h21M24 1h0M1 2h1M23 2h1M1 3h1M23 3h1M1 4h1M23 4h1M1 5h1M23 5h1M1 6h1M23 6h1M0 7h0M2 7h21M24 7h0M0 8h0M23 8h0" />
    <path stroke="#000000" d="M2 0h21M1 1h1M23 1h1M0 2h1M2 2h21M24 2h1M0 3h1M2 3h1M22 3h1M24 3h1M0 4h1M2 4h1M22 4h1M24 4h1M0 5h1M2 5h1M22 5h1M24 5h1M0 6h1M2 6h21M24 6h1M1 7h1M23 7h1M2 8h21" />
    <path stroke="#7e7e7e" d="M3 3h19" />
    <path stroke="#c1c1c1" d="M3 4h19M3 5h19" />

    <rect fill="#00783f" x=3 y=2.5 :width="displayCurrentHealth()" height="1" />
    <rect fill="#00e745" x=3 y=3.5 :width="displayCurrentHealth()" height="2" />
  </svg>
</template>

<script>
export default {
  name: 'Health',
  props: {
    max: Number,
    current: Number,
  },
  setup(props) {
    const fillWidth = 19;
    const displayCurrentHealth = () => {
      return fillWidth * (props.current / props.max);
    }
    return { displayCurrentHealth }
  }
}
</script>

<style>
 .healthbar {
   width: calc(var(--grid-cell) * 2);
   display: flex;
   position: relative;
   top: 5px;
   left: 5px;
   z-index: 2;
 }
</style>