<template>
    <div>
        <!-- <router-link to="/">Home</router-link>  -->
        <div class="form-field">
            <form>
                <div id="err" v-for="error in errors" v-bind:key="error">
                    <p>{{ error }}</p>
                </div>
                <div id="succ" v-for="succ in success" v-bind:key="succ">
                    <p>{{ succ }}</p>
                </div>
                <label for="first_name">First Name: </label>
                <input type="text" name="first_name" v-model="first_name"> <br>
                <label for="username">Last Name: </label>
                <input type="text" name="last_name" v-model="last_name"> <br>
                <label for="username">Username: </label>
                <input type="text" name="username" v-model="username"> <br>
                <label for="email">Email: </label>
                <input type="email" name="email" v-model="email"> <br>
                <label for="password">Password: </label>
                <input type="password" name="password" v-model="password"> <br>
                <label for="confirm_password">Confirm Password: </label>
                <input type="password" name="confirm_password" v-model="confirm_password"> <br>
            </form>
            <button v-on:click="validate">Submit</button>
            <hr>
            <small>Already have an account? <router-link to="/login">Log in!</router-link> </small>
        </div>
        <div v-if="submit">
            First Name: {{ first_name }} <br>
            Last Name: {{ last_name }} <br>
            Username: {{ username }} <br>
            Email: {{ email }} <br>
            Password: {{ password}} <br>
            Repeat: {{ confirm_password }} <br>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import { secure_password, axios_post } from "../functions/functions";

export default {
    data() {
        return {
            first_name:'',
            last_name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: '',
            submit: true,
            errors:[],
            success:[]
        }
    },
    methods: {
        validate: function() {
            this.errors = []
            if (this.username.length < 4) {
                this.errors.push('Username must have at least 4 characters')
                return
            }
            let check = secure_password(this.password)
            if (check !== 'good') {
                this.errors.push(check)
                return
            }
            if (this.password != this.confirm_password) {
                this.errors.push('Passwords do not match')
                return
            }
            if (this.errors.length == 0) {
                this.register()
            }
        },
        register: async function() {
            // this.errors = []
            const data = {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'username': this.username,
                'email': this.email,
                'password': this.password,
                'password_repeat': this.password_repeat
            }
            var results = await axios_post('/api/users/signup', data)
            if (results !== "Oops!") {
                if (results.data.error) {
                    this.errors = results.data.error
                } else if (results.data.success) {
                    this.success.push("Registration successful! You can now log in")
                    this.clean_input()
                }
            } else {
                this.errors.push("An unexpected error happened")
            }
        },
        clean_input() {
            this.first_name = ''
            this.last_name =  ''
            this.username =  ''
            this.email =  ''
            this.password =  ''
            this.confirm_password = ''
            this.errors = []
        }
    }
}
</script>

<style scoped>
.form-field {
    margin: auto;
    width: 40%;
    /* border-style: solid;
    border-width: 1px; */
}
</style>