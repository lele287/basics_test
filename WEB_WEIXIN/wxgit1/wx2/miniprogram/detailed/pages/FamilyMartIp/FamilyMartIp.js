//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
Page({

  /**
   * 页面的初始数据
   */
  page: 1,
  size: 20,
  data: {
    // 加载中
    Loading: false,
    listData: [],
    regionData: [{
      value: '全部',
      state: true
    }, ],
    dropDown: false,
    Keyword: '',
    Status: '',
    OfflineCount: 0, //离线
    OnlineCount: 0, //在线

    // 公司
    Company: [],
    CompanyData: [],
    CompanyState: false,
    companyName: '',
    CompanySlide: '',
    CompanyIndex: 0,
    CompanyIx: 0,
    CompanyId: '',
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
      CompanySlide: this.data.CompanyData[0]
    });
  },
  onCompanyHide() {
    this.setData({
      CompanyState: false
    });
    wx.navigateBack({
      delta: 1
    })
  },
  CompanyYes() {

    this.setData({
      CompanyIx: this.data.CompanyIndex,
      companyName: this.data.CompanySlide,
      // 门店数据绑定
      CompanyId: this.data.Company[this.data.CompanyIndex].Id,
    })

    // this.setData({
    //   CompanyIx: this.data.CompanyIndex,
    //   companyName: this.data.CompanySlide,
    // })
    if (this.data.companyName == '上海福满家') {
      this.setData({
        companyName: '全家'
      })
    } else if (this.data.companyName == '集享贝瑞') {
      this.setData({
        companyName: '贝瑞'
      })
    }
    // 更改题头
    wx.setNavigationBarTitle({
      title: this.data.companyName + 'IP查询'
    })
    this.IpQueryRegion();
  },


  onSearchBlur() {
    if (this.data.CompanyId) {
      this.AllShops();
    } else {
      wx.showToast({
        title: '请选择公司',
        icon: 'none',
        duration: 1500
      });
    }
  },

  onDropDown() {
    this.setData({
      dropDown: !this.data.dropDown
    })
  },

  onChangeSelect(e) {
    let index = e.currentTarget.dataset.index;
    let regionData = this.data.regionData;
    let wholeState = regionData[0].state

    if (index === 0) {
      // 全选操作
      regionData.forEach(function (value, index, array) {
        value.state = !wholeState
      });
      this.setData({
        regionData: regionData
      })
    } else {
      // 非全选
      regionData[index].state = !regionData[index].state
      this.setData({
        regionData: regionData,
      });

      // if (wholeState == true && regionData[index].state == true) {
      if (wholeState == true) {
        // 全选勾选时
        regionData[0].state = false
        this.setData({
          regionData: regionData,
        });
      } else {
        // 全选未勾选时
        // 非全选的选中状态
        let Check = true;
        for (let i = 1; i < regionData.length; i++) {
          if (regionData[i].state == false) {
            Check = false;
            break;
          }
        }
        if (Check) {
          regionData.forEach(function (value, index, array) {
            value.state = true
          });
          this.setData({
            regionData: regionData
          })
        }
      }
    }
  },

  onQuery() {
    this.IpQueryData();
  },

  onQueryClear() {
    this.page = 1;
    this.size = 20;
    this.setData({
      listData: [],
      regionData: [{
        value: '全部',
        state: true
      }, ],
      dropDown: false,
      Keyword: '',
      Status: ''
    })
    this.IpQueryRegion();
  },

  onStateSwitch(e) {
    if (e.currentTarget.dataset.status == this.data.Status) {
      this.setData({
        Status: ''
      });
    } else {
      this.setData({
        Status: e.currentTarget.dataset.status
      });
    }
    this.IpQueryData();
  },

  onDetailsIp(e) {
    e.currentTarget.dataset.item.companyName = this.data.companyName;
    wx.navigateTo({
      url: '../../../detailed/pages/DetailsIp/DetailsIp?DetailsIp=' + JSON.stringify(e.currentTarget.dataset.item),
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.hasOwnProperty('companyName')) {
      this.setData({
        companyName: options.companyName,
        CompanyId:JSON.parse(options.Id)
      })
      // 更改题头
      wx.setNavigationBarTitle({
        title: this.data.companyName + 'IP查询'
      })
      this.IpQueryRegion();
    } else {
      // this.onCompanyShow();
      this.CustomerData();
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
    this.size += 20;
    this.IpQueryData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 客户数据请求
  CustomerData() {
    $api("GET", "api/clients")
      .then(res => {
        if (res.data.data !== null) {
          let ClientData = [];
          for (var i = 0; i < res.data.data.length; i++) {
            ClientData.push(res.data.data[i].ClientName)
          }
          this.setData({
            CompanyData: ClientData,
            Company: res.data.data,
            CompanySlide: ClientData[0],
          })
        }
        this.onCompanyShow();
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },


  // IP查询 区域
  IpQueryRegion() {
    let areasData = {
      "client_name": this.data.companyName,
      "client_id":this.data.CompanyId
    }
    $api("GET", "api/ip/areas/wx", areasData)
      .then(res => {
        let Data = res.data.data || [];
        if(Data.length===0){
          this.setData({
            regionData: [],
            listData: [],
          })
          return;
        }
        let regionData = this.data.regionData;
        Data.forEach(function (value, index, array) {
          regionData.push({
            value: value,
            state: true
          })
        });
        this.setData({
          regionData: regionData
        })
        this.IpQueryData();
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
  // IP查询 数据
  IpQueryData() {
    this.setData({
      Loading: true
    })
    let regionDataState = this.data.regionData
    let regionData = [];
    for (let i = 1; i < regionDataState.length; i++) {
      if (regionDataState[i].state == true) {
        regionData.push(regionDataState[i].value)
      }
    }

    let Data = {
      "Page": this.page,
      "Size": this.size,
      "Keyword": this.data.Keyword,
      "ClientName": this.data.companyName,
      "ClientId": this.data.CompanyId,
      "ShopAreas": regionData,
      "Status": this.data.Status
    }
    $api("POST", "api/ip/wx", Data)
      .then(res => {
        let myData = res.data.data.Data
        if (myData !== null) {
          this.setData({
            OfflineCount: res.data.data.OfflineCount,
            OnlineCount: res.data.data.OnlineCount
          })

          myData.forEach(function (value) {
            value.ShopNames = value.ShopName.slice(0, 3) + '..'
            if (value.hasOwnProperty("NetType") && value.NetType !== '') {
              // if(value.NetType.slice(0,2)=='4G'){
              //   value.NetType=value.NetType.slice(0,2)
              // }
              value.NetTypes = value.NetType.slice(0, 1) + '..'
            } else {
              value.NetType = '-';
            }
          })
          this.setData({
            listData: myData
          })
        } else {
          this.setData({
            listData: []
          })
        }
        this.setData({
          Loading: false
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})