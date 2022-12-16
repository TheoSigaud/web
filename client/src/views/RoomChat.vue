<template>
    <div>
      <div class="container vh-100">
        <h3>Bienvenue sur le salon : {{nameRoom}}</h3>

<!--        <ul>-->
<!--          <li v-for="user in users" :key="message.id">{{ message }}</li>-->
<!--        </ul>-->
      </div>
    </div>
</template>

<script>
  import MiddlewareService from '@/services/MiddlewareService'
  import Chat from "../components/Chat";

  export default {
    name: "RoomChat",
    components: {Chat},

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
      this.$socket.on('usersRoomChat', message => {
        this.users = message
        console.log(this.users)
      })
    },

    mounted() {
      this.codeRoom = this.$route.params.code;

      this.$socket.emit('joinRoomChat', this.nameRoom)
    },
    methods: {
    }
  }
</script>
