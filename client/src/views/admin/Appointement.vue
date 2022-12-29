<template>
  <div class="container">
    <h1 class="mb-4">Liste des rendez-vous</h1>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Date</th>
        <th scope="col">Heure</th>
        <th scope="col">Disponible</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="appointment in appointments" :key="appointment._id">
        <td>{{appointment.date}}</td>
        <td>{{appointment.time}}</td>
        <td v-if="!appointment.client">Oui</td>
        <td v-else>Réservé par - {{appointment.client}}</td>
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
    const response = await AppointementService.fetchAppointements()
    this.appointments = response.data.appointments
  },

  methods: {
    async createAppointment() {
      await AppointementService.createAppointement({
        date: this.newAppointment.date,
        time: this.newAppointment.time,
      }).then(async () => {
        this.success = 'Création réussie'
        const response = await AppointementService.fetchAppointements()
        this.appointments = response.data.appointments
      })
    },

    async deleteAppointment(id) {
      await AppointementService.deleteAppointement({
        id: id
      })
      const response = await AppointementService.fetchAppointements()
      this.appointments = response.data.appointments
    }
  }
}
</script>
