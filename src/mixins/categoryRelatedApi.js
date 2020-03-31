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
      await axios({
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

    async getBCategories() {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/categories/get-b`
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

    async makeCategoryB(id) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/category/make-b/${id}`
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
      await axios({
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

    async unMakeCategoryB(id) {
      this.$q.loading.show();
      await axios({
        method: "delete",
        url: `${store.state.apiUrl}/b-category/${id}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Success");
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    async getJoinedA(bId) {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/category/joinedA/${bId}`
      }).then(response => {
        this.$q.loading.hide();

        if (response.data.code == "0") {
          result = response.data.result.category;
        }
      });
      return result;
    },

    async getJoinedB(id) {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/category/joinedB/${id}`
      }).then(response => {
        this.$q.loading.hide();

        if (response.data.code == "0") {
          result = response.data.result.category;
        }
      });
      return result;
    },

    async getAB() {
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/category/AB`
      }).then(response => {
        this.$q.loading.hide();

        if (response.data.code == "0") {
          this.$store.dispatch(
            "setAssociationsAB",
            response.data.result.associations
          );
        }
      });
    },

    async getBC() {
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/category/BC`
      }).then(response => {
        this.$q.loading.hide();

        if (response.data.code == "0") {
          this.$store.dispatch(
            "setAssociationsBC",
            response.data.result.associations
          );
        }
      });
    },

    async unJoinAB(bId) {
      this.$q.loading.show();
      await axios({
        method: "delete",
        url: `${store.state.apiUrl}/category/unjoin-ab/${bId}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Deleted");
          this.getAB();
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    async unJoinBC(id) {
      this.$q.loading.show();
      await axios({
        method: "delete",
        url: `${store.state.apiUrl}/category/unjoin-bc/${id}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Deleted");
          this.getBC();
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    async joinAB(aId, bId) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/category/join-ab/${aId}/${bId}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Success");
          this.getAB();
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    async joinBC(bId, id) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/category/join-bc/${bId}/${id}`
      }).then(response => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          this.$q.notify("Success");
          this.getBC();
        } else {
          this.$q.notify("Fail");
        }
      });
    },

    async updateCategory(id, category) {
      this.$q.loading.show();
      await axios({
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
