<template>
  <div class="nous">
    <h2>
      <i class="i1"></i>
      <span>保健</span>
      <i class="i2"></i>
    </h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="老人" name="first">
        <div class="message">
          <img src="https://img95.699pic.com/photo/40180/8515.jpg_wh300.jpg" class="imgs" />
          <div class="content">
            <ul>
              <li v-for="(ncon,id) in news.slice(0,6)" :key="id">
                <h3 class="hideTitle"><b style="color:#000">【{{ncon.newsTypeDetail}}】</b>{{ncon.newsTitle}}</h3>
                <p class="hideContent">{{ncon.newsContent}}</p>
                <p class="detail" @click.prevent="changeId(ncon.newId)" >[详细]</p>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="母婴" name="second">
        <div class="message">
          <img src="https://img95.699pic.com/photo/40180/8515.jpg_wh300.jpg" class="imgs" />
          <div class="content">
            <ul>
              <li v-for="(ncon,id) in news.slice(0,6)" :key="id">
                <h3 class="hideTitle">【母婴】{{ncon.newsTitle}}</h3>
                <p class="hideContent">{{ncon.newsContent}}</p>
                <p class="detail" @click.prevent="changeId(ncon.newId)" >[详细]</p>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="家庭" name="third">
        <div class="message">
          <img src="https://img95.699pic.com/photo/40180/8515.jpg_wh300.jpg" class="imgs" />
          <div class="content">
            <ul>
              <li v-for="(ncon,id) in news.slice(0,6)" :key="id">
                <h3 class="hideTitle">{{ncon.newsTitle}}</h3>
                <p class="hideContent">{{ncon.newsContent}}</p>
                <p class="detail" @click.prevent="changeId(ncon.newId)" >[详细]</p>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="健康用药" name="fourth">
        <div class="message">
          <img src="https://img95.699pic.com/photo/40180/8515.jpg_wh300.jpg" class="imgs" />
          <div class="content">
            <ul>
              <li v-for="(ncon,id) in news.slice(0,6)" :key="id">
                <h3 class="hideTitle">{{ncon.newsTitle}}</h3>
                <p class="hideContent">{{ncon.newsContent}}</p>
                <p class="detail" @click.prevent="changeId(ncon.newId)" >[详细]</p>
              </li>
            </ul>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "messageB",
  data() {
    return {
      activeName: "first",
      news: []
    };
  },

  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
      this.$axios
        .get("/api/nousRouter/getNous", { params: { key: tab.label } })
        .then(res => {
          // console.log("res:", res);
          this.news = res.data.data;
          // console.log(this.news);
        })
        .catch(err => {
          console.log("err:", err);
        });
    },
    changeId(Id){
       this.$router.push("/news_detail?id=" + Id);
    }
  },
  beforeMount() {
    this.$axios
      .get("/api/nousRouter/getNous", { params: { key: "老人" } })
      .then(res => {
        // console.log("res:", res);
        // this.news = res.data.data
        for (var i = 0; i < res.data.data.length; i++) {
          this.news.push(res.data.data[i]);
        }
        console.log(this.news);
      })
      .catch(err => {
        console.log("err:", err);
      });
  }
};
</script>

<style lang="css" scoped>
.el-tabs__nav .is-top >>> .el-tabs__item {
  font-size: 20px;
}
.el-tabs--top {
  clear: both;
}
.el-tabs--top >>> .is-active {
  color: #0dc572;
  font-size: 20px;
}
.el-tabs--top >>> .el-tabs__active-bar {
  background-color: #0dc572;
}
.el-tabs--top >>> .is-top:hover {
  color: #0dc572;
}
.el-tabs__nav-wrap .is-top >>> .el-tabs__nav-wrap::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background-color: #0dc572;
  z-index: 1;
}

h2 {
  color: #ffffff;
}
.i1 {
  display: block;
  float: left;
  width: 11px;
  height: 47px;
  background: url(../assets/titbg_01.png) no-repeat;
}
h2 > span {
  display: block;
  float: left;
  margin-left: 5px;
  height: 43px;
  width: 200px;
  text-align: center;
  background: #0dc572;
  line-height: 40px;
  padding: 0 20px 0 15px;
  box-shadow: 0 5px 15px 0 #ccc;
}
.i2 {
  display: block;
  float: left;
  width: 23px;
  height: 47px;
  background: url(../assets/titbg_03.png) no-repeat;
}
.message {
  display: flex;
}
.imgs {
  flex: 1;
  width: 200px;
  height: 450px;
  border: 1px #ccc solid;
  margin-top: 20px;
}
.content {
  flex: 3;
}
.detail{
  text-align:right;
  font-weight:700;
  color:#0dc572
}
.detail:hover{
  cursor: pointer;
}
.hideTitle{
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
li {
  float: left;
  width: 350px;
  margin: 0 30px 0 30px;
  list-style: none;
}

p {
  color: rgb(121, 116, 116);
}
b {
  color: #0dc572;
}
</style>