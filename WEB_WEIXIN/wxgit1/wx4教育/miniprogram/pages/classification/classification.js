// pages/classification/classification.js
Page({

  /**
   * 页面的初始数据
   */
  page: 1,
  size: 20,
  start: 0,
  number: 10,
  data: {
    dataSource: null,
    // tab栏
    activeTab: 0,
    //公司
    company: 0,
    setUp: [],
    // 门店
    store: 0,
    itemData: ["财经管理", "会计"],
    // 设备
    equipment: 0,
    // 卡片
    card: 0,
  },

  // tab栏
  onChangeTab(event) {
    // console.log(event.detail);
    this.setData({
      activeTab: event.detail.index
    })
    if (event.detail.index == 1) {
      this.size = 15;
      this.loadData();
    }
  },
  onSwitchTab(event) {
    // console.log(event.target.dataset.index);
    this.setData({
      activeTab: event.target.dataset.index
    })
    if (event.target.dataset.index == 1) {
      this.size = 15;
      this.loadData();
    }
  },
  change(e) {
    this.setData({
      activeTab: e.detail.current
    });
    if (e.detail.current == 1) {
      this.size = 15;
      this.loadData();
    }
  },
  // 公司
  onCompany(event) {
    // console.log(event.detail);
    this.setData({
      company: event.detail
    })
  },
  detailsCompany(e){
    // wx.setStorageSync('essentialInformation', e.currentTarget.dataset['item'])
    // wx.navigateTo({
    //   url: "/pages/detailsCompany/detailsCompany"
    // })
    wx.navigateTo({
      url: "/pages/detailsStore/detailsStore"
    })
  },
  // 门店
  onStore(event) {
    // console.log(event.detail);
    this.setData({
      store: event.detail
    })
  },
  detailsStore(e) {
    wx.setStorageSync('essentialInformation', e.currentTarget.dataset['item'])
    wx.navigateTo({
      url: "/pages/detailsStore/detailsStore"
    })
  },
  // 设备
  onEquipment(event) {
    // console.log(event.detail);
    this.setData({
      equipment: event.detail
    })
  },
  // 卡片
  onCard(event) {
    // console.log(event.detail);
    this.setData({
      card: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.CompanySetting();
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
    if (this.data.activeTab == 1&&this.data.store == 0) {
      this.size += 5;
      this.loadData();
    }else if(this.data.activeTab == 0&&this.data.company == 0){
      this.number += 5;
      this.CompanySetting();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 设备
  loadData() {
    let _this = this;
    wx.request({
      url: 'http://netop.sharewis.com:8087/server/api/shops/wx',
      method: 'GET',
      data: {
        'page': this.page,
        'size': this.size,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('mytoken'),
      },
      success(res) {
        // console.log(res.data.data.Shops);
        if (res.data.message == 'invalid or expired jwt' || res.statusCode == 401) {
          console.log("token过期重新请登录");
          Toast.fail('token过期重新请登录');
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
          let tabdata = [];
          if (res.data.data['Shops'] != null) {
            tabdata = res.data.data['Shops']
            // 判断日期
            for (var i = 0; i < tabdata.length; i++) {
              let InstallTimeData = new Date(tabdata[i].InstallTime)
              if (InstallTimeData.getYear()) {
                tabdata[i].InstallTime = '-'
              }
            };
            _this.setData({
              dataSource: tabdata
            });
          } else {
            _this.setData({
              dataSource: []
            })
          }
          console.log(_this.data.dataSource);
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  CompanySetting() {
    // https://netop.sharewis.com:8000/server/api/companys?keyword=&comp_id=&start=0&number=10
    let _this = this;
    wx.request({
      url: 'http://netop.sharewis.com:8087/server/api/companys',
      method: 'GET',
      data: {
        'start': this.start,
        'number': this.number,
      },
      header: {
        'content-type': 'application/json',
        'Authorization': 'Bearer ' + wx.getStorageSync('mytoken'),
      },
      success(res) {
        //  console.log(res.data.data);
        if (res.data.message == 'invalid or expired jwt' || res.statusCode == 401) {
          console.log("token过期重新请登录");
          Toast.fail('token过期重新请登录');
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
          _this.setData({
            setUp: res.data.data
          })
          //  if (res.data.data.ShopEquipments != null) {
          //    let equipmentData = res.data.data.ShopEquipments
          //    for (var i = 0; i < equipmentData.length; i++) {
          //      equipmentData[i].EquipmentInstall = res.data.data.ShopEquipments[i].EquipmentInstall.split('T')[0]
          //    }
          //    _this.setData({
          //      equipment: equipmentData
          //    })
          //    console.log(_this.data.equipment);
          //  }
        }
      },
      fail(err) {
        console.log(err);
      }
    })
  },
})