<template>
  <div id="app">
      <router-view name="header"></router-view>
      <router-view v-if="isRouterAlive"></router-view>
      <router-view name="footer"></router-view> 
  </div>
</template>
<script>
export default {
  data(){
    return {
      isRouterAlive:true//控制视图是否显示的变量
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false;            //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true;         //再打开
      }) 
    }
  },
  created(){
    if (localStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem("store"))))
    }
    window.addEventListener('beforeunload',()=>{
       localStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  },
  provide(){//父组件中通过provide来提供变量，在子组件中通过inject来注入变量。 
    return {
      reload:this.reload
    }
  }

}
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }

</style>
