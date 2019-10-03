<template>
  <div class="shape-svg-wrp">
    <svg
      class="shape-svg"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 500 500"
      :style="{
        fill: fillColor,
        outlineColor: fillColor,
        stroke: strokeColor
      }"
      xml:space="preserve"
    >
    <g v-html="shape"></g>
    </svg>
  </div>
</template>

<script>
let Celestial = require("../libs/celestial.js")

export default {
  data: function () {
    return {
      // fillColor: '#333'
    }
  },
  props: ['shape', 'image'],
  computed: {
    fillImage() {
      // return window.Celestial.context.canvas.toDataURL("image/png");
    },
    fillColor () {
      return `url('${this.image}')`
      switch (this.theme) {
        case 'rose':
          return '#fff'
        case 'navy':
          return '#381074'
        default:
          return '#333'
     }
      // return this.theme === 'rose' ? '#fff' : '#381074'
    },
    strokeColor () {
      return this.theme === 'rose' ? '#000' : '#fff'
    }
  }
}
</script>

<style lang="scss">
.shape-svg-wrp {
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
    // outline-color: #333;
    outline-style: solid;
    outline-width: 20px;
    outline-offset: -10px;
  }
}
</style>