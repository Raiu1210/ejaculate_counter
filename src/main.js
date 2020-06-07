import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import router from './router'
import firebase from 'firebase'
import vuetify from './plugins/vuetify';
import VueSocialSharing from 'vue-social-sharing'

Vue.use(Vuex)
Vue.use(VueSocialSharing);
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyD7oaq3U6DCMFye6xKMX50LjkSZcs-_62I",
  authDomain: "ejaculate-counter.firebaseapp.com",
  databaseURL: "https://ejaculate-counter.firebaseio.com",
  projectId: "ejaculate-counter",
  storageBucket: "ejaculate-counter.appspot.com",
  messagingSenderId: "893228925485",
  appId: "1:893228925485:web:982cd67a683dfc7efc2ea4",
  measurementId: "G-JZNSX6FKB9"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)


const store = new Vuex.Store({
  strict: false,
  state: {
    login: false,
    user: null
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
