// 商品详情
<template>
  <el-row :gutter="10">
    <el-col :xs="24" :md="6">
      <div>
        <div class="collected" v-if="collected">
            <i class="fa fa-heart" aria-hidden="true"></i>
            <el-button type="text" @click="discollectionThis" class="word">取消收藏</el-button>
        </div>
        <div class="collection" v-else>
            <i class="fa fa-heart" aria-hidden="true"></i>
            <el-button type="text" @click="collectionThis" class="word">添加收藏</el-button>
        </div>
      </div>

      <div class="comment">
        <el-rate v-model="value" disabled text-color="#ff9900"> </el-rate>
        <a href="#test">商品评价</a>
      </div>
    </el-col>
    <el-col :xs="24" :md="12">
        <div>
            <h1 class="title" v-if="goodInf[0]">{{goodInf[0].gName}}</h1>
            <h1 class="title" v-if="goodInf[0]">单价￥{{goodInf[0].gPrice}}</h1>
        </div>
        <div>
            <div class="img">
              <cjy-magnify :width="width" :url="url" :type="type" :scale="scale" />
            </div>
        </div>
        <div class="totop">
            <span class="message">
              <div v-if="goodInf[0]">
              <span v-if="goodInf[0].gMes">{{goodInf[0].gMes}}</span>
                <span v-else>暂无描述信息</span>
              </div>
            </span>
        </div>
    </el-col>
    <el-col :xs="24" :md="6">
        <div class="infor">
            <el-form label-width="80px" :model="formLabelAlign">
  <el-form-item label="点击量" v-if="goodInf[0]">
    {{goodInf[0].gHits}}
  </el-form-item>
  <el-form-item label="库存量" v-if="goodInf[0]">
    {{goodInf[0].gNum}}
  </el-form-item>
    <el-form-item label="可否小刀">
      <div v-if="goodInf[0]">
              <span v-if="goodInf[0].gDiscount == 1 ">可以小刀</span>
      <span v-else>不可小刀</span>
      </div>

  </el-form-item>
  <el-form-item label="数量" v-if="goodInf[0]">
      <el-input-number v-model="num" size="mini" controls-position="right" :min="1" :max="max" label="描述文字"></el-input-number>
  </el-form-item>
    <el-form-item label="出售人" v-if="goodInf[0]">
      {{goodInf[0].uName}}
  </el-form-item>
    <el-form-item class="last">
    <el-button type="primary" @click="addShopCart">加入购物车</el-button>
    <el-button type="success" @click="Buy" v-if="goodInf[0].gNum!=0">立即购买</el-button>
    <el-button type="success" @click="Buy" v-else disabled>立即购买</el-button>
  </el-form-item>

