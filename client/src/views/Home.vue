<template>
    <div>
      <router-view/>
      <div class="container">
        <div class="text-center">
          <h1>Bienvenue</h1>
          <p v-if="!sendReq">Avez-vous besoin d'aide ?</p>
          <button v-if="!sendReq" class="btn btn-primary" @click="sendRequest">Oui</button>
          <p v-if="sendReq && !showChat">Une demande a été envoyé</p>
          <p v-if="showChat">Vous êtes en communication avec un administrateur</p>

          <div>
            <button v-show="showChat" ref="myButton" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
              Afficher le chat administrateur
            </button>

            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Chat administrateur</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div>
              <div class="offcanvas-body">
                <Chat :email="user.user.email" :room="user.user.email" v-if="showChat"/>
              </div>
            </div>
          </div>
          <Chatbot />
          <RoomUser />
        </div>
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
        this.$refs.myButton.click();
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
