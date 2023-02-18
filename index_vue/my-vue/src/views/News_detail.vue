<template>
  <div class="news_detail">
    <Logo></Logo>
    <Search></Search>
    <MessageNav></MessageNav>
    <div class="message_news">
      <div class="messnews_left">
        <div class="title">
          <h3>
            <span>文章阅读</span>
            <i></i>
          </h3>
        </div>
        <div class="mLeft_content">
          <h2>[{{newsTypeD}}]</h2>
          <h1 style="text-align:center">{{newsT}}</h1>
          <p style="text-align:center;color:#bbb">{{newsG}}</p>
          <p class="ndetails">{{newsC}}</p>
          <p>参考来源：央视新闻、环球网、环球时报、每日经济新闻</p>
        </div>
        <div class="comms">
          <h3>
            <span>发表评论</span>
            <i></i>
          </h3>
          <div>
            <textarea name id cols="30" rows="10" placeholder="欢迎留下您的足迹~" v-model="commentC"></textarea>
            <el-button :plain="true" @click="addOpinion">发布</el-button>
          </div>
          <div>
            <h3 class="opin">——评论专区——</h3>
            <hr />
            <div v-if="comY">
              <div class="opins" v-for="(comment,id) in comments" :key="id">
                <p style="color:#7dceaa">
                  <b>{{comment.userName}}</b>
                </p>
                <p style="margin-left:10px">{{comment.commentContent}}</p>
                <p class="timenow">{{comment.commentDate | formatTimer}}</p>
              </div>
            </div>
            <div class="opins" v-else-if="comN">
              <h2 style="text-align:center">该文章暂无评论~</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="messnews_right">
        <h3>
          <span>阅读角</span>
          <i class="icon_news"></i>
        </h3>
        <div class="pics">
          <div v-for="(newss,id) in news.slice(7,10)" :key="id">
            <img :src="newss.newsPhoto" alt />
            <p>【{{newss.newsTypeDetail}}】{{newss.newsTitle}}</p>
          </div>
        </div>
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
  name: "news_detail",
  data() {
    return {
      news: "",
      newsT: "",
      newsG: "",
      newsC: "",
      uName: "",
      nId: "",
      newsTypeD: "",
      commentC: "",
      comments: [],
      comY: true,
      comN: false,
      nowDate: null, //存放年月日变量
      nowTime: null, //存放时分秒变量
      currentTime: new Date(), // 获取当前时间
      auth_time:''//倒计时间
    };
  },
  components: {
    MessageNav,
    Footer,
    Logo,
    Search
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
  methods: {
    //获取当前时间
    getTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      this.month = check(month);
      this.day = check(day);
      this.hour = check(hour);
      this.minute = check(minute);
      this.second = check(second);
      function check(i) {
        const num = i < 10 ? "0" + i : i;
        return num;
      }
      this.nowDate =
        year +
        "-" +
        this.month +
        "-" +
        this.day +
        " " +
        this.hour +
        ":" +
        this.minute +
        ":" +
        this.second;
    },
    //倒计时
    timeDown(){
      this.auth_time = 60
      var auth_timerr = setInterval(()=>{

      },1000)
    },
    showComment() {
      var search = decodeURI(location.search)
        .slice(1)
        .split("=")[1];
      this.$axios
        .get("/api/nousRouter/getCommentId", {
          params: { key: search }
        })
        .then(res => {
          if (res.data.data.length == 0) {
            this.comY = false;
            this.comN = true;
          } else {
            this.comY = true;
            this.comN = false;
          }
          this.comments = res.data.data;
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    addOpinion() {
      this.uName = localStorage.getItem("userName");
      this.getTime(); //获取当前系统时间
      if (this.uName != null) {
        if (this.commentC != "") {
          //添加评论
          this.$axios
            .get("/api/nousRouter/addComment", {
              params: {
                userName: this.uName,
                newId: this.nid,
                commentContent: this.commentC,
                commentDate: this.nowDate
              }
            })
            .then(res => {
              this.$message.success({
                showClose: true,
                message: "发布评论成功"
              });
              this.commentC = "";
              this.showComment()  //显示评论
            })
            .catch(err => {
              console.log("err:", err);
            });
        } else {
          this.$message.warning({
            showClose: true,
            message: "请输入内容后再发布评论"
          });
        }
      } else {
        this.$message.warning({
          showClose: true,
          message: "请登录后再进行评论"
        });
        this.$router.push({
          path: "/login?orginUrl=/news_detail?id=" + this.nid
        });
      }
    }
  },
  created() {
    var search = decodeURI(location.search)
      .slice(1)
      .split("=")[1];
    this.nid = search;
    // console.log(search);
    //通过id获取文章
    this.$axios
      .get("/api/nousRouter/getNousId", { params: { key: this.nid } })
      .then(res => {
        console.log("res:", res);
        this.newsT = res.data.data[0].newsTitle;
        this.newsG = res.data.data[0].newsGuide;
        this.newsC = res.data.data[0].newsContent;
        this.newsTypeD = res.data.data[0].newsTypeDetail;
      })
      .catch(err => {
        console.log("err:", err);
      });
    //通过id获取与该id相同类型的文章
    this.$axios
      .get("/api/nousRouter/getByIdType", { params: { key: this.nid } })
      .then(res => {
        console.log("res:", res);
        this.news = res.data.data;
      })
      .catch(err => {
        console.log("err:", err);
      });
    //显示评论
    this.showComment()
  }
};
</script>
<style lang="css" scoped>
.news_detail /deep/ .el-button--success {
  height: 40px;
  position: relative;
  left: 95px;
  top: 8.5px;
}
.news_detail /deep/ .logoImg {
  position: relative;
  left: 0px;
}
.news_detail /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.news_detail /deep/ .shopping {
  margin-top: -88px;
}
.news_detail /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.news_detail /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}

.news_detail /deep/ .down {
  height: 300px;
}
.news_detail /deep/.content-top-left dd {
  margin-top: 5px;
}
.news_detail /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.news_detail /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.news_detail /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.news_detail /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.news_detail /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}
.news_detail /deep/ .nav {
  margin-top: 40px;
}
.message_news {
  clear: both;
  margin-top: 20px;
  display: flex;
}
.messnews_left {
  flex: 3;
  /* border: 1px solid #ccc; */
  padding: 5px;
}
.messnews_right {
  flex: 1;
  margin-left: 10px;
  padding: 5px;
  /* border: 1px solid #ccc; */
  box-shadow: 0px 2px 2px 0 #ccc;
}
.title > h3 > span,
.comms > h3 > span {
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
.title > h3 > i,
.comms > h3 > i {
  display: block;
  float: left;
  width: 87%;
  margin-left: 2px;
  height: 40px;
  border-bottom: 3px dashed #0dc572;
}
.mLeft_content {
  clear: both;
  /* border: 1px solid #ccc; */
  margin-top: 80px;
  padding: 10px;
}
.ndetails {
  text-indent: 2em;
  line-height: 25px;
  font-family: Georgia, "Times New Roman", Times, serif;
  text-align: justify;
}
textarea {
  margin-top: 20px;
  height: 100px;
  width: 900px;
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  resize: none;
}
textarea:focus {
  border: 2px solid #0dc572;
}
.comms /deep/ .el-button {
  background: #0dc572;
  color: #fff;
  float: right;
}
.comms /deep/ .el-button:hover {
  border: 1px #fff solid;
  box-sizing: border-box;
}
.opin {
  clear: both;
  text-align: center;
}
.opins {
  height: 120px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}
.timenow {
  color: #bbb;
  float: right;
}
.messnews_right > h3 > span {
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
.pics {
  clear: both;
  width: 300px;
  margin-top: 80px;
  text-align: center;
}

.pics img {
  width: 250px;
  height: 150px;
  border-radius: 10px;
}
</style>