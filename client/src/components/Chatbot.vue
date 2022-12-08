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

    <button class="btn btn-warning m-2" @click="reset" v-if="currentNode.restart">Restart</button>
  </div>
</template>

<script>
  import chatData from '../chatbot.json';

  export default {
    name: 'Chatbot',

    data() {
      return {
        currentNode: null,
        decisionTree: null,
        dateAppointment: '',
        kmAppointment: 0,
      };
    },
    created() {
      this.decisionTree = chatData;

      this.currentNode = this.decisionTree;
    },

    mounted() {
      this.currentNode = this.decisionTree['1'];
    },

    methods: {
      navigate(nodeId) {
        this.currentNode = this.decisionTree[nodeId];
      },

      checkAppointement() {
        let date = new Date(this.dateAppointment);
        let diff = Date.now() - date.getTime();
        let diffYears = diff / (1000 * 60 * 60 * 24 * 365);

        if (diffYears >= 1) {
          this.currentNode = this.decisionTree[8];
        } else {
          this.currentNode = this.decisionTree[9];
        }
      },

      checkKm() {
        if (this.kmAppointment >= 10000) {
          this.currentNode = this.decisionTree[8];
        } else {
          this.currentNode = this.decisionTree[10];
        }
      },

      reset() {
        this.currentNode = this.decisionTree['1'];
      }
    }
  };
</script>
