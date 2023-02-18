// pages/role/role.js
var common = require("../../util/common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    ap: null,
    surplusAP:null,
    online:null,
    equipmentType:null,
    equipmentNumber:null // 设备安装的数量，派发给服务商
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAPInfo();
    var client = getApp().globalData.client;
    //设置title
    wx.setNavigationBarTitle({
      title: client.clientName,
    })
    // 查询该客户都安装了哪些类型的设备
    // this.getEquipmentTypeByClientId();
  },
  /**
   * 查询该客户安装了哪些设备
   */
  getEquipmentTypeByClientId:function(){
    var client = getApp().globalData.client;
    common.getHttpRequest("findEquipmentTypeByClientId",{"clientId":client.id},this.doEquipmentTypeSuccess)
  },
  /**
   * 得到设备的类型成功
   */
  doEquipmentTypeSuccess:function(res){
    console.log(res);
    var that = this;
    that.setData({
      equipmentType:res.data
    })
    that.getEqusNumbersByClientId();
  },
  /**
   * 根据该客户所拥有设备的类型查询设备的数量
   */
  getEqusNumbersByClientId:function(){
    var client = getApp().globalData.client;
    var user = getApp().globalData.user;
    var equipmentTypes = this.data.equipmentType;
    console.log(equipmentTypes);
    var equTypes = '';
    for (var i = 0; i < equipmentTypes.length;i++){
      if (i < equipmentTypes.length-1){
        equTypes += 'types[]=' + equipmentTypes[i].staticOrder + '&';
      }else{
        equTypes += 'types[]=' + equipmentTypes[i].staticOrder;
      }
    }
    console.log(equTypes);
    common.postHttpRequest("installAndSurplusEqu?" + equTypes, { "clientId": client.id, "partnerId": user.partnerId }, this.doSuccess);
  },
  /**
   * 得到已安装和登录用户对应伙伴剩余设备的数量
   */
  getAPInfo:function(){
    var client = getApp().globalData.client;
    var user = getApp().globalData.user;
    common.postHttpRequest("installAndSurplusEqu", { "clientId": client.id, "partnerId": user.partnerId }, this.doSuccess);
  },
  /**
   * 成功的回调函数
   */
  doSuccess:function(res){
    console.log(res);
    var that = this;
    // that.setData({
    //   equipmentNumber:res.data
    // })
    if (res.data){
      that.setData({
        ap: res.data.install,
        surplusAP: res.data.surplus,
        online: res.data.online
      })
    }
  },
  jumpPage:function(e){
    var route = e.currentTarget.dataset.index; 
    switch (route) {
      case 'shop':
        wx.navigateTo({
          url: '../shop/shop',
        })
        break;
      case 'equipment':
        var equipment = e.currentTarget.dataset.equipment;
        var state = e.currentTarget.dataset.state;
        wx.navigateTo({
          url: '../apDetail/apDetail?index=' + equipment + '&state=' + state
        })
        break;   
    }
  },
  //设备型号跳转
  jumpModel:function(e){
    var model = e.currentTarget.dataset.model;
    wx.navigateTo({
      url: '../jumpUp/jumpUp?model='+model
    })
  }
})