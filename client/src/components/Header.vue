<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">Hypertube</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- <form class="form-inline my-2 my-lg-0">
            <router-link v-if="['login', 'register'].indexOf($route.name) > -1"></router-link>
            <router-link class="nav-link" to="/login">Login</router-link>
            <router-link  class="btn btn-outline-primary my-2 my-sm-0" to="/register" >Register</router-link>
        </form>-->
      </nav>
      <!-- <h1>
        <router-link to="/">Hypertube</router-link>
      </h1>-->

      {{ title }}
      <div v-if="!is_logged_in">
        <!-- <router-link to="/register">Log in</router-link> -->
        <router-link to="/login">Log In</router-link>
      </div>
      <div v-else>
        <button @click="logout">Log out</button>
      </div>
    </header>
  </div>
</template>

<script>
// import { log } from 'util'
export default {
  data() {
    return {
      title: "This is the header",
      uid: null,
      is_logged_in: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.is_logged_in = false;
      this.$router.push("/");
    },
  },
  // computed: {
  //     checkUid() {
  //         // this.uid = localStorage.getItem('user')
  //         return localStorage.getItem('user')
  //     }
  // },
  // beforeMount() {
  //     this.checkUid
  // },
  created() {
    this.uid = localStorage.getItem("user");
    if (this.uid) {
      this.is_logged_in = true;
    }
  },
};
</script>

<style scoped>
header {
 background-color: #b5afbc;
}
</style>