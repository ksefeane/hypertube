<template>
    <div>
        {{ msg }}
        <div class="form-field">
            <form>
                <label for="username">Username: </label>
                <input type="text" name="username" id=""> <br>
                <label for="password">password: </label>
                <input type="password" name="password" id=""> <br>
                <button type="submit">Log in</button>
            </form>
            <hr>
            <small>Don't have an account? <router-link to="/register">Register Here!</router-link> </small>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'Log in'
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