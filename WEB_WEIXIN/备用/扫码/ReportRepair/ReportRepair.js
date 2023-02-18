// pages/ReportRepair/ReportRepair.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanCodeMsg: "",
  },
  scanCode: function () {
    var that = this;
    wx.scanCode({ //扫描API
      success(res) { //扫描成功
        console.log(res) //输出回调信息
        that.setData({
          scanCodeMsg: res.result
        });

        try {
          if (JSON.parse(res.result).EquipmentCode) {
            wx.navigateTo({
              url: "/pages/ReportRepairScanCode/ReportRepairScanCode?scanCode=" + res.result
            })
          }
        } catch (e) {
          wx.showToast({
            title: '请扫描报修码',
            duration: 1000
          })
        }
      }
    })
  },
  Manual() {
    wx.navigateTo({
      url: "/pages/ReportRepairManual/ReportRepairManual"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})