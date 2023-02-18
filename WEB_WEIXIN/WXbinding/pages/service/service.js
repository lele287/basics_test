// pages/service/service.js
var common = require("../../util/common.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop: null,
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //设置头部信息
    var client = getApp().globalData.client;
    var id = e.id;
    wx.setNavigationBarTitle({
      title: client.clientName,
    })
    this.setData({
      "id":id
    })
    this.getShopById(id);
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
    this.getShopById();
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
   * 点击button跳转
   */
  jumpPage: function (e) {
    var route = e.currentTarget.dataset.index;
    var equipments = this.data.shop.equipments;
    var info_code = '';
    for(var i=0;i<equipments.length;i++){
      if (equipments[i].info_code.substring(0,2) == '02'){
        info_code = equipments[i].info_code;
        break;
      }
    }
    switch (route) {
      case 'install':
        wx.navigateTo({
          url: '../install/install',
        })
        break;
      case 'change':
        wx.navigateTo({
          url: '../change/change',
        })
        break;
      case 'delete':
        wx.navigateTo({
          url: '../delete/delete',
        })
        break;
      case 'currentsign':
        wx.navigateTo({
          url: '../currentsign/currentsign?info_code=' + info_code,
        })
        break;
      case 'debug':
        wx.navigateTo({
          url: '../step/step?info_code=' + info_code,
        })
        break;
      case 'logs':
        wx.navigateTo({
          url: '../logs/logs',
        })
        break;
      case 'singlecard':
        wx.navigateTo({
          url: '../singleCard/singleCard?info_code=' + info_code,
        })
        break;
    }
  },
  getShopById:function(){
    var client_id = getApp().globalData.client.id;
    common.getHttpRequest("findShopByShopId",{"id":this.data.id,"clientId":client_id},this.doSuccess);
  },
  doSuccess:function(res){
    var that =  this;
    that.setData({
      'shop':res.data
    });
    getApp().globalData.shop = res.data;
  }
  // getShop: function (shop_code) {
  //   var that = this;
  //   var uriPrefix = getApp().globalData.uriPrefix;
  //   var client_id = getApp().globalData.client.id;
  //   wx.request({
  //     url: uriPrefix + 'FindShop',
  //     data: { client_id: client_id, store_info: shop_code },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },

  //     success: function (res) {
  //       if (res.statusCode == 200) {

  //         var shop = res.data[0];
  //         getApp().globalData.shop = shop;
  //         console.log(shop);
  //         that.setData({
  //           shop: shop
  //         });
  //       }
  //     }
  //   })
  // }
})