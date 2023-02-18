//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;

import * as echarts from '../../ec-canvas/echarts';

let chart = null;
var UsedFlow = [];
var ShopName = [];
var ShopFullName = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    flowData: [],
    ec: {
      onInit: initChart
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.flowRanking();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 流量排行 查询
  flowRanking() {
    // var customerId = '';
    let myData={};
    try {
      var value = wx.getStorageSync('essentialInformation')
      if (value) {
        // customerId = value.Id
        myData={
          "customer_id":value.Id,
          "top":25
        }
      }
    } catch (e) {}

    $api("GET", "api/customer/flow/top10/wx",myData)
      .then(res => {
        if (res.data.data === null) {
          UsedFlow = []
          ShopName = []
          this.setData({
            flowData: []
          })
        } else {
          var myData = res.data.data
          this.setData({
            flowData: myData
          })
          let F = []
          let T = []
          let Full = []
          myData.forEach(function (value, index) {
            F.unshift((parseInt(value.UsedFlow) / 1024).toFixed(2))
            T.unshift(value.ShopName.slice(0, 3) + '..')
            Full.unshift(value.ShopName)
          })
          if (myData.length !== 25) {
            for (let i = 0; i < 25 - myData.length; i++) {
              F.unshift('')
              T.unshift('')
              Full.unshift('')
            }
          }
          UsedFlow = F
          ShopName = T
          ShopFullName = Full
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option;
  option = {
    title: {
      text: '流量TOP25',
      subtext: '单位：G',
      // subtextStyle: {
      //   align:"center"
      // }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        return ShopFullName[params[0].dataIndex] + '/' + params[0].value + 'G';
      }
    },
    // legend: {
    //   data: ['']
    // },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: ShopName
    },
    series: [{
      // name: '2011年',
      type: 'bar',
      label: {
        show: true
      },
      data: UsedFlow,
    }]
  };

  chart.setOption(option);
  return chart;
}