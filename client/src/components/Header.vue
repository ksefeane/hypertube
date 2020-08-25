<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg  bg-light">
        <a class="navbar-brand" href="#">Hypertube</a>
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

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/" v-show="false">Home</router-link>
            </li>

            <!-- <li class="nav-item">
              <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> -->
          </ul>
          <form class="form-inline my-2 my-lg-0">
              <router-link class="nav-link" to="/login">Login</router-link>
            <router-link class="btn btn-outline-primary my-2 my-sm-0" to="/register">Register</router-link>
          </form>
        </div>
      </nav>
      <!-- <h1>
        <router-link to="/">Hypertube</router-link>
      </h1> -->
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