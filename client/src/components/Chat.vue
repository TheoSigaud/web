<template>
  <div id="chat">
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message }}</li>
    </ul>
    <textarea v-model="newMessage"></textarea>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
  export default {
    name: "Chat",

    props: {
      email: {
        type: String,
        required: true
      }
    },

    data () {
      return {
        messages: [],
        newMessage: ''
      }
    },

    mounted() {
      this.$socket.on('getMessages', message => {
        console.log(message)
        this.messages.push(message)
      })
    },

    methods: {
      sendMessage() {
        const message = {
          date: Date.now(),
          text: this.newMessage
        }
        this.$socket.emit('sendMessage', this.email, message)
        this.newMessage = ''
      },
    },
  }
</script>
