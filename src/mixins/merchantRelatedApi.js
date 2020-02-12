import axios from "axios";
import store from "../store/index";
export const merchantRelatedApi = {
  created() {
    // console.log(store.state.apiUrl);
  },
  methods: {
    async addMerchant(merchant) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/merchant`,
        data: {
          name: merchant.name,
          chName: merchant.chName,
          mmName: merchant.mmName
        }
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            this.getMerchants();
          }
          if (response.data.code == "1") {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close"
            });
          }
        })
        .catch(error => console.log(error));
    },
    getMerchants() {
      this.$q.loading.show();
      axios({
        method: "get",
        url: `${store.state.apiUrl}/merchants`
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            store.dispatch("setMerchants", response.data.result.merchants);
          }
          if (response.data.code == "1") {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close"
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    },
    updateMerchant(id, merchant) {
      this.$q.loading.show();
      axios({
        method: "put",
        url: `${store.state.apiUrl}/merchant`,
        data: {
          id: id,
          name: merchant.name,
          chName: merchant.chName,
          mmName: merchant.mmName
        }
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            this.getMerchants();
          }
          if (response.data.code == "1") {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close"
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  }
};
