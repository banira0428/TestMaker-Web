import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: false,
    test: {}
  },
  mutations: {
    onUserStatusChanged(state, status) {
      state.status = status; //ログインしてるかどうか true or false
    },
    setTest(state, test) {
      state.test = test;
    }
  },
  getters: {
    isSignedIn(state) {
      return state.status;
    },
    getTest(state) {
      return state.test;
    }
  },
  actions: {}
})
