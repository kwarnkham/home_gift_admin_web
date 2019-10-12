import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:8000/api',
    orders: [],
    newOrderCount: 0,
    locations: []
  },
  mutations: {
    setOrders(state, payload) {
      // mutate state
      state.orders = payload
    },
    newOrderCountIncrement(state) {
      state.newOrderCount++;
    },
    resetNewOrderCount(state) {
      state.newOrderCount = 0;
    },
    setLocations(state, payload) {
      state.locations = payload;
    }
  },
  actions: {
    setOrders(context, payload) {
      context.commit('setOrders', payload)
    },
    newOrderCountIncrement(context) {
      context.commit('newOrderCountIncrement');
    },
    resetNewOrderCount(context) {
      context.commit('resetNewOrderCount')
    },
    setLocations(context, payload) {
      context.commit('setLocations', payload)
    }
  },
  modules: {
    // example
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})




