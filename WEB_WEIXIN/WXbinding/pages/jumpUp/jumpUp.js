var common = require('../../util/common.js');
Page({
    data: {
  
        modeIn: [
            {
                modeImg:'/images/2.png',
                medeNum:'FGRWDDFD201'
            },
            {
                modeImg:'/images/3.png',
                medeNum:'FGRWDDFD201'
            },
            {
                modeImg:'/images/mig.png.png',
                medeNum:'52FFG0WS0'
            },
            {
                modeImg:'/images/mig.png.png',
                medeNum:'502D000W0QW'
            },
        ],
    
        model:''
      },
    onLoad:function(options){
      var model = options.model; 
      this.setData({
        model: model
      })
      this.getEquipmentModel(model)
    },
    /**
     * 跳转到以派发和以安装的页面
     */
    jumpInstallAndDistrubute:function(e){    
      var equipment = e.currentTarget.dataset.staticorder;
      wx.navigateTo({
        url: '../installAndDistribute/installAndDistribute?equipment=' + equipment
      })
    },
    getEquipmentModel:function(model){
      common.postHttpRequest('getEquipment', {'static_info':model},this.doSuccess);
    },
    doSuccess:function(res){
        var that = this;
        var model = that.data.model;
        var result = res.data;
        switch (model){
            case '四信双4G路由器':
              for (var i = 0; i < result.length;i++){
                result[i].modeImg = '/images/2.png';
              }
            break;
            case '深信服MIG':
              for (var i = 0; i < result.length; i++) {
                result[i].modeImg = '/images/3.png';
              }
              break;
            case '信锐无线AP':
              for (var i = 0; i < result.length; i++) {
                result[i].modeImg = '/images/1.png';
              }
              break;
            case '信锐交换机':
              for (var i = 0; i < result.length; i++) {
                result[i].modeImg = '/images/4.png';
              }
              break;
        }
      that.setData({
        modeIn: result
      })
    }

    // getEquipmentModel: function (model){
    //   var that = this;
    //   var urlPrefix = getApp().globalData.uriPrefix;
    //   wx.request({
    //     url: urlPrefix +'getEquipment',
    //     method:'POST',
    //     data: {'static_info': model},
    //     header:{
    //       'content-type':'application/json'
    //     },
    //     success:function(res){
    //       var result = res.data;
    //       console.log(result);
    //       switch (model){
    //         case '四信双4G路由器':
    //           for (var i = 0; i < result.length;i++){
    //             result[i].modeImg = '/images/four.jpg';
    //           }
    //         break;
    //         case '深信服MIG':
    //           for (var i = 0; i < result.length; i++) {
    //             result[i].modeImg = '/images/mig.png.png';
    //           }
    //           break;
    //         case '信锐无线AP':
    //           for (var i = 0; i < result.length; i++) {
    //             result[i].modeImg = '/images/apic.png';
    //           }
    //           break;
    //         case '信锐交换机':
    //           for (var i = 0; i < result.length; i++) {
    //             result[i].modeImg = '/images/rs.jpg';
    //           }
    //           break;
    //       }
    //       console.log(result);
    //       that.setData({
    //         modeIn: result
    //       })
    //     }
    //   })
    // }
});