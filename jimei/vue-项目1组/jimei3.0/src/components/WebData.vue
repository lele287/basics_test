<template>
  <div class="WebData container">
    <div class="WebData_content">
      <div class="rowTitle">
          <img src="../assets/images/line.png" alt="" class="line">
          <span>&nbsp;&nbsp;本 站 数 据&nbsp;&nbsp;</span>
          <img src="../assets/images/line.png" alt="" class="line">
      </div>
      <div id="myChart1" :style="{ width: '550px', height: '400px' }"></div>
      <div id="myChart2" :style="{ width: '550px', height: '400px' }"></div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import 'echarts/extension/bmap/bmap';
// 基于准备好的dom，初始化echarts实例

//  其他地图的api功能大家可以 按需增加即可
export default {
  name: "hello",
  data() {
    return {
      msg: "",
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      this.$axios
        .get("/api/goods/getGoodSum")
        .then((res) => {
          let classify = [];
          for (let i = 0; i < res.data.data.length; i++) {
            classify.push({
              value: res.data.data[i].amount,
              name: res.data.data[i].cName,
            });
          }
          myChart1.setOption({
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{a}：{c}",
            },
            legend: {
              orient: "vertical",
              left: "left",
            },
            series: [
              {
                name: "数量",
                data: classify,
                type: "pie",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(220, 220, 220, 0.8)",
                },
                showAllSymbol: true,
              },
            ],
          });
        })
        .catch((err) => {
          console.log("err:", err);
        });
      let data = [
            {name: '哈尔滨医科大学', value: 9},
            {name: '黑龙江科技大学', value: 12},
            {name: '黑龙江大学', value: 120},
            {name: '哈尔滨工业大学', value: 12},
            {name: '哈尔滨理工大学', value: 14},
            {name: '哈尔滨工程大学', value: 15},
            {name: '东北农业大学', value: 16},
            {name: '东北林业大学', value: 18},
            {name: '黑龙江八一农垦大学', value: 18},
            {name: '东北石油大学', value: 19},
            {name: '大庆职业学院', value: 21},
            {name: '大庆医学高等专科学校', value: 21},
            {name: '大连理工大学', value: 21},
            {name: '沈阳工业大学', value: 22},
            {name: '沈阳航空航天大学', value: 23},
            {name: '沈阳理工大学', value: 24},
            {name: '东北大学', value: 24},
            {name: '辽宁科技大学', value: 25},
            {name: '辽宁工程技术大学', value: 25},
            {name: '辽宁石油化工大学', value: 25},
            {name: '东北电力大学', value: 25},
            {name: '吉林化工学院', value: 25},
            {name: '北华大学', value: 25},
            {name: '吉林农业科技学院', value: 26},
            {name: '油吉林医药学院', value: 26},
            {name: '吉林电子信息职业技术学院', value: 26},
            {name: '江苏科技大学', value: 270},
            {name: '江苏科技大学苏州理工学院', value: 320},
            {name: '常熟理工学院', value:200},
            {name: '苏州工艺美术职业技术学院', value: 28},
            {name: '沙洲职业工学院', value: 29},
            {name: '复旦大学', value: 2},
            {name: '同济大学', value: 3},
            {name: '华东理工大学', value: 110},
            {name: '上海理工大学', value: 22},
            {name: '东华大学', value: 11},
            {name: '上海电力大学', value: 0},
            {name: '华东师范大学', value: 121},
            {name: '华东政法大学', value: 5},
            {name: '齐齐哈尔高等师范专科学校', value: 3},
            {name: '齐齐哈尔医学院', value: 0},
            {name: '黑龙江交通职业技术学院', value: 10},
            {name: '牡丹江师范学院', value: 210},
            {name: '牡丹江大学', value: 10},
            {name: '黑龙江林业职业技术学院', value: 20},
            {name: '清华大学', value: 0},
            {name: '北京交通大学', value: 0},
            {name: '北京工业大学', value: 120},
            {name: '北京理工大学', value: 0},
            {name: '北京科技大学', value: 0},
            {name: '北京化工大学', value: 0},
];
      let geoCoordMap = {
            '哈尔滨医科大学':[126.6264,45.707524],
            '黑龙江科技大学':[126.660046,45.824787],
            '黑龙江大学':[126.628135,45.7144],
            '哈尔滨工业大学':[126.639003,45.749057],
            '哈尔滨理工大学':[126.623017,45.721271],
            '哈尔滨工程大学':[126.688328,45.78251],
            '东北农业大学':[126.733936,45.750749],
            '东北林业大学':[126.642516,45.725245],
            '黑龙江八一农垦大学':[125.174669,46.593607],
            '东北石油大学':[125.155612,46.598274],
            '大庆职业学院':[125.157043,46.6807],
            '大庆医学高等专科学校':[125.055655,46.607892],
            '大连理工大学':[121.531261,38.888106],
            '沈阳工业大学':[123.255554,41.742385],
            '沈阳航空航天大学':[123.414885,41.931849],
            '沈阳理工大学':[123.500795,41.733289],
            '东北大学':[123.424477,41.770971],
            '辽宁科技大学':[123.067322,41.109661],
            '辽宁工程技术大学':[121.670459,42.029831],
            '辽宁石油化工大学':[123.798166,41.863659],
            '东北电力大学':[126.509725,43.829381],
            '吉林化工学院':[126.625598,43.906693],
            '北华大学':[126.61234,43.843166],
            '吉林农业科技学院':[126.485394,43.963825],
            '油吉林医药学院':[126.570631,43.809746],
            '吉林电子信息职业技术学院':[126.568898,43.928937],
            '江苏科技大学':[119.476475,32.200768],
            '江苏科技大学苏州理工学院':[120.576862,31.900236],
            '常熟理工学院':[120.743012,31.614752],
            '苏州工艺美术职业技术学院':[120.592312,31.236873],
            '沙洲职业工学院':[120.594373,31.909881],
            '复旦大学':[121.510766,31.301868],
            '同济大学':[121.508532,31.289027],
            '华东理工大学':[121.430226,31.149538],
            '上海理工大学':[121.561335,31.299252],
            '东华大学':[121.221942,31.060823],
            '上海电力大学':[121.898093,30.90808],
            '华东师范大学':[121.411329,31.233563],
            '华东政法大学':[121.20261,31.061249],
            '齐齐哈尔高等师范专科学校':[123.980191,47.320699],
            '齐齐哈尔医学院':[123.957548,47.384783],
            '黑龙江交通职业技术学院':[123.995984,47.327991],
            '牡丹江师范学院':[129.567356,44.594781],
            '牡丹江大学':[129.578552,44.598949],
            '黑龙江林业职业技术学院':[129.573317,44.595274],
            '清华大学':[116.333374,40.009645],
            '北京交通大学':[116.34974,39.957902],
            '北京工业大学':[116.488157,39.881251],
            '北京理工大学':[116.322726,39.966659],
            '北京科技大学':[116.365942,39.996165],
            '北京化工大学':[116.427674,39.977968],

};
      let convertData = function (data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
      }
      return res;
      };

      let option = {
      title: {
        text: '包括学校',
        left: 'center'
      },
      tooltip : {
        trigger: 'item'
      },
      bmap: {
        center: [118.216853,39.142488],
        zoom: 5,
        // roam: true

      },
      series : [
        {
            type: 'scatter',
            coordinateSystem: 'bmap',
            data: convertData(data),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            encode: {
                value: 2
            },
            label: {
                formatter: '{b}',
                position: 'right',
                show: false
            },
            itemStyle: {
                color: 'rgb(72, 212, 166)'
            },
            emphasis: {
                label: {
                    show: true
                }
            }
        },
        {
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data: convertData(data.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6)),
            symbolSize: function (val) {
                return val[2] / 10;
            },
            encode: {
                value: 2
            },
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                formatter: '{b}',
                position: 'right',
                show: true
            },
            itemStyle: {
                color: 'rgb(72, 212, 166)',
                shadowBlur: 10,
                shadowColor: '#333'
            },
            zlevel: 1
        }
      ]
    };
      myChart2.setOption(option, true);  
   }
  },
  
};
</script>
<style lang="css" scoped>
.container{
  display: flex;
  justify-content: center;
}
.WebData_content {
  width: 1260px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}
.WebData_content {
  max-width: 100%;
}
@media (min-width: 768px) {
  .WebData_content {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .WebData_content {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .WebData_content {
    width: 1170px;
  }
}

.WebData {
  width: 100%;
  clear: both;
  /* background-color: rgb(245, 245, 245); */
  position: relative;
  margin-top: 50px;
}
#myChart1,
#myChart2 {
  float: left;
}
</style>