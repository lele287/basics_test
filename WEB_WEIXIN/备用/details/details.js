import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      detailsData: wx.getStorageSync('essentialInformation')
    })
    let _this = this;
    wx.request({
      url: app.data.url+'api/shop/equipment/relationInfo',
      method: 'GET',
      data: {
        'shopID': wx.getStorageSync('essentialInformation').Id,
        // 'shopID':4901,
        'shopCode': wx.getStorageSync('essentialInformation').ShopCode,
        // 'shopCode':108005,
      },
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          // console.log(res.data.data.ShopEquipments);
          if (res.data.data.ShopEquipments != null) {
            let  equipmentData=res.data.data.ShopEquipments
            for(var i=0;i<equipmentData.length;i++){
              equipmentData[i].EquipmentInstall = res.data.data.ShopEquipments[i].EquipmentInstall.split('T')[0]
            }
            _this.setData({equipment: equipmentData})
            console.log(_this.data.equipment);
          }
        }
      },
      fail(err) {
        console.log(err);
      }
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