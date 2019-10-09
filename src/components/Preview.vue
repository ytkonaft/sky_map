<template>
  <div class="container">
    <Canvas
      :placeText="preview.placeText"
      :mainText="preview.mainText"
      :secondaryText="preview.secondaryText"
      :date="preview.date"
      :printSize="preview.printSize"
      :design="preview.design"
      :wasSet="wasSet"
      :center="center"
      :hideDate="preview.hideDate"
      @setDate="updateDate"
    />
    <ControlPanel
      :apiData="apiData"
      :printSizes="printSizes"
      :previewData="preview"
      @designChanged="updateDesign"
      @locationChanged="updateLocation"
      @printSizeChanged="updatePrintSize"
      @hideDateChanged="updateHideDate"
      @placeTextChanged="updatePlaceText"
      @mainTextChanged="updateMainText"
      @secondaryTextChanged="updateSecondaryText"
    />
  </div>
</template>

<script>
import Canvas from "./Canvas";
import ControlPanel from "./ControlPanel";
// import SkyShape from "./SkyShape";
import ParamsMixin from "../mixins/ParamsMixin";

import ApiService from "../services/ApiService";

export default {
  name: "Preview",
  components: {
    ControlPanel,
    Canvas
  },
  mixins: [ParamsMixin],
  props: ["apiData"],

  data: function() {
    return {
      printSizes: [],
      wasSet: false,
      shape: null,
      center: [-150, 0],
      preview: {
        design: null,
        printSize: null,

        location: null,
        hideDate: false,
        date: "",

        placeText: "Россия, Москва",
        mainText: "В этот день звезды решили за нас",
        secondaryText: "я знаю, что такое любовь, благодаря тебе"
      }
    };
  },

  created() {
    this.preview.design = this.apiData.styles[0];

    let prices = this.apiData.prices;

    this.printSizes = this.getSizesList(prices, this.sizes, this.borders);
    this.preview.printSize = this.printSizes[0];
  },

  methods: {
    updateDesign(value) {
      this.wasSet = true;
      this.preview.design = value;
    },
    updateDate(val) {
      console.log(val);
      this.preview.date = val;
    },
    updateLocation(value) {
      this.center = value;
    },
    updatePrintSize(value) {
      this.preview.printSize = value;
    },

    updateHideDate(value) {
      this.preview.hideDate = value;
    },
    updatePlaceText(value) {
      this.preview.placeText = value;
    },
    updateMainText(value) {
      this.preview.mainText = value;
    },
    updateSecondaryText(value) {
      this.preview.secondaryText = value;
    }
  }
};
</script>
