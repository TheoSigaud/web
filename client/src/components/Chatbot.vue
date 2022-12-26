<template>
  <div>
    <h3>{{ currentNode.question }}</h3>
    <div v-if="currentNode.input === 'date'">
      <input type="date" class="form-control" v-model="dateAppointment" />
      <button class="btn btn-primary" @click="checkAppointement">Suivant</button>
    </div>
    <div v-if="currentNode.input === 'km'">
      <input type="number" class="form-control" v-model="kmAppointment" />
      <button class="btn btn-primary" @click="checkKm">Suivant</button>
    </div>
    <p v-else>
      <button v-for="(button, index) in currentNode.buttons" :key="index" @click="navigate(button.nextNode)" class="btn btn-primary m-2">
        {{ button.label }}
      </button>
    </p>
    <ul v-for="appointment in appointments" :key="appointment._id">
      <li>{{appointment.date}} - {{appointment.time}}
        <button @click="updateAppointment(appointment._id)" class="btn btn-primary">Accepter le rendez-vous</button>
      </li>
    </ul>
    <p v-if="errorAppointment">{{errorAppointment}}</p>

    <button class="btn btn-warning m-2" @click="reset" v-if="currentNode.restart">Restart</button>
  </div>
</template>

<script>
  import chatData from '../chatbot.json';
  import AppointementService from '@/services/AppointementService'
  import MiddlewareService from '@/services/MiddlewareService'

  export default {
    name: 'Chatbot',

    data() {
      return {
        currentNode: null,
        decisionTree: null,
        dateAppointment: '',
        kmAppointment: 0,
        appointments: [],
        errorAppointment: null,
        user: null,
      };
    },
    created() {
      this.decisionTree = chatData;

      this.currentNode = this.decisionTree;
    },

    async mounted() {
      this.currentNode = this.decisionTree['1'];

      await MiddlewareService.auth({
        token: localStorage.getItem("tokenWeb")
      }).then((res) => {
        this.user = res.data
      })
      console.log(this.user)
    },

    methods: {
      async navigate(nodeId) {
        this.currentNode = this.decisionTree[nodeId];
        if (nodeId == 8) {
          await this.fetchChatAppointements()
        }
      },

      async checkAppointement() {
        let date = new Date(this.dateAppointment);
        let diff = Date.now() - date.getTime();
        let diffYears = diff / (1000 * 60 * 60 * 24 * 365);

        if (diffYears >= 1) {
          this.currentNode = this.decisionTree[8];
          await this.fetchChatAppointements()
        } else {
          this.currentNode = this.decisionTree[9];
        }
      },

      async checkKm() {
        if (this.kmAppointment >= 10000) {
          this.currentNode = this.decisionTree[8];
          await this.fetchChatAppointements()
        } else {
          this.currentNode = this.decisionTree[10];
        }
      },

      reset() {
        this.currentNode = this.decisionTree['1'];
      },

      async fetchChatAppointements() {
        const response = await AppointementService.fetchChatAppointements()
        if (response.status === 200 && response.data.appointments.length > 0) {
          this.appointments = response.data.appointments
        } else {
          this.errorAppointment = 'Aucun rendez-vous trouvé dans les 2 prochaines semaines'
        }
      },

      async updateAppointment(id) {
        const response = await AppointementService.updateAppointment({
          id,
          client:
        })
        if (response.status === 200) {
          this.errorAppointment = 'Rendez-vous accepté'
        } else {
          this.errorAppointment = 'Erreur lors de la mise à jour du rendez-vous'
        }
      }
    }
  };
</script>
