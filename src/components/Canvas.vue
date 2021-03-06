<template>
  <div class="preview-wrp">
    <div id="preview" :class="previewClass" ref="prev">
      <div id="celestial-map" ref="wrapper" />
      <!-- <img :src="image" class="preview-img" /> -->
      <div id="stencil" v-html="stencil" ref="svgwrap"></div>
      <img v-if="design && design.sprite" :src="design.sprite" class="sprite" />
    </div>
  </div>
</template>

<script>
import Celestial from "../libs/celestial";
import ParamsMixin from "../mixins/ParamsMixin";

import SkyApiService from "../services/SkyApiService";

export default {
  name: "sky-canvas",

  mixins: [ParamsMixin],
  props: [
    "placeText",
    "mainText",
    "secondaryText",
    "date",
    "design",
    "printSize",
    "wasSet",
    "hideDate",
    "center",
    "textMap"
  ],

  data() {
    return {
      image: "",
      shape: null,
      preview: {
        location: null
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
          size: 30
        },
        constellations: {
          show: true,
          namestyle: {
            fill: "#fff",
            font: "0 Helvetica, Arial, sans-serif",
            align: "center",
            baseline: "middle",
            opacity: 1
          },
          linestyle: { stroke: "#fff", width: 6, opacity: 0.5 }
        },
        dsos: { show: false },
        mw: {
          show: true,    // Show Milky Way as filled polygons
          style: { fill: "#ffffff", opacity: "0.1" }
        },
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

  watch: {
    placeText(newVal, oldVal) {
      this.setText("place_string", newVal);
    },
    mainText(newVal, oldVal) {
      this.setText("main_text_string", newVal);
    },
    secondaryText(newVal, oldVal) {
      this.setText("secondary_text_string", newVal);
    },
    center(newVal) {
      this.rotateSky(newVal);
      //this.setText(newVal);
    },
    date(newVal, oldVal) {
      let line = this.hideDate ? "" : this.date;
      this.setText("date_string", line);
    },
    hideDate(newVal, oldVal) {
      let line = newVal ? "" : this.date;
      this.setText("date_string", line);
    },
    sizeClass(newVal, oldVal) {
      this.setBounds();
      this.textNodesUpdate();
    }
  },
  updated() {
    this.setBounds();
    this.textNodesUpdate();
  },
  mounted() {
    this.drawSky();
    this.setBounds();
    this.textNodesUpdate();
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
      switch (this.printSize.size) {
        case "A2":
          return "a2-print-size";
        case "A3":
          return "a3-print-size";
        default:
          return "";
      }
    },

    totalClass() {
      switch (this.design.id) {
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
      let styles = SkyApiService.getStyles();
      return !this.wasSet ? styles[0].stencil : this.design.stencil;
    },

    stencilShape() {
      const doc = new DOMParser().parseFromString(this.stencil, "text/html");
      return doc.getElementById("figure").outerHTML;
    }
  },

  methods: {
    setText(id, newVal) {
      const node = document.getElementById(id);

      if (node.innerHTML === newVal) return;
      node.innerHTML = newVal;
    },

    textNodesUpdate(onlyPlace) {
      this.textMap.forEach(({ id, props }) => {
        this.textNodesToStandart(id);
        this.setText(id, this[props]);
      });
    },

    textNodesToStandart(id) {
      const node = document.getElementById(id);
      const currentX = parseFloat(node.getAttribute("x"));
      if (currentX === this.viewBoxArr[2]) return;
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

    setBounds() {
      const prevRec = this.$refs.prev.getBoundingClientRect();
      const shape = document.getElementById("figure");
      const rec = shape.getBoundingClientRect();
      const bottom = prevRec.height - (rec.top - prevRec.top + rec.height);
      this.$refs.wrapper.style.bottom = `${bottom}px`;
      this.$refs.wrapper.style.left = `${rec.left - prevRec.left}px`;
      this.$refs.wrapper.style.width = `${rec.width}px`;
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
          this.$emit("setDate", date.toLocaleDateString("ru-RU", options));
        },

        redraw: () => {
          var scale = window.Celestial.mapProjection.scale() / baseScale;
        }
      });

      Celestial.display(this.config);
      let canvasDiv = this.$refs.wrapper.children[0];
      canvasDiv.id = "canvas";
      window.addEventListener("resize", this.setBounds);
    }
  },
  created() {
    this.config.center = this.center;
  },
  destroyed() {
    window.removeEventListener("resize", this.setBounds);
  }
};
</script>

<style lang="scss">
.a3-print-size {
  // transform: scale(0.8);
  width: 80% !important;
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
.preview-wrp {
  height: 100%;
  display: flex;
  width: 49%;
  justify-content: center;
  align-items: middle;
}
#preview {
  // background-color: #333;
  overflow: hidden;
  display: flex;
  width: 100%;
  background-repeat: no-repeat;
  flex-direction: column;
  #celestial-map canvas {
    background: linear-gradient(120deg, #000 0%, #000 100%);
  }
  &.rose {
    #celestial-map canvas {
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