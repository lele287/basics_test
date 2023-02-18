<template>
  <div class="pay">
    <div class="article-top">
      <div class="article-top-bx">
        <el-steps :active="2" align-center>
          <el-step title="选择商品"></el-step>
          <el-step title="填写订单信息"></el-step>
          <el-step title="订单提交成功" class="three"></el-step>
          <el-step title="支付成功"></el-step>
        </el-steps>
      </div>
    </div>

    <main>
      <div class="address">
        <p>收货人信息:</p>
        <div class="artion_diz">
          <div
            class="information"
            v-for="(shou, index) in initialization"
            :key="index"
          >
            <div class="diz_main1" @click="radio1 = -1">
              <ul>
                <li>
                  <label>收货人：</label>
                  <p class="diz_name">{{ shou.fullName }}{{ shou.name }}</p>
                </li>
                <li>
                  <label>手机号：</label>
                  <p class="diz_name1">{{ shou.cellPhone }}</p>
                </li>
                <li>
                  <label>所在地区：</label>
                  <p class="diz_name2">{{ shou.location }}</p>
                </li>
                <li>
                  <label>详细地址：</label>
                  <p class="diz_name3">
                    {{ shou.detail }}&nbsp;&nbsp;{{ shou.floor }}
                  </p>
                </li>
              </ul>
            </div>
            <div class="tags">
              <span class="tag"
                ><span
                  class="el-icon-star-on"
                  v-if="initialization[index].defaults"
                ></span
                >默认地址</span
              >
            </div>
            <!-- <el-button type="success" class="OptionDefault" icon="el-icon-check" circle></el-button> -->
            <span
              v-if="radio1 == -1"
              class="el-icon-success OptionDefault"
            ></span>
          </div>
        </div>
        <div class="optiondiv">
          <el-radio
            class="option"
            v-for="(initializations, index) in initializations"
            :key="index"
            v-model="radio1"
            :label="index"
            border
            >{{ initializations.fullName }} {{ initializations.cellPhone }}
            {{ initializations.location }} {{ initializations.detail }}
            {{ initializations.floor }}</el-radio
          >
        </div>
      </div>
      <div class="shopp">
        <p class="shopp1">商品列表</p>
        <router-link to="/shopping" tag="span">
          <div class="square"></div>
          <p class="shopp2">返回购物车</p>
        </router-link>
        <ul class="ullist">
          <li class="flag1">商品列表</li>
          <li class="flag">价格(元)</li>
          <li class="flag">数量</li>
          <li class="flag">小计(元)</li>
        </ul>
        <ul class="ulshopp"></ul>
      </div>
      <div class="OrderItems">
        <ul v-for="(shopping, index) in shopping" :key="index">
          <li class="img1">
            <div class="imgshopp">
              <img :src="shopping.drugsPhoto" alt="" />
            </div>
            <div class="infor">
              <span class="title">{{
                shopping.drugsIntroduce.split(" ")[0]
              }}</span
              ><br />
              <span class="title">{{
                shopping.drugsIntroduce.split(" ")[1]
              }}</span
              ><br />
              <span class="title">{{
                shopping.drugsIntroduce.split(" ")[2]
              }}</span
              ><br />
            </div>
            <div class="pps">
              <span class="p2">{{ shopping.drugsPrice }}</span>
              <span class="p3">{{ shopping.drugsCount }}</span>
              <span class="p4"
                >￥{{
                  shopping.drugsPrice.substring(1) * shopping.drugsCount
                }}元</span
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="count">
        <div class="cost">
          <div class="cost-right">
            <ul>
              <li>
                <span class="left-span">商品金额：</span>
                <p class="right-span" id="Toatal">￥{{ TotalPrice }}</p>
              </li>
              <li>
                <span class="left-span">运费：</span>
                <p class="right-span">￥0.00</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="total-amount">
          <span>应付金额：</span>
          <span class="price"></span>

          <span type="submit" class="submit-btn" id="toPay" @click="placeOrder"
            >提交订单</span
          >
        </div>
      </div>
    </main>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
