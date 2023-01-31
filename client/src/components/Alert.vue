<template>
  <div v-if="messages" class="alert alert-danger" id="alert" role="alert">
    {{messages}}
  </div>
</template>

<script>
export default {
  name: "Alert",

  data() {
    return {
      messages: null,
    }
  },

  async mounted() {
    this.$socket.on('receiveNotification', message => {
      this.messages = message;
      setTimeout(() => {
        this.messages = null;
      }, 5000);
    })
  }
}
</script>

<style scoped>
  #alert {
    position: absolute;
    right: 10px;
    z-index: 100;
  }
</style>
