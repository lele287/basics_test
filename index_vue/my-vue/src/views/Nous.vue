<template>
  <div class="nous">
    <Logo></Logo>
    <Search></Search>
    <MessageNav></MessageNav>
    <div class="pic">
      <ul>
        <li><img src="https://img95.699pic.com/photo/50070/6040.jpg_wh300.jpg" alt=""></li>
        <li><img src="https://img95.699pic.com/photo/40180/5509.jpg_wh300.jpg" alt=""></li>
        <li><img src="https://img95.699pic.com/photo/40180/5522.jpg_wh300.jpg" alt=""></li>
        <li><img src="https://img95.699pic.com/photo/40116/1130.jpg_wh300.jpg" alt=""></li> 
      </ul>
    </div>
    <div class="content">
      <MessageB></MessageB>
      <MessageZ></MessageZ>
      <MessageJ></MessageJ>
      <MessageM></MessageM>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Search from "../components/Search";
import Logo from "../components/Logo";
import MessageNav from "../components/messageNav";
import MessageB from "../components/messageB";
import MessageZ from "../components/messageZ";
import MessageJ from "../components/messageJ";
import MessageM from "../components/messageM";
import Footer from "../components/Footer";
export default {
  name: "nous",
  components: {
    MessageNav,
    MessageB,
    MessageZ,
    MessageJ,
    MessageM,
    Search,
    Logo,
    Footer
  },
  created(){
    // alert(11)
  }
};
</script>
<style lang="css" scoped>

.nous /deep/ .el-button--success {
    height: 40px;
    position: relative;
    left: 95px;
    top: 8.5px;
}
.nous /deep/ .down{
  height: 300px;
}
.nous /deep/.content-top-left dd{
   margin-top: 5px;
}
.nous /deep/.content-middle-left p:nth-child(2){
    margin-left: 140px;
    margin-top: -55px;
    color: #8ef32f;
}
.nous /deep/.content-middle-left p:nth-child(3){
    margin-left: 181px;
    margin-top: 19px;
    color: #8ef32f;
    font-size: 15px;
}
.nous /deep/ .wbs{
    position: absolute;
    bottom: -65px;
    right: 41px;
}
.nous /deep/ .ddimg span{
    position: relative;
    top: 80px;
    left: 12px;
}
.nous /deep/ .wb{
    position: absolute;
    bottom: -65px;
    right: 134px;
}

.nous /deep/ .logoImg {
position: relative;
left: 0px;
}
.nous /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px ;
}
.nous /deep/ .shopping{
  margin-top: -88px;
}
.nous /deep/ .shopping span{
  position: relative;
  bottom: 9px;
}
.nous /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}
.nous /deep/.nav {
  margin-top: 40px;
  height: 60px;
  background-color:#0dc572;
  box-shadow: 2px 2px 2px 2px #ccc;
  
}
ul{list-style: none;}
.style{
  margin:10px 10px 10px -10px;
  width: 250px;
  height: 50px;
  float: left;
  
  
}
.style li{
  margin-right: 20px;
  float: left;
  cursor: pointer;
 
}
.style li:hover{
  color: rgb(97, 95, 95);
}
.pic img{
  width: 220px;
  height: 150px;
  border-radius: 10px;
  /* opacity: 0.8; */
  
}
.pic li{
  margin-left: 5px;
  margin-right: 60px;
  float: left;
  box-shadow: 2px 2px 2px 2px #ccc;
  border-radius: 10px;
}
.content{
  clear: both;
  padding-top: 10px;
}

</style>