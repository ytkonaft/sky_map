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
      @placenameChanged="updatePlaceText"
      @locationChanged="updateLocation"
      @printSizeChanged="updatePrintSize"
      @hideDateChanged="updateHideDate"
      @placeTextChanged="updatePlaceText"
      @mainTextChanged="updateMainText"
      @secondaryTextChanged="updateSecondaryText"
      @formSubmitted="sendData"
    />
  </div>
</template>

<script>
import Canvas from "./Canvas";
import ControlPanel from "./ControlPanel";
import ParamsMixin from "../mixins/ParamsMixin";

import SkyApiService from "../services/SkyApiService";

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


    sendData() {
      let formData = new FormData(),
        imageURL = this.getImageRealData()

      formData.append("stars", imageURL)
      formData.append("preview", JSON.stringify(this.preview))

      SkyApiService.generate(formData).then(response => {
        console.log(response)
      });
    },

    getImageRealData() {
      const imageURL = window.Celestial.context.canvas.toDataURL("image/png")
      const block = imageURL.split(";")
      const contentType = block[0].split(":")[1]
      const realData = block[1].split(",")[1]

      return realData
    },

    b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || "";
      sliceSize = sliceSize || 512;

      const byteCharacters = atob(b64Data);
      let byteArrays = [];

      for (
        var offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    }


  }
};
</script>
