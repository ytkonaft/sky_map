<template>
  <div id="control-panel">
    <h1 class="product-page_title" itemprop="name">
      Карта звездного неба /
      <span class="js-color_name">Blue ocean</span>
    </h1>

    <div class="product-page_variants">
      <div class="product-page_variants_block other">
        <div class="name design">Выберите дизайн</div>
        <div class="input_wrap">
          <label title="Blue ocean">
            <input type="radio" name="color" value="698879" v-model="design">
            <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/723/48_48_1/72309c4e74f2e7b8b4bf43a5df0276d0.jpg" alt=""></span>
          </label>
          <label title="Clear white">
            <input type="radio" name="color" value="699304" v-model="design">
            <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/eae/48_48_1/eae40136a8405b518cf4f4c10e5926ad.jpg" alt=""></span>
          </label>
          <label title="Rose galaxy">
              <input type="radio" name="color" value="699305" checked="" v-model="design">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/f18/48_48_1/f1828454e76ba46cac8d46d83ba8536c.jpg" alt=""></span>
          </label>
          <label title="Black&amp;white">
              <input type="radio" name="color" value="699308" v-model="design">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/5b7/48_48_1/5b7bdceff4286fa516d75d12b6dc9c00.jpg" alt=""></span>
          </label>
          <label title="Navy blue">
              <input type="radio" name="color" value="699307" v-model="design">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/065/48_48_1/065b8e65dbe238652028a94193d13174.jpg" alt=""></span>
          </label>
          <label title="Black">
              <input type="radio" name="color" value="698878" v-model="design">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/bbe/48_48_1/bbed694a5050a87c96215ba31c9b0f78.jpg" alt=""></span>
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
        <div class="product-page_variants_block other">
          <div class="name">Выберите дату события</div>

          <div id="celestial-form">
            <input type="text" title="datetime-hide" id="datetime1" value="2019-09-05 08:51:49 +0300" ref="datetime">
          </div>
          
          <!-- <datepicker :value="date" :language="ru" @selected="setDate"></datepicker> -->  
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
                  <input
                    v-model="text1"
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
                    value
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

    <div style="display:none;">
      <div class="col" id="location" style="display: inline-block;">
        <label title="Location coordinates long/lat" for="lat">Location</label>
        <input
          type="number"
          id="lat"
          title="Latitude"
          placeholder="Latitude"
          max="90"
          min="-90"
          step="0.0001"
          value="0"
        />
        <span>°</span>
        <input
          type="number"
          id="lon"
          title="Longitude"
          placeholder="Longitude"
          max="180"
          min="-180"
          step="0.0001"
          value="0"
        />
        <span>°</span>
        <input type="button" value="Here" id="here" />
        <label title="Local date/time" for="datetime">Date/time</label>
        <input type="button" id="day-left" title="One day back" />
        <input type="text" id="datetime" title="Date and time" value="2019-09-04 09:44:06 +0300" />
        <div id="datepick"></div>
        <input type="button" id="day-right" title="One day forward" />
        <input type="button" value="Now" id="now" />
        <br />
        <label
          title="Show horizon marker"
          for="horizon-show"
          style="color: rgb(153, 153, 153);"
        >Horizon marker</label>
        <input type="checkbox" id="horizon-show" disabled />
        <label title="Show solar system objects" for="planets-show">Planets, Sun &amp; Moon</label>
        <input type="checkbox" id="planets-show" />
      </div>
    </div>
    <div id="celestial-date" style="display:none">
      <div id="left"></div>
      <select title="Month" id="mon">
        <option value="0">January</option>
        <option value="1">February</option>
        <option value="2">March</option>
        <option value="3">April</option>
        <option value="4">May</option>
        <option value="5">June</option>
        <option value="6">July</option>
        <option value="7">August</option>
        <option value="8">September</option>
        <option value="9">October</option>
        <option value="10">November</option>
        <option value="11">December</option>
      </select>
      <select title="Year" id="yr">
        <option>2009</option>
        <option>2010</option>
        <option>2011</option>
        <option>2012</option>
        <option>2013</option>
        <option>2014</option>
        <option>2015</option>
        <option>2016</option>
        <option>2017</option>
        <option>2018</option>
        <option>2019</option>
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
        <option>2026</option>
        <option>2027</option>
        <option>2028</option>
        <option>2029</option>
      </select>
      <div id="right"></div>
      <div id="cal">
        <div class="date weekday">Su</div>
        <div class="date weekday">M</div>
        <div class="date weekday">Tu</div>
        <div class="date weekday">W</div>
        <div class="date weekday">Th</div>
        <div class="date weekday">F</div>
        <div class="date weekday">Sa</div>
        <div class="date weekend" id="2019-09-01">1</div>
        <div class="date" id="2019-09-02">2</div>
        <div class="date" id="2019-09-03">3</div>
        <div class="date today selected" id="2019-09-04">4</div>
        <div class="date" id="2019-09-05">5</div>
        <div class="date" id="2019-09-06">6</div>
        <div class="date weekend" id="2019-09-07">7</div>
        <div class="date weekend" id="2019-09-08">8</div>
        <div class="date" id="2019-09-09">9</div>
        <div class="date" id="2019-09-10">10</div>
        <div class="date" id="2019-09-11">11</div>
        <div class="date" id="2019-09-12">12</div>
        <div class="date" id="2019-09-13">13</div>
        <div class="date weekend" id="2019-09-14">14</div>
        <div class="date weekend" id="2019-09-15">15</div>
        <div class="date" id="2019-09-16">16</div>
        <div class="date" id="2019-09-17">17</div>
        <div class="date" id="2019-09-18">18</div>
        <div class="date" id="2019-09-19">19</div>
        <div class="date" id="2019-09-20">20</div>
        <div class="date weekend" id="2019-09-21">21</div>
        <div class="date weekend" id="2019-09-22">22</div>
        <div class="date" id="2019-09-23">23</div>
        <div class="date" id="2019-09-24">24</div>
        <div class="date" id="2019-09-25">25</div>
        <div class="date" id="2019-09-26">26</div>
        <div class="date" id="2019-09-27">27</div>
        <div class="date weekend" id="2019-09-28">28</div>
        <div class="date weekend" id="2019-09-29">29</div>
        <div class="date" id="2019-09-30">30</div>
        <div class="date grey" id="2019-10-01">1</div>
        <div class="date grey" id="2019-10-02">2</div>
        <div class="date grey" id="2019-10-03">3</div>
        <div class="date grey" id="2019-10-04">4</div>
        <div class="date grey" id="2019-10-05">5</div>
        <div class="date grey" id="2019-10-06">6</div>
        <div class="date grey" id="2019-10-07">7</div>
        <div class="date grey" id="2019-10-08">8</div>
        <div class="date grey" id="2019-10-09">9</div>
        <div class="date grey" id="2019-10-10">10</div>
        <div class="date grey" id="2019-10-11">11</div>
        <div class="date grey" id="2019-10-12">12</div>
      </div>
      <input type="number" id="hr" title="Hours" max="24" min="-1" step="1" value="9" />
      <input type="number" id="min" title="Minutes" max="60" min="-1" step="1" value="44" />
      <input type="number" id="sec" title="Seconds" max="60" min="-1" step="1" value="6" />
      <select title="Time zone offset from UTC" id="tz">
        <option value="720">−12:00</option>
        <option value="660">−11:00</option>
        <option value="600">−10:00</option>
        <option value="570">−09:30</option>
        <option value="540">−09:00</option>
        <option value="480">−08:00</option>
        <option value="420">−07:00</option>
        <option value="360">−06:00</option>
        <option value="300">−05:00</option>
        <option value="270">−04:30</option>
        <option value="240">−04:00</option>
        <option value="210">−03:30</option>
        <option value="180">−03:00</option>
        <option value="120">−02:00</option>
        <option value="60">−01:00</option>
        <option value="0">±00:00</option>
        <option value="-60">+01:00</option>
        <option value="-120">+02:00</option>
        <option value="-180">+03:00</option>
        <option value="-210">+03:30</option>
        <option value="-240">+04:00</option>
        <option value="-270">+04:30</option>
        <option value="-300">+05:00</option>
        <option value="-330">+05:30</option>
        <option value="-345">+05:45</option>
        <option value="-360">+06:00</option>
        <option value="-390">+06:30</option>
        <option value="-420">+07:00</option>
        <option value="-480">+08:00</option>
        <option value="-510">+08:30</option>
        <option value="-525">+08:45</option>
        <option value="-540">+09:00</option>
        <option value="-570">+09:30</option>
        <option value="-600">+10:00</option>
        <option value="-630">+10:30</option>
        <option value="-660">+11:00</option>
        <option value="-720">+12:00</option>
        <option value="-765">+12:45</option>
        <option value="-780">+13:00</option>
        <option value="-840">+14:00</option>
      </select>
    </div>

  </div>
