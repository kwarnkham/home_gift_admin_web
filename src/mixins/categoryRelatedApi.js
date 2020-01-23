import axios from "axios";
import store from "../store/index";
export const categoryRelatedApi = {
  created() {
    // console.log(store.state.apiUrl);
  },
  methods: {
    async addCategory(name) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/category`,
        data: {
          name: name
        }
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            this.getCategories();
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
    getCategories() {
      this.$q.loading.show();
      axios({
        method: "get",
        url: `${store.state.apiUrl}/categories`
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            store.dispatch("setCategories", response.data.result.categories);
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
    updateCategory(id, name) {
      this.$q.loading.show();
      axios({
        method: "put",
        url: `${store.state.apiUrl}/category`,
        data: {
          id: id,
          name: name
        }
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            this.getCategories();
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
