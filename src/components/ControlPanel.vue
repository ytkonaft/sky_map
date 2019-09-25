<template>
  <div id="control-panel">
    <h1 class="product-page_title" itemprop="name">
      Карта звездного неба
    </h1>

    <div class="product-page_variants">
      <div class="product-page_variants_block other">
        <div class="name design">Выберите дизайн</div>
        <div class="input_wrap">
          <label v-for="style in styles" :key="style.id" :title="style.name">
            <input type="radio" name="color" :value="style.id" v-model="design">
            <span><img :src=style.picture alt=""></span>
          </label>
        </div>

      </div>
    </div>

    <div class="product-page_variants">
      <div class="product-page_variants_block other">
        <div class="name design">Выберите форму</div>
        <div class="input_wrap">
          <label>
            <input type="button" v-on:click="setShape" value="heart">
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill-rule="evenodd" clip-rule="evenodd">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
              </svg>
            </span>
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
          @selected="addDistributionGroup"
        ></autocomplete>
      </div>
    </div>

    <div class="product-page_variants">
      <div class="product-page_variants_block other">
        <div class="name" style="margin-bottom: 15px;">Выберите размер</div>
        <v-select :options="options" label="label" :reduce="value => value.value" v-model="size"></v-select>
      </div>
    </div>

    <div class="date-wrap">
      <div class="product-page_variants">
        <div class="product-page_variants_block other" v-show="!showDate">
          <div class="name">Выберите дату события</div>
          <div id="celestial-form">
            <input type="text" title="datetime-hide" id="datetime1" >
          </div>
          <!-- <datepicker :value="date" :language="ru" @selected="setDate"></datepicker> -->
        </div>
      </div>
      <label>
        <input id="date_check" type="checkbox" name="date_check" v-model="showDate">
          Не устанавливать дату на карту
      </label>
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
                  <input
                    v-model="text1"
                    v-on:keyup="textToParent"
                    id="pers_input1"
                    maxlength="40"
                    class="art-order-field"
                    name="perstext_1"
                    placeholder="В этот день звезды решили за нас"
                    value
                    autocomplete="off"
                    type="text"
                  />
                  <!-- <div class="art-input-maxsize">36</div> -->
                </div>
              </div>
              <div class="art-pers-field">
                <div class="art-field-name">
                  <label for="pers_input2">Впишите ваше пожелание</label>:
                </div>
                <div class="art-field-value">
                  <input
                    v-model="text2"
                    v-on:keyup="textToParent"
                    id="pers_input2"
                    maxlength="45"
                    class="art-order-field"
                    name="perstext_2"
                    placeholder="я знаю, что такое любовь, благодаря тебе"
                    value
                    autocomplete="off"
                    type="text"
                  />
                  <!-- <div class="art-input-maxsize">41</div> -->
                </div>
              </div>
              <div class="art-pers-field">
                <div class="art-field-name">
                  <label for="pers_input3">Впишите ваш текст</label>:
                </div>
                <div class="art-field-value">
                  <input
                    v-model="text3"
                    id="pers_input3"
                    maxlength="20"
                    class="art-order-field"
                    name="perstext_3"
                    placeholder="Россия, Москва"
                    autocomplete="off"
                    type="text"
                  />
                  <!-- <div class="art-input-maxsize">16</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="artsk-info">Срок доставки данного товара больше на 3-4 рабочих дня.</div>
    <div>
      <button class="product-generate_btn" @click="sendData">Создать карту</button>
      <button class="js-btn_add product-page_in-cart_notactive">
        <span></span>
        <p>В корзину</p>
      </button>
    </div>

  </div>
</template>
<script>
import Autocomplete from 'vuejs-auto-complete'
// import Datepicker from 'vuejs-datepicker'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
// import axios from 'axios'
import AjaxService from '../services/AjaxService'
import Apiservice from '../services/ApiService'

