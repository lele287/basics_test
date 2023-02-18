// 发布求购
<template>
  <div class="releaseWant">
    <div class="content">
      <h1>发布求购</h1>
      <el-form ref="form"  label-width="80px">

        <el-form-item label="物品名称" required>
          <el-input v-model="productName"></el-input>
        </el-form-item> 

        <el-form-item label="期望价格" required>
          <el-input v-model="wantPrice"></el-input>
        </el-form-item>

        <el-form-item label="商品详情">
          <el-input type="textarea" v-model="desc"  :autosize="{ minRows: 8, maxRows: 20}"></el-input>
        </el-form-item>

        <el-form-item label="联系方式" >
          <el-input v-model="tel"></el-input>
        </el-form-item>

        <el-form-item>
          <div class="btn">
            <el-button type="primary" @click.prevent="onSubmit">提交</el-button>
            <el-button>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    inject:['reload'],
    data() {
      return {
          productName: '',
          wantPrice: '',
          tel: '',
          desc: ''
      }
    },
    methods: {
      onSubmit() {
        let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        this.$axios.post("/api/userwant/addWant",{uName: this.$store.state.user.userName,wantName: this.productName,wantMes: this.desc,wantTime: time,wantPrice: this.wantPrice,wantPhone: this.tel})
        .then((res) => {
          console.log(res);
          if(res.data.code=='200'){
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
            this.reload();
          }else{
            this.$message.errror('提交失败，请认真填写哦！');
          }
        })
        .catch((err) => {
          console.log("err:", err);
           this.$message.error('提交失败！请认真填写哦！');
        });
      } 
    },
    mounted(){
      //未登录情况下，不允许进入该页面
      let token=localStorage['userToken']
      if (!token) {
        this.$message.error('无法获取您的信息,请登录后再次进入此页面！');
        let _this=this;
        setTimeout(function(){
          _this.$router.replace('/login')
        },2000)
      } 
    }
  }
</script>

<style scoped>
.releaseWant{
  width: 1260px;
  height: 800px;
  margin: 0 auto;
  position: relative;
}
.content{
  width: 900px;
  margin:0px auto;
  padding: 50px 0;
}
.btn{
  width: 250px;
  margin: 0 auto;
}
h1{
  width: 130px;
  margin:-10px auto 50px;
  color: #606266;
}
</style>