</template>
<script>
import Autocomplete from 'vuejs-auto-complete'
// import Datepicker from 'vuejs-datepicker'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import axios from 'axios'

export default {
  name: 'ControlPanel',
  components: {
    Autocomplete,
    vSelect
    // Datepicker
  },

  data: function () {
    return {
      options: [
        {
          label: 'А3 (42 х 29,7 см) - 990 рублей',
          value: 698881
        },
        {
          label: 'A2 (59,5 х 42 см) - 1490 рублей',
          value: 898880
        },
        {
          label: 'А3 с черной рамкой - 1990 рублей',
          value: 714217
        },
        {
          label: 'А3 с белой рамкой - 1990 рублей',
          value: 714229
        },
        {
          label: 'A2 с черной рамкой - 2590 рублей',
          value: 714218
        },
        {
          label: 'A2 с белой рамкой - 2590 рублей',
          value: 714228
        }
      ],
      address: '',
      place_name: '',
      size: '',
      image: '',
      design: '',
      config: '',
      date: '',
      text1: '',
      text2: '',
      text3: ''
    }
  },
  mounted() {
    this.size = this.options[0].value
  },
  methods: {
    endpoint (input) {
      return (
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        input +
        '.json?access_token=pk.eyJ1IjoibWFrc2ltOTg5IiwiYSI6ImNqeDY0OXZrbzA4Nnk0ZHF1bG9ybmxvNGsifQ.-OcDOS1w1vyn8poaNOtsDg'
      )
    },
    formattedDisplay (result) {
      return result.place_name
    },
    addDistributionGroup (group) {
      console.log(group.selectedObject)
      this.place_name = group.selectedObject.place_name
      this.address = group.selectedObject.center
      this.$emit('updateLocation', [this.address[0], this.address[1]])
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = addressData
      console.log(this.address)
    },
    setDate: function (date) {
      this.date = date
      this.$emit('updateDate', date)
    },
    b64toBlob (b64Data, contentType, sliceSize) {
      contentType = contentType || ''
      sliceSize = sliceSize || 512

      var byteCharacters = atob(b64Data)
      var byteArrays = []

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize)

          var byteNumbers = new Array(slice.length)
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i)
          }

          var byteArray = new Uint8Array(byteNumbers)

          byteArrays.push(byteArray)
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
    },
    sendData () {
      console.log('sending axios')
      let ImageURL = window.Celestial.context.canvas.toDataURL('image/png')

      let block = ImageURL.split(";")
      let contentType = block[0].split(":")[1]
      let realData = block[1].split(",")[1]

      let blob = this.b64toBlob(realData, contentType);

      let formData = new FormData()
      formData.append('design', this.design)
      formData.append('place_name', this.place_name)
      formData.append('date', this.$refs.datetime.value),
      formData.append('size', this.size)
      formData.append('text1', this.text1)
      formData.append('text2', this.text2)
      formData.append('text3', this.text3)
      formData.append('img', blob)
      axios.post(`http://starsky.loc/api/starmap`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
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

.autocomplete__inputs input {
  height: 24px;
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

#error { position:absolute; min-width:100px; height:auto; padding: 2px 4px; color:#f00; background:#fff; border:2px solid #f00; 
border-radius:3px; font-weight:normal; display:block; top:-9999px; left:-9999px; opacity:0; transition:opacity 1s linear; }

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
#celestial-form select, 
#celestial-form input#now, 
#celestial-form input#here, 
#celestial-form input#show, 
#celestial-form input#fullwidth { border: 1px solid #cccccc; border-radius:3px; height:24px; }

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
#celestial-date #tz { margin: 0 0 2px 4px; }
#celestial-date #cal { display:inline-block; width:182px; margin:0 4px;  }
#celestial-date .date { display:inline-block; width:19px; height:14px; border:1px solid #fff; color:#000; font-weight: bold; text-align:right; vertical-align:middle; padding:2px 4px 2px 0; cursor:pointer; }
#celestial-date .grey { color:#ccc; }
#celestial-date .weekday { color:#666; font-size:11px; background:#eee; border:1px solid #eee; }
#celestial-date .weekend { color:#f00; }
#celestial-date .selected { border:1px solid #000; border-radius:3px; }
#celestial-date .today { background:#ff0; }
</style>
