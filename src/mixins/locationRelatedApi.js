import axios from "axios";
import store from "../store/index";
export const locationRelatedApi = {
    created() {
        // console.log('mixing location api')
    },
    methods: {
        async addLocation(name) {
            this.$q.loading.show();
            await axios({
                method: "post",
                url: `${store.state.apiUrl}/location`,
                data: {
                    name: name
                }
            })
                .then(response => {
                    this.$q.loading.hide();
                    // console.log(response.data)
                    if (response.data.code == '0') {
                        this.getLocations()
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
        getLocations() {
            this.$q.loading.show();
            axios({
                method: "get",
                url: `${store.state.apiUrl}/locations`,
            })
                .then(response => {
                    this.$q.loading.hide();
                    // console.log(response.data)
                    if (response.data.code == '0') {
                        store.dispatch("setLocations", response.data.result.locations);
                    }
                    if (response.data.code == '1') {
                        this.$q.notify({
                            message: response.data.msg,
                            closeBtn: 'Close'
                        })
                    }
                })
                .catch(error => {
                    console.log(error.data);
                });
        },
        updateLocation(id, name) {
            this.$q.loading.show();
            axios({
                method: "put",
                url: `${store.state.apiUrl}/location`,
                data: {
                    id: id,
                    name: name
                }
            })
                .then(response => {
                    this.$q.loading.hide();
                    // console.log(response.data)
                    if (response.data.code == '0') {
                        this.getLocations()
                    }
                    if (response.data.code == '1') {
                        this.$q.notify({
                            message: response.data.msg,
                            closeBtn: 'Close'
                        })
                    }
                })
                .catch(error => {
                    console.log(error.data);
                });
        }
    }
}
