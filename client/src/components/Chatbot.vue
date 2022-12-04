<template>
  <div>
    <div class="container vh-100">
      <div>
        <p>{{question}}</p>

        <div v-for="answer in answers" :key="answer.id">
          <button class="btn btn-primary mb-4" @click="nextQuestion(answer.id)">{{answer.question}}</button>
        </div>
        <div v-if="showInput">
          <p>Ecrire</p>
          <input type="text">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import chatbot from '../chatbot.json';

  export default {
    name: "Chatbot",

    data () {
      return {
        question: '',
        answers: [],
        pathQuestion: null,
        showInput: false
      }
    },

    mounted() {
      this.question = chatbot.question
      this.answers = chatbot.answers
      this.pathQuestion = chatbot
    },

    methods: {
      nextQuestion(id) {
        this.question = this.pathQuestion.answers[id].question
        this.answers = this.pathQuestion.answers[id].answers
        this.pathQuestion = this.pathQuestion.answers[id]

        if (this.pathQuestion.input){
          this.showInput = true
        }
      },

      resetChatbot() {
        this.question = chatbot.question
        this.answers = chatbot.answers
        this.pathQuestion = chatbot
      }
    }
  }
</script>

