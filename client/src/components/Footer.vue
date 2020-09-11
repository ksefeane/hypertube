<template>
  <div>
      <footer>
          <small>&#169; {{ title }}</small>
      </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title: 'children of thanos'
        }
    }
}
</script>

<style scoped>
footer {
    background-color: peru;
}
</style>