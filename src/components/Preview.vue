<template>
  <div id="preview" :class="previewClass" ref="prev">
    <div id="celestial-map" :class="dynamicComponent" ref="wrapper"></div>
    <img :src="image" class="preview-img" />
    <!-- <div class="frame">
      <div id="labels" class="caption">
          <div class="text1">{{ text1 }}</div>
          <br>
          <div class="country">{{ text2 }}</div>
          <div class="city" v-show="!showDate">{{ date }}</div>
          <div class="city">{{ text3 }}</div>
      </div>
    </div>-->
    <div class="map-container2" v-html="preview"></div>
  </div>
</template>

<script>
// let Celestial = require('d3-celestial/celestial.js')
let Celestial = require("../libs/celestial.js");
// let geo = require('d3-celestial/lib/d3.geo.projection')

import ApiService from "../services/ApiService";

export default {
  name: "Preview",
  props: ["data", "location", "printSize"],

  data: function() {
    return {
      text1: "В этот день звезды решили за нас",
      text2: "я знаю, что такое любовь, благодаря тебе",
      text3: "Россия, Москва",
      showDate: false,
      date: "",
      image: "",
      design: "",
      shape: "",

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
          size: 15
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
          linestyle: { stroke: "#999", width: 4.5, opacity: 1 }
        },
        dsos: { show: false },
        mw: { show: false },
        lines: {
          graticule: { show: false },
          equatorial: {
            show: false,
            stroke: "#aaaaaa",
            width: 1.3,
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
    };
  },

  watch: {
    location(newVal, oldVal) {
      this.config.center = newVal;

      this.updateCenter(newVal);
    }
  },

  computed: {
    sizeClass() {
      switch (this.printSize) {
        case "A2":
          return "a2-print-size";
        case "A3":
          return "a3-print-size";
        default:
          return "";
      }
    },
    totalClass() {
      switch (this.design) {
        case "725449":
          return "rose";
        case "725448":
          return "navy";
        default:
          return "";
      }
    },
    previewClass() {
      return [this.sizeClass].join(" ");
    },

    dynamicComponent() {
      switch (this.shape) {
        case "heart":
          return "heart";
        default:
          return "";
      }
    },

    preview() {
      let styles = ApiService.getStyles();
      console.log(styles);
      return styles[1].stencil;
    }
  },

  destroyed() {
    window.removeEventListener("resize", this.setBounds);
  },

  mounted() {
    this.drawSky();
  },

  methods: {
    setBounds() {
      const prevRec = this.$refs.prev.getBoundingClientRect();
      const img = document.getElementById("test");
      const rec = img.getBoundingClientRect();

      const cx = img.getAttribute("cx");
      const r = img.getAttribute("r");

      this.$refs.wrapper.style.top = `${rec.top - prevRec.top}px`;
      this.$refs.wrapper.style.left = `${rec.left - prevRec.left}px`;
      this.$refs.wrapper.style.width = `${rec.width}px`;
    },

    updateDesign(val) {
      this.design = val;
    },

    updateShape(val) {
      this.shape = val;
    },

    updateShowDate(val) {
      console.log(val);
      this.showDate = val;
    },

    updateText(obj) {
      this.text1 = obj.text1;
      this.text2 = obj.text2;
      this.text3 = obj.text3;
    },

    updateCenter(data) {
      window.Celestial.rotate({ center: [data[0], data[1], 0] });
    },

    updateDate(date) {
      console.log("aae");
      console.log(date);
      Celestial.date(date);
      this.config.daterange = date;
    },

    loadSVG() {
      console.log(window.Celestial.container.selectAll());
      // console.log(window.Celestial)
      console.log(this.config.geopos);
      console.log(this.address);
      if (this.address !== "") {
        this.config.geopos = this.address;
        window.Celestial.apply(this.config);
      }

      var image = window.Celestial.context.canvas.toDataURL("image/png");
      console.log(image);
      this.image = image;
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
          this.date = date.toLocaleDateString("ru-RU", options);
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