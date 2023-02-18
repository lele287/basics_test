// pages/Search/Search.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    inputVal: '',
    searchRecord: [],
  },
  onSearch(e) {
    this.searchSubmitFn();
  },
  onCancel(e) {
    this.searchSubmitFn();
  },
  onChange(e) {
    this.setData({
      inputVal: e.detail,
    });
  },
  // 删除历史搜索记录
  historyDelFn: function () {
    // wx.clearStorageSync('searhRecord')
    try {
      wx.removeStorageSync('clearStorageSync')
    } catch (e) {
      console.log(e);
    }
    this.setData({
      searchRecord: []
    })
  },
  ClickHistory(e){
    // console.log(e.currentTarget.dataset.value);
    this.setData({inputVal:e.currentTarget.dataset.value})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openHistorySearch();
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
  //取得本地储存函数 在生命周期函数onload中调用
  openHistorySearch: function () {
    this.setData({
      searchRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
    console.log(this.data.searchRecord);
  },
  // 储存到本地
  searchSubmitFn: function () {
    let inputVal = this.data.inputVal
    let searchRecord = this.data.searchRecord
    if (inputVal == '') {
      //输入为空时的处理
    } else {
      for (let i = 0; i < searchRecord.length; i++) {
        if (searchRecord[i].value == inputVal) {
          searchRecord.splice(i,1)
        }
      }
      //将搜索值放入历史记录中,只能放前10条
      if (searchRecord.length < 10) {
        searchRecord.unshift({
          value: inputVal,
        })
      } else {
        searchRecord.pop() //删掉旧的时间最早的第一条
        searchRecord.unshift({
          value: inputVal,
        })
      }
      //将历史记录数组整体更新
      this.setData({
        searchRecord: searchRecord
      })
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', searchRecord)
    }
  },

})