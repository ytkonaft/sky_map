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
            <input type="radio" name="color" value="698879">
            <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/723/48_48_1/72309c4e74f2e7b8b4bf43a5df0276d0.jpg" alt=""></span>
          </label>
          <label title="Clear white">
            <input type="radio" name="color" value="699304">
            <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/eae/48_48_1/eae40136a8405b518cf4f4c10e5926ad.jpg" alt=""></span>
          </label>
          <label title="Rose galaxy">
              <input type="radio" name="color" value="699305" checked="">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/f18/48_48_1/f1828454e76ba46cac8d46d83ba8536c.jpg" alt=""></span>
          </label>
          <label title="Black&amp;white">
              <input type="radio" name="color" value="699308">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/5b7/48_48_1/5b7bdceff4286fa516d75d12b6dc9c00.jpg" alt=""></span>
          </label>
          <label title="Navy blue">
              <input type="radio" name="color" value="699307">
              <span><img src="https://www.pichshop.ru/upload/resize_cache/iblock/065/48_48_1/065b8e65dbe238652028a94193d13174.jpg" alt=""></span>
          </label>
          <label title="Black">
              <input type="radio" name="color" value="698878">
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
          
          <datepicker :value="date" :language="ru" @selected="setDate"></datepicker>
          <!-- <div class="input-group">
            <input
              id="day"
              size="1"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              placeholder="3"
              class="right-aligned autoselect"
              required
              min="1"
              max="31"
              step="1"
              value="1"
            />
            <select id="month" size="1" class="size-3">
              <option value="January">Январь</option>
              <option value="February">Февраль</option>
              <option value="March">Март</option>
              <option value="April">Апрель</option>
              <option value="May">Май</option>
              <option value="June">Июнь</option>
              <option value="July">Июль</option>
              <option value="August">Август</option>
              <option value="September">Сентябрь</option>
              <option value="October">Октябрь</option>
              <option value="November">Ноябрь</option>
              <option value="December">Декабрь</option>
            </select>
            <input
              id="year"
              pattern="[0-9]*"
              inputmode="numeric"
              size="1"
              type="text"
              placeholder="2019"
              class="size-2 autoselect"
              required
              min="1900"
              max="2100"
              step="1"
              value="2019"
            />
          </div>

          <div class="name">Выберите время</div>
          <div class="input-group">
            <input
              id="hour"
              size="1"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              placeholder="10"
              class="right-aligned autoselect"
              required
              min="0"
              max="23"
              step="1"
              value="0"
            />
            <div class="spacer">:</div>
            <input
              id="minute"
              size="1"
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              placeholder="50"
              class="right-aligned autoselect"
              required
              min="0"
              max="59"
              step="1"
              value="0"
            />
          </div> -->
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
import Datepicker from 'vuejs-datepicker'
import {ru} from 'vuejs-datepicker/dist/locale'
import axios from 'axios'

export default {
  name: 'ControlPanel',
  components: {
    Autocomplete,
    Datepicker
  },

  data: function () {
    return {
      address: '',
      config: '',
      ru: ru,
      date: ''
    }
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
      console.log(group.selectedObject.center)
      this.address = group.selectedObject.center
      this.$emit('updateLocation', [this.address[0], this.address[1]])
    },
    getAddressData: function(addressData, placeResultData, id) {
      this.address = addressData
      console.log(this.address)
    },
    setDate: function (date) {
      this.$emit('updateDate', date)
    },
    sendData () {
      console.log('sending axios')
      let str = {aa: 'bbbb'}
      axios.post(`http://starsky.loc/api/starmap`, str)
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
.product-page_variants label:first-child {
    margin-left: 0;
}
.product-page_variants label {
    float: left;
    margin: 15px 20px 0 0;
    cursor: pointer;
}
.product-page_variants label {
    text-align: center;
}
.product-page_variants label {
    margin-right: 15px !important;
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
</style>
