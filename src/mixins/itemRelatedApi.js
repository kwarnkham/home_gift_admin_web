import axios from "axios";
import store from "../store/index";

export const itemRelatedApi = {
  created() {
    // console.log(store.state.apiUrl);
  },
  methods: {
    async addItem(itemInfo) {
      this.$q.loading.show();
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/item`,
        data: itemInfo,
      })
        .then(async (response) => {
          this.$q.loading.hide();
          // console.log(response.data)
          if (response.data.code == "0") {
            await this.addCategoriesToItem(
              response.data.result.item.id,
              itemInfo.categories
            );
            await this.addImagesToItem(
              response.data.result.item.id,
              itemInfo.images
            );
            await this.getItems();
          }
          if (response.data.code == "1") {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close",
            });
          }
        })
        .catch((error) => console.log(error));
    },

    async addCategoriesToItem(itemId, categories) {
      this.$q.loading.show();
      await categories.forEach((category) => {
        axios({
          method: "post",
          url: `${store.state.apiUrl}/item/${itemId}/${category.id}`,
        })
          .then((response) => {
            this.$q.loading.hide();
            // console.log(response.data.result)
            if (response.data.code == "1") {
              this.$q.notify({
                message: response.data.msg,
                closeBtn: "Close",
              });
            }
          })
          .catch((error) => console.log(error));
      });
    },

    async getSingleItem(itemId) {
      let result = null;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/item/${itemId}`,
      })
        .then((response) => {
          this.$q.loading.hide();
          // console.log(response.data.result)
          if (response.data.code == "0") {
            result = response;
          }
          if (response.data.code == "1") {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close",
            });
          }
        })
        .catch((error) => console.log(error));

      return result;
    },

    async addImagesToItem(itemId, files) {
      this.$q.loading.show();
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];

        formData.append("files[" + i + "]", file);
      }
      formData.set("item_id", itemId);
      await axios({
        method: "post",
        url: `${store.state.apiUrl}/image`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
        .then((response) => {
          this.$q.loading.hide();
          // console.log(response.data)
        })
        .catch((error) => console.log(error));
    },
    async getTrashedItems(page = 1, perPage = this.$store.state.itemPerPage) {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/items/trashed`,
        params: {
          page: page,
          per_page: perPage,
        },
      })
        .then((response) => {
          this.$q.loading.hide();
          result = response.data.result.items;
          // console.log(response.data)
        })
        .catch((error) => console.log(error));
      return result;
    },

    async findItemByName(
      name,
      trashed = false,
      page = 1,
      perPage = this.$store.state.itemPerPage
    ) {
      let result = null;
      if (name) {
        await axios({
          method: "get",
          url: `${store.state.apiUrl}/items/find/name/${name}`,
          params: {
            trashed: trashed,
            page: page,
            per_page: perPage,
          },
        })
          .then((response) => {
            if (response.data.code == "0") {
              result = response;
            } else {
              this.$q.notify({
                message: response.data.msg,
                closeBtn: "Close",
              });
            }
          })
          .catch((error) => console.log(error));
      }
      return result;
    },

    async findItemByMerchant(
      merchantId,
      trashed = false,
      page = 1,
      perPage = this.$store.state.itemPerPage
    ) {
      let result = null;

      await axios({
        method: "get",
        url: `${store.state.apiUrl}/items/find/merchant/${merchantId}`,
        params: {
          trashed: trashed,
          page: page,
          per_page: perPage,
        },
      })
        .then((response) => {
          if (response.data.code == "0") {
            result = response.data.result.items;
          } else {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close",
            });
          }
        })
        .catch((error) => console.log(error));

      return result;
    },

    async getItems(page = 1, perPage = this.$store.state.itemPerPage) {
      let result;
      this.$q.loading.show();
      await axios({
        method: "get",
        url: `${store.state.apiUrl}/items`,
        params: {
          page: page,
          per_page: perPage,
        },
      })
        .then((response) => {
          this.$q.loading.hide();

          // console.log(response.data);
          result = response;
        })
        .catch((error) => console.log(error));
      return result;
    },

    async updateItem(item) {
      var result = null;
      this.$q.loading.show();
      await axios({
        method: "put",
        url: `${store.state.apiUrl}/item/${item.id}`,
        data: {
          name: item.name,
          ch_name: item.ch_name,
          mm_name: item.mm_name,
          price: item.price,
          description: item.description,
          ch_description: item.ch_description,
          mm_description: item.mm_description,
          notice: item.notice,
          ch_notice: item.ch_notice,
          mm_notice: item.mm_notice,
          weight: item.weight,
          merchant_id: item.merchant.id,
          location_id: item.location.id,
        },
      })
        .then((response) => {
          this.$q.loading.hide();
          if (response.data.code == "0") {
            result = response;
          }
          if (response.data.code == "1") {
            this.$q.notify({
              message: response.data.msg,
              closeBtn: "Close",
            });
          }
          // console.log(response.data)
        })
        .catch((error) => console.log(error));
      return result;
    },

    async updateCategory(item) {
      var result = {};
      let categories = [];
      item.categories.forEach((category) => {
        categories.push(category.id);
      });
      this.$q.loading.show();
      await axios({
        method: "put",
        url: `${store.state.apiUrl}/item/${item.id}/categories`,
        data: {
          categories: categories,
        },
      })
        .then((response) => {
          this.$q.loading.hide();
          result = response;
        })
        .catch((error) => console.log(error));
      return result;
    },

    async deleteImage(imageId) {
      var result = null;
      this.$q.loading.show();
      await axios({
        method: "delete",
        url: `${store.state.apiUrl}/image/${imageId}`,
      }).then((response) => {
        this.$q.loading.hide();
        if (response.data.code == "0") {
          result = response;
        }
      });
      return result;
    },

    async deleteItem(id) {
      let result = null;
      if (id) {
        await axios({
          method: "delete",
          url: `${store.state.apiUrl}/item/${id}`,
        })
          .then((response) => (result = response))
          .catch((error) => console.log(error));
      }

      return result;
    },

    async unDeleteItem(id) {
      let result = null;
      if (id) {
        await axios({
          method: "patch",
          url: `${store.state.apiUrl}/item/${id}`,
        })
          .then((response) => (result = response))
          .catch((error) => console.log(error));
        return result;
      }
    },
  },
};
