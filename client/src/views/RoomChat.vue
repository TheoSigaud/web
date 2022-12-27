<template>
    <div>
      <div class="container vh-100">
        <h3>Bienvenue sur le salon : {{nameRoom}}</h3>

        <ul>
          <li v-for="user in users" :key="user">{{ user }}</li>
        </ul>

      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'

  export default {
    name: "RoomChat",

    watch: {
      user: function (val) {
        console.log(val)
      }
    },
    data () {
      return {
        nameRoom: this.$route.params.name,
        users: [],
      }
    },

    created() {
      this.$socket.emit('joinRoomChat', this.nameRoom);

      this.$socket.on('usersRoomChat', users => {
        this.users = users;
        console.log(users)
      });
    },
  }
</script>
