//获取应用实例
const app = getApp();
const $api = require('../../../util/api.js').API;
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
import api from '../../../util/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    DetailsData: {},
    activeNames: ['基本信息', '详细信息', '维修信息'],
    steps: [],
    OperateTime: [],
    LoginInformation: "",
    SwitchSignIn: false,
  },

  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  // 接单button提示
  ReceivingOrdersTips(e) {
    let currentTime = app.DateFormat(new Date(), "HMS")
    Dialog.confirm({
        title: '提示信息',
        message: "当前时间：" + currentTime + '\n是否确认接单！',
      })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },
  // 退单button
  ChargebackTips(e) {
    if (this.data.DetailsData.RepairListNo !== '' && this.data.DetailsData.MaintainListNo !== '') {
      wx.navigateTo({
        url: "../Chargeback/Chargeback?DetailsData=" + JSON.stringify(this.data.DetailsData)
      })
    }
  },
  // 结案button
  CloseTheCase(e) {
    if (this.data.DetailsData.RepairListNo !== '' && this.data.DetailsData.MaintainListNo !== '') {
      wx.navigateTo({
        url: "../CloseTheCase/CloseTheCase?DetailsData=" + JSON.stringify(this.data.DetailsData)
      })
    }
  },

  // 确认事件
  ReplacementEquipment() {
    this.onReceivingOrders();
  },

  // 签到
  onSignIn() {
    // maintainLists/charge
    // 'ID': 维修单ID,
    // 'MaintainListNo': 维修单号,
    // 'RepairListNo': 保修单号,
    // 'ListStatus': '已签到', 状态
    let myData = {
      ID: parseInt(this.data.DetailsData.MaintainId),
      MaintainListNo: this.data.DetailsData.MaintainListNo,
      RepairListNo: this.data.DetailsData.RepairListNo,
      ListStatus: "已签到",
    }
    $api("PUT", "api/maintainLists/charge", myData)
      .then(res => {
        if (res.data.message === "操作成功") {
          this.setData({
            SwitchSignIn: true
          })
          wx.showToast({
            title: '成功签到',
            icon: 'none',
            duration: 1000
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: JSON.parse(options.Details).ClientName
    })
    let Details = JSON.parse(options.Details)
    Details.LastRepairTime = app.DateFormat(Details.LastRepairTime, 'HMS')
    console.log(Details);
    this.setData({
      DetailsData: Details
    });
    if (Details.MaintainListStatus === "已签到") {
      this.setData({
        SwitchSignIn: true
      })
    } else {
      this.setData({
        SwitchSignIn: false
      })
    }

    try {
      var value = wx.getStorageSync('userAccount')
      if (value) {
        // LoginInformation
        this.setData({
          LoginInformation: value
        })
      }
    } catch (e) {}


    this.RepairReport();
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


  RepairReport() {
    $api("GET", "api/repair_processes/all/" + this.data.DetailsData.RepairListNo)
      .then(res => {
        let data = res.data.data;
        let OperateTime = [];
        let steps = [];
        for (let i = 0; i < data.length; i++) {
          OperateTime.push({
            yearMonthDay: data[i].OperateTime.split('T')[0],
            TimeBranchSecond: data[i].OperateTime.split('T')[1].split('+')[0]
          })
          steps.push({
            text: data[i].ProcessName,
            desc: data[i].OperatorName
          })
        }
        this.setData({
          OperateTime: OperateTime,
          steps: steps
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 接单api
  onReceivingOrders() {
    //  接单：maintainLists/charge
    // 'ID': 维修单ID,
    // 'MaintainListNo': 维修单号,
    // 'RepairListNo': 保修单号,
    // 'ListStatus': '维修中', 状态
    console.log(this.data.DetailsData.MaintainListNo);
    let myData = {
      ID: parseInt(this.data.DetailsData.MaintainId),
      MaintainListNo: this.data.DetailsData.MaintainListNo,
      RepairListNo: this.data.DetailsData.RepairListNo,
      ListStatus: "维修中",
    }
    $api("PUT", "api/maintainLists/charge", myData)
      .then(res => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '接单成功',
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