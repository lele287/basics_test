// 个人中心
<template>
  <div class="person">
    <!-- <h1>个人中心</h1> -->
    <br>
    <ul class="personUl">
      <router-link tag="li" to="/person/personAddress" active-class="pactive">我的地址</router-link>
      <router-link tag="li" to="/person/personCollect" active-class="pactive">我的收藏</router-link>
      <router-link tag="li" to="/person/personRelease" active-class="pactive">我的发布</router-link>
       <router-link tag="li" to="/person/personWant" active-class="pactive">我的求购</router-link>
      <router-link tag="li" to="/person/personOrder" active-class="pactive">我的订单</router-link>
      
      
     
    </ul>
    <!-- <div class="content">
       
             </div> -->
            
      <router-view></router-view>
    </div>
    
  <!-- </div> -->
</template>
<style scoped>
.pactive{
  color: #00f;
}
.person{
  width: 1260px;
  min-height: 900px;
  margin: 10px auto;
  position: relative;
  background-color: #fafafa;
}
.personUl{
  list-style: none;
  float: left;
  margin-left:20px ;
  width: 200px;
  height: 350px;
  text-align: center;
  line-height: 70px;
  background-color: #fff;
   cursor: pointer;
}
</style>
