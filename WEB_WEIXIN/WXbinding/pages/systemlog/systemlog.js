// pages/systemlog/systemlog.js
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    });
    this.getChangeLog();
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
   * 得到换机日志
   */
  getChangeLog:function(){
    var client = getApp().globalData.client;
    var shop = getApp().globalData.shop;
    common.getHttpRequest("getChangeRecord",{'client_id':client.id,
      'shop_code': shop.shopCode},this.doSuccess);
  },
  /**
   * 成功的回调函数
   */
  doSuccess:function(res){
    var that = this;
    that.setData({
      changeData:res.data
    });
  }
})