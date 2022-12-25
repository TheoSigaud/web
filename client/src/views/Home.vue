<template>
    <div>
      <div class="container vh-100">
        <h1>YOOOO</h1>
        <!-- if onlineStatus == true display 'offline button' -->
        <button class="btn btn-danger" v-if="onlineStatus === 'Online'" @click="toggleOnlineStatus">Me rendre indisponible</button>
        <button class="btn btn-success" v-if="onlineStatus === 'Offline'" @click="toggleOnlineStatus">Me rendre disponible</button>
        <button v-if="!sendReq" class="btn btn-primary" @click="sendRequest">Aide</button>
        <p v-if="sendReq && !showChat">Une demande a été envoyé</p>
        <p v-if="showChat">Vous êtes en communication avec un administrateur</p>
        <Chat :email="user.user.email" v-if="showChat"/>
      </div>
    </div>
</template>

<script>
  import io from 'socket.io-client';
  import MiddlewareService from '@/services/MiddlewareService'
  import Chat from "../components/Chat";

  export default {
    name: "Home",
    components: {Chat},
    data () {
      return {
        user: null,
        sendReq: false,
        showChat: false,
        onlineStatus: 'Offline',
        onlineUsers: 0
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
      toggleOnlineStatus() {
        const socket = io('http://localhost:8081');
        if (this.onlineStatus === 'Offline') {
          socket.emit('online', true);
          this.onlineStatus = 'Online';
          this.onlineUsers = this.$data.onlineUsers;
        } else {
          socket.emit('online', false);
          this.onlineStatus = 'Offline';
          this.onlineUsers = this.$data.onlineUsers;
        }
      },
    },
    created(){
      const socket = io('http://localhost:8081');

      socket.on('updateOnlineUsers', (onlineUsers) => {
        this.onlineUsers = onlineUsers;
      });
    }
  }
</script>