export default {
  data() {
    return {
      initialization: [],
      initializations: [],
      userName: "",
      radio1: -1,
      shopping: [],
      TotalPrice: 0,
      _Index: 0,
      addressId: [],
    };
  },
  methods: {
    // DefaultAddress() {
    //     this.radio1 = 0
    // },
    placeOrder() {
      var insertIds = JSON.parse(sessionStorage.getItem("insertId"));
      // this.$router.push(/quick);
      let OrderAddress = 0;
      if (this.radio1 == -1) {
        OrderAddress = this._Index;
      } else {
        OrderAddress = this.radio1;
      }
      console.log(OrderAddress);
      if (OrderAddress>=0) {
        this.$router.push("/quick?address=" + OrderAddress);
        // console.log(insertIds);
        for (let i = 0; i < insertIds.length; i++) {
          this.addressId[i].addressId;
          this.$axios
            .post("/api/users/SaveShippingAddress", {
              insertId: insertIds[i].insertId,
              addressId: this.addressId[OrderAddress].addressId,
            })
            .then((res) => {
              console.log("res:", res);
            })
            .catch((err) => {
              console.log("err:", err);
            });
        }
      }else{
        this.$message.error('请选择收货地址！！');
      }
    },
  },
  components: {
    Footer,
  },
  created() {
    //收货地址初始化
    this.userName = localStorage.getItem("userName");
    this.$axios
      .post("/api/users/AddressInitialization", { userName: this.userName })
      .then((res) => {
        console.log("res:", res.data.data);
        this.addressId = res.data.data;
        // console.log(this.addressId);
        var inits = [];
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].defaults == 1) {
            inits = res.data.data[i];
            this.initialization.push(inits);
            this._Index = i;
          }
        }
        console.log(this._Index);
        if(this._Index >=0){
          this.radio1 = -1
        }else{
          this.radio1 = 0
        }
        this.initializations = res.data.data;
      })
      .catch((err) => {
        console.log("err:", err);
      });
    //商品订单初始化
    var shoppingId = JSON.parse(sessionStorage.getItem("shoppingId"));
    var orderId = JSON.parse(sessionStorage.getItem("insertId"));
    console.log("orderId", orderId);
    for (var i = 0; i < shoppingId.length; i++) {
      this.$axios
        .post("/api/users/orderNumber", {
          orderId: orderId[i].insertId,
        })
        .then((res) => {
          console.log("res:", res);
          this.shopping.push(res.data.data[0]);
          this.TotalPrice +=
            res.data.data[0].drugsPrice.substring(1) *
            res.data.data[0].drugsCount;
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  },
};
</script>

<style lang="css" scoped>
.pay /deep/ .down {
  height: 300px;
}
.pay /deep/.content-top-left dd {
  margin-top: 5px;
}
.pay /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.pay /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.pay /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.pay /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.pay /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}

ul {
  list-style: none;
}
.article-top {
  width: 100%;
  height: 130px;
  background-color: #fff;
}
.article-top-bx {
  width: 1190px;
  margin: 0 auto;
}
.el-steps,
.el-steps--horizontal {
  margin-top: 50px;
}
.top-bx-img {
  width: 600px;
  height: 100px;
  margin: 15px 0;
  float: right;
  border-radius: 5px;
}
.article-top a img {
  width: 190px;
  height: 60px;
  margin: 30px 0px;
  float: left;
}
.div1 {
  width: 600px;
  height: 100px;
  float: right;
  position: relative;
  left: 125px;
}

.div1 ul {
  width: 600px;
  height: 100px;
  float: right;
  position: relative;
}

.div1 ul li {
  float: left;
  padding-left: 40px;
  line-height: 10px;
  text-align: center;
}

.process {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #23c2aa;
  margin: 20px auto;
  line-height: 30px;
  font-size: 15px;
}
.dash {
  width: 325px;
  border: 0.5px dotted #ccc;
  position: absolute;
  top: 35px;
  left: 80px;
}
main {
  width: 100%;
  background-color: #fff;
}
.pay >>> .address {
  margin: 2px;
  padding: 0;
  position: relative;
  top: -30px;
  width: 1190px;
  height: 100%;
  background-color: #fff;
  margin: 0px auto;
  border: 1px solid #eee;
}
.address p {
  padding-top: 20px;
  padding-left: 30px;
  font-size: 18px;
}
.shopp {
  /* width: 1190px; */
  width: 100%;
  height: 100%;
  background-color: #fff;
  /* margin: 0 auto; */
  position: relative;
  /* margin-top: 0px; */
  border: 1px solid #eee;
}
/* .shopp p{
    font-size: 16px;
    margin: 30px 30px;
} */
.shopp1 {
  float: left;
  font-size: 20px;
  margin: 10px 30px;
}
.square {
  position: absolute;
  right: 140px;
  top: 17px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-right-color: #0dc572;
}
.shopp2 {
  font-size: 20px;
  margin: 10px 30px;
  /* position: relative;
    left: 525px; */
  position: absolute;
  right: 0;
}
.ullist {
  width: 1190px;
  height: 30px;
  /* position: absolute; */
  /* left: 30px; */
}
.ullist li {
  float: left;
  padding-top: 50px;
  font-size: 18px;
  color: #000;
}
.flag1 {
  width: 500px;
  text-align: left;
  margin-left: -107px;
}
.flag {
  margin-left: 153px;
}
.ulshopp {
  /* position: relative; */
  clear: both;
}
.img1 {
  width: 1190px;
  display: block;
  border: 1px solid #ccc;
  margin-top: 10px;
}
.img1 img {
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: 15px;
}
.imgshopp {
  display: inline-block;
}
.infor {
  width: 427px;
  height: 100px;
  margin: 56px 33px;
  display: inline-block;
  line-height: 50px;
}
.pps {
  top: -30px;
  left: 60px;
  width: 500px;
  height: 100px;
  position: relative;
  display: inline-block;
  /* float: right; */
  /* text-align: center; */
  margin-left: 0px;
}
.p2 {
  padding-left: 12px;
  /* line-height: 100px; */
  font-size: 18px;
}
.p3 {
  padding-left: 166px;
  /* padding-top: 100px; */
  font-size: 18px;
}
.p4 {
  padding-left: 175px;
  /* padding-top: 100px; */
  font-size: 18px;
}
.title {
  font-size: 18px;
}
.gg {
  font-size: 18px;
}
#txt1 {
  width: 100px;
  text-align: center;
  font-size: 15px;
  float: left;
  margin-top: -70px;
  margin-left: 670px;
}
#txt2 {
  width: 100px;
  text-align: center;
  font-size: 15px;
  float: left;
  margin-top: -70px;
  margin-left: 880px;
}
#txt3 {
  width: 100px;
  text-align: center;
  font-size: 15px;
  float: left;
  margin-top: -70px;
  margin-left: 1080px;
}
.count {
  width: 1190px;
  height: 100%;
  background-color: #fff;
  margin: 20px auto;
  border: 1px solid #eee;
}
.cost {
  width: 1150px;
  height: 150px;
  /* background-color: aquamarine; */
  margin: 0 auto;
}
.cost-right {
  width: 200px;
  height: 150px;
  float: right;
  text-align: right;
  margin-right: 30px;
}
.cost-right li {
  color: #333;
  line-height: 50px;
}
.left-span {
  width: 80px;
  float: left;
  margin-right: 30px;
  font-size: 15px;
}
.rigth-span {
  color: #333;
  font-weight: 400;
  overflow: hidden;
  font-size: 15px;
}
.total-amount {
  color: #333;
  line-height: 60px;
  font-size: 20px;
  text-align: right;
}
.price {
  color: #ff5959;
  font-size: 28px;
  font-weight: 700;
  vertical-align: middle;
}
.total-amount .submit-btn {
  width: 172px;
  height: 56px;
  display: inline-block;
  background-color: #ff5959;
  border-radius: 2px;
  color: #fff;
  text-align: center;
  margin-left: 16px;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}
