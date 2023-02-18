//获取应用实例
const app = getApp()
const $api = require('../../../util/api').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Repair:[]
  },

  onRepairDetails(e){
    wx.navigateTo({
      url: '../MaintenanceRecordDetails/MaintenanceRecordDetails?RepairDetails='+JSON.stringify(e.currentTarget.dataset.item),
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.MaintenanceRecord();
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


  // 维修记录
  MaintenanceRecord() {
    let deviceData;
    try {
      var value = wx.getStorageSync('essentialInformation').Id
      if (value) {
        deviceData = {
          shop_id: value,
        }
      }
    } catch (e) {
      console.log(e);
    }
    $api("GET", "api/repair_lists/wx/" + deviceData.shop_id)
      .then(res => {
        let RepairData = [];
        res.data.data.forEach(value => {
          value.CreatedAt = app.DateFormat(value.CreatedAt, 'HMS');
          value = app.DataScreening(value)
          if(value.ListStatus!=="无需派发"){
            RepairData.unshift(value)
          }
        })
        this.setData({Repair:RepairData})
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})