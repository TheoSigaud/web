<template>
  <div>
    <h1>Liste des rendez-vous</h1>
    <ul v-for="appointment in appointments" :key="appointment._id">
      <li>{{appointment.date}} - {{appointment.time}}
        <button @click="deleteAppointment(appointment._id)">Supprimer</button>
      </li>
    </ul>
    <h2>Créer un rendez-vous</h2>
    <form @submit.prevent="createAppointment">
      <label for="date">Date:</label>
      <input type="date" v-model="newAppointment.date" id="date">
      <label for="time">Heure:</label>
      <input type="time" v-model="newAppointment.time" id="time">
      <button type="submit">Créer rendez-vous</button>
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
      }).then(() => {
        this.success = 'Création réussie'
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
