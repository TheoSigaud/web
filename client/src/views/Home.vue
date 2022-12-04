<template>
    <div>
      <div class="container vh-100">
        <h1>YOOOO</h1>
        <Chatbot />
      </div>
    </div>
</template>

<script>
  import Chatbot from '@/components/Chatbot.vue';
  export default {
    name: "Home",
    components: {
      Chatbot
    },

    data () {
      return {
      }
    },

    methods: {
    }
  }
</script>
