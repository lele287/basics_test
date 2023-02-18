//获取应用实例
const app = getApp();
const $api = require('../../../util/api.js').API;
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: "",
    DetailsData: {},
  },

  // 退单button提示
  ChargebackTips(e) {
    if (this.data.message.trim() === "" || this.data.message === null) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    Dialog.confirm({
        title: '提示信息',
        message: '是否确认接单！',
      })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },

  // 确认事件
  ReplacementEquipment() {
    this.onChargeback();


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      DetailsData: JSON.parse(options.DetailsData)
    })
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

  // 退单api
  onChargeback() {
    //   退单：api/maintainLists/charge
    // 'ID': 维修单ID,
    // 'MaintainListNo': 维修单号,
    // 'RepairListNo': 保修单号,
    // 'ChargeBackReason': 退单原因,
    // 'ListStatus': '已退单', 状态
    let myData = {
      ID: parseInt(this.data.DetailsData.MaintainId),
      MaintainListNo: this.data.DetailsData.MaintainListNo,
      RepairListNo: this.data.DetailsData.RepairListNo,
      ChargeBackReason: this.data.message,
      ListStatus: "已退单",
    }
    $api("PUT", "api/maintainLists/charge", myData)
      .then(res => {
        if(res.statusCode===200){
          wx.showToast({
            title: '退单成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  }
})