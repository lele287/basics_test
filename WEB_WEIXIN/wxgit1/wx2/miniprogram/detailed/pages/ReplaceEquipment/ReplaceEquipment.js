//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
// import Dialog from '/node_modules/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    readOnly:false,
    EquipmentNumber: [],
    currentNumber: '',
    newNumber: '',
    ShopCode: "",
    shopPromptInformation: "",
    equipmentMatchThrough: false,
    equipmentPromptInformation: "",
    optionsData: '',
  },

  displayHide(e) {
    this.setData({
      currentNumber: e.currentTarget.dataset.number
    })
    this.setData({
      show: true
    })
  },
  Hide() {
    this.setData({
      show: false
    })
  },
  scanCode: function () {
    let _this = this;
    wx.scanCode({
      success(res) {
        if (res.result.length == 8) {
          _this.setData({
            newNumber: res.result,
            equipmentPromptInformation: "",
          })
          _this.matchEquipment();
        } else {
          wx.showToast({
            title: '请扫描正确的二维码',
            icon: 'none',
            duration: 3000
          });
        }
      }
    })
  },

  // onShopBlur() {
  //   if (this.data.ShopCode.length >= 5) {
  //     this.setData({ shopPromptInformation: "" })
  //     this.matchShop();
  //   } else {
  //     this.setData({ shopPromptInformation: "请输入准确的门店编号" })
  //   }
  // },
  onSwitch() {
    wx.navigateTo({
      url: '../customerShopChoice/customerShopChoice',
    })
  },

  onEquipmenChange(event) {
    this.setData({
      newNumber: event.detail
    })
    if (event.detail.length == 8) {
      this.setData({
        equipmentPromptInformation: ""
      })
      this.matchEquipment();
    } else {
      this.setData({
        equipmentPromptInformation: "请输入正确的设备编号",
        equipmentMatchThrough: false
      })
    }
  },

  // 确认提示
  whetherConfirm() {
    if (this.data.equipmentMatchThrough) {
      Dialog.confirm({
          title: '提示信息',
          message: '是否确认更改信息！',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    } else {
      wx.showToast({
        title: '请输入正确的设备编号',
        icon: 'none',
        duration: 3000
      });
    }
  },

  // 确定事件
  ReplacementEquipment() {
    let CodeData;
    if (this.data.optionsData.ShopId) {
      CodeData = {
        ShopCode: this.data.optionsData.ShopCode,
        OldEquipmentCode: this.data.currentNumber,
        NewEquipmentCode: this.data.newNumber
      }
    } else {
      CodeData = {
        ShopCode: this.data.ShopCode,
        OldEquipmentCode: this.data.currentNumber,
        NewEquipmentCode: this.data.newNumber
      }
    }

    $api("POST", "api/replace/wx", CodeData)
      .then(res => {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '更换成功',
            icon: 'success',
            duration: 1000
          })
          this.setData({
            equipmentMatchThrough: false,
            newNumber: '',
            show: false,
            currentNumber:''
          })
          this.DeviceInformation()
        } else {
          wx.showToast({
            title: '更换设备失败',
            icon: 'none',
            duration: 3000
          });
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
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
        ShopCode: options.Code,
        readOnly: true,
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
    app.data.equipment = ''
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
    if (this.data.optionsData.ShopId) {
      deviceData = {
        shop_id: this.data.optionsData.ShopId
      }
    } else {
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
    }

    $api("GET", "api/equipments/shop_id/wx", deviceData)
      .then(res => {
        if (res.data.data != null) {
          this.setData({
            EquipmentNumber: res.data.data
          })
        }else{
          this.setData({
            EquipmentNumber: ''
          })
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 设备检索
  matchEquipment() {
    let thisData = {
      equipment_code: this.data.newNumber
    }
    $api("GET", `api/equipments/equipment_code/wx`, thisData)
      .then(res => {

        if (res.statusCode == 200) {
          if (res.data.data == null) {
            wx.showToast({
              title: '不存在当前设备',
              icon: 'none',
              duration: 3000
            });
            this.setData({
              newNumber: '',
              equipmentMatchThrough: false
            })
          } else {
            this.setData({
              equipmentMatchThrough: true
            });
          }

        } else if (res.statusCode == 202) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 3000
          });
          this.setData({
            newNumber: '',
            equipmentMatchThrough: false
          })
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})