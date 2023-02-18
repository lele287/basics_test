<template>
  <div class="virus">
    <div class="virus-logo">
      <Logo></Logo>
      <Search></Search>
      <Nav></Nav>
    </div>

    <el-image :src="yqImg1" class="yqImg"></el-image>
    <el-image :src="yqImg2" class="yqImg"></el-image>
    <el-divider style="background-color:red"></el-divider>
    <div class="searchBar" id="searchBar">
      <ul class="yq_ul">
        <li><a href="#1">国内疫情</a></li>
        <li><a href="#2">国外疫情</a></li>
        <li><a href="#3">实时播报</a></li>
      </ul>
      <ul v-show="searchBarFixed" class="isFixed">
        <li><a href="#1">国内疫情</a></li>
        <li><a href="#2">国外疫情</a></li>
        <li><a href="#3">实时播报</a></li>
      </ul>
    </div>
    <div class="tit1">
      <span><a name="1">国内疫情(数据更新至：{{overseaLastUpdateTime}})</a></span>
      <i class="first_icon el-icon-caret-bottom"></i>
    </div>
    <Internal></Internal>
    <div class="tit1">
      <span>累计确诊</span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <Diagnosis></Diagnosis>
    <div class="tit1">
      <span><a name="2">国外疫情</a></span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <Abroad></Abroad>
    <div class="tit1">
      <span>累计确诊</span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <Adiagnosis></Adiagnosis>
    <div class="tit1">
      <span><a name="3">实时播报</a></span>
      <i class="el-icon-caret-bottom"></i>
    </div>
    <News></News>
    <Prompt></Prompt>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios'
import Internal from "../components/Internal";
import Diagnosis from "../components/Diagnosis";
import Abroad from "../components/Abroad";
import Adiagnosis from "../components/Adiagnosis";
import News from "../components/News";
import Prompt from "../components/Prompt";
import Logo from "../components/Logo";
import Search from "../components/Search";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
export default {
  name: "Virus",
  data() {
    return {
      yqImg1: require("../assets/yq1.jpg"),
      yqImg2: require("../assets/yq2.jpg"),
      overseaLastUpdateTime:'',
      searchBarFixed:true
    };
  },
  components: {
    Internal,
    Diagnosis,
    Abroad,
    Adiagnosis,
    News,
    Prompt,
    Logo,
    Search,
    Nav,
    Footer
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#7dceaa");

    window.addEventListener('scroll', this.handleScroll)
  },
  methods:{
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#searchBar').offsetTop
      this.searchBarFixed = offsetTop < (scrollTop - 44) 
    },
  },
  created() {
    axios({
      url: "/yiqing",
      method: "get"
    }).then(res => {
      this.overseaLastUpdateTime = res.data.data.overseaLastUpdateTime;
      console.log(this.overseaLastUpdateTime);
      
    });

  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  },
  destroyed () {
  window.removeEventListener('scroll', this.handleScroll)
},
};
</script>

<style lang="css" scoped>
  .isFixed{
    width: 1150px;
    display: flex;
    text-align: center;
    line-height: 50px;
    position:fixed;
    top: -16px;
    background-color:rgb(235, 235, 235);
    z-index:999;
  }
  .isFixed li{
    float: left;
    flex: 1;
    font-size: 18px;
  }
  /* .isFixed li:hover{
    cursor: pointer;
  } */
  a{
    text-decoration: none;
    color: #000;
  }
ul{
  list-style: none;
}
.yq_nav{
  width: 1190px;
  height: 50px;
  /* background-color: rgb(231, 229, 229); */
  margin-bottom: 20px;
}
.yq_ul{
  width: 1150px;
  display: flex;
  text-align: center;
  line-height: 50px;
  background-color: rgb(235, 235, 235);
}
.active{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.yq_ul li{
  float: left;
  flex: 1;
  font-size: 18px;
}
.yq_ul li:hover{
  cursor: pointer;
  color: #0dc572;
}
.virus /deep/ .el-button--success {
    height: 40px;
    position: relative;
    left: 95px;
    top: 8.5px;
}
.virus /deep/ .down {
  height: 300px;
}
.virus /deep/.content-top-left dd {
  margin-top: 5px;
}
.virus /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.virus /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.virus /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.virus /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.virus /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}
.virus-logo /deep/ .logoImg {
  position: relative;
  left: 0px;
  top: 55px;
}
.virus-logo /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.virus-logo /deep/ .shopping {
  margin-top: -88px;
}
.virus-logo /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.virus-logo /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}
.virus-logo /deep/ .el-menu {
  margin-top: 40px;
}
.virus {
  width: 100%;
  margin: 0 auto;
}
.yqImg {
  margin-top: 40px;
  margin-left: 36.5px;
  box-shadow: 0px 0px 5px 2px rgb(219, 219, 219);
}
.el-divider {
  background-color: #fff;
  position: relative;
}
.tit1 {
  position: relative;
  text-align: center;
  font-size: 18px;
  color: #fff;
}
.tit1 a{
  color: #fff;
}
.el-icon-caret-bottom {
  position: relative;
  top: 20px;
  left: -45px;
}
.first_icon{
  position: relative;
  left: -195px;
}
</style>