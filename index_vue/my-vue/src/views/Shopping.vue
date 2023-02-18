<template>
  <div class="shopping">
    <div class="top_content">
      <Logo></Logo>
      <Search></Search>
    </div>
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
    <div class="c-container" style="clear: both">
      <div class="w">
        <div class="cart-filter-bar">
          <em>我的购物车</em>
        </div>
        <!-- 购物车主要核心区域 -->
        <div class="cart-warp">
          <!-- 头部全选模块 -->
          <div class="cart-thead">
            <div class="t-checkbox">
              <input
                type="checkbox"
                name=""
                id=""
                v-model="SelectAll"
                @click="onSelectAll"
                class="checkall"
              />
              全选
            </div>
            <div class="t-goods">商品</div>
            <div class="t-price">单价</div>
            <div class="t-num">数量</div>
            <div class="t-sum">总计</div>
            <div class="t-action">操作</div>
          </div>
          <!-- 商品详细模块 -->
          <div class="cart-item-list">
            <div class="emptys" v-if="emptys">
              您的购物车还没有商品！快去添加吧！
            </div>
            <table
              class="tab"
              v-for="(data, index) in showShopping"
              :key="index"
            >
              <tr>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  class="check"
                  @click="onChoose(index)"
                  v-model="choose[index]"
                />
                <td class="commodity">
                  <img :src="data.drugsPhoto" alt="" />
                  <div class="infor">
                    <p>{{ data.drugsIntroduce.split(" ")[0] }}</p>
                    <p>{{ data.drugsIntroduce.split(" ")[1] }}</p>
                    <p>{{ data.drugsIntroduce.split(" ")[2] }}</p>
                  </div>
                </td>
                <div class="qq">
                  <td>
                    <span>{{ data.drugsPrice }}</span>
                  </td>
                  <td>
                    <el-input-number
                      size="mini"
                      v-model="nums[index]"
                      @change="handleChange()"
                      :min="1"
                    ></el-input-number>
                  </td>
                  <td>{{ data.drugsPrice.substring(1) * nums[index] }}元</td>
                  <td @click="deletes(index)">删除</td>
                </div>
              </tr>
            </table>
          </div>

          <!-- 结算模块 -->

          <div class="cart-floatbar">
            <div class="select-all">
              <input
                type="checkbox"
                name=""
                id=""
                v-model="SelectAll"
                @click="onSelectAll"
                class="checkall"
              />全选
            </div>
            <div class="operation">
              <a
                href="javascript:;"
                class="remove-batch"
                data-toggle="modal"
                data-target="#myModal"
                @click="appoint"
              >
                删除选中的商品</a
              >
            </div>
            <div class="toolbar-right">
              <div class="amount-sum">
                已经选<em>{{ Selected }}</em
                >件商品
              </div>
              <div class="price-sum">
                总价： <em>￥{{ TotalPrice }}</em>
              </div>
              <!-- <div class="btn-area" id="toRefOrder">去结算</div> -->
              <div
                class="btn-area"
                id="toRefOrder"
                :class="{ adopt: adopt }"
                @click="settlement"
              >
                去结算
              </div>
            </div>
          </div>
          <div class="tips">请勾选您需要结算的商品</div>
        </div>
      </div>
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
      nums: [],
      userName: "",
      showShopping: "",
      emptys: true,
      SelectAll: false,
      choose: [],
      drId: [],
      indexs: [],
      Selected: 0,
      TotalPrice: 0,
      adopt: false,
      shoppingId: [],
      insertId: [],
      orderTime: "", // 获取当前时间
    };
  },
  methods: {
    deletes(index) {
      this.userName = localStorage.getItem("userName");
      // console.log(this.showShopping[index].drugsId);
      // console.log(this.userName);
      this.drId.push(this.showShopping[index].drugsId);
      this.$axios
        .get("/api/productsRouter/delShopping", {
          params: {
            drId: this.drId,
            userName: this.userName,
          },
        })
        .then((res) => {
          console.log("res:", res);
          if (res.data.data == 1) {
            this.showShopping.splice(index, 1);
            this.choose.splice(index, 1);
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    onSelectAll() {
      this.SelectAll = !this.SelectAll;
      var Selected = 0;
      this.TotalPrice = 0;
      for (var i = 0; i < this.choose.length; i++) {
        this.choose[i] = this.SelectAll;
        if (this.choose[i] == true) {
          this.adopt = true;
          Selected++;
          this.TotalPrice +=
            (this.showShopping[i].drugsPrice.substring(1) *
              100 *
              this.nums[i]) /
            100;
        } else {
          this.adopt = false;
        }
      }
      this.Selected = Selected;
    },
    onChoose(index) {
      this.SelectAll = false;
      this.choose[index] = !this.choose[index];
      for (var i = 0; i < this.choose.length; i++) {
        if (this.choose[i] == true) {
          this.SelectAll = true;
        } else {
          this.SelectAll = false;
          i = this.choose.length;
        }
      }
      var Selected = 0;
      this.TotalPrice = 0;
      for (var i = 0; i < this.choose.length; i++) {
        if (this.choose[i] == true) {
          this.adopt = true;
          i = this.choose.length;
        } else {
          this.adopt = false;
        }
      }
      for (var i = 0; i < this.choose.length; i++) {
        if (this.choose[i] == true) {
          Selected++;
          this.TotalPrice +=
            (this.showShopping[i].drugsPrice.substring(1) *
              100 *
              this.nums[i]) /
            100;
        }
      }
      this.Selected = Selected;
    },
    appoint() {
      this.userName = localStorage.getItem("userName");
      for (var i = 0; i < this.indexs.length; i++) {
        console.log(this.indexs);
        this.indexs.shift();
      }
      for (var i = 0; i < this.choose.length; i++) {
        if (this.choose[i] == true) {
          this.indexs.push(i);
          this.drId.push(this.showShopping[i].drugsId);
        }
      }
      console.log(this.indexs);
      this.$axios
        .get("/api/productsRouter/delShopping", {
          params: {
            drId: this.drId,
            userName: this.userName,
          },
        })
        .then((res) => {
          console.log("res:", res);
          if (res.data.data == 1) {
            for (var i = this.indexs.length - 1; i >= 0; i--) {
              // console.log(this.indexs[i]);
              this.showShopping.splice(this.indexs[i], 1);
              this.choose.splice(this.indexs[i], 1);
              // this.indexs.shift();
            }
            this.$message({
              message: "删除成功",
              type: "success",
            });
          } else {
            this.$message.error("删除失败");
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    handleChange(value) {
      console.log(value);
    },
    settlement() {
      this.orderTime = new Date().getTime();
      console.log(this.orderTime);
      this.userName = localStorage.getItem("userName");
      if (sessionStorage.getItem("shoppingId")) {
        this.shoppingId = [];
      }
      if (sessionStorage.getItem("insertId")) {
        this.insertId = [];
      }
      for (let i = 0; i < this.choose.length; i++) {
        if (this.choose[i]) {
          // console.log(this.showShopping[i].drugsId);
          this.shoppingId.push({ shoppings: this.showShopping[i].drugsId });
          this.$axios
            .post("/api/users/CommodityOrder", {
              userName: this.userName,
              shoppingId: this.showShopping[i].drugsId,
              drugsCount: this.nums[i],
              ToBePaid: 0,
              orderTime: this.orderTime,
            })
            .then((res) => {
              console.log("res:", res);
              // console.log("id::",this.insertId);
              this.insertId.push({ insertId: res.data.data.insertId });
              sessionStorage.setItem("insertId", JSON.stringify(this.insertId));
            })
            .catch((err) => {
              console.log("err:", err);
            });
        }
      }
        this.$router.push("/pay");
      sessionStorage.setItem("shoppingId", JSON.stringify(this.shoppingId));
    },
  },
  components: {
    Footer,
    Logo,
    Search,
  },
  beforeCreate() {
    // if (!localStorage.getItem("userName")) {
    //   this.$router.push("/login");
    // }
    this.userName = localStorage.getItem("userName");
    console.log(this.userName);
    this.$axios
      .get("/api/productsRouter/showShopping", {
        params: {
          username: this.userName,
        },
      })
      .then((res) => {
        // console.log("res:", res);
        this.showShopping = res.data.data;
        for (var i = 0; i < this.showShopping.length; i++) {
          this.nums.push(this.showShopping[i].drugsCount);
          this.choose.push(false);
        }
        // console.log(this.showShopping[i].drugsId);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
  beforeUpdate() {
    if (this.showShopping.length !== 0) {
      this.emptys = false;
    } else {
      this.emptys = true;
    }
  },
  beforeMount() {
    if (!localStorage.getItem("MyToken")) {
      this.$message({
        message: "登录信息已过期，请先登录！",
        type: "warning",
      });
      this.nowUrl = this.$route.path;
      this.$router.push({ path: "/login?orginUrl=" + this.nowUrl });
    } else {
      this.$router.push("/shopping");
    }
  },
};
</script>

<style lang="css" scoped>
.top_content /deep/ .el-button--success {
  height: 40px;
  position: relative;
  left: 95px;
  top: 8.5px;
}
.top_content /deep/ .logoImg {
  position: relative;
  left: 0px;
  top: 55px;
  /* top: -10px; */
  /* top: 0; */
}
.top_content /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.top_content /deep/ .shopping {
  margin-top: -88px;
}
.top_content /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.top_content /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}

.shopping /deep/ .down {
  height: 300px;
}
.shopping /deep/.content-top-left dd {
  margin-top: 5px;
}
.shopping /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.shopping /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.shopping /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.shopping /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.shopping /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}

.article-top {
  width: 100%;
  height: 130px;
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
.w {
  width: 1190px;
  margin: 0 auto;
}

.car-header {
  padding: 20px 0;
}

.car-logo img {
  vertical-align: middle;
}

.car-logo b {
  font-size: 20px;
  margin-top: 20px;
  margin-left: 10px;
}

.cart-filter-bar {
  font-size: 16px;
  color: #e2231a;
  font-weight: 700;
}

.cart-filter-bar em {
  padding: 5px;
  border-bottom: 1px solid #e2231a;
}

.cart-thead {
  width: 1190px;
  height: 24px;
  line-height: 23px;
  margin: 5px 0px 10px;
  padding: 5px 0;
  background: #f3f3f3;
  border: 1px solid #e9e9e9;
  border-top: 0;
  position: relative;
  background-color: #fff;
}
.cart-thead > div {
  font-size: 14px;
  line-height: 24px;
}
.cart-thead > div,
.cart-item > div {
  float: left;
}

.t-checkbox,
.p-checkbox {
  height: 18px;
  line-height: 18px;
  width: 122px;
  padding-left: 11px;
}
input[type="checkbox"] {
  margin-top: -4px !important;
}
.t-goods {
  width: 400px;
}

.t-price {
  width: 260px;
  padding-right: 6px;
  text-align: right;
}

.t-num {
  width: 132px;
  margin-left: 24px;
  text-align: center;
}

.t-sum {
  width: 75px;
  text-align: right;
}

.t-action {
  width: 130px;
  text-align: right;
}

.cart-item {
  height: 160px;
  border-style: solid;
  border-width: 2px 1px 1px;
  border-color: #aaa #f1f1f1 #f1f1f1;
  background: #fff;
  padding-top: 14px;
  margin: 15px 0;
}

.check-cart-item {
  background: #fff4e8;
}

.p-checkbox {
  width: 50px;
}

.p-goods {
  margin-top: 8px;
  margin-left: 27px;
  width: 470px;
}

.p-img {
  float: left;
  border: 1px solid #ccc;
  padding: 5px;
}
.p-img img {
  width: 80px;
  height: 80px;
}

.p-msg {
  float: left;
  width: 210px;
  margin: 0 10px;
}

.p-price {
  width: 100px;
  padding-left: 20px;
}

.quantity-form {
  width: 80px;
  height: 22px;
}

.p-num {
  width: 137px;
}

.decrement,
.increment {
  float: left;
  border: 1px solid #cacbcb;
  height: 22px;
  line-height: 18px;
  padding: 1px 0;
  width: 16px;
  text-align: center;
  color: #666;
  margin: 0;
  background: #fff;
  margin-left: -1px;
}

.itxt {
  float: left;
  border: 1px solid #cacbcb;
  width: 42px;
  height: 22px;
  line-height: 18px;
  text-align: center;
  padding: 1px;
  margin: 0;
  margin-left: -1px;
  font-size: 12px;
  font-family: verdana;
  color: #333;
  -webkit-appearance: none;
}

.p-sum {
  font-weight: 700;
  width: 141px;
  /* margin-left: -18px; */
}
.p-action {
  width: 58px;
  margin-left: -5px;
}

/* 结算模块 */

.cart-floatbar {
  height: 50px;
  border: 1px solid #f0f0f0;
  background: #fff;
  position: relative;
  line-height: 50px;
}
.tips {
  width: 200px;
  height: 30px;
  line-height: 30px;
  border: 2px #e2231a dashed;
  text-align: center;
  color: #666;
  margin-left: 990px;
  display: none;
  margin-bottom: 50px;
}
.select-all {
  float: left;
  height: 18px;
  line-height: 18px;
  padding: 16px 0 16px 9px;
  white-space: nowrap;
}

.select-all input {
  vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
}

.operation {
  float: left;
  width: 230px;
  margin-left: 40px;
}

.clear-all {
  font-weight: 700;
  margin: 0 10px;
}

.toolbar-right {
  float: right;
  position: relative;
}

.amount-sum {
  float: left;
}

.amount-sum em {
  font-weight: 700;
  color: #e2231a;
  padding: 0 3px;
}

.price-sum {
  float: left;
  margin: 0 15px;
}

.price-sum em {
  font-size: 16px;
  color: #e2231a;
  font-weight: 700;
}

.btn-area {
  font-weight: 700;
  width: 94px;
  height: 49px;
  line-height: 52px;
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  background: #ccc;
  overflow: hidden;
  cursor: not-allowed;
}
.toolbar-right >>> .adopt {
  background: #e2231a;
  cursor: pointer;
}

.foot111 {
  width: 100px;
  height: 360px;
  background-color: #fff;
}
.two >>> .el-step__icon,
.is-text {
  border-color: #c0c4cc;
}
.two >>> .el-step__head,
.is-finish {
  color: #c0c4cc;
}
.two >>> .el-step__title,
.is-finish {
  color: #c0c4cc;
}
.article-top-bx >>> .el-step__line-inner {
  border-color: #c0c4cc;
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

.tab {
  width: 100%;
  clear: both;
  border: 1px solid #ccc;
  border-top: 3px solid #aaa;
  margin: 20px 0;
  border-collapse: collapse;
  position: relative;
}
.tab td {
  width: 220px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}

.tab tr {
  border-top: 1px solid #ccc;
  /* border-bottom: 1px solid #ccc; */
}
.tab >>> .commodity {
  position: absolute;
  left: 70px;
}
.commodity > img {
  width: 100px;
  height: 100px;
  float: left;
}
.tab .number {
  text-align: left;
  /* border: 1px solid #ccc; */
}
.tab .qq {
  float: right;
}
.tab .qq td {
  width: 115px;
  line-height: 120px;
  cursor: pointer;
}
.cart-item-list {
  background-color: #fff;
}
.check {
  position: absolute;
  top: 20px;
  left: 5px;
}
.infor p {
  margin: 0;
  margin-top: 10px;
  padding: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
}
.infor p:nth-child(2) {
  height: 40px;
}
.emptys {
  width: 100%;
  height: 300px;
  background-color: #fff4e8;
  font-size: 30px;
  text-align: center;
  z-index: 1000;
}
</style>