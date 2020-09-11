<template>
  <div>
    <app-header></app-header>
    {{ msg }}
    <router-link to="/register">Register</router-link> | 
    <router-link to="/login">Log in</router-link> |
    <!-- <router-link to="/profile">Profile</router-link>  -->
   
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Header";


export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  name: 'home',
  components: {
    'app-header': Header,
    // 'app-footer': Footer
  },
  data() {
    return {
      msg: 'Welcome to Hypertube!!'
    }
  }
}
</script>
