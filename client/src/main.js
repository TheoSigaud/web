// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { io } from "socket.io-client"

const socket = io("ws://localhost:8081")
Vue.prototype.$socket = socket;
socket.on("connect", () => {
  console.log("Connected to the socket")
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
