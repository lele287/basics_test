import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标红提示
    Marked: [false, false, false, false, false, false, false, false, false],
    // 设备分类
    classificationData: [],
    classificationState: false,
    classificationVal: '',
    classificationSlide: '',
    classificationId: [],
    classificationIndex: 0,
    classificationIx: '',
    // 设备类型
    SiteArea: '',
    SiteAreaData: ['请预先选择设备分类'],
    SiteAreaState: false,
    SiteAreaVal: '',
    SiteAreaSlide: '',
    SiteAreaId: [],
    SiteAreaIndex: '',
    SiteAreaIx: '',
    // 设备名称
    equipmentNameData: ['请预先选择设备类型'],
    equipmentNameState: false,
    equipmentNameVal: '',
    equipmentNameSlide: '',
    equipmentNameId: [],
    equipmentNameIndex: 0,
    equipmentNameIx: '',
    // 设备型号
    equipmentModelData: ['请预先选择设备名称'],
    equipmentModelState: false,
    equipmentModelVal: '',
    equipmentModelSlide: '',
    equipmentModelId: [],
    equipmentModelIndex: 0,
    equipmentModelIx: '',
    // 设备状态
    DeviceStatusData: [],
    DeviceStatusState: false,
    DeviceStatusVal: '',
    DeviceStatusSlide: '',
    DeviceStatusId: [],
    DeviceStatusIndex: 0,
    DeviceStatusIx: '',
    // 业务类型
    BusinessTypeData: [],
    BusinessTypeState: false,
    BusinessTypeVal: '',
    BusinessTypeSlide: '',
    BusinessTypeId: [],
    BusinessTypeIndex: 0,
    BusinessTypeIx: '',
    // 入库日期
    show: false,
    showbut: false,
    currentDate: new Date().getTime(),
    currentDateYes: '',
    currentTime: '',
    MinDate: new Date(2020, 1, 1).getTime(),
    maxDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    // 备注
    message: "",
  },
  classificationNo() {
    this.setData({
      customerState: false
    });
  },
  // 设备分类
  onclassification(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      classificationSlide: value,
      classificationIndex: index
    });
    console.log(value);
    console.log(index);
  },
  onclassificationDisplay() {
    this.setData({
      classificationState: true
    });
  },
  onclassificationBlank() {
    this.setData({
      classificationState: false
    });
  },
  classificationYes() {
    // console.log(this.data.classificationIndex);
    this.setData({
      classificationState: false
    });
    // 判断是否切换选中项
    if (this.data.classificationSlide != this.data.classificationVal) {
      this.setData({
        SiteAreaVal: '',
        SiteAreaData: ['请预先选择设备分类'],
        equipmentNameVal: '',
        equipmentNameData: ['请预先选择设备类型'],
        equipmentModelVal: '',
        equipmentModelData: ['请预先选择设备名称'],
      })
    }
    this.setData({
      classificationVal: this.data.classificationSlide
    });
    const _this = this;
    wx.request({
      url: app.data.url+'api/equipmentTypes/class?equipmentClassID=' + this.data.classificationId[this.data.classificationIndex],
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          _this.setData({
            SiteAreaVal: '',
            classificationIx: _this.data.classificationIndex
          })
          if (res.data.data) {
            let SiteData = [];
            let SiteId = [];
            for (var i = 0; i < res.data.data.length; i++) {
              SiteData.push(res.data.data[i].EquipmentTypeName)
              SiteId.push(res.data.data[i].ID)
            }
            _this.setData({
              SiteAreaData: SiteData,
              SiteAreaId: SiteId,
              SiteAreaSlide: SiteData[0],
              SiteAreaIndex: 0,
              SiteArea: res.data.data
            })
          } else {
            _this.setData({
              SiteAreaData: [],
              SiteAreaId: '',
              SiteAreaSlide: '',
              SiteAreaIndex: 0,
              SiteArea: ''
            })
          }
        }
      }
    })
  },
  // 设备类型
  onSiteArea(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      SiteAreaSlide: value,
      SiteAreaIndex: index
    });
  },
  onSiteAreaDisplay() {
    this.setData({
      SiteAreaState: true
    });
  },
  onSiteAreaBlank() {
    this.setData({
      SiteAreaState: false
    });
  },
  SiteAreaYes() {

    this.setData({
      SiteAreaState: false
    });
    // 判断是否选择过设备分类
    if (this.data.classificationVal) {
      // 判断是否切换选中项
      if (this.data.SiteAreaSlide != this.data.SiteAreaVal) {
        this.setData({
          equipmentNameVal: '',
          equipmentNameData: ['请预先选择设备类型'],
          equipmentModelVal: '',
          equipmentModelData: ['请预先选择设备名称'],
        })
      }
      this.setData({
        SiteAreaVal: this.data.SiteAreaSlide,
        SiteAreaIx: this.data.SiteAreaIndex,
      });

      // console.log(this.data.SiteAreaIndex);
      // console.log(this.data.SiteAreaId[this.data.SiteAreaIx]);
      const _this = this;
      wx.request({
        url: app.data.url+'api/equipmentNames/type?equipmentTypeID=' + this.data.SiteAreaId[this.data.SiteAreaIx],
        method: 'GET',
        data: {},
        header: app.data.header,
        success(res) {
          let verificationToken = app.verificationToken(res);
          if (verificationToken) {
            // _this.setData({
            //   equipmentNameVal: '',
            //   equipmentNameIx: _this.data.equipmentNameIndex
            // })
            if (res.data.data) {
              let SiteData = [];
              let SiteId = [];
              for (var i = 0; i < res.data.data.length; i++) {
                SiteData.push(res.data.data[i].Name)
                SiteId.push(res.data.data[i].ID)
              }
              _this.setData({
                equipmentNameData: SiteData,
                equipmentNameId: SiteId,
                equipmentNameSlide: SiteData[0],
                equipmentNameIndex: 0,
                equipmentName: res.data.data
              })
            } else {
              _this.setData({
                equipmentNameData: [],
                equipmentNameId: '',
                equipmentNameSlide: '',
                equipmentNameIndex: 0,
                equipmentName: ''
              })
            }
          }
        }
      })
    }
  },
  SiteAreaNo() {
    this.setData({
      SiteAreaState: false
    });
  },
  // 设备名称
  onequipmentName(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      equipmentNameSlide: value,
      equipmentNameIndex: index
    });
  },
  onequipmentNameDisplay() {
    this.setData({
      equipmentNameState: true
    });
  },
  onequipmentNameBlank() {
    this.setData({
      equipmentNameState: false
    });
  },
  equipmentNameYes() {
    this.setData({
      equipmentNameState: false
    });

    // 判断是否选择过设备类型
    if (this.data.SiteAreaVal) {
          // 判断是否切换选中项
    if (this.data.equipmentNameSlide != this.data.equipmentNameVal) {
      this.setData({
        equipmentModelVal: '',
        equipmentModelData: ['请预先选择设备名称'],
      })
    }
      this.setData({
        equipmentNameVal: this.data.equipmentNameSlide,
        equipmentNameIx: this.data.equipmentNameIndex,
      });

      console.log(this.data.equipmentNameId[this.data.equipmentNameIx]);
      const _this = this;
      wx.request({
        url: app.data.url+'api/equipmentModels/name?equipmentNameID=' + this.data.equipmentNameId[this.data.equipmentNameIx],
        method: 'GET',
        data: {},
        header: app.data.header,
        success(res) {
          let verificationToken = app.verificationToken(res);
          if (verificationToken) {
            _this.setData({
              equipmentModelVal: '',
              equipmentModelIx: _this.data.equipmentModelIndex
            })
            if (res.data.data) {
              let SiteData = [];
              let SiteId = [];
              for (var i = 0; i < res.data.data.length; i++) {
                SiteData.push(res.data.data[i].EquipmentModelName)
                SiteId.push(res.data.data[i].ID)
              }
              _this.setData({
                equipmentModelData: SiteData,
                equipmentModelId: SiteId,
                equipmentModelSlide: SiteData[0],
                equipmentModelIndex: 0,
                equipmentModel: res.data.data
              })
            } else {
              _this.setData({
                equipmentModelData: [],
                equipmentModelId: '',
                equipmentModelSlide: '',
                equipmentModelIndex: 0,
                equipmentModel: ''
              })
            }
          }
        }
      })
    }
  },
  equipmentNameNo() {
    this.setData({
      equipmentNameState: false
    });
  },
  // 设备型号
  onequipmentModel(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      equipmentModelSlide: value,
      equipmentModelIndex: index
    });
  },
  onequipmentModelDisplay() {
    this.setData({
      equipmentModelState: true
    });
  },
  onequipmentModelBlank() {
    this.setData({
      equipmentModelState: false
    });
  },
  equipmentModelYes() {
    this.setData({
      equipmentModelState: false
    });
    // 判断是否选择过设备名称
    if (this.data.equipmentNameVal) {
      this.setData({
        equipmentModelVal: this.data.equipmentModelSlide,
        equipmentModelIx: this.data.equipmentModelIndex,
      });
    }
  },
  equipmentModelNo() {
    this.setData({
      equipmentModelState: false
    });
  },
  // 设备状态
  onDeviceStatus(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      DeviceStatusSlide: value,
      DeviceStatusIndex: index
    });
  },
  onDeviceStatusDisplay() {
    this.setData({
      DeviceStatusState: true
    });
  },
  onDeviceStatusBlank() {
    this.setData({
      DeviceStatusState: false
    });
  },
  DeviceStatusYes() {
    this.setData({
      DeviceStatusState: false
    });
    this.setData({
      DeviceStatusVal: this.data.DeviceStatusSlide,
      DeviceStatusIx: this.data.DeviceStatusIndex,
    });
  },
  DeviceStatusNo() {
    this.setData({
      DeviceStatusState: false
    });
  },
  // 业务类型
  onBusinessType(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    // Toast(`当前值：${value}, 当前索引：${index}`);
    this.setData({
      BusinessTypeSlide: value,
      BusinessTypeIndex: index
    });
  },
  onBusinessTypeDisplay() {
    this.setData({
      BusinessTypeState: true
    });
  },
  onBusinessTypeBlank() {
    this.setData({
      BusinessTypeState: false
    });
  },
  BusinessTypeYes() {
    this.setData({
      BusinessTypeState: false
    });
    this.setData({
      BusinessTypeVal: this.data.BusinessTypeSlide,
      BusinessTypeIx: this.data.BusinessTypeIndex,
    });
  },
  BusinessTypeNo() {
    this.setData({
      BusinessTypeState: false
    });
  },
  // 入库日期
  onClose() {
    this.setData({
      show: false
    });
  },
  onCloseButDate() {
    this.setData({
      showbut: false
    });
  },
  showPopup() {
    this.setData({
      showbut: true
    });
  },
  shijianc(num) {
    var date = new Date(num)
    // console.log(date)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ''
    // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  TimeSelectionYes() {
    this.setData({
      showbut: false
    });
    this.setData({
      currentDateYes: this.shijianc(this.data.currentDate),
      currentTime: this.data.currentDate,
    });
  },
  TimeSelectionNo() {
    this.setData({
      showbut: false
    });
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
    const _this = this;
    // 设备分类数据请求
    wx.request({
      url: app.data.url+'api/equipmentClasses/all',
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          // console.log(res.data.data);
          let ClientData = [];
          let ClientId = [];
          for (var i = 0; i < res.data.data.length; i++) {
            ClientData.push(res.data.data[i].EquipmentClassName)
            ClientId.push(res.data.data[i].ID)
          }
          _this.setData({
            classificationData: ClientData,
            classificationId: ClientId
          })
          _this.setData({
            classificationSlide: ClientData[0],
          });
        }
      },
      fail(err) {
        console.log(err);
      }
    })

    // 设备状态
    wx.request({
      url: app.data.url+'api/statics/EQUIPMENTSTATE',
      method: 'GET',
      data: {},
      header: app.data.header,
      success(res) {
        let verificationToken = app.verificationToken(res);
        if (verificationToken) {
          // console.log(res.data.data);
          let ClientData = [];
          let ClientId = [];
          for (var i = 0; i < res.data.data.length; i++) {
            ClientData.push(res.data.data[i].StaticInfo)
            ClientId.push(res.data.data[i].Id)
          }
          _this.setData({
            DeviceStatusData: ClientData,
            DeviceStatusId: ClientId
          })
          _this.setData({
            DeviceStatusSlide: ClientData[0],
          });
        }
      },
      fail(err) {
        console.log(err);
      }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})