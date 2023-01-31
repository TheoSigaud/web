<template>
    <div>
      <router-view/>
      <div class="container vh-100">
        <h3>Bienvenue sur le salon : {{nameRoom}}</h3>

        <ul class="list-group list-group-flush">
          <li v-for="user in users" :key="user" class="list-group-item d-flex align-items-center">
            <span class="badge rounded-pill text-bg-success">&nbsp;</span>&nbsp;{{ user }}</li>
        </ul>

        <ChatRoom v-if="user" :room="nameRoom" :email="user.user.email"/>
      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'
  import ChatRoom from "../components/ChatRoom";

  export default {
    name: "RoomChat",
    components: {ChatRoom},

    data () {
      return {
        nameRoom: this.$route.params.name,
        users: [],
        user: null
      }
    },

    async created() {
      await MiddlewareService.auth({
        token: localStorage.getItem("tokenWeb")
      }).then((res) => {
        this.user = res.data
      })

      this.$socket.emit('joinRoomChat', {
        room: this.nameRoom,
        email: this.user.user.email
      });

      this.$socket.on('usersRoomChat', users => {
        this.users = users;
      });
    },
  }
</script>
