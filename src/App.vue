<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <!-- <HelloWorld /> -->
    <div class="container">
      <div id="preview">
        <div id="celestial-map" ref="wrapper" ></div>
        <input type="button" value="Get image" @click="loadSVG">
      </div>
      <img :src="image" class="preview-img">
      <div id="control-panel">
        <!--
        <vue-google-autocomplete
          id="map"
          class="form-control"
          placeholder="Start typing"
          v-on:placechanged="getAddressData"
        ></vue-google-autocomplete>
        -->
        <form></form>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import VueGoogleAutocomplete from 'vue-google-autocomplete'

// import * as d3 from 'd3'
// import Celestial from 'd3-celestial/celestial'
let Celestial = require('d3-celestial/celestial')

export default {
  name: 'App',
  components: {
    HelloWorld,
    VueGoogleAutocomplete
  },

  data: function () {
    return {
      address: '',
      image: ''
    }
  },

  mounted () {
    // D3-Celestial Properties different from default
    const config = {
      width: 3000,
      location: false,
      interactive: false,
      controls: false,
      projection: 'airy',
      transform: 'equatorial',
      center: [-150, 0],
      background: { fill: 'transparent', stroke: 'rgba(255,255,255,.6)', opacity: 1, width: 1 },
      datapath: 'https://ofrohn.github.io/data/',
      container: 'celestial-map',
      geopos: null,
      follow: 'zenith',
      zoomlevel: null,
      daterange: [],
      stars: {
        colors: false,
        names: false,
        style: { fill: '#fff', opacity: 1 },
        limit: 50,
        size: 15
      },
      constellations: {
        show: true,
        namestyle: {
          fill: '#aaa',
          font: '0 Helvetica, Arial, sans-serif',
          align: 'center',
          baseline: 'middle',
          opacity: 0.9
        },
        linestyle: { stroke: '#999', width: 1.5, opacity: 0.8 }
      },
      dsos: { show: false },
      mw: { show: false },
      lines: {
        graticule: { show: false },
        equatorial: { show: false, stroke: '#aaaaaa', width: 1.3, opacity: 0.7 },
        ecliptic: { show: false, stroke: '#66cc66', width: 1.3, opacity: 0.7 },
        galactic: { show: false, stroke: '#cc6666', width: 1.3, opacity: 0.7 },
        supergalactic: { show: false, stroke: '#cc66cc', width: 1.3, opacity: 0.7 }
      }
    }

    // Asterism style properties
    // var cfgAst = {
    //   p1: { stroke: '#f33', width: 3 },
    //   p2: { stroke: '#f00', width: 2.5 },
    //   p3: { stroke: '#e70000', width: 2 },
    //   p4: { stroke: '#e00', width: 2 },
    //   p5: { stroke: '#d70000', width: 2 },
    //   p6: { stroke: '#f00', width: 2, dash: [2, 4] },
    //   text: {
    //     fill: '#f00',
    //     font: 'bold 13px Helvetica, Arial, sans-serif',
    //     align: 'center',
    //     baseline: 'middle'
    //   }
    // }

    // let scale, baseScale
    // var level = [1, 2, 6]
    // var baseScale
    let baseScale
    let scale

    Celestial = window.Celestial
    Celestial.add({
      file: config.datapath + 'asterisms.json',
      type: 'line',
      callback: function (error, json) {
        if (error) return console.warn(error)
        baseScale = Celestial.mapProjection.scale()
        var ast = Celestial.getData(json, config.transform)
        // Add the symbols
        Celestial.container
          .selectAll('.asts')
          .data(ast.features)
          .enter()
          .append('path')
          .replace('image/png', 'image/octet-stream')
        download.setAttribute('href', image)
          .attr('class', 'ast')
        Celestial.redraw()
      },
      redraw: function () {
        scale = window.Celestial.mapProjection.scale() / baseScale

        // Celestial.container.selectAll('.ast').each(function (d) {
        //   if (level.indexOf(parseInt(d.properties.p)) !== -1) {
        //     Celestial.setStyle(cfgAst['p' + d.properties.p])
        //     Celestial.map(d)
        //     Celestial.context.stroke()

        //     if (
        //       d.properties.loc[0] !== 0 &&
        //       d.properties.loc[1] !== 0 &&
        //       Celestial.clip(d.properties.loc)
        //     ) {
        //       let style = cfgAst.text
        //       let pt = Celestial.mapProjection(d.properties.loc)
        //       style.fill = cfgAst['p' + d.properties.p].stroke
        //       Celestial.setTextStyle(style)
        //       Celestial.context.fillText(d.properties.n, pt[0], pt[1])
        //     }
        //   }
        // })
      }
    })

    window.Celestial.display(config)
    let canvasDiv = this.$refs.wrapper.children[0]
    canvasDiv.id = 'canvas'
  },

  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData
      console.log(this.address)
    },
    loadSVG: function () {
      console.log(window.Celestial.container.selectAll())
      var image = window.Celestial.context.canvas.toDataURL('image/png')
      this.image = image
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #333;
  margin-top: 60px;
}

.preview-img {
  width: 750px
}
#celestial-map {
  display: none;
}
</style>