export default {
  name: 'ControlPanel',
  components: {
    Autocomplete,
    vSelect
    // Datepicker
  },

  data: function () {
    return {
      options: [],
      // options: [
      //   {
      //     label: 'А3 (42 х 29,7 см) - 990 рублей',
      //     value: 698881
      //   },
      //   {
      //     label: 'A2 (59,5 х 42 см) - 1490 рублей',
      //     value: 898880
      //   },
      //   {
      //     label: 'А3 с черной рамкой - 1990 рублей',
      //     value: 714217
      //   },
      //   {
      //     label: 'А3 с белой рамкой - 1990 рублей',
      //     value: 714229
      //   },
      //   {
      //     label: 'A2 с черной рамкой - 2590 рублей',
      //     value: 714218
      //   },
      //   {
      //     label: 'A2 с белой рамкой - 2590 рублей',
      //     value: 714228
      //   }
      // ],
      showDate: false,
      address: '',
      place_name: '',
      size: '',
      image: '',
      design: '',
      shape: '',
      styles: null,
      config: '',
      // date: '',
      text1: 'В этот день звезды решили за нас',
      text2: 'я знаю, что такое любовь, благодаря тебе',
      text3: 'Россия, Москва'
    }
  },
  props: ['datetime'],
  mounted () {
    // this.size = this.options[0].value
    this.styles = Apiservice.getStyles()
    this.apiBorders = Apiservice.getBorders()
    this.apiSizes = Apiservice.getSizes()
    this.prices = Apiservice.getPrices()
    console.log(this.prices)
    const newArr = this.prices.map(({size, border, price}) => {
      return `${this.sizes[size]['name']} + ${this.borders[border]['name']} рамка - ${price}`
    })

    this.options = newArr
  },
  computed: {
    borders () {
      return this.getParamsById(this.apiBorders)
    },
    sizes () {
      return this.getParamsById(this.apiSizes)
    }
  },
  watch: {
    design (val) {
      this.$emit('changeDesign', this.design)
    },
    shape (val) {
      this.$emit('changeShape', this.shape)
    },
    text1 () {
      this.textToParent()
    },
    text2 () {
      this.textToParent()
    },
    text3 () {
      this.textToParent()
    },
    date (val) {
      console.log('ttt')
      this.$emit('changeDate', this.date)
    },
    showDate (val) {
      this.$emit('toggleShowDate', val)
    }
  },
  methods: {
    setShape (e) {
      if (this.shape !== '') {
        this.shape = ''
      } else {
        this.shape = e.srcElement.value
      }
    },
    getParamsById (paramsArray) {
      const params = {}
      paramsArray.forEach(param => {
        params[param.id] = param
      })
      return params
    },
    endpoint (input) {
      return (
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        input +
        '.json?types=place&language=ru&access_token=pk.eyJ1IjoibWFrc2ltOTg5IiwiYSI6ImNqeDY0OXZrbzA4Nnk0ZHF1bG9ybmxvNGsifQ.-OcDOS1w1vyn8poaNOtsDg'
      )
    },
    formattedDisplay (result) {
      return result.place_name
    },
    addDistributionGroup ({selectedObject: {place_name, center, ...rest}}) {
      this.place_name = place_name
      this.address = center
      this.text3 = rest.text
      this.$emit('updateLocation', [this.address[0], this.address[1]])
    },
    getAddressData (addressData, placeResultData, id) {
      this.address = addressData
    },
    // setDate (date) {
    //   console.log('a')
    //   this.date = date
    //   this.$emit('updateDate', date)
    // },
    textToParent () {
      const {text1, text2, text3} = this
      this.$emit('inputChange', {text1, text2, text3})
    },
    b64toBlob (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      const byteCharacters = atob(b64Data)
      let byteArrays = []

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
      }

      return new Blob(byteArrays, {type: contentType})
    },
    sendData () {
      console.log('sending axios')
      const ImageURL = window.Celestial.context.canvas.toDataURL('image/png')

      const block = ImageURL.split(';')
      const contentType = block[0].split(':')[1]
      const realData = block[1].split(',')[1]

      const blob = this.b64toBlob(realData, contentType)

      const formData = new FormData()
      formData.append('design', this.design)
      formData.append('place_name', this.place_name)
      formData.append('date', this.datetime)
      formData.append('size', this.size)
      formData.append('text1', this.text1)
      formData.append('text2', this.text2)
      formData.append('text3', this.text3)
      formData.append('img', blob)

      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      AjaxService.makePostRequest(`starmap`, formData, headers)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
<style>
#control-panel {
  text-align: left;
  width: 45%;
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
/* preview */
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
.product-page_variants .input_wrap:after {
    display: block;
    clear: both;
    content: '';
    height: 1px;
}
.product-page_variants label {
    margin-right: 15px !important;
}
.product-page_variants label {
    text-align: center;
}
.product-page_variants label {
    float: left;
    margin: 15px 20px 0 0;
    cursor: pointer;
}
.product-page_variants label:first-child {
    margin-left: 0;
}

.product-page_variants label input {
    display: none;
}
.product-page_variants label span {
    display: block;
    width: 48px;
    height: 48px;
    border: 1px solid #e6e6e6;
}
.product-page_variants label img {
    /* width: auto !important; */
    /* height: auto !important; */
    max-width: 48px;
    max-height: 48px;
}
.product-page_variants label img {
    width: 100%;
    height: 100%;
}
.product-page_variants label input:checked + span {
    border: 4px solid #f26522;
    width: 42px;
    height: 42px;
}
/* city */
.product-page_variants_block {
  margin-top: 30px;
}
.date-wrap .product-page_variants_block {
    margin-top: 0;
}
.date-wrap {
  margin-top: 30px;
}
.date-wrap label {
  margin: 7px 0px;
  display: block;
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
.input-group {
  display: flex;
}
.input-group > * {
    flex: 1;
}
.input-group > * {
    margin-right: 10px;
}

.input-group input[type=text],
.input-group input[type=number],
.input-group select {
    border: 0;
    border-bottom: 2px solid #28345A;
    padding: 5px;
    background: transparent;
    margin-top: 15px;
    height: 28px;
}
.input-group .size-2 {
    flex: 2;
}
.input-group .size-3 {
    flex: 3.5;
}
.input-group > .spacer {
    flex: 0;
    padding-top: 5px;
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
  border-radius: 4px;
  font: 16px/24px "proxima-nova",Arial,sans-serif;
  height: 34px;
  color: #333;
  padding: 0 0 0 5px;
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

.autocomplete__inputs input {
  height: 34px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
}

/* Form */

#celestial-form input#lat, label[for="lat"], input#lon,
#celestial-form input + span,
input#here, input#day-left, input#day-right, input#now,
label[for="datetime"], label[for="horizon-show"], input#horizon-show,
label[for="planets-show"], input#planets-show,
input[title="datetime-hide"] {
  display: none !important;
}

#error {
  position:absolute;
  min-width:100px;
  height:auto;
  padding: 2px 4px;
  color:#f00;
  background:#fff;
  border:2px solid #f00;
  border-radius:3px;
  font-weight:normal;
  display:block;
  top:-9999px;
  left:-9999px;
  opacity:0;
  transition:opacity 1s linear;
}

/* What parts to show */
#celestial-form #general,
#celestial-form #location,
#celestial-form #stars,
#celestial-form #dsos,
#celestial-form #constellations,
#celestial-form #lines,
#celestial-form #other { display: block }

#celestial-form input { vertical-align: 0px; }
#celestial-form input[type='number'] { width:48px; height:18px; text-align:right; padding:0; }
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button { height: auto; }
#celestial-form #centerx, #celestial-form #centery, #celestial-form #centerz,
#celestial-form #lat, #celestial-form #lon { width:64px; margin-top:4px; }
#celestial-form input[type='text'] { width:194px; height:18px; text-align:left; padding-left:2px; }
#celestial-form input[type='checkbox'] { vertical-align: -2px; }
#celestial-form input[type='color'] { width:48px; vertical-align: -3px; height:22px;  background:#fff; }
#celestial-form #datepick {
  position:relative;
  display:inline-block;
  top:7px;
  left:-31px;
  width:28px;
  height:24px;
  border:0px none;
  border-left:1px solid #ccc;
  background-color: #f7f7f7;
  background-image: url('../assets/dtpick.png');
  background-position: -45px 1px;
  cursor:default;
}
#celestial-form #datepick.active { background-position: -69px 1px; }
#celestial-form #datetime { cursor:default; }
#celestial-form input#now { position:relative; left:-24px; }
#celestial-form #constellation { }
#celestial-form #constellation option { color:#000; }
#celestial-form #constellation option[value=''] { color:#ccc; }

#celestial-form .loc { width: 100%; }
#celestial-form input[type='button'] { width:64px; padding-bottom:1px; margin-top:4px; float:right; background: #f7f7f7; }
#celestial-form input#fullwidth { width:108px; }
#celestial-form input#width { margin-left:2px; }
#celestial-form input#now,
#celestial-form input#here  { width:48px; margin-left:2px; float:none; }
#celestial-form input[type='button']:hover,
#celestial-form #datepick:hover { background-color:#eee; }

#celestial-form input[type='text']:disabled,
#celestial-form input[type='number']:disabled,
#celestial-form input[type='color']:disabled { border: 1px solid #ccc; background:#eee }

#celestial-form input[type='text'],
#celestial-form input[type='number'],
#celestial-form input[type='color'],
/* #celestial-form select,  */
#celestial-form input#now,
#celestial-form input#here,
#celestial-form input#show,
#celestial-form input#fullwidth {
  border: 1px solid #cccccc;
  border-radius:4px;
  color: #333; font-size: 16px;
  width: 90%;
  padding-left: 5px;
  height:34px;
}
#celestial-form #location {
  width: 100%;
}
#celestial-form label { margin:0 4px 0 8px; }
#celestial-form label.header { font-weight:bold; }
#celestial-form input + span { margin:0 4px 0 2px; }
#celestial-form label:first-child,
#celestial-form br + label { margin-left:0; }

