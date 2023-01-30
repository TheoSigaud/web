<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/admin/dashboard">Accueil</router-link>
          </li>
          <li class="nav-item ms-4">
            <router-link to="/admin/room">Salons</router-link>
          </li>
        </ul>
        <button class="btn btn-primary" @click="logout">Déconnexion</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "default",

  methods: {
    logout() {
      localStorage.removeItem("tokenWeb");
      this.$router.push({ name: 'Hello' })
    }
  }
}
</script>
