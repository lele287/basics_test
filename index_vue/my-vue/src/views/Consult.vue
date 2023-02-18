<template>
  <div class="consult">
    <Logo></Logo>
    <Search></Search>
    <Nav></Nav>
    <el-backtop style="width: 50px; height: 50px" :bottom="60">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #0dc572;
            border-radius: 50%;
          }
        "
      >
        Top
      </div>
    </el-backtop>
    <div class="block">
      <el-carousel trigger="click" height="600px">
        <el-carousel-item>
          <img
            src="https://img.zcool.cn/community/01819c5929228ca801216a3e014842.jpg@1280w_1l_2o_100sh.jpg"
            alt=""
            class="aimg"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="https://img.zcool.cn/community/01464f592922bba801216a3e177fcc.jpg@1280w_1l_2o_100sh.jpg

"
            alt=""
            class="aimg"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="https://img.zcool.cn/community/01601d592922e9a801216a3e2d410c.jpg@1280w_1l_2o_100sh.jpg


"
            alt=""
            class="aimg"
          />
        </el-carousel-item>
        <el-carousel-item>
          <img
            src="https://img.zcool.cn/community/015759592922a6b5b3086ed4ae97f5.jpg@1280w_1l_2o_100sh.jpg
"
            alt=""
            class="aimg"
          />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="Branch" v-for="(stats, index) in list" :key="index">
      <h2 class="category">——&nbsp; &nbsp;{{ names[index] }}&nbsp; &nbsp;——</h2>
      <!-- <p>{{ stats.list[index].drugsName }}</p> -->
      <div
        class="External"
        v-for="(stats, index) in stats.list.slice(0, 10)"
        :key="index"
      >
        <ul>
          <li @click="showBrandList(stats.drugsId)" style="cursor: pointer">
            <img :src="stats.drugsPhoto" alt="" />
          </li>
          <li>{{ stats.drugsName }}</li>
          <li>{{ stats.drugsPrice }}元</li>
        </ul>
      </div>
    </div>
    <!-- <Footer></Footer> -->
    
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Search from "../components/Search";
import Nav from "../components/Nav";
export default {
  data() {
    return {
      names: ["专科用药", "呼吸科", "皮肤科", "糖尿病", "五官科", "泌尿科"],
      list: [],
      scroll: "",
    };
  },
  methods: {
    showBrandList(id) {
      this.$router.push("/detail?id=" + id);
    },
  },
  components: {
    Footer,
    Logo,
    Search,
    Nav,
  },
  beforeMount() {
    for (var i = 0; i < this.names.length; i++) {
      this.$axios
        .get("/api/productsRouter/PageRendering", {
          params: {
            userName: this.names[i],
          },
        })
        .then((res) => {
          // console.log("res:", res);
          this.list.push({ list: res.data.data });
          // this.list.sort(this.list.length-1,1);
          // console.log(this.list);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  },
};
</script>

<style lang="css" scoped>
.consult{
  position: relative;
}
.consult /deep/ .el-backtop {
  position: fixed;
  left: 50%;
  top: 550px;
   margin-left: 622px;
   width: 50px;
   height: 50px;
}
.consult /deep/ .el-carousel__button{
  background-color: #c5c5c5;
}
.consult /deep/ .el-carousel__container{
  height: 400px !important;
  margin-top: 10px;
}
.consult /deep/ .article{
  margin-top: -43px;
}
.logo{
  margin-top: 50px;
}
.consult /deep/ .el-menu {
  margin-top: 40px;
}
.consult /deep/ .el-carousel__item {
  height: 100%;
}
.consult /deep/ .el-carousel__arrow {
  position: absolute;
  top: 50%;
}
.consult /deep/ .el-carousel__indicators--horizontal {
  bottom: 0px;
}
.Branch {
  margin-top: 5px;
}
/* 搜索 */
.consult /deep/ .logoImg {
  position: relative;
  left: 0px;
  top: 12px;
}
.consult /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -116px;
}
.consult /deep/ .shopping {
  margin-top: -88px;
}
.consult /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.consult /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}
.el-input >>> .el-input__inner {
  position: relative;
}
.consult >>> .el-button--success {
  height: 40px;
  position: relative;
  left: 97px;
  top: 8.5px;
  /* background-color: #000; */
}

.consult {
  position: relative;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.aimg {
  width: 100%;
  height: 100%;
}
.External {
  width: 20%;
  height: 262px;
  float: left;
}
.External ul {
  height: 250px;
  padding: 0;
  margin: 10px 5px;
  /* margin-right: 10px; */
  background-color: #fff;
  list-style: none;
  transition: all 0.25s ease-in;
}
.External ul:hover {
  box-shadow: 1px 3px 5px 1px #ddd;
  transform: translateY(-3px);
}
.External li:nth-child(2) {
  height: 50px;
  padding-left: 10px;
  font-size: 12px;
  font-family: tahoma, arial, 宋体;
  color: #666;
  line-height: 1.5;
  height: 36px;
}
.External li:nth-child(3) {
  padding-left: 10px;
  /* margin-bottom: 10px; */
  font-size: 12px;
  color: #c00;
  font-weight: 700;
  font-family: verdana, arial;
}
.External img {
  width: 160px;
  height: 160px;
  margin: 10px 34px;
}
.category {
  clear: both;
  width: 300px;
  margin: 0 auto;
  margin-bottom: -10px;
  text-align: center;
  line-height: 70px;
  color: #575859;
  font-weight: 500;
  font-size: 24px;
}

/* 电梯导航 */

.circle {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -52px;
}
.circle li {
  float: left;
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  margin: 0 10px;
  border-radius: 50%;
  cursor: pointer;
}
.current {
  background-color: #fff;
}

/* 尾 */
.footer {
  width: 100%;
  height: 300px;
  background-color: rgb(245, 245, 245);
  text-align: center;
  color: rgb(0, 0, 0);
  border-top: 1px solid #ccc;
  position: absolute;
  left: 0;
  /* top: 0; */
  right: 0;
  bottom: -900px;
  /* top: 1400px; */
}
</style>