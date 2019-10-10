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
      @formSubmitted="submitedForm"
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
          x: node.getAttribute("x")
        };
      });
      return accum;
    },
    submitedForm() {
      this.fetching = true;
      this.sendData();
    },
    async sendData() {
      const textData = this.getTextData();
      const image = await this.createImg();
      console.log(textData);
      console.log(image);
      this.fetching = false;
      // formData.append("stars", imageURL);
      // formData.append("preview", JSON.stringify(this.preview));

      // SkyApiService.generate(formData).then(response => {
      //   console.log(response);
      // });
    },

    getImageRealData() {
      const imageURL = window.Celestial.context.canvas.toDataURL("image/png");
      const block = imageURL.split(";");
      const contentType = block[0].split(":")[1];
      const realData = block[1].split(",")[1];

      return realData;
    },
    async createImg() {
      const node = document.querySelector("#celestial-map canvas");

      const blob = await domtoimage.toBlob(node, {
        width: 3000,
        height: 3000
      });
      const objectURL = URL.createObjectURL(blob);

      return {
        objectURL,
        blob
      };
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
