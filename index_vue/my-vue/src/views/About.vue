<template>
  <div class="about">
    <Logo></Logo>
    <Search></Search>
    <Nav></Nav>
    <el-row :gutter="10" class="el-tit">
      <el-col :xs="24"
        ><el-divider><div class="about-gywm">关于我们</div></el-divider></el-col
      >
      <el-col :xs="24" :md="12">
        <div>
          <div class="about-gywm1">发展历史</div>
          <div class="dsj"></div>
          <div class="about-gywm2"><img src="../assets/a1.jpg" alt="" /></div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <div>
          <div class="about-gywm3">
            本网站是一款生活消费类的网站，主要的特色是卖各种类别的药品，对于大众关于生病的情况可以向专家提问，询问病因，对症下药。
            网站也提供了医学常识，供大家参考！
            也对于现在的疫情状况提供了实时新闻，可以随时关注疫情的变化。
            本网站的药品分类多，药品齐全，大家可以放心购买。
          </div>
          <!-- <div class="about-gywm1 gywm4">了解更多</div> -->
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="about2" style="margin-left: 0; margin-right: 0">
      <el-col :span="24">
        <div>
          <div class="about-gywm1 gywm5">品牌文化</div>
          <div class="dsj dsj1"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="about-gywm3 gywm6">
            团队宗旨：团结和谐，创建一个属于我们的品牌<br>
            人生之路的坎坎坷坷都是为我们的成长过程设置的。无论是高山峻岭，还是绵延长河，
            是晴空万里还是风起云涌，是令我们心旷神怡，还是使我们残缺抱憾，无论什么，只要用心去经历了，
            便在我们的生命空间留下值得永恒的纪念。
          </div>
          <!-- <div class="about-gywm1 gywm7">了解更多</div> -->
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <div class="about-gywm2">
            <img class="gywm8" src="../assets/a2.jpg" alt="" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="about3" style="margin-left: 0; margin-right: 0">
      <el-col :span="24">
        <div>
          <div class="about-gywm1 gywm9">我的团队</div>
          <div class="dsj dsj2"></div>
        </div>
      </el-col>
      <!-- <el-col :span="12"> -->
        <ul class="content4">
                <li>
                    <img src="../assets/toux5.jpeg" alt="">
                    <!-- <div class="hide">
                        <div class="photo3">
                            <span class="school">大庆师范学院</span>
                        </div>
                        <div class="photo-top"></div>
                    </div> -->
                    <span class="name">王婉冰</span>
                </li>
                <li>
                    <img src="../assets/toux6.jpg" alt="">
                    <!-- <div class="hide">
                        <div class="photo4">
                            <span class="school">常熟理工学院</span>
                        </div>
                        <div class="photo-top"></div>
                    </div> -->
                    <span class="name">胡晔</span>
                </li>
                <li>
                    <img src="../assets/toux3.jpeg" alt="">
                    <!-- <div class="hide">
                        <div class="photo5">
                            <span class="school">商丘学院</span>
                        </div>
                        <div class="photo-top"></div>
                    </div> -->
                    <span class="name">吕康乐</span>
                </li>
                <li>
                    <img src="../assets/tooux4.jpg" alt="">
                    <!-- <div class="hide">
                        <div class="photo6">
                            <span class="school">商丘学院</span>
                        </div>
                        <div class="photo-top"></div>
                    </div> -->
                    <span class="name">蔡东</span>
                </li>
            </ul>
      <!-- </el-col> -->
    </el-row>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from "../components/Footer";
  import Nav from "../components/Nav";
  import Logo from "../components/Logo";
  import Search from "../components/Search";
  export default {
  components: {
    Footer,
    Nav,
    Logo,
    Search
  }
};
</script>
<style lang="css" scoped>

ul{
  list-style: none;
}
.content4{
  height: 200px;
}
.content4 p{
    font-size: 25px;
    text-align: center;
    margin-top: 20px;
}
.content4 img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    margin-left: 95px;
    margin-top: 25px;
    position: relative;
}
.photo-top{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    float: left;
    background-color: rgb(218, 218, 218);
    margin-top: 25px;
    opacity: 0.3;
    margin-left: -100px;
}
.name{
    font-size: 18px;
    float: left;
    line-height: 150px;
    padding-left: 15px;
}

.about /deep/ .el-button--success {
    height: 40px;
    position: relative;
    left: 95px;
    top: 8.5px;
}
.about /deep/ .logoImg {
position: relative;
left: 0px;
}
.about /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px ;
}
.about /deep/ .shopping{
  margin-top: -88px;
}
.about /deep/ .shopping span{
  position: relative;
  bottom: 9px;
}
.about /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}

.about /deep/ .down{
  height: 300px;
}
.about /deep/.content-top-left dd{
   margin-top: 5px;
}
.about /deep/.content-middle-left p:nth-child(2){
    margin-left: 140px;
    margin-top: -55px;
    color: #8ef32f;
}
.about /deep/.content-middle-left p:nth-child(3){
    margin-left: 181px;
    margin-top: 19px;
    color: #8ef32f;
    font-size: 15px;
}
.about /deep/ .wbs{
    position: absolute;
    bottom: -65px;
    right: 41px;
}
.about /deep/ .ddimg span{
    position: relative;
    top: 80px;
    left: 12px;
}
.about /deep/ .wb{
    position: absolute;
    bottom: -65px;
    right: 134px;
}

.about /deep/ .el-menu{
  position: relative;
  top: 40px;
}
.el-tit{
  margin-top: 60px;
}
dd{
   font-size: 12px;
   color: rgb(0, 0, 0);
   text-align: left;
   margin-top: 5px;
   margin-left: 84px;
   cursor: pointer;
}
/* .about {
  background-color: #fff;
  width: 100%;
  margin-top: 30px;
} */
.el-divider--horizontal {
  margin: 70px 0px;
  height: 2px;
}
.about-gywm {
  color: #333;
  font-size: 38px;
  letter-spacing: 5px;
  margin: 20px 10px;
}
.about-gywm1 {
  width: 200px;
  height: 60px;
  background-color: #0dc572;
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  line-height: 60px;
  margin: 0px 40px;
}
.about-gywm2 img {
  width: 540px;
  height: 200px;
  margin: 20px 40px;
}
.about-gywm3 {
  padding: 34px;
  padding-top: 138px;
  font-size: 14px;
  color: #000;
  letter-spacing: 3px;
  line-height: 25px;
}
.gywm4 {
  width: 180px;
  height: 50px;
  line-height: 50px;
  margin: 3px 373px;
  background-color: #7adfb2;
}
.gywm5 {
  margin: 30px auto;
}
.about2 {
  background-color: #e5edf8;
  width: 100%;
}
.gywm6 {
  padding-top: 20px;
}
.gywm7 {
  width: 180px;
  height: 50px;
  line-height: 50px;
  margin-top: 0px;
  background-color: #7adfb2;
}
.about-gywm2 .gywm8 {
  margin: 20px 10px;
}
.about3 {
  background-color: #fff;
  width: 100%;
}
.gywm9 {
  margin-left: 945px;
  margin-top: 30px;
}
.dsj {
  width: 0;
  height: 0;
  border: 10px solid #0dc572;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  position: relative;
  left: 185px;
  top: 0px;
}
.dsj1 {
  top: -30px;
  left: 630px;
}
.dsj2 {
  left: 1090px;
}
</style>