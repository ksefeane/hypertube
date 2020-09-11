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
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   title: "This is the header",
    };
  },
};
</script>
<style  scoped>
.header{
    background-color: #b5afbc;
}
.navbar {
  background-color: #b5afbc;
  border-color: #7c5295;
  border-bottom-style: solid;
}
</style>