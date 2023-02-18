//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
Page({

  // 设备模块
  equipmentPage: 1,
  equipmentSize: 20,
  equipmentModelId: '',
  data: {
    equipmentLoading: false,
    // 搜索
    keyword: '',
    disHistory: false,
    histroyRecord: [],
    //当前选中的客户
    selectedCompanyId: null,
    selectedCompanyCompCnFullName: null,
    Range: '全部',
    // 设备
    equipmentData: [],
    equipmentSidebarIndex: 0,
    equipmentSidebarOptions: ["全部", "在线", "离线", "备机"],
    equipmentSidebarValue: '全部',
    // 公司
    Company: [],
    CompanyData: [],
    CompanyState: false,
    CompanySlide: '',
    CompanyIndex: 0,
    // 元素高度
    textareaHeight: 0,
    leftHeight: 0,
  },

  // 设备模块
  equipmentSidebarChange(event) {
    if (event.detail != this.data.Store) {
      this.setData({
        equipmentSidebarIndex: event.detail,
        equipmentSidebarValue: this.data.equipmentSidebarOptions[event.detail]
      })
      this.loadEquipmentData();
    }
  },

  detailsEquipment(e) {
    wx.setStorageSync('essentialInformation', e.currentTarget.dataset['item'])
    wx.navigateTo({
      url: "../detailsEquipment/detailsEquipment?Range=" + this.data.Range + "&EquipmentCode=" + e.currentTarget.dataset['item'].EquipmentCode
    })
  },


  /* 搜索模块*/
  // 搜索 获得焦点时
  onSearchFocus() {
    this.openHistorySearch();
    this.setData({
      disHistory: true
    })
  },
  // 搜索 失去焦点时
  onSearchBlur() {
    this.setData({
      disHistory: false
    })
  },
  // 搜索 输入内容时
  onChangeFocus(e) {
    this.setData({
      keyword: e.detail,
    });
  },
  // 搜索 回车时
  onSearch(e) {
    this.search();
  },

  onClearFocus() {
    this.setData({
      keyword: '',
      disHistory:false,
    });
    // 发起请求，并初始化页面参数
    this.equipmentSize = 15;
    this.loadEquipmentData();
  },

  search() {
    this.searchSubmitFn();
    // 发起请求，并初始化页面参数
    this.equipmentSize = 15;
    this.loadEquipmentData();
  },


  //取得本地储存函数 在生命周期函数onload中调用
  openHistorySearch: function () {
    this.setData({
      histroyRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
  },
  // 删除历史搜索记录
  historyDelFn: function () {
    // wx.clearStorageSync('searhRecord')
    try {
      wx.removeStorageSync('searchRecord')
    } catch (e) {
      console.log(e);
    }
    this.setData({
      histroyRecord: []
    })
  },
  // 储存到本地
  searchSubmitFn: function () {
    let inputVal = this.data.keyword
    let histroyRecord = this.data.histroyRecord
    if (inputVal == '') {
      //输入为空时的处理
    } else {
      for (let i = 0; i < histroyRecord.length; i++) {
        if (histroyRecord[i].value == inputVal) {
          histroyRecord.splice(i, 1)
        }
      }
      //将搜索值放入历史记录中,只能放前10条
      if (histroyRecord.length < 10) {
        histroyRecord.unshift({
          value: inputVal,
        })
      } else {
        histroyRecord.pop() //删掉旧的时间最早的第一条
        histroyRecord.unshift({
          value: inputVal,
        })
      }
      //将历史记录数组整体更新
      this.setData({
        histroyRecord: histroyRecord
      })
      //将历史记录数组整体储存到缓存中
      wx.setStorageSync('searchRecord', histroyRecord)
    }
  },
  // 点击历史记录时
  ClickHistory(e) {
    this.setData({
      keyword: e.currentTarget.dataset.value
    })
    this.search();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 题头
    wx.setNavigationBarTitle({
      title: app.data.companyName + '_' + options.equipmentSidebarValue
    })
    this.setData({
      selectedCompanyId: options.selectedCompany,
      Range: options.equipmentSidebarValue,
      // selectedCompanyCompCnFullName: options.CompCnFullName,
      selectedCompanyCompCnFullName: app.data.companyName,
      equipmentModelId: options.equipmentModelId,
    })
    this.equipmentModelId = options.equipmentModelId;
    
    this.loadEquipmentData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let WinHeight = wx.getSystemInfoSync().windowHeight
    let query = wx.createSelectorQuery();
    query.select('#textarea').boundingClientRect(rect => {
      let height = rect.height;
      this.setData({
        textareaHeight: height
      })
    }).exec();

    this.setData({leftHeight:`height:${WinHeight-this.data.textareaHeight}px`})
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
    this.equipmentSize += 5;
    this.loadEquipmentData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 设备 数据获取
  loadEquipmentData() {
    this.setData({
      equipmentLoading: true
    })
    let _this = this;
    let EquipmentData = {
      'page': this.equipmentPage,
      'size': this.equipmentSize,
      'client_id': this.data.selectedCompanyId,
      'equipment_model_id': this.equipmentModelId,
      'keyword': this.data.keyword,
      'online_status': this.data.equipmentSidebarValue,
    };
    $api("GET", `api/equipments/equipment_model_id/wx`, EquipmentData)
      .then(res => {
        if (res.data.data == null) {
          _this.setData({
            equipmentData: [],
          })
        } else {
          _this.setData({
            equipmentData: res.data.data,
          })
        }
        this.setData({
          equipmentLoading: false
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 公司数据请求
  // CustomerData() {
  //   $api("GET", "api/clients")
  //     .then(res => {
  //       let ClientData = [];
  //       for (var i = 0; i < res.data.data.length; i++) {
  //         ClientData.push(res.data.data[i].ClientName)
  //       }
  //       this.setData({
  //         CompanyData: ClientData,
  //         Company: res.data.data,
  //         CompanySlide: ClientData[0],
  //       })
  //     })
  //     .catch(err => {
  //       //请求失败
  //       console.log(err);
  //     })
  // },
})