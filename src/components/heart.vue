<template>
<div class="heart-svg-wrp">
<svg class="heart-svg" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
viewBox="0 0 50 50"  xml:space="preserve">
<path  d="M 0.001953125 0 L 0.001953125 50.009766 L 50.119141 50.009766 L 50.119141 0 L 0.001953125 0 z M 14.574219 5.0234375 C 19.255957 5.0234375 23.019596 7.9417724 24.78125 12.117188 C 26.542903 7.9417724 30.567182 5.0234375 35.248047 5.0234375 C 41.553508 5.0234375 46.095094 10.419106 46.666016 16.847656 C 46.666016 16.847656 46.973219 18.443462 46.294922 21.316406 C 45.37132 25.229056 43.200505 28.704467 40.273438 31.357422 L 24.78125 45.179688 L 9.5488281 31.357422 C 6.6217603 28.70534 4.4509459 25.227103 3.5273438 21.314453 C 2.8490462 18.441509 3.15625 16.845703 3.15625 16.845703 C 3.7271723 10.417153 8.2687584 5.0234375 14.574219 5.0234375 z "/>
</svg>
</div>

</template>

<script>
export default {

}
</script>currentTabComponent

<style lang="scss">
.heart-svg-wrp {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  // background-color: #333;
  top: 0;
  z-index: 88;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 99%;
    display: block !important;
    stroke-width: 0.1;
    stroke: #fff;
    fill: #333;   
  }
}
</style>