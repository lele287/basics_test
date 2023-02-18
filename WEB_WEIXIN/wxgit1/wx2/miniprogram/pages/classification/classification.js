//获取应用实例
const app = getApp()
const $api = require('../../util/api.js').API;
Page({
  /**
   * 模块参数
   */
  // 公司模块
  companyPage: 1,
  companySize: 10,
  companySidebarValue: '全部',
  // 门店模块
  shopPage: 1,
  shopSize: 10,
  shopSidebarValue: '全部',
  // 设备模块
  // equipmentPage: 1,
  // equipmentSize: 10,
  equipmentSidebarValue: '全部',
  // 卡片模块
  cardPage: 1,
  cardSize: 10,
  cardSidebarValue: '全部',

  //模块数据
  data: {
    // 拉
    PULL: false,
    // 元素高度
    textareaHeight: 0,
    leftHeight: 0,
    //当前选中的客户
    selectedCompany: null,
    // 搜索
    keyword: '',
    disHistory: false,
    histroyRecord: [],
    // 门店数据
    shopData: [],
    // tab索引
    tabIndex: 0,
    //公司
    companyData: [],
    companySidebarIndex: 0,
    companySidebarOptions: [{
      'name': '全部',
      "total": 0
    }],
    companyLoading: false,
    CloseShop: false,
    // setUp: [],
    //门店
    shopData: [],
    shopSidebarIndex: 0,
    shopSidebarOptions: [{
      'name': '全部',
      "total": 0
    }],
    shopSidebarOptionsOne: [{
      'name': '全部',
      "total": 0
    }],
    shopSidebarOptionsTwo: [{
      'name': '全部',
      "total": 0
    }],
    shopLoading: false,

    // 设备
    equipmentData: [],
    equipmentSidebarIndex: 0,
    equipmentSidebarOptions: [{
      'name': '全部',
      "total": 0
    }],
    equipmentLoading: false,
    // 卡片
    cardData: [],
    cardSidebarIndex: 0,
    cardSidebarOptions: [{
      'name': '全部',
      "total": 0
    }],
    cardLoading: false,
  },

  // 顶部导航栏
  tabChange(event) {
    if (this.data.tabIndex === event.target.dataset.index)
      return;
    if (this.data.selectedCompany == null)
      return;
    if (this.data.selectedCompany.Id == "" && event.target.dataset.index !== 0)
      return;

    // 更改题头
    wx.setNavigationBarTitle({
      title: event.target.dataset.title + "_" + app.data.companyName
    })

    this.setData({
      tabIndex: event.target.dataset.index
    });

    //step1.重置搜索关键字keyword
    this.setData({
      keyword: ''
    });
    // 按模块发起请求，并初始化页面参数
    if (event.target.dataset.index == 0) {
      this.companyPage = 1;
      this.companySize = 10;
      this.companySidebarValue = '全部';
      this.setData({
        companySidebarIndex: 0,
      })
      this.loadCompanyData();
    } else if (event.target.dataset.index == 1) {
      this.shopPage = 1;
      this.shopSize = 10;
      this.shopSidebarValue = '全部';
      this.setData({
        shopSidebarIndex: 0,
      })
      this.loadShopData(true);
    } else if (event.target.dataset.index == 2) {
      // this.equipmentPage = 1;
      // this.equipmentSize = 10;
      this.equipmentSidebarValue = '全部';
      this.setData({
        equipmentSidebarIndex: 0,
      })
      this.loadEquipmentData();
    } else if (event.target.dataset.index == 3) {
      this.cardPage = 1;
      this.cardSize = 10;
      this.cardSidebarValue = '全部';
      this.setData({
        cardSidebarIndex: 0,
      })
      this.loadCardData();
    }
  },


  // 公司模块
  companySidebarChange(event) {
    if (event.detail != this.data.companySidebarIndex) {
      this.setData({
        companySidebarIndex: event.detail,
      })
      this.companySidebarValue = this.data.companySidebarOptions[event.detail].name;
      this.loadCompanyData();
    }
  },

  detailsCompany(e) {
    if (this.data.serviceLevel != "全部") {
      wx.setStorageSync('essentialInformation', e.currentTarget.dataset['item'])
    }
    wx.navigateTo({
      url: "../../detailed/pages/detailsCompany/detailsCompany"
    })
  },

  onCloseShopChange({
    detail
  }) {
    this.setData({
      CloseShop: detail
    });
  },

  // 门店模块
  shopSidebarChange(event) {
    if (event.detail != this.data.Store) {
      this.setData({
        shopSidebarIndex: event.detail
      })
      if (this.data.shopSidebarOptions.length > 8) {
        if (this.data.PULL) {
          this.shopSidebarValue = this.data.shopSidebarOptions[event.detail + 8].name;
        } else {
          this.shopSidebarValue = this.data.shopSidebarOptions[event.detail].name;
        }
      } else {
        this.shopSidebarValue = this.data.shopSidebarOptions[event.detail].name;
      }
      this.loadShopData(false);
    }
  },

  detailsStore(e) {
    wx.setStorageSync('essentialInformation', e.currentTarget.dataset['item'])
    wx.navigateTo({
      url: "../../detailed/pages/detailsStore/detailsStore"
    })
  },


  // 设备模块
  equipmentSidebarChange(event) {
    if (event.detail != this.data.Store) {
      this.setData({
        equipmentSidebarIndex: event.detail
      })
      this.equipmentSidebarValue = this.data.equipmentSidebarOptions[event.detail].name
      this.loadEquipmentData();
    }
  },

  detailsEquipment(e) {
    let equipmentSidebarValue;
    let ModelId;
    if (e.currentTarget.dataset.modelid) {
      ModelId = e.currentTarget.dataset.modelid;
    }
    if (e.currentTarget.dataset.Sidebar) {
      equipmentSidebarValue = e.currentTarget.dataset.Sidebar;
    } else {
      equipmentSidebarValue = this.equipmentSidebarValue;
    }
    // wx.setStorageSync('essentialInformation', e.currentTarget.dataset['item'])
    wx.navigateTo({
      url: "../../detailed/pages/EquipmentData/EquipmentData?selectedCompany=" + this.data.selectedCompany.Id + "&equipmentSidebarValue=" + equipmentSidebarValue + "&CompCnFullName=" + this.data.selectedCompany.CompCnName + '&equipmentModelId=' + ModelId
    })
  },


  // 设备
  onEquipment(event) {
    this.setData({
      equipmentSidebarIndex: event.detail
    })
  },


  // 卡片
  cardSidebarChange(event) {

    if (event.detail != this.data.Store) {
      this.setData({
        cardSidebarIndex: event.detail
      })
      this.cardSidebarValue = this.data.cardSidebarOptions[event.detail].name
      this.loadCardData();
    }
  },
  // cardStore() {
  //   wx.navigateTo({
  //     url: "../../detailed/pages/CardData/CardData" + "?CompCnFullName=" + this.data.selectedCompany.CompCnFullName
  //   })
  // },


  // 点击改变选中项 
  SelectedItems(e) {

    let tempIndex = e.currentTarget.dataset.index;
    let tempArr = this.data.companyData;
    tempArr.forEach((value, index, tempArr) => {
      if (index == tempIndex) {
        // 赋值公司Id
        app.data.SelectCompanyId = value.Id;
        // 赋值公司名称
        app.data.companyName = value.CompCnName;
        value.Selected = true
        this.setData({
          selectedCompany: value
        })
      } else {
        value.Selected = false
      }
      return tempArr
    })
    this.setData({
      companyData: tempArr
    })
    // 更改题头
    wx.setNavigationBarTitle({
      title: "公司" + "_" + app.data.companyName
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
      disHistory: false,
    });
    // 按模块发起请求，并初始化页面参数
    if (this.data.tabIndex == 0) {
      this.companySize = 10;
      this.loadCompanyData();
    } else if (this.data.tabIndex == 1) {
      this.shopSize = 10;
      this.loadShopData(false);
    } else if (this.data.tabIndex == 2) {
      // this.equipmentSize = 10;
      this.loadEquipmentData();
    } else if (this.data.tabIndex == 3) {
      // this.cardSize = 10;
      this.loadCardData();
    }
  },

  search() {
    this.searchSubmitFn();
    // 按模块发起请求，并初始化页面参数
    if (this.data.tabIndex == 0) {
      this.companySize = 10;
      this.loadCompanyData();
    } else if (this.data.tabIndex == 1) {
      this.shopSize = 10;
      this.loadShopData(false);
    } else if (this.data.tabIndex == 2) {
      // this.equipmentSize = 10;
      this.loadEquipmentData();
    } else if (this.data.tabIndex == 3) {
      // this.cardSize = 10;
      this.loadCardData();
    }
  },

  onPULL() {
    // let arrIndex = this.data.shopSidebarOptions.findIndex(item => {
    //   return item.name === this.shopSidebarValue
    // })
    // if(!this.data.PULL&&arrIndex>8){
    //   this.setData({
    //     PULL: !this.data.PULL,
    //     shopSidebarIndex: arrIndex-8,
    //   })
    // }else if(this.data.PULL&&arrIndex<8){
    //   this.setData({
    //     PULL: !this.data.PULL,
    //     // shopSidebarIndex: arrIndex,
    //   })
    // }else{
    //   this.setData({
    //     PULL: !this.data.PULL,
    //     shopSidebarIndex: -1,
    //   })
    // }
    this.setData({
      PULL: !this.data.PULL,
      shopSidebarIndex: -1,
      shopData: []
    })
  },

  //取得本地储存函数 在生命周期函数onload中调用
  openHistorySearch: function () {
    this.setData({
      histroyRecord: wx.getStorageSync('searchRecord') || [], //若无储存则为空
    })
  },
  // 删除历史搜索记录
  historyDelFn: function () {
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
    this.loadCompanyData();
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

    this.setData({
      leftHeight: `height:${WinHeight-this.data.textareaHeight}px`
    })
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
    if (this.data.tabIndex == 0) {
      this.companySize += 10;
      this.loadCompanyData();
    } else if (this.data.tabIndex == 1) {
      this.shopSize += 10;
      this.loadShopData(false);
    } else if (this.data.tabIndex == 2) {
      // this.equipmentSize += 10;
      // this.loadEquipmentData();
    } else if (this.data.tabIndex == 3) {
      this.cardSize += 10;
      this.loadCardData();
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
      'page': this.companyPage,
      'size': this.companySize,
      'service_level': this.companySidebarValue,
      'keyword': this.data.keyword,
    }
    $api("GET", `api/company/clients/supplier_id/wx`, data)
      .then(res => {
        //处理页面数据
        if (res.data.data.Clients != null) {
          //添加勾选字段
          let dataArr = res.data.data.Clients;
          let sourceArr = [];
          for (let i = 0; i < dataArr.length; i++) {
            dataArr[i].Selected = false
            if (dataArr[i].CompLogo == "") {
              //TODO: 设置企业logo路径
              dataArr[i].ImgUrl = '../../images/icon/EmptyState.png';

              if (dataArr[i].Id == 238) {
                // dataArr[i].ImgUrl = '../../images/Seven.jpg'
                dataArr[i].ImgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp3.ssl.qhimgs3.com%2Ft015ac05ae6cfc2b9bf.jpg&refer=http%3A%2F%2Fp3.ssl.qhimgs3.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621580040&t=e7dacc706a184230faa939dde4a7b7ec'
              }
              if (dataArr[i].Id == 19) {
                dataArr[i].ImgUrl = '../../images/144174933331120806.png'
              }

              if (dataArr[i].Id == 252) {
                dataArr[i].ImgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp1.meituan.net%2Fwaimaipoi%2F546b6e09e7c1b1f19638158560c83fbd193905.jpg&refer=http%3A%2F%2Fp1.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621579704&t=6e3495c4eca350ea3a6bce5b53e07f0a'
              }
              if (dataArr[i].Id == 246 || dataArr[i].Id == 239) {
                dataArr[i].ImgUrl = 'http://box160680890859.nb3.site.my-qcloud.com/img/logo.png?1606809810'
              }
              if (dataArr[i].Id == 245) {
                dataArr[i].ImgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdown.51rc.com%2Fimagefolder%2FLogo%2FL10690000%2F10687337_b20170117114741.gif&refer=http%3A%2F%2Fdown.51rc.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621579739&t=3947391d473f627c275cc9b406fd569b'
              }
              if (dataArr[i].Id == 23) {
                dataArr[i].ImgUrl = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1543031502,979221429&fm=26&gp=0.jpg';
              }
            } else {
              dataArr[i].ImgUrl = app.data.url + 'file/' + dataArr[i].CompLogo;
            }
            if (dataArr[i].Id == 1) {
              dataArr[i].ImgUrl = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flogoju.cn%2Fwp-content%2Fuploads%2F2019%2F09%2Flogoju.cn_2019-09-19_01-54-56.jpg&refer=http%3A%2F%2Flogoju.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1621579976&t=cce2f0f2f02f817dc0d42af9b1880910'
            }
            sourceArr.push(dataArr[i])
          };
          if (this.data.selectedCompany == null) {
            dataArr[0].Selected = true;
            this.setData({
              selectedCompany: dataArr[0]
            })

            // 初始化选中公司Id
            app.data.SelectCompanyId = sourceArr[0].Id
            // 初始化选中公司名称
            app.data.companyName = sourceArr[0].CompCnName
            // 更改题头
            wx.setNavigationBarTitle({
              title: "公司" + "_" + app.data.companyName
            })
          } else {
            let tempIndex = sourceArr.findIndex((value, index, array) => value.Id == this.data.selectedCompany.Id)
            if (tempIndex != -1) {
              sourceArr[tempIndex].Selected = true;
              this.setData({
                selectedCompany: sourceArr[tempIndex]
              })

              // 初始化选中公司Id
              app.data.SelectCompanyId = sourceArr[tempIndex].Id
              // 初始化选中公司名称
              app.data.companyName = sourceArr[tempIndex].CompCnName
              // 更改题头
              wx.setNavigationBarTitle({
                title: "公司" + "_" + app.data.companyName
              })
            }

          }
          this.setData({
            companyData: sourceArr,
          })
        } else {
          this.setData({
            companyData: [],
          });
          return
        }


        //处理侧边导航栏数据
        if (res.data.data.ServiceLevels != null) {
          let service = [];
          let name = [];
          let total = [];
          res.data.data.ServiceLevels.forEach(function (value, index) {
            name.push(value.split("(")[0])
            total.push(value.split("(")[1].split(")")[0])
            service.push({
              name: name[index],
              total: total[index]
            })
          })
          // if (res.data.data.ServiceLevels.length == 3) {
          //   service[2] = ({
          //     'name': name[3],
          //     'total': total[3]
          //   })
          // } else 
          if (res.data.data.ServiceLevels.length == 4) {
            service[2] = ({
              'name': name[3],
              'total': total[3]
            })
            service[3] = ({
              'name': name[2],
              'total': total[2]
            })
          }
          this.setData({
            companySidebarOptions: service
          })
        }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 门店 数据获取
  loadShopData(first) {
    // if (this.data.shopLoading === false) {
    this.setData({
      shopLoading: true
    })
    // }
    let data;
    if (this.data.selectedCompany !== null) {
      data = {
        'page': this.shopPage,
        'size': this.shopSize,
        'is_close': this.data.CloseShop,
        'client_id': this.data.selectedCompany.Id,
        'keyword': this.data.keyword,
        'shop_area': this.shopSidebarValue,
      }
    }
    $api("GET", `api/shops/wx`, data)
      .then(res => {
        if (res.data.data === null) {
          return
        }
        // if (res.data.data.Shops == null) {
        this.setData({
          shopData: [],
        })
        if (res.data.data.ShopAreas == null || res.data.data.ShopAreas.length <= 1) {
          this.setData({
            shopSidebarOptions: [{
              'name': '全部',
              "total": 0
            }],
            shopSidebarOptionsTwo: [{
              'name': '全部',
              "total": 0
            }],
            shopSidebarOptionsOne: [{
              'name': '全部',
              "total": 0
            }],
          })
        }
        // } else {
        // if (res.data.data.ShopAreas == null) {
        //   // 非全部时
        // this.setData({
        //   shopData: res.data.data.Shops,
        // })
        // } else {

        // 全部时
        // let StoreData = this.data.shopSidebarOptions;
        let service = [];
        let name = [];
        let total = [];
        res.data.data.ShopAreas.forEach(function (value, index) {
          name = value.split("(")[0]
          total = value.split("(")[1].split(")")[0]
          service.push({
            name: name,
            total: total
          })
        })
        if (first) {
          if (service.length <= 8) {
            this.setData({
              PULL: true
            })
          } else {
            this.setData({
              PULL: false
            })
          }
        }
        this.setData({
          shopData: res.data.data.Shops,
          shopSidebarOptions: service,
          shopSidebarOptionsOne: service.slice(0, 8),
          shopSidebarOptionsTwo: service.slice(8),
        })
        // }
        // }
        // if (this.data.shopLoading === true) {
        this.setData({
          shopLoading: false
        })
        // }
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 设备 数据获取
  loadEquipmentData() {
    this.setData({
      equipmentLoading: true
    })
    let data;
    if (this.data.selectedCompany !== null) {
      let equipmentval = this.equipmentSidebarValue
      if (equipmentval === '网关' || equipmentval === '4G') {
        equipmentval = equipmentval.slice(0, 2) + '路由器'
      }
      data = {
        'client_id': this.data.selectedCompany.Id,
        'keyword': this.data.keyword,
        'equipment_type': equipmentval,
      }
    }
    $api("GET", `api/equipments/wx`, data)
      .then(res => {
        if (res.data.data === null) {
          return
        }
        if (res.data.data.Equipments == null) {
          this.setData({
            equipmentData: [],
            // equipmentSidebarOptions: [{
            //   'name': '全部',
            //   "total": 0
            // }],
          })
          if (res.data.data.EquipmentTypes == null || res.data.data.EquipmentTypes.length <= 1) {
            this.setData({
              equipmentSidebarOptions: [{
                'name': '全部',
                "total": 0
              }],
            })
          }
        } else {
          // if (res.data.data.EquipmentTypes == null) {
          //   // 非全部时
          //   this.setData({
          //     equipmentData: res.data.data.Equipments,
          //   })
          // } else {
          // 全部时
          let service = [{
            'name': '全部',
            "total": 0
          }];
          let name = [];
          let total = [];
          let wholeTotal = 0;
          res.data.data.EquipmentTypes.forEach(function (value, index) {
            if (value.EquipmentTypeName === '网关路由器' || value.EquipmentTypeName === '4G路由器') {
              name = value.EquipmentTypeName.slice(0, 2)
            } else {
              name = value.EquipmentTypeName
            }
            total = value.EquipmentTypeCount
            service.push({
              name: name,
              total: total
            })
            wholeTotal += value.EquipmentTypeCount
          })
          service[0].total = wholeTotal
          this.setData({
            equipmentData: res.data.data.Equipments,
            equipmentSidebarOptions: service,
          })
        }
        // }
        this.setData({
          equipmentLoading: false
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 卡片
  loadCardData() {
    this.setData({
      cardLoading: true
    })
    let cardData;
    if (this.data.selectedCompany !== null) {
      cardData = {
        'page': this.cardPage,
        'size': this.cardSize,
        'client_id': this.data.selectedCompany.Id,
        'keyword': this.data.keyword,
        'card_operator': this.cardSidebarValue.split("(")[0],
      }
    }
    $api("GET", "api/cards/wx", cardData)
      .then(res => {
        if (res.data.data === null) {
          return
        }
        if (res.data.data.Cards == null) {
          this.setData({
            cardData: [],
            // cardSidebarOptions: [{
            //   'name': '全部',
            //   "total": 0
            // }],
          })
          if (res.data.data.CardOperators == null || res.data.data.CardOperators.length <= 1) {
            this.setData({
              cardSidebarOptions: [{
                'name': '全部',
                "total": 0
              }],
            })
          }
        } else {
          // if (res.data.data.CardOperators == null || res.data.data.CardOperators.length === 1) {
          //   // 非全部时
          //   this.setData({
          //     cardData: res.data.data.Cards,
          //   })
          // } else {
          // 全部时
          let service = [];
          let name = [];
          let total = [];
          res.data.data.CardOperators.forEach(function (value, index) {
            name = value.split("(")[0]
            total = value.split("(")[1].split(")")[0]
            service.push({
              name: name,
              total: total
            })
          })
          this.setData({
            cardData: res.data.data.Cards,
            cardSidebarOptions: service,
          })
        }
        // }
        this.setData({
          cardLoading: false
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  }

})