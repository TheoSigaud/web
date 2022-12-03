<template>
    <div>
        <div class="container vh-100">
            <h1>Dashboard</h1>

            <button class="btn btn-primary">Se mettre en ligne</button>
        </div>
    </div>
</template>

<script>
  import ActionsService from '@/services/ActionsService'
  import MiddlewareService from '@/services/MiddlewareService'

  export default {
    name: "Hello",

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
      async online() {

      }
    }
  }
</script>
