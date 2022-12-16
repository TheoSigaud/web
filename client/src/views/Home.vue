<template>
    <div>
      <div class="container vh-100">
        <h1>YOOOO</h1>
        <button class="btn btn-primary" @click="sendRequest">Aide</button>
        <Chat :email="user.user.email" v-if="user"/>
      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'
  import Chat from "../components/Chat";

  export default {
    name: "Home",
    components: {Chat},
    data () {
      return {
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
        this.$socket.emit('sendRequest', this.user)
      }
    }
  }
</script>
