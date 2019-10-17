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
                        await this.addCategoriesToItem(response.data.result.id, categories)
                        await this.addImagesToItem(response.data.result.id, images)
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
                store.dispatch('setItems', response.data.result)
                // console.log(response.data)
            }).catch(error => console.log(error))
        },
    }
}
