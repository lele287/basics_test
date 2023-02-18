<template>
  <div class="all">
    <div class="tableTitle">
      <h3>收货人信息</h3>
      <div class="extra-r">
        <a @click="toAdd">新增收货地址</a>
      </div>
    </div>
    <div class="consignee-scroll">
      <div v-if="have"  class="emtpy">
        <span>您还没有添加默认收货地址哦</span>
      </div>
      <div v-else>
      <el-dropdown :placement="placement" :trigger="trigger">
  <span class="el-dropdown-link">
    <ul>
        <li>
          <span class="addr-name">{{defaultAddress.recName}}</span>
          <span class="addr-info">{{defaultAddress.recAddress}}</span>
          <span class="addr-tel" v-if="defaultAddress.recPhone">{{defaultAddress.recPhone}}</span>
          <span class="addr-tel" v-else>{{userPhone}}</span>
          <span class="addr-default">默认地址</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </li>
      </ul>
  </span>
  <el-dropdown-menu slot="dropdown">
        <ul><el-dropdown-item v-for="(item , index) in addrMes" :key="index" class="toleft">
        <li @click="changeRec(index)">
          <span class="addr-id" style="display:none" ref="here">{{item.recId}}</span>
          <span class="addr-name">{{item.recName}}</span>
          <span class="addr-info">{{item.recAddress}}</span>
          <span class="addr-tel" v-if="item.recPhone">{{item.recPhone}}</span>
          <span class="addr-tel" v-else>{{userPhone}}</span>
        </li>
      </el-dropdown-item></ul>
  </el-dropdown-menu>
</el-dropdown>
      </div>
    </div>
        <div class="hr"></div>
    <div class="tableTitle">
      <h3>商品清单</h3>
      <div class="extra-r">
        <a @click="toShopCart">返回购物车</a>
      </div>
    </div>  
        <div class="good-items" v-for="(item , index) in goodMes" :key="index">
        <div class="goods-tit">
            <span class="setter">卖家：{{item.uName}}</span>
        </div>
        <div class="goodMes">
            <div class="pic">
                <a @click="jump(index)">
                    <img :src="item.gPic" alt="">
                </a>
            </div>
            <div class="goodWord">
              <div class="goodId" style="display:none" ref="jumpId">{{item.gId}}</div>
                <div class="goodName">
                    <span><a @click="jump(index)">{{item.gName}}</a></span>
                </div>
                <div class="goodPrice">
                    <span>￥ {{item.gPrice}}</span>
                </div>
                <div class="gooNum">
                    <span>x{{item.num}}</span>
                </div>
                <div class="goodTotal">
                    <span>￥ {{item.totalPrice}}</span>
                </div>
            </div>
                <div class="goodDetails">
                  <span v-if="item.show">
                    卖家没有对该商品做过多简介哦
                  </span>
                    <span v-else>{{item.gMes}}</span>
                </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addrMes:[],
      userPhone:"",
      defaultAddress:[],
      placement:"bottom",
      trigger:"click",
      have:true,
      goodMes:[],
      total:0
    }
  },
  mounted(){
    this.getAddr(this.$store.state.user.userName)
    this.showAddr(this.$store.state.user.userName)
    this.showGoods()
  },
  methods:{
    jump(index){
      console.log(index)
      console.log(this.$refs.jumpId[index].innerHTML)
            this.$router.push({
                path:`/detail?gId=${this.$refs.jumpId[index].innerHTML}`
            });
    },
    showGoods(){
      var buyGoods = JSON.parse(sessionStorage["buyGood"]);
      this.goodMes = [];
      let total = 0;
      for(let i = 0 ; i < buyGoods.length ;i++){
        let gid = buyGoods[i].gid;
      this.$axios.get('/api/goods/GoodMes',{params:{gid:gid}})
      .then((res)=>{
        let all = res.data.data[0];
        all = JSON.parse(JSON.stringify(all))
        all.num = buyGoods[i].num;
        all.totalPrice = res.data.data[0].gPrice * buyGoods[i].num;
        total += all.totalPrice
        if(res.data.data[0].gMes == null){
          all.show = true
        }
        else{all.show = false}
        this.goodMes.push(all)
        this.total = total;
        console.log("goodMes",this.goodMes)
        console.log("total",this.total)
        this.setTotal(this.total)
      })
      .catch((err)=>{
        console.log(err)
      })
      }
    },
    setTotal(data){
      this.$emit('setdata',data)
    },
    getAddr(uName){
      this.have=false
      this.defaultAddress = [];
      this.userPhone="";
      this.$axios.all([
        this.$axios.post("/api/userRec/getUserRec",{userName:uName}),
        this.$axios.post("/api/users/getPhone",{uName:uName})
      ])
      .then(this.$axios.spread((userAddrRes,userPhoneRes)=>{
        this.defaultAddress=(JSON.parse(JSON.stringify(userAddrRes.data.data[0])))
        this.userPhone = userPhoneRes.data.data[0].uPhone;
        this.setAddr(this.defaultAddress);
        this.setPhone(this.userPhone);
      }))
      .catch((err)=>{
        console.log("err",err)
      })
    },
    setAddr(data){
      console.log("地址",data)
      this.$emit('setaddr',data)
    },
    setPhone(data){
      console.log("电话",data)
      this.$emit('setphone',data)
    },
    showAddr(uName){
      this.addrMes = [];
      this.userPhone="";
      this.$axios.all([
        this.$axios.get("/api/userRec/getMyRec",{params:{userName:uName}}),
        this.$axios.post("/api/users/getPhone",{uName:uName})
      ])
      .then(this.$axios.spread((userAddrRes,userPhoneRes)=>{
        for(let i = 0 ; i < userAddrRes.data.data.length ;i++){
          this.addrMes.push(userAddrRes.data.data[i])
        };
        this.userPhone = userPhoneRes.data.data[0].uPhone;
      }))
      .catch((err)=>{
        console.log("err",err)
      })
    },
    changeRec(index){
      console.log("index",index)
      console.log("recId",this.$refs.here[index].innerHTML)
      this.$axios.post("/api/users/changeRec",{recId:this.$refs.here[index].innerHTML,userName:this.$store.state.user.userName})
      .then((res)=>{
        this.getAddr(this.$store.state.user.userName)
      })
      .catch((err)=>{
        console.log("err",err)
      })
    },
    toAdd(){
      this.$router.push({
        path:`person/personAddress`
      });
    },
    toShopCart(){
      this.$router.push({
        path:`shoppingCart`
      });
    }
  }
}
</script>
<style scoped>
.all {
  font-family:Microsoft YaHei;
  font-size: 12px;
  color: #666;
}
.hr{
    width: 1160px;
    margin: 0 auto;
    border-bottom:1px solid #e6e6e6 ;
    height: 0;
    margin-bottom: 10px;
}

