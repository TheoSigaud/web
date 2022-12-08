<template>
  <div>
    <h1>Liste des rendez-vous</h1>
    <ul v-for="appointment in appointments">
      <li>{{appointment.date}} - {{appointment.time}} - {{appointment.description}}
<!--        <button @click="editAppointment(appointment)">Modifier</button>-->
<!--        <button @click="deleteAppointment(appointment)">Supprimer</button>-->
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
<!--    <h2>Modifier un rendez-vous</h2>-->
<!--    <form @submit.prevent="updateAppointment">-->
<!--      <label for="date">Date:</label>-->
<!--      <input type="date" v-model="editedAppointment.date" id="date">-->
<!--      <label for="time">Heure:</label>-->
<!--      <input type="time" v-model="editedAppointment.time" id="time">-->
<!--      <label for="description">Description:</label>-->
<!--      <input type="text" v-model="editedAppointment.description" id="description">-->
<!--      <button type="submit">Modifier rendez-vous</button>-->
<!--    </form>-->
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
      // editedAppointment: {
      //   date: '',
      //   time: '',
      // }
    }
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
    // editAppointment(appointment) {
    //   this.editedAppointment = appointment
    // },
    // updateAppointment() {
    //   this.socket.emit('update appointment', this.editedAppointment)
    //   this.editedAppointment = {
    //     date: '',
    //     time: '',
    //     description: ''
    //   }
    // },
    // deleteAppointment(appointment) {
    //   this.socket.emit('delete appointment', appointment)
    // }
  }
}
</script>
