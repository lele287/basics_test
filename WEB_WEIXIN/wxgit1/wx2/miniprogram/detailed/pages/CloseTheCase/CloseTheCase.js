//获取应用实例
const app = getApp()
const $api = require('../../../util/api.js').API;
import Dialog from '../../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 故障分类
    FaultClass: [],
    FaultClassData: [],
    FaultClassState: false,
    FaultClassVal: '请选择故障分类',
    FaultClassSlide: '',
    FaultClassIndex: 0,
    FaultClassIx: 0,
    FaultClassId: '',
    // 故障细项
    Detail: [],
    DetailData: [],
    DetailState: false,
    DetailVal: '请选择故障细项',
    DetailSlide: '',
    DetailIndex: 0,
    DetailIx: 0,
    DetailId: '',

    // 截至日期
    date: '',
    show: false,

    checked: false,
    circleNumber: 100,
    radio: '自责',
    failuRereason: "",
    solveWay: "",
    PostponementReason: "",
    DetailsData: {},
    ProFinishedTime: 0,
    TotalDuration: 0,
    SurplusDuration: 0,
    SurplusTest: '',
    color: '#fff',
    imageUrl: "",

  },

  onPostponement({
    detail
  }) {
    // 需要手动对 checked 状态进行更新
    this.setData({
      checked: detail
    });
  },

  onResponsibility(event) {
    this.setData({
      radio: event.detail,
    });
  },


  // 故障分类
  onFaultClass(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      FaultClassSlide: value,
      FaultClassIndex: index
    });
  },
  onFaultClassShow() {
    this.setData({
      FaultClassState: true
    });
  },
  onFaultClassHide() {
    this.setData({
      FaultClassState: false
    });
  },
  FaultClassYes() {
    this.setData({
      FaultClassIx: this.data.FaultClassIndex,
      FaultClassVal: this.data.FaultClassSlide,
      // 门店数据绑定
      FaultClassId: this.data.FaultClass[this.data.FaultClassIndex].Id,
    })
  },

  // 截至日期
  shijianc(num) {
    var date = new Date(num)
    var Y = date.getFullYear() + '-'
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
    // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
    return Y + M + D;
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },

  // 故障细项
  onDetail(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.setData({
      DetailSlide: value,
      DetailIndex: index
    });
  },
  onDetailShow() {
    this.setData({
      DetailState: true
    });
  },
  onDetailHide() {
    this.setData({
      DetailState: false
    });
  },
  DetailYes() {
    this.setData({
      DetailIx: this.data.DetailIndex,
      DetailVal: this.data.DetailSlide,
      // 门店数据绑定
      DetailId: this.data.Detail[this.data.DetailIndex].Id,
    })
  },

  // 提交 Button 提示
  onSubmit() {
    let myData = this.data;
    if (myData.checked) {
      if (myData.date.trim() === "" || myData.PostponementReason.trim() === "") {
        wx.showToast({
          title: '请填写完整信息,再进行提交!',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      Dialog.confirm({
        title: '提示信息',
        message: '请确认是否暂缓提交！',
      })
    } else {
      if (myData.FaultClassVal === "请选择故障分类" || myData.DetailVal === "请选择故障细项" || myData.radio === "" || myData.failuRereason.trim() === "" || myData.solveWay.trim() === "") {
        wx.showToast({
          title: '请填写完整信息,再进行提交!',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      Dialog.confirm({
        title: '提示信息',
        message: '请确认是否结案提交！',
      })
    }

    // Dialog.confirm({
    //     title: '提示信息',
    //     message: '是否确认提交！',
    //   })
    //   .then(() => {
    //     // on confirm
    //   })
    //   .catch(() => {
    //     // on cancel
    //   });
  },

  // 确认事件
  ReplacementEquipment() {
    if (this.data.checked) {
      // 暂缓
      this.PostponementRequest();
    } else {
      // 结案
      this.CloseCaseRequest();
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(options.DetailsData));
    this.setData({
      DetailsData: JSON.parse(options.DetailsData)
    })
    this.faultClassRequest();
    this.faultDetailRequest();
    this.surplusTimeRequest();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 数据默认项
    this.setData({
      date: this.shijianc(new Date()),
      currentTime: this.data.byDate,
    });
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

  // 故障分类
  faultClassRequest() {
    $api("GET", "api/statics/EXCEPTIONEQUIPMENT")
      .then(res => {
        var myData = res.data.data
        var StaticInfo = [];
        myData.forEach(element => {
          StaticInfo.push(element.StaticInfo)
        });
        this.setData({
          FaultClass: myData,
          FaultClassData: StaticInfo,
          FaultClassSlide: StaticInfo[0]
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })

  },

  // SLA时间计算
  surplusTimeRequest() {
    $api("GET", "api/maintainLists/list_no?list_no=" + this.data.DetailsData.MaintainListNo)
      .then(res => {
        // <60黄色 60-85蓝色 >85绿色
        var ProFinishedTime = new Date(res.data.data.ProFinishedTime).getTime();
        var RepairTime = new Date(res.data.data.RepairTime).getTime();
        // var ProFinishedTime = new Date().getTime() + 1 * 60 * 60 * 1000+5000*60;
        // var RepairTime = new Date().getTime() - 3 * 60 * 60 * 1000+5000*60;
        var TotalDuration;
        var SurplusDuration;
        if (ProFinishedTime > 0 && RepairTime > 0) {
          TotalDuration = ProFinishedTime - RepairTime;
          SurplusDuration = (new Date().getTime()) - RepairTime;
        }
        // 计算百分比
        var circleNumber = 100;
        if (SurplusDuration > 0) {
          circleNumber = parseInt(SurplusDuration / TotalDuration * 100);
        }
        // 按百分比赋值颜色
        var color;
        if (circleNumber >= 100) {
          circleNumber=100;
          color = "#FF0000";
        } else if (circleNumber > 85 && circleNumber < 100) {
          color = "#00FF7F";
        } else if (circleNumber >= 60 && circleNumber <= 85) {
          color = "#00FFFF";
        } else if (circleNumber >= 0 && circleNumber < 60) {
          color = "#FFD700";
        }else if (circleNumber < 0) {
          circleNumber=0;
          color = "#FFFF00";
        }

        let myDate = ProFinishedTime - (new Date().getTime());
        let SurplusTest;
        if (myDate <= 0) {
          myDate = (new Date().getTime()) - ProFinishedTime;
          SurplusTest = "超时时间:  -" + Math.ceil(myDate / 1000 / 60) + "分钟"
        } else {
          myDate = ProFinishedTime - (new Date().getTime());
          SurplusTest = "剩余时间:  " + Math.ceil(myDate / 1000 / 60) + "分钟"
        }
        this.setData({
          ProFinishedTime: app.DateFormat(ProFinishedTime, "HMS"),
          TotalDuration: TotalDuration,
          SurplusDuration: SurplusDuration,
          SurplusTest: SurplusTest,
          circleNumber: circleNumber,
          color: color
        })

      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 故障细项
  faultDetailRequest() {
    $api("GET", "api/equipment/exception/class?exception_class_id=6")
      .then(res => {
        var myData = res.data.data
        var ExceptionName = [];
        myData.forEach(element => {
          ExceptionName.push(element.ExceptionName)
        });
        this.setData({
          Detail: myData,
          DetailData: ExceptionName,
          DetailSlide: ExceptionName[0]
        })
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 结案
  CloseCaseRequest() {
    //     结案：
    // put api/maintainLists/close
    // {
    //    "ID" : 维修ID,
    //    "RepairListNo" : 报修单号,
    //    "MaintainListNo" : 维修单号,
    //    "EquipmentModelName" : 设备型号,
    //    "EquipmentModelID" : 设备型号ID,
    //    "EquipmentCode" : 设备编号,
    //    "ExceptionClassName" : 故障分类,
    //    "ExceptionName" :报修故障名称,
    //    "ExceptionID" : 报修故障名称ID,
    //    "ExceptionClassID" :故障分类ID,
    //    "ExceptionStation" : 问题描述,
    //    "ResolveStation" : 处理方案,
    //    "FactExceptionClassName" : 实际故障分类,
    //    "FactExceptionClassID" : 实际故障分类ID,
    //    "FactExceptionID" : 实际故障名称ID,
    //    "FactExceptionName" : 实际故障名称,
    //    "Responsibility" : 权责划分
    // }
    console.log(this.data.FaultClassId);
    let DetailsData = this.data.DetailsData;
    let myData = {
      "ID": parseInt(DetailsData.MaintainId),
      "RepairListNo": DetailsData.RepairListNo,
      "MaintainListNo": DetailsData.MaintainListNo,
      "EquipmentModelName": DetailsData.EquipmentModelName,
      "EquipmentModelID": DetailsData.EquipmentModelID,
      "EquipmentCode": DetailsData.EquipmentCode,
      "ExceptionClassName": DetailsData.ExceptionClassName,
      "ExceptionName": DetailsData.ExceptionName,
      "ExceptionID": DetailsData.ExceptionID,
      "ExceptionClassID": DetailsData.ExceptionClassID,
      "ExceptionStation": this.data.failuRereason,
      "ResolveStation": this.data.solveWay,
      "FactExceptionClassName": this.data.FaultClassVal,
      "FactExceptionClassID": this.data.FaultClassId,
      "FactExceptionID": this.data.DetailId,
      "FactExceptionName": this.data.DetailVal,
      "Responsibility": this.data.radio,
    }
    $api("PUT", "api/maintainLists/close", myData)
      .then(res => {
        wx.showToast({
          title: '提交成功!',
          icon: 'none',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 1000);
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },

  // 暂缓
  PostponementRequest() {
    // api/maintainLists/break
    // {
    //     'ID': 维修ID,
    //     'MaintainListNo': 维修单号,
    //     'isBroken': 1,
    //     'RepairListNo': 报修单号,
    //     'ChargeBreakReason': 暂缓原因,
    //     'ProContinueTime': 截止时间
    // }
    let DetailsData = this.data.DetailsData;
    let myData = {
      "ID": parseInt(DetailsData.MaintainId),
      "RepairListNo": DetailsData.RepairListNo,
      "MaintainListNo": DetailsData.MaintainListNo,
      "isBroken": 1,
      "ChargeBreakReason": this.data.PostponementReason,
      "ProContinueTime": this.data.date,
    }
    $api("PUT", "api/maintainLists/break", myData)
      .then(res => {
        wx.showToast({
          title: "暂缓成功！",
          icon: 'none',
          duration: 1000
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 1000);
      })
      .catch(err => {
        //请求失败
        console.log(err);
      })
  },
})