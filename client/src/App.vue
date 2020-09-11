<template>
  <div id="app">
    <app-header></app-header>
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
import GithubLogin from './components/GithubLogin.vue';
import Movie from './components/Movie.vue';
// import Dashnav from './components/Dashnav.vue';
// import Dashboard  from './components/Dashboard.vue';


export default {
  components: {
    'app-header': Header,
    'app-footer': Footer,
    'app-movie' : Movie,
    // 'dashnav': Dashnav,
    // Dashboard,
    GithubLogin
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #b5afbc;
  font-size: 100%;
}
#app {
  font-family:courier,arial,helvetica;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #7c5295;
  padding: 0;
  font-size: 1em;
}
header{
  border-bottom: 1px solid;
    background-color: #b5afbc;
}
section {
  display: block;
  min-height: 400px;
  max-width: 1000px;
  margin: 0 auto;
}

.message {
  margin: 2em 20px;
  font-size: 0.9em;
  text-transform: uppercase;
}

.title {
  margin: 1em 0 1em 20px;
  font-family: sans-serif;
  font-size: 1.5em;
  text-transform: uppercase;
}
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}
</style>
