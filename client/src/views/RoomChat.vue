<template>
    <div>
      <div class="container vh-100">
        <h3>Bienvenue sur le salon : {{nameRoom}}</h3>

        <ul>
          <li v-for="user in users" :key="user">{{ user }}</li>
        </ul>

        <ChatRoom :room="nameRoom"/>
      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'
  import ChatRoom from "../components/ChatRoom";

  export default {
    name: "RoomChat",
    components: {ChatRoom},


    watch: {
      user: function (val) {
        console.log(val)
      }
    },
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
        room: this.nameRoom
      });

      this.$socket.on('usersRoomChat', users => {
        this.users = users;
      });
    },
  }
</script>
