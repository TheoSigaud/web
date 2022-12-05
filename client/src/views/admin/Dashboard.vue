<template>
    <div>
        <div class="container vh-100">
            <h1>Dashboard</h1>

            <button class="btn btn-primary">Se mettre en ligne</button>
        </div>
    </div>
</template>

<script>
  import io from 'socket.io-client';
  import ActionsService from '@/services/ActionsService'
  import MiddlewareService from '@/services/MiddlewareService'

  export default {
    name: "Hello",

    data () {
      return {
        socket : io('http://localhost:8081/'),
        user: null
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
          console.log(data)
        })
      }
    }
  }
</script>
