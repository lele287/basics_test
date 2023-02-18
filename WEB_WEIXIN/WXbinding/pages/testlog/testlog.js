// pages/testlog/testlog.js
var app = getApp().globalData;
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
    this.getTestLogByStoreId();
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
  getTestLogByStoreId:function(){
    common.postHttpRequest("getTestRecordByShopId", { "storeId": getApp().globalData.shop.id},this.doSuccess);
  },
  doSuccess:function(res){
    var that = this;
    console.log(res.data);
    that.setData({
      testData:res.data
    })
  }, 
  // getTestLogByStoreId:function(){
  //   var that = this;
  //   wx.request({
  //     url: app.uriPrefix +'queryAllTestResult',
  //     data: { store_id: getApp().globalData.shop.id},
  //     method:"POST",
  //     header:{
  //       "content-type":"application/json"
  //     },
  //     success:function(res){
  //       console.log(res);
  //       that.setData({
  //         testData:res.data
  //       });
  //     }
  //   })
  // },
  jumpDetail:function(e){
    var index = e.currentTarget.dataset.index;
    var oneLog = this.data.testData[index];
    var data = JSON.stringify(oneLog);
    wx.navigateTo({
      url: '../testlogdetail/testlogdetail?data=' + data,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  ping:function(){
    var img = new Image();
  }
})