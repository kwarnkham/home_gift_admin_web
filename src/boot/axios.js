import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

Vue.prototype.$axios = axios;
