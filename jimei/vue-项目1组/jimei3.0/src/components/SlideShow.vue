<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="(item,index) in imgList" :key="index">
      <img :src='item.imgPath' alt="">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data(){
    return{
    imgList:[{imgPath:require('@/assets/images/lun01.jpg')},
             {imgPath:require('@/assets/images/lun02.jpg')},
             {imgPath:require('@/assets/images/lun03.jpg')}]
    }
  }
}
</script>>
<style>
  .el-carousel__item img {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 500px;
    width: 100%;
    margin: 0;
  }
    .el-carousel{
      margin-right: 10px;
    }
  .el-carousel,
  .el-carousel__container,
  .el-carousel__item_{
    width: 990px;
    height: 500px;
    float: right;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>