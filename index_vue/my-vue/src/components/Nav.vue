<template>
    <div class="menu">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#0dc572"
            text-color="#fff"
            active-text-color="#fff"  router>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="consult">窝窝心选</el-menu-item>
            <el-menu-item index="virus">疫情实况</el-menu-item>
            <el-menu-item index="nous">医学常识</el-menu-item>
            <el-menu-item index="about">关于我们</el-menu-item>
          </el-menu>
      </div>
</template>

<script>
export default {
    name:"Nav",
    data(){
        return{

        }
    },
    methods: {
    handleSelect(key, keyPath) {
    }
  },
  computed:{
    activeIndex(){
      return this.$route.path.replace('/','')
    }
  }
}
</script>

<style lang="css" scoped>
    .el-menu-demo{
  text-align: center;
  background-color: #0dc572 !important;
  /* height: 40px; */
}
.el-menu-item:hover{
background-color: #0dc572 !important;
/* color: rgb(165, 246, 252) !important; */
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
.el-menu--horizontal>.el-menu-item{
  border-bottom: none !important;
}
.el-menu-item{
  line-height: 45px;
  font-size: 18px;
  padding: 0 85px;
}
/* .menu >>> .el-menu-demo{
  height: 20px !important;
} */
.menu >>> .el-menu-item{
  height: 45px !important;
}
</style>