<template>
  <div id="control-panel">
    <h1 class="product-page_title" itemprop="name">Карта звездного неба</h1>

    <div class="product-page_variants">
      <div class="product-page_variants_block other">
        <div class="name design">Выберите дизайн</div>
        <div class="input_wrap">
          <label v-for="style in styles" :key="style.name" :title="style.name">
            <!-- /////////////// WTF here ??????????????? -->
            <input
              type="radio"
              name="color"
              :value="style.id"
              :checked="style.id===design.id"
              @click="setDesign(style)"
              v-model="design"
            />
            <!-- /////////////// -->
            <span>
              <img :src="style.picture" alt />
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
          :source="getLocations"
          results-property="features"
          :results-formatter="formattedResult"
          :results-display="formattedDisplay"
          @selected="setDistributionGroup"
        ></autocomplete>
      </div>
    </div>

    <div class="product-page_variants">
      <div class="product-page_variants_block other">
        <div class="name" style="margin-bottom: 15px;">Выберите размер</div>
        <v-select :options="printSizes" label="name" v-model="previewData.printSize"></v-select>
      </div>
    </div>

    <div class="date-wrap">
      <div class="product-page_variants">
        <div class="product-page_variants_block other">
          <div class="name">Выберите дату события</div>
          <div id="celestial-form">
            <input type="text" title="datetime-hide" id="datetime1" />
          </div>
        </div>
      </div>
      <label>
        <input id="date_check" type="checkbox" name="date_check" v-model="previewData.hideDate" />
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
                    v-model="previewData.mainText"
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
                    v-model="previewData.secondaryText"
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
                  <label for="pers_input3">Впишите место</label>:
                </div>
                <div class="art-field-value">
                  <input
                    v-model="previewData.placeText"
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
      <button class="product-generate_btn" @click="submitForm" :disabled="!!uploading">Создать карту</button>
      <button class="js-btn_add product-page_in-cart_notactive">
        <span></span>
        <p>В корзину</p>
      </button>
    </div>
  </div>
</template>
<script>
import Autocomplete from "vuejs-auto-complete";
// import Datepicker from 'vuejs-datepicker'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import MapboxService from '../services/MapboxService'

export default {
  name: "ControlPanel",
  components: {
    Autocomplete,
    vSelect
  },

  props: ["apiData", "previewData", "printSizes", "uploading"],

  data: function() {
    return {
      address: "",
      place_name: "",
      place: "",

      image: "",
      design: "",
      shape: "",
      styles: null
    };
  },

  mounted() {
    this.styles = this.apiData.styles;
    this.design = this.styles[0];
  },

  computed: {},

  watch: {
    "previewData.printSize": function(newVal, oldVal) {
      this.$emit("printSizeChanged", newVal);
    },
    "previewData.hideDate": function(newVal, oldVal) {
      this.$emit("hideDateChanged", newVal);
    },
    "previewData.placeText": function(newVal, oldVal) {
      this.$emit("placeTextChanged", newVal);
    },
    "previewData.mainText": function(newVal, oldVal) {
      this.$emit("mainTextChanged", newVal);
    },
    "previewData.secondaryText": function(newVal, oldVal) {
      this.$emit("secondaryTextChanged", newVal);
    }
  },

  methods: {
    setDesign(value) {
      this.$emit("designChanged", value);
    },

    setDistributionGroup({ selectedObject: { place_name, center, ...rest } }) {
      this.place_name = place_name;
      this.address = center;
      this.place = rest.text;

      this.$emit("placenameChanged", this.place_name);
      this.$emit("locationChanged", [this.address[0], this.address[1]]);
    },

    submitForm() {
      this.$emit("formSubmitted");
    },

    getLocations(input) {
      return MapboxService.collectUrl(input);
    },

    formattedResult(data) {
      let cities = []
      data.features.forEach(function(item) {
        if (JSON.stringify(item.place_type) == JSON.stringify(['place'])) {
          cities.push(item)
        }
      });

      return cities;
    },

    formattedDisplay(city) {
      //return city.place_name
      return `${city.text_ru}, ${city.context[1].text_ru}`
    },

    getAddressData(addressData, placeResultData, id) {
      this.address = addressData;
    }
  }
};
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
  content: "";
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
  /* border: 1px solid #e6e6e6;*/
}
.product-page_variants label img {
  /* width: auto !important; */
  height: auto !important;
  max-width: 48px;
}
.product-page_variants label img {
  width: 100%;
  height: 100%;
}
.product-page_variants label input:checked + span {
  border: 4px solid #f26522;
  width: 42px;
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
  font: 12px/24px "proxima-nova", Arial, sans-serif;
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

.input-group input[type="text"],
.input-group input[type="number"],
.input-group select {
  border: 0;
  border-bottom: 2px solid #28345a;
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
  font: 16px/24px "proxima-nova", Arial, sans-serif;
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
.product-generate_btn:disabled {
  opacity: 0.3;
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

#celestial-form input#lat,
label[for="lat"],
input#lon,
#celestial-form input + span,
input#here,
input#day-left,
input#day-right,
input#now,
label[for="datetime"],
label[for="horizon-show"],
input#horizon-show,
label[for="planets-show"],
input#planets-show,
input[title="datetime-hide"] {
  display: none !important;
}

#error {
  position: absolute;
  min-width: 100px;
  height: auto;
  padding: 2px 4px;
  color: #f00;
  background: #fff;
  border: 2px solid #f00;
  border-radius: 3px;
  font-weight: normal;
  display: block;
  top: -9999px;
  left: -9999px;
  opacity: 0;
  transition: opacity 1s linear;
}

/* What parts to show */
#celestial-form #general,
#celestial-form #location,
#celestial-form #stars,
#celestial-form #dsos,
#celestial-form #constellations,
#celestial-form #lines,
#celestial-form #other {
  display: block;
}

#celestial-form input {
  vertical-align: 0px;
}
#celestial-form input[type="number"] {
  width: 48px;
  height: 18px;
  text-align: right;
  padding: 0;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  height: auto;
}
#celestial-form #centerx,
#celestial-form #centery,
#celestial-form #centerz,
#celestial-form #lat,
#celestial-form #lon {
  width: 64px;
  margin-top: 4px;
}
#celestial-form input[type="text"] {
  width: 194px;
  height: 18px;
  text-align: left;
  padding-left: 2px;
}
#celestial-form input[type="checkbox"] {
  vertical-align: -2px;
}
#celestial-form input[type="color"] {
  width: 48px;
  vertical-align: -3px;
  height: 22px;
  background: #fff;
}
#celestial-form #datepick {
  position: relative;
  display: inline-block;
  top: 7px;
  left: -31px;
  width: 28px;
  height: 24px;
  border: 0px none;
  border-left: 1px solid #ccc;
  background-color: #f7f7f7;
  background-image: url("../assets/dtpick.png");
  background-position: -45px 1px;
  cursor: default;
}
#celestial-form #datepick.active {
  background-position: -69px 1px;
}
#celestial-form #datetime {
  cursor: default;
}
#celestial-form input#now {
  position: relative;
  left: -24px;
}
#celestial-form #constellation {
}
#celestial-form #constellation option {
  color: #000;
}
#celestial-form #constellation option[value=""] {
  color: #ccc;
}

