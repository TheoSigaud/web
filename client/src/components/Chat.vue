<template>
  <div>
    <form v-on:submit.prevent="sendMessage">
      <input v-model="message" type="text" placeholder="Type your message here">
      <button type="submit">Send</button>
    </form>
    <ul>
      <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
    </ul>
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

  data() {
    return {
      socket: null,
      message: '',
      messages: []
    }
  },
  mounted() {
    this.$socket.on('message', message => {
      this.messages.push(message)
      console.log(message)
    })
  },
  methods: {
    sendMessage() {
      this.$socket.emit('message', {
        text: this.message,
        email: this.email
      })

      this.message = ''
    }
  }
}
</script>
