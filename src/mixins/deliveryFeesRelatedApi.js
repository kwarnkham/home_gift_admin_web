export const deliveryFeesRelatedApi = {
  methods: {
    async getDeliveryFees() {
      this.$q.loading.show();
      let result;
      await this.$axios({
        method: "get",
        url: `${this.$store.state.apiUrl}/delivery-fees`
      }).then(response => {
        this.$q.loading.hide();
        result = response;
      });
      return result;
    },

    async getAllDeliveryFees() {
      this.$q.loading.show();
      let result;
      await this.$axios({
        method: "get",
        url: `${this.$store.state.apiUrl}/all-delivery-fees`
      }).then(response => {
        this.$q.loading.hide();
        result = response;
      });
      return result;
    },

    async updateDeliveryFees(id) {
      this.$q.loading.show();
      let result;
      await this.$axios({
        method: "put",
        url: `${this.$store.state.apiUrl}/delivery-fees`,
        data: {
          id: id
        }
      }).then(response => {
        this.$q.loading.hide();
        result = response;
      });
      return result;
    }
  }
};
