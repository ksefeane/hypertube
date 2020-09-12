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
      title: "© children of thanos 2020",
    };
  },
};
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  color: #0275d8;
  text-align: right;
  background-color: #b5afbc;
}
.h6 {
  font-size: 0.5em;
}
</style>