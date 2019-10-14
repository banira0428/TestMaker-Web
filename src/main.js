import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

let config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  user = user ? user : {};
  store.commit('onUserStatusChanged', !!user.uid);
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
