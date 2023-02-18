// 评价
<template>
  <div class="evaluate">
     <div class="main">
        <h1>商品评价</h1>
        <div class="eval">
            <form action="">
                <div class="goods">
                  <div class="img">
                      <img :src="url" alt="">
                  </div>
                  <div class="title">
                      <span>{{gName}}</span><br/>
                      <span>￥{{gPrice}}</span><br/>
                      <span>出售人：{{uName}}</span>
                  </div>
                </div>
                <div class="grade">
                    <span>商 品 评 价 ：</span>
                    <span id="star">
                      <el-rate v-model="value1"></el-rate>
                    </span>
                </div>
                <div class="describe">
                    <textarea name="describe" cols="30" rows="10" v-model="value2" ></textarea>
                </div>
                <el-button type="success" class="submitbtn" @click.prevent="toSubmit">提交评价</el-button>
                <!-- <input type="submit" value="提交评价" class="submitbtn"> -->
            </form>
        </div>
    </div>
  </div> 
</template>
<script>
  export default {
    data(){
      return {
        url:'',
        gName:'商品名称',
        gPrice:'',
        uName:'',
        value1:0,
        value2:'',
        gid:'',
        oid:''
      }
    },
    methods:{
      getEvaluateData(){
          //填充数据
          let evaluate = JSON.parse(sessionStorage.getItem('goodsEvaluate')); //从订单页获取sessionStorage
          this.gid=evaluate.gid;
          // console.log(this.gid);
          
          this.oid=evaluate.oid;
          this.$axios
          .get("/api/goods/GoodMes",{params:{gid:this.gid}})
          .then((res) => {
            // console.log('res:',res);
            // console.log(res.data.data[0]);
            this.url=res.data.data[0].gPic;
            this.gName=res.data.data[0].gName;
            this.gPrice=res.data.data[0].gPrice;
            this.uName=res.data.data[0].uName;
            
          })
          .catch((err) => {
            console.log("err:", err);
          });
      },
      toSubmit(){
        if(this.value1==0){
          this.$message.error('请点击星星，为商品评分！');
        }else if(this.value2==''){
          this.$message.error('快来为商品写一些评价内容吧!');
        }else{
          var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
          this.$axios
          .post("/api/comments/addComment",{ uName:this.$store.state.user.userName,gid: this.gid,time: time,mes: this.value2,level: this.value1})
          .then((res) => {
            console.log(res);
            if(res.data.code=='200'){
              this.$message({
                message: '提交成功！',
                type: 'success'
              });
            }
          })
          .catch((err) => {
            console.log("err:", err);
            this.$message.error('提交失败！请认真填写哦！');
          });
          
          //修改订单状态
          this.$axios.post('/api/order/changeOrder',{oId:this.oid})
          .then((res)=>{
            console.log(res);
          })
          .catch((err)=>{
              console.log("err",err)
          })
        }
      }
    },
    created(){
      this.getEvaluateData();
    }
  }
</script>

<style lang="scss" scoped>
.evaluate{
  width: 1260px;
  height: 950px;
  margin: 0 auto;
  position: relative;
}
.main {
    width: 1170px;
    margin: 10px auto;
    background-color: #fff;
    overflow: hidden;
}

h1 {
    text-align: center;
    margin: 50px;
}

.eval {
    width: 1000px;
    margin: 30px auto 100px;
    border: 1px solid rgb(72, 212, 166);
}

form {
    width: 800px;
    margin: 50px auto;
}

form .img {
    float: left;
}

form .img img {
    width: 150px;
    height: 150px;
}

form .title {
    float: right;
    width: 600px;
    font-size: 24px;
}

form .title span {
    display: inline-block;
    margin: 10px 0;
}

form .title span:nth-child(5) {
    font-size: 20px;
}

form .title span:nth-child(3) {
    font-size: 20px;
    color: #f00;
}

form .grade {
    clear: both;
    padding: 30px;
    font-size: 20px;
}

form .grade span {
    margin-right: 40px;
}
form .grade .el-rate{
  display: inline;
  
}
/deep/.el-rate__icon{
  font-size: 26px;
}

form .describe textarea {
    min-width: 800px;
    max-width: 800px;
    min-height: 300px;
    max-height: 300px;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    overflow: hidden;
    font-size: 20px;
}

.submitbtn {
    margin: 20px 350px;
}
</style>
