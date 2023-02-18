// pages/wifiTest/wifiTest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    b:'',
    showlist:'',
    steps : [
      {
        // 此步骤是否当前完成状态
        current: true,
        // 此步骤是否已经完成
        done: false,
        // 此步骤显示文案
        text: '步骤一',
        // 此步骤描述语
        desc: '10.01'
      },
      {
        done: false,
        current: false,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: '10.03'
      }
    ],
    step : [
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '打开wifi开关',
        // 此步骤描述语
        desc: '10.01'
      },
      {
        done: true,
        current: false,
        text: '连接待测wifi',
        desc: '10.02'
      },
      {
        done: true,
        current: false,
        text: '连接上待测wifi,点击下一步',
        desc: '10.03'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCurrentWifi();
    var client = getApp().globalData.client;
    wx.setNavigationBarTitle({
      title: client.client_name,
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

  isConnected:function(){

    //测试国科的WIFI
    wx.request({
      url: 'https://www.baidu.com',
      success: function (e) {
        wx.showModal({
          title: '提示',
          content: '外网能连接的上',
        })
      },
      fail: function (e) {
        wx.showModal({
          title: '提示',
          content: '外网连接的不上',
        })
      }
    })
    var that = this;
    wx.startWifi({
      success: function (res) {
        wx.getWifiList({
          success: function (res) {
            that.setData({
              b: res.errMsg
            });
          },
          fail: function (res) {
            that.setData({
              b: res.wifiList
            });
          }
        })

        wx.onGetWifiList(function (CALLBACK) {
          var a = CALLBACK.wifiList;
          var showlist = that.data.showlist;
          that.setData({
            showlist: a
          })
        });
      },
      fail: function (res) {
        console.log(res.errMsg);
        that.setData({
          b: res.errMsg
        })
      }
    })
    var success = function (e) {
      wx.showModal({  
        title: '提示',
        content: '当前连接的wifi是' + e.wifi.SSID,
      })
      
 
     
    }
    wx.onWifiConnected(success)
  }
})