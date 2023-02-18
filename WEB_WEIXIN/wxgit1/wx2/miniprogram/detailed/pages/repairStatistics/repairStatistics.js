//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
Page({

  /**
   * 页面的初始数据
   */
  // page: 1,
  // size: 20,
  data: {
    // 加载中
    Loading: false,
    listData: [],
    radio: '',
    dropDown: false,
    Total: "",

    // 公司
    Company: [],
    CompanyData: [],
    CompanyState: false,
    CompanySlide: '',
    CompanyName: '',
    CompanyIndex: 0,
    CompanyIx: 0,
    CompanyId: '',
    CompanyCancel: 0,

    // 工程师
    Engineer: [],
    EngineerData: [],
    EngineerState: false,
    EngineerSlide: '',
    EngineerName: '',
    EngineerIndex: 0,
    EngineerIx: 0,
    EngineerId: '',
    // 服务商
    ServiceProvider: [],
    ServiceProviderData: [],
    ServiceProviderState: false,
    ServiceProviderSlide: '',
    ServiceProviderName: '',
    ServiceProviderIndex: 0,
    ServiceProviderIx: 0,
    ServiceProviderId: '',

    StatisticsType: '',
  },

  // 公司
  onCompany(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      CompanySlide: value,
      CompanyIndex: index
    });
  },
  onCompanyShow() {
    this.setData({
      CompanyState: true,
      CompanyCancel: this.data.CompanyCancel+1,
      CompanySlide: this.data.CompanyData[0]
    });
  },
  onCompanyHide() {
    console.log(this.data.CompanyCancel);
    if (this.data.CompanyCancel<=1) {
      this.setData({
        CompanyState: false
      });
      wx.navigateBack({
        delta: 1
      })
    }
  },
  CompanyYes() {
    this.setData({
      CompanyIx: this.data.CompanyIndex,
      CompanyName: this.data.CompanySlide,
      // 门店数据绑定
      CompanyId: this.data.Company[this.data.CompanyIndex].Id,
    })

    // 更改题头
    wx.setNavigationBarTitle({
      title: this.data.CompanyName + "_" + this.data.StatisticsType + '统计'
    })
    this.CustomerData();
  },

  // 工程师
  onEngineer(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      EngineerSlide: value,
      EngineerIndex: index
    });
  },
  onEngineerShow() {
    this.setData({
      EngineerState: true,
      EngineerSlide: this.data.EngineerData[0]
    });
  },
  onEngineerHide() {
    this.setData({
      EngineerState: false
    });
    wx.navigateBack({
      delta: 1
    })
  },
  EngineerYes() {
    this.setData({
      EngineerIx: this.data.EngineerIndex,
      EngineerName: this.data.EngineerSlide,
      // 门店数据绑定
      EngineerId: this.data.Engineer[this.data.EngineerIndex].ID,
    })

    // 更改题头
    wx.setNavigationBarTitle({
      title: this.data.EngineerName + "_" + this.data.StatisticsType + '统计'
    })
    this.CustomerData();
  },

  // 服务商
  onServiceProvider(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      ServiceProviderSlide: value,
      ServiceProviderIndex: index
    });
  },
  onServiceProviderShow() {
    this.setData({
      ServiceProviderState: true,
      ServiceProviderSlide: this.data.ServiceProviderData[0]
    });
  },
  onServiceProviderHide() {
    this.setData({
      ServiceProviderState: false
    });
    wx.navigateBack({
      delta: 1
    })
  },
  ServiceProviderYes() {
    this.setData({
      ServiceProviderIx: this.data.ServiceProviderIndex,
      ServiceProviderName: this.data.ServiceProviderSlide,
      // 门店数据绑定
      ServiceProviderId: this.data.ServiceProvider[this.data.ServiceProviderIndex].Id,
    })

    // 更改题头
    wx.setNavigationBarTitle({
      title: this.data.ServiceProviderName + "_" + this.data.StatisticsType + '统计'
    })
    this.CustomerData();
  },

  onChange(event) {
    this.setData({
      radio: event.detail,
    });
  },

  onQuery() {
    this.CustomerData();
  },
  onReset() {
    this.setData({
      radio: '',
    })
    if (this.data.StatisticsType === "工程师") {
      this.setData({
        ServiceProvider: [],
        ServiceProviderData: [],
        ServiceProviderState: false,
        ServiceProviderSlide: '',
        ServiceProviderName: '',
        ServiceProviderIndex: 0,
        ServiceProviderIx: 0,
        ServiceProviderId: '',
      })
      this.ServiceProviderQuery();
    } else if (this.data.StatisticsType === "客户") {
      this.setData({
        Company: [],
        CompanyData: [],
        CompanyState: false,
        CompanySlide: '',
        CompanyName: '',
        CompanyIndex: 0,
        CompanyIx: 0,
        CompanyId: '',
      })
      this.CustomerQuery(false);
    }
    this.CustomerData();
  },

  onDropDown() {
    this.setData({
      dropDown: !this.data.dropDown
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    if (options.hasOwnProperty('StatisticsType')) {
      this.setData({
        StatisticsType: options.StatisticsType
      })
      // 更改题头
      wx.setNavigationBarTitle({
        title: this.data.StatisticsType + '统计'
      })
      if (options.StatisticsType === "客户") {
        this.CustomerQuery(true);
      } else if (options.StatisticsType === "工程师") {
        this.EngineerQuery();
        this.ServiceProviderQuery();
      }
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
    // this.size += 20;
    // this.CustomerData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 客户查询
  CustomerQuery(whetherPopup) {
    $api("GET", "api/clients")
      .then(res => {
        if (res.data.data !== null) {
          let Company = [{
            ClientEmail: "",
            ClientEnName: "",
            ClientImage: "",
            ClientIp: "",
            ClientName: "",
            ClientState: "",
            Id: '',
          }, ...res.data.data];
          let ClientData = ["全部"];
          for (var i = 0; i < res.data.data.length; i++) {
            ClientData.push(res.data.data[i].ClientName)
          }
          this.setData({
            CompanyData: ClientData,
            Company: Company,
            CompanySlide: ClientData[0],
          })
        }
        if (whetherPopup) {
          this.onCompanyShow();
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 工程师查询
  EngineerQuery() {
    $api("GET", "api/engineers/all")
      .then(res => {
        if (res.data.data !== null) {
          let Engineer = [{
            EngineerName: "",
            ID: ""
          }, ...res.data.data];
          let EngineerData = ["全部"];
          for (var i = 0; i < res.data.data.length; i++) {
            EngineerData.push(res.data.data[i].EngineerName)
          }
          this.setData({
            EngineerData: EngineerData,
            Engineer: Engineer,
            EngineerSlide: EngineerData[0],
          })
        }
        this.onEngineerShow();
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },


  // 服务商数据
  ServiceProviderQuery() {
    $api("GET", "api/partners", {
        keyword: ''
      })
      .then(res => {
        let ServiceProviderData = ["全部"];
        let ServiceProvider = [{
          PartnerName: "",
          Id: ""
        }, ...res.data.data];
        for (var i = 0; i < res.data.data.length; i++) {
          ServiceProviderData.push(res.data.data[i].PartnerName)
        }
        this.setData({
          ServiceProviderData: ServiceProviderData,
          ServiceProvider: ServiceProvider,
          ServiceProviderSlide: ServiceProviderData[0],
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 客户数据
  CustomerData() {
    // GET api/maintain_lists/vital/client?keyword=&client_id=null&pointDate=&startDate=&endDate=&isByMonth=否&isByWeek=否
    var myData;
    var url;
    if (this.data.StatisticsType === "客户") {
      myData = {
        keyword: "",
        client_id: this.data.CompanyId,
        pointDate: "",
        startDate: "",
        endDate: "",
        isByMonth: "否",
        isByWeek: "否",
        isAll:"否"
      }
      url = "api/maintain_lists/vital/client";
    } else if (this.data.StatisticsType === "工程师") {
      myData = {
        keyword: "",
        engineer_id: this.data.EngineerId,
        maintainer_id: this.data.ServiceProviderId,
        pointDate: "",
        startDate: "",
        endDate: "",
        isByMonth: "否",
        isByWeek: "否",
        isAll:"否"
      }
      url = "api/maintain_lists/vital/engineer";
    }
    if (this.data.radio === "上月") {
      myData.isByMonth = "是"
    } else if (this.data.radio === "近七日") {
      myData.isByWeek = "是"
    } else if (this.data.radio === "全部") {
      myData.isAll = "是"
    }
    $api("GET", url, myData)
      .then(res => {
        // Total
        if (this.data.StatisticsType === "客户") {
          this.setData({
            listData: res.data.data.ClientVitalUints
          })
        } else if (this.data.StatisticsType === "工程师") {
          this.setData({
            listData: res.data.data.EngineerVitalUints
          })
        }
        this.setData({
          Total: res.data.data.Total
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})