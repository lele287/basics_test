<template>
  <div class="">
    <Navigation></Navigation>
        <div class="backImg"></div>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
export default {
  data() {
    return {};
  },
  components: {
    Navigation,
  },
  // this.$router.push({ path: '/College' });
  methods: {},
};
</script>

<style land="sass" scoped>
.backImg {
  width: 100%;
  height: 380px;
  cursor: default;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  overflow: hidden;
  display: block;
  outline: none;
  margin: 0px auto;
  position: relative;
  z-index: 1;
  background-size: cover;
  background-image: url("https://11092584.s61i.faiusr.com/2/AD0I6ISlBRACGAAglMTYvgUoopyK-AMwgA84-AI.jpg");
}
</style>
