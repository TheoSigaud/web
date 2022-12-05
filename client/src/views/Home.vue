<template>
    <div>
      <div class="container vh-100">
        <h1>YOOOO</h1>
        <button class="btn btn-primary" @click="sendRequest">Aide</button>
      </div>
    </div>
</template>

<script>
  import io from "socket.io-client";

  export default {
    name: "Home",

    data () {
      return {
        socket : io('http://localhost:8081/'),
      }
    },

    methods: {
      async sendRequest() {
        this.socket.emit('sendRequest', 'toto')
      }
    }
  }
</script>
