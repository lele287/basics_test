<template>
  <div class="">
    <div class="webHeaderTd">
      <div class="left">职业技术学校</div>
      <div class="rigth">
        <el-menu
          mode="horizontal"
          router
        >
          <el-menu-item index="/" v-bind:class="[this.$route.path=='/'?'Select':'']">首页 </el-menu-item>
          <el-menu-item index="Introduce" v-bind:class="[this.$route.path=='/Introduce'?'Select':'']">学院介绍</el-menu-item>
          <el-menu-item index="Info" v-bind:class="[this.$route.path=='/Info'?'Select':'']">校园资讯</el-menu-item>
          <el-menu-item index="Recruit" v-bind:class="[this.$route.path=='/Recruit'?'Select':'']">招生专栏</el-menu-item>
          <el-menu-item index="Cooperation" v-bind:class="[this.$route.path=='/Cooperation'?'Select':'']">校企合作</el-menu-item>
          <el-menu-item index="Message" v-bind:class="[this.$route.path=='/Message'?'Select':'']">在线留言</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      
    };
  },
  methods: {
  
  },
  created(){
    // console.log(this.$route.path);
  },
};
</script>

<style land="sass" scoped>
.home {
  color: #90b;
}
.webHeaderTd{
  width: 1190px;
  height: 120px;
  margin: 0  auto;
  display: flex;
  align-items: center;
}
.el-menu,.el-menu--horizontal {
  border-bottom: solid 1px transparent;
}
.left{
  flex: 1.3;
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  color: #ca0000;
}
.rigth{
  flex: 2;
}
.Select{
  border-bottom-color: rgb(196, 0, 0)!important ; 
  color: rgb(196, 0, 0)!important ;
}
</style>
