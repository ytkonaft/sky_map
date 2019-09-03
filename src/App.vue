<template>
  <div id="app">
    <div class="container">
      <div id="preview">
        <div id="celestial-map" ref="wrapper" ></div>
        <input type="button" value="Get image" @click="loadSVG">
        <img :src="image" class="preview-img">
      </div>
      <div id="control-panel">
        <h1 class="product-page_title" itemprop="name">
          Карта звездного неба / <span class="js-color_name">Blue ocean</span>
        </h1>

        <div class="product-page_variants">
          <div class="product-page_variants_block other">
            <div class="name design">Выберите дизайн</div>
            <div class="input_wrap">
              <label title="Blue ocean">
                <input type="radio" name="color" value="698879">
              </label>
            </div>
          </div>
        </div>

        <div class="product-page_variants">
          <div class="product-page_variants_block other">
            <div class="name" style="margin-bottom: 15px;">Выберите ваш город</div>
            <autocomplete
              placeholder="Введите ваш город"
              :source="endpoint"
              results-property="features"
              results-diplay="place_name"
              :results-display="formattedDisplay"
              @selected="addDistributionGroup">
            </autocomplete>
          </div>
        </div>

        <div class="product-page_variants">
          <div class="product-page_variants_block other">
            <div class="name" style="margin-bottom: 15px;">Выберите размер</div>
            <select name="size" class="js-param chosen-select nosearch">
              <option value="698881">А3 (42 х 29,7 см) - 990 рублей</option>
              <option value="698880">A2 (59,5 х 42 см) - 1490 рублей</option>
              <option value="714217">А3 с черной рамкой - 1990 рублей</option>
              <option value="714229">А3 с белой рамкой - 1990 рублей</option>
              <option value="714218">A2 с черной рамкой - 2590 рублей</option>
              <option value="714228">A2 с белой рамкой - 2590 рублей</option>
            </select>
          </div>
        </div>

        <div class="date-wrap">
          <div class="product-page_variants">
            <div class="product-page_variants_block other">
              <div class="name">Выберите дату события</div>
              <input type="text" name="date" />
            </div>
          </div>
        </div>

        <div class="product-page_price-wrap">
          <div id="artPersonal">
            <div class="art-div-reset art-div art-personalization" style="padding-top: 10px">
              <div class="art-personalization-custom1">
                <div class="art-h3 art-hdr">Персонализируйте подарок</div>
                <div class="art-pers-fields">
                  <div class="art-pers-field">
                    <div class="art-field-name">
                        <label for="pers_input1">Впишите ваше пожелание</label>:
                    </div>
                    <div class="art-field-value">
                        <input id="pers_input1" maxlength="40" class="art-order-field" name="perstext_1" placeholder="В этот день звезды решили за нас" value="" autocomplete="off" type="text">
                        <!-- <div class="art-input-maxsize">36</div> -->
                    </div>
                  </div>
                  <div class="art-pers-field">
                    <div class="art-field-name">
                        <label for="pers_input2">Впишите ваше пожелание</label>:
                    </div>
                    <div class="art-field-value">
                        <input id="pers_input2" maxlength="45" class="art-order-field" name="perstext_2" placeholder="я знаю, что такое любовь, благодаря тебе" value="" autocomplete="off" type="text">
                        <!-- <div class="art-input-maxsize">41</div> -->
                    </div>
                  </div>
                  <div class="art-pers-field">
                      <div class="art-field-name">
                          <label for="pers_input3">Впишите ваш текст</label>:
                      </div>
                      <div class="art-field-value">
                          <input id="pers_input3" maxlength="20" class="art-order-field" name="perstext_3" placeholder="Россия, Москва" value="" autocomplete="off" type="text">
                          <!-- <div class="art-input-maxsize">16</div> -->
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="artsk-info">
          Срок доставки данного товара больше на 3-4 рабочих дня.
        </div>

        <div>
          <button class="product-generate_btn">Создать карту</button>
          <button class="js-btn_add product-page_in-cart_notactive"><span></span><p>В корзину</p></button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import Autocomplete from 'vuejs-auto-complete'

