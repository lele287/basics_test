// pages/delete/delete.js
var util = require('../../util/util.js');
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipment: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
    this.findEquipmentByShopId();
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
  findEquipmentByShopId:function(){
    var shop = getApp().globalData.shop;
    common.getHttpRequest("findEquipmentByShopId", { "id": shop.id },this.doSuccess);
  },
  doSuccess:function(res){
    var that = this;
    that.setData({
      equipment:res.data
    });
  },
  clickDeleteOne:function(e){
    var client = getApp().globalData.client;
    var user = getApp().globalData.user;
    var shop = getApp().globalData.shop;

    var index = e.currentTarget.dataset.index;
    var oneEquipment = this.data.equipment[index];

    var equipmentList = [];
    var equipment = {'info_code': oneEquipment.equipment_code, "shop_id": shop.id};
    equipmentList.push(equipment);
    var params = {
      "shopEquipment": equipmentList,
      "custemInfo":{
        "user_id": user.id,
        "client_id": client.id,
        "partner_id":user.partnerId
      }
    }
    common.postHttpRequest("delete", params,this.deleteSuccess);
  },
  deleteSuccess:function(res){
    console.log(res);
    if (res.status == 200){
      wx.showToast({
        title: '删除成功',
        icon: 'loading',
        duration: 1000
      })
      this.findEquipmentByShopId();
    }else{
      wx.showToast({
        title: '删除失败',
        icon: 'loading',
        duration: 1000
      })
    }
  
  },
  deleteAll: function () {
    var client = getApp().globalData.client;
    var user = getApp().globalData.user;
    var shop = getApp().globalData.shop;

    var equipments = this.data.equipment;

    var equipmentList = [];
    for (var i = 0; i < equipments.length;i++){
      var equipment = { 'info_code': equipments[i].equipment_code, "shop_id": shop.id };
      equipmentList.push(equipment);
    }

    var params = {
      "shopEquipment": equipmentList,
      "custemInfo": {
        "user_id": user.id,
        "client_id": client.id,
        "partner_id": user.partnerId
      }
    }
    common.postHttpRequest('delete', params,this.deleteAllSuccess);
  },

  deleteAllSuccess:function(res){
    if (res.status == 200){
      wx.showModal({
        title: '提示',
        content: '删除成功',
      })
      this.findEquipmentByShopId();
    }else{
      wx.showModal({
        title: '提示',
        content: '删除失败',
      })
    }

  }
  // deleteAll:function(){
  //   var that = this;
  //   var equs = this.data.equipment;
  //   var uriPrefix = getApp().globalData.uriPrefix;
  //   var client = getApp().globalData.client;
  //   var user = getApp().globalData.user;
  //   var shop = getApp().globalData.shop;

  //   var deleteEqus = [];
  //   for (var i = 0; i < equs.length; i++) {
  //     var dele = {'equipment_code': equs[i].equipment_code};

  //     dele.shop_code = shop.shop_code;
  //     dele.shop_id = shop.id;
  //     dele.user_id = user.id;
  //     dele.client_id = client.id;
  //     dele.partner_id = user.partner_id;

  //     deleteEqus.push(dele);
  //   }
  //   wx.showModal({
  //     title: '提示',
  //     content: '您确定要拆除全部设备嘛?',
  //     success: function (res) {
  //       //用户可以看点提示信息
  //       if (res.confirm){
  //         wx.request({
  //           url: uriPrefix + 'deleteEquipmentByShopId',
  //           data: deleteEqus,
  //           method: 'POST',
  //           header: {
  //             'content-type': 'application/json'
  //           },
  //           success:function(res){
  //             util.updateShop(shop.shop_code);
  //             that.findEquipmentByShopId();
  //           }
  //         })
  //       }
  //     }
  //   })
  // }
})