//获取应用实例
const app = getApp()
const $api = require('../../../util/api').API;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ["维修详情","详细信息","维修信息"],
    RepairDetails: {},
    steps: [],
    OperateTime:[],
  },

  // 折叠面板
  foldChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      RepairDetails: JSON.parse(options.RepairDetails)
    })
    this.RepairReport();
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

  // 维修信息查询
  RepairReport() {
    $api("GET", "api/repair_processes/all/" + this.data.RepairDetails.RepairListNo)
      .then(res => {
        let data = res.data.data;
        let OperateTime=[];
        let steps=[];
        for(let i=0;i<data.length;i++){
         OperateTime.push( {yearMonthDay:data[i].OperateTime.split('T')[0],TimeBranchSecond:data[i].OperateTime.split('T')[1].split('+')[0]})
          steps.push({text:data[i].ProcessName,desc:data[i].OperatorName})
        }
        this.setData({OperateTime:OperateTime,steps:steps})
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})