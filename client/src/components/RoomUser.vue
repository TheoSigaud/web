<template>
  <div>
    <div class="container">
      <h3>Liste des salons</h3>
      <p v-if="errorRoom">{{errorRoom}}</p>
      <div v-if="rooms.length > 0" class="container">
        <div class="row d-flex justify-content-start">
          <div class="d-flex flex-row card m-3 w-auto align-items-center" v-bind:key="room.name" v-for="room in rooms">
            <p class="m-0 p-2">{{room.name}}</p>
            <p class="m-0 p-2">{{room.max}} / personnes max</p>
            <button class="btn btn-success m-2" @click="joinRoom(room)">Rejoindre</button>
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
        rooms: [],
        errorRoom: null
      }
    },

    created() {
      this.$socket.on('usersRoomChat', message => {
        this.users = message
      })

      this.$socket.on('sendLengthUsers', message => {
        console.log(message.length)
        if (message.length >= message.max) {
          this.errorRoom = 'Le salon est complet'
        }else {
          this.$router.push({
            name: 'RoomChat',
            params: {
              name: message.room,
            }
          })
        }
      })
    },

    async mounted() {
      await this.getRooms()
    },

    methods: {
      async getRooms () {
        const response = await ActionsService.getRooms()
        this.rooms = response.data.rooms
      },

      async joinRoom (room) {
        this.$socket.emit('getUsers', {
          room: room.name,
          max: room.max,
        })
      }
    },
  }
</script>
