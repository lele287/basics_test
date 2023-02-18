//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signalData: [],
    equipmentCode: '',
    readOnly: false,
    activeNames: [0,1,2],
    SignalLoading: false,
  },

  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onQuery() {
    if (this.data.equipmentCode.length == 8) {
      this.signalQuery();
    } else {
      wx.showToast({
        title: '请输入正确的设备编号',
        icon: 'none',
        duration: 1500
      })
      this.setData({
        signalData: []
      })
    }
  },
  onQueryClear() {
    this.setData({
      equipmentCode: '',
      signalData: [],
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (Object.keys(options).length === 0) {
      this.setData({
        readOnly: false
      })
    } else {
      this.setData({
        equipmentCode: options.Code,
        readOnly: true,
      })
      this.signalQuery();
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

  },

  // 信号查询
  signalQuery() {
    this.setData({
      SignalLoading: true
    })
    let equipmentCode = {
      'equipment_code': this.data.equipmentCode
    }
    $api("GET", "api/single/wx", equipmentCode)
      .then(res => {
        if (res.data.data === null) {
          this.setData({
            signalData: []
          })
        } else {
          let myData = res.data.data
          if (this.data.equipmentCode.slice(0, 2) == '09') {
            this.setData({
              signalData: myData.simInfoList
            })
          } else {
            // 06200006
            // 09200001
            let Signal = [{}, {}];
            let element;
            for (const key in myData.card) {
              if (myData.card.hasOwnProperty(key)) {
                element = myData.card[key];
                if (key.slice(0, 1) == 'M' && myData.card.M_iccid !== '') {
                  Signal[0][key.split('_')[1]] = element
                } else if (key.slice(0, 1) == 'B') {
                  Signal[1][key.split('_')[1]] = element
                }
              }
            }
            this.setData({
              signalData: Signal
            })
          }
        }
        this.setData({
          SignalLoading: false
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  }
})