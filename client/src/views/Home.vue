<template>
  <div>
     <div class="bg"></div>
    <!-- <app-header></app-header> -->
    {{ msg }}
    <router-link to="/register">Register</router-link> | 
    <router-link to="/login">Log in</router-link> |
    <!-- <router-link to="/profile">Profile</router-link>  -->
   
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  name: 'home',
  components: {
    // 'app-header': Header,
    // 'app-footer': Footer
  },
  data() {
    return {
      msg: 'Welcome to Hypertube!!'
    }
  }
}
</script>
<style scoped>
.bg {
  
  /* The image used */
  background-image: url("https://nhsportpress.com/wp-content/uploads/2018/12/movie-collage.png");

  /* Half height */
  height: 500px;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>