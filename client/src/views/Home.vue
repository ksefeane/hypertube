<template>
  <div>
    {{ msg }}
    <router-link to="/register">Register</router-link> | 
    <router-link to="/login">Log in</router-link> |
    <router-link to="/profile">Profile</router-link> 
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  data() {
    return {
      msg: 'Welcome to Hypertube!!'
    }
  }
}
</script>
