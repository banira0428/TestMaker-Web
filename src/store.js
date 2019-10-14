import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        status: false
    },
    mutations: {
        onUserStatusChanged(state, status) {
            state.status = status; //ログインしてるかどうか true or false
        }
    },
    getters: {
        isSignedIn(state) {
            return state.status;
        }
    },
    actions: {

    }
})