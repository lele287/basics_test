// pages/apDetail/apDetail.js
var common = require('../../util/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loadingHidden: true,
    installEquipment:[],
    total:0,
    equ_type:0,
    euqipement:'',
    key:'',
    pageNum:1,
    page:1,
    hasNextPage:false,
    state:''
  },
  
  onLoad: function (options) {
    /**
   * 生命周期函数--监听页面加载
   */
    var self = this;
    wx.getSystemInfo({
        success: function(res) {
          let scrollH = res.windowHeight;
          self.setData({
              scrollH:scrollH
          });
        }
    });

    var client = getApp().globalData.client;
    wx.setNavigationBarTitle({
      title: client.clientName,
    })
    
    var euqipement = '';
    switch(options.index){
      case '2': euqipement ='4G路由器'; break;
      case '3': euqipement ='MIG网关';break;
      case '1': euqipement ='无线AP';break;
      case '4': euqipement = '智能交换机'; break;
    }
    this.setData({
      equ_type: options.index,
      euqipement:euqipement,
      state:options.state      
    })
    this.getInstallEquipmentList();
  },
  /**
   * 得到已安装的列表
   */
  getInstallEquipmentList:function(){
    var params = {
      'client_id':getApp().globalData.client.id,
      'equipment_type':this.data.equ_type,
      'key':this.data.key,
      'equipment_state':this.data.state,
      'partner_id':getApp().globalData.user.partnerId
    }
    common.postHttpRequest('getInstallEquipmentByEquType?pageNum='+this.data.pageNum, params,this.doSuccess);
  },
  doSuccess:function(res){
    var that = this;
    if(res.status == 200){
      that.setData({
        installEquipment:that.data.installEquipment.concat(res.data.list),
        total:res.data.total,
        pageNum:res.data.pageNum,
        hasNextPage:res.data.hasNextPage
      })
    }
  },
  getInstallEquipmentByKey(){
    this.setData({
      pageNum:1,
      installEquipment:[]
    });
    this.getInstallEquipmentList();
  },
  lower:function(){
     if(this.data.hasNextPage){
       this.setData({
         pageNum: this.data.pageNum + 1,
       })
       this.getInstallEquipmentList()
     }
  },
  infoChange: function (e) {
    this.setData({
      key: e.detail.value
    })   
  },

  jumpShop:function(e){
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../service/service?id='+id,
    })
  }
})
