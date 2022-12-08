<template>
    <div>
      <div class="container vh-100">
        <h1>YOOOO</h1>
        <button class="btn btn-primary" @click="sendRequest">Aide</button>
        <Chat />
      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'
  import io from "socket.io-client";
  import Chat from "../components/Chat";

  export default {
    name: "Home",
    components: {Chat},
    data () {
      return {
        socket : io('http://localhost:8081/'),
        user: null
      }
    },

    async mounted() {
      await MiddlewareService.auth({
        token: localStorage.getItem("tokenWeb")
      }).then((res) => {
        this.user = res.data
      })
    },

    methods: {
      async sendRequest() {
        this.socket.emit('sendRequest', this.user)
      }
    }
  }
</script>
