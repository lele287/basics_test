// 我的资料
<template>
  <div class="personData">
    <!-- <h1>我的资料</h1> -->
    <Avatar/>
   
     </div>
</template>
<script>
import Avatar from '../components/Avatar.vue'
export default {
    name:'PersonData',
    components:{
        Avatar
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