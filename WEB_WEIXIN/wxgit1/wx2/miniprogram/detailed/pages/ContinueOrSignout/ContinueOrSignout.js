// detailed/pages/ContinueOrSignout/ContinueOrSignout.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentEquipment: {},
    BounceBack:0,
  },

  onContinue () {
    wx.navigateBack({
      delta: 1
    })
  },
  onEnd(){
    wx.navigateBack({
      delta: this.data.BounceBack
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentEquipment: JSON.parse(options.currentEquipment)
    })
    if(options.readOnly=='true'){
      this.setData({BounceBack: 2})
    }else{
      this.setData({BounceBack: 3})
    }

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