h3 {
  display: block;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.goodMes{
    overflow: hidden;
}
.tableTitle {
  padding-left: 10px;
  padding-right: 10px;
  line-height: 40px;
  height: 40px;
  color: #333;
}
.tableTitle h3 {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  float: left;
}

.extra-r {
  float: right;
}
.extra-r a {
  cursor: pointer;
  color: #005ea7;
  text-decoration: none;
}
ul {
  list-style: none;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  /* padding-inline-start: 40px; */
}
.emtpy{
  margin-left: 50px;
  font-size:14px ;
  cursor: default;
}
.consignee-scroll ul ,.emtpy{
    margin-top: 20px;
    margin-bottom:20px ;
  width: 650px;
}
.consignee-scroll li ,.emtpy{
  height: 30px;
  line-height: 30px;
  /* margin: 6px 0; */
  width: 99.8%;
}
.consignee-scroll li span ,.toleft li span{
  display: inline-block;
  margin-left: 10px;
}
.consignee-scroll .addr-default {
  margin: 5px 10px;
  background-color: #999;
  color: white;
  padding: 0 3px;
  line-height: 20px;
}
.goodWord{
    overflow: hidden;
}
.good-items{
    margin-top:20px ;
    margin-bottom:40px ;
}
.good-items a{
  cursor: pointer;
}
.setter{
    margin-left: 50px;
}
.goods-tit{
    height: 24px;
    padding: 0 20px;
}
.goods-tit h3{
    float: left;
    width: 49%;
    line-height: 24px;
    font-size: 16px;
}
.goodMes{
    width: 950px;
    margin: 0 auto;
}
.pic{
    float: left;
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    margin-right: 10px;
    background-color: #fff;
}
.pic img{
    width: 80px;
    height: 80px;
}
.goodName{
    font-size: 14px;
   float: left;
   width: 49.8%;
   height: 3em;
   line-height: 1.5em;
   overflow: hidden;
   margin-bottom: 10px; 
}
.goodName a{
  color: #666;
  text-decoration: none;
}
.goodPrice,.goodTotal{
    width: 100px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    vertical-align: middle;
    font-weight: bold;
    float: left;
    text-align: right;
    color: #e4393c;
}
.goodTotal{
    width: 150px;
}
.gooNum{
float: left;
width: 70px;
text-align: right;
vertical-align: middle;
}
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
