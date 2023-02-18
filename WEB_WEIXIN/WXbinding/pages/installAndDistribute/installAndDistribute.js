// pages/installAndDistribute/installAndDistribute.js
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    installEquipment: [],
    total: 0,
    equ_type: 0,
    euqipement: '',
    key: '',
    pageNum: 1,
    page: 1,
    hasNextPage: false,
    state: '',
    model:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      model: options.equipment
    })
    this.getDistributeInstallEquipmentList();
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
  lower: function () {
    if (this.data.hasNextPage) {
      this.setData({
        pageNum: this.data.pageNum + 1,
      })
      this.getDistributeInstallEquipmentList()
    }
  },
  infoChange: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  getInstallEquipmentByKey() {
    this.setData({
      pageNum: 1,
      installEquipment: []
    });
    this.getDistributeInstallEquipmentList();
  },
  getDistributeInstallEquipmentList:function(){
    var params = {
      'equipment_type': this.data.equ_type,
      'client_id': getApp().globalData.client.id,
      'key' : this.data.key,
      'equipment_state': this.data.state,
      'partner_id' : getApp().globalData.user.partnerId,
      'equipment_model': this.data.model
    };
    common.postHttpRequest('getInstallEquipmentByEquType?pageNum=' + this.data.pageNum, params,this.doSuccess);
  },
  doSuccess:function(res){
    var that = this;
    that.setData({
        installEquipment: that.data.installEquipment.concat(res.data.list),
        total: res.data.total,
        pageNum: res.data.pageNum,
        hasNextPage: res.data.hasNextPage
    })
  }
  // getDistributeInstallEquipmentList: function () {
  //   var that = this;
  //   var uriPrefix = getApp().globalData.uriPrefix;
  //   var client = getApp().globalData.client;
  //   wx.showToast({
  //     title: '加载中',
  //     icon: 'loading',
  //     duration: 3000
  //   })
  //   wx.request({
  //     url: uriPrefix + 'getInstallEquipmentByEquType?pageNum=' + that.data.pageNum,
  //     data: { 'equipment_type': that.data.equ_type, 'client_id': client.id, 'key': that.data.key, 'equipment_state': that.data.state, 'partner_id': getApp().globalData.user.partner_id, equipment_model: that.data.model },
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success(res) {
  //       wx.hideToast();
  //       that.setData({
  //         installEquipment: that.data.installEquipment.concat(res.data.list),
  //         total: res.data.total,
  //         pageNum: res.data.pageNum,
  //         hasNextPage: res.data.hasNextPage
  //       })
  //     },

  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // }
})