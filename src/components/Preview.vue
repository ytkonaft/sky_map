<template>
  <div class="container">
    <div id="preview" :class="previewClass" ref="prev">
      <div id="celestial-map" ref="wrapper"></div>
      <img :src="image" class="preview-img" />

      <div class="map-container2" id="stencil" v-html="stencil"></div>
    </div>

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
// let Celestial = require('d3-celestial/celestial.js')
let Celestial = require("../libs/celestial.js")
// let geo = require('d3-celestial/lib/d3.geo.projection')

//import { parse } from 'postsvg'
//import render from 'posthtml-render'

import ControlPanel from "./ControlPanel"
import ParamsMixin from "../mixins/ParamsMixin"

import ApiService from "../services/ApiService"

export default {
  name: "Preview",
  components: {
    ControlPanel
  },
  mixins: [ParamsMixin],
  props: [
    "apiData"
  ],

  data: function() {
    return {
      image: "",
      printSizes: [],
      wasSet: false,
      svgStencil: '',

      preview: {
        design: null,
        printSize: null,

        location: null,
        hideDate: false,
        date: '',

        placeText: "Россия, Москва",
        mainText: "В этот день звезды решили за нас",
        secondaryText: "я знаю, что такое любовь, благодаря тебе",
      },

      config: {
        width: 3000,
        location: true,
        interactive: false,
        controls: false,
        projection: "airy",
        transform: "equatorial",
        center: [-150, 0],
        // geopos: [38, 110],
        background: {
          fill: "transparent",
          stroke: "rgba(255,255,255,.6)",
          opacity: 1,
          width: 1
        },
        datapath: "https://ofrohn.github.io/data/",
        container: "celestial-map",
        // follow: 'zenith',
        zoomlevel: null,
        daterange: [],
        stars: {
          colors: false,
          names: false,
          style: { fill: "#fff", opacity: 1 },
          limit: 50,
          size: 25
        },
        constellations: {
          show: true,
          namestyle: {
            fill: "#aaa",
            font: "0 Helvetica, Arial, sans-serif",
            align: "center",
            baseline: "middle",
            opacity: 1
          },
          linestyle: { stroke: "#999", width: 6, opacity: 1 }
        },
        dsos: { show: false },
        mw: { show: false },
        lines: {
          graticule: { show: false },
          equatorial: {
            show: false,
            stroke: "#aaaaaa",
            width: 1.5,
            opacity: 0.7
          },
          ecliptic: {
            show: false,
            stroke: "#66cc66",
            width: 1.3,
            opacity: 0.7
          },
          galactic: {
            show: false,
            stroke: "#cc6666",
            width: 1.3,
            opacity: 0.7
          },
          supergalactic: {
            show: false,
            stroke: "#cc66cc",
            width: 1.3,
            opacity: 0.7
          }
        }
      }
    }
  },

  created() {
    this.preview.design = this.apiData.styles[0]

    let prices = this.apiData.prices

    this.printSizes = this.getSizesList(prices, this.sizes, this.borders)
    this.preview.printSize = this.printSizes[0]
  },

  mounted() {
    this.drawSky();
  },

  watch: {
    'preview.placeText': function (newVal, oldVal){
      this.updateTextNode("place_string", newVal)
    },
    'preview.mainText': function (newVal, oldVal){
      this.updateTextNode("main_text_string", newVal)
    },
    'preview.secondaryText': function (newVal, oldVal){
      this.updateTextNode("secondary_text_string", newVal)
    },
    'preview.hideDate': function (newVal, oldVal){
      let line = newVal ? '' : this.preview.date
      this.updateTextNode("date_string", line)
    },

    /*stencil (newStencil, oldStencil){

      let line = this.preview.hideDate ? '' : this.preview.date
      this.updateTextNode("date_string", line)

      this.updateTextNode("place_string", this.preview.placeText)
      this.updateTextNode("main_text_string", this.preview.mainText)
      this.updateTextNode("secondary_text_string", this.preview.secondaryText)

      this.$forceUpdate()
    }*/
  },

  computed: {
    parsedSvgStencil() {
      return this.svgStencil ? parse(this.svgStencil) : null
    },

    sizeClass() {
      switch (this.preview.printSize.size) {
        case "A2":
          return "a2-print-size";
        case "A3":
          return "a3-print-size";
        default:
          return "";
      }
    },

    totalClass() {
      switch (this.preview.design.id) {
        case "725449":
          return "rose";
        case "725448":
          return "";
        default:
          return "";
      }
    },

    previewClass() {
      return [this.sizeClass, this.totalClass].join(" ");
    },

    stencil() {
      let styles = ApiService.getStyles();
      return !this.wasSet ? styles[0].stencil : this.preview.design.stencil;
    }
  },

  destroyed() {
    window.removeEventListener("resize", this.setBounds);
  },

  methods: {
    updateTextNode(id, newVal) {
      const textNode = document.getElementById(id);
      textNode.innerHTML = newVal;
      this.textAlignCenter(textNode);
    },

    updateDesign(value) {
      this.wasSet = true
      this.preview.design = value
    },

    updateLocation(value) {
      this.config.center = value
      this.rotateSky(value)
    },
    updatePrintSize(value) {
      this.preview.printSize = value
    },

    updateHideDate(value) {
      this.preview.hideDate = value
    },
    updatePlaceText(value) {
      this.preview.placeText = value
    },
    updateMainText(value) {
      this.preview.mainText = value;
    },
    updateSecondaryText(value) {
      this.preview.secondaryText = value
    },

    textAlignCenter(node) {
      //const prevRec = this.$refs.prev.getBoundingClientRect();

      const parentEl = document.getElementById("Слой_1");
      const viewBox = parentEl.getAttribute("viewBox").split(" ");

      const nodeEl = node.getBoundingClientRect();

      const center = this.countCenter(viewBox[2], nodeEl.width);
      console.log(center, 'center');




      const prevRec = parentEl.getBoundingClientRect();
      const nodeRec = node.getBoundingClientRect();
      const transformVal = node.getAttribute("transform");

      if (transformVal.includes("matrix")) {
        const matrixArr = transformVal.split(" ");
        console.log(prevRec.width, nodeRec.width);
        console.log(matrixArr);

        const previewHalf = prevRec.width / 2;
        const nodeHalf = nodeRec.width / 2;

        matrixArr[4] = previewHalf - nodeHalf;

        const newMatrix = matrixArr.join(" ");
        node.setAttribute("transform", newMatrix);
      }

      console.log(prevRec);
      console.log(nodeRec);
    },

    countCenter(parentW, nodeW){
      return  (parentW / 2) - (nodeW / 2);
    },

    setBounds() {
      const prevRec = this.$refs.prev.getBoundingClientRect();
      const shape = document.getElementById("figure");
      // console.log(shape);

      const rec = shape.getBoundingClientRect();
      const cx = shape.getAttribute("cx");
      const r = shape.getAttribute("r");

      // console.log(shape.getBoundingClientRect());

      this.$refs.wrapper.style.top = `${rec.top - prevRec.top}px`;
      this.$refs.wrapper.style.left = `${rec.left - prevRec.left}px`;
      this.$refs.wrapper.style.width = `${rec.width}px`;
    },

    loadSVG() {
      console.log(window.Celestial.container.selectAll());

      if (this.address !== "") {
        this.config.geopos = this.address;
        window.Celestial.apply(this.config);
      }

      var image = window.Celestial.context.canvas.toDataURL("image/png");
      // console.log(image);
      this.image = image;
    },

    rotateSky(location) {
      window.Celestial.rotate({ center: [location[0], location[1], 0] });
    },

    drawSky() {
      // D3-Celestial Properties different from default
      let baseScale;

      let Celestial = window.Celestial;

      Celestial.add({
        file: this.config.datapath + "asterisms.json",
        type: "line",
        callback: (error, json) => {
          if (error) return console.warn(error);

          baseScale = Celestial.mapProjection.scale();

          var ast = Celestial.getData(json, this.config.transform);
          Celestial.redraw();
        },

        timechanged: date => {
          var options = { year: "numeric", month: "long", day: "numeric" };
          this.preview.date = date.toLocaleDateString("ru-RU", options);
        },

        redraw: function() {
          var scale = window.Celestial.mapProjection.scale() / baseScale;
        }
      });

      Celestial.display(this.config);
      let canvasDiv = this.$refs.wrapper.children[0];
      canvasDiv.id = "canvas";

      this.setBounds();
      window.addEventListener("resize", this.setBounds);
    }
  }
};
</script>

<style>
.a3-print-size {
  transform: scale(0.8);
}
</style>