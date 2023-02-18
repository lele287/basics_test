// pages/currentsign/currentsign.js
var common = require('../../util/common.js');
var app = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: null,
    euqipmentCode: '',
    bCode: null,
    mCode: null,
    cards: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
    this.setData({
      euqipmentCode : options.info_code
    })
    common.getHttpRequest("testSignalByEquNum", { "equipment_code": options.info_code},this.doSuccess);
  },
  doSuccess:function(res){
    var that = this;
    
    if (res.status == 400){
      wx.hideToast();
      wx.showModal({
        title: '提示',
        content: '卡片拨不上号',
      })
      return;
    } else if (res.status == 202){
      wx.hideToast();
      wx.showModal({
        title: '提示',
        content: '当前的卡片非群睿卡片',
      })
    }

    var bCode = null;
    var mCode = null;
    var cards = res.data;
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].code_positon == 'b') {
        bCode = cards[i];
      }
      if (cards[i].code_positon == 'm') {
        mCode = cards[i];
      }
    }
    var steps = [
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '主卡为:' + mCode.code_type + '<br>' + '信号值为:' + mCode.code_signal + '<br>' + '网络类型:' + mCode.net_type,
        // 此步骤描述语
        desc: '10.01'
      },
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '副卡为:' + bCode.code_type + '<br>' + '信号值为:' + bCode.code_signal + '<br>' + '网络类型:' + bCode.net_type,
        // 此步骤描述语
        desc: '10.01'
      },
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: mCode.code_type + ':' + mCode.iccid,
        // 此步骤描述语
        desc: '10.01'
      },
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: bCode.code_type + ':' + bCode.iccid,
        // 此步骤描述语
        desc: '10.01'
      },
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '店号:' + app.shop.shopCode,
        // 此步骤描述语
        desc: '10.01'
      },
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '店名:' + app.shop.shopName,
        // 此步骤描述语
        desc: '10.01'
      },
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '4G路由器:' + that.data.euqipmentCode,
        // 此步骤描述语
        desc: '10.01'
      }
    ]

    that.setData({
      steps: steps,
      bCode: bCode,
      mCode: mCode,
      cards: cards
    });
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
   * 保存此刻信号
   */
    save:function(){
      var codes = this.data.cards;
      var m_signal = '';
      var u_signal = '';
      var t_signal = '';
      var m_nettype = '';
      var u_nettype = '';
      var t_nettype = '';
      for (var i = 0; i < codes.length; i++) {
        if (codes[i].code_type == '移动') {
          m_signal = codes[i].code_signal;
          var m_nettype = codes[i].net_type;
        }
        if (codes[i].code_type == '电信') {
          t_signal = codes[i].code_signal;
          var t_nettype = codes[i].net_type;
        }
        if (codes[i].code_type == '联通') {
          u_signal = codes[i].code_signal;
          var u_nettype = codes[i].net_type;
        }
      }
      var params = {
        'mSignal': m_signal,
        'uSignal': u_signal,
        'tSignal': t_signal,
        'mCode': this.data.mCode.code_type,
        'bCode': this.data.bCode.code_type,
        'storeId': getApp().globalData.shop.id,
        'tester': getApp().globalData.user.userName,
        'formalCard1': codes[1].iccid,
        'formalCard2': codes[0].iccid,
        'equipmentCode': this.data.euqipmentCode,
        'isTest': 0,
        "clientId": getApp().globalData.client.id,
        "partnerId": getApp().globalData.user.partnerId,
        'mNettype': m_nettype,
        'uNettype': u_nettype,
        'tNettype': t_nettype
      }
      common.postHttpRequest("saveTestRecord", params,this.saveSuccess);
    },
    saveSuccess:function(res){
      if(res.status == 200){
        wx.showModal({
          title: '提示',
          content: '保存成功',
        })
      }else{
        wx.showModal({
          title: '提示',
          content: '保存失败',
        })
      }
    }
})