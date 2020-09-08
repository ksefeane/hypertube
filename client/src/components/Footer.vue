<template>
  <div>
      <footer>
          <h1>{{ title }}</h1>
      </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'This is the footer'
        }
    }
}
</script>

<style scoped>
footer {
    background-color: peru;
}
</style>