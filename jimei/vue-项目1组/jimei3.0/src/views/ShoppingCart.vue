// 购物车
<template>
  <div class="shoppingCart">
    <h1>购物车</h1>
    <div class="content">
      <el-row>
        <el-col :span="2">
          <div class="grid-content">
            <input type="checkbox" name="all" id="all" v-model="checked" @change="changeCheck"><label for="all"> 全选</label>
          </div>
        </el-col>
        <el-col :span="9"><div class="grid-content">商品信息</div></el-col>
        <el-col :span="2"><div class="grid-content">单价</div></el-col>
        <el-col :span="5"><div class="grid-content">数量</div></el-col>
        <el-col :span="2"><div class="grid-content">总价</div></el-col>
        <el-col :span="4"><div class="grid-content">操作</div></el-col>
      </el-row>

      <ShoppingOne :shopData='strHTML' ref='shopping' v-if="flag"></ShoppingOne>

      <div v-if="flag==false" class="heart">
          <img src="../assets/images/heart.png" alt="">
          <span>您的购物车中还没有商品哦！快去 <a href="/">逛逛</a> 吧</span>
      </div>

      <el-row class="bottom">
        <el-button type="info" plain class="delAll" @click.prevent="delSelect">删除选中</el-button>
        <el-button type="danger" class="toSettlement" @click.prevent="toSettlement">结&nbsp;算</el-button>
      </el-row>

      <!-- 分页 -->
      <div class="block">
        <!-- current-change	      currentPage 改变时会触发	      当前页-->
          <el-pagination 
            background
            @current-change="currentChange"
            :current-page="currentPage"
            hide-on-single-page
            :page-size='pageSize'
            layout="prev, pager, next"
            :page-count="pageCount"
            :total="total">
          </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import ShoppingOne from '@/components/ShoppingOne.vue'
export default {
  inject:['reload'],
  data(){
    return {
      strHTML:[],
      pageSize:5,
      pageCount:0,
      total:0,
      currentPage:1,
      shoppingData:{
        allData:'',
      },
      flag:false,
      checked:false
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.delSelect()
    })
  },

  methods:{
    getShoppingData(){
     this.$axios
      .post("/api/shoppingCart/getMes",{uName:this.$store.state.user.userName})
      .then((res) => {
        let getMes = [];
        // console.log('res:',res);
        this.shoppingData.allData=res.data.data
        for(let i=0;i<this.shoppingData.allData.length;i++){
          this.$set(this.shoppingData.allData[i],'checked',false);
          this.$set(this.shoppingData.allData[i],'buyNum',1);
          this.shoppingData.allData[i]=this.collectedcheck(i,this.shoppingData.allData[i].gId)
          getMes.push(this.shoppingData.allData[i])
        }  
        console.log(getMes);
        
        this.showMes(getMes);
      })
      .catch((err) => {
        console.log("err:", err);
      }); 
    },
    collectedcheck(i,gid){
      this.$axios.post('/api/collection/check',{gId:gid,uName:this.$store.state.user.userName})
      .then((res)=>{
        if(res.data.data[0].num == 0){
          // this.collected = false
          this.$set(this.shoppingData.allData[i],'collected',false);
        }
        else{
          // this.collected = true
          this.$set(this.shoppingData.allData[i],'collected',true);
        }
      })
      return this.shoppingData.allData[i]
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
    showMes(data){
        // console.log('showMes:',data)
        let showData = [];
        this.total = data.length;
        this.pageCount = Math.ceil(this.total / this.pageSize);
        for(let i = (this.currentPage-1) * this.pageSize;i < this.currentPage * this.pageSize;i++){
            if(data[i]){
                showData.push(data[i])
            }
            else{
                break;
            }
        }
        // console.log(showData)
        this.strHTML=showData
        
        if( this.strHTML.length==0){
          this.flag=false;
        }else{
          this.flag=true;
        }
        // console.log('strHTML:',this.strHTML)
        // console.log('flag:',this.flag);    
    },
    currentChange(currentPage){
        // console.log(currentPage)
        this.currentPage = currentPage;
        this.getShoppingData(this.strHTML);
    },
    changeCheck(){ 
        for(let i=0;i<this.shoppingData.allData.length;i++){
          this.shoppingData.allData[i].checked=this.checked;
        }
    },
    delSelect(){
      let thedata=[];
      if(this.shoppingData.allData){
        thedata=this.shoppingData.allData
      }
      // console.log('thedata:',thedata);
      
      thedata.forEach((item, index)=> {
        if(item.checked){
           this.$nextTick(() => {
             this.$refs.shopping.deleteThis(item.SCRId)
           })
        }
      })
    },
    toSettlement(){
      let buyGood = []
      let count=0;
      for(let i=0;i<this.shoppingData.allData.length;i++){
        if(this.shoppingData.allData[i].checked){
          count++;
          console.log(this.shoppingData.allData[i]);
          
          buyGood.push({
              gid: this.shoppingData.allData[i].gId,
              img: this.shoppingData.allData[i].gPic,
              title: this.shoppingData.allData[i].gName,
              price: this.shoppingData.allData[i].gPrice,
              num: this.shoppingData.allData[i].SCRGoodsNum
          });
          sessionStorage['buyGood'] = JSON.stringify(buyGood);
          
        }
      }
      if(count==0){
        this.$message.error('选中商品之后才能去结算哦！');
      }else{
        this.$router.replace('/settlement');
      }
      this.checked=false;
    }
  },
  watch:{
      shoppingData: {
          handler: function(newVal, oldVal) {
              // console.log('父newVal:',newVal);
              let tempCount=0;
              this.shoppingData.allData.forEach(function(item, index) {
                  //item 就是当日按循环到的对象,index是循环的索引，从0开始
                  if(item.checked){
                    tempCount++;
                  }
              })
              if(tempCount==this.shoppingData.allData.length &&this.shoppingData.allData.length!=0){
                  this.checked=true;
              }else{
                  this.checked=false;
              }
          },
          deep: true 
      }

  },
  created() {
    this.getShoppingData();
  },
  components:{
    ShoppingOne
  },
}
</script>
<style lang="scss" scoped>
.shoppingCart{
  width: 1260px;
  margin: 0 auto;
  position: relative;
}
h1{
  width: 130px;
  margin:30px auto ;
  color: #606266;
}
.content{
  width: 1100px;
  min-height: 700px;
  margin: 0 auto ;
  text-align: center;
  line-height: 38px;
}
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  min-height: 36px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.heart{
  margin: 150px auto;
}
.heart img{
  width:60px;
  vertical-align: middle;
  margin: 0 10px;
}

.bottom{
  margin-top: 30px;
  border-top: 1px solid #ccc;
}
.delAll{
  float: left;
  margin: 20px 50px;
}
.toSettlement{
  float: right;
  margin: 20px 50px;

}
/deep/ .el-pagination{
  margin-bottom: 20px;
  font-size: 50px;
}
</style>