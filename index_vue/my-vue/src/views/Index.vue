<template>
  <div class="home">
    <Logo></Logo>
    <Search></Search>
    <Nav></Nav>

    <div class="nav">
      <div class="section-nav">
        <ul>
          <li>全部商品分类</li>
          <li>
            <img
              src="http://img.alicdn.com/tps/i4/TB1725GSpXXXXcbaXXXwu0bFXXX.png"
              alt=""
            />

            <router-link tag="span" class="yao" to="/drugs?sort=常备用药"
              >常备用药</router-link
            >
          </li>
          <li>
            <img
              src="//img.alicdn.com/tps/i4/TB1I6uUSpXXXXaYXVXXwu0bFXXX.png"
              alt=""
            />

            <router-link tag="span" class="yao" to="/drugs?sort=专科用药"
              >专科用药</router-link
            >
          </li>
          <li>
            <img
              src="//img.alicdn.com/tps/i4/TB1a6PGSpXXXXaIXpXXwu0bFXXX.png"
              alt=""
            />

            <router-link tag="span" class="yao" to="/drugs?sort=肝病肿瘤"
              >肝病肿瘤</router-link
            >
          </li>
          <li>
            <img
              src="//img.alicdn.com/tps/i4/TB1515SSpXXXXbRXVXXwu0bFXXX.png"
              alt=""
            />

            <router-link tag="span" class="yao" to="/drugs?sort=营养保健"
              >营养保健</router-link
            >
          </li>
          <li>
            <img src="../assets/jk.png" alt="" />

            <router-link tag="span" class="yao" to="/drugs?sort=进口淘淘"
              >进口淘淘</router-link
            >
          </li>
        </ul>
      </div>

      <div class="block">
        <el-carousel trigger="click" height="400px">
          <el-carousel-item>
            <img src="https://img.zcool.cn/community/01878d59292313b5b3086ed4181ba0.jpg@1280w_1l_2o_100sh.jpg
" alt="" class="aimg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="https://img.zcool.cn/community/0165f159292333a801216a3eaaecd8.jpg@1280w_1l_2o_100sh.jpg
" alt="" class="aimg" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="https://img.zcool.cn/community/017de859292333b5b3086ed408034c.jpg@1280w_1l_2o_100sh.jpg
" alt="" class="aimg" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div v-for="(stats, index) in lists" :key="index">
      <div class="tit">
        <i class="l">{{ index + 1 }}</i>
        <i class="f">F</i>
        <div class="p1"></div>
        <p class="cb" index="index+1">{{ list[index] }}</p>
      </div>

      <div class="uls">
        <el-carousel :interval="5000" arrow="always" class="els">
          <el-carousel-item v-for="(stats, index) in stats.lists.slice(0,3)" :key="index">
            <el-image :src="stats.drugsPhoto" class="elImg"></el-image>
          </el-carousel-item>
        </el-carousel>

        <ul class="plate">
          <li
            class="plateLi"
            v-for="(stats1, index) in lists1[index]"
            :key="index"
          >
            <el-image
              :src="stats1.platePhoto"
              class="plateImg"
            ></el-image>
          </li>
        </ul>
        <ul style="width: 692px">
          <li
            v-for="(stats, index) in stats.lists.slice(4,7)"
            :key="index"
            class="lis"
            style="width: 223px; height: 238px"
          >
            <el-image
              @click.prevent="showDetail(stats.drugsId)"
              :src="stats.drugsPhoto"
              style="width: 144px; height: 144px"
              class="img"
            ></el-image>
            <span class="name">{{ stats.drugsName }}</span
            ><br />
            <span class="price">{{ stats.drugsPrice }}元</span>
          </li>
          <li
            v-for="stats in stats.lists.slice(8, 11)"
            :key="stats.drugsPhoto"
            class="lis1"
            style="width: 223px; height: 238px"
          >
            <el-image
              @click.prevent="showDetail(stats.drugsId)"
              :src="stats.drugsPhoto"
              style="width: 144px; height: 144px"
              class="img"
            ></el-image>
            <span class="name">{{ stats.drugsName }}</span
            ><br />
            <span class="price">{{ stats.drugsPrice }}元</span>
          </li>
        </ul>
        <ul style="width: 223px; float: right">
          <li

            v-for="stats in stats.lists.slice(12, 15)"
            :key="stats.drugsPhoto"
            class="lis2"
          >
            <el-image :src="stats.drugsPhoto" class="imgs"></el-image>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="div_relative">
      <div class="el_top">
      <el-backtop :bottom="60">
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
    </div>
      <div style="" class="div_absolute">
        <ul v-for="(stats,index) in lists" :key="index">
          <li @click="goNavList(index)" id="right" :class="{active: ind == index}">{{list[index]}}</li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "../components/Nav";
