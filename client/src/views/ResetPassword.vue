<template>
    <div>
        <div id="err" v-for="error in err" v-bind:key="error">
            <small>{{ error }}</small>
        </div>
        <form>
            <input type="password" v-model="new_pass" placeholder="Enter new password"> <br>
            <input type="password" v-model="confirm_pass" placeholder="Confirm new password"> <br>
        </form>
        <button @click="validate_pass">Update Password</button>
        <br>
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
            }).catch((error) => {
                console.log(error)
            })
        }
    }
}
</script>
