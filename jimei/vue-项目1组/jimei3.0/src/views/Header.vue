<template>
  <div class="header">
    <div class="header_content">
    <el-menu
      router
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="/" exact>首页</el-menu-item>
      <el-menu-item index="/about">关于我们</el-menu-item>
      <el-menu-item index="/want">求购</el-menu-item>
      <el-submenu index="1">
        <template slot="title">{{userName}}</template>
          <el-menu-item index="/login" v-show="noLogin">登录</el-menu-item>
          <el-menu-item index="/register" v-show="noLogin">注册</el-menu-item>
          <el-menu-item index="/" v-show="alreadyLogin" @click="goOut">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item index.prevent="/person" exact :class="goIn==false?'is-disabled':''" v-if="goIn==false">个人中心</el-menu-item>
      <el-menu-item index="/person" exact :class="goIn==false?'is-disabled':''" v-if="goIn==true">个人中心</el-menu-item>
      <el-menu-item index.prevent="/shoppingCart" :class="goIn==false?'is-disabled':''" v-if="goIn==false">购物车</el-menu-item>
      <el-menu-item index="/shoppingCart" :class="goIn==false?'is-disabled':''" v-if="goIn==true">购物车</el-menu-item>
      <el-submenu index="2">
        <template slot="title">发布</template>
        <el-menu-item index="/releaseProduct">发布商品</el-menu-item>
        <el-menu-item index="/releaseWant">发布求购</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      userName:'欢迎您',
      noLogin:true,
      alreadyLogin:false,
      goIn:false,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    },
    goOut(){
      this.userName='欢迎您';
      this.goIn=false,
      this.noLogin=true;
      this.alreadyLogin=false;
      this.$store.state.user='';
      localStorage['userToken']='';
    }
  },
  components:{
    user(){
      return  this.$store.state.user;
    }
  },
  mounted(){
    if(this.$store.state.user.userName){
      this.userName=this.$store.state.user.userName;
      this.alreadyLogin=true;
      this.noLogin=false;
      this.goIn=true;
    }
  }
};
</script>
<style lang="css" scoped>
.header{
  width: 100%;
  height: 60px;
  background-color: #fff;
}
.header_content {
  width: 1260px;
  margin: 0 auto;
}
.el-menu--horizontal > .el-menu-item:nth-child(5),
.el-menu--horizontal > .el-menu-item:nth-child(6),
.el-menu--horizontal > .el-submenu {
  float: right;
}
</style>