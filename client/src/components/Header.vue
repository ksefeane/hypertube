<template>
  <div>
      <header>
          <h1> <router-link to="/">Hypertube</router-link></h1>

          
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
            title: 'This is the header',
            uid: null,
            is_logged_in: false
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user')
            this.is_logged_in = false
            this.$router.push('/')
        }
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
            this.is_logged_in = true
        }
    }
}
</script>

<style scoped>
header {
    background-color: #b5afbc;
}
</style>