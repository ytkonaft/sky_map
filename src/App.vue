<template>
  <div id="app">
    <div class="container">
      <div id="preview" :class="totalClass" ref="prev">
          <div id="celestial-map" :class="dynamicComponent" ref="wrapper">
            <div class="heart" height="600">
              <component :is="dynamicComponent" :theme="totalClass"></component>
            </div>
          </div>
          <img :src="image" class="preview-img">
          <!-- <div class="frame">
            <div id="labels" class="caption">
                <div class="text1">{{ text1 }}</div>
                <br>
                <div class="country">{{ text2 }}</div>
                <div class="city" v-show="!showDate">{{ date }}</div>
                <div class="city">{{ text3 }}</div>
            </div>
          </div> -->
        <div class="map-container2">
          <svg version="1.1" id="Слой_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 841.89 1190.55" style="enable-background:new 0 0 841.89 1190.55;" xml:space="preserve">
            <rect x="27.74" y="28.81" class="st0" width="786.49" height="1135.14"/>
              <circle id="test" class="st1" cx="420.98" cy="462.93" r="321.43"/>
            <text transform="matrix(1 0 0 1 364.2654 952.5249)" class="st2 st3">{{ text1 }}</text>
            <text transform="matrix(1 0 0 1 383.0738 977.192)" class="st4 st5">{{ text2 }}</text>
            <text transform="matrix(1 0 0 1 408.4772 1120.583)" class="st6 st7" v-show="!showDate">{{ date }}</text>
            <text transform="matrix(1 0 0 1 406.4477 1136.4147)" class="st6 st7">{{ text3 }}</text>
          </svg>
        </div>
      </div>
      <ControlPanel
        :datetime="date"
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

// let Celestial = require('d3-celestial/celestial.js')
let Celestial = require('./libs/celestial.js')
// let geo = require('d3-celestial/lib/d3.geo.projection')

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
  destroyed () {
    window.removeEventListener('resize', this.setBounds)
  },
  mounted () {
    // D3-Celestial Properties different from default

    let baseScale
    // let scale

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
      timechanged: (date) => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' }
        this.date = date.toLocaleDateString('ru-RU', options)
      },
      redraw: function () {
        var scale = window.Celestial.mapProjection.scale() / baseScale
      }
    })

    Celestial.display(this.config)
    let canvasDiv = this.$refs.wrapper.children[0]
    canvasDiv.id = 'canvas'
    // const ctx = Celestial.context.canvas.getContext('2d')
    this.setBounds()

    window.addEventListener('resize', this.setBounds)
  },
  methods: {
    setBounds () {
      const prevRec = this.$refs.prev.getBoundingClientRect()
      const img = document.getElementById('test')
      const rec = img.getBoundingClientRect()

      const cx = img.getAttribute('cx')
      const r = img.getAttribute('r')

      this.$refs.wrapper.style.top = `${rec.top - prevRec.top}px`
      this.$refs.wrapper.style.left = `${rec.left - prevRec.left}px`
      this.$refs.wrapper.style.width = `${rec.width}px`
    },
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
      this.text1 = obj.text1
      this.text2 = obj.text2
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
body{
  margin: 0;
}

.st0{fill:none;stroke:#000000;stroke-width:0.5;stroke-miterlimit:10;}
.st1{fill:#333;}

.st2 {
  font-family: 'CenturySchlbkCyrillicBT-Bold';
  transform: matrix(1, 0, 0, 1, 244.265, 952.525);
}
.st3{font-size:22px;}

.st4 {
  font-family:'Candara-LightItalic';
  transform: matrix(1, 0, 0, 1, 344.074, 977.192);
}

.st5{font-size:12px;}

.st6 {
  font-family:'Affect-Light';
}

.st7{font-size:11px;}

@font-face {
  font-family: 'CenturySchlbkCyrillicBT-Bold';
  src: url('./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.eot');
  src: url('./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.eot') format('embedded-opentype'),
       url('./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.woff2') format('woff2'),
       url('./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.woff') format('woff'),
       url('./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.ttf') format('truetype'),
       url('./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.svg#CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold') format('svg');
}

@font-face {
  font-family: 'Candara-LightItalic';
  src: url('./assets/fonts/CANDARAI.eot');
  src: url('./assets/fonts/CANDARAI.eot') format('embedded-opentype'),
        url('./assets/fonts/CANDARAI.woff2') format('woff2'),
        url('./assets/fonts/CANDARAI.woff') format('woff'),
        url('./assets/fonts/CANDARAI.ttf') format('truetype'),
        url('./assets/fonts/CANDARAI.svg#CANDARAI') format('svg');
}

@font-face {
  font-family: 'Affect-Light';
  src: url('./assets/fonts/AffectLight.eot');
  src: url('./assets/fonts/AffectLight.eot') format('embedded-opentype'),
       url('./assets/fonts/AffectLight.woff2') format('woff2'),
       url('./assets/fonts/AffectLight.woff') format('woff'),л
       url('./assets/fonts/AffectLight.ttf') format('truetype'),
       url('./assets/fonts/AffectLight.svg#AffectLight') format('svg');
}

canvas {
  // visibility: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}

#celestial-map {
  display: block;
  height: auto !important;
  width: 80%;
  margin: 0;
  border-radius: 50%;
  overflow: hidden;
  // background: #000;
  // border: 2px solid #fff;
  position: absolute;

  &.heart {
    border:none;
    border-radius:0;
  }
}

#celestial-map canvas {
  width: 100%;
  height: auto;
  transform: scale(1.02)
}

#canvas {
  svg {
    display: none;
  }
}
.map-container2 {
  width: 100%;
  min-height: 700px;
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
  // align-items: center;
  justify-content: space-between;
  max-width: 1140px;
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}
#preview {
  // background-color: #333;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
  background-repeat: no-repeat;
  width: 49%;
  flex-direction: column;
  &.navy {
    background: #381074;
  }
  &.rose {
    background: #FFF;
    // border: 2px solid #000;
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
  position: relative;
  @media screen and (min-width: 1040px) {
    min-height: 800px;
  }
  @media screen and (min-width: 970px) and (max-width: 1039px) {
    min-height: 650px;
  }
  @media screen and (min-width: 740px) and (max-width: 969px) {
    min-height: 580px;
  }
  // min-height: 700px;
}
.frame {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  // margin-top: 1.5em;
  padding: 0;
  // -webkit-font-smoothing: antialiased;
  // box-sizing: border-box;
  // position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  // pointer-events: none;
  z-index: 10000;
  position: absolute;
  bottom: 30px;
  //left: 50%;
  //margin-left: -50px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

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
