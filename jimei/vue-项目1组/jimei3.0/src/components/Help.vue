<template>
    <div class="container">
        <div class="row">
            <div class="lineLeft"><img src="../assets/images/help.png" alt=""></div>
            <span class="helpThings">帮助与购买指南</span>
            <div class="lineRight"><img src="../assets/images/help.png" alt=""></div>
            <div class="box1" @mouseenter="onMouseOver" @mouseleave="onMouseOut">
                <div v-show='sellDefault'> 
                    <img src="../assets/images/seller.png" alt=""><span class="sell">卖家</span>
                </div>
                <div v-show="sell">
                    <span class="sell2">卖家通过注册成为卖家，发布商品、价格以及位置等详细信息即可</span>
                </div>
            </div>
            <div class="box2"  @mouseenter="onMouseOver1" @mouseleave="onMouseOut1">
                <div v-show="dispatchDefault">
                    <img src="../assets/images/dispatching.png" alt=""><span class="dispatch">配送</span>
                </div>
                <div v-show="dispatch">
                    <span class="dispatch2">卖家负责提供免费配送服务</span>
                </div>
            </div>
            <div class="box3"  @mouseenter="onMouseOver2" @mouseleave="onMouseOut2">
                <div v-show="contactDefault">
                    <img src="../assets/images/contact.png" alt=""><span class="contact">联系我们</span>
                </div>
                <div v-show="contact">
                    <span class="contact2">如出现任何商品问题可以直接通过平台与卖家联系</span>
                </div>
             </div>
            <div class="box4"  @mouseenter="onMouseOver3" @mouseleave="onMouseOut3">
                <div v-show="buyDefault">
                    <img src="../assets/images/buyer.png" alt=""><span class="buy">买家</span>
                </div>
                <div v-show="buy">
                    <span class="buyer2">买家通过注册成为买家，填写学校、详细地址、电话等信息即可</span>
                </div>
            </div>
            <div class="box5"  @mouseenter="onMouseOver4" @mouseleave="onMouseOut4">
                <div v-show="payDefault">
                <img src="../assets/images/pay.png" alt=""><span class="pay">支付</span>
                </div>
                <div v-show="pay">
                    <span class="pay2">买家可选择微信、支付宝两种方式付款</span>
                </div>
            </div>
            <div class="box6"  @mouseenter="onMouseOver5" @mouseleave="onMouseOut5">
                <div v-show="retDefault">
                <img src="../assets/images/return.png" alt=""><span class="return">退货和退款</span>
                </div>
                <div v-show="ret">
                    <span class="return2">如出现与实际描述不符合或不喜欢等问题买家可通过平台联系卖家进行退货退款</span>
                </div>
            </div>
        </div>




    </div>
</template>
<script>
   export default {
     data(){
         return {
             sellDefault:true,
             sell:false,
             dispatchDefault:true,
             dispatch:false,
             contactDefault:true,
             contact:false,
             buyDefault:true,
             buy:false,
             payDefault:true,
             pay:false,
             retDefault:true,
             ret:false
         }
     },
      methods:{
          onMouseOver:function(){
              this.sell=true,
              this.sellDefault=false
             
          },
          onMouseOut:function(){
            this.sellDefault=true,
            this.sell=false 
           
          },
           onMouseOver1:function(){
              this.dispatch=true,
              this.dispatchDefault=false
          },
          onMouseOut1:function(){
          
            this.dispatchDefault=true,
            this.dispatch=false
          },
           onMouseOver2:function(){
              this.contact=true,
              this.contactDefault=false
          },
          onMouseOut2:function(){  
            this.contactDefault=true,
            this.contact=false
          },
           onMouseOver3:function(){
              this.buy=true,
              this.buyDefault=false
          },
          onMouseOut3:function(){
          
            this.buyDefault=true,
            this.buy=false
          },
           onMouseOver4:function(){
              this.pay=true,
              this.payDefault=false
          },
          onMouseOut4:function(){
            this.payDefault=true,
            this.pay=false
          },
           onMouseOver5:function(){
              this.ret=true,
              this.retDefault=false
          },
          onMouseOut5:function(){
            this.retDefault=true,
            this.ret=false
          }
      }
   }  
</script>
<style scoped>
.lineLeft {
  display: inline-block;
  margin-left: 165px;
  position: absolute;
  top: 20px;
   /* margin-top: 40px; */
}
.helpThings {
  display: inline-block;
  font-size: 30px;
  line-height: 120px;
  font-weight: 700px;
  margin-left: 515PX;
  
  /* margin-top: 50px; */
  
}
.lineRight {
  display: inline-block;
  margin-left: 120px;
  position: absolute;
  top: 20px;
}
.fixed {
  width: 100%;
  height: 50px;
  top: 0;
  transition: 0.7s ease-in;
  position: fixed;
  z-index: 20;
}
.row{
  position: relative;
}
.box1,.box2,.box3,.box4,.box5,.box6 {
  border: 1px solid #ccc;
  width: 250px;
  height: 120px;
  position: relative;
  
}
.box1 img,.box2 img,.box3 img,.box4 img,.box5 img,.box6 img{
    width: 110px;
    height: 72px;
}
.box1{
    position: absolute;
    left: 230px;
    top: 170px;
    }
.box1 img {
  position: absolute;
  top: 5px;
  left: 80px;
 
}
.sell {
  position: absolute;
  top: 73px;
  left: 119px;
}
.sell2 {
  position: absolute;
  top: 35px;
  left: 8px;
  color: #ccc;
}
.box2 {
  position: absolute;
  top:170px;
  left: 495px;
}
.box2 img {
  position: absolute;
  top: 10px;
  left: 75px;
}
.dispatch {
  position: absolute;
  top: 73px;
  left: 115px;
}
.dispatch2 {
  position: absolute;
  top: 40px;
  left: 30px;
  color: #ccc;
}
.box3 {
  position: absolute;
  top: 170PX;
  left: 760px;
}
.box3 img {
  position: absolute;
  top: 12px;
  left: 62px;
}
.contact {
  position: absolute;
  top: 74px;
  left: 102px;
}
.contact2 {
  position: absolute;
  top: 40px;
  left: 15px;
  color: #ccc;
}
.box4 {
  position: absolute;
  top: 330px;
  left: 230px;
 
}
.box4 img {
  position: absolute;
  top: 5px;
  left: 80px;
}
.buy {
  position: absolute;
  top: 73px;
  left: 119px;
}
.buyer2 {
  position: absolute;
  top: 40px;
  left: 10px;
  color: #ccc;
}
.box5 {
  position: absolute;
  top: 330px;
  left: 495px;
}
.box5 img {
  position: absolute;
  top: 8px;
  left: 75px;
}
.pay {
  position: absolute;
  top: 76px;
  left: 115px;
}
.pay2 {
  position: absolute;
  top: 40px;
  left: 5px;
  color: #ccc;
}
.box6 {
  position: absolute;
  left: 760px;
  top:330px;
}
.box6 img {
  position: absolute;
  top: 10px;
  left: 80px;
}
.return {
  position: absolute;
  top: 75px;
  left: 93px;
}
.return2 {
  position: absolute;
  top: 30px;
  left: 5px;
  color: #ccc;
}
</style>