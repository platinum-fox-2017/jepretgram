// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import Spinner from 'vue-simple-spinner'

Vue.component('spinner', Spinner)
let host = 'http://localhost:3000'
if (location.hostname !== 'localhost') {
  host = 'http://jepretgram-api.geekosta.com'
}
Vue.prototype.$http = axios.create({baseURL: host})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
