// pages/PersonalCenter/PersonalCenter.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CompName: '当前还没有登录，快去登录吧！',
    name: '当前还没有登录，快去登录吧！',
    NickName: '当前还没有登录，快去登录吧！',
    FullNameEn: '当前还没有登录，快去登录吧！',
  },
  signOut() {
    wx.removeStorage({
      key: 'userAccount',
      success: function (res) {
        console.log(res)
      }
    })
    wx.removeStorage({
      key: 'mytoken',
      success: function (res) {
        console.log(res)
      }
    })
    this.setData({ name: '' })
    wx.reLaunch({
      url: "/pages/login/login"
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
    let _this = this
    wx.getStorage({
      key: 'userAccount',
      success: function (res) {
        console.log(res.data)
        _this.setData({
          CompName: res.data.CompName,
          name: res.data.UserName,
          NickName: res.data.NickName,
          FullNameEn: res.data.FullNameEn,
        })
      }
    })
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