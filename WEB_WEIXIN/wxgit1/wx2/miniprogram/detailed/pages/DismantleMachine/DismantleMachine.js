//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
// import Dialog from '../../../node_modules/@vant/weapp/dist/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  EquipmentCode: '',
  clickIndex: 0,
  data: {
    EquipmentNumber: [],
    ShopCode: "",
    shopPromptInformation: "",
    whole: false,
    optionsData: '',
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

  WholeDismantle() {
    if(this.data.EquipmentNumber.length!==0){
      this.setData({
        whole: true
      })
      Dialog.confirm({
        title: '提示信息',
        message: '是否确认删除！',
      })
    }
  },

  // 确认提示
  whetherConfirm(e) {
    this.clickIndex = e.target.dataset.index;
    this.EquipmentCode = e.target.dataset.code;
    this.setData({
      whole: false
    })
    Dialog.confirm({
        title: '提示信息',
        message: '是否确认删除！',
      })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },

  // 确定事件
  ReplacementEquipment() {
    if (this.data.whole) {
      for (let i = 0; i < this.data.EquipmentNumber.length; i++) {
        let CodeData = {};
        if (this.data.optionsData.ShopId) {
          CodeData.ShopCode = this.data.optionsData.ShopCode
        } else {
          CodeData.ShopCode = this.data.ShopCode
        }
        CodeData.EquipmentCode = this.data.EquipmentNumber[i].EquipmentCode,
          $api("POST", "api/dismantle/wx", CodeData)
          .then(res => {
            if (res.statusCode == 200) {
              this.setData({
                EquipmentNumber: []
              })
              wx.showToast({
                title: '拆除成功',
                icon: 'success',
                duration: 1000
              })
            } else {
              wx.showToast({
                title: '拆除失败',
                icon: 'none',
                duration: 1000
              });
            }
          })
          .catch(err => {
            //请求失败
            console.log(err);
          })
      }
    } else {
      let CodeData = {};
      if (this.data.optionsData.ShopId) {
        CodeData.ShopCode = this.data.optionsData.ShopCode
      } else {
        CodeData.ShopCode = this.data.ShopCode
      }
      CodeData.EquipmentCode = this.EquipmentCode;
      $api("POST", "api/dismantle/wx", CodeData)
        .then(res => {
          if (res.statusCode == 200) {
            let EquipmentNumber = this.data.EquipmentNumber
            EquipmentNumber.splice(this.clickIndex, 1)
            this.setData({
              EquipmentNumber: EquipmentNumber
            })
            wx.showToast({
              title: '拆除成功',
              icon: 'success',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '拆除失败',
              icon: 'none',
              duration: 1000
            });
          }
        })
        .catch(err => {
          //请求失败
          console.log(err);
        })
    }
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
    if (!this.data.readOnly) {
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
        } else {
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

})