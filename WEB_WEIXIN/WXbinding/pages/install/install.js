// pages/install/install.js
var util = require('../../util/util.js');
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addEquipments: [],
    equipmentNum: '',
    equipment_type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
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
    this.setData({
      addEquipments: []
    })
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
  /**
   * 将待保存列表中的设备进行保存
   */
  save:function(){
    var that = this;
    var equs = this.data.addEquipments;

    var client = getApp().globalData.client;
    var user = getApp().globalData.user;
    var shop = getApp().globalData.shop;

    for (var i = 0; i < equs.length;i++){
      equs[i].shop_id = shop.id;
    }
    var params = {
                   "shopEquipment": equs,
                    "custemInfo":{
                      "user_id" : user.id,
                      "client_id" : client.id,
                      "partner_id": user.partnerId
                    }
                  };
    common.postHttpRequest("install", params,this.saveSucess);
  },
  saveSucess:function(res){
    var that = this;
    if (res.status == 500){
      wx.showModal({
        title: '提示',
        content: '设备绑定失败，请重试',
      })
      return;
    }
    var equs = this.data.addEquipments;

    var flag = false;
    var fourLetter = '';
    for(var i=0;i<equs.length;i++){
      if (equs[i].info_code.substring(0,2) == '02'){
        fourLetter = equs[i].info_code;
        flag = true;
      }
    }

    if (res.status == 200){
        wx.showToast({
          title: '安装成功',
          icon: 'loading',
          duration: 1000
        })
        that.setData({
          addEquipments: [],
          equipmentNum: ''
        });
        //判断是否有router设备，如果有router设备就跳转到测试信号的设备
        if (flag) {
          wx.showModal({
            title: '提示',
            content: '请到三网调试进行测试',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../step/step?info_code=' + fourLetter,
                })
              } else if (res.cancel) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          })
        }
    }else{
      wx.showToast({
        title: '安装失败',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // save: function () {
  //   var equs = this.data.addEquipments;
  //   var that = this;
  //   var uriPrefix = getApp().globalData.uriPrefix;
  //   var client = getApp().globalData.client;
  //   var user = getApp().globalData.user;
  //   var shop = getApp().globalData.shop;
  //   var flag = false;//是否有router设备的标志
  //   for (var i = 0; i < equs.length; i++) {
  //     equs[i].shop_id = shop.id;
  //     equs[i].user_id = user.id;
  //     equs[i].client_id = client.id;
  //     equs[i].partner_id = user.partner_id;
  //     if (equs[i].equipment_type_num == 2) {
  //       flag = true;
  //     }
  //   }
  //   //判断是否有router设备，如果有router设备就跳转到测试信号的设备
  //   if (flag) {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请到三网调试进行测试',
  //       success: function (res) {
  //         if (res.confirm) {
  //           wx.navigateTo({
  //             url: '../step/step?equipment=' + JSON.stringify(equs) + '&flag=install',
  //           })
  //         } else if (res.cancel) {
  //           wx.navigateBack({
  //             delta: 1
  //           })
  //         }
  //       }
  //     })
  //   }
  //   wx.request({
  //     url: uriPrefix + 'bindingEquipment',
  //     data: equs,
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       wx.showToast({
  //         title: '添加成功',
  //         icon: 'loading',
  //         duration: 1000
  //       })
  //       that.setData({
  //         addEquipments: []
  //       });
  //       util.updateShop(shop.shop_code);
  //     }
  //   })
  // },
  /**
   * 把正式设备改成测试设备，或相反
   */
  switch1Change() {
    var equipment_type = this.data.equipemnt_type;
    if (equipment_type) {
      equipment_type = 0;
    } else {
      equipment_type = 1;
    }
  },
  /**
   * 扫描二维码.得到设备的信息
   */
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        var equipmentNum = res.result;
        this.setData({
          equipmentNum: equipmentNum
        })
        wx.showToast({
          title: '识别成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '识别失败',
          icon: 'cancel',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },
  /**
   * 删除添加的带添加列表中的参数
   */
  clickDelete: function (e) {
    var index = e.currentTarget.dataset.index;
    var equs = this.data.addEquipments;
    equs.splice(index, 1)
    this.setData({
      addEquipments: equs
    });
  },
  /**
   * input框中的值发生改变
   */
  equipmentChange: function (e) {
    this.setData({
      equipmentNum: e.detail.value
    })
  },
  /**
   * 验证要添加的设备是否是对应partner的
   */
  addEquipment:function(e){
    var equipmentNum = e.currentTarget.dataset.equipmentnum.trim();
    var user = getApp().globalData.user;
    if (equipmentNum == '') {
      wx.showModal({
            title: '提示',
            content: '请输入设备的编号',
            success: function (res) {
            if (res.confirm) {

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    common.getHttpRequest("validateEquipment", { "equipemntCode": equipmentNum, "partnerId": user.partnerId},this.doSuccess);
  },
  /**
   * 成功的回调函数
   */
  doSuccess:function(res){
      var that = this;
      if (res.data.state == 0){
        wx.showModal({
          title: '提示',
          content: '设备不存在',
        })
        return;
      } else if (res.data.state == 1){
          wx.showModal({
            title: '提示',
            content: '设备未派发',
          })
          return;
      } else if (res.data.state == 2){
        wx.showModal({
          title: '提示',
          content: '设备未派发给您',
        })
        return;
      } else if (res.data.state == 3){
        wx.showModal({
          title: '提示',
          content: '设备已安装',
        })
        return;
      } else if(res.data.state == 666){
          var addEquipments = that.data.addEquipments;
          var addEquipment = {
            'type': res.data.equipment.equipmentName,
            'info_code': res.data.equipment.equipmentCode
          };
          addEquipments.push(addEquipment);
          that.setData({
            addEquipments: addEquipments
          })
      }
  }
})