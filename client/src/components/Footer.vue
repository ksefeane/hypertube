<template>
  <div class="footer">
    <footer>
      {{ title }}
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
  color: white;
  text-align: center;
  size: 12px;
  background-color: #5dbcd2;
  font-size: 17px ;
}
  /* left: 0;
  bottom: 0;
  width: 100%;
  color: 
  text-align: right;
  background-color: #b5afbc;
} */

</style>