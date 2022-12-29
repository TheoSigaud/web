<template>
    <div>
        <div class="container vh-100">
            <div class="d-flex flex-column justify-content-center h-100 align-items-center">
                <div v-if="!show" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">Bienvenue</h5>
                        <form v-on:submit.prevent="signInWithEmail">
                          <div>
                              <input v-model="emailLogin" class="form-control mb-3 mt-4" type="email" placeholder="test@gmail.com">
                              <input v-model="passwordLogin" class="form-control mb-3" type="password" placeholder="*****">
                          </div>

                          <div class="d-flex align-items-center justify-content-between">
                              <button class="btn btn-primary" @click="signInWithEmail" type="submit">Connexion</button>
                              <p class="m-0" @click="show = !show">Inscription</p>
                          </div>
                        </form>
                    </div>
                </div>

                <div v-if="show" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">Bienvenue</h5>
                        <form v-on:submit.prevent="register">
                          <div>
                              <input v-model="emailRegister" class="form-control mb-3 mt-4" type="email" placeholder="test@gmail.com">
                              <input v-model="passwordRegister" class="form-control mb-3" type="password" placeholder="*****">
                              <input v-model="passwordConfirmRegister" class="form-control mb-3" type="password" placeholder="*****">
                          </div>

                          <p v-if="showError">Erreur mot de passe</p>

                          <div class="d-flex align-items-center justify-content-between">
                              <button class="btn btn-primary" type="submit">S'inscrire</button>
                              <p class="m-0" @click="show = !show">Connexion</p>
                          </div>
                        </form>
                    </div>
                </div>

                <p class="mt-3">{{success}}</p>
            </div>
        </div>
    </div>
</template>

<script>
  import UsersService from '@/services/UsersService'
  import MiddlewareService from '@/services/MiddlewareService'

  export default {
    name: "Hello",

    data () {
      return {
        show: false,
        emailLogin: null,
        passwordLogin: null,
        emailRegister: null,
        passwordRegister: null,
        passwordConfirmRegister: null,
        showError: false,
        success: ''
      }
    },

    async mounted() {
      // await MiddlewareService.auth({
      //   token: localStorage.getItem("tokenWeb")
      // }).then((res) => {
      //   console.log(res)
      // })
    },

    methods: {
      async register() {
        await UsersService.register({
          email: this.emailRegister,
          password: this.passwordRegister,
        }).then(() => {
          this.success = 'Inscription réussie'
        })
      },

      async signInWithEmail() {
        await UsersService.login({
          email: this.emailLogin,
          password: this.passwordLogin,
        }).then((res) => {
          if (res.status === 200) {
            localStorage.setItem("tokenWeb", res.data.token)
            this.$router.push({ name: 'Home' })
          }else{
            this.success = 'Identifiants incorrects'
          }
        }).catch((e) => {
          this.success = 'Identifiants incorrects'
        })
      }
    }
  }
</script>
