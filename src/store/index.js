import Vue from "vue";
import Vuex from "vuex";
import { LocalStorage } from "quasar";
import axios from "axios";

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
    searchedItems: null,
    trashedItems: null,
    provinces: [],
    lang: "zh-hans",
    showTrash: false,
    aCategories: [],
    bCategories: [],
    associationsAB: [],
    associationsBC: [],
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setAssociationsAB(state, payload) {
      state.associationsAB = payload;
    },
    setAssociationsBC(state, payload) {
      state.associationsBC = payload;
    },
    setACategories(state, payload) {
      state.aCategories = payload;
    },
    setBCategories(state, payload) {
      state.bCategories = payload;
    },
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
    setUser(context, payload) {
      context.commit("setUser", payload);
      try {
        if (payload) LocalStorage.set("user", payload);
        else LocalStorage.remove("user");
      } catch (e) {
        console.log(e);
      }
      if (payload)
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + payload.api_token;
    },
    setAssociationsAB(context, payload) {
      context.commit("setAssociationsAB", payload);
    },
    setAssociationsBC(context, payload) {
      context.commit("setAssociationsBC", payload);
    },
    setACategories(context, payload) {
      context.commit("setACategories", payload);
    },
    setBCategories(context, payload) {
      context.commit("setBCategories", payload);
    },
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
