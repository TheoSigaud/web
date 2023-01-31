<template>
  <div>
    <router-view/>
    <div class="container">
      <h1 class="mb-4">Liste des rendez-vous</h1>

      <table class="table">
        <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Heure</th>
          <th scope="col">Disponible</th>
          <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="appointment in appointments" :key="appointment._id">
          <td>{{appointment.date}}</td>
          <td>{{appointment.time}}</td>
          <td v-if="!appointment.client">Oui</td>
          <td v-else>Réservé par - {{appointment.client}}</td>
          <td>
            <button class="btn btn-danger" @click="deleteAppointment(appointment._id)">Supprimer</button>
          </td>
        </tr>
        </tbody>
      </table>

      <h4 class="my-5">Créer un rendez-vous</h4>
      <form @submit.prevent="createAppointment">
        <div class="row d-flex justify-content-center">
          <div class="col-sm-4">
            <label for="date">Date:</label>
            <input type="date" v-model="newAppointment.date" id="date" class="form-control">
          </div>
          <div class="col-sm-4">
            <label for="time">Heure:</label>
            <input type="time" v-model="newAppointment.time" id="time" class="form-control">
          </div>
        </div>
        <button class="btn btn-primary mt-3" type="submit">Créer rendez-vous</button>
      </form>
    </div>
  </div>
</template>
<script>
import AppointementService from '@/services/AppointementService'

export default {
  name: 'Appointement',

  data() {
    return {
      appointments: [],
      newAppointment: {
        date: '',
        time: '',
      },
    }
  },

  async mounted() {
    const response = await AppointementService.fetchAppointements({
      token: localStorage.getItem("tokenWeb"),
    })
    this.appointments = response.data.appointments
  },

  methods: {
    async createAppointment() {
      if (this.newAppointment.date !== '' && this.newAppointment.time !== '') {
        let testDate = new Date(`${this.newAppointment.date}T${this.newAppointment.time}`);
        if (testDate > new Date()) {

          await AppointementService.createAppointement({
            date: this.newAppointment.date,
            time: this.newAppointment.time,
            token: localStorage.getItem("tokenWeb"),
          }).then(async () => {
            this.success = 'Création réussie'
            const response = await AppointementService.fetchAppointements({
              token: localStorage.getItem("tokenWeb"),
            })
            this.appointments = response.data.appointments
          })
        }
      }
    },

    async deleteAppointment(id) {
      await AppointementService.deleteAppointement({
        id: id,
        token: localStorage.getItem("tokenWeb"),
      })
      const response = await AppointementService.fetchAppointements({
        token: localStorage.getItem("tokenWeb"),
      })
      this.appointments = response.data.appointments
    }
  }
}
</script>
