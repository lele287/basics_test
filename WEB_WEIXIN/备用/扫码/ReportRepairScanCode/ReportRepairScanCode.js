import Toast from '@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 扫码信息
    Report: {},
    // 故障分类
    FaultClassificationData: [],
    FaultClassificationState: false,
    FaultClassificationVal: '',
    FaultClassificationSlide: "",
    FaultClassificationId: [],
    FaultClassificationIndex: 0,
    FaultClassificationIx: '',
    // 标红提示
    Marked: [false],

    EquipmentNumber: '',
    FaultClassification: '',
    TroubleShooting: '',
    describe: '',
    remarks: '',
    DispatchNot: true,
    ServiceProvider: '',
    AssignEngineer: '',
  },

  onDispatch() {
    this.setData({
      DispatchNot: !this.data.DispatchNot
    })
  },
  // 故障分类
  onFaultClassification(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      FaultClassificationSlide: value,
      FaultClassificationIndex: index
    });
    console.log(value);
    console.log(index);
  },
  onFaultClassificationDisplay() {
    this.setData({
      FaultClassificationState: true
    });
  },
  onFaultClassificationBlank() {
    this.setData({
      FaultClassificationState: false
    });
  },
  FaultClassificationYes() {
    // console.log(this.data.FaultClassificationIndex);
    this.setData({
      FaultClassificationState: false
    });
    // 判断是否切换选中项
    // if (this.data.FaultClassificationSlide != this.data.FaultClassificationVal) {
    //   this.setData({
    //     SiteAreaVal: '',
    //     SiteAreaData: ['请预先选择设备分类'],
    //     equipmentNameVal: '',
    //     equipmentNameData: ['请预先选择设备类型'],
    //     equipmentModelVal: '',
    //     equipmentModelData: ['请预先选择设备名称'],
    //   })
    // }
    this.setData({
      FaultClassificationVal: this.data.FaultClassificationSlide
    });
  },
  // 提交
  Submit() {
    // // 提交信息,发送请求
    wx.request({
      url: 'http://netop.sharewis.com:8087/server/api/repairs/manual',
      method: 'POST',
      data: {
        // ClientName: this.data.customerVal,
        // ShopClass: this.data.defaults,
        // ShopType: this.data.SiteStatusVal,
        // ShopAreaName: this.data.SiteAreaVal,
        // ShopName: this.data.SiteName,
        // ShopCode: this.data.SiteNumberVal,
        // InstallTime: time,
        // ProvAndCities: ProvinceAndCityData[0] + ProvinceAndCityData[1],
        // District: ProvinceAndCityData[2],
        // ShopAddressCode: this.data.ProvinceAndCityCode,
        // ShopAddress: this.data.InstallationSite,
        // ClientId: this.data.SiteArea[this.data.SiteAreaIx].StaticOrder,
        // ShopArea: this.data.customerId[this.data.customerIx],
        // CreateByUserID: wx.getStorageSync('userAccount').CreateByUserID,
        RepairType:'',
        ClientID:'',
        ClientName:'',
        ShopID:'',
        ShopCode:'',
        ShopName:'',
        ShopArea:'',
        MaintainerID:'',
        MaintainerName:'',
        EngineerID:'',
        EngineerName:'',
        OperatorID:'',
        OperatorName:'',
        EquipmentCode:'',
        EquipmentModelID:'',
        EquipmentModelName:'',
        ExceptionClassID:'',
        ExceptionClassName:'',
        ExceptionID:'',
        ExceptionName:'',
        ExceptionStation:'',
        Remark:'',
        ListStatus:'',
        //"{"EquipmentCode":"01180001","EquipmentTypeName":"网关路由器","EquipmentName":"深信服MIG","EquipmentModelName":"MIG-1000-A500","InfoTime":"2018-12-04T17:06:25+08:00","MaintenanceAging":3,"ShopCode":"203238","ShopName":"眉州路店"}"
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('mytoken'),
      },
      success(res) {
        console.log(res.data);
        if (res.statusCode == 200) {
          Toast.loading({
            message: '新增站点成功,即将跳转！',
            forbidClick: true,
          });
          setTimeout(function () {
            wx.switchTab({
              url: "/pages/index/index"
            })
          }, 1000);
        } else {
          Toast.fail('提交失败！');
        }
        if (res.data.message == 'invalid or expired jwt' || res.statusCode == 401) {
              wx.showToast({
      title: 'token过期重新请登录!',
      icon: 'none',
      duration: 1500
    })
          wx.removeStorage({
            key: 'mytoken',
            success: function (res) {
              console.log(res)
            }
          })
          wx.removeStorage({
            key: 'userAccount',
            success: function (res) {
              console.log(res)
            }
          })
          setTimeout(function () {
            wx.redirectTo({
              url: "/pages/ReportRepair/ReportRepair"
            })
          }, 2000);
        }
      },
      fail(err) {
        // console.log(err);
        Toast.fail('提交失败！');
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Report: JSON.parse(options.scanCode)
    })
    const _this = this;
    // 客户数据请求
    wx.request({
      url: 'https://netop.sharewis.com:8000/server/api/equipmentClasses/all',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('mytoken'),
      },
      success(res) {
        if (res.data.message == 'invalid or expired jwt' || res.statusCode == 401) {
              wx.showToast({
      title: 'token过期重新请登录!',
      icon: 'none',
      duration: 1500
    })
          wx.removeStorage({
            key: 'mytoken',
            success: function (res) {
              console.log(res)
            }
          })
          wx.removeStorage({
            key: 'userAccount',
            success: function (res) {
              console.log(res)
            }
          })
          setTimeout(function () {
            wx.redirectTo({
              url: "/pages/login/login"
            })
          }, 2000);

        } else {
          console.log(res.data.data);
          let ClientData = [];
          let ClientId = [];
          for (var i = 0; i < res.data.data.length; i++) {
            ClientData.push(res.data.data[i].EquipmentClassName)
            ClientId.push(res.data.data[i].ID)
          }
          _this.setData({
            FaultClassificationData: ClientData,
            FaultClassificationId: ClientId,
            FaultClassificationSlide: ClientData[0],
          })
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