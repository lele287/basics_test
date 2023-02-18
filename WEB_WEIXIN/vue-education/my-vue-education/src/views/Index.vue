<template>
  <div class="ContentArea">
    <Navigation></Navigation>
    <div class="block">
      <el-carousel height="650px">
        <el-carousel-item v-for="(item, index) in CarouselImg" :key="index">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="content">
      <div
        class="curr animate__animated animate__backInRight"
        v-show="leftMenuVisible"
      >
        <p class="curriculum">特色课程</p>
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgm8TYvgUouajSMDDCAzgy.png.webp"
          alt=""
        />
        <p class="Satisfaction">以学员满意度、以学员学习效果为本</p>
      </div>
      <div class="">
        <div class="upper" v-show="GraphicShowHide">
          <div class="animate__animated animate__backInUp">
            <img
              src="http://2.ss.faisys.com/image/materialLib/illustration/000107.jpg?v=201712181730"
              alt=""
            />
            <p>网页设计</p>
            <p>
              网页设计是根据企业希望向浏览者传递的信息（包括产品、服务、理念、文化），进行网站功能策划，然后进行的页面设计美化工作。
            </p>
          </div>
          <div class="animate__animated animate__backInUp">
            <img
              src="http://2.ss.faisys.com/image/materialLib/illustration/000107.jpg?v=201712181730"
              alt=""
            />
            <p>网页设计</p>
            <p>
              网页设计是根据企业希望向浏览者传递的信息（包括产品、服务、理念、文化），进行网站功能策划，然后进行的页面设计美化工作。
            </p>
          </div>
          <div class="animate__animated animate__backInUp">
            <img
              src="http://2.ss.faisys.com/image/materialLib/illustration/000107.jpg?v=201712181730"
              alt=""
            />
            <p>网页设计</p>
            <p>
              网页设计是根据企业希望向浏览者传递的信息（包括产品、服务、理念、文化），进行网站功能策划，然后进行的页面设计美化工作。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="advantage" v-show="CourseIntroduction">
      <div class="content">
        <div class="curr animate__animated animate__backInRight MotText">
          <p class="curriculum">教学优势</p>
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgm8TYvgUouajSMDDCAzgy.png.webp"
            alt=""
          />
          <p class="Satisfaction">以学员满意度、以学员学习效果为本</p>
        </div>
      </div>
      <div class="advantageContent">
        <div class="advantageContentText animate__animated animate__backInLeft">
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgyLry0QUo0JKiqAcw8AE4kQI.png.webp"
            alt=""
            class="externalImg"
          />
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgyrry0QUo8bCY4QYwigE4igE.png.webp"
            alt=""
            class="insideImg"
          />
          <p>专业课程</p>
          <p>上百多种专业任您挑选</p>
          <el-button type="danger" class="advantageContentButton"
            >查看详情</el-button
          >
        </div>
        <div class="advantageContentText animate__animated animate__backInLeft">
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgyLry0QUo0JKiqAcw8AE4kQI.png.webp"
            alt=""
          />
          <img
            src="http://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgy7ry0QUo9P3nqwcwigE4igE.png.webp"
            alt=""
            class="insideImg"
          />
          <p>专业课程</p>
          <p>上百多种专业任您挑选</p>
          <el-button type="danger" class="advantageContentButton"
            >查看详情</el-button
          >
        </div>
        <div
          class="advantageContentText animate__animated animate__backInRight"
        >
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgyLry0QUo0JKiqAcw8AE4kQI.png.webp"
            alt=""
          />
          <img
            src="http://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgzbry0QUotdrYywEwigE4igE.png.webp"
            alt=""
            class="insideImg"
          />
          <p>专业课程</p>
          <p>上百多种专业任您挑选</p>
          <el-button type="danger" class="advantageContentButton"
            >查看详情</el-button
          >
        </div>
        <div
          class="advantageContentText animate__animated animate__backInRight"
        >
          <img
            src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgyLry0QUo0JKiqAcw8AE4kQI.png.webp"
            alt=""
          />
          <img
            src="http://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgz7ry0QUoi4j-ogcwigE4igE.png.webp"
            alt=""
            class="insideImg"
          />
          <p>专业课程</p>
          <p>上百多种专业任您挑选</p>
          <el-button type="danger" class="advantageContentButton"
            >查看详情</el-button
          >
        </div>
      </div>
    </div>
    <div class="content">
      <div
        class="curr animate__animated animate__backInRight"
        v-show="leftMenuVisibleTo"
      >
        <p class="curriculum">明星教师</p>
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgm8TYvgUouajSMDDCAzgy.png.webp"
          alt=""
        />
        <p class="Satisfaction">以学员满意度、以学员学习效果为本</p>
      </div>
      <div class="">
        <div class="upper" v-show="GraphicShowHideTo">
          <div class="animate__animated animate__backInUp">
            <img
              src="http://2.ss.faisys.com/image/materialLib/illustration/000107.jpg?v=201712181730"
              alt=""
            />
            <p>网页设计</p>
            <p>
              网页设计是根据企业希望向浏览者传递的信息（包括产品、服务、理念、文化），进行网站功能策划，然后进行的页面设计美化工作。
            </p>
          </div>
          <div class="animate__animated animate__backInUp">
            <img
              src="http://2.ss.faisys.com/image/materialLib/illustration/000107.jpg?v=201712181730"
              alt=""
            />
            <p>网页设计</p>
            <p>
              网页设计是根据企业希望向浏览者传递的信息（包括产品、服务、理念、文化），进行网站功能策划，然后进行的页面设计美化工作。
            </p>
          </div>
          <div class="animate__animated animate__backInUp">
            <img
              src="http://2.ss.faisys.com/image/materialLib/illustration/000107.jpg?v=201712181730"
              alt=""
            />
            <p>网页设计</p>
            <p>
              网页设计是根据企业希望向浏览者传递的信息（包括产品、服务、理念、文化），进行网站功能策划，然后进行的页面设计美化工作。
            </p>
          </div>
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
      CarouselImg: [
        "https://11092584.s61i.faiusr.com/2/AD0I6ISlBRACGAAgnMXy0QUo34fdnwIwgA84igU.jpg",
        "https://11092584.s61i.faiusr.com/2/AD0I6ISlBRACGAAg_cPy0QUoivinywYwgA84igU.jpg",
      ],
      leftMenuVisible: false,
      GraphicShowHide: false,
      CourseIntroduction: false,
      leftMenuVisibleTo: false,
      GraphicShowHideTo: false,
    };
  },
  components: {
    Navigation,
    Tail,
  },
  // this.$router.push({ path: '/College' });
  methods: {
    windowScrollListener() {
      // 获取滚动条的高度
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      console.log(scrollTop);
      if (scrollTop >= 80) {
        // 利用布尔值控制元素的显隐
        this.leftMenuVisible = true;
      }
      if (scrollTop >= 300) {
        this.GraphicShowHide = true;
      }
      if (scrollTop >= 720) {
        this.CourseIntroduction = true;
      }
      if (scrollTop >= 1550) {
        this.leftMenuVisibleTo = true;
      }
      if (scrollTop >= 1800) {
        this.GraphicShowHideTo = true;
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
  height: 3000px;
}
.content {
  width: 1190px;
  margin: 0 auto;
}
.block {
  width: 100%;
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
.upper {
  display: flex;
  animation-name: backInUp;
  overflow: hidden;
}
/* animate__animated animate__backInUp */
.upper > div {
  flex: 1;
  padding: 0 10px;
}
.upper img {
  width: 100%;
}
.advantage {
  width: 100%;
  height: 776px;
  margin-top: 50px;
}
.advantageContent {
  width: 1190px;
  /* height: 100%; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
}
.advantageContentText {
  /* flex: 1; */
  margin: 0 30px;
  position: relative;
}
.advantageContentText > p {
  color: #fff;
  text-align: center;
}
.advantageContentText > p:nth-child(3) {
  font-size: 18px;
}
.externalImg {
}
.insideImg {
  position: absolute;
  top: 66px;
  left: 50px;
  z-index: 1;
}
.advantage::before {
  content: "";
  width: 99%;
  height: 776px;
  position: absolute;
  z-index: -1;
  background: url("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=134042473,622703563&fm=26&gp=0.jpg")
    no-repeat;
  background-size: cover;
  /* background-attachment: fixed; */
  -webkit-filter: blur(8px);
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(8px);
  overflow: hidden;
}


.advantageContentButton {
  width: 200px;
  background-color: #ca0000;
  border-color: #ca0000;
  margin: 0 15px;
}
.MotText{
  padding: 2px;
}
</style>
