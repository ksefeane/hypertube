<template>
  <div>
      <header>
          <h1> <router-link to="/">Hypertube</router-link></h1>
          <div v-if="!is_logged_in">
              <!-- <router-link to="/register">Log in</router-link> -->
              <router-link to="/login">Log In</router-link>
              <button @click="logout">Log out</button> 
          </div>
          <div v-else>
              <button @click="logout">Log out</button>
          </div>
      </header>
      
  </div>
</template>

<script>
// import { log } from 'util'
import swal from 'sweetalert'
export default {
    data() {
        return {
            title: 'This is the header',
            uid: null,
            is_logged_in: false
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("jwt")
            swal("success", "logged out", "success")
            this.$route.push()
        },
        // logout() {
        //     localStorage.removeItem('user')
        //     this.is_logged_in = false
        //     this.$router.push('/')
        // }
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
        this.uid = localStorage.getItem('user')
        if (this.uid) {
            this.is_logged_in = false
        }
    }
}
</script>

<style scoped>
header {
    background-color: peru;
}
</style>