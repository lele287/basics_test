//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
Page({

  /**
   * 页面的初始数据
   */
  ShopSize: 10,
  url: "",
  data: {
    keyword: "",
    // 公司
    Company: [],
    CompanyData: [],
    CompanyState: false,
    CompanyVal: '',
    CompanySlide: '',
    CompanyIndex: 0,
    CompanyIx: 0,
    CompanyId: '',
    // myDefaultIndex: 0,
    // 客户
    ShopData: '',
    shopLoading: false,
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
      CompanyState: true
    });
  },
  onCompanyHide() {
    this.setData({
      CompanyState: false
    });
  },
  CompanyYes() {
    this.setData({
      CompanyIx: this.data.CompanyIndex,
      CompanyVal: this.data.CompanySlide,
      // 门店数据绑定
      CompanyId: this.data.Company[this.data.CompanyIndex].Id,
    })
    this.AllShops();
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

  detailsStore(e) {
    let data = e.currentTarget.dataset.storechoice
    // wx.navigateTo({
    //   url: `${this.url}?CompanyId=${this.data.CompanyId}&ShopCode=${data.ShopCode}&ShopId=${data.Id}`
    // })
    if (this.url == '') {
      wx.navigateBack({
        delta: 1
      })
    } else {
      wx.navigateTo({
        url: `${this.url}`
      })
    }
    try {
      wx.setStorageSync('storeChoice', {
        CompanyId: this.data.CompanyId,
        ShopCode: data.ShopCode,
        ShopId: data.Id,
        ShopAreaName: data.ShopAreaName,
        ShopName: this.data.CompanyVal + '_' + data.ShopName
      })
    } catch (e) {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.url) {
      try {
        var value = wx.getStorageSync('storeChoice')
        if (value) {
          wx.redirectTo({
            url: options.url
          })
        } else {
          this.url = options.url;
          this.CustomerData();
        }
      } catch (e) {
        // Do something when catch error
        console.log(e);
      }
    } else {
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
    this.ShopSize += 10
    this.AllShops();
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


          let storeChoiceValue = wx.getStorageSync('storeChoice')
          if (storeChoiceValue) {
            this.setData({
              CompanyVal: storeChoiceValue.ShopName.split('_')[0],
              CompanyId: storeChoiceValue.CompanyId,
            })
            // let myCompanyIndex = this.data.Company.findIndex((value) => value.ClientName == this.data.CompanyVal)
            // if (myCompanyIndex >= 0) {
            //   this.setData({
            //     myDefaultIndex: myCompanyIndex
            //   })
            //   const picker = this.selectComponent('.picker1') //获取组件实例
            //   picker.setIndexes([myCompanyIndex]) //setIndexes()中的参数是一个数组
            // }
            this.AllShops();
          } else {

          }
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
  // 门店数据获取
  AllShops() {
    this.setData({
      shopLoading: true
    })
    let parameter = {
      page: 1,
      size: this.ShopSize,
      client_id: this.data.CompanyId,
      keyword: this.data.keyword,
      shop_area: "全部",
    }
    $api("GET", "api/shops/wx", parameter)
      .then(res => {
        if (res.data.data === null) {
          return
        }
        if (res.data.data.Shops == null) {
          this.setData({
            ShopData: '',
          })
        } else {
          this.setData({
            ShopData: res.data.data.Shops,
          })
        }
        this.setData({
          shopLoading: false
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})