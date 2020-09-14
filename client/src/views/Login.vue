<template>
    <div>
        <app-header></app-header>
        <h1>{{ msg }}</h1>
        <div class="form-field">
            <form>
                <br>
                <label for="username">Username: </label><br>
                <input type="text" name="username" v-model="username"> <br><br>
                <label for="password">password: </label><br>
                <input type="password" name="password" v-model="password"> <br><br>
            </form>
            <button @click="validate">Log in</button><br><br>
            <div id="err" v-for="error in err" v-bind:key="error">
                    <small>{{ error }}</small>
            </div>
            <hr>
            <small>login using <a href='http://localhost:5000/api/users/auth/42'>42</a> </small> | 
            <small><a href='http://localhost:5000/api/users/auth/github'>github</a> </small> <br>
            <small>Don't have an account? <router-link to="/register">Register Here!</router-link> </small> |
            <small><router-link to="/forgot-password">Forgot password?</router-link></small>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
// import router from 'vue-router';
import axios from 'axios'
import Header from "../components/Header";
import Footer from "../components/Footer";
import swal from 'sweetalert'

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer
    },
    data() {
        return {
            msg: 'Hypertube Log in',
            username: '',
            password: '',
            err: [],
            uid: ''
        }
    },
    methods: {
        validate() {
            this.err = []
            if (this.password.length < 8) {
                this.err.push('Password too short')
            } else if (this.username.length == 0) {
                this.err.push('Enter username')
            } else {
                this.login()
            }
        },
        async login() {
            let path = 'http://localhost:5000/api/users/signin/'
            let res = await axios.post(path, {
                'username': this.username,
                'password': this.password
            }).catch(e => {e})
            if (res.data.error) {
                this.err.push(res.data.error)
            } else if (res.data.success) {
                localStorage.setItem("jwt", res.data.success.token)
                localStorage.setItem('user', this.username)
                swal("", "welcome to hypertube "+this.username, "success")
                this.$router.push(`/library`)
                //this.err.push(res.data.success)
            } else {
                this.err.push('an unexpected error occured')
            }
            // axios.post(path, {
            //     'username': this.username,
            //     'password': this.password
            // }).then((result) => {
            //     console.log(result)
            //     // localStorage.setItem('user', this.username)
            //     // this.$router.push('/profile/' + this.username)
            // }).catch((error) => {
            //     console.log('We have an error')
            //     console.log(error)
            // })
            // localStorage.setItem('user', this.username)
            // this.$router.push('/profile/te')
        },
        auth() {
          //      window.location.href = 'http://localhost:5000'
        }
    }
    
}
</script>

<style scoped>
.form-field {
    /* border-style: double; */
    margin: auto;
    width: 40%;
}
h1{
    text-align: center;
}
</style>