<template>
    <div>
        <h1>{{ title }}</h1>
        <p>{{ text }}</p>
        <form>
            <div id="err" v-for="error in err" v-bind:key="error">
                <p>{{ error }}</p>
            </div>
            <div v-if="succ">
                <p>{{ succ }}</p>
            </div>
            <input type="text" placeholder="Enter your username" v-model="username">
        </form>
        <button @click="validate">Submit Username</button>
        <br />
        <router-link to="/login">Back to login</router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            title: 'Forgot Password',
            text: 'Enter your username and you will recieve an email with instructions to reset your password',
            username: '',
            err: [],
            succ: null
        }
    },
    methods: {
        validate() {
            this.err = []
            if (this.username.length == 0) {
                this.err.push('Please enter your username')
            } else {
                this.forgot_pass()
            }
        },
        forgot_pass() {
            const path = 'http://localhost:5000/api/forgotpassword/'
            axios.post(path, {
                'username': this.username
            }).then((result) => {
                console.log(result)
                if (result.data.error) {
                    console.log(result.data.error)
                    this.err.push(result.data.error)
                } else if (result.data.accepted) {
                    this.succ = "An email was sent to you!"
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>