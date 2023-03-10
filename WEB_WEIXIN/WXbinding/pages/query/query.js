// pages/query/query.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var client = getApp().globalData.client;
    wx.setNavigationBarTitle({
      title: client.client_name,
    })
    this.getShop();
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

  getShop: function () {
    var that = this;
    var uriPrefix = getApp().globalData.uriPrefix;
    var client_id = getApp().globalData.client.id;
    var shop = getApp().globalData.shop;
    wx.request({
      url: uriPrefix + 'FindShop',
      data: { client_id: client_id, store_info: shop.shop_code },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },

      success: function (res) {
        if (res.statusCode == 200) {

          var shop = res.data[0];
          that.setData({
            shop: shop
          });
        }
      }
    })
  }
})