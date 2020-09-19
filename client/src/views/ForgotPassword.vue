<template>
    <div>
        <app-header></app-header>
        <section class="center">
        <br>
        <h1 class="center">{{ title }}</h1>
        <p>{{ text }}</p>
        <form>
            <div id="err" v-for="error in errors" v-bind:key="error">
                <p>{{ error }}</p>
            </div>
            <div v-if="succ">
                <p>{{ succ }}</p>
            </div>
            <input type="text" placeholder="Enter your username" v-model="username">
        </form>
        <button class="buttons" @click="validate">Submit Username</button>
        <br />
        <router-link to="/login">Back to login</router-link>
        </section>
        <app-footer></app-footer>
    </div>
</template>

<script>
// import axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";

import { axios_post } from "../functions/functions";

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
    data() {
        return {
            title: 'Forgot Password',
            text: 'Enter your username and you will recieve an email with instructions to reset your password',
            username: '',
            errors: [],
            succ: null
        }
    },
    methods: {
        validate() {
            this.err = []
            if (this.username.length < 4) {
                this.errors.push('Username must have at least 4 characters')
            } else {
                this.forgot_pass()
            }
        },
        async forgot_pass() {
            const data = {'username': this.username}
            var results = await axios_post('/api/forgotpassword/', data)
            if (results !== "Oops!") {
                if (results.data.error) {
                    this.errors.push(results.data.error)
                } else if (results.data.accepted) {
                    this.succ = "An email was sent to you!"
                    this.username = ""
                }
            } else {
                this.errors.push("An unexpected error happened")
            }
            // const path = 'http://localhost:5000/api/forgotpassword/'
            // axios.post(path, {
            //     'username': this.username
            // }).then((result) => {
            //     console.log(result)
            //     if (result.data.error) {
            //         console.log(result.data.error)
            //         this.err.push(result.data.error)
            //     } else if (result.data.accepted) {
            //         this.succ = "An email was sent to you!"
            //     }
            // }).catch((error) => {
            //     console.log(error)
            // })
        }
    }
}
</script>