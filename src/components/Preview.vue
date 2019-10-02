<template>
  <div id="preview" :class="previewClass" ref="prev">
    <div id="celestial-map" ref="wrapper">

    </div>
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
    <div class="map-container2" id="stencil" v-html="stencil"></div>
  </div>
</template>

<script>
// let Celestial = require('d3-celestial/celestial.js')
let Celestial = require("../libs/celestial.js");
// let geo = require('d3-celestial/lib/d3.geo.projection')

import ApiService from "../services/ApiService";

export default {
  name: "Preview",
  props: ["data", "location", "printSize", "design", "showDate", "date", "place", "main_text", "secondary_text"],

  data: function() {
    return {
      image: "",
      wasSet: false,

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
    };
  },

  watch: {
    location(newVal, oldVal) {
      this.config.center = newVal;
      this.updateCenter(newVal);
    },
    showDate(newVal, oldVal) {
      this.showDate = newVal
      console.log(this.showDate)
    },
    date(newVal, oldVal) {
      this.date = newVal
      document.getElementById("date_string").innerHTML = newVal
      console.log(this.date)
    },
    place(newVal, oldVal) {
      this.place = newVal
      document.getElementById("place_string").innerHTML = newVal
      console.log(this.place)
    },
    main_text(newVal, oldVal) {
      this.main_text = newVal
      document.getElementById("main_text_string").innerHTML = newVal
      console.log(this.main_text)
    },
    secondary_text(newVal, oldVal) {
      this.secondary_text = newVal
      document.getElementById("secondary_text_string").innerHTML = newVal
      console.log(this.secondary_text)
    },


    design(newVal, oldVal) {
      this.design = newVal
      this.wasSet = true

      this.drawSky();
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
      let styles = ApiService.getStyles()

      if (this.design.stencil == styles[0].stencil){
        //одинаковые
        console.log(this.design.stencil)
        console.log(styles[0].stencil)
      }

      return !this.wasSet ? styles[0].stencil : this.design.stencil
      //return this.design.stencil
    }
  },

  destroyed() {
    window.removeEventListener("resize", this.setBounds);
  },

  mounted() {
    //this.drawSky();
  },

  methods: {
    setBounds() {
      const prevRec = this.$refs.prev.getBoundingClientRect();
      const shape = document.getElementById("figure");
      console.log(shape)

      const rec = shape.getBoundingClientRect();
      const cx = shape.getAttribute("cx");
      const r = shape.getAttribute("r");

      console.log(shape.getBoundingClientRect());

      this.$refs.wrapper.style.top = `${rec.top - prevRec.top}px`;
      this.$refs.wrapper.style.left = `${rec.left - prevRec.left}px`;
      this.$refs.wrapper.style.width = `${rec.width}px`;
    },

    updateDesign(val) {
      this.design = val;
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

      let baseScale

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