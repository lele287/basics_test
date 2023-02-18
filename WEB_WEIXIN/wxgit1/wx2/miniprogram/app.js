//app.js
App({
  data: {
    url: 'https://netop.sharewis.com:8000/server/',
    // url: 'http://netop.sharewis.com:8087/server/',
    header: {
      'content-type': 'application/json',
      'Authorization': '',
    },
    SelectCompanyId: "238",
    companyName: ''
  },
  verificationToken(res) {
    // console.log(wx.getStorageSync('mytoken'));
    if (res.data.message == 'invalid or expired jwt' || res.statusCode == 401) {
      wx.showToast({
        title: '登录过期请重新登录!',
        icon: 'none',
        duration: 1500
      })
      wx.removeStorage({
        key: 'mytoken',
        success: function (res) {
          console.log(res)
        }
      })
      wx.removeStorage({
        key: 'userAccount',
        success: function (res) {
          console.log(res)
        }
      })
      setTimeout(function () {
        wx.redirectTo({
          url: "/pages/login/login"
        })
      }, 1500);
      return false;
    }
    return true;
  },

  // 时间格式化
  DateFormat(date, type) {
    if (date === '' || date === null) {
      return '-';
    }
    let myDate = new Date(date);
    let Time = myDate.getTime();
    let Y = myDate.getFullYear();
    let M = myDate.getMonth() + 1;
    let D = myDate.getDate();
    let H = myDate.getHours();
    let MS = myDate.getMinutes();
    let S = myDate.getSeconds();
    if (Time > 0) {
      if (String(D).length === 1) {
        D = "0" + String(D)
      }
      if (String(M).length === 1) {
        M = "0" + String(M)
      }
      if (type === 'HMS') {
        if (String(H).length === 1) {
          H = "0" + String(H)
        }
        if (String(MS).length === 1) {
          MS = "0" + String(MS)
        }
        if (String(S).length === 1) {
          S = "0" + String(S)
        }
        return Y + "-" + M + "-" + D + ' ' + H + ':' + MS + ':' + S;
      } else {
        return Y + "-" + M + "-" + D;
      }
    } else {
      return '-';
    }
  },

  // 数据筛取
  DataScreening(myData) {
    for (let key in myData) {
      if (myData[key] == '') {
        myData[key] = '-'
      }
    }
    return myData;
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

    // wx.cloud.init({
    //   env: "lkl-9giab0dp67f7be4a"
    // })
    // let _this = this;
    // wx.request({
    //   url: _this.data.url + 'api/company/clients/supplier_id/wx',
    //   method: 'GET',
    //   data: {
    //     'page': 1,
    //     'size': 1,
    //     'service_level': '',
    //     'keyword': '',
    //   },
    //   header: _this.data.header,
    //   success(res) {
    //     console.log(res);
    //   }
    // })


    // let _this = this
    // try {
    //   wx.getStorage({
    //     key: 'userAccount',
    //     success: function (res) {
    //       console.log(res.data)
    //       _this.data.UserName = res.data
    //     }
    //   })
    // } catch (e) {
    //   console.log(e);
    // }

    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     // env 参数说明：
    //     //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
    //     //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
    //     //   如不填则使用默认环境（第一个创建的环境）
    //     // env: 'my-env-id',
    //     traceUser: true,
    //   })
    // }

    // this.globalData = {}
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },
  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  // 监控异常
  // onError: function (err) {
  //   console.log('拦截到的错误内容为：' + err);
  // },


})