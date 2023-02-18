<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view name="footer"></router-view>
    <router-view></router-view>
  </div>
</template>

<style lang="css" scoped>

</style>
<script>
export default {
  name: "App",
};
</script>

<style>
body{
  background-color: #f4f4f4;
}
#app {
  width: 1190px;
  margin: 0 auto;
}
.active {
  background-color: #369;
  color: #fff;
}
</style>
