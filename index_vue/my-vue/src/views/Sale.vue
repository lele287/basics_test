<template>
  <div class="sale">
    <h2 class="wddd">我的售后</h2>
    <ul class="all-order-first-bottom-ul">
      <li class="list">商品</li>
      <li class="textall">退款金额</li>
      <li class="textall">售后状态</li>
    </ul>
    <table class="tab">
      <!-- <tr>
        <td>商品</td>
        <td>价格(元)</td>
        <td>数量</td>
        <td>小计(元)</td>
      </tr> -->
      <tr>
        <td colspan="4" class="number">订单号：1024374958389</td>
      </tr>
      <tr>
        <td class="commodity">
          <img src="../assets/logo.png" alt="" />
          <div class="infor">
            <p>肛泰</p>
            <p>10ml*10支</p>
          </div>
        </td>
        <td><span>￥90</span></td>
        <td>申请售后</td>
      </tr>
    </table>
  </div>
</template>
<style lang="css" scoped>
.sale {
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
  width: 300px;
  height: 35px;
  text-align: center;
  line-height: 35px;
}

.tab tr {
  border-top: 1px solid #ccc;
}
.tab td:nth-last-of-type(1){
    border-right: 1px solid #ccc;
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
.number{
  font-size: 14px;
  /* color: #aaa; */
}
.all-order-first-bottom-ul {
  clear: both;
  padding: 0;
  margin: 0;
}
.all-order-first-bottom-ul li {
  float: left;
  width: 300px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  margin-top: 10px;
}
</style>