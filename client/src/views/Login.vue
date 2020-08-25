<template>
  <div>
    <h1>{{ msg }}</h1>
    <div class="container">
        <br>
        <br>
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <form>
            <div class="form-group">
              <!-- <label for="username">Username</label> -->
              <input type="text" name="username" class="form-control" placeholder="Enter username" id />
            </div>
            <div class="form-group">
              <!-- <label for="password">Password</label> -->
              <input type="password" class="form-control" placeholder="Password" id />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-md-3"></div>
      </div>
      <hr />
      <small>
        Don't have an account?
        <router-link to="/register">Register Here!</router-link>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hypertube Log in",
    };
  },
};
</script>

<style scoped>
h1{
    color: #0275d8;
}
</style>