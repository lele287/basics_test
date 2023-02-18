<template>
  <div class="order">
    <h2 class="wddd">我的订单</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <div v-if="isOrder == 1">
          <ul class="all-order-first-bottom-ul">
            <li></li>
            <li>商品</li>
            <li>价格(元)</li>
            <li>数量</li>
            <li>小计(元)</li>
            <li>状态</li>
          </ul>

          <table class="tab" v-for="(order, id) in Allorders" :key="id">
            <tr>
              <td colspan="6" class="number">订单号：{{ order.orderId }}</td>
            </tr>
            <tr>
              <td>
                <img :src="order.drugsPhoto" class="pic" alt />
              </td>
              <td>{{ order.drugsName }}</td>
              <td>{{ order.drugsPrice }}</td>
              <td>{{ order.drugsCount }}</td>
              <td>
                ￥{{
                  (order.drugsPrice.substring(1) * order.drugsCount).toFixed(2)
                }}
              </td>
              <td v-if="order.ToBePaid == 1">待收货</td>
              <td v-if="order.ToBePaid == 0">待付款</td>
            </tr>
          </table>
        </div>
        <div v-if="isOrder == 0" class="tip">暂无订单~</div>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="second">
        <div v-if="isNoPay == 1">
          <ul class="all-order-first-bottom-ul">
            <li></li>
            <li>商品</li>
            <li>价格(元)</li>
            <li>数量</li>
            <li>小计(元)</li>
            <li>状态</li>
          </ul>

          <table class="tab" v-for="(order, id) in NoPayorders" :key="id">
            <tr>
              <td colspan="6" class="number">订单号：{{ order.orderId }}</td>
            </tr>
            <tr>
              <td>
                <img :src="order.drugsPhoto" class="pic" alt />
              </td>
              <td>{{ order.drugsName }}</td>
              <td>{{ order.drugsPrice }}</td>
              <td>{{ order.drugsCount }}</td>
              <td>
                ￥{{
                  (order.drugsPrice.substring(1) * order.drugsCount).toFixed(2)
                }}
              </td>
              <td v-if="order.ToBePaid == 1">待收货</td>
              <td v-if="order.ToBePaid == 0">待付款<p class="countDown">剩余支付时间：{{ (time[id]/60).toFixed(2).replace('.',':')}}</p></td>
            </tr>
          </table>
        </div>
        <div v-if="isNoPay == 0" class="tip">暂无待付款订单~</div>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="third">
        <div v-if="isPayed == 1">
          <ul class="all-order-first-bottom-ul">
            <li></li>
            <li>商品</li>
            <li>价格(元)</li>
            <li>数量</li>
            <li>小计(元)</li>
            <li>状态</li>
          </ul>

          <table class="tab" v-for="(order, id) in Payedorders" :key="id">
            <tr>
              <td colspan="6" class="number">订单号：{{ order.orderId }}</td>
            </tr>
            <tr>
              <td>
                <img :src="order.drugsPhoto" class="pic" alt />
              </td>
              <td>{{ order.drugsName }}</td>
              <td>{{ order.drugsPrice }}</td>
              <td>{{ order.drugsCount }}</td>
              <td>
                ￥{{
                  (order.drugsPrice.substring(1) * order.drugsCount).toFixed(2)
                }}
              </td>
              <td v-if="order.ToBePaid == 1">待收货</td>
              <td v-if="order.ToBePaid == 0">待付款</td>
            </tr>
          </table>
        </div>
        <div v-if="isPayed == 0" class="tip">暂无待收货订单~</div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      userName: "",
      Allorders: [],
      NoPayorders: [],
      Payedorders: [],
      isOrder: 1,
      isNoPay: 1,
      isPayed: 1,
      auth_time: 0, //时间差
      now_time: 0, //现在系统时间
      time: [],
    };
  },
  // switch(key) {
  // },
  methods: {
    handleClick(tab, event) {
      //待付款订单
      this.$axios
        .post("/api/users/getNoPayOrder", { userName: this.userName })
        .then((res) => {
          console.log("res:", res);
          this.NoPayorders = res.data.data;
          if (res.data.data.length == 0) {
            this.isNoPay = 0;
          }
          //倒计时
          for (let i = 0; i < res.data.data.length; i++) {
            this.auth_time =
              (this.now_time - res.data.data[i].orderTime) / 1000; //时间差
            this.time.push(parseInt(600 - this.auth_time));
            if (this.time[i] > 0) {
              var auth_timerr = setInterval(() => {
                // console.log(this.time[i]);
                // this.time[i]--;
                this.$set(this.time, i, this.time[i]-1);
                if (this.time[i] <= 0) {
                  // alert('定时器停止了')
                  // console.log("计时：",res.data.data[i].orderId);
                  this.$axios
                    .post("/api/users/DeletePending", {
                      orderId: res.data.data[i].orderId,
                    })
                    .then((res) => {
                      console.log("res:", res);
                    })
                    .catch((err) => {
                      console.log("err:", err);
                    });
                  clearInterval(auth_timerr);
                }
              }, 1000);
            } else {
              // console.log("时间到了",res.data.data[i].orderId);
              // alert('时间到了')
              this.$axios
                .post("/api/users/DeletePending", {
                  orderId: res.data.data[i].orderId,
                })
                .then((res) => {
                  console.log("res:", res);
                })
                .catch((err) => {
                  console.log("err:", err);
                });
            }
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
      //待收货订单
      this.$axios
        .post("/api/users/getPayedOrder", { userName: this.userName })
        .then((res) => {
          // console.log("res:", res);
          this.Payedorders = res.data.data;
          // console.log(res.data.data.length);
          if (res.data.data.length == 0) {
            this.isPayed = 0;
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
  },
  created() {
    this.now_time = new Date().getTime();
    console.log(this.now_time);

    this.userName = localStorage.getItem("userName");
    //全部订单
    this.$axios
      .post("/api/users/getAllOrder", { userName: this.userName })
      .then((res) => {
        // console.log("res:", res);
        this.Allorders = res.data.data;
        if (res.data.data.length == 0) {
          this.isOrder = 0;
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
};
</script>
<style lang="css" scoped>
.order {
  width: 100%;
  height: auto;
  background-color: #fff;
  margin-top: 20px;
  padding: 15px 0 20px 50px;
}
ul {
  list-style: none;
}

.div_ul > li {
  width: 100px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  border: 1px solid #ccc;
  float: left;
}
.div_ul {
  clear: both;
  padding: 0;
}
.tab {
  clear: both;
  border: 1px solid #ccc;
  margin: 20px 0;
  border-collapse: collapse;
}
.tab td {
  width: 150px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}

.pic {
  width: 100px;
  height: 100px;
  float: left;
}
.tab .number {
  text-align: left;
}
.tip {
  height: 400px;
  line-height: 400px;
  background-color: #fff;
  text-align: center;
  color: #0dc572;
  font-size: 20px;
  font-weight: 700;
}
.all-order-first-bottom-ul {
  clear: both;
  padding: 0;
  margin: 0;
}
.all-order-first-bottom-ul li {
  float: left;
  width: 150px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  margin-top: 10px;
}
.el-tabs--top >>> .is-active {
  color: #0dc572;
}
.el-tabs--top >>> .el-tabs__active-bar {
  color: #0dc572;
  background-color: #0dc572;
}
.el-tabs--top >>> .is-top:hover {
  color: #0dc572;
}
.countDown{
  color: #f00;
}
</style>