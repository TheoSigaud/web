<template>
    <div>
        <div class="container vh-100">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Créer un salon
          </button>

          <h3>Liste des salons</h3>
          <div v-if="rooms.length > 0" class="container">
            <div class="row d-flex justify-content-start">
              <div class="d-flex flex-row card m-3 w-auto align-items-center" v-bind:key="room.name" v-for="room in rooms">
                <p class="m-0 p-2">{{room.name}}</p>
                <p class="m-0 p-2">{{room.max}} / personnes max</p>
                <button class="btn btn-danger m-2" @click="deleteRoom(room.name)">Supprimer</button>
                <button class="btn btn-primary m-2" @click="maxUpdate = room.max; nameUpdate = room.name" data-bs-toggle="modal" data-bs-target="#exampleModalUpdate">Modifier</button>
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

          <div class="modal fade" id="exampleModalUpdate" tabindex="-1" aria-labelledby="exampleModalUpdateLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form class="form-control" @submit.prevent="update">
                    <label for="maxUpdate">Nombre maximum</label>
                    <input type="number" id="maxUpdate" class="form-control" v-model="maxUpdate" :placeholder="maxUpdate">

                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Mettre à jour</button>
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
        maxUpdate: null,
        nameUpdate: null,
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

      async deleteRoom (name) {
        await ActionsService.deleteRoom({
          name: name
        }).then(() => {
          this.getRooms()
        })
      },

      async update () {
        await ActionsService.updateRoom({
          name: this.nameUpdate,
          max: this.maxUpdate
        }).then(() => {
          this.getRooms()
        })
      }
    }
  }
</script>