.three >>> .el-step__icon,
.is-text {
  border-color: #c0c4cc;
}
.three >>> .el-step__head,
.is-finish {
  color: #c0c4cc;
}
.three >>> .el-step__title,
.is-finish {
  color: #c0c4cc;
}
.three >>> .el-step__title.is-process {
  font-weight: normal;
}

.address {
  width: 100%;
  background-color: #fff;
  padding: 10px 50px;
  margin-top: 20px;
}
.el-row >>> .el-button--info {
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
}

.diz_main1 {
  width: 880px;
  height: 140px;
  margin: 10px auto;
  padding: 5px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #fff;
}
.diz_main1:hover {
  border: 1px solid #0dc572;
}
.diz_main1 ul li label {
  display: inline-block;
  width: 70px;
  height: 22px;
  line-height: 22px;
  color: #999;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 5px;
}
.diz_main1 ul {
  margin: 6px 10px;
  padding: 0;
  margin-top: -14px;
}
.diz_main1 ul li {
  list-style: none;
}
.diz_main1 ul li p {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  color: #666;
  font-size: 14px;
}
.diz_main1 ul li .diz_name {
  font-weight: 700;
  position: relative;
}

.OptionDefault {
  font-size: 26px;
  color: #0dc572;
  position: absolute;
  top: 180px;
  right: 160px;
}
.tags .tag {
  position: absolute;
  top: 100px;
  right: 150px;
  display: inline-block;
  margin-left: 5px;
  padding: 0 6px;
  height: 24px;
  line-height: 24px;
  background-color: #d4f5e6;
  font-size: 12px;
  color: #0dc572;
}
.diz_main_button {
  position: absolute;
  top: 100px;
  right: 40px;
}
.diz_main_button span {
  height: 24px;
  line-height: 24px;
  color: #333;
  font-size: 12px;
  background-color: #fff;
  border: none;
  margin: 5px;
  cursor: pointer;
}
.tag {
  cursor: pointer;
}
.address >>> .diz_main1 {
  position: relative;
}
.diz_main1 ul li {
  height: 25px;
}
body {
  overflow-x: hidden;
}
.column {
  margin: 0 0 20px 140px;
}
.column span {
  font-size: 16px;
  color: #000;
}

.independence-foot-btn1 {
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #666;
  margin-left: 20px;
}
.independence-foot {
  height: 40px;
  background-color: #fff;
}
.app-popup-mask {
  position: fixed;
  z-index: 5000;
  opacity: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-out 0ms;
  background: rgba(0, 0, 0, 0.5);
  /* display: none; */
}
.shan >>> span {
  color: #000;
  color: #333;
  font-size: 12px;
}
.optiondiv {
  margin-left: 130px;
}
.option {
  width: 910px;
  height: 40px;
  display: block;
  margin: 20px 10px;
}
.OrderItems >>> ul {
  margin: 0;
  padding: 0;
}
</style>