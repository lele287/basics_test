<template>
    <div class="internal1">
        <ul class="ul">
          <li>
            <span>现有确诊</span>
            <span>累计确诊</span>
            <span>累计死亡</span>
            <span>累计治愈</span>
          </li>
          <li>
            <span style="color: rgb(235, 54, 54)">{{this.ecertain}}</span>
            <span style="color: rgb(54, 111, 235)">{{this.certain}}</span>
            <span style="color: rgb(54, 208, 235)">{{this.die}}</span>
            <span style="color: rgb(54, 208, 235)">{{this.recure}}</span>
          </li>
          <li>
            <span style="color:#000;">较昨日：<i style="color:rgb(235, 54, 54)">{{this.ecertain_inc}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(54, 111, 235)">{{this.certain_inc}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(54, 208, 235)">{{this.die_inc}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(54, 208, 235)">{{this.recure_inc}}</i></span>
          </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"Abroad",
    data(){
      return{
        ecertain:'',//现有确诊
        ecertain_inc:'',//较昨日现有确诊
        certain:'', //累计确诊
        certain_inc:'',//较昨日累计确诊
        recure:'',//累计治愈
        recure_inc:'',//较昨日累计治愈
        die:'', //累计死亡
        die_inc:'',//较昨日累计死亡
      }
    },
    mounted(){
      axios({
        method: "get",
        url: "/xinlangData",
      }).then((res) => {
        let datas = res.data.data.othertotal
        this.ecertain = datas.ecertain
        this.ecertain_inc = datas.ecertain_inc
        this.certain = datas.certain
        this.certain_inc = datas.certain_inc
        this.recure = datas.recure
        this.recure_inc = datas.recure_inc
        this.die = datas.die
        this.die_inc = datas.die_inc
        
         
      });
    }
}
</script>

<style lang="css" scoped>
ul{
    list-style: none;
}
.internal1{
width: 1190px;
height: 150px;
background-color: #fff;
margin-bottom: 20px;
}
li{
  display: inline-block;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  display: flex;
}
span{
  flex: 1;
  font-size: 18px;
}
i{
  font-style: normal;
}
</style>