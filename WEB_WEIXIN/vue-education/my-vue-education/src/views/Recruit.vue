<template>
  <div class="ContentArea">
    <Navigation></Navigation>
    <div class="recruitImg"></div>
    <div class="content">
      <div>
        <div class="curr animate__animated animate__backInRight MotText">
          <p class="curriculum">教学优势</p>
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgm8TYvgUouajSMDDCAzgy.png.webp"
            alt=""
          />
          <p class="Satisfaction">以学员满意度、以学员学习效果为本</p>
        </div>
      </div>
      <div class="signUp" v-show="AdvertisementDesign">
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgncTYvgUorJ3y-AEwxgI4xgI.png.webp"
          alt=""
          class="animate__animated animate__backInLeft"
        />
        <div class="signUpText animate__animated animate__backInRight">
          <p>广告设计</p>
          <p>
            广告设计是基于计算机平面设计技术应用的基础上，随着广告行业发展所形成的一个新职业。该职业的主要特征是对图象、文字、色彩、版面、图形等表达广告的元素，结合广告媒体的使用特征，在计算机上通过相关设计软件来为实现表达广告目的和意图，所进行平面艺术创意的一种设计活动或过程。
          </p>
          <p>招生对象：初中生、高中生</p>
          <p>专业学制：两年半——四年</p>
          <p>报名时间：2016年8月10—8月10日</p>
          <p>开学时间：2016年9月23—8月30日</p>
          <el-button type="danger" class="advantageContentButton" @click="onlineRegistration"
            >在线报名</el-button
          >
        </div>
      </div>
      <div>
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAg-KHavgUojNmN8wEwsAk4FA.png.webp"
          alt=""
        />
      </div>
      <div class="signUp" v-show="HumanResources">
        <div class="signUpText animate__animated animate__backInLeft">
          <p>人力资源</p>
          <p>
            人力资源（Human Resources
            ，简称HR）指在一个国家或地区中，处于劳动年龄、未到劳动年龄和超过劳动年龄但具有劳动能力的人口之和。或者表述为：一个国家或地区的总人口中减去丧失劳动能力的人口之后的人口。
          </p>
          <p>招生对象：初中生、高中生</p>
          <p>专业学制：两年半——四年</p>
          <p>报名时间：2016年8月10—8月10日</p>
          <p>开学时间：2016年9月23—8月30日</p>
          <el-button type="danger" class="advantageContentButton" @click="onlineRegistration"
            >在线报名</el-button
          >
        </div>
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgm8TYvgUosfSvuwIwxgI4xgI.png.webp"
          alt=""
          class="animate__animated animate__backInRight"
        />
      </div>
      <div>
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAg-KHavgUojNmN8wEwsAk4FA.png.webp"
          alt=""
        />
      </div>
      <div class="signUp" v-show="ElectronicCommerce">
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgmcTYvgUovKSKwwcwxgI4xgI.png.webp"
          alt=""
          class="animate__animated animate__backInLeft"
        />
        <div class="signUpText animate__animated animate__backInRight">
          <p>电子商务</p>
          <p>
            电子商务是以信息网络技术为手段，以商品交换为中心的商务活动；也可理解为在互联网（Internet）、企业内部网（Intranet）和增值网（VAN，Value
            Added
            Network）上以电子交易方式进行交易活动和相关服务的活动，是传统商业活动各环节的电子化、网络化、信息化。
          </p>
          <p>招生对象：初中生、高中生</p>
          <p>专业学制：两年半——四年</p>
          <p>报名时间：2016年8月10—8月10日</p>
          <p>开学时间：2016年9月23—8月30日</p>
          <el-button
            type="danger"
            class="advantageContentButton"
            @click="onlineRegistration"
            >在线报名</el-button
          >
        </div>
      </div>
    </div>
    <Tail></Tail>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Tail from "../components/Tail";
export default {
  data() {
    return {
      AdvertisementDesign: false,
      HumanResources: false,
      ElectronicCommerce: false,
    };
  },
  components: {
    Navigation,
    Tail,
  },
  // this.$router.push({ path: '/College' });
  methods: {
    onlineRegistration() {
      // this.$router.replace("/recruit/onlineRegistration");
      this.$router.push("/onlineRegistration");
    },
    windowScrollListener() {
      // 获取滚动条的高度
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      console.log(scrollTop);
      if (scrollTop >= 80) {
        // 利用布尔值控制元素的显隐
        this.AdvertisementDesign = true;
      }
      if (scrollTop >= 470) {
        this.HumanResources = true;
      }
      if (scrollTop >= 920) {
        this.ElectronicCommerce = true;
      }
    },
  },
  created() {
    // 给窗口绑定滚动监听事件
    window.addEventListener("scroll", this.windowScrollListener);
  },
  destroyed() {
    // 移除事件监听
    window.removeEventListener("scroll", this.windowScrollListener);
  },
};
</script>

<style land="sass" scoped>
.ContentArea {
  width: 100%s;
  height: 2000px;
}
.content {
  width: 1190px;
  margin: 0 auto;
}
.recruitImg {
  width: 100%;
  height: 380px;
  cursor: default;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  overflow: hidden;
  display: block;
  outline: none;
  margin: 0px auto;
  position: relative;
  z-index: 1;
  background-size: cover;
  background-image: url("https://11092584.s61i.faiusr.com/2/AD0I6ISlBRACGAAglcTYvgUo-u7-sQMwgA84-AI.jpg");
}
.curr > img {
  display: block;
  margin: 0 auto;
}
.curriculum {
  font-size: 50px;
  color: #353535;
  text-align: center;
}
.Satisfaction {
  font-size: 18px;
  color: #777777;
  text-align: center;
}
.advantageContentButton {
  width: 140px;
  background-color: #ca0000;
  border-color: #ca0000;
  margin-top: 10px;
}
.signUp {
  display: flex;
  padding: 50px 10px;
}

.signUpText {
  margin-left: 50px;
}
.signUpText > p {
  color: #666;
  margin: 4px 0;
  line-height: 26px;
}
.signUpText > p:nth-child(1) {
  font-size: 24px;
  margin: 0;
}
.signUpText > p:nth-child(2) {
  line-height: 28px;
  margin-bottom: 30px;
}
</style>
