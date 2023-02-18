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
    activeNames: ['1'],
    slideIndex:0,
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
  // 新增门店
  NewStores(){
    wx.navigateTo({
      url: "/pages/NewSite/NewSite"
    })
  },
  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  // 功能模块
  changeswiper(e){
    this.setData({
      slideIndex: e.detail.current
    })
  },
  changeMore(){
    this.setData({
      slideIndex: 1
    })
  },
  newlyAdded(){
    wx.navigateTo({
      url: "/pages/NewSite/NewSite"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailsData: wx.getStorageSync('essentialInformation'),
    })
    wx.setNavigationBarTitle({
      title: this.data.detailsData.CompCnName 
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

  }
})