<template>
    <div>
        <div id="err" v-for="error in errors" v-bind:key="error">
            <small>{{ error }}</small>
        </div>
        <div id="succ" v-for="suc in succ" v-bind:key="suc">
            <small>{{ suc }}</small>
        </div>
        <form>
            <input type="password" v-model="new_pass" placeholder="Enter new password"> <br>
            <input type="password" v-model="confirm_pass" placeholder="Confirm new password"> <br>
        </form>
        <button @click="validate">Update Password</button>
        <hr>
        <br>
        <hr>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            new_pass: '',
            confirm_pass: '',
            errors: [],
            succ: [],
            token: this.$route.params.id,
        }
    },
    methods: {
        validate: function() {
            this.errors = []
            if (this.new_pass.length < 5) {
                this.errors.push('Password short')
            }
            if (this.new_pass != this.confirm_pass) {
                this.errors.push('Passwords do not match')
            }
            if (this.errors.length == 0) {
                this.reset()
            }
        },
        reset() {
            const path = 'http://localhost:5000/api/forgotpassword/' + this.token
            axios.post(path, {
                'password': this.new_pass
            }).then((result) => {
                console.log(result)
                if (result.data.error) {
                    this.errors.push("Invalid token")
                } else if (result.data.success) {
                    this.succ.push("Password changed successfully! You will be redirected to login")
                    setTimeout(() => {this.$router.push('/login')}, 6000)
                }
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
