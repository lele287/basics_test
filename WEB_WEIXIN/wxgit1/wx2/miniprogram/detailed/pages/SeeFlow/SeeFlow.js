//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
// const wxCharts = require("../../utlis/wxcharts.js");
// const echarts = require("../../ec-canvas/echarts");
import * as echarts from '../../ec-canvas/echarts';
import NumberAnimate from "../../utlis/NumberAnimate.js";

let chart = null;
var FlowDate = [];
var Total = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    flowData: [],
    dayAverage: 0,
    ShopCode: '',
    readOnly: false,
    Used: 0,
    UsedData: 0,
    num1Complete: 0,
    SwitchFlow: true, //false时为MB，true时为G
    ec: {
      onInit: initChart
    },
    surplusFlow: 0,
    optionsData: {},
  },

  onQuery() {
    if (this.data.ShopCode != '') {
      this.flowStatistics();
    } else {
      wx.showToast({
        title: '请输入门店编号',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        flowData: []
      })
    }
  },
  onQueryClear() {
    this.setData({
      ShopCode: '',
      flowData: [],
    })
  },

  onSwitch() {
    wx.redirectTo({
      url: '../customerShopChoice/customerShopChoice',
    })
  },

  onSwitchFlow() {
    //false时为MB，true时为G
    this.setData({
      SwitchFlow: !this.data.SwitchFlow
    })
    if (this.data.SwitchFlow) {
      let Used = (this.data.UsedData / 1024).toFixed(3)
      this.setData({
        Used: Used
      })
    } else {
      let Used = this.data.UsedData
      this.setData({
        Used: Used
      })
    }
    this.animate();
  },

  //调用NumberAnimate.js中NumberAnimate实例化对象，测试3种效果
  animate: function () {

    // this.setData({
    //   num1: '',
    //   num1Complete: '',
    // });
    let decimals = 0;
    if (!this.data.SwitchFlow) {
      decimals = 0;
    } else {
      decimals = 3;
    }
    let n1 = new NumberAnimate({
      from: this.data.Used, //开始时的数字
      speed: 400, // 总时间
      refreshTime: 50, // 刷新一次的时间
      decimals: decimals, //小数点后的位数
      onUpdate: () => { //更新回调函数
        this.setData({
          Used: n1.tempValue
        });
      },
      onComplete: () => { //完成回调函数

      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    if (Object.keys(options).length === 0) {
      this.setData({
        readOnly: false
      })
    } else {
      this.setData({
        ShopCode: options.Code,
        readOnly: true,
      })
    }
  },

  touchstart: function (e) {
    this.data.opts.scrollStart(e);
  },

  touchmove: function (e) {
    this.data.opts.scroll(e);
  },

  touchend: function (e) {
    this.data.opts.scrollEnd(e);
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
    let _this = this;
    if (!this.data.readOnly) {
      try {
        var value = wx.getStorageSync('storeChoice')
        if (value) {
          _this.setData({
            ShopCode: value.ShopCode,
            optionsData: value
          })
        } else {
          wx.redirectTo({
            url: '../customerShopChoice/customerShopChoice'
          })
        }
      } catch (e) {}
    }
    this.flowStatistics();
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

  // // 流量查询
  // flowObtain() {
  //   let flowData = {
  //     'shop_code': this.data.ShopCode
  //   }
  //   $api("GET", "api/shop/flow/month", flowData)
  //     .then(res => {
  //       if (res.data.data === null) {
  //         this.setData({
  //           flowData: []
  //         })
  //       } else {
  //         this.setData({
  //           flowData: res.data.data
  //         })
  //       }
  //     })
  //     .catch(err => {
  //       //请求失败
  //       console.log(err);
  //     })
  // },

  // 流量统计

  flowStatistics() {
    // YZD001
    let flowData = {
      'shop_code': this.data.ShopCode
      // 'shop_code': 'YZD001'
    }
    $api("GET", "api/shop/flow/day/wx", flowData)
      .then(res => {
        if (res.data.data === null) {
          FlowDate = []
          Total = []
          this.setData({
            flowData: []
          })
        } else {
          var myData = res.data.data
          // let Useds = 0;
          let F = []
          let T = []
          var myFlowDate='';
          myData.ShopFlowDays.forEach(function (value, index) {
            // Useds += parseInt(value.Total)
            myFlowDate=value.FlowDate.substring(8,10)
            if(myFlowDate.slice(0,1)==='0'){
              myFlowDate=myFlowDate.substring(1,2)
            }
            F.push(myFlowDate)
            T.push(value.Total)
          })
          // var day = new Date().getDate();
          // for (let i = 1; i < day + 1; i++) {
          //   let result = myData.ShopFlowDays.find(ele => new Date(ele.FlowDate).getDate() == i)
          //   if (result != undefined || result != null || result != '') {
          //     F.push(new Date(result.FlowDate).getDate())
          //     T.push(result.Total)
          //   } else {
          //     F.push(i)
          //     T.push(0)
          //   }
          // }
          FlowDate = F
          Total = T
          let dayAverage = (myData.TotalFlow / myData.ShopFlowDays.length).toFixed(2)
          this.setData({
            flowData: myData.ShopFlowDays,
            dayAverage: dayAverage,
            UsedData: parseInt(myData.TotalFlow),
            surplusFlow: parseInt(myData.PackageFlow) - parseInt(myData.TotalFlow)
          })
          this.onSwitchFlow();
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
  // chart.on('finished',()=>{
  //   echarts.canvasToTempFilePath({
  //     success:(res)=>{
        
  //     }
  //   })
  // })
  canvas.setChart(chart);

  var option;
  option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter(params) {
        return params[0].name + '日/' + params[0].value + 'MB';
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
      type: 'category',
      data: FlowDate,
    },
    yAxis: {
      type: 'value',
      name: '单位：MB'
    },
    series: [{
      data: Total,
      type: 'line',
      smooth: true
    }]
  };
  // if (FlowDate.length > 15) {
  //   option.dataZoom = [{
  //     type: 'slider',
  //     show: true, //flase直接隐藏图形
  //     xAxisIndex: [0],
  //     left: '9%', //滚动条靠左侧的百分比
  //     bottom: -5,
  //     // start: 50,                            //滚动条的起始位置
  //     // end: 100 ,                           //滚动条的截止位置（按比例分割你的柱状图x轴长度）
  //     startValue: FlowDate[FlowDate.length - 1] - 15, //数据窗口范围的起始数值
  //     endValue: FlowDate[FlowDate.length - 1] - 1, //数据窗口范围的结束数值。
  //   }]
  // }

  chart.setOption(option);
  return chart;
}