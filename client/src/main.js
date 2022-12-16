// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { io } from "socket.io-client"

const socket = io("ws://localhost:8081")
Vue.prototype.$socket = socket;
// socket.on("connect", () => {
//   console.log("Connected to the socket")
// })
socket.emit('login',{userId:'YourUserID'});
// document.getElementById("host").innerHTML = host;
// document.getElementById("userId").innerHTML = queryParams.userId;

socket.once("connect", () => {
    console.log("Connected to the socket")
    //document.getElementById("connection").innerHTML = "connected";

    // USER IS ONLINE
    socket.on("online", (userId) => {
        console.log(userId, "Is Online!"); // update online status
        //document.getElementById("logs").innerHTML += "<div>" + userId + " Is Online! </div>";
    });

    // USER IS OFFLINE
    socket.on("offline", (userId) => {
        console.log(userId, "Is Offline!"); // update offline status
        //document.getElementById("logs").innerHTML += "<div>" + userId + " Is Offline! </div>";
    });

    // ==== SUPPORTIVES

    socket.on("connect_error", (err) => {
        //document.getElementById("connection").innerHTML = "Connect Error - " + err.message;
        console.log(err.message);
    });
    socket.on("connect_timeout", () => {
        //document.getElementById("connection").innerHTML = "Conection Time Out Please Try Again.";
    });
    socket.on("reconnect", (num) => {
        //document.getElementById("connection").innerHTML = "Reconnected - " + num;
    });
    socket.on("reconnect_attempt", () => {
        //document.getElementById("connection").innerHTML = "Reconnect Attempted.";
    });
    socket.on("reconnecting", (num) => {
        //document.getElementById("connection").innerHTML = "Reconnecting - " + num;
    });
    socket.on("reconnect_error", (err) => {
        //document.getElementById("connection").innerHTML = "Reconnect Error - " + err.message;
    });
    socket.on("reconnect_failed", () => {
        //document.getElementById("connection").innerHTML = "Reconnect Failed";
    });

});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})
