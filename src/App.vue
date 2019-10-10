<template>
  <div id="app">
    <Preview :apiData="apiData" />
  </div>
</template>

<script>
import Preview from "./components/Preview";

import SkyApiService from "./services/SkyApiService";

export default {
  name: "App",
  components: {
    Preview
  },

  data: function() {
    return {
      apiData: null
    };
  },

  created() {
    this.apiData = SkyApiService.getData();
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
}

@font-face {
  font-family: "CenturySchlbkCyrillicBT-Bold";
  src: url("./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.eot");
  src: url("./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.eot")
      format("embedded-opentype"),
    url("./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.woff2")
      format("woff2"),
    url("./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.woff")
      format("woff"),
    url("./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.ttf")
      format("truetype"),
    url("./assets/fonts/CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold.svg#CenturySchlbkCyrillicBTBoldCentSchbkCyrillBTBold")
      format("svg");
}

@font-face {
  font-family: "Candara-LightItalic";
  src: url("./assets/fonts/CANDARAI.eot");
  src: url("./assets/fonts/CANDARAI.eot") format("embedded-opentype"),
    url("./assets/fonts/CANDARAI.woff2") format("woff2"),
    url("./assets/fonts/CANDARAI.woff") format("woff"),
    url("./assets/fonts/CANDARAI.ttf") format("truetype"),
    url("./assets/fonts/CANDARAI.svg#CANDARAI") format("svg");
}

@font-face {
  font-family: "Affect-Light";
  src: url("./assets/fonts/AffectLight.eot");
  src: url("./assets/fonts/AffectLight.eot") format("embedded-opentype"),
    url("./assets/fonts/AffectLight.woff2") format("woff2"),
    url("./assets/fonts/AffectLight.woff") format("woff"),
    л url("./assets/fonts/AffectLight.ttf") format("truetype"),
    url("./assets/fonts/AffectLight.svg#AffectLight") format("svg");
}

canvas {
  // visibility: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f0f4fb;
}

.container {
  display: flex;
  flex-direction: row;
  // align-items: center;
  justify-content: space-between;
  max-width: 1140px;
  position: relative;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
}

.preview-img {
  width: 100%;
}

.map-container {
  position: relative;
  @media screen and (min-width: 1040px) {
    min-height: 800px;
  }
  @media screen and (min-width: 970px) and (max-width: 1039px) {
    min-height: 650px;
  }
  @media screen and (min-width: 740px) and (max-width: 969px) {
    min-height: 580px;
  }
  // min-height: 700px;
}
.frame {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 10000;
  position: absolute;
  bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;

  .caption {
    font-family: "CentSchbkCyrill";
    text-align: center;
    color: #fff;
    margin: 0;
    bottom: -2px;
    left: -2px;
    right: -2px;
    width: calc(100% + 4px);
    .country,
    .city {
      font-style: italic;
      font-size: 10px;
      margin-top: 0.5em;
    }
    .country {
      font-family: "CentSchbkCyrillIt", sans-serif;
    }
    .city {
      font-family: "sans";
      margin-top: 2em;
    }
  }
}

@import "./assets/scss/media";
</style>
