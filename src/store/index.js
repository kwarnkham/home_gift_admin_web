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
    itemPerPage: 6,
    apiUrl: process.env.API_URL,
    imageHost: process.env.IMAGE_HOST,
    orders: [],
    newOrderCount: 0,
    locations: [],
    merchants: [],
    categories: [],
    searchedItems: null,
    trashedItems: null,
    provinces: [],
    lang: "zh-hans",
    showTrash: false
  },
  mutations: {
    setShowTrash(state, payload) {
      state.showTrash = payload;
    },
    setSearchedItems(state, payload) {
      state.searchedItems = payload;
    },
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
    setTrashedItems(state, payload) {
      state.trashedItems = payload;
    },
    setProvinces(state, payload) {
      state.provinces = payload;
    },
    setLanguage(state, payload) {
      state.lang = payload;
    }
  },
  actions: {
    setShowTrash(context, payload) {
      context.commit("setShowTrash", payload);
    },
    setSearchedItems(context, payload) {
      context.commit("setSearchedItems", payload);
    },
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
    setTrashedItems(context, payload) {
      context.commit("setTrashedItems", payload);
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
