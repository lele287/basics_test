<template>
  <div class="quick">
    <div class="article-top">
      <div class="article-top-bx">
        <el-steps :active="2" align-center>
          <el-step title="选择商品"></el-step>
          <el-step title="填写订单信息" class="two"></el-step>
          <el-step title="订单提交成功" class="three"></el-step>
          <el-step title="支付成功"></el-step>
        </el-steps>
      </div>
    </div>
    <main>
      <div class="message">
        <p class="p1">订单提交成功，请您尽快付款！订单号：{{ shoppingId }}</p>
        <p class="p2">
          请您在提交订单后<span>24</span>小时内完成支付，否则订单会自动取消
        </p>
        <p class="p3">
          待支付：<span class="span1">￥{{ TotalPrice }}元</span>
        </p>
      </div>
      <div class="pay-platform">
        <div class="platform">快捷支付等平台</div>
        <div class="pay">
          <div
            id="weixin"
            class="cost"
            :class="{ payment: paymentSwitch == 0 }"
            @click="WechatPayment"
          >
            <!-- <img src="../assets/weixin.png" alt=""> -->
            <el-image :src="wImg" class="wImg"></el-image>
            <p class="txt">微信</p>
          </div>
          <div
            id="zhifubao"
            class="cost"
            :class="{ payment: paymentSwitch == 1 }"
            @click="Alipay"
          >
            <!-- <img src="../assets/zfb.png" alt=""> -->
            <el-image :src="zImg" class="zImg"></el-image>
            <p class="txt">支付宝</p>
          </div>
        </div>
      </div>
      <div class="immediately">
        <div class="immediately-pay" @click="ImmediatePayment">立即支付</div>
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
      wImg: require("../assets/wxb.png"),
      zImg: require("../assets/zfb.png"),
      userName: "",
      shopping: [],
      shoppingId: "",
      TotalPrice: 0,
      paymentSwitch: -1,
    };
  },
  methods: {
    WechatPayment() {
      this.paymentSwitch = 0;
    },
    Alipay() {
      this.paymentSwitch = 1;
    },
    ImmediatePayment() {
      if ((this.paymentSwitch = 0)) {
        alert("去微信");
      } else if ((this.paymentSwitch = 1)) {
        console.log(this.shopping[0]);
        for (var i = 0; i < this.shopping.length; i++) {
          console.log(this.shopping[i]);
          this.$axios
            .get("/api/pay", { params: { shopping: this.shopping[i] } })
            .then((res) => {
              console.log("res:", res.data.data);
              location.href = res.data.data;l
            })
            .catch((err) => {
              console.log("err:", err);
            });

          var insertId = JSON.parse(sessionStorage.getItem("insertId"));
          for (var i = 0; i < insertId.length; i++) {
            this.$axios
              .post("/api/users/AddOrder", {insertId:insertId[i]})
              .then((res) => {
                console.log("res11:", res);
              })
              .catch((err) => {
                console.log("err:", err);
              });
          }
        }
      } else {
        alert("选择支付方式");
      }
    },
  },
  components: {
    Footer,
  },
  beforeCreate() {
    this.userName = localStorage.getItem("userName");
    var shoppingId = JSON.parse(sessionStorage.getItem("shoppingId"));
    var insertId = JSON.parse(sessionStorage.getItem("insertId"));
    for (var i = 0; i < shoppingId.length; i++) {
      console.log(shoppingId[i].shoppings);
      this.$axios
        .post("/api/users/orderNumber", {
          orderId: insertId[i].insertId,
        })
        .then((res) => {
          console.log("res:", res.data.data[0]);
          this.shopping.push(res.data.data[0]);
          this.shoppingId = res.data.data[0].orderId;
          this.TotalPrice +=
            res.data.data[0].drugsPrice.substring(1) *
            res.data.data[0].drugsCount;
          // shopping.drugsPrice.substring(1) * shopping.drugsCount
          console.log(this.TotalPrice);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    }
  },
};
</script>

<style lang="css" scoped>
.quick /deep/ .down {
  height: 300px;
}
.quick /deep/.content-top-left dd {
  margin-top: 5px;
}
.quick /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.quick /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.quick /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.quick /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.quick /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}

.article-top {
  width: 100%;
  height: 130px;
  /* background-color: #fff; */
}
.article-top-bx {
  width: 1190px;
  margin: 0 auto;
}
.el-steps,
.el-steps--horizontal {
  margin-top: 50px;
}
main {
  width: 100%;
  background-color: #fff;
}

.message {
  width: 1190px;
  height: 150px;
  border: 1px solid #ccc;
  margin: -30px auto;
}
.p1 {
  font-size: 18px;
  margin-left: 20px;
  margin-top: 20px;
}
.p2 {
  font-size: 16px;
  margin-left: 20px;
  margin-top: 10px;
}
.p3 {
  font-size: 14px;
  margin-left: 20px;
  margin-top: 20px;
}
.message span {
  color: red;
}
.span1 {
  font-size: 18px;
}
.pay-platform {
  width: 1190px;
  height: 200px;
  margin: 80px auto;
}
.platform {
  width: 200px;
  height: 80px;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  text-align: center;
  line-height: 80px;
  font-size: 18px;
  font-weight: 700;
}
.pay {
  width: 1190px;
  height: 120px;
  border: 1px solid #ccc;
}
#weixin {
  width: 200px;
  height: 60px;
  border: 1px solid #ccc;
  margin-top: 30px;
  margin-left: 20px;
  border-radius: 3px;
}
.wImg {
  width: 50px;
  height: 50px;
  margin-top: 5px;
  margin-left: 30px;
}
#weixin p {
  font-size: 20px;
  text-align: center;
  margin-top: -40px;
  margin-left: 50px;
}
#zhifubao {
  width: 200px;
  height: 60px;
  border: 1px solid #ccc;
  margin-top: -60px;
  margin-left: 300px;
  border-radius: 3px;
}
.zImg {
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-left: 30px;
}
#zhifubao p {
  font-size: 20px;
  text-align: center;
  margin-top: -35px;
  margin-left: 50px;
}
.cost:hover {
  cursor: pointer;
}
.immediately {
  width: 1190px;
  height: 150px;
  margin: 20px auto;
}
.immediately:hover {
  cursor: pointer;
}
.immediately-pay {
  width: 200px;
  height: 80px;
  background-color: #ff5959;
  margin-left: 20px;
  border-radius: 3px;
  text-align: center;
  line-height: 80px;
  color: #fff;
  font-size: 30px;
  font-weight: 700;
}
.three >>> .el-step__icon,
.is-text {
  border-color: #409eff;
}
.three >>> .el-step__head,
.is-finish {
  color: #409eff;
}
.three >>> .el-step__title,
.is-finish {
  color: #409eff;
}
.three >>> .el-step__title.is-process {
  font-weight: normal;
}
.two >>> .el-step__line {
  background-color: #409eff;
}
.payment {
  border: 1px solid #0dc572 !important;
}
</style>