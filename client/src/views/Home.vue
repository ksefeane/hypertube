<template>
  <div>
    <!-- <div class="bg"></div> -->
    <app-header></app-header>
    <br>
    <br>
    <section>
      <!-- <router-link to="/profile">Profile</router-link>  -->
      <!-- <h1>{{ msg }}</h1> -->
      <div :style="image" class="bg"></div>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import sweet from "sweetalert";

export default {
  // name: 'Home',
  // components: {
  //   HelloWorld
  // }
  name: "home",
  components: {
    "app-header": Header,
    "app-footer": Footer,
  },
  data() {
    return {
      // msg: "Welcome to Hypertube!!",
      token: "",
      image: {
        backgroundImage:
          "url(https://nhsportpress.com/wp-content/uploads/2018/12/movie-collage.png)",
      },
    };
  },
  methods: {
    async oauthRedirect() {
      let options = {
        method: "get",
        url: "http://localhost:5000/api/users/redirect/" + this.$route.query.t,
      };
      let res = await axios(options).catch((e) => {
        console.log(e);
      });
      console.log(res.data);
      if (res.data.success) {
        localStorage.setItem("jwt", res.data.success.token);
        sweet(res.data.success.username, "welcome to hypertube", "success");
        this.$router.push(`/profile/${res.data.success.username}`);
      }
    },
  },
  created() {
    this.oauthRedirect();
  },
};
</script>

<style scoped>
.bg {
  /* The image used */
  /* background-image: url(""); */

  /* Half height */
  height: 500px;
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
h1{
  text-align: center;
  
}
</style>