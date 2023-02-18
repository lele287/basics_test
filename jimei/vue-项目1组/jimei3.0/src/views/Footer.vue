// 底
<template>
  <div class="footer">
      <div id="footer_main">
            <div id="footer-left">
                联系我们：<br>
                <span>QQ：1454581268</span> <br>
                <span>地址：苏州工业园区独墅湖创客汇</span>
            </div>
            <div id="footer-center">
                &nbsp;&nbsp;&nbsp;&nbsp;二维码：
                <div id="footer-center-pic"></div>
            </div>
            <div id="footer-right">
                二手指南：<br>
            <ul>
                <router-link tag="li" to="/buyingProcess" active-class="active">购买流程</router-link>
                <router-link tag="li" to="/qualitySecond" active-class="active">优质二手</router-link>
            </ul>
            </div>
            <div id="footer-bottom">
                Copyright © 2020 JiMei 版权所有
            </div>
        </div>

  </div>
</template>
<style scoped>
.active {
  color: rgb(48, 49, 51);
}
.footer {
  display: fixed;
  bottom: 0;
  width: 100%;
  height: 150px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  color:rgb(144, 147, 153);
  clear: both;
  background-color: rgb(245, 245, 245);
}
.footer ul {
  list-style: none;
}
.footer ul li {
  float: left;
  padding: 10px;
  cursor: pointer;
}
#footer_main {
    width: 1190px;
    height: 150px;
    margin: 0 auto;
}

#footer-left,
#footer-center,
#footer-right {
    width: 330px;
    height: 100px;
    float: left;
    margin: 15px 30px 5px;
    line-height: 30px;
    font-size: 15px;
}

#footer-center {
    position: relative;
}

#footer-center-pic {
    position: absolute;
    width: 80px;
    height: 80px;
    top: 10px;
    left: 120px;
    opacity: 0.8;
    background: url(../assets/images/erweima.jpg);
    background-size: 100% 100%;
}

#footer-bottom {
    width: 1190px;
    height: 25px;
    float: left;
    text-align: center;
}

#footer a,
#footer span {
    font-size: 15px;
    color: #ccc;
    margin-left: 40px;
}
</style>