#celestial-form .loc {
  width: 100%;
}
#celestial-form input[type="button"] {
  width: 64px;
  padding-bottom: 1px;
  margin-top: 4px;
  float: right;
  background: #f7f7f7;
}
#celestial-form input#fullwidth {
  width: 108px;
}
#celestial-form input#width {
  margin-left: 2px;
}
#celestial-form input#now,
#celestial-form input#here {
  width: 48px;
  margin-left: 2px;
  float: none;
}
#celestial-form input[type="button"]:hover,
#celestial-form #datepick:hover {
  background-color: #eee;
}

#celestial-form input[type="text"]:disabled,
#celestial-form input[type="number"]:disabled,
#celestial-form input[type="color"]:disabled {
  border: 1px solid #ccc;
  background: #eee;
}

#celestial-form input[type='text'],
#celestial-form input[type='number'],
#celestial-form input[type='color'],
/* #celestial-form select,  */
#celestial-form input#now,
#celestial-form input#here,
#celestial-form input#show,
#celestial-form input#fullwidth {
  border: 1px solid #cccccc;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  width: 90%;
  padding-left: 5px;
  height: 34px;
}
#celestial-form #location {
  width: 100%;
}
#celestial-form label {
  margin: 0 4px 0 8px;
}
#celestial-form label.header {
  font-weight: bold;
}
#celestial-form input + span {
  margin: 0 4px 0 2px;
}
#celestial-form label:first-child,
#celestial-form br + label {
  margin-left: 0;
}

#celestial-date {
  position: absolute;
  top: -9999px;
  width: 193px;
  text-align: center;
  border: 1px solid #000;
  background: #fff;
  /* opacity:0;
transition:.6s ease-in opacity; */
  font: 13px/1 sans-serif;
}
#celestial-date input,
#celestial-date select {
  font: inherit;
}
#celestial-date #yr,
#celestial-date #mon {
  margin: 2px 3px;
  vertical-align: middle;
}
#celestial-date #left,
#celestial-date #right {
  display: inline-block;
  width: 12px;
  height: 24px;
  margin: 0;
  vertical-align: -8px;
  cursor: pointer;
  background-image: url("../assets/dtpick.png");
}
#celestial-form #day-left,
#celestial-form #day-right {
  display: inline-block;
  float: none;
  width: 12px;
  height: 24px;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  cursor: pointer;
  border: 0 none;
  background-color: transparent;
  background-image: url("../assets/dtpick.png");
}
#celestial-form #day-right {
  position: relative;
  left: -30px;
}
#celestial-date #left,
#celestial-form #day-left {
  background-position: -8px 0px;
}
#celestial-date #right,
#celestial-form #day-right {
  background-position: -30px 0px;
}
#celestial-date #hr,
#celestial-date #min,
#celestial-date #sec {
  margin: 0 0 2px 0;
  width: 34px;
}
#celestial-date #hr {
  border-right: 0px none;
  border-radius: 3px 0 0 3px;
}
#celestial-date #min {
  border-right: 0px none;
  border-left: 0px none;
  border-radius: 0;
}
#celestial-date #sec {
  border-left: 0px none;
  border-radius: 0 3px 3px 0;
}
/* #celestial-date #tz { margin: 0 0 2px 4px; } */
#celestial-date #tz {
  display: none;
}
#celestial-date #cal {
  display: inline-block;
  width: 182px;
  margin: 0 4px;
}
#celestial-date .date {
  display: inline-block;
  width: 19px;
  height: 14px;
  border: 1px solid #fff;
  color: #000;
  font-weight: bold;
  text-align: right;
  vertical-align: middle;
  padding: 2px 4px 2px 0;
  cursor: pointer;
}
#celestial-date .grey {
  color: #ccc;
}
#celestial-date .weekday {
  color: #666;
  font-size: 11px;
  background: #eee;
  border: 1px solid #eee;
}
#celestial-date .weekend {
  color: #f00;
}
#celestial-date .selected {
  border: 1px solid #000;
  border-radius: 3px;
}
#celestial-date .today {
  background: #ff0;
}
</style>
