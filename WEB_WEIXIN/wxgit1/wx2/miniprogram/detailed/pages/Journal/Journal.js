//获取应用实例
const app = getApp()
const $api = require('../../../util/api').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: [],
    currentIndex: 0,
    TestData: [],
    DismantleData: [],
    ChangeData: [],
    InstallData: [],
    ShopCode: '',
    readOnly: false,
    tempParam: 'test',
    optionsData: '',
    // steps: [
    //   {
    //     text: '维修类型：拆机',
    //     desc: `维修项目：无线ap | 维修人：www`,
    //   },
    //   {
    //     text: '步骤二',
    //     desc: '描述信息',
    //   },
    //   {
    //     text: '步骤三',
    //     desc: '描述信息',
    //   },
    //   {
    //     text: '步骤四',
    //     desc: '描述信息',
    //   },
    // ],
  },

  // 顶部导航栏
  tabChange(event) {
    this.setData({
      currentIndex: event.target.dataset.index,
      tempParam: event.target.dataset.tempparam,
      activeNames: [],
    });
    this.journalDataObtain();
    // if (event.target.dataset.tempparam == 'dismantle') {
    //   this.journalDataObtain();
    // } else if (event.target.dataset.tempparam == 'change') {
    //   this.journalDataObtain();
    // }
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({ShopCode:options.Code})
    if (Object.keys(options).length === 0) {
      this.setData({
        readOnly: false
      });
    } else {
      this.setData({
        ShopCode: options.Code,
        readOnly: true,
      });
    };
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
    this.journalDataObtain();
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

  // 日志数据获取
  journalDataObtain() {
    // 测试test  拆机dismantle  更换change  装机install
    let tempParam = this.data.tempParam;

    let data;
    if (this.data.readOnly) {
      data = {
        client_id: app.data.SelectCompanyId,
        shop_code: this.data.ShopCode,
        page: 1,
        size: 10,
      }
    } else {
      data = {
        client_id: this.data.optionsData.CompanyId,
        shop_code: this.data.optionsData.ShopCode,
        page: 1,
        size: 10,
      }
    }
    $api("GET", `api/logs/page/shop_code/wx/${tempParam}`, data)
      .then(res => {
        if (res.data.data == null) {
          if (this.data.tempParam === "test"){
            this.setData({
              TestData: []
            })
          }else if (this.data.tempParam === "dismantle"){
            this.setData({
              DismantleData: []
            })
          }else if(this.data.tempParam === "change"){
            this.setData({
              ChangeData:[]
            })
          }else if(this.data.tempParam === "install"){
            this.setData({
              ChangeData:[]
            })
          }
        } else {
          res.data.data.forEach(element => {
            element.OperateTime=app.DateFormat(element.OperateTime,'HMS');
            if(this.data.tempParam==="test"){
              element.CurrentCardRecords.forEach((values,indexs) =>{
                app.DataScreening(values)
              })
            }else{
              app.DataScreening(element)
            }
          });
          if (this.data.tempParam === "test"){
            this.setData({
              TestData: res.data.data
            })
          }else if (this.data.tempParam === "dismantle"){
            this.setData({
              DismantleData: res.data.data
            })
          }else if(this.data.tempParam === "change"){
            this.setData({
              ChangeData: res.data.data
            })
          }else if(this.data.tempParam === "install"){
            this.setData({
              InstallData: res.data.data
            })
          }
        }

      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },


})