</el-form>

        </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      value: 5,
      formLabelAlign: {
          name: '',
          region: '',
          type: '',
        },
        num:1,
        goodInf:[],
        max:0,
        width:225,
        url:"",
        type:"square",
        scale:1.8,
        collected:false
    };
  },
  props:["msg"],
  mounted(){
    this.showMes();
    this.collectedcheck();
  },
  watch:{
    '$route':'showMes'
  },
  methods:{
    collectedcheck(){
      console.log(this.$route.query.gId)
      this.$axios.post('/api/collection/check',{gId:this.$route.query.gId,uName:this.$store.state.user.userName})
      .then((res)=>{
        if(res.data.data[0].num == 0){
          this.collected = false
        }
        else{
          this.collected = true
        }
      })
    },
    showMes(){
      let result = this.$route.query.gId;
      this.goodInf = [];
      this.$axios.get('/api/goods/GoodMes',{params:{gid:result}})
      .then((res)=>{
        this.goodInf.push(res.data.data[0])
        // console.log(this.goodInf[0])
        this.url = res.data.data[0].gPic
        this.max = res.data.data[0].gNum
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    discollectionThis(){
      //未登录情况下，不允许进入该页面
      let token=localStorage['userToken']
      if (!token) {
        this.$message.error('无法获取您的信息,请登录后再次进入此页面！');
        // let _this=this;
        // setTimeout(function(){
        //   _this.$router.replace('/login')
        // },2000)
      }else{
        let result = this.$route.query.gId;
        this.$axios.post('/api/collection/delChoice',{gId:result,uName:this.$store.state.user.userName})
        .then((res)=>{
          this.open3()
          this.collectedcheck();
        })
        .catch((err)=>{
          console.log("err",err)
        })
      }
    },
    collectionThis(){
      //未登录情况下，不允许进入该页面
      let token=localStorage['userToken']
      if (!token) {
        this.$message.error('无法获取您的信息,请登录后再次进入此页面！');
        // let _this=this;
        // setTimeout(function(){
        //   _this.$router.replace('/login')
        // },2000)
      }else{
        let result = this.$route.query.gId;
        this.$axios.post('/api/collection/addMes',{gId:result,uName:this.$store.state.user.userName})
        .then((res)=>{
          this.open1()
          this.collectedcheck();
        })
        .catch((err)=>{
          console.log("err",err)
        })
      }
    },
    addShopCart(){
      //未登录情况下，不允许进入该页面
      let token=localStorage['userToken']
      if (!token) {
        this.$message.error('无法获取您的信息,请登录后再次进入此页面！');
        // let _this=this;
        // setTimeout(function(){
        //   _this.$router.replace('/login')
        // },2000)
      }else{
        let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        this.$axios.post('/api/shoppingCart/addShoppingCart',{gid:this.$route.query.gId,time:time,goodNum:this.num,uName:this.$store.state.user.userName})
        .then((res)=>{
          this.open2()
        })
        .catch((err)=>{
          console.log("err",err)
        })
      }
    },
    Buy(){
      //未登录情况下，不允许进入该页面
      let token=localStorage['userToken']
      if (!token) {
        this.$message.error('无法获取您的信息,请登录后再次进入此页面！');
        // let _this=this;
        // setTimeout(function(){
        //   _this.$router.replace('/login')
        // },2000)
      }else{
        let gid = this.$route.query.gId;
        let num = this.num;
        let img = this.url;
        let price = this.goodInf[0].gPrice;
        let title = this.goodInf[0].gName;
        // console.log(gid)
        // console.log(num)
        var buyGood = [];
          buyGood.push({
              gid: gid,
              img: img,
              title: title,
              price: price,
              num: num
          });
          // console.log(buyGood)
          sessionStorage["buyGood"] = JSON.stringify(buyGood);
          this.$router.push({
              path:`settlement`
          })
      }
    },
    open1(){
        this.$message({
          showClose: true,
          message: '收藏成功',
          type: 'success',
          center: true
        });
    },
    open2(){
        this.$message({
          showClose: true,
          message: '已添加至购物车',
          type: 'success',
          center: true
        });
    },
    open3(){
        this.$message({
          showClose: true,
          message: '已取消',
          type: 'success',
          center: true
        });
    },
  }
};
</script>
<style scoped>
*{
margin: 0;padding: 0;
}
.comment{
  margin-top:20px ;
  margin-left: 52px;
  display:flex;
  align-items:center;
}
.comment a{
  color: #333;
  text-decoration: none;
  overflow: hidden;
}
.collection,.collected{
  display:flex; 
  align-items:center;
  cursor: pointer;
  margin-top: 50px;
  margin-left:50px;
}
.title{
    text-align: center;
    width: 100%;
    font-size: 24px;
    color: #333;
    line-height: 37px;
    font-weight: bold;
    cursor: default;
    letter-spacing: 0.2em;
}
.message{
    display: block;
    text-align: center;
    color: #333;
}
.word{
    display: inline-block;
    line-height: 40px;
    height: 40px;
    font-size: 15px;
    font-weight: 300;
    color: #F56C6C;
}
.collected .word,.collected .fa-heart{
  color: #333;
}
.infor{
    margin-top: 200px;
}
.img{
    width: 550px;
    height: 550px;
    border: 1px solid #ccc;
    margin:0 auto;
}
.img img{
  width: 100%;
  height: 100%;
}
.last{
    margin-top: 25px;
}
.fa-heart{
    font-size: 40px;
    color: #F56C6C;
}
.el-rate {
  float: left;
}
.el-col {
  border-radius: 4px;
}
.el-button{
    width: 90px;
    height: 35px;
}
.totop{
  margin-top: 15px;
}
</style>
