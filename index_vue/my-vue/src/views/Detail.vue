<template>
  <div class="detail">
    <div class="detail_top">
      <Logo></Logo>
      <Search></Search>
    </div>
    <div class="detail-main">
      <div class="detail-left">
        <div class="detail-left-header">
          <!-- <img :src="titleImg" alt /> -->
          <vue-photo-zoom-pro :url="titleImg"></vue-photo-zoom-pro>
        </div>
        <div class="detail-left-footer">
          <div v-for="(item, index) in items.slice(0, 3)" :key="index">
            <img
              :src="`${item}`"
              :class="{ detailIimg: isDetailIimg[index] }"
              @click="changeImg(index)"
            />
          </div>
        </div>
      </div>
      <div class="detail-right">
        <h1>{{ titleName }}</h1>
        <div class="detail-right-price">
          <div>
            <span>价格</span>
            <i>{{ titlePrice }}&nbsp;元</i>
          </div>
          <div class="detail-yue">
            <span>促销</span>
            <i>月销量</i>
            <b>5002</b>
          </div>
        </div>
        <div class="detail-serve">
          <span>服务说明</span>
          <span class="el-icon-circle-check">已满10元已免运费</span>
          <span class="el-icon-circle-check"
            >由窝窝商城负责发货，并提供售后服务</span
          >
          <br />
          <br />
          <span>商品编码</span>
          <span>270101002331</span>
          <el-divider></el-divider>
          <span>数量</span>
          <el-input-number
            v-model="num"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
            class="detail-num"
          ></el-input-number>
          <span>盒</span>
          <br />
          <br />
          <span>商家承诺</span>
          <span>不支持七天无理由退换</span>
          <span>破损包退</span>
          <span>正品保证</span>
          <br />
          <span class="detail-serve-span1">极速退款</span>
          <span>退货运费险</span>
        </div>
        <el-button :plain="true" @click="open1">加入购物车</el-button>
        <el-button class="lkxd" :plain="true">立刻下单</el-button>
      </div>
    </div>
    <div class="detail-article">
      <el-tabs type="border-card">
        <el-tab-pane class="detail-spjs" label="商品介绍">
          商品名称：美克的欣 三合钙咀嚼片
          <br />商品编码：112040012 <br />品牌名称：其他
          <br />通用名称：三合钙咀嚼片
          <br />主要成分：本品为复方制剂，每片含乳酸钙，葡萄糖酸钙，磷酸氢钙各50毫克（相当与钙含量22.6毫克）辅料：甘露醇，淀粉，糖粉，枸橼酸，桔子香精，鲜奶香精，
          柠檬黄，硬脂酸美。
          <br />保健功能：用于预防和治疗钙缺乏症，如骨质疏松、手足抽搐症、骨发育不全、佝偻病以及妊娠和哺乳期妇女、绝经期妇女钙的补充。
          <br />用法用量：嚼服或含服。一次2-4片，一日3次。
          <br />副作用：详见说明书
        </el-tab-pane>
        <el-tab-pane class="detail-sms" label="说明书">
          商品名称： 美克的欣 三合钙咀嚼片
          <el-divider></el-divider>品 牌： 其他 <el-divider></el-divider>通 用
          名： 三合钙咀嚼片 <el-divider></el-divider>生产厂家：
          江西仁齐制药有限公司 <el-divider></el-divider>产品类型： 营养保健
          <el-divider></el-divider>成 份：
          本品为复方制剂，每片含乳酸钙，葡萄糖酸钙，磷酸氢钙各50毫
          克（相当与钙含量22.6毫克）辅料：甘露醇，淀粉，糖粉，枸橼酸，桔子香精，鲜奶香精，
          柠檬黄，硬脂酸美。 <el-divider></el-divider>适 应
          症：用于预防和治疗钙缺乏症，如骨质疏松、手足抽搐症、骨发育不全、佝偻病以及妊娠和哺乳期妇女、绝经期妇女钙的补充。
          <el-divider></el-divider>用法用量：嚼服或含服。一次2-4片，一日3次。
          <el-divider></el-divider
          >注意事项：1.慢性肾功能不全、心功能不全、慢性腹泻或胃肠道吸收障碍患者慎用。
          2.如服用过量或出现严重不良反应，应立即就医。
          3.对本品过敏者禁用，过敏体质者慎用。 4.本品性状发生改变时禁止使用。
          5.请将本品放在儿童不能接触的地方。 6.儿童必须在成人监护下使用。
          7.如正在使用其他药品，使用本品前请咨询医师或药师。
        </el-tab-pane>
        <el-tab-pane label="商品评价">
          <div class="detail-sppj">
            <div class="detail-pjd">100%</div>
            <div class="detail-hzcp">
              好评（100%）
              <br />中评（0%） <br />差评（0%）
            </div>
            <div class="detail-jdt">
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="100"
                status="exception"
              ></el-progress>
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="0"
              ></el-progress>
              <el-progress
                :text-inside="true"
                :stroke-width="20"
                :percentage="0"
              ></el-progress>
            </div>
          </div>
          <div style="clear: both"></div>
          <el-divider></el-divider>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff4141"
            score-template="{value}"
          ></el-rate>
          <el-divider></el-divider>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff4141"
            score-template="5.0"
          ></el-rate>
          <el-divider></el-divider>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff4141"
            score-template="5.0"
          ></el-rate>
          <el-divider></el-divider>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff4141"
            score-template="4.7"
          ></el-rate>
          <el-divider></el-divider>
        </el-tab-pane>
      </el-tabs>
    </div>
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
      num: 1,
      newnum: 1,
      value: 4.9,
      titleImg: "",
      titleName: "",
      titlePrice: "",
      titleId: "",
      username: "",
      flag: "true",
      items: [],
      isDetailIimg: [true, false, false],
      nowUrl: "",
    };
  },
  methods: {
    changeImg(index) {
      // console.log(index); //获取四个小图片的索引
      var src1 = this.items[0]; //获取每一个小图片相对应的src
      var src2 = this.items[1];
      var src3 = this.items[2];
      //如果我点击的小图片索引为0的时候，这时大图片的src要等于索引为0小图片的src
      if (index == 0) {
        this.titleImg = src1;
      } else if (index == 1) {
        this.titleImg = src2;
      } else if (index == 2) {
        this.titleImg = src3;
      }
      for (var i = 0; i < 3; i++) {
        this.isDetailIimg[i] = false;
        this.isDetailIimg[index] = true;
      }
    },
    handleChange(value) {
      console.log(value);
    },
    adds() {
      this.$axios
        .get("/api/productsRouter/addShopping", {
          params: {
            userName: this.username,
            key: this.titleId,
            counts: this.newnum,
            flag: this.flag,
          },
        })
        .then((res) => {
          // console.log("res:", res);
          this.$message({
            showClose: true,
            message: "加入购物车成功，请到购物车页面结算",
          });
        })
        .catch((err) => {
          console.log("adderr:", err);
        });
    },
    open1() {
      if (!localStorage.getItem("MyToken")) {
        this.$message({
          message: "登录信息已过期，请先登录！",
          type: "warning",
        });
        this.nowUrl = this.$route.path;
        this.$router.push({ path: "/login?orginUrl=" + this.nowUrl });
      } else {
        //查询商品是否已入过
        this.$axios
          .get("/api/productsRouter/checkProducts", {
            params: {
              username: this.username,
              key: this.titleId,
            },
          })
          .then((res) => {
            if (res.data.message == "该商品已加入过") {
              // alert("已加过");
              this.flag = false;
              this.newnum = this.num + res.data.data[0].drugsCount;
              console.log(this.num);
            } else {
              this.flag = true;
              // alert("未加过");
            }
            //添加商品
            this.adds();
          })
          .catch((err) => {
            console.log("checkerr:", err);
          });
      }
    },
  },
  created() {
    var username = localStorage.getItem("userName");
    this.username = username;
    // var search = decodeURI(location.search).slice(1).split("=")[1];
    var search = this.$route.query.id;
    this.$axios
      .get("/api/productsRouter/getproductsDetail", { params: { key: search } })
      .then((res) => {
        console.log("res:", res);
        this.titleImg = res.data.data[0].drugsPhoto;
        this.titleName = res.data.data[0].drugsIntroduce;
        this.titlePrice = res.data.data[0].drugsPrice;
        this.titleId = res.data.data[0].drugsId;
        this.items = res.data.data[0].drugsimg;
        var ds = this.items.replace(/\"/gi, "");
        // console.log('dssss:',ds);
        ds = ds.substring(1, ds.length - 1).split(",");
        // console.log('ds',ds)
        this.items = ds;
        // console.log(this.items);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
  components: {
    Footer,
    Logo,
    Search,
  },
};
</script>
<style lang="scss" scoped>
.detail /deep/ .down {
  height: 300px;
}
.detail /deep/.content-top-left dd {
  margin-top: 5px;
}
.detail /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.detail /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.detail /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.detail /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.detail /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}

.detail_top /deep/ .el-button--success {
  height: 40px;
  position: relative;
  left: 95px;
  top: 8.5px;
}
.detail_top /deep/ .logoImg {
  position: relative;
  left: 0px;
}
.detail_top /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.detail_top /deep/ .shopping {
  margin-top: -88px;
}
.detail_top /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.detail_top /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}
.detail {
  width: 1190px;
}
.detail-main {
  display: flex;
  margin-top: 30px;
}
.detail-left {
  flex: 0.6;
  height: 550px;
  float: left;
  margin: 20px 0;
  margin-right: 10px;
  background-color: #fff;
}
.photo-zoom-pro {
  width: 400px;
  height: 400px;
  margin: 20px auto;
}
.detail-left-footer div {
  list-style: none;
  float: left;
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-size: 30px;
  color: #aaa;
  margin-left: 57px;
}
.detail-left-footer div img {
  display: block;
  margin: 5px;
  width: 60px;
  height: 60px;
  border: 2px solid #ccc;
}
.detailIimg {
  border: 2px solid #0dc572 !important;
}
.detail-right {
  flex: 1;
  height: 550px;
  float: right;
  margin: 20px 0;
  background-color: #fff;
}
.detail-right h1 {
  font-size: 21px;
  overflow: hidden;
  padding: 20px;
  color: #3a3a3a;
  font-weight: 400;
}
.detail-right-price {
  background-color: #f5f5f5;
  padding-top: 10px;
  margin: 0 20px;
  width: 700px;
  height: 82px;
  position: relative;
}
.detail-right-price span {
  display: block;
  font-size: 12px;
  color: #999;
  margin: 0px 20px;
  margin-top: 13px;
  letter-spacing: 25px;
}
.detail-right-price i {
  position: absolute;
  top: 17px;
  left: 95px;
  color: #0dc572;
  font-size: 20px;
  font-style: normal;
}
.detail-yue i {
  font-size: 12px;
  color: #999;
  position: absolute;
  left: 95px;
  top: 52px;
  letter-spacing: 5px;
  font-style: normal;
}
.detail-yue b {
  color: #000;
  font-weight: 700;
  margin-left: 15px;
  font-size: 14px;
  position: absolute;
  top: 50px;
  left: 135px;
}
.detail-serve span {
  font-size: 12px;
  color: #3c3c3c;
  margin-left: 40px;
  margin-top: 20px;
}
.detail-serve-span1 {
  padding-left: 87px;
}
.el-input-number {
  width: 130px;
  margin-left: 65px;
}
.el-button {
  margin: 30px 40px;
  margin-right: 20px;
  width: 172px;
  height: 46px;
  background-color: #0dc572;
  color: #fff;
  font-size: 18px;
}
.el-button.is-plain:focus,
.el-button.is-plain:hover {
  background: #0dc572;
  border-color: #0dc572;
  color: #fff;
}
.lkxd {
  margin: 0px 40px;
  width: 172px;
  height: 46px;
  background-color: #ca151d;
  color: #fff;
}
.lkxd.is-plain:focus,
.lkxd.is-plain:hover {
  background: #ca151d;
  border-color: #ca151d;
  color: #fff;
}
.detail-article {
  clear: both;
}
.detail-spjs {
  line-height: 40px;
  padding: 10px 30px;
  color: #666;
  font-size: 14px;
}
.detail-sms {
  line-height: 20px;
  padding: 10px 30px;
  color: #666;
  font-size: 14px;
}
.detail-sppj {
  padding: 10px 30px;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.detail-pjd {
  float: left;
  width: 232px;
  height: 120px;
  line-height: 120px;
  text-indent: 60px;
  font-size: 48px;
  font-weight: bold;
  color: #ff4141;
}
.detail-hzcp {
  float: left;
  margin-left: 30px;
}
.detail-jdt {
  width: 400px;
  float: left;
  margin-left: 30px;
}
.detail-jdt div {
  margin: 26px;
  margin-top: 20px;
}
</style>