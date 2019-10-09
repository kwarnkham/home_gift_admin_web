import axios from "axios";
import store from "../store/index";
export const orderRelatedApi = {
    created() {
        // console.log(store.state.apiUrl);
    },
    methods: {
        getOrders() {
            this.$q.loading.show();
            axios({
                method: "get",
                url: `${store.state.apiUrl}/orders`
            })
                .then(response => {
                    this.$q.loading.hide();
                    store.dispatch("setOrders", response.data.result);
                    store.dispatch('resetNewOrderCount')
                })
                .catch(error => console.log(error));
        },
        actOnOrder(id, actionType) {
            this.$q.loading.show();
            axios({
                method: "post",
                url: `${store.state.apiUrl}/order/action/${id}`,
                data: {
                    action: actionType
                }
            })
                .then(response => {
                    this.$q.loading.hide();
                    console.log(response.data)
                    if (response.data.code == '0') {
                        this.getOrders();
                    }
                    if (response.data.code == '1'){
                    this.$q.notify({
                        message:response.data.msg,
                        closeBtn: 'Close'
                    })
                    }
                })
                .catch(error => {
                    console.log(error.body);
                });
        }
    }
}
