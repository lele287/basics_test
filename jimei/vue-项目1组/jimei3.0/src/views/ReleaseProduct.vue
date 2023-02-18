// 发布商品
<template>
  <div class="releaseProduct">
    <div class="content">
      <h1>发布商品</h1>
      <el-form ref="form"  label-width="80px">
        <el-form-item label="物品名称" required>
          <el-input v-model="productName"></el-input>
        </el-form-item>

        <el-form-item label="分类" required>
          <el-cascader
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"></el-cascader>
        </el-form-item>

        <el-form-item label="标价" required>     
          <el-input v-model="productPrice">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>

        <el-form-item label="数量" >
         <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" style="margin-left:2px;"></el-input-number>
        </el-form-item>

        <el-form-item label="可小刀">
          <el-switch v-model="val" on-value="1" off-value="0" @change="toKnife"></el-switch>
        </el-form-item>

        <el-form-item label="商品详情">
          <el-input type="textarea" v-model="desc" :autosize="{ minRows: 4, maxRows: 10}"></el-input>
        </el-form-item>

        <el-form-item label="上传图片" required>
          <el-upload
            name="goodPic"
            action="#"
            :http-request="myUpload"
            ref="myupload"
            :on-change='changePic'
            list-type="picture-card"
            :auto-upload="false"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url" alt="">
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>

                  <!-- <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span> -->
                </span>
              </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
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
        category: [],
        productPrice: '',
        num: 1,
        val:false,
        knife: 0,
        desc: '',
        file:'',
        // type: [],
        options: [ {
          value: '手机',
          label: '手机',
          children: [{
            value: '华为手机',
            label: '华为手机'
          }, {
            value: '苹果手机',
            label: '苹果手机'
          }, {
            value: '小米手机',
            label: '小米手机'
          }, {
            value: '三星手机',
            label: '三星手机'
          }, {
            value: 'vivo手机',
            label: 'vivo手机'
          }, {
            value: 'oppo手机',
            label: 'oppo手机'
          }]
        }, {
          value: '平板电脑',
          label: '平板电脑',
          children: [{
            value: '华为平板',
            label: '华为平板'
          }, {
            value: 'ipad',
            label: 'ipad'
          }, {
            value: '小米平板',
            label: '小米平板'
          }, {
            value: '微软',
            label: '微软'
          }]
        }, {
          value: '笔记本',
          label: '笔记本',
          children: [{
            value: '联想',
            label: '联想'
          }, {
            value: '戴尔',
            label: '戴尔'
          }, {
            value: '惠普',
            label: '惠普'
          }, {
            value: '华硕',
            label: '华硕'
          }, {
            value: '苹果',
            label: '苹果'
          }, {
            value: '小米',
            label: '小米'
          }]
        }, {
          value: '台式机',
          label: '台式机',
          children: [{
            value: '宁美国度',
            label: '宁美国度'
          }, {
            value: '联想',
            label: '联想'
          }, {
            value: '华硕',
            label: '华硕'
          }, {
            value: '惠普',
            label: '惠普'
          }, {
            value: '名龙堂',
            label: '名龙堂'
          }, {
            value: '技嘉',
            label: '技嘉'
          }, {
            value: '苹果',
            label: '苹果'
          }]
        }, {
          value: '电脑配件',
          label: '电脑配件',
          children: [{
            value: '鼠标',
            label: '鼠标'
          }, {
            value: '键盘',
            label: '键盘'
          }, {
            value: '耳机',
            label: '耳机'
          }, {
            value: '显示器',
            label: '显示器'
          }, {
            value: '音响',
            label: '音响'
          }, {
            value: '主板',
            label: '主板'
          }]
        }],
        // 上传图片
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      }
    },
    methods: {
      onSubmit() {
        this.$refs.myupload.submit();
      },
      myUpload() {
        var formdata = new FormData();
        var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        console.log('knife:',this.knife);
        console.log('222222:',this.category[0]);
        console.log('33333:',this.category[1]);
        
        formdata.append("goodName", this.productName);
        formdata.append("goodMes", this.desc);
        formdata.append("goodPrice", this.productPrice);
        formdata.append("goodHits", 0);
        formdata.append("goodnumber", this.num);
        formdata.append("goodSetterName", this.$store.state.user.userName);
        formdata.append("goodClassName1", this.category[0]);
        formdata.append("goodClassName2", this.category[1]);
        formdata.append("goodDiscount", this.knife);
        formdata.append("goodPic", this.file);
        formdata.append("goodSetTime", time);
        console.log(formdata)
        this.$axios.post("/api/goods/addGood",formdata)
        .then((res) => {
          console.log(res);
          if(res.data.code=='200'){
            this.$message({
              message: '提交成功！',
              type: 'success'
            });
          }
          this.reload();
        })
        .catch((err) => {
          console.log("err:", err);
           this.$message.error('提交失败！请认真填写哦！');
        });
      },
      // 二级列表和计数器
       handleChange(value) {
        this.category=value;
        console.log('1111:',this.category);
      },
      toKnife(val){
        console.log(val);
        if(val==true){
          this.knife=1;
          console.log(this.knife);
          
        }else{
          this.knife=0;
          console.log(this.knife);

        }
        // this.knife=val;
      }
      ,
      // 上传图片
      // handleRemove(file) {
      //   // console.log(file);
      // },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      changePic(file, fileList){
        this.file=file.raw;
        console.log(this.file);
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
.releaseProduct{
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

