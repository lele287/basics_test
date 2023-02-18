// pages/change/change.js
var common = require('../../util/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    equipment: [],
    equs:[], //新设备和老设备的列表
    equipmentNum:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (onLoad) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
    this.findEquipmentByShopId();
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  equipmentChange:function(e){
      var index = e.currentTarget.dataset.index;
      var equs =  this.data.equs;
      equs[index].new_equipment_code = e.detail.value
      this.setData({
        equs: equs
      })
  },
  /**
   * 查询该门店绑定的设备
   */
  findEquipmentByShopId: function () {
    var shop = getApp().globalData.shop;
    common.getHttpRequest("findEquipmentByShopId", { "id": shop.id }, this.doSuccess);
  },
  /**
   * 成功的回调函数
   */
  doSuccess: function (res) {
    var that = this;
    that.setData({
      equipment: res.data
    });
  },
  /**
   * 点击保存
   */
  save:function(){
    var client = getApp().globalData.client;
    var user = getApp().globalData.user;
    var shop = getApp().globalData.shop;

    var equipments = this.data.equs;

    var shopEquipment = [];
    //组装参数
    for(var i=0; i<equipments.length;i++){
      shopEquipment.push({ 
                        "shop_id": shop.id,
                        "info_code": equipments[i].equipment_code,
                        "new_equipment_code": equipments[i].new_equipment_code
                        });
    }

    var params = {
      "shopEquipment": shopEquipment,
      "custemInfo":{
        "user_id": user.id,
        "client_id":client.id,
        "partner_id":user.partnerId
      }
    }
    console.log(params);
    common.postHttpRequest("change", params,this.savaSuccess);
  }, 
  savaSuccess:function(res){
    var that = this;
    console.log(res.status);
    if (res.status == 200){
      that.setData({
        'equs':[]
      });
      that.findEquipmentByShopId();
    } else if (res.status == 500){
      wx.showToast({
        title: '服务器内部异常',
        icon: 'loading',
        duration: 1000
      })
    } else if (res.status == 400){
      var data = res.data;
      var problem_case = '';
      for(var i=0;i<data.length;i++){
            switch (data[i].state){
              case 0: 
                problem_case += that.data.equs[data[i].index].new_equipment_code + ',设备不存在\r\n'; 
                break;
              case 1: 
                problem_case += data[i].equipmentCode + ',设备未派发\r\n'; 
                break;
              case 2: 
                problem_case += data[i].equipmentCode + ',服务商不对\r\n'; 
                break;
              case 3: 
                problem_case += data[i].equipmentCode + ',设备已安装\r\n'; 
                break;
            }
      }
      wx.showModal({
        title: '提示',
        content: problem_case,
      })
    }
  }, 
  // save:function(){
  //   var equs = this.data.equs;
  //   var that = this;
  //   var uriPrefix = getApp().globalData.uriPrefix;
  //   var client = getApp().globalData.client;
  //   var user = getApp().globalData.user;
  //   var shop = getApp().globalData.shop;

  //   for (var i = 0; i < equs.length; i++) {
  //     equs[i].shop_id = shop.id;
  //     equs[i].user_id = user.id;
  //     equs[i].client_id = client.id;
  //     equs[i].partner_id = user.partner_id;
  //     equs[i].shop_code = shop.shop_code;
  //   }

  //   wx.request({
  //     url: uriPrefix + 'ChangeEquipment',
  //     data: equs,
  //     method: 'POST',
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {   

  //       var result = res.data;
  //       if (result.length !=0){
  //         var cases = [];
  //         for(var i=0;i<result.length;i++){
  //           var equipemnt_name = equs[result[i].index].new_static_info;
  //           var problem_case = '';
  //           switch (result[i].result){
  //             case 0: problem_case='设备不存在'; break;
  //             case 1: problem_case = '设备未派发'; break;
  //             case 2: problem_case = '服务商不对'; break;
  //             case 3: problem_case = '设备已安装'; break;
  //             case 4: problem_case = '设备类型不对'; break;
  //           }
  //           cases.push({ 'equipemnt_name': equipemnt_name, 'problem_case': problem_case});
  //         }
  //         var content = '';
  //         for (var j = 0; j < cases.length;j++){
  //           content = content + cases[j].equipemnt_name + ":" + cases[j].problem_case +"\r\n";
  //         }
  //         wx.showModal({
  //           title: '提示',
  //           content: content,
  //           success: function (res) {
  //             //用户可以看点提示信息
  //           }
  //         })
  //       }else{
  //         //刷新页面
  //         that.onLoad();

  //         that.setData({
  //           equs:[]
  //         });

  //       }
  //     }
  //   })
  // },
  /**
   * 开启扫描功能
   */
  click: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;

    //得到更换列表中的值
    this.data.equs[index].new_equipment_code;
 
    var currentEqui = this.data.equs;

    wx.scanCode({
      success: (res) => {

        var equipmentNum = res.result;

        currentEqui[index].new_equipment_code = equipmentNum;
 
        that.setData({
          equs: currentEqui
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },
  /**
   * 点击更换
   */
  clickChange:function(e){

    var validateEqu = this.data.equs;

    var oneequ = e.currentTarget.dataset.oneequ;
    //验证点击更换是否已存在在更换列表
    for (var i = 0; i < validateEqu.length;i++){
      if (oneequ.equipment_code == validateEqu[i].equipment_code){
        return;
      }
    }
    //得到新设备的类型
    var equipmentType = oneequ.static_info 
    oneequ.static_info = "旧" + equipmentType;
    oneequ.new_static_info = "新" + equipmentType;
    oneequ.new_equipment_code = "";

    var equs = this.data.equs;
    equs.push(oneequ);
    this.setData({
      equs: equs
    })
  },
  /**
   * 点击删除
   */
  clickDelete:function(e){
    var index = e.currentTarget.dataset.index;
    var equs = this.data.equs;
    equs.splice(index,1)

    this.setData({
      equs:equs
    });
  }
})