import Search from "../components/Search";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
export default {
  data() {
    return {
      slideList: [
        "https://img95.699pic.com/photo/40026/4013.jpg_wh300.jpg",
        "https://img95.699pic.com/photo/40026/7264.jpg_wh300.jpg",
        "https://img95.699pic.com/photo/50066/2261.jpg_wh300.jpg",
      ],
      currentIndex: 0,
      timer: "",
      list: [
        "常备用药",
        "魅力男人",
        "美丽女人",
        "关爱老人",
        "健康儿童",
        "进口淘淘",
      ],
      lists: [],
      lists1: [],
      banner: [
        {
          pImg: require("../assets/y1.png"),
        },
        {
          pImg: require("../assets/y2.png"),
        },
        {
          pImg: require("../assets/y3.png"),
        },
        {
          pImg: require("../assets/y1.png"),
        },
        {
          pImg: require("../assets/y2.png"),
        },
        {
          pImg: require("../assets/y3.png"),
        },
      ],
      stat: [
        { url: require("../assets/cb.jpg") },
        { url: require("../assets/zk.jpg") },
        { url: require("../assets/gb.jpg") },
        { url: require("../assets/bj.jpg") },
        { url: require("../assets/jk.jpg") },
      ],
      group: [
        { loopImg: require("../assets/splb1.png") },
        { loopImg: require("../assets/splb2.png") },
        { loopImg: require("../assets/splb3.png") },
        { loopImg: require("../assets/splb4.png") },
      ],
      sImg: require("../assets/timg.jpg"),
      plateImg1: require("../assets/rmpp2.png"),
      plateImg2: require("../assets/rmpp3.png"),
      plateImg3: require("../assets/rmpp4.png"),
      plateImg4: require("../assets/rmpp5.png"),
      ind:-1
    };
  },
  methods:{
    showDetail(id){
      this.$router.push('/detail?id=' +id)
    },
    goNavList(index){
        window.scrollTo(0,550 + index*570)
        this.ind = index;
    },
    changeColor(){

    },
    handleScroll(e){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      if(560<scrollTop&&scrollTop<570){
        this.ind= -1
      }else if(1130<scrollTop&&scrollTop<1140){
        this.ind= -1
      }else if(1700<scrollTop&&scrollTop<1800){
        this.ind= -1
      }else if(2270<scrollTop&&scrollTop<2370){
        this.ind= -1
      }else if(2840<scrollTop&&scrollTop<2940){
        this.ind= -1
      }else if(3410<scrollTop&&scrollTop<3510){
        this.ind= -1
      }
    }
  },
  mounted(){
    window.addEventListener('scroll',this.handleScroll)
  },
  components: {
    Nav,
    Search,
    Logo,
    Footer
  },
  created() {
    for (var i = 0; i < this.list.length; i++) {
      this.$axios
        .get("/api/productsRouter/PageRendering", {
          params: { userName: this.list[i] },
        })
        .then((res) => {
          this.lists.push({ lists: res.data.data });
        })
        .catch((err) => {
          console.log("err:", err);
        });
      this.$axios
        .get("/api/productsRouter/drugsPlate", {
          params: { userName: this.list[i] },
        })
        .then((res) => {
          this.lists1.push( res.data.data );
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  },
};
</script>

<style land="sass" scoped>
.active{
  background-color: #1adb84;
  color: #fff !important;
}
.block /deep/ .el-carousel__indicator--horizontal{
  padding: 15px 4px;
}
.uls /deep/ .el-carousel__item:nth-child(2n + 1){
   background-color: #fff;
}
.uls /deep/ .el-carousel__button{
  background-color: #c5c5c5;
}
.plate {
  width: 254px;
  height: 300px;
  margin-top: 300px;
  margin-left: -45px;
}
.plateLi {
  width: 122px;
  float: left;
  background-color: #fff;
  margin-left: 5px;
  margin-top: 5px;
}
.block {
  width: 980px;
  position: relative;
  top: -52px;
  left: 10px;
}
.block >>> .el-carousel__item {
  height: 84%;
  position: absolute;
  top: 6px;
}
.block >>> .el-carousel__indicators {
  position: relative;
  top: -90px;
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

.home {
  /* width: 100%; */
  margin-top: 0px;
}
/* .homes{
  width: 1190px;
} */
.home div {
  text-align: center;
  line-height: 36px;
  color: #fff;
}
.card >>> .el-carousel__container {
  height: 290px;
  position: relative;
  top: -6px
}
.card >>> .el-carousel__item--card {
  width: 80%;
}
.card >>> .el-carousel__item--card {
  top: 0;
  left: -185px;
  position: absolute;
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #0dc572;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
  .el-carousel, .el-carousel--horizontal ,.el-carousel--card{
    margin-top: 20px;
  }
  .contrible{
    list-style: none;
    float: left;
    width: 238px;
    text-align: center;
    position: relative;
    top: -260px;
  }
 .contrible:hover{
    cursor: pointer;
  }
  .nav{
    width: 100%;
    height: 340px;
    margin: -10px auto;
  }
  .section-nav{
    position: relative;
    left: -40px;
  }
  ul{
    list-style: none;
  }
  .nav >>> .el-carousel{
    position: relative;
    left: 200px;
    top: -340px;
  }
  .section-nav ul li{
    width: 15%;
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    background-color: #3E424C;
    color: #fff;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    padding-left: 20px;
    cursor: pointer;
}
.section-nav ul li img{
    width: 22px;
    height: 22px;
    margin-top: 8px;
    margin-left: -20px;
    margin-right: 10px;
}
.section-nav ul li:nth-child(1){
    background-color: #0dc572;
}
  .stat{
    width: 100%;
    height: 280px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  .statImgs{
    display: block;
    height: 200px;
    width: 218px;
    margin-left: 16px;
    margin-top: 65px;
    float: left;
  }
   .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .list{
    margin-top: 50px;
  }
  .tit{
    width: 80px;
    height: 30px;
    background-color: #0dc572;
    border-radius: 30px;
    margin-top: 35px;
  }
 .l{
   font-style: normal;
   font-size: 20px;
   position: relative;
   top: -3px;
   left: -10px;
 }
.f{
  font-style: normal;
  font-size: 20px;
  position: relative;
  top: -3px;
  left: 10px;
}
.p1 {
  width: 5px;
  height: 31px;
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  top: -39px;
}
.cb {
  color: #000;
  position: relative;
  top: -93px;
  left: 100px;
  font-size: 20px;
}
.uls {
  width: 1190px;
  height: 476px;
  list-style: none;
  position: relative;
  margin-top: 30px;
}
.uls ul {
  position: absolute;
  top: 0;
}
.lis {
  width: 223px;
  height: 238px;
  float: left;
  position: relative;
  top: -16px;
  left: 215px;
  background-color: #fff;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 2px;
}
 .lis1{
   width: 223px;
   height: 238px;
   float: left;
   position: relative;
   top: -16px;
   left: 215px;
   background-color: #fff;
   margin-right: 5px;
   border-radius: 2px;
 }
 .img{
   margin-top: 16px;
   margin-left: 24.5px;
   transition: all .25s ease-in;
 }
 .img:hover{
   cursor: pointer;
   transform: translateX(-10px);
 }
 .lis2{
   width:247px;
   height:157px;
   float:right;
   position:relative;
   top: -16px;
   left: 927px;
   background-color: #fff;
   margin-right: 5px;
   margin-bottom: 5px;
 }
 .imgs{
   width:124px;
   height:124px;
   margin-top:17px;
   transition: all .25s;
 }
 .imgs:hover{
   cursor: pointer;
   transform: scale(1.1);
 }
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.elImg {
  width: 250px;
  height: 300px;
  /* background-color: #8ef32f; */
}
.uls >>> .els {
  width: 250px;
  height: 300px;
  margin-top: 0px;
}
.plate1 {
  width: 122px;
  height: 85px;
  float: left;
  background-color: #fff;
  /* border-right: 1px solid #ccc; */
  position: relative;
  left: -5px;
  margin-left: 5px;
  /* margin-bottom: 5px; */
  margin-top: 5px;
}
.plate2 {
  width: 122px;
  height: 85px;
  float: left;
  background-color: #fff;
  margin-left: 5px;
  /* border-right: 1px solid #ccc; */
  position: relative;
  top: 90.5px;
  left: -259px;
  /* border-top: 1px solid #ccc; */
  margin-top: 5px;
}
.uls >>> .els ul li button {
  display: block;
  width: 20px;
}
.name {
  display: block;
  color: #000;
  width: 120px;
  height: 30px;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 这个表示要显示几行 */
  -webkit-box-orient: vertical;
}

.price {
  display: block;
  color: red;
  position: relative;
  top: -40px;
}
.card,
.el-carousel,
.el-carousel--horizontal,
.el-carousel--card {
  margin-top: 50px;
}
.div_relative /deep/ .el-backtop {
  position: fixed;
  left: 50%;
  top: 550px;
   margin-left: 622px;
   width: 50px;
   height: 50px;
}

  .plateImg{
    width: 80px;
    height: 60px;
    margin-top: 13.75px;
  }
  .yao{
    position: relative;
    top: -5px;
  }
  .menu{
    margin-top: 40px;
  }
  .div_relative {
  position: relative;
}
.div_absolute {
  position: fixed;
  top: 200px;
  left: 50%;
  background-color: #fff;
  z-index: 100;
  margin-left: 615px;
}
.div_absolute ul {
  padding: 0;
  margin: 0;
}
.div_absolute li {
  list-style: none;
  width: 40px;
  height: 40px;
  line-height: 19px;
  text-align: center;
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  padding: 8px;
  color: #333;
  letter-spacing: 1px;
}
.div_absolute .li7 {
  line-height: 40px;
}
.div_absolute .current1 {
  color: #fff !important;
  background-color: #0dc572 !important;
}
.div_absolute li:nth-child(7) {
  color: #0dc572 !important;
}
.div_absolute li img {
  width: 25px;
  height: 25px;
}
</style>
