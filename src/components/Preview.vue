<template>
  <div class="container">
    <div id="preview" :class="previewClass" ref="prev">
      <div id="celestial-map" ref="wrapper" />
      <img :src="image" class="preview-img" />
      <div id="stencil" v-html="stencil" ref="svgwrap"></div>
      <img
        v-if="preview.design && preview.design.sprite"
        :src="preview.design.sprite"
        class="sprite"
      />
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
let Celestial = require("../libs/celestial.js");
// let geo = require('d3-celestial/lib/d3.geo.projection')

import ControlPanel from "./ControlPanel";
import SkyShape from "./SkyShape";
import ParamsMixin from "../mixins/ParamsMixin";

import ApiService from "../services/ApiService";

export default {
  name: "Preview",
  components: {
    ControlPanel,
    SkyShape
  },
  mixins: [ParamsMixin],
  props: ["apiData"],

  data: function() {
    return {
      image: "",
      printSizes: [],
      wasSet: false,
      shape: null,

      preview: {
        design: null,
        printSize: null,

        location: null,
        hideDate: false,
        date: "",

        placeText: "Россия, Москва",
        mainText: "В этот день звезды решили за нас",
        secondaryText: "я знаю, что такое любовь, благодаря тебе"
      },

      config: {
        width: 3000,
        location: true,
        interactive: false,
        controls: false,
        projection: "patterson",
        transform: "equatorial",
        center: [-150, 0],
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
            show: false
          },
          ecliptic: {
            show: false
          },
          galactic: {
            show: false
          },
          supergalactic: {
            show: false
          }
        }
      }
    };
  },

  created() {
    this.preview.design = this.apiData.styles[0];

    let prices = this.apiData.prices;

    this.printSizes = this.getSizesList(prices, this.sizes, this.borders);
    this.preview.printSize = this.printSizes[0];
  },

  mounted() {
    this.drawSky();
    this.setBounds();
    this.alignTextCenter();
  },

  watch: {
    "preview.placeText": function(newVal, oldVal) {
      this.updateTextNode("place_string", newVal);
    },
    "preview.mainText": function(newVal, oldVal) {
      this.updateTextNode("main_text_string", newVal);
    },
    "preview.secondaryText": function(newVal, oldVal) {
      this.updateTextNode("secondary_text_string", newVal);
    },
    "preview.hideDate": function(newVal, oldVal) {
      let line = newVal ? "" : this.preview.date;
      this.updateTextNode("date_string", line);
    }
  },
  updated() {
    this.setBounds();
    this.alignTextCenter();
    console.log(this.preview.design);
  },
  computed: {
    viewBoxArr() {
      const swgWrp = this.$refs.svgwrap;
      if (!swgWrp) return;
      const svgNode = swgWrp.querySelector("svg");
      const viewBox = svgNode.getAttribute("viewBox");
      return viewBox.split(" ").map(str => {
        return parseFloat(str);
      });
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
    },

    stencilShape() {
      const doc = new DOMParser().parseFromString(this.stencil, "text/html");
      return doc.getElementById("figure").outerHTML;
    }
  },

  destroyed() {
    window.removeEventListener("resize", this.setBounds);
  },

  methods: {
    updateTextNode(id, newVal) {
      const node = document.getElementById(id);
      node.innerHTML = newVal;
    },

    alignTextCenter() {
      const textNodesArr = [
        "place_string",
        "main_text_string",
        "secondary_text_string",
        "date_string"
      ];
      textNodesArr.forEach(id => this.textNodesToStandart(id));
    },

    textNodesToStandart(id) {
      const node = document.getElementById(id);
      if (!node) return;
      const transformVal = node.getAttribute("transform");
      if (transformVal.includes("matrix")) {
        const matrixArr = transformVal.split(" ");
        if (parseFloat(matrixArr[4]) > 0) {
          matrixArr[4] = 0;
          const newMatrix = matrixArr.join(" ");
          node.setAttribute("transform", newMatrix);
        }
      }
      node.setAttribute("x", this.viewBoxArr[2] / 2);
    },

    updateDesign(value) {
      this.wasSet = true;
      this.preview.design = value;
    },

    updateLocation(value) {
      this.config.center = value;
      this.rotateSky(value);
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

    setBounds() {
      const prevRec = this.$refs.prev.getBoundingClientRect();
      const shape = document.getElementById("figure");
      const rec = shape.getBoundingClientRect();
      const bottom = prevRec.height - (rec.top - prevRec.top + rec.height);
      this.$refs.wrapper.style.bottom = `${bottom}px`;
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
      window.addEventListener("resize", this.setBounds);
    }
  }
};
</script>

<style lang="scss">
.a3-print-size {
  transform: scale(0.8);
}
#preview {
  position: relative;
  z-index: 2;
}
#preview svg text {
  position: relative;
  z-index: 5;
}
.sprite {
  position: absolute;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 1;
}

#celestial-map {
  display: block;
  height: auto !important;
  width: 80%;
  margin: 0;
  // border-radius: 50%;
  overflow: hidden;
  // background: #000;
  // border: 2px solid #fff;
  position: absolute;
  z-index: 0;

  &.heart {
    border: none;
    border-radius: 0;
  }
}
#stencil {
  z-index: 2;
  #figure {
    opacity: 0;
  }
}
#celestial-map {
  transform: scale(1.02);
  canvas {
    width: 100%;
    height: auto;
  }
}

#canvas {
  svg {
    display: none;
  }
}

#preview {
  // background-color: #333;
  overflow: hidden;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: top;
  background-repeat: no-repeat;
  width: 49%;
  flex-direction: column;
  #celestial-map {
    background: linear-gradient(120deg, #000 0%, #000 100%);
  }
  &.rose {
    background: #fff;
    #celestial-map {
      background: linear-gradient(
        120deg,
        rgba(56, 16, 116, 1) 0%,
        rgba(225, 151, 191, 1) 100%
      );
    }
    #labels {
      color: #000;
    }
  }
}
</style>