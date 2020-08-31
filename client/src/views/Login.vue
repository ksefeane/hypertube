<template>
    <div>
        {{ msg }}
        <div class="form-field">
            <form>
                <label for="username">Username: </label>
                <input type="text" name="username" v-model="username"> <br>
                <label for="password">password: </label>
                <input type="password" name="password" v-model="password"> <br>
            </form>
            <button @click="validate">Log in</button>
            <hr>
            <small>Don't have an account? <router-link to="/register">Register Here!</router-link> </small>
        </div>
    </div>
</template>

<script>
// import router from 'vue-router';

export default {
    data() {
        return {
            msg: 'Log in',
            username: '',
            password: '',
            err: [],
            uid: ''
        }
    },
    methods: {
        validate() {
            if (this.password.length < 8) {
                this.err.push('Password short')
            } else {
                localStorage.setItem('user', this.username)
                this.$router.push('/profile/' + this.username)
            }
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
</style>