<template>
  <div class="mess_detail">
    <Logo></Logo>
    <Search></Search>
    <div class="nav">
      <ul class="style">
        <router-link tag="li" to="/nous">
          <div class="news_index">
            <div>
              <b>常识</b>
            </div>
            <div>
              <b>首页</b>
            </div>
          </div>
        </router-link>
        <li>
          <div>
            <b>保</b>
          </div>
          <div>
            <b>健</b>
          </div>
        </li>
        <li @click.prevent="changeType('老人')" class="hovers">老人</li>
        <li @click.prevent="changeType('母婴')" class="hovers">母婴</li>
        <li @click.prevent="changeType('家庭')" class="hovers">家庭</li>
        <li @click.prevent="changeType('健康用药')" class="hovers">健康用药</li>
      </ul>
      <ul class="style">
        <li>
          <div>
            <b>诊</b>
          </div>
          <div>
            <b>疗</b>
          </div>
        </li>
        <li @click.prevent="changeType('内科')" class="hovers">内科</li>
        <li @click.prevent="changeType('外科')" class="hovers">外科</li>
        <li @click.prevent="changeType('皮肤科')" class="hovers">皮肤科</li>
        <li @click.prevent="changeType('五官科')" class="hovers">五官科</li>
      </ul>
      <ul class="style">
        <li>
          <div>
            <b>减</b>
          </div>
          <div>
            <b>肥</b>
          </div>
        </li>
        <li @click.prevent="changeType('常识')" class="hovers">常识</li>
        <li @click.prevent="changeType('饮食')" class="hovers">饮食</li>
        <li @click.prevent="changeType('运动')" class="hovers">运动</li>
        <li @click.prevent="changeType('医学减肥')" class="hovers">医学减肥</li>
      </ul>
      <ul class="style">
        <li>
          <div>
            <b>美</b>
          </div>
          <div>
            <b>容</b>
          </div>
        </li>
        <li @click.prevent="changeType('护肤')" class="hovers">护肤</li>
        <li @click.prevent="changeType('化妆')" class="hovers">化妆</li>
        <li @click.prevent="changeType('整型')" class="hovers">整型</li>
        <li @click.prevent="changeType('美容食谱')" class="hovers">美容食谱</li>
      </ul>
    </div>
    <div class="content">
      <div class="left">
        <div>
          <span class="l">
            <img src="https://img95.699pic.com/xsj/06/hn/y7.jpg!/fh/300" />
            <div class="pic">6大行为会吃掉免疫力 如何增强免疫力</div>
          </span>
          <span class="r">
            <h3 style="color:#0dc572;text-align:center">精选文章</h3>
            <hr class="title" />
            <div v-for="(ntit,id) in news.slice(7,9)" :key="id">
              <h4 class="myactive" @click.prevent="changeId(ntit.newId)">{{ntit.newsTitle}}</h4>
              <p class="hideContent">{{ntit.newsContent}}</p>
            </div>
          </span>
        </div>
        <ul>
          <li v-for="(ntit2,id) in news.slice(0,6)" :key="id" class="hideTitle">
            <b>【{{ntit2.newsTypeDetail}}】</b>
            <span class="tip" @click.prevent="changeId(ntit2.newId)">{{ntit2.newsTitle}}</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <h3>
          <span>文章推荐</span>
          <i class="icon_news"></i>
        </h3>
        <ul class="rank">
          <li v-for="(ntit3,id) in news.slice(2,9)" :key="id" class="hideTitle2">
            <span class="icon_top">{{id+1}}</span>
            <span @click.prevent="changeId(ntit3.newId)" class="tip">{{ntit3.newsTitle}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="loopPic">
      <ul>
        <li>
          <img src="https://img95.699pic.com/xsj/0u/7q/16.jpg!/fh/300" alt />
        </li>
        <li>
          <img src="https://img95.699pic.com/xsj/09/ym/gn.jpg!/fh/300" alt />
        </li>
        <li>
          <img src="https://img95.699pic.com/xsj/0t/cl/6y.jpg!/fh/300" alt />
        </li>
        <li>
          <img src="https://img95.699pic.com/xsj/09/wf/t7.jpg!/fh/300" alt />
        </li>
        <li>
          <img src="https://img95.699pic.com/xsj/04/g9/r1.jpg!/fh/300" alt />
        </li>
      </ul>
    </div>
    <div class="news">
      <div class="news_left">
        <h3 style="color:#7DCEAA">
          <span>最新发布</span>
          <i></i>
        </h3>
        <div class="news_essay">
          <div
            class="news_content"
            v-for="(ntit4,id) in newsort"
            :key="id"
            @click.prevent="changeId(ntit4.newId)"
          >
            <h3>{{ntit4.newsTitle}}</h3>
            <p style="color:#bbb" class="hideContent">{{ntit4.newsContent}}</p>
            <div>
              <span style="color:#bbb" class="hideContent">【标签：{{ntit4.newsTypeDetail}}】</span>
              <span style="float:right;color:#bbb">{{ntit4.newsTime | formatTimer}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="news_right">
        <h3>
          <span>读者声音</span>
          <i class="icon_news"></i>
        </h3>
        <ul class="news_right_reader">
          <li v-for="(rcom,id) in rcoms.slice(1,9)" :key="id">
            <div>【{{rcom.newsTypeDetail}}】{{rcom.newsTitle}}</div>
            <div
              style="margin-left:20px;margin-top:10px"
            >用户{{rcom.userName}}：{{rcom.commentContent}}</div>
          </li>
        </ul>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import MessageNav from "../components/messageNav";
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Search from "../components/Search";
export default {
  name: "mess_detail",
  data() {
    return {
      news: [],
      newsort: [],
      date: "",
      rcoms: []
    };
  },
  filters: {
    //格式化时间
    formatTimer: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  },
  components: {
    MessageNav,
    Footer,
    Logo,
    Search
  },
  methods: {
    changeType(NewsType) {
      this.$router.push("mess_detail?type=" + NewsType);
      var search = NewsType;

      this.$axios
        .get("/api/nousRouter/getNous", { params: { key: search } })
        .then(res => {
          // console.log("res:", res);
          this.news = res.data.data;
          // console.log(this.news);
        })
        .catch(err => {
          console.log("err:", err);
        });
      //最新文章
      this.$axios
        .get("/api/nousRouter/getSort", { params: { key: search } })
        .then(res => {
          console.log("res:", res);
          this.newsort = res.data.data;
        })
        .catch(err => {
          console.log("err:", err);
        });
      this.$axios
        .get("/api/nousRouter/getComment", { params: { key: search } })
        .then(res => {
          console.log("res:", res);
          this.rcoms = res.data.data;
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    changeId(Id) {
      this.$router.push("/news_detail?id=" + Id);
    }
  },
  created() {
    var search = decodeURI(location.search)
      .slice(1)
      .split("=")[1];
    //获取文章
    this.$axios
      .get("/api/nousRouter/getNous", { params: { key: search } })
      .then(res => {
        // console.log("res:", res);
        this.news = res.data.data;
        // console.log(this.news);
      })
      .catch(err => {
        console.log("err:", err);
      });
    //最新文章
    this.$axios
      .get("/api/nousRouter/getSort", { params: { key: search } })
      .then(res => {
        console.log("res:", res);
        this.newsort = res.data.data;
      })
      .catch(err => {
        console.log("err:", err);
      });
    //评论
    this.$axios
      .get("/api/nousRouter/getComment", { params: { key: search } })
      .then(res => {
        console.log("res:", res);
        this.rcoms = res.data.data;
      })
      .catch(err => {
        console.log("err:", err);
      });
  }
};
</script>
<style lang="css" scoped>
/* 头部样式*/
.nav {
  margin-top: 50px;
  height: 60px;
  background-color: #0dc572;
  box-shadow: 2px 2px 2px 2px #ccc;
}
.nav > ul {
  list-style: none;
}
.style {
  margin: 10px 10px 10px -10px;
  width: 250px;
  height: 50px;
  float: left;
}
.style li {
  margin-right: 20px;
  float: left;
}
.hovers:hover,
.news_index:hover {
  color: rgb(97, 95, 95);
  cursor: pointer;
}
/* 内容部分样式*/
.mess_detail /deep/ .el-button--success {
  height: 40px;
  position: relative;
  left: 95px;
  top: 8px;
}
.mess_detail /deep/ .logoImg {
  position: relative;
  left: 0px;
}
.mess_detail /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.mess_detail /deep/ .shopping {
  margin-top: -88px;
}
.mess_detail /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.mess_detail /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}

.mess_detail /deep/ .down {
  height: 300px;
}
.mess_detail /deep/.content-top-left dd {
  margin-top: 5px;
}
.aboumess_detailt /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.mess_detail /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.mess_detail /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.mess_detail /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.mess_detail /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}
.myactive:hover {
  color: #0dc572;
  cursor: pointer;
}
.content {
  clear: both;
  display: flex;
  margin-top: 20px;
}
.title {
  margin: 0 auto;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(125, 206, 170, 0),
    rgba(125, 206, 170, 0.75),
    rgba(125, 206, 170, 0)
  );
}
.tip:hover {
  cursor: pointer;
  color: #7dceaa;
}
.hideTitle {
  width: 350px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hideContent {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*定义的数字为显示的行数*/
  -webkit-box-orient: vertical;
}
.left {
  flex: 2;
}
.left > div:nth-child(1) {
  height: 300px;
}
.left > ul {
  clear: both;
  margin-top: 20px;
}
.left li {
  width: 290px;
  float: left;
  margin: 0 100px 10px -25px;
}
.right {
  flex: 1;
  margin-left: 10px;
  border-left: 2px dashed #000;
}
.right > h3 {
  margin-left: 20px;
}
.right > h3 > span,
.news_right > h3 > span {
  display: block;
  float: left;
  height: 40px;
  width: 100px;
  text-align: center;
  background: #0dc572;
  line-height: 40px;
  padding: 0 20px 0 15px;
  box-shadow: 0 5px 15px 0 #ccc;
  color: #fff;
}
.icon_news {
  display: block;
  float: left;
  width: 0px;
  height: 0px;
  border: 20px solid #0dc572;
  border-right: 20px solid transparent;
}
.rank {
  width: 300px;
  height: 300px;
  line-height: 40px;
  box-shadow: 0 2px 5px 0 #ccc;
  list-style: none;
  margin: 80px 0 0 20px;
}
.rank li {
  width: 260px;
  height: 30px;
  margin-top: 12px;
  font-size: 14px;
}

.icon_top {
  background-color: #cccc;
}
.rank li:nth-child(1) .icon_top {
  background-color: #ff2c00;
}
.rank li:nth-child(2) .icon_top {
  background-color: #ff5a00;
}
.rank li:nth-child(3) .icon_top {
  background-color: #fd9a15;
}
.hideTitle2 {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon_top {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  border-radius: 2px;
  color: #fff;
  background-color: #ccc;
  margin-right: 10px;
  text-align: center;
}
.l {
  float: left;
  text-align: center;
  margin-right: 10px;
}
.r {
  float: left;
  width: 370px;
}
.r p {
  font-size: 13px;
  color: #666;
}
.r div {
  margin: 0 10px 0 10px;
  border-bottom: #ccc 2px dashed;
}
.pic {
  height: 50px;
  background-color: #000;
  margin-top: -54px;
  opacity: 0.5;
  line-height: 50px;
  color: white;
  font-family: "Courier New", Courier, monospace;
}
.l img {
  position: relative;
  z-index: -1;
  border-radius: 10px;
}
.loopPic ul {
  list-style: none;
}
.loopPic li {
  float: left;
  margin-right: 2px;
}
.loopPic li:first-child {
  margin-left: -30px;
}
.loopPic img {
  width: 230px;
  height: 150px;
  border-radius: 5px;
  border: 1px dashed #ccc;
}
.news {
  clear: both;
  display: flex;
}

.news_left {
  flex: 2;
}
.news_left > h3 > span {
  display: block;
  float: left;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: #0dc572;
  border-bottom: 2px solid #0dc572;
  box-shadow: 0 5px 15px 0 #ccc;
  color: #fff;
  text-align: center;
}
.news_left > h3 > i {
  display: block;
  float: left;
  width: 87%;
  margin-left: 2px;
  height: 40px;
  border-bottom: 3px dashed #0dc572;
}
.news_essay {
  clear: both;
  height: 600px;
  margin-top: 70px;
}
.news_content {
  height: 150px;
  margin: 10px;
  padding: 10px;
  border-bottom: #ccc dashed 2px;
}
.news_content:hover {
  box-shadow: 0 5px 15px 0 #ccc;
  border-radius: 10px;
}
.news_right {
  flex: 1;
  margin-left: 10px;
  border-left: 2px dashed #000;
}
.news_right h3 {
  margin-left: 10px;
}
.news_right_reader {
  clear: both;
  margin-top: 80px;
  margin-left: 10px;
  height: 500px;
  box-shadow: 0 5px 15px 0 #ccc;
}
.news_right_reader li {
  margin-top: 10px;
}
</style>