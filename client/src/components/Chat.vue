<template>
  <div>
    <form v-on:submit.prevent="sendMessage">
      <textarea v-model="message" type="text" placeholder="Votre message" class="form-control"></textarea>
      <button class="btn btn-primary" type="submit">Envoyer</button>
    </form>
    <div class="container mt-5">
      <div class="row" v-for="message in messages" :key="message.id">
        <div class="col-sm-6" v-if="message.email !== email">
          <div class="chat-bubble">
            <h6 v-if="email === room" class="card-title">Admin: </h6>
            <h6 v-else class="card-title">{{message.email}}: </h6>
            <p class="card-text">{{ message.text }}</p>
          </div>
        </div>
        <div class="col-sm-6 offset-sm-6" v-else>
          <div class="chat-bubble mine">
            <h6 class="card-title">Moi: </h6>
            <p class="card-text">{{ message.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chat",

  props: {
    email: {
      type: String,
      required: true
    },
    room: {
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
    })
  },
  methods: {
    sendMessage() {
      this.$socket.emit('message', {
        text: this.message,
        room: this.room,
        email: this.email
      })

      this.message = ''
    }
  }
}
</script>

<style>
.chat-bubble {
  background-color: #f1f0f0;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 10px;
  padding: 15px;
  position: relative;
}

.chat-bubble.mine {
  background-color: #8bc0d9;
  margin-left: auto;
  text-align: right;
}

.chat-bubble.mine:before {
  left: auto;
  right: -10px;
  border-right-color: transparent;
  border-left-color: #e6e6e6;
}
</style>
