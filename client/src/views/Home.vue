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

<<<<<<< HEAD
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios'
//import sweet from 'sweetalert'

=======
>>>>>>> 1a00b09541a751b3a1d5c404e19bbcb21799b91a
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
      msg: 'Welcome to Hypertube!!',
      token: ''
    }
  },
  methods: {
      async oauthRedirect() {
          let options = {
              method: 'get',
              url: 'http://localhost:5000/api/users/redirect/'+this.$route.query.u
          }
          let res = await axios(options).catch(e => {console.log(e)})
          console.log(res.data.success)
          //sweet(`${this.token}`)
      }
  },
  created() {
          console.log(this.$route.query.u)

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
</style>