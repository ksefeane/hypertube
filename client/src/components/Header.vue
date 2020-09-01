<template>
  <div>
      <header>
          <h1> <router-link to="/">Hypertube</router-link></h1>
          <div v-if="!uid">
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
export default {
    data() {
        return {
            title: 'This is the header',
            uid: null
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('user')
            this.$router.push('/')
        }
    },
    // computed: {
    //     checkUid() {
    //         return this.uid = localStorage.getItem('user')
    //     }
    // },
    // beforeMount() {
    //     this.checkUid
    // }
}
</script>

<style scoped>
header {
    background-color: peru;
}
</style>