//获取应用实例
const app = getApp()
const $api = require('../../../util/api').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ["基本信息", "设备信息"],
    DetailsData: {},
    shopId: null,
    equipment: [],
  },

  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.hasOwnProperty('companyName')
    var DetailsData;
    if (options.hasOwnProperty('DetailsIp')) {
      DetailsData = JSON.parse(options.DetailsIp)
      DetailsData.queryType = "IP";
      // 动态更改题头
      wx.setNavigationBarTitle({
        title: DetailsData.ShopArea + '_' + DetailsData.ShopName
      })
    } else if (options.hasOwnProperty('DetailsAp')) {
      DetailsData = JSON.parse(options.DetailsAp)
      DetailsData.queryType = "AP";
      // 动态更改题头
      wx.setNavigationBarTitle({
        title: DetailsData.ShopAreaName + '_' + DetailsData.ShopName
      })
    }
    DetailsData.ScUpdateTime = app.DateFormat(DetailsData.ScUpdateTime, 'HMS');
    DetailsData = app.DataScreening(DetailsData)
    this.setData({
      DetailsData: DetailsData
    })
    console.log(this.data.DetailsData);
    this.loadShopData();
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


  // 门店 数据获取
  loadShopData() {
    let data = {
      'page': 1,
      'size': 10,
      'is_close': true,
      'client_id': 1,
      'keyword': this.data.DetailsData.ShopCode,
      'shop_area': "全部",
    }
    if (this.data.DetailsData.companyName === "全家") {
      data.client_id = 1
    } else if (this.data.DetailsData.companyName === "贝瑞") {
      data.client_id = 239
    }
    $api("GET", `api/shops/wx`, data)
      .then(res => {
        if (res.data.data === null && res.data.data.Shops === null) {
          return;
        }
        if (res.data.data.Shops.length === 1) {
          this.setData({
            shopId: res.data.data.Shops[0].Id
          })
          this.DeviceInformation();
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 设备信息获取
  DeviceInformation() {
    let deviceData = {
      shop_id: this.data.shopId,
    }

    $api("GET", "api/equipments/shop_id/wx", deviceData)
      .then(res => {
        if (res.data.data !== null) {
          res.data.data.forEach(Value => {
            Value.InstallDate = app.DateFormat(Value.InstallDate, 'HMS');
          })
          this.setData({
            equipment: res.data.data,
          })
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

})