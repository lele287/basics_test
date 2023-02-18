<template>
  <div id="app">
    <div id="nav">
      <router-link tag="button" to="/" active-class="active" exact>Home</router-link> |
      <router-link  tag="button" to="/about" active-class="active">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
.active {
  background-color: #90b;
  color: #fff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
