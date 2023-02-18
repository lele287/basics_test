<template>
    <div class="diagnosis">
         <div id="chinaChart" style="width:1190px;height:700px"></div>
    </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china";
import axios from "axios";

const option = {
  title: {
    text: "中国疫情图",
  },
  series: [
    {
      name: "确诊人数",
      type: "map",
      map: "china",
      label: {
        show: true,
        color: "#ffffff",
        fontSize: 8,
      },
      itemStyle: {
        areaColor: "#eee",
      },
      roam: false,
      zoom: 1.2,
      emphasis: {
        label: {
          color: "#fff",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#83b5e7",
        },
      },
      data: [],
    },
  ],
  // {name: xxx, value: xxx}
  visualMap: [
    {
      type: "piecewise",
      show: true,
      pieces: [
        { min: 10000 },
        { min: 1000, max: 9999 },
        { min: 100, max: 999 },
        { min: 10, max: 99 },
        { min: 1, max: 9 },
      ],
      align: 'left',
      showLabel: true,
      inRange: {
        symbol: "rect",
        color: ["#ffc0b1", "#9c0505"],
      },
      itemWidth: 20,
    },
  ],
  tooltip: {
    trigger: "item",
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "right",
    top: "center",
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
};

export default {
  name: "Diagnosis",
  data() {
    return {
      myChinaChart: "",
    };
  },
  methods: {
    getDate() {
      axios({
        method: "get",
        url: "/xinlangData",
      }).then((res) => {
        let list = res.data.data.list
        option.series[0].data = list;
        this.myChinaChart.setOption(option);
         
      });
    },
  },
  mounted() {
    this.getDate();
    this.myChinaChart = echarts.init(document.getElementById("chinaChart"));
  },
};
</script>
</script>

<style lang="css" scoped>
    .diagnosis{
        width: 100%;
        height: 700px;
        background-color: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
        
    }

    .gnImg{
        margin-left: 117px;
    }
</style>