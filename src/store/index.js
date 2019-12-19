import Vue from "vue";
import Vuex from "vuex";

// import example from './module-example'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: {
    // apiUrl: "http://127.0.0.1:8000/api",
    // imageHost: "http://127.0.0.1:8000/storage",
    apiUrl: 'https://api.homegift.tk/api',
    imageHost: 'https://api.homegift.tk/storage',
    orders: [],
    newOrderCount: 0,
    locations: [],
    merchants: [],
    categories: [],
    items: [],
    provinces: [],
    lang: "zh-hans"
  },
  mutations: {
    setOrders(state, payload) {
      // mutate state
      state.orders = payload;
    },
    newOrderCountIncrement(state) {
      state.newOrderCount++;
    },
    resetNewOrderCount(state) {
      state.newOrderCount = 0;
    },
    setLocations(state, payload) {
      state.locations = payload;
    },
    setMerchants(state, payload) {
      state.merchants = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
    setItems(state, payload) {
      state.items = payload;
    },
    setProvinces(state, payload) {
      state.provinces = payload;
    },
    setLanguage(state, payload) {
      state.lang = payload;
    }
  },
  actions: {
    setOrders(context, payload) {
      context.commit("setOrders", payload);
    },
    newOrderCountIncrement(context) {
      context.commit("newOrderCountIncrement");
    },
    resetNewOrderCount(context) {
      context.commit("resetNewOrderCount");
    },
    setLocations(context, payload) {
      context.commit("setLocations", payload);
    },
    setMerchants(context, payload) {
      context.commit("setMerchants", payload);
    },
    setCategories(context, payload) {
      context.commit("setCategories", payload);
    },
    setItems(context, payload) {
      context.commit("setItems", payload);
    },
    setProvinces(context, payload) {
      context.commit("setProvinces", payload);
    },
    setLanguage(context, payload) {
      context.commit("setLanguage", payload);
    }
  },
  modules: {
    // example
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
});
