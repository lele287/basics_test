// pages/login/login.js
var common = require('../../util/common.js');
Page({
   // 页面的初始数据
  data: {
    user: '',
    password: '',
    hasLogin: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    let user =  wx.getStorageSync('user');
    if(user){
      getApp().globalData.user = JSON.parse(user);
      wx.redirectTo({
        url: '../client/client',
      })
    }else{
      this.setData({
        hasLogin:false
      })
    }
  },
  // 生命周期函数--监听页面初次渲染完成
  onReady: function () {
  },
  // 生命周期函数--监听页面显示
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
  login: function () {
    var uriPrefix = getApp().globalData.uriPrefix;
    if (this.data.user.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '输入信息有误',
        icon: 'loading',
        duration: 1000
      })
    } else {
      common.postHttpRequest('login', { "userName": this.data.user.trim(), "password": this.data.password }, this.doSuccess);
    }
  },
  userChange: function (e) {
    console.log(e)
    this.setData({
      user: e.detail.value
    })
  },
  passwordChange: function (e) {
    console.log(e)
    this.setData({
      password: e.detail.value
    })
  },

  doSuccess:function(result){
    var that = this;
    if (result.status == 200){
        var user = result.data.user;
        getApp().globalData.user = user;
        // 将user存进缓存
        wx.setStorage({
          key: 'user',
          data: JSON.stringify(user)
        })
        wx.redirectTo({
            url: '../client/client',
        })
    } else {
        wx.showToast({
            title: '账号或密码有误',
            icon: 'loading',
            duration: 1000
        })  
    }
  }
})