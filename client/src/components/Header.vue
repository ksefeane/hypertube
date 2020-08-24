<template>
  <div>
      <header>
          <h1> <router-link to="/">Hypertube</router-link></h1>
          {{ title }}
      </header>
      
  </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'This is the header'
        }
    }
}
</script>