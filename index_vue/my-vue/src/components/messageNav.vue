<template>
  <div>
    <div class="nav">
      <ul class="style">
        <router-link tag="li" to="/nous">
          <div class="news_index">
            <div><b>常识</b></div>
            <div><b>首页</b></div>
          </div>
        </router-link>
        <li>
          <div>
            <b>保</b>
          </div>
          <div>
            <b>健</b>
          </div>
        </li>
        <router-link tag="li" to="/mess_detail?type=老人" class="hovers">老人</router-link>
        <router-link tag="li" to="/mess_detail?type=母婴" class="hovers">母婴</router-link>
        <router-link tag="li" to="/mess_detail?type=家庭" class="hovers">家庭</router-link>
        <router-link tag="li" to="/mess_detail?type=健康用药" class="hovers">健康用药</router-link>
      </ul>
      <ul class="style">
        <li>
          <div>
            <b>诊</b>
          </div>
          <div>
            <b>疗</b>
          </div>
        </li>
        <router-link tag="li" to="/mess_detail?type=内科" class="hovers">内科</router-link>
        <router-link tag="li" to="/mess_detail?type=外科" class="hovers">外科</router-link>
        <router-link tag="li" to="/mess_detail?type=皮肤科" class="hovers">皮肤科</router-link>
        <router-link tag="li" to="/mess_detail?type=五官科" class="hovers">五官科</router-link>
      </ul>
      <ul class="style">
        <li>
          <div>
            <b>减</b>
          </div>
          <div>
            <b>肥</b>
          </div>
        </li>
        <router-link tag="li" to="/mess_detail?type=常识" class="hovers">常识</router-link>
        <router-link tag="li" to="/mess_detail?type=饮食" class="hovers">饮食</router-link>
        <router-link tag="li" to="/mess_detail?type=运动" class="hovers">运动</router-link>
        <router-link tag="li" to="/mess_detail?type=医学减肥" class="hovers">医学减肥</router-link>
      </ul>
      <ul class="style">
        <li>
          <div>
            <b>美</b>
          </div>
          <div>
            <b>容</b>
          </div>
        </li>
        <router-link tag="li" to="/mess_detail?type=护肤" class="hovers">护肤</router-link>
        <router-link tag="li" to="/mess_detail?type=化妆" class="hovers">化妆</router-link>
        <router-link tag="li" to="/mess_detail?type=整型" class="hovers">整型</router-link>
        <router-link tag="li" to="/mess_detail?type=美容食谱" class="hovers">美容食谱</router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "messageNav"
};
</script>
<style lang="css" scoped>
.nav {
  height: 60px;
  background-color: #0dc572;
  box-shadow: 2px 2px 2px 2px #ccc;
}
ul {
  list-style: none;
}
.style {
  margin: 10px 10px 10px -10px;
  width: 250px;
  height: 50px;
  float: left;
}
.style li {
  margin-right: 20px;
  float: left;
}
.hovers:hover,
.news_index:hover {
  color: rgb(97, 95, 95);
  cursor: pointer;
}
</style>