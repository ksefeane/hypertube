<template>
  <div class="footer">
      <footer>
          <h6>{{ title }}</h6>
      </footer>
  </div>
</template>

<script>
export default {
    data() {
        return {
            title: '© Hypertube 2020'
        }
    }
}
</script>
<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f7f7f7;
  color: #0275d8;
  text-align: right;
  font-size: 12px;
  /* size: 10px; */
}

</style>