// import * as d3 from 'd3'
// import Celestial from 'd3-celestial/celestial'
let Celestial = require('d3-celestial/celestial')
let geo = require('d3-celestial/lib/d3.geo.projection')

export default {
  name: 'App',
  components: {
    HelloWorld,
    VueGoogleAutocomplete,
    Autocomplete
  },

  data: function () {
    return {
      address: '',
      image: '',
      config: ''
    }
  },

  mounted () {
    // D3-Celestial Properties different from default
    this.config = {
      width: 3000,
      location: false,
      interactive: false,
      controls: false,
      projection: 'airy',
      transform: 'equatorial',
      // center: [-150, 0],
      geopos: [38, 110],
      background: { fill: 'transparent', stroke: 'rgba(255,255,255,.6)', opacity: 1, width: 1 },
      datapath: 'https://ofrohn.github.io/data/',
      container: 'celestial-map',
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

    // let scale, baseScale
    // var level = [1, 2, 6]
    // var baseScale
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

    Celestial.display(this.config)
    let canvasDiv = this.$refs.wrapper.children[0]
    canvasDiv.id = 'canvas'
  },

  methods: {
    endpoint (input) {
      return 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + input + '.json?access_token=pk.eyJ1IjoibWFrc2ltOTg5IiwiYSI6ImNqeDY0OXZrbzA4Nnk0ZHF1bG9ybmxvNGsifQ.-OcDOS1w1vyn8poaNOtsDg'
    },
    formattedDisplay (result) {
      // return result.name + ' [' + result.groupId + ']'
      return result.place_name
    },
    addDistributionGroup (group) {
      console.log(group.selectedObject.center)
      this.address = group.selectedObject.center

      // this.config.geopos = this.address
      // Celestial.apply(this.config)
      this.config.geopos = [this.address[0], this.address[1]]
      // console.log(this.config)

      // window.Celestial.display(this.config)
      Celestial.rotate({center: [this.address[0], this.address[1], 0]})
      console.log('a')
    },
    getAddressData: function (addressData, placeResultData, id) {
      this.address = addressData
      console.log(this.address)
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
#control-panel {
  text-align: left;
}
.product-page_title {
    font-weight: bold;
    font-size: 20px;
}
.product-page_title {
    font-size: 18px;
    font-weight: bold;
    line-height: 22px;
    color: #1a1a1a;
    letter-spacing: 0;
}
.product-page_variants .name {
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
}
.product-page_variants .name.design {
    font-size: 14px;
    font-weight: normal;
    text-transform: none;
}
.product-page_variants_block {
  margin-top: 30px;
}
.date-wrap input[type="text"] {
  background-color: #fff;
  border: 1px solid #cccccc;
  font: 12px/24px "proxima-nova",Arial,sans-serif;
  height: 24px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  width: 100%;
  margin-top: 15px;
}
#artPersonal .art-h3 {
  text-transform: uppercase;
  font-weight: bold;
  color: #080808;
}
.art-field-name {
  padding-top: 20px;
  font-family: Georgia;
  font-style: italic;
  color: #080808;
}
.art-field-value {
  padding-top: 8px;
}
.art-field-value input[type="text"] {
  background-color: #fff;
  border: 1px solid #cccccc;
  font: 12px/24px "proxima-nova",Arial,sans-serif;
  height: 24px;
  padding: 0 0 0 10px;
  box-sizing: border-box;
  width: 100%;
}
.artsk-info {
  padding-top: 30px;
  font-size: 11px;
  color: #f36523;
  letter-spacing: 0.5px;
}
.product-generate_btn,
.product-page_in-cart_notactive {
  display: block;
  width: 190px;
  height: 38px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  float: left;
  border: 2px solid;
  margin-top: 29px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  text-align: center;
}
.product-generate_btn {
  background: #29b4ad;
  border-color: #29b4ad;
  color: #fff;
  margin-right: 20px;
}
.product-page_in-cart_notactive {
  background: #fff;
  border-color: #cccccc;
  color: #cccccc;
}
</style>
