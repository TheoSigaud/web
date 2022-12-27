<template>
  <div>
    <div class="container vh-100">
      <h3>Liste des salons</h3>
      <div v-if="rooms.length > 0" class="container">
        <div class="row d-flex justify-content-start">
          <div class="d-flex flex-row card m-3 w-auto align-items-center" v-bind:key="room.name" v-for="room in rooms">
            <p class="m-0 p-2">{{room.name}}</p>
            <p class="m-0 p-2">{{room.max}} / personnes max</p>
            <router-link class="btn btn-success m-2" v-bind:to="{ name: 'RoomChat', params: { name: room.name } }">
              Rejoindre
            </router-link>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <h5>Aucun salon</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ActionsService from '@/services/ActionsService'

  export default {
    name: "RoomUser",

    data () {
      return {
        rooms: []
      }
    },

    created() {
      this.$socket.on('usersRoomChat', message => {
        this.users = message
        console.log(this.users)
      })
    },

    async mounted() {
      await this.getRooms()
    },

    methods: {
      async getRooms () {
        const response = await ActionsService.getRooms()
        this.rooms = response.data.rooms
      }
    },
  }
</script>
