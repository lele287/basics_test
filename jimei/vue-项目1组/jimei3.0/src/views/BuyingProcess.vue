// 购买流程
<template>
  <div class="buyingProcess">
<Help/>
  </div>
</template>
<script>
import Help from '../components/Help.vue'
export default{
name:'BuyingProcess',
components:{
  Help
}
}
</script>
<style scoped>
.buyingProcess{
  width: 1260px;
  height: 800px;
  margin: 0 auto;
  position: relative;
  /* background-color: rgb(253, 213, 253); */
}

</style>
