//获取应用实例
const app = getApp()
const $api = require('../../../util/api').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    detailsData: {},
    equipment: [],
    slideIndex: 0,
    activeNames: ["门店信息", "设备信息", "维修记录"],
    see: false,
    maintenance: {},
    // 信号
    Signal: [],
    SignalData: [],
    SignalState: false,
    SignalVal: '',
    SignalSlide: '',
    SignalIndex: 0,
    SignalIx: 0,
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
  newlyAdded() {
    wx.navigateTo({
      url: "../NewSite/NewSite"
    })
  },
  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onSignalNavigateTo() {
    if (this.data.SignalData.length === 1) {
      wx.navigateTo({
        url: "../Signal/Signal?Code=" + this.data.Signal[0].EquipmentCode,
      })
    } else {
      this.onSignalShow();
    }
  },

  onSingleNavigateTo() {
    let detailsData = this.data.detailsData
    // let SingleCard = {
    //   CompanyId:app.data.SelectCompanyId,
    //   ShopCode:detailsData.ShopCode,
    //   ShopAreaName:detailsData.ShopAreaName,
    //   ShopName:detailsData.ClientName+'_'+detailsData.ShopName,
    //   ShopId:detailsData.Id
    // }
    wx.navigateTo({
      url: "../SingleCardDebugging/SingleCardDebugging?ShopId" + detailsData.Id,
    })
  },

  // 信号中 code筛选
  onSignal(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      SignalSlide: value,
      SignalIndex: index
    });
  },
  onSignalShow() {
    this.setData({
      SignalState: true
    });
  },
  onSignalHide() {
    this.setData({
      SignalState: false
    });
  },
  SignalYes() {
    this.setData({
      SignalIx: this.data.SignalIndex,
      SignalVal: this.data.SignalSlide,
    })
    wx.navigateTo({
      url: "../Signal/Signal?Code=" + this.data.Signal[this.data.SignalIx].EquipmentCode,
    })
  },

  // 维修记录跳转
  onMaintenanceRecord() {
    wx.navigateTo({
      url: '../MaintenanceRecord/MaintenanceRecord',
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let data = wx.getStorageSync('essentialInformation');
    data.InstallTime = app.DateFormat(data.InstallTime, 'HMS')
    let element = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] == '') {
          element[key] = '-';
        } else {
          element[key] = data[key];
        }
      }
    }
    this.setData({
      detailsData: element
    })
    wx.setNavigationBarTitle({
      title: data.ShopName
    })
    this.DeviceInformation();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      see: false
    })
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

  // 设备信息获取
  DeviceInformation() {
    let deviceData;
    try {
      var value = wx.getStorageSync('essentialInformation').Id
      if (value) {
        deviceData = {
          shop_id: value,
        }
      }
    } catch (e) {
      console.log(e);
    }
    $api("GET", "api/equipments/shop_id/wx", deviceData)
      .then(res => {
        let data = [];
        if (res.data.data != null) {
          data = res.data.data;
          let SignalData = [];
          let Signal = [];
          for (let i = 0; i < data.length; i++) {
            data[i].InstallDate = app.DateFormat(data[i].InstallDate, 'HMS');
            if (data[i].EquipmentTypeName === '4G路由器') {
              SignalData.push(data[i].EquipmentName + '_' + data[i].EquipmentCode)
              Signal.push(data[i])
              this.setData({
                see: true
              })
            }
          }
          this.setData({
            equipment: data,
            Signal: Signal,
            SignalData: SignalData,
          })
        } else {
          data = []
          this.setData({
            equipment: [],
            Signal: [],
            SignalData: [],
          })
        }
        if(this.data.see){
          this.MaintenanceRecord();
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 维修记录
  MaintenanceRecord() {
    let deviceData;
    try {
      var value = wx.getStorageSync('essentialInformation').Id
      if (value) {
        deviceData = {
          shop_id: value,
        }
      }
    } catch (e) {
      console.log(e);
    }
    $api("GET", "api/repair_lists/wx/" + deviceData.shop_id)
      .then(res => {
        let data = res.data.data
        let maintenance = {}
        maintenance.total = 0;
        maintenance.handle = 0;
        maintenance.end = 0;
        res.data.data.forEach(value => {
          if (value.ListStatus !== "无需派发") {
            maintenance.total++
            if (value.ListStatus === '已结案') {
              maintenance.end++
            } else {
              maintenance.handle++
            }
          }
        })

        // res.data.data.forEach(value => {
        //   value.InstallDate = app.DateFormat(value.InstallDate, 'HMS');
        //   value = app.DataScreening(value)
        // })
        this.setData({
          maintenance: maintenance
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})
// https://netop.sharewis.com:8000/server/api/shop/equipment/relationInfo?shopID=4919&shopCode=108001