// pages/holdAll/holdAll.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SwitchInformation: [{
        tit: "新增站点",
        SwitchState: true,
        icon: "/images/icon/newlyAdded.png",
        url: "../../detailed/pages/NewSite/NewSite"
      }, {
        tit: "安装设备",
        SwitchState: true,
        icon: "/images/icon/install.png",
        url: "../../detailed/pages/customerShopChoice/customerShopChoice",
        parameterUrl: "../NewInstall/NewInstall"
      }, {
        tit: "拆除设备",
        SwitchState: true,
        icon: "/images/icon/dismantle.png",
        url: "../../detailed/pages/customerShopChoice/customerShopChoice",
        parameterUrl: "../DismantleMachine/DismantleMachine"
      }, {
        tit: "更换设备",
        SwitchState: true,
        icon: "/images/icon/replace.png",
        url: "../../detailed/pages/customerShopChoice/customerShopChoice",
        parameterUrl: "../ReplaceEquipment/ReplaceEquipment"
      },
      // {
      //   tit: "当前信号",
      //   SwitchState: false,
      //   icon:"/images/icon/signal.png",
      //   url:"../../detailed/pages/Signal/Signal"
      // },
      //  {
      //   tit: "三网调试",
      //   SwitchState: false,
      //   icon:"/images/icon/debugging.png",
      //   url:"../../detailed/pages/NetworkDebugging/NetworkDebugging"
      // }, 
      {
        tit: "日志",
        SwitchState: false,
        icon: "/images/icon/journal.png",
        // url:"../../detailed/pages/Journal/Journal",
        url: "../../detailed/pages/customerShopChoice/customerShopChoice",
        parameterUrl: "../Journal/Journal"
      }, {
        tit: "信号查询",
        SwitchState: false,
        icon: "/images/icon/signal.png",
        // url:"../../detailed/pages/SingleCardDebugging/SingleCardDebugging",
        url: "../../detailed/pages/customerShopChoice/customerShopChoice",
        parameterUrl: "../SingleCardDebugging/SingleCardDebugging"
      }, {
        tit: "查看流量",
        SwitchState: false,
        icon: "/images/icon/see.png",
        url: "../../detailed/pages/customerShopChoice/customerShopChoice",
        parameterUrl: "../SeeFlow/SeeFlow"
        // url:"../../detailed/pages/SeeFlow/SeeFlow"
      },
      // {
      //   tit: "流量排行",
      //   SwitchState: false,
      //   icon:"/images/icon/Ranking.png",
      //   url:"../../detailed/pages/flowRanking/flowRanking"
      // }, 
      {
        tit: "IP查询",
        SwitchState: false,
        icon: "/images/icon/ip.png",
        url: "../../detailed/pages/FamilyMartIp/FamilyMartIp"
      },
      {
        tit: "客户统计",
        SwitchState: false,
        icon: "/images/icon/customerStatistics.png",
        url: "../../detailed/pages/repairStatistics/repairStatistics?StatisticsType="+"客户"
      },
      {
        tit: "工程师统计",
        SwitchState: false,
        icon: "/images/icon/engineerStatistics.png",
        url: "../../detailed/pages/repairStatistics/repairStatistics?StatisticsType="+"工程师"
      },
    ],
    // 站点类
    siteClass: [],
    // 设备类
    equipmentClass: [],
    // 查询类
    queryClass: [],
    // 维修类
    repairClass: [],
  },

  functionSwitch() {
    wx.navigateTo({
      url: "../../detailed/pages/CommonFunctionControl/CommonFunctionControl"
    })
    wx.setStorageSync('SwitchInformation', this.data.SwitchInformation)
  },

  onTransmitUrl(e) {
    console.log(e.target.dataset.url);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let SwitchInformation;
    if (wx.getStorageSync('SwitchInformation')) {
      SwitchInformation = wx.getStorageSync('SwitchInformation');
    } else {
      // console.log("没有储存本地常用功能");
      SwitchInformation=this.data.SwitchInformation;
    }
    let siteClass = [];
    let equipmentClass = [];
    let queryClass = [];
    let repairClass = [];
    SwitchInformation.map((value,index,arr)=>{
      if(index==0){
        siteClass.push(value);
      }else if(index>=1&&index<=3){
        equipmentClass.push(value);
      }else if(index>=4&&index<=7){
        queryClass.push(value);
      }else if(index>=8&&index<=9){
        repairClass.push(value)
      }
    })
    this.setData({
      SwitchInformation: SwitchInformation,
      siteClass: siteClass,
      equipmentClass: equipmentClass,
      queryClass: queryClass,
      repairClass: repairClass,
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

  }
})