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
  },
  mutations: {
    setOrders(state, payload) {
      // mutate state
      state.orders = payload
    }
  },
  actions: {
    setOrders(context, payload) {
      context.commit('setOrders', payload)
    }
  },
  modules: {
    // example
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})




