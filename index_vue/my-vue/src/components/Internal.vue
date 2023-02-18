<template>
      <div class="internal1">
        <ul class="ul">
          <li>
            <span>境外输入</span>
            <span>无症状感染者</span>
            <span>现有确诊</span>
          </li>
          <li>
            <span style="color: rgb(247, 91, 91);font-weight: 700;">{{this.input}}</span>
            <span style="color: rgb(221, 87, 203);font-weight: 700;">{{this.noSymptom}}</span>
            <span style="color: rgb(135, 137, 236);font-weight: 700;">{{this.CurrentDiagnosis}}</span>
          </li>
          <li>
            <span style="color:#000;">较昨日：<i style="color:rgb(247, 91, 91);font-weight: 700;"><span v-if="(this.todayinput)>=0">+</span>{{this.todayinput}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(221, 87, 203);font-weight: 700;"><span v-if="this.incrNoSymptom>=0">+</span>{{this.incrNoSymptom}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(135, 137, 236);font-weight: 700;"><span v-if="(this.todaystoreConfirm)>=0">+</span>{{this.todaystoreConfirm}}</i></span>
          </li>
          <li>
            <span>累计确诊</span>
            <span>累计死亡</span>
            <span>累计治愈</span>
          </li>
          <li>
            <span style="color: rgb(235, 54, 54);font-weight: 700;">{{this.comfirm}}</span>
            <span style="color: rgb(54, 111, 235);font-weight: 700;">{{this.dead}}</span>
            <span style="color: rgb(54, 208, 235);font-weight: 700;">{{this.heal}}</span>
          </li>
          <li>
            <span style="color:#000;">较昨日：<i style="color:rgb(235, 54, 54;font-weight: 700;"><span v-if="this.todaycomfirm>=0">+</span>{{ this.todaycomfirm}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(54, 111, 235);font-weight: 700;"><span v-if="this.todaydead>=0">+</span>{{this.todaydead}}</i></span>
            <span style="color:#000;">较昨日：<i style="color:rgb(54, 208, 235);font-weight: 700;"><span v-if="this.todayheal>=0">+</span>{{this.todayheal}}</i></span>
          </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Internal",
  data(){
      return{
          input:'',//境外输入
          noSymptom:'',//无症状感染者
          comfirm:'', //累计确诊人数
          CurrentDiagnosis:'',//现有确诊
          dead:'',//累计死亡
          heal:'',// 累计治愈
          todayinput:'',//今日境外输入
          incrNoSymptom:'',//今日无症状感染者
          todaystoreConfirm:'',//今日现有确诊
          todaycomfirm:'', //今日确诊人数
          todaydead:'',//今日死亡
          todayheal:'',//今日治愈
         
          
      }
  },
  created() {
    axios({
      url: "/yiqing",
      method: "get"
    }).then(res => {
      this.comfirm = res.data.data.chinaTotal.total.confirm
      this.noSymptom = res.data.data.chinaTotal.extData.noSymptom
      this.input = res.data.data.chinaTotal.total.input
      this.dead = res.data.data.chinaTotal.total.dead
      this.heal = res.data.data.chinaTotal.total.heal
      this.CurrentDiagnosis = this.comfirm-this.heal-this.dead
      this.todayinput =res.data.data.chinaTotal.today.input
      this.incrNoSymptom = res.data.data.chinaTotal.extData.incrNoSymptom
      this.todaystoreConfirm = res.data.data.chinaTotal.today.storeConfirm
      this.todaydead = res.data.data.chinaTotal.today.dead
      this.todaycomfirm = res.data.data.chinaTotal.today.confirm
      this.todayheal = res.data.data.chinaTotal.today.heal
    console.log( this.CurrentDiagnosis);
    
    });
  }
};
</script>

<style lang="css" scoped>
ul {
  list-style: none;
}
.internal1 {
  width: 1190px;
  height: 250px;
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
.gn {
  width: 1190px;
  margin: 0 auto;
}

/* i {
  width: 420px;
  height: 40px;
  display: inline-block;
  background-color: #ccc;
  border: 2px solid #ccc;
  border-radius: 5px 5px;
  position: relative;
  left: 30px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
  margin-top: 40px;
}
.i1 > i,
.i2 > i {
  border: 1px solid transparent;
}
.bb > i {
  width: 100px;
  height: 30px;
  display: inline-block;
  border: 1px solid transparent;
  line-height: 30px;
  margin: 5px;
} */
/* i {
  cursor: pointer;
} */
</style>