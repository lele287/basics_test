// pages/client/client.js
var common = require("../../util/common.js");
Page({

  data: {
    client:[],
  },

  onLoad:function(){
    this.getClient();
  },

  chooseClient:function(e){

    var index = e.currentTarget.dataset.index;
    
    var currentClient = this.data.client[index];
    getApp().globalData.client = currentClient;

    wx.navigateTo({
      url: '../role/role',
    })

  },
  /**
   * 请求成功的回调
   */
  doSuccess:function(res){
    var that = this;
    if (res.status == 200){
      that.setData({
        'client': res.data
      });
    }
  },

  getClient:function(){
    var user = getApp().globalData.user;
    common.getHttpRequest("client", { "id": user.partnerId }, this.doSuccess);
  },
  quit:function(){
    console.log("退出登录");
    // 清除user缓存
    wx.removeStorage({
      key: 'user',
      success: function(res) {
        console.log("清理成功");
      },
    })
    wx.reLaunch({
      url: '../login/login',
    })
  }
})