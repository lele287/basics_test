// 商品详情
<template>
  <div class="detail">
    <!-- 商品详情 -->
    <GoodMsg :msg="getId"/>
    <!-- 类似商品 -->
    <Similar @getJumpId="getJumpId"/>
    <!-- 商品评价 -->
    <Evaluate name="test" id="test"/>
    <!-- 随机商品 -->
    <OtherGoods/>
  </div>
</template>
<script>
import GoodMsg from '@/components/GoodMsg.vue'
import Similar from '@/components/Similar.vue'
import Evaluate from '@/components/Evaluate.vue'
import OtherGoods from '@/components/OtherGoods.vue'
export default {
  data(){
    return {
      getId:0
    }
  },
  // created(){
  //   this.getId = this.$route.query.gId
  //   console.log("gId",gId)
  // },
  name:'detail',
  components:{
    GoodMsg,
    Similar,
    Evaluate,
    OtherGoods
  },
  methods:{
    getJumpId(data){
      this.getId = data;
    }
  }
}
</script>
<style scoped>
.detail{
  width: 1260px;
  margin: 0 auto;
  position: relative;
  margin-top:50px ;
}
.OtherGoods{
  background-color: white;
}
.OtherGoods .thumbnail{
  border: 1px solid #ccc;
}
</style>
