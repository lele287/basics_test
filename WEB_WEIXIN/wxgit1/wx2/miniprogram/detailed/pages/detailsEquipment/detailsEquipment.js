//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    detailsData: {},
    equipment: [],
    slideIndex: 0,
    activeNames: ["基本信息", "进阶信息"],
  },
  change(e) {
    this.setData({
      index: e.detail.current
    })
  },
  rebo() {
    this.setData({
      index: 0
    })
  },
  shang() {
    this.setData({
      index: 1
    })
  },
  changeswiper(e) {
    this.setData({
      slideIndex: e.detail.current
    })
  },
  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
      AdvancedNames: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 更改题头
    wx.setNavigationBarTitle({
      title: app.data.companyName+"_"+options.Range+"_"+options.EquipmentCode
    })
    let _this = this;
    try {
      var value = wx.getStorageSync('essentialInformation')
      if (value) {
        if (value.InstallDate != "") {
          // value.InstallDate=value.InstallDate.slice(0,10)
          value.InstallDate = app.DateFormat(value.InstallDate, 'HMS');
          _this.setData({
            detailsData: value,
          })
        }
      } else {
        _this.setData({
          detailsData: {},
        })
      }
    } catch (e) {}
    // this.setData({
    //   detailsData: wx.getStorageSync('essentialInformation')
    // })
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

})