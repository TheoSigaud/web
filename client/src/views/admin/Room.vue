<template>
    <div>
        <div class="container vh-100">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Créer un salon
          </button>

          <div v-if="rooms.length > 0" class="container">
            <div class="row d-flex justify-content-start">
              <div v-bind:key="room.name" v-for="room in rooms">
                <p>{{room.name}}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="text-center">
              <h5>Aucun salon</h5>
            </div>
          </div>


          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form class="form-control" @submit.prevent="create">
                    <label for="name">Nom du salon</label>
                    <input type="text" id="name" class="form-control" v-model="name">
                    <label for="max">Nombre maximum</label>
                    <input type="number" id="max" class="form-control" v-model="max">

                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Créer</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
  import io from 'socket.io-client';
  import ActionsService from '@/services/ActionsService'
  import MiddlewareService from '@/services/MiddlewareService'
  import Chat from "../../components/Chat";

  export default {
    name: "Room",
    components: {Chat},
    data () {
      return {
        socket : io('http://localhost:8081/'),
        name: null,
        max: null,
        rooms: []
      }
    },

    async mounted() {
      // await MiddlewareService.auth({
      //   token: localStorage.getItem("tokenWeb")
      // }).then((res) => {
      //   this.user = res.data
      // })
      await this.getRooms()
    },

    methods: {
      async create() {
        await ActionsService.createRoom({
          name: this.name,
          max: this.max,
        }).then(() => {
          this.success = 'Création réussie'
          this.name = null
          this.max = null
          this.getRooms()
        })
      },

      async getRooms () {
        const response = await ActionsService.getRooms()
        this.rooms = response.data.rooms
      },
    }
  }
</script>
