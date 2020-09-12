<template>
  <div>
    <app-header></app-header>
    {{ msg }}
    <router-link to="/register">Register</router-link> | 
    <router-link to="/login">Log in</router-link> |
    <!-- <router-link to="/profile">Profile</router-link>  -->
    <app-footer></app-footer>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios'
//import sweet from 'sweetalert'

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