#celestial-date { position:absolute; top:-9999px; width:193px; text-align:center; border:1px solid #000;
background:#fff;
/* opacity:0;
transition:.6s ease-in opacity; */
font: 13px/1 sans-serif; }
#celestial-date input, #celestial-date select { font:inherit; }
#celestial-date #yr, #celestial-date #mon { margin: 2px 3px; vertical-align:middle; }
#celestial-date #left, #celestial-date #right { display:inline-block; width:12px; height:24px; margin:0; vertical-align:-8px; cursor:pointer;  background-image: url('../assets/dtpick.png'); }
#celestial-form #day-left, #celestial-form #day-right { display:inline-block; float:none; width:12px; height:24px; margin:0; padding:0; vertical-align:middle; cursor:pointer; border: 0 none; background-color:transparent; background-image: url('../assets/dtpick.png'); }
#celestial-form #day-right { position:relative; left:-30px; }
#celestial-date #left, #celestial-form #day-left { background-position: -8px 0px; }
#celestial-date #right, #celestial-form #day-right { background-position: -30px 0px; }
#celestial-date #hr, #celestial-date #min, #celestial-date #sec { margin: 0 0 2px 0; width:34px; }
#celestial-date #hr { border-right: 0px none; border-radius: 3px 0 0 3px;  }
#celestial-date #min { border-right: 0px none; border-left: 0px none;  border-radius: 0; }
#celestial-date #sec { border-left: 0px none;  border-radius: 0 3px 3px 0; }
/* #celestial-date #tz { margin: 0 0 2px 4px; } */
#celestial-date #tz { display: none; }
#celestial-date #cal { display:inline-block; width:182px; margin:0 4px;  }
#celestial-date .date { display:inline-block; width:19px; height:14px; border:1px solid #fff; color:#000; font-weight: bold; text-align:right; vertical-align:middle; padding:2px 4px 2px 0; cursor:pointer; }
#celestial-date .grey { color:#ccc; }
#celestial-date .weekday { color:#666; font-size:11px; background:#eee; border:1px solid #eee; }
#celestial-date .weekend { color:#f00; }
#celestial-date .selected { border:1px solid #000; border-radius:3px; }
#celestial-date .today { background:#ff0; }
</style>
