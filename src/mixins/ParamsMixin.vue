<script>
  export default {
    computed: {
      borders() {
        return this.getParamsById(this.apiData.borders);
      },
      sizes() {
        return this.getParamsById(this.apiData.sizes);
      }
    },

    methods: {
      getParamsById(paramsArray) {
        const params = {};
        paramsArray.forEach(param => {
          params[param.id] = param;
        });
        return params;
      },

      getSizesList(prices, sizes, borders) {
        return prices.map(({ size, border, price }) => {

          const sizeName = sizes[size]["name"];
          const name = `${sizeName} + ${borders[border]["name"]} рамка - ${price}`;

          return {
            name,
            size: sizeName
          }
        })
      }

    }
  }
</script>