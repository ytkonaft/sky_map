<template>
  <div class="container-wrp">
    <Canvas
      :placeText="preview.placeText"
      :mainText="preview.mainText"
      :secondaryText="preview.secondaryText"
      :date="preview.date"
      :printSize="preview.printSize"
      :design="preview.design"
      :wasSet="wasSet"
      :center="center"
      :textMap="textMap"
      :hideDate="preview.hideDate"
      @setDate="updateDate"
    />
    <ControlPanel
      :apiData="apiData"
      :printSizes="printSizes"
      :previewData="preview"
      @designChanged="updateDesign"
      @placenameChanged="updatePlaceText"
      @locationChanged="updateLocation"
      @printSizeChanged="updatePrintSize"
      @hideDateChanged="updateHideDate"
      @placeTextChanged="updatePlaceText"
      @mainTextChanged="updateMainText"
      @secondaryTextChanged="updateSecondaryText"
      @formSubmitted="submitForm"
      :uploading="fetching"
    />
  </div>
</template>

<script>
import Canvas from "./Canvas";
import ControlPanel from "./ControlPanel";
import ParamsMixin from "../mixins/ParamsMixin";
import SkyApiService from "../services/SkyApiService";
import domtoimage from "dom-to-image";

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
      fetching: false,
      printSizes: [],
      wasSet: false,
      shape: null,
      center: [-150, 0],

      textMap: [
        { id: "place_string", props: "placeText" },
        { id: "main_text_string", props: "mainText" },
        { id: "secondary_text_string", props: "secondaryText" },
        { id: "date_string", props: "date" }
      ],

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
    },
    getTextData() {
      const accum = {};
      this.textMap.forEach(({ id, props }) => {
        const node = document.getElementById(id);
        accum[id] = {
          id: id,
          text: this.preview[props],
          x: node.getAttribute("x"),
          y: node.getAttribute("y"),
        };
      });
      return accum;
    },

    submitForm() {
      this.fetching = true;
      this.sendData();
    },

    async sendData() {
      const textData = this.getTextData();
      const stars = await this.createImg();
      const starsData = this.getImageRealData(stars);

      this.fetching = false;

      let formData = new FormData();
      formData.append("stars", starsData);
      formData.append("text_data", JSON.stringify(textData));
      formData.append("preview", JSON.stringify(this.preview));

      SkyApiService.generate(formData).then(response => {
         console.log(response);
      });
    },

    getImageRealData(imageURL) {
      const block = imageURL.split(";");
      const contentType = block[0].split(":")[1];
      const realData = block[1].split(",")[1];

      return realData;
    },

    async createImg() {
      const node = document.querySelector("#celestial-map canvas");

      return await domtoimage.toPng(node, {
        width: 3000,
        height: 3000
      }).then(function(dataUrl) {
        return dataUrl;
      })
    }
  }
};
</script>
