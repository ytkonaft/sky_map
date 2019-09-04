<template>
  <div id="app">
    <div class="container">
      <div id="preview">
        <div id="celestial-map" ref="wrapper" ></div>
        <input type="button" value="Get image" @click="loadSVG">
        <img :src="image" class="preview-img">
      </div>
      <ControlPanel @updateLocation="check" @updateDate="updateOnDate" />
    </div>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel'

let Celestial = require('d3-celestial/celestial.js')
let geo = require('d3-celestial/lib/d3.geo.projection')

export default {
  name: 'App',
  components: {
    ControlPanel
  },

  data: function () {
    return {
      image: '',
      config: {
        width: 3000,
        location: true,
        interactive: false,
        controls: false,
        projection: 'airy',
        transform: 'equatorial',
        center: [-150, 0],
        // geopos: [38, 110],
        background: { fill: 'transparent', stroke: 'rgba(255,255,255,.6)', opacity: 1, width: 1 },
        datapath: 'https://ofrohn.github.io/data/',
        container: 'celestial-map',
        // follow: 'zenith',
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
    }
  },
  mounted () {
    // D3-Celestial Properties different from default

    let baseScale
    let scale

    Celestial = window.Celestial
    Celestial.add({
      file: this.config.datapath + 'asterisms.json',
      type: 'line',
      callback: (error, json) => {
        if (error) return console.warn(error)
        baseScale = Celestial.mapProjection.scale()
        var ast = Celestial.getData(json, this.config.transform)
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
      }
    })

    console.log(Celestial)
    Celestial.display(this.config)
    let canvasDiv = this.$refs.wrapper.children[0]
    canvasDiv.id = 'canvas'
  },
  methods: {
    check (data) {
      Celestial.rotate({ center: [data[0], data[1], 0] })
    },
    updateOnDate (date) {
      console.log(date)
      Celestial.date(date)
      this.config.daterange = date
    },
    loadSVG: function () {
      console.log(window.Celestial.container.selectAll())
      // console.log(window.Celestial)
      console.log(this.config.geopos)
      console.log(this.address)
      if (this.address !== '') {
        this.config.geopos = this.address
        window.Celestial.apply(this.config)
      }
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
  margin-top: 60px;
}

#celestial-map {
  display: block;
  height: auto !important;
}

#celestial-map canvas {
  width: 100%;
  height: auto;
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
#preview {
  background-color: #333;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  width: 49%;
  flex-direction: column;
}
.preview-img {
  width: 100%
}

</style>
