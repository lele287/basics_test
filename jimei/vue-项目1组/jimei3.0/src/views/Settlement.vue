// 结算
<template>
  <div class="settlement">
    <div class="top">
      <div class="top-left">
        <img src="../assets/images/logo2.png" alt="" class="logo" />
        <h2 class="settlementName">结算页</h2>
      </div>
      <div class="top-right">
        <el-steps :space="200" :active="1" finish-status="success">
          <el-step title="购物车"></el-step>
          <el-step title="结算页"></el-step>
          <el-step title="支付"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="allMes">
      <span class="tableTop">填写并核对订单信息</span>
      <div class="thisHover">
        <Address @setdata="getData" @setaddr="getaddr" @setphone="getphone"/>
      </div>
    <div class="settlementSpace">
      <div class="settlementMes">
        <div class="settlementTotal">
          <span class="settlementTotalWord">应付总额：</span>
          <span class="settlementTotalMoney"> ￥{{this.total}}</span>
        </div>
        <div class="settlementAddrSpace">
          <span>寄送至：</span>
          <span class="settlementAddr">{{userAddr}}</span>
          <span>收货人：</span>
          <span class="settlementAddrName">{{userName}}</span>
          <span class="settlementAddrTel">{{userPhone}}</span>
        </div>
      </div>
    <div class="buttonDiv">
      <el-button type="danger" @click="toOrder">立即结算</el-button>
    </div>
    </div>
    </div>
  </div>
</template>
<script>
import Address from "@/components/Address.vue";
export default {
  name: "Settlement",
  components: {
    Address
  },
  data(){
    return{
      total:0,
      userName:"",
      userAddr:"",
      userPhone:""
    }
  },
  methods: {
    getData(res){
      console.log("hi")
      console.log('接受的数据',res)
      this.total = res
      console.log("selettment total",this.total)
    },
    getaddr(res){
      this.userAddr = res.recAddress
      this.userName = res.recName
      if(res.recPhone!=null){
        this.userPhone = res.recPhone
      }
      console.log("123",res)
    },
    getphone(res){
      if(this.userPhone==null){
        this.userPhone = res
      }
      console.log("321",res)
    },
    toOrder(){
      let buyGoods = JSON.parse(sessionStorage["buyGood"]);
      let uName = this.$store.state.user.userName;
      for(let i = 0 ; i < buyGoods.length ;i++){
      var thisGood = JSON.parse(sessionStorage["buyGood"])[i];
      var goodId = thisGood.gid;
      var goodNum = thisGood.num;
      var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
      var tPrice = thisGood.price*thisGood.num;
      this.$axios.post("/api/order/addOrder",{
        userName:uName,
        goodId:goodId,
        goodNum:goodNum,
        time:time,
        tPrice:tPrice
      }).then((res)=>{}).catch((err)=>{})
      }
      this.$router.push({
        path:`person/personOrder`
      })
      console.log("buyGoods",buyGoods)
    }
  }
}
</script>
<style scoped>
.settlementAddrSpace{
  font: 12px/150% tahoma,arial,Microsoft YaHei,Hiragino Sans GB,"\u5b8b\u4f53",sans-serif;
}
.settlementAddrName{
  margin-right: 5px;
}
.buttonDiv{
  float: right;
  margin-top: 14px;
  margin-right: 10px;
}
.settlement {
  width: 1260px;
  margin: 0 auto;
  position: relative;
  margin-top: 50px;
}

.top {
  display: flex;
}
.top-left {
  display: flex;
  align-items: center;
  width: 250px;
}
.top-right {
  width: 1000px;
}
.logo {
  width: 126px;
  height: 75px;
}
.settlementName {
  display: inline-block;
  margin-left: 10px;
}
.el-steps--horizontal {
  width: 450px;
  float: right;
}
.allMes {
  margin-top: 50px;
  margin-bottom: 20px;
}
.tableTop {
  display: inline-block;
  margin-left: 15px;
  margin-bottom: 15px;
  line-height: 42px;
  font-size: 16px;
  font-family: "Microsoft YaHei";
  font-weight: 300;
}
.thisHover {
  margin: 0 auto;
  width: 1200px;
  border: 1px solid #ccc;
}
.settlementSpace{
  width: 1202px;
  height: 131px;
    margin: 0 auto;
    margin-top: 15px;
}
.settlementMes{
  padding: 15px 10px 15px 0;
  line-height: 20px;
  text-align: right;
  border-top: 1px solid #e6e6e6;
  color: #999;
  background-color:#f4f4f4;
}
.settlementTotalWord{
  color: #666;
  line-height: 25px;
  font-size: 12px;
}
.settlementTotalMoney{
  color: #e4393c;
  font-family: Verdana;
  font-weight: 700;
  min-width: 122px;
  text-align: right;
  margin-left:20px ;
}
.settlementAddr{
  margin-right: 20px;
}
</style>