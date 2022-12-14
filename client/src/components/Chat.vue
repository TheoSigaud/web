<template>
  <div id="chat">
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
    <textarea v-model="newMessage"></textarea>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
  import io from "socket.io-client";

  export default {
    name: "Chat",

    data () {
      return {
        socket : io('http://localhost:8081/'),
        messages: [],
        newMessage: ''
      }
    },

    mounted() {
      this.socket.on('getMessages', message => {
        this.messages.push(message)
      })
    },

    methods: {
      sendMessage() {
        const message = {
          id: Date.now(),
          text: this.newMessage,
        }
        this.socket.emit('sendMessage', message)
        this.newMessage = ''
      },
    },
  }
</script>
