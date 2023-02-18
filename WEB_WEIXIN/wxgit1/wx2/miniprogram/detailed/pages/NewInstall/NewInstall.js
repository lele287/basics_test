//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */

  allShops: [],
  data: {
    ShopCode: "",
    EquipmenCode: "",
    currentEquipment: [],
    readOnly: false,
    equipmentMatchThrough: false,
    shopPromptInformation: "",
    equipmentPromptInformation: "",
    optionsData: '',
  },


  // onShopBlur() {
  //   if (this.data.ShopCode.length >= 5) {
  //     this.setData({ shopPromptInformation: "" })
  //     this.matchShop();
  //   } else {
  //     this.setData({ shopPromptInformation: "请输入正确的门店编号" })
  //   }
  // },
  onEquipmenChange(event) {
    this.setData({
      EquipmenCode: event.detail
    })
    if (event.detail.length == 8) {
      this.setData({
        equipmentPromptInformation: ""
      })
      this.matchEquipment();
    } else {
      this.setData({
        equipmentPromptInformation: "请输入正确的设备编号",
        currentEquipment: [],
        equipmentMatchThrough: false
      })
    }
  },

  onSwitch() {
    wx.navigateTo({
      url: '../customerShopChoice/customerShopChoice',
    })
  },

  scanCode: function () {
    let _this = this;
    wx.scanCode({
      success(res) {
        if (res.result.length == 8) {
          _this.setData({
            EquipmenCode: res.result,
            equipmentPromptInformation: ''
          })
          _this.matchEquipment();
        } else {
          wx.showToast({
            title: '请扫描正确的二维码',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  // 设备检索
  matchEquipment() {
    // 调用接口获取api
    let thisData = {
      equipment_code: this.data.EquipmenCode
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
              EquipmenCode: '',
              currentEquipment: '',
              equipmentMatchThrough: false
            })
          } else {
            let myData = res.data.data;
            myData.InstallDate = app.DateFormat(myData.InstallDate)
            for (let key in myData) {
              if (myData[key] == '') {
                myData[key] = '-'
              }
            }
            this.setData({
              currentEquipment: myData,
              equipmentMatchThrough: true
            });
          }

        } else if (res.statusCode == 202) {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          });
          this.setData({
            EquipmenCode: '',
            currentEquipment: '',
            equipmentMatchThrough: false
          })
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 确认提示
  whetherConfirm() {
    if (this.data.equipmentMatchThrough) {
      Dialog.confirm({
          title: '提示信息',
          message: '是否确认添加！',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
    } else {
      wx.showToast({
        title: "请输入正确的设备编号",
        icon: 'none',
        duration: 2000
      });
    }
  },

  // 确认事件
  installEquipment() {
    let _this = this;
    let CodeData = {};
    if (this.data.optionsData.ShopId) {
      CodeData.ShopCode = this.data.optionsData.ShopCode
    } else {
      CodeData.ShopCode = this.data.ShopCode
    }
    CodeData.EquipmentCode = this.data.EquipmenCode
    $api("POST", "api/install/wx", CodeData)
      .then(res => {
        if (res.statusCode === 200) {
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 500
          })
          $api("GET", "api/shops/wx", {
              'page': "1",
              'size': "1",
              'client_id': this.data.optionsData.CompanyId,
              'keyword': this.data.ShopCode,
              'shop_area': "全部",
            })
            .then(res => {
              wx.setStorageSync('essentialInformation', res.data.data.Shops[0])
            })
            .catch(err => {
              //请求失败
              console.log(err);
            })
          setTimeout(function () {
            // wx.navigateBack({
            //   delta: 1
            // })
            wx.navigateTo({
              url: '../ContinueOrSignout/ContinueOrSignout?currentEquipment=' + JSON.stringify(_this.data.currentEquipment) + '&readOnly=' + _this.data.readOnly,
            })
          }, 500);
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
        wx.showToast({
          title: err,
          icon: 'none',
          duration: 3000
        });
      })
  },

  // 重置
  ResetEmpty() {
    if (this.data.readOnly) {
      this.setData({
        EquipmenCode: "",
        currentEquipment: [],
        equipmentMatchThrough: false,
        shopPromptInformation: "",
        equipmentPromptInformation: "",
      })
    } else {
      this.setData({
        EquipmenCode: "",
        ShopCode: "",
        currentEquipment: [],
        // shopMatchThrough: false,
        equipmentMatchThrough: false,
        shopPromptInformation: "",
        equipmentPromptInformation: "",
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
      wx.getStorage({
        key: 'storeChoice',
        success(res) {
          _this.setData({
            optionsData: res.data
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    if (this.data.readOnly) {
      this.setData({
        EquipmenCode: "",
        currentEquipment: [],
        equipmentMatchThrough: false,
        shopPromptInformation: "",
        equipmentPromptInformation: "",
      })
    } else {
      this.setData({
        EquipmenCode: "",
        ShopCode: "",
        currentEquipment: [],
        // shopMatchThrough: false,
        equipmentMatchThrough: false,
        shopPromptInformation: "",
        equipmentPromptInformation: "",
      })
    }
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

})