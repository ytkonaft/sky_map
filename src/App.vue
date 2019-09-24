<template>
  <div id="app">
    <div class="container">
      <div id="preview" :class="totalClass">
        <div class="map-container">
          <div id="celestial-map" :class="dynamicComponent" ref="wrapper">
            <div class="heart" height="600">
              <!-- <Heart :theme="totalClass"/> -->
              <component :is="dynamicComponent" :theme="totalClass"></component>
            </div>
          </div>
          <!-- <input type="button" value="Get image" @click="loadSVG"> -->
          <img :src="image" class="preview-img">
          <div class="frame">
            <div id="labels" class="caption">
                <div class="text1">{{ text1 }}</div>
                <br>
                <div class="country">{{ text2 }}</div>
                <div class="city" v-show="!showDate">24 сентября 2019 {{ date }}</div>
                <div class="city">{{ text3 }}</div>
            </div>
          </div>
        </div>
      </div>
      <ControlPanel
        @updateLocation="check"
        @changeDate="updateDate"
        @inputChange="updateText"
        @changeDesign="updateDesign"
        @changeShape="updateShape"
        @toggleShowDate="updateShowDate"
      />
    </div>
  </div>
</template>

<script>
import ControlPanel from './components/ControlPanel'
import Heart from './components/heart'

let Celestial = require('d3-celestial/celestial.js')
// let Celestial = require('./libs/celestial.js')
let geo = require('d3-celestial/lib/d3.geo.projection')

export default {
  name: 'App',
  components: {
    ControlPanel,
    Heart
  },

  data: function () {
    return {
      text1: 'В этот день звезды решили за нас',
      text2: 'я знаю, что такое любовь, благодаря тебе',
      text3: 'Россия, Москва',
      showDate: false,
      date: '',
      image: '',
      design: '',
      shape: '',
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
            opacity: 1
          },
          linestyle: { stroke: '#999', width: 4.5, opacity: 1 }
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
  computed: {
    totalClass () {
      switch (this.design) {
        case '725449':
          return 'rose'
        case '725448':
          return 'navy'
        default:
          return ''
      }
    },
    dynamicComponent () {
      switch (this.shape) {
        case 'heart':
          return 'heart'
        default:
          return ''
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
        // Celestial.container
        //   .selectAll('.asts')
        //   .data(ast.features)
        //   .enter()
        //   .append('path')
        //   .replace('image/png', 'image/octet-stream')
        // download.setAttribute('href', image)
        // .attr('class', 'ast')
        Celestial.redraw()
      },
      redraw: function () {
        scale = window.Celestial.mapProjection.scale() / baseScale
      }
    })

    Celestial.display(this.config)
    let canvasDiv = this.$refs.wrapper.children[0]
    canvasDiv.id = 'canvas'
    // const ctx = Celestial.context.canvas.getContext('2d')
  },
  methods: {
    updateDesign (val) {
      this.design = val
    },
    updateShape (val) {
      this.shape = val
    },
    updateShowDate (val) {
      console.log(val)
      this.showDate = val
    },
    updateText (obj) {
      this.text1 = obj.text1,
      this.text2 = obj.text2,
      this.text3 = obj.text3
    },
    check (data) {
      Celestial.rotate({ center: [data[0], data[1], 0] })
    },
    updateDate (date) {
      console.log('aae')
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
      console.log(image)
      this.image = image
    }
  }
}
</script>
<style lang="scss">
@font-face {
    font-family: 'CentSchbkCyrill';
    src: url('./assets/fonts/tt6806m.eot');
    src: url('./assets/fonts/tt6806m.eot') format('embedded-opentype'),
         url('./assets/fonts/tt6806m.woff2') format('woff2'),
         url('./assets/fonts/tt6806m.woff') format('woff'),
         url('./assets/fonts/tt6806m.ttf') format('truetype'),
         url('./assets/fonts/tt6806m.svg#tt6806m') format('svg');
}

@font-face {
    font-family: 'CentSchbkCyrillIt';
    src: url('./assets/fonts/tt6805m.eot');
    src: url('./assets/fonts/tt6805m.eot') format('embedded-opentype'),
         url('./assets/fonts/tt6805m.woff2') format('woff2'),
         url('./assets/fonts/tt6805m.woff') format('woff'),
         url('./assets/fonts/tt6805m.ttf') format('truetype'),
         url('./assets/fonts/tt6805m.svg#tt6806m') format('svg');
}
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
  width: 80%;
  margin: 1.5em auto 0 auto;
  border-radius: 50%;
  overflow: hidden;
  // background: #000;
  border: 2px solid #fff;
  position: relative;

  &.heart {
    border:none;
    border-radius:0;
  }
}

#celestial-map canvas {
  width: 100%;
  height: auto;
  transform: scale(1.03) translateY(2px)
}

#canvas {
  svg {
    display: none;
  }
}

.heart {
  display: block !important;
  position: absolute;
  width: 100%;
  height: 100%;
  // transform: scale(1.03) translateY(2px);
  z-index: 100;
  // background: url('./assets/heart3.png');
  img, svg path {
    width: 100%;
    height: 100%;
  }
}
.top_layer {
  display: none;
  &.heart {
    display: block !important;
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(1.03) translateY(2px);
    z-index: 100;
    // background: url('./assets/heart3.png');
    img, svg path {
      width: 100%;
      height: 100%;
    }
    &.heart {
      background: url('./assets/heart3.png')
    }
  }
}

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1140px;
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
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
  &.navy {
    background: #381074;
    #celestial-map {
    }
  }
  &.rose {
    background: #FFF;
    border: 2px solid #000;
    #celestial-map {
      background: linear-gradient(120deg, rgba(56,16,116,1) 0%, rgba(225,151,191,1) 100%);
    }
    #labels {
      color: #000;
    }
  }
  // &.navy {
  //   background-color: #381074;
  // }
}
.preview-img {
  width: 100%
}

.map-container {
  min-height: 700px;
}
.frame {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5em;
  padding: 0;
  // -webkit-font-smoothing: antialiased;
  // box-sizing: border-box;
  // position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // pointer-events: none;
  z-index: 10000;

  .caption {
    font-family: 'CentSchbkCyrill', ;
    text-align: center;
    color: #FFF;
    // background: #fff;
    // padding: 1.12em;
    margin: 0;
    bottom: -2px;
    left: -2px;
    right: -2px;
    width: calc(100% + 4px);
    .country, .city {
      font-style: italic;
      font-size: 10px;
      margin-top: 0.5em;
    }
    .country {
      font-family: 'CentSchbkCyrillIt', sans-serif;
    }
    .city {
      font-family: 'sans';
      margin-top: 2em;
    }
  }
}

@import './assets/scss/media';
</style>
