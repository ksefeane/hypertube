<template>
  <div>
    <!-- <router-link to="/">Home</router-link>  -->
    <h1>{{ msg }}</h1>
    <div class="container">
      <br />
      <br />
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <form>
            <div class="form-group">
              <div id="err" v-for="error in errors" v-bind:key="error">
                <p>{{ error }}</p>
              </div>
              <div class="social-login">
                <a @click="gitsignup" id="github-button" class="btn btn-block btn-social btn-github">
                  <i class="fa fa-github"></i> Sign up with Github
                </a>
                <a @click="wtcsignup" id="wtc-button" class="btn google-btn social-btn" type="button">
                  <span>
                    <i class="fab fa-google-plus-g"></i> Sign up with Google+
                  </span>
                </a>
                <br />
                <br />
              </div>
              <!-- <label for="first_name">First Name: </label> -->
              <input
                placeholder="Enter First Name"
                class="form-control"
                type="text"
                name="first_name"
                v-model="first_name"
              />
              <br />
              <!-- <label for="username">Last Name: </label> -->
              <input
                placeholder="Enter Last Name"
                class="form-control"
                type="text"
                name="last_name"
                v-model="last_name"
              />
              <br />
              <!-- <label for="username">Username: </label> -->
              <input
                placeholder="Enter Username"
                class="form-control"
                type="text"
                name="username"
                v-model="username"
              />
              <br />
              <!-- <label for="email">Email: </label> -->
              <input
                placeholder="Enter Email"
                class="form-control"
                type="email"
                name="email"
                v-model="email"
              />
              <br />
              <!-- <label  class="form-control" for="password">Password: </label> -->
              <input
                placeholder="Enter Password"
                class="form-control"
                type="password"
                name="password"
                v-model="password"
              />
              <br />
              <!-- <label class="form-control" for="confirm_password">Confirm Password: </label> -->
              <input
                placeholder="Confirm Password"
                class="form-control"
                type="password"
                name="confirm_password"
                v-model="confirm_password"
              />
              <br />
            </div>
            <button v-on:click="validate" class="btn btn-primary">Submit</button>
          </form>
          <hr />
          <small>
            Already have an account?
            <router-link to="/login">Log in!</router-link>
          </small>
        </div>
      </div>

      <div v-if="submit">
        First Name: {{ first_name }}
        <br />
        Last Name: {{ last_name }}
        <br />
        Username: {{ username }}
        <br />
        Email: {{ email }}
        <br />
        Password: {{ password}}
        <br />
        Repeat: {{ confirm_password }}
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      submit: true,
      errors: [],
      msg: "Create Account",
    };
  },
  methods: {
    validate: function () {
      this.errors = [];
      if (this.username == "") {
        this.errors.push("Enter username");
      }
      if (this.password.length < 5) {
        this.errors.push("Password short");
      }
      if (this.password != this.confirm_password) {
        this.errors.push("Passwords do not match");
      }
      if (this.errors.length == 0) {
        this.register();
      }
    },
    gitsignup() {
      // Initializes OAuth.io with API key
      // Sign-up an account to get one
      window.OAuth.initialize('BTfcjv51Sd9sJJrfLVp8QyIBZUM');

      // Popup facebook and ask for authorization
      window.OAuth.popup('github').then((github) => {
        console.log('github:', github);
        // Prompts 'welcome' message with User's name on successful login
        // #me() is a convenient method to retrieve user data without requiring you
        // to know which OAuth provider url to call
        github.me().then((data) => {
          console.log("data: ", data);
          alert("Your Github email: " + data.email + ".\nCheck console logs for more info.");
        });

        // You can also call Github's API using #.get()
        github.get('/user').then(data => {
          console.log('self data:', data);
        });
      });
    },
    props: {
      name: String,
    },
    wtcsignup() {
      // Initializes OAuth.io with API key
      // Sign-up an account to get one
      window.OAuth.initialize('c45308628135eb96e8e94f019ae7e745a7ef0d40f84403db88224c9774854dfb');

      // Popup facebook and ask for authorization
      window.OAuth.popup('wtc').then((wtc) => {
        console.log('wtc:', wtc);
        // Prompts 'welcome' message with User's name on successful login
        // #me() is a convenient method to retrieve user data without requiring you
        // to know which OAuth provider url to call
        wtc.me().then((data) => {
          console.log("data: ", data);
          alert("Your We think code_ email: " + data.email + ".\nCheck console logs for more info.");
        });

        // You can also call Github's API using #.get()
        wtc.get('/user').then(data => {
          console.log('self data:', data);
        });
      });
    },
    // // props: {
    // //   name: String,
    // },

    register: function () {
      // var data_pack = {
      //     'first_name': this.first_name,
      //     'last_name': this.last_name,
      //     'username': this.username,
      //     'email': this.email,
      //     'password': this.password,
      //     'password_repeat': this.password_repeat
      // }
      var path = "http://localhost:5000/api/users/signup/";
      axios
        .post(path, {
          first_name: this.first_name,
          last_name: this.last_name,
          username: this.username,
          email: this.email,
          password: this.password,
          password_repeat: this.password_repeat,
        })
        .then((results) => {
          console.log(results.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
h1 {
  color: #0275d8;
}
#logreg-forms .social-login {
  width: 390px;
  margin: 0 auto;
  margin-bottom: 14px;
}
#logreg-forms .social-btn {
  font-weight: 100;
  color: white;
  width: 190px;
  font-size: 0.9rem;
}
#app div .git-btn {
  display: inline-block;
  content: " ";
  width: 200px;
  height: 200px;
  background-image: url("https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png");
  background-size: cover;
}
</style>