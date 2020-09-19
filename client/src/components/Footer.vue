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
  left: 0;
  bottom: 0;
  width: 100%;
  height: 20%;
  color: #0275d8;
  text-align: center;
  background-color: #fff;
  margin-top: 10px;
  padding: 10px;
  text-transform: uppercase;
}
.h6 {
  font-size: 0.5em;
}
</style>