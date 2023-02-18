// pages/shop/shop.js
var common = require("../../util/common.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:'',
    shop:[],
    total: 0,
    pageNum: 1,
    hasNextPage: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var self = this;
    wx.getSystemInfo({
      success: function (res) {
        let scrollH = res.windowHeight;
        self.setData({
          scrollH: scrollH
        });
      }
    });

    var client = getApp().globalData.client;
    getApp().globalData.shop_code = '';
    wx.setNavigationBarTitle({
      title: client.clientName,
    })
    this.getShop(this.data.pageNum);
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

  getShopByKey:function(){
    this.setData({
      pageNum: 1,
      shop: []
    });
    this.getShop();
  },
  lower: function () {
    if (this.data.hasNextPage) {
      this.setData({
        pageNum: this.data.pageNum + 1,
      })
      this.getShop();
    }
  },

  jumpService:function(e){
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../service/service?id=' + index,
    })
  },
  /**
   * 设置input搜索框中的内容
   */
  infoChange:function(e){
    this.setData({
      info: e.detail.value
    })
  },
  /**
   * 得到商店的列表
   */
  getShop:function(){
    var client_id = getApp().globalData.client.id;
    common.postHttpRequest("findAllShopByClientId?pageNum=" + this.data.pageNum, 
                          {
                            "clientId": client_id,
                            "shopName": this.data.info
                          },this.doSuccess);
  },
  /**
   * 成功的时候回调
   */
  doSuccess:function(res){
    var that = this;
    console.log(that.data.shop);
    that.setData({
      'shop': that.data.shop.concat(res.list),
        'total': res.total,
        'pageNum': res.pageNum,
        'hasNextPage': res.hasNextPage
    });
  }
})