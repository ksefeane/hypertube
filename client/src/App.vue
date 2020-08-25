<template>
  <div id="app">
    <app-header></app-header>
    <app-navbar></app-navbar>
    <GithubLogin name="Github"></GithubLogin>
    <!-- <dashnav></dashnav> -->
    
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <app-movie></app-movie>
    <router-view/>
    <app-footer></app-footer>
    
  </div>
</template>

<script>

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';
import GithubLogin from './components/GithubLogin.vue';
import Movie from './components/Movie.vue';
// import Dashnav from './components/Dashnav.vue';
// import Dashboard  from './components/Dashboard.vue';


export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-navbar': Navbar,
    'app-movie' : Movie,
    // 'dashnav': Dashnav,
    // Dashboard,
    GithubLogin
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
