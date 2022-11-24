<script setup>
    const show = ref(false)
    const emailLogin = ref(null)
    const passwordLogin = ref(null)
    const emailRegister = ref(null)
    const passwordRegister = ref(null)
    const passwordConfirmRegister = ref(null)
    const showError = ref(false)

    async function register() {
        // console.log('register')
        // fetch("http://localhost/test", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ 
        //         title: "Vue POST Request Example" 
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data))
        //     .catch(error => console.log(error))
    }
    
    async function signInWithEmail() {
        
    }
</script>

<template>
    <div>
        <div class="container vh-100">
            <div class="d-flex justify-content-center h-100 align-items-center">
                <div v-if="!show" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">Bienvenue</h5>
                        <div>
                            <input v-model="emailLogin" class="form-control mb-3 mt-4" type="email" placeholder="test@gmail.com">
                            <input v-model="passwordLogin" class="form-control mb-3" type="password" placeholder="*****">
                        </div>

                        <div class="d-flex align-items-center justify-content-between">
                            <button type="button" class="btn btn-primary" @click="signInWithEmail">Connexion</button>
                            <p class="m-0" @click="show = !show">Inscription</p>
                        </div>
                    </div>
                </div>

                <div v-if="show" class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title text-center">Bienvenue</h5>
                        <div>
                            <input v-model="emailRegister" class="form-control mb-3 mt-4" type="email" placeholder="test@gmail.com">
                            <input v-model="passwordRegister" class="form-control mb-3" type="password" placeholder="*****">
                            <input v-model="passwordConfirmRegister" class="form-control mb-3" type="password" placeholder="*****">
                        </div>

                        <p v-if="showError">Erreur mot de passe</p>

                        <div class="d-flex align-items-center justify-content-between">
                            <button type="button" class="btn btn-primary" @click="register">S'inscrire</button>
                            <p class="m-0" @click="show = !show">Connexion</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>