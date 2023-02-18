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
.abroad {
  width: 1190px;
  margin: 0 auto;
}
</style>
