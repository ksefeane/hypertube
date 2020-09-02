<template>
    <div>
        <!-- <router-link to="/">Home</router-link>  -->
        <div class="form-field">
            <form>
                <div id="err" v-for="error in errors" v-bind:key="error">
                    <p>{{ error }}</p>
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
import axios from 'axios'

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
            errors:[]
        }
    },
    methods: {
        validate: function() {
            this.errors = []
            if (this.username == '') {
                this.errors.push('Enter username')
            }
            if (this.password.length < 5) {
                this.errors.push('Password short')
            }
            if (this.password != this.confirm_password) {
                this.errors.push('Passwords do not match')
            }
            if (this.errors.length == 0) {
                this.register()
            }
        },
        register: function() {
            // var data_pack = {
            //     'first_name': this.first_name,
            //     'last_name': this.last_name,
            //     'username': this.username,
            //     'email': this.email,
            //     'password': this.password,
            //     'password_repeat': this.password_repeat
            // }
            const path = 'http://localhost:5000/api/users/signup'
            axios.post(path, {
                'first_name': this.first_name,
                'last_name': this.last_name,
                'username': this.username,
                'email': this.email,
                'password': this.password,
                'password_repeat': this.password_repeat
            }
            ).then((results) => {
                console.log(results.data)
                if (results.data.error) {
                    console.log("error")
                    this.errors = results.data.error
                } else if (results.data.success) {
                    console.log('success')
                    this.$router.push('/login')
                }
            }).catch((err) => {
                console.log('in catch')
                console.log(err)
            })

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