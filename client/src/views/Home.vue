<template>
  <div>
     <!-- <div class="bg"></div> -->
    <app-header></app-header>
    <img src="../assets/test.jpg" alt="" srcset="" class="test">
    <!-- <router-link to="/register" class="sort-buttons buttons" >Register</router-link> | 
    <router-link to="/login">Log in</router-link> | -->
    <!-- <router-link to="/profile">Profile</router-link>  -->
    <app-footer></app-footer>
   
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios'
import sweet from 'sweetalert'

export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  name: 'home',
  components: {
    'app-header': Header,
    'app-footer': Footer
  },
  data() {
    return {
      msg: 'Welcome to Hypertube!!',
      token: ''
    }
  },
  methods: {
      async oauthRedirect() {
          let options = {
              method: 'get',
              url: 'http://localhost:5000/api/users/redirect/'+this.$route.query.t
          }
          let res = await axios(options).catch(e => {console.log(e)})
          console.log(res.data)
          if (res.data.success) {
              localStorage.setItem("jwt", res.data.success.token)
              sweet(res.data.success.username, "welcome to hypertube", "success")
              this.$router.push(`/library`)
          } else if (res.data.error == 'username unavailable') {
              sweet("", `${res.data.error}`, "error")
              this.$router.push('/register')
          }
      }
  },
  created() {
      this.oauthRedirect()
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
.test {
  width: 100%;
  height: auto;
}
</style>