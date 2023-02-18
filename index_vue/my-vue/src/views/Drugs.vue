<template>
  <div class="drugs">
    <!-- <Footer></Footer> -->
    <div class="top_drugs">
      <Logo></Logo>
      <Search></Search>
    </div>
    <div class="el_menu">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#0dc572"
        text-color="#fff"
      >
        <el-submenu index="3">
          <template slot="title">全部商品分类</template>
          <el-menu-item index="常备用药">常备用药</el-menu-item>
          <el-menu-item index="专科用药">专科用药</el-menu-item>
          <el-menu-item index="肝病肿瘤">肝病肿瘤</el-menu-item>
          <el-menu-item index="营养保健">营养保健</el-menu-item>
          <el-menu-item index="进口淘淘">进口淘淘</el-menu-item>
        </el-submenu>
      </el-menu>
      <router-link class="router-nav" to="/">首页</router-link>
      <router-link class="router-nav" to="/consult">健康咨询</router-link>
      <router-link class="router-nav" to="/virus">疫情实况</router-link>
      <router-link class="router-nav" to="/nous">医学常识</router-link>
      <router-link class="router-nav" to="/about">关于我们</router-link>
    </div>
    <div class="navxian"></div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>您现在的位置:</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ lyParameter }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="NoData" v-if="this.dataes.length == 0">
      没有搜索到内容哦！！！
    </div>
    <ul class="drugs-ul">
      <router-link
        tag="li"
        to="/drugs"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <img
          @click.prevent="showBrandList(item.drugsId)"
          :src="item.drugsPhoto"
          alt=""
          class="drugsImg"
        />
        <span>{{ item.drugsPrice }}元</span>
        <p>{{ item.drugsIntroduce }}</p>
        <div @click.prevent="showBrandList(item.drugsId)" class="drugs-ul-div">
          查看详情
        </div>
      </router-link>
    </ul>
    <div class="clears"></div>

    <ul class="page">
      <li v-for="index in pageCount" @click="setPageIndex(index)" :key="index">
        {{ index }}
      </li>
    </ul>

    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Search from "../components/Search";
export default {
  data() {
    return {
      bId: "",
      Searchs: "",
      drugsIdNode: false,
      dataes: [],
      lyParameter: "",
      activeIndex2: "1",
      pageSize: 12,
      pageCount: 0,
      dataList: [],
    };
  },
  methods: {
    showBrandList(id) {
      // alert(id)
      this.$router.push("/detail?id=" + id);
    },
    handleSelect(key, keyPath) {
      var search = key;
      this.lyParameter = key;
      this.$router.push("/drugs?sort=" + key);
      this.$axios
        .get("/api/productsRouter/getproducts", { params: { key: search } })
        .then((res) => {
          this.dataes = res.data.data;
          this.pageCount = Math.ceil(this.dataes.length / this.pageSize);
          this.setPageIndex(1);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    setPageIndex(index) {
      this.dataList = [];
      for (
        let i = (index - 1) * this.pageSize;
        i < index * this.pageSize;
        i++
      ) {
        if (this.dataes[i]) {
          this.dataList.push(this.dataes[i]);
        }
      }
    },
  },
  created() {
    this.bId = this.$route.query.sort; //获取路由传参，赋值属性
    this.Searchs = this.$route.query.searchs; //获取路由传参，赋值属性
    if (this.bId) {
      // var search = decodeURI(location.search).slice(1).split("=")[1];
      var search = this.$route.query.sort;
      this.lyParameter = search;
      this.$axios
        .get("/api/productsRouter/getproducts", { params: { key: search } })
        .then((res) => {
          // console.log("res:", res);
          this.dataes = res.data.data;
          this.pageCount = Math.ceil(this.dataes.length / this.pageSize);
          this.setPageIndex(1);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    } else if (this.Searchs) {
      this.lyParameter = this.Searchs;
      this.$axios
        .get("/api/productsRouter/query", {
          params: { userName: this.Searchs },
        })
        .then((res) => {
          // console.log("res:", res);
          this.dataes = res.data.data;
          this.pageCount = Math.ceil(this.dataes.length / this.pageSize);
          this.setPageIndex(1);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    } else {
      alert(33);
    }
  },
  watch: {
    //路由监听器
    $route(to, from) {
      this.bId = this.$route.query.sort;
      console.log(this.bId);
    },
  },
  computed: {
    activeIndex() {
      return this.$route.path.replace("/", "");
    },
  },
  components: {
    Footer,
    Logo,
    Search,
  },
};
</script>
<style lang="scss" scoped>
.page {
  width: 300px;
  height: 20px;
  margin: 30px auto;
  list-style: none;
}
.page li {
  width: 30px;
  height: 30px;
  float: left;
  margin-left: 50px;
  text-align: center;
  background-color: #fff;
  line-height: 30px;
  border: 1px solid #ccc;
}
.page li:hover {
  cursor: pointer;
  color: #0dc572;
}
.drugs /deep/ .down {
  height: 300px;
}
.drugs /deep/.content-top-left dd {
  margin-top: 5px;
}
.drugs /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.drugs /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.drugs /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.drugs /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.drugs /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}

.top_drugs /deep/ .el-button--success {
  height: 40px;
  position: relative;
  left: 95px;
  top: 8.5px;
}
.top_drugs /deep/ .logoImg {
  position: relative;
  left: 0px;
}
.top_drugs /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.top_drugs /deep/ .shopping {
  margin-top: -88px;
}
.top_drugs /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.top_drugs /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}

.el_menu {
  margin-top: 20px;
}
.el-menu-demo {
  text-align: center;
  margin: 20px 5px;
  width: 200px;
  height: 40px;
  float: left;
  border-radius: 20px 20px 0px 0px;
}
.el-submenu {
  width: 200px;
  height: 40px;
  border-radius: 20px 20px 0px 0px;
}
.el-menu-item {
  font-size: 14px;
}
.el-breadcrumb {
  margin-left: 15px;
  font-size: 12px;
}
/deep/ .el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
  border-bottom: 2px solid #0dc572 !important;
  border-radius: 20px 20px 0px 0px;
}
.router-nav {
  position: relative;
  top: 36px;
  margin-left: 70px;
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 14px;
}
.router-nav:hover {
  color: #0dc572;
}
.navxian {
  clear: both;
  width: 100%;
  height: 2px;
  background-color: #0dc572;
  position: relative;
  top: -19px;
  margin: 0 5px;
}
.drugs {
  width: 1190px;
  margin-top: 10px;
}
.drugs-ul {
  list-style: none;
  padding-left: 0;
}
.drugs-ul li {
  float: left;
  width: 277px;
  height: 380px;
  // border: 1px solid #ccc;
  margin: 10px;
  background-color: #fff;
}
.drugs-ul li:hover {
  cursor: pointer;
  box-shadow: 0px 0px 8px 3px #ccc;
}
.drugs-ul li img {
  width: 250px;
  height: 250px;
  margin: 10px 13px;
}
.drugs-ul li span {
  display: block;
  margin: 0px 20px;
  color: #f40;
  font-size: 16px;
  font-weight: 700;
}
.drugs-ul li p {
  font-size: 14px;
  display: block;
  color: #000;
  width: 216px;
  height: 20px;
  margin: 4px 23px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 这个表示要显示几行 */
  -webkit-box-orient: vertical;
}
.drugs-ul-div {
  margin: 20px auto;
  border: 2px solid #999;
  border-radius: 3px;
  text-align: center;
  width: 100px;
  height: 25px;
  line-height: 25px;
  color: #999;
  font-size: 14px;
}
.drugs-ul-div:hover {
  border: 2px solid #0dc572;
  color: #0dc572;
}
.clears {
  clear: both;
}
// .drugsImg:hover{
//   cursor: pointer;
//   box-shadow: 5px 5px 10px #ccc;
// }
.NoData {
  font-size: 24px;
  color: #f00;
  width: 100%;
  height: 1000px;
  margin: 100px 0;
  text-align: center;
}
</style>