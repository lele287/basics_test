// import Dialog from '../../miniprogram_npm/vant-weapp/dialog/index'
// import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Toast from '@vant/weapp/toast/toast'
import ProvincesRegions from './ProvincesRegions';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eject: false,
    corporateName: '',
    InstallationTime: '',
    show: false,
    showbut: false,
    currentDate: new Date().getTime(),
    currentDateYes: '',
    currentTime: '',
    MinDate: new Date(2020, 0, 1).getTime(),
    maxDate: new Date().getTime()+1000000000000,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    DropDownToSelect: false,
    // 站点类型
    columns: [],
    defaults: '',
    default: '',
    index: 0,
    name_index: 0,
    // 客户
    customerData: [],
    customerState: false,
    customerVal: '',
    customerSlide: '',
    customerId: [],
    customerIndex: 0,
    customerIx: 0,
    // 站点状态
    SiteStatusData: [],
    SiteStatusState: false,
    SiteStatusVal: '',
    SiteStatusSlide: '',
    // 站点区域
    SiteArea: '',
    SiteAreaData: ['请预先选择客户'],
    SiteAreaState: false,
    SiteAreaVal: '',
    SiteAreaSlide: '',
    SiteAreaId: '',
    SiteAreaIndex: '',
    SiteAreaIx: '',
    // 站点名称
    SiteName: '',
    // 站点编号
    SiteNumberVal: '',
    // 详细地址
    InstallationSite: '',
    // 三级结联
    areaList: ProvincesRegions.data,
    ProvinceAndCityState: false,
    ProvinceAndCityVal: '',
    ProvinceAndCitySlide: [{
      code: "110000",
      name: "北京市"
    }, {
      code: "110100",
      name: "北京市"
    }, {
      code: "110101",
      name: "东城区"
    }],
    ProvinceAndCityCode: '',
    // 标红提示
    Marked: [false, false, false, false, false, false, false, false, false]
  },

  getUserInfo(event) {
    console.log(event.detail);
  },
  ejectNo(event) {
    console.log(event.detail);
  },
  oneject() {
    this.setData({
      eject: true
    });
  },
  onClose() {
    this.setData({
      eject: false
    });
  },

  // 点击提交信息事件
  tan() {
    let MarkedData = this.data.Marked;
    for (let i = 0; i < this.data.Marked.length; i++) {
      MarkedData[i] = false;
      this.setData({
        Marked: MarkedData
      });
    }
    if (this.data.defaults && this.data.currentDateYes && this.data.SiteName && this.data.InstallationSite && this.data.SiteNumberVal && this.data.SiteAreaVal && this.data.SiteStatusVal && this.data.customerVal && this.data.ProvinceAndCityVal) {
      this.setData({
        show: true
      });
    } else {
      Toast('您还有待填写的选项,请填写完毕再进行提交,再进行提交!');
      if (!this.data.defaults) {
        // Toast('请输入站点类型');
        MarkedData[0] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.customerVal) {
        // Toast('请输入客户');
        MarkedData[1] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.SiteStatusVal) {
        // Toast('请输入站点状态');
        MarkedData[2] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.SiteAreaVal) {
        // Toast('请输入站点区域');
        MarkedData[3] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.currentDateYes) {
        // Toast('请输入安装时间');
        MarkedData[4] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.ProvinceAndCityVal) {
        // Toast('请输入省市区信息');
        MarkedData[5] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.InstallationSite) {
        // Toast('请输入详细地址');
        MarkedData[6] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.SiteName) {
        // Toast('请输入站点名称');
        MarkedData[7] = true;
        this.setData({
          Marked: MarkedData
        });
      }
      if (!this.data.SiteNumberVal) {
        // Toast('请输入站点编号');
        MarkedData[8] = true;
        this.setData({
          Marked: MarkedData
        });
      }
    }
  },
  // 点击确定,跳转提示,2秒后跳转
  getUserInfo(event) {
    let ProvinceAndCityData = this.data.ProvinceAndCityVal.split('-')

    let time = new Date(this.data.currentTime + 8 * 60 * 60 * 1000);
    // // 提交信息,发送请求
    wx.request({
      url: app.data.url + 'api/shops/wx',
      method: 'POST',
      data: {
        ClientName: this.data.customerVal,
        ShopClass: this.data.defaults,
        ShopType: this.data.SiteStatusVal,
        ShopAreaName: this.data.SiteAreaVal,
        ShopName: this.data.SiteName,
        ShopCode: this.data.SiteNumberVal,
        InstallTime: time,
        ProvAndCities: ProvinceAndCityData[0] + ProvinceAndCityData[1],
        District: ProvinceAndCityData[2],
        ShopAddressCode: this.data.ProvinceAndCityCode,
        ShopAddress: this.data.InstallationSite,
        ShopArea: this.data.SiteArea[this.data.SiteAreaIx].StaticOrder,
        ClientId: this.data.customerId[this.data.customerIx],
        CreateByUserID: wx.getStorageSync('userAccount').CreateByUserID,
      },
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          wx.showToast({
            title: '新增站点成功,即将跳转！',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 2000);
        } else {
          Toast.fail('提交失败！');
        }
      },
      fail(err) {
        console.log(err);
        Toast.fail('提交失败！');
      }
    })
  },

  // 安装日期
  onClose() {
    this.setData({
      show: false
    });
  },
  onCloseButDate() {
    this.setData({
      showbut: false
    });
  },
  showPopup() {
    this.setData({
      showbut: true
    });
  },
  shijianc(num) {
    var date = new Date(num)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
    // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  TimeSelectionYes() {
    this.setData({
      showbut: false
    });
    this.setData({
      currentDateYes: this.shijianc(this.data.currentDate),
      currentTime: this.data.currentDate,
    });
  },
  TimeSelectionNo() {
    this.setData({
      showbut: false
    });
  },


  // 站点类型
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      default: value,
      index: index
    });
  },
  DropDown() {
    this.setData({
      DropDownToSelect: true
    });
  },
  onCloseBut() {
    this.setData({
      DropDownToSelect: false
    });
  },
  corporateNameYes() {
    this.setData({
      DropDownToSelect: false
    });
    this.setData({
      defaults: this.data.default
    });
  },
  corporateNameNo() {
    this.setData({
      DropDownToSelect: false
    });
  },
  // 客户
  onCustomer(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      customerSlide: value,
      customerIndex: index
    });
  },
  onCustomerDisplay() {
    this.setData({
      customerState: true
    });
  },
  onCustomerBlank() {
    this.setData({
      customerState: false
    });
  },
  customerYes() {
    const _this = this;
    wx.request({
      url: app.data.url + 'api/statics/region/' + this.data.customerId[this.data.customerIndex],
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          _this.setData({
            SiteAreaVal: '',
            customerIx: _this.data.customerIndex
          })
          if (res.data.data) {
            let SiteData = [];
            let SiteId = [];
            for (var i = 0; i < res.data.data.length; i++) {
              SiteData.push(res.data.data[i].StaticInfo)
              SiteId.push(res.data.data[i].StaticOrder)
            }
            _this.setData({
              SiteAreaData: SiteData,
              SiteAreaId: SiteId,
              SiteAreaSlide: SiteData[0],
              SiteAreaIndex: 0,
              SiteArea: res.data.data
            })
          } else {
            _this.setData({
              SiteAreaData: [],
              SiteAreaId: '',
              SiteAreaSlide: '',
              SiteAreaIndex: 0,
              SiteArea: ''
            })
          }
        }
      }
    })

    this.setData({
      customerState: false
    });
    this.setData({
      customerVal: this.data.customerSlide
    });
  },
  customerNo() {
    this.setData({
      customerState: false
    });
  },
  // 站点状态
  onSiteStatus(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      SiteStatusSlide: value,
      index: index
    });
  },
  onSiteStatusDisplay() {
    this.setData({
      SiteStatusState: true
    });
  },
  onSiteStatusBlank() {
    this.setData({
      SiteStatusState: false
    });
  },
  SiteStatusYes() {
    this.setData({
      SiteStatusState: false
    });
    this.setData({
      SiteStatusVal: this.data.SiteStatusSlide
    });
  },
  SiteStatusNo() {
    this.setData({
      SiteStatusState: false
    });
  },
  // 站点区域
  onSiteArea(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      SiteAreaSlide: value,
      SiteAreaIndex: index
    });
  },
  onSiteAreaDisplay() {
    if (this.data.SiteAreaData.length == 0) {
      this.setData({ SiteAreaData: ["暂无数据"] })
    }
    this.setData({
      SiteAreaState: true
    });
  },
  onSiteAreaBlank() {
    this.setData({
      SiteAreaState: false
    });
  },
  SiteAreaYes() {
    this.setData({
      SiteAreaState: false
    });
    if (this.data.customerVal != "") {
      this.setData({
        SiteAreaVal: this.data.SiteAreaSlide,
        SiteAreaIx: this.data.SiteAreaIndex,
      });
    }
  },
  SiteAreaNo() {
    this.setData({
      SiteAreaState: false
    });
  },

  // 站点名称
  onSite(e) {
    this.setData({
      SiteName: e.detail
    })
  },
  // 站点编号
  onSiteNumber(e) {
    this.setData({
      SiteNumberVal: e.detail
    })
  },
  // 详细地址
  onInstall(e) {
    this.setData({
      InstallationSite: e.detail
    })
  },

  // 省市区
  onProvinceAndCityDisplay() {
    this.setData({
      ProvinceAndCityState: true
    });
  },
  onProvinceAndCityBlank() {
    this.setData({
      ProvinceAndCityState: false
    });
  },
  // 弹出式
  onProvinceAndCity(e) {
    this.setData({
      ProvinceAndCitySlide: e.detail.values
    });
  },
  ProvinceAndCityDialogYes() {
    let ProvinceAndCity = this.data.ProvinceAndCitySlide
    this.setData({
      ProvinceAndCityState: false
    });
    this.setData({
      ProvinceAndCityVal: ProvinceAndCity[0].name + '-' + ProvinceAndCity[1].name + '-' + ProvinceAndCity[2].name,
      ProvinceAndCityCode: ProvinceAndCity[0].code + '|' + ProvinceAndCity[1].code + '|' + ProvinceAndCity[2].code
    });
  },
  // 下拉式
  ProvinceAndCityYes(e) {
    let ProvinceAndCity = e.detail.values
    this.setData({
      ProvinceAndCityState: false
    });
    this.setData({
      ProvinceAndCityVal: ProvinceAndCity[0].name + '-' + ProvinceAndCity[1].name + '-' + ProvinceAndCity[2].name,
      ProvinceAndCityCode: ProvinceAndCity[0].code + '|' + ProvinceAndCity[1].code + '|' + ProvinceAndCity[2].code
    });
  },
  ProvinceAndCityNo() {
    this.setData({
      ProvinceAndCityState: false
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.Initial == "true") {
      let essential = wx.getStorageSync('essentialInformation');
      this.setData({ customerVal: essential.CompCnName, customerData: [essential.CompCnName], customerSlide: essential.CompCnName, customerId: [essential.Id] })
      this.customerYes();
    } else {
      // 客户
      this.CustomerData();
    }

    // 站点状态
    this.SiteStatusData();
    // 站点类型
    this.SiteTypeData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 数据默认项
    this.setData({
      currentDateYes: this.shijianc(this.data.currentDate),
      currentTime: this.data.currentDate,
    });
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

  // 客户数据请求
  CustomerData() {
    const _this = this;
    wx.request({
      url: app.data.url + 'api/clients',
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        if(res.data.data===null){
          return;
        }
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          let ClientData = [];
          let ClientId = _this.data.customerId;
          for (var i = 0; i < res.data.data.length; i++) {
            ClientData.push(res.data.data[i].ClientName)
            ClientId.push(res.data.data[i].Id)
          }
          _this.setData({
            customerData: ClientData,
            customerId: ClientId
          })
          _this.setData({
            // customerVal: ClientData[0],
            customerSlide: ClientData[0],
          });
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  // 站点状态,数据请求
  SiteStatusData() {
    const _this = this;
    wx.request({
      url: app.data.url + 'api/statics/SHOPTYPE',
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          let infoData = [];
          for (var i = 0; i < res.data.data.length; i++) {
            if(res.data.data[i].StaticInfo==='新开店'){
              infoData.splice(0, 0, res.data.data[i].StaticInfo);
            }else{
              infoData.push(res.data.data[i].StaticInfo)
            }
          }
          _this.setData({
            SiteStatusData: infoData
          })
          _this.setData({
            SiteStatusVal: infoData[0],
            SiteStatusSlide: infoData[0],
          });
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },

  // 站点类型,数据请求
  SiteTypeData() {
    const _this = this;
    wx.request({
      url: app.data.url + 'api/statics/SHOPCLASS',
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          let infoData = [];
          for (var i = 0; i < res.data.data.length; i++) {
            infoData.push(res.data.data[i].StaticInfo)
          }
          _this.setData({
            columns: infoData
          })
          _this.setData({
            defaults: infoData[0],
            default: infoData[0],
          });
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  }
})