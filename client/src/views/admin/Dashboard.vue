<template>
    <div>
        <div class="container vh-100">
            <h1>Dashboard</h1>

            <button class="btn btn-primary">Se mettre en ligne</button>

            <div v-for="(user, index) in users" :key="user" class="d-flex align-items-center">
              <p class="m-0">{{user}}</p>
              <button class="btn btn-primary me-3 ms-3" @click="join(user)">Accepter</button>
              <button class="btn btn-danger" @click="reject(index)">Refuser</button>
            </div>

            <Chat v-if="currentRoom" :email="currentRoom"/>
        </div>
    </div>
</template>

<script>
  import io from 'socket.io-client';
  import ActionsService from '@/services/ActionsService'
  import MiddlewareService from '@/services/MiddlewareService'
  import Chat from "../../components/Chat";

  export default {
    name: "Hello",
    components: {Chat},
    data () {
      return {
        socket : io('http://localhost:8081/'),
        users: [],
        currentRoom: null
      }
    },

    async mounted() {
      // await MiddlewareService.auth({
      //   token: localStorage.getItem("tokenWeb")
      // }).then((res) => {
      //   this.user = res.data
      // })

      await this.checkRequests()
    },

    methods: {
      async online() {

      },

      async checkRequests() {
        this.socket.on('request', data => {
          if (!this.users.includes(data.user.email)) {
            this.users.push(data.user.email);
          }
        })
      },

      async join(user) {
        this.currentRoom = user
        this.socket.emit('joinRoom', user)
      },

      async reject(index) {
        this.users.splice(index, 1)
      }
    }
  }
</script>
