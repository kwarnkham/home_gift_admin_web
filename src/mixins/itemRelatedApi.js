import axios from "axios";
import store from "../store/index";

export const itemRelatedApi = {
    created() {
        // console.log(store.state.apiUrl);
    },
    methods: {
        async addItem(name, price, description, notice, weight, location, merchant, categories, images) {
            this.$q.loading.show();
            await axios({
                method: "post",
                url: `${store.state.apiUrl}/item`,
                data: {
                    name: name,
                    price: price,
                    description: description,
                    location_id: location.id,
                    merchant_id: merchant.id,
                    weight: weight,
                    notice: notice
                }
            })
                .then(async response => {
                    this.$q.loading.hide();
                    // console.log(response.data)
                    if (response.data.code == '0') {
                        await this.addCategoriesToItem(response.data.result.item.id, categories)
                        await this.addImagesToItem(response.data.result.item.id, images)
                        await this.getItems()
                    }
                    if (response.data.code == '1') {
                        this.$q.notify({
                            message: response.data.msg,
                            closeBtn: 'Close'
                        })
                    }
                })
                .catch(error => console.log(error));
        },

        async addCategoriesToItem(itemId, categories) {
            this.$q.loading.show();
            await categories.forEach(category => {
                axios({
                    method: 'post',
                    url: `${store.state.apiUrl}/item/${itemId}/${category.id}`,
                }).then(response => {
                    this.$q.loading.hide();
                    // console.log(response.data.result)
                    if (response.data.code == '1') {
                        this.$q.notify({
                            message: response.data.msg,
                            closeBtn: 'Close'
                        })
                    }
                }).catch(error => console.log(error));
            })
        },

        async addImagesToItem(itemId, files) {
            this.$q.loading.show();
            let formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                let file = files[i];

                formData.append('files[' + i + ']', file);
            }
            formData.set('item_id', itemId)
            await axios({
                method: "post",
                url: `${store.state.apiUrl}/image`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            }).then(response => {
                this.$q.loading.hide();
                // console.log(response.data)
            }).catch(error => console.log(error))
        },

        async getItems(itemId, files) {
            this.$q.loading.show();
            await axios({
                method: "get",
                url: `${store.state.apiUrl}/items`,
            }).then(response => {
                this.$q.loading.hide();
                store.dispatch('setItems', response.data.result.items)
                // console.log(response.data)
            }).catch(error => console.log(error))
        },

        async updateItem(item) {
            var result = null
            this.$q.loading.show();
            await axios({
                method: "put",
                url: `${store.state.apiUrl}/item/${item.id}`,
                data: {
                    name: item.name,
                    price: item.price,
                    description: item.description,
                    notice: item.notice,
                    weight: item.weight,
                    merchant_id: item.merchant.id,
                    location_id: item.location.id
                }
            }).then(response => {
                this.$q.loading.hide();
                if (response.data.code == '0') {
                    result = response
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
                // console.log(response.data)
            }).catch(error => console.log(error))
            return result
        },

        async updateCategory(item) {
            var result = {}
            let categories = []
            item.categories.forEach(category => {
                categories.push(category.id)
            })
            this.$q.loading.show();
            await axios({
                method: 'put',
                url: `${store.state.apiUrl}/item/${item.id}/categories`,
                data: {
                    categories: categories
                }
            }).then(response => {
                this.$q.loading.hide();
                result = response
            }).catch(error => console.log(error))
            return result
        },

        async deleteImage(imageId) {
            var result = null
            this.$q.loading.show()
            await axios({
                method: 'delete',
                url: `${store.state.apiUrl}/image/${imageId}`,
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code == '0') {
                    result = response
                }
            })
            return result;
        }
    }
}
