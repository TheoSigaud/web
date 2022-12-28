<template>
    <div>
      <div class="container vh-100">
        <h1>YOOOO</h1>
        <button v-if="!sendReq" class="btn btn-primary" @click="sendRequest">Aide</button>
        <p v-if="sendReq && !showChat">Une demande a été envoyé</p>
        <p v-if="showChat">Vous êtes en communication avec un administrateur</p>
        <Chat :email="user.user.email" v-if="showChat"/>

        <Chatbot />
        <RoomUser />
      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'
  import Chat from "../components/Chat";
  import RoomUser from "../components/RoomUser";
  import Chatbot from '../components/Chatbot.vue';

  export default {
    name: "Home",
    components: {Chat, Chatbot, RoomUser},

    data () {
      return {
        user: null,
        sendReq: false,
        showChat: false
      }
    },
    async mounted() {
      await MiddlewareService.auth({
        token: localStorage.getItem("tokenWeb")
      }).then((res) => {
        this.user = res.data
      })

      this.$socket.on('requestAccepted', message => {
        this.showChat = true
      })
    },

    methods: {
      async sendRequest() {
        this.$socket.emit('sendRequest', this.user)
        this.sendReq = true
      },

    },

  }
</script>
