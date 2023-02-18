//获取应用实例
const app = getApp()
const $api = require('../../util/api.js').API;
wx - Page({

  /**
   * 页面的初始数据
   */
  data: {
    RepairListsData: [],
    RepairListsDataScreen: [],
    RepairLists: [],
    size: 20,
    Statistics: {},
    screens: '总数',
    NoEstimatedTime: false,
    CompCnName: [],
  },

  onSingleCardDebugging(item) {
    wx.navigateTo({
      url: '../../detailed/pages/BigScreenDetails/BigScreenDetails?Details=' + JSON.stringify(item.currentTarget.dataset.item),
    })
  },

  // 筛选
  onScreen(e) {
    if(this.data.RepairListsData.length===0) return;
    let screens = e.currentTarget.dataset.screen
    this.setData({
      size: 20,
      screens: screens,
    })
    if (screens === "总数") {
      this.setData({
        RepairListsDataScreen: this.data.RepairListsData
      })
      this.RepairListsData();
    } else if (screens === "超时") {
      let manArr = this.data.RepairListsData.filter(function (arr) {
        return arr.Straordinario === true;
      })
      this.setData({
        RepairListsDataScreen: manArr,
      })
      this.RepairListsData();
    } else if (screens === "派发中") {
      let manArr = this.data.RepairListsData.filter(function (arr) {
        return arr.ListStatus === '自动转人工';
      })
      this.setData({
        RepairListsDataScreen: manArr,
      })
      this.RepairListsData();
    } else if (screens === "接单中") {
      let manArr = this.data.RepairListsData.filter(function (arr) {
        return arr.ListStatus === '待接单';
      })
      this.setData({
        RepairListsDataScreen: manArr,
      })
      this.RepairListsData();
    } else if (screens === "处理中") {
      let manArr = this.data.RepairListsData.filter(function (arr) {
        return arr.ListStatus === '维修中';
      })
      this.setData({
        RepairListsDataScreen: manArr,
      })
      this.RepairListsData();
    }
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
    this.setData({
      RepairListsData: [],
      RepairListsDataScreen: [],
      RepairLists: [],
      size: 20,
      Statistics: {},
      screens: '总数',
      NoEstimatedTime: false,
      CompCnName: [],
    })
    this.loadCompanyData();
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
    // this.setData({
    //   size: 20
    // })
    // this.LargeScreen();
    // // 结束下拉刷新
    // wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.RepairListsData.length > this.data.size) {
      this.setData({
        size: this.data.size + 20
      })
      this.RepairListsData();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 公司 数据获取
  loadCompanyData() {
    let data = {
      'page': 1,
      'size': 200,
      'service_level': "全部",
      'keyword': "",
    }
    $api("GET", `api/company/clients/supplier_id/wx`, data)
      .then(res => {
        var Clients = res.data.data.Clients;
        var CompCnName = [];
        if (Array.isArray(Clients) && Clients !== null) {
          Clients.forEach(element => {
            CompCnName.push(element.CompCnName)
          });
        };

        this.setData({
          CompCnName: CompCnName
        })
        this.LargeScreen();

      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  LargeScreen() {
    $api("GET", `api/repairs/sharewis`)
      .then(res => {
        let data = res.data.data;
        let RepairLists = data.RepairLists;
        let List = [];
        if (RepairLists !== null) {
          let stimaItem;
          let correnteItem;
          for (let i = 0; i < RepairLists.length; i++) {

            // 判断该条数据是否有权限显示
            if (this.data.CompCnName.indexOf(RepairLists[i].ClientName) === -1) {
              break;
            }

            if (RepairLists[i].ShopName.length >= 8) {
              RepairLists[i].ShopNames = RepairLists[i].ShopName.slice(0, 8) + '..'
            } else {
              RepairLists[i].ShopNames = RepairLists[i].ShopName
            }
            stimaItem = (new Date(RepairLists[i].ProFinishedTime)).getTime();
            if (stimaItem <= 0) {
              RepairLists[i].Straordinario = false
              this.setData({
                NoEstimatedTime: true
              })
            } else {
              correnteItem = (new Date()).getTime();
              if (stimaItem < correnteItem) {
                RepairLists[i].Straordinario = true
              } else {
                RepairLists[i].Straordinario = false
              }
            }

            // 把有权限显示的数据添加进数组
            List.push(RepairLists[i])
          }

          this.setData({
            RepairListsData: List,
            RepairListsDataScreen: List,
            // RepairLists: RepairLists,
          })
          this.RepairListsData();
        }
        this.setData({
          Statistics: {
            RepairTotal: data.RepairTotal,
            NotDistributeTotal: data.NotDistributeTotal,
            AcceptingTotal: data.AcceptingTotal,
            ProcessingTotal: data.ProcessingTotal,
            TimeOutTotal: data.TimeOutTotal
          }
        })

      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
  // 数据分页
  RepairListsData() {
    let RepairLists = this.data.RepairListsDataScreen;
    this.setData({
      RepairLists: RepairLists.slice(0, this.data.size),
    })
  },
})