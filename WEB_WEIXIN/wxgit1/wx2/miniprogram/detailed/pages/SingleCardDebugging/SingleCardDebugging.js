//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    signalData: [],
    equipmentCode: '',
    readOnly: false,
    activeNames: [0, 1, 2],
    SignalLoading: false,
    optionsData: '',
    readOnlyOptionsData: '',
    // 信号
    Signal: [],
    SignalData: [],
    SignalState: false,
    SignalVal: '',
    SignalSlide: '',
    SignalIndex: 0,
    SignalIx: 0,
  },

  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  onSwitch() {
    wx.navigateTo({
      url: '../customerShopChoice/customerShopChoice',
    })
  },

  // 确认保存提示
  whetherConfirm(e) {
    Dialog.confirm({
        title: '提示信息',
        message: '是否确认保存！',
      })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },

  // 确定保存事件
  ReplacementEquipment() {
    this.RecordKeeping();
  },

  onSignalNavigateTo() {
    if (this.data.SignalData.length === 1) {
      console.log('不弹窗');
      this.signalQuery();
    } else {
      this.onSignalShow();
    }
  },

  // 信号中 筛选
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
    this.signalQuery();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this;
    if (Object.keys(options).length === 0) {
      this.setData({
        readOnly: false
      })
    } else {
      this.setData({
        readOnly: true,
      })
      wx.getStorage({
        key: 'essentialInformation',
        success(res) {
          _this.setData({
            readOnlyOptionsData: res.data
          })
        }
      })
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
    let _this = this;
    if (!this.data.readOnly) {
      try {
        var value = wx.getStorageSync('storeChoice')
        if (value) {
          _this.setData({
            optionsData: value,
          })
        } else {
          wx.redirectTo({
            url: '../customerShopChoice/customerShopChoice'
          })
        }
      } catch (e) {}
    }
    this.DeviceInformation();
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
      'equipment_code': this.data.Signal[this.data.SignalIx].EquipmentCode
    }
    $api("GET", "api/single/wx", equipmentCode)
      .then(res => {
        if (res.data.data === null) {
          this.setData({
            signalData: []
          })
        } else {
          let myData = res.data.data
          if (res.data.data.hasOwnProperty('simInfoList')) {
            this.setData({
              signalData: myData.simInfoList
            })
          } else {
            // 06200006
            // 09200001
            let Signal = [{}, {}];
            let element;
            for (const key in myData.card) {
              if(myData.card[key] == ''){
                  myData.card[key]='-'
              }
              if (myData.card.hasOwnProperty(key)) {
                element = myData.card[key];
                if (key.slice(0, 1) == 'M' && myData.card.M_iccid !== '') {
                  Signal[0][key.split('_')[1]] = element
                } else if (key.slice(0, 1) == 'B') {
                  Signal[1][key.split('_')[1]] = element
                }
              }
            }
            Signal.forEach(function (value, index, arr) {
              if (value.iccid === '') {
                arr.splice(index, 1)
              }
            })
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
  },

  // 保存记录
  RecordKeeping() {
    let myData;
    let signalData = this.data.signalData
    let CurrentCardRecords = [];

    signalData.forEach(function (value, index, arr) {
      if (arr.length === 3) {
        CurrentCardRecords.push({
          NetType: value.netType,
          CardName: '卡' + index,
          CardCode: value.iccid,
          Single: value.signal,
        })
      } else {
        CurrentCardRecords.push({
          NetType: value.nettype,
          CardName: '卡' + index,
          CardCode: value.iccid,
          Single: parseInt(value.single),
        })
      }
    })
    if (this.data.readOnly) {
      let optionsData = this.data.readOnlyOptionsData

      myData = {
        EquipmentTypeName:this.data.Signal[this.data.SignalIx].EquipmentTypeName,
        EquipmentCode: this.data.Signal[this.data.SignalIx].EquipmentCode,
        ClientID: app.data.SelectCompanyId,
        CustomerName: optionsData.ClientName,
        Area: optionsData.ShopAreaName,
        ShopCode: optionsData.ShopCode,
        ShopName: optionsData.ShopName,
        CurrentCardRecords: CurrentCardRecords,
      }
    } else {
      let optionsData = this.data.optionsData

      myData = {
        EquipmentTypeName:this.data.Signal[this.data.SignalIx].EquipmentTypeName,
        EquipmentCode: this.data.Signal[this.data.SignalIx].EquipmentCode,
        ClientID: optionsData.CompanyId,
        CustomerName: optionsData.ShopName.split('_')[0],
        Area: optionsData.ShopAreaName,
        ShopCode: optionsData.ShopCode,
        ShopName: optionsData.ShopName.split('_')[1],
        CurrentCardRecords: CurrentCardRecords,
      }
    }

    $api("POST", "api/test/wx", myData)
      .then(res => {
        wx.showToast({
          title: '保存成功',
          icon: 'none',
          duration: 1500
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
        wx.showToast({
          title: '保存失败',
          icon: 'none',
          duration: 1500
        })
      })
  },

  // 设备信息获取
  DeviceInformation() {
    let deviceData;
    if (this.data.readOnly) {
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
    } else {
      deviceData = {
        shop_id: this.data.optionsData.ShopId,
      }
    }
    $api("GET", "api/equipments/shop_id/wx", deviceData)
      .then(res => {
        let data = [];
        if (res.data.data != null) {
          data = res.data.data;
          let SignalData = [];
          let Signal = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].EquipmentTypeName === '4G路由器') {
              SignalData.push(data[i].EquipmentName + '_' + data[i].EquipmentCode)
              Signal.push(data[i])
            }
          }
          this.setData({
            Signal: Signal,
            SignalData: SignalData,
          })
        } else {
          data = []
          this.setData({
            Signal: [],
            SignalData: [],
          })
        }
        this.onSignalNavigateTo();
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

})