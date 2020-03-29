import axios from "axios";
import store from "../store/index";
export const categoryRelatedApi = {
  created() {
    // console.log(store.state.apiUrl);
  },
  methods: {
    async addCategory(category) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/category`,
        data: {
          name: category.name,
          chName: category.chName,
          mmName: category.mmName
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
    async getCategories() {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/categories`
      })
        .then(response => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            result = response.data.result.categories;
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
      return result;
    },

    async getACategories() {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/categories/get-a`
      })
        .then(response => {
          this.$q.loading.hide();
          if (response.data.code == "0") {
            result = response.data.result.categories;
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
      return result;
    },

    async makeCategoryA(id) {
      this.$q.loading.show();
      axios({
        method: "put",
        url: `${store.state.apiUrl}/category/make-a/${id}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Success");
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    async unMakeCategoryA(id) {
      this.$q.loading.show();
      axios({
        method: "put",
        url: `${store.state.apiUrl}/category/unmake-a/${id}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Success");
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    updateCategory(id, category) {
      this.$q.loading.show();
      axios({
        method: "put",
        url: `${store.state.apiUrl}/category`,
        data: {
          id: id,
          name: category.name,
          chName: category.chName,
          mmName: category.mmName
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
