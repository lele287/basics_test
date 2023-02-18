// pages/shoplog/shoplog.js
var app = getApp().globalData;
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dismantleData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
    this.getDismantleLogByStoreId();
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
  getDismantleLogByStoreId:function(){
    var shop_code = app.shop.shopCode;
    common.getHttpRequest("dismantle",{"shop_code":shop_code},this.doSuccess);
    
  },
  doSuccess:function(res){
    var that = this;
    that.setData({
      dismantleData:res.data
    })
  },
  // getDismantleLogByStoreId: function () {
  //   var that = this;
  //   var shop_code = app.shop.shop_code;
  //   wx.request({ 
  //     url: app.uriPrefix + 'queryDismantleByShopCode',
  //     data: { shop_code: shop_code },
  //     method: "GET",
  //     header: {
  //       "content-type": "application/x-www-form-urlencoded"
  //     },
  //     success: function (res) {
  //       that.setData({
  //         dismantleData: res.data
  //       });
  //     }
  //   })
  // },
  jumpDetail: function (e) {
    var index = e.currentTarget.dataset.index;
    var oneLog = this.data.testData[index];
    var data = JSON.stringify(oneLog);
    wx.navigateTo({
      url: '../testlogdetail/testlogdetail?data=' + data,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  ping: function () {
    var img = new Image();
  }
})