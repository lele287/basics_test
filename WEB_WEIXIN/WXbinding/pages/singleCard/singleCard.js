// pages/singleCard/singleCard.js
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepTitle:null,
    steps:null,
    infoCode:'06190001',
    moveCode:null,
    unicornCode:null,
    telecomCode:null,
    finished:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initInfo();
    this.getSingleCardMessage();
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
  /**
   * 得到卡片的信号
   */
  getSingleCardMessage:function(){
    common.getHttpRequest("testSignalByEquNum", { "equipment_code": this.data.infoCode},this.doSuccess);
  },
  /**
   * 得到卡片信号的回调函数
   */
  doSuccess:function(res){
    var that = this.data;
    var _this = this;
    var finished = that.finished;
    if (res.status == 200){
      var cards = res.data;
      if (cards.length == 0){
        return;
      }
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].code_type == "移动" && that.moveCode == null) {
          that.moveCode = cards[i];
          finished.push(cards[i]);
        }
        if (cards[i].code_type == "电信" && that.unicornCode == null) {
          that.unicornCode = cards[i];
          finished.push(cards[i]);
        }
        if (cards[i].code_type == "联通" && that.telecomCode == null) {
          that.telecomCode = cards[i];
          finished.push(cards[i]);
        }
      }
      console.log(finished.length);
      if (finished.length == 3){
        // 三张卡
        // 查询信号最好得卡

        // 保存测试记录
      } else {
        // 不是三张卡就没有测试完成
        // 提示待测卡片
        // 检测为空得测试卡
        var padding = '';
        if (that.moveCode == null){
          padding += '移动 ';
        }
        if (that.unicornCode == null) {
          padding += '联通 ';
        }
        if (that.telecomCode == null) {
          padding += '电信 ';
        }



        var steps = [];
        for (var j=0;j<finished.length;j++){
          steps.push({
            current: false,
            done: true,
            text: finished[j].code_type + '，网络类型:' + finished[j].net_type,
            desc: '10.01'
          })
        }

        _this.setData({
          steps: steps
        })
      }
    }

  },
  /**
   * 初始化数据
   */
  initInfo:function(){
    var steps = [
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '关闭设备电源',
        // 此步骤描述语
        desc: '10.01'
      },
      {
        done: true,
        current: false,
        text: '请插入一张测试卡',
        desc: '10.02'
      },
      {
        done: true,
        current: false,
        text: '请开启电源，重启设备',
        desc: '10.03'
      }
    ];
    var stepTitle = [
      {
        // 此步骤是否当前完成状态
        current: true,
        // 此步骤是否已经完成
        done: false,
        // 此步骤显示文案
        text: '步骤一',
        // 此步骤描述语
        desc: '10.01'
      },
      {
        done: false,
        current: false,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: '10.03'
      }
    ];
    this.setData({
      steps: steps,
      stepTitle: stepTitle
    })
  }
})