App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
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
  onError: function (msg) {

  },
    /**
     * 'https://www.qiaojialin.cn/equipmentTool/'
   * 'http://localhost:9000/0605_binding/'
   */
  globalData: {
    header: { 'Cookie': '' },
    uriPrefix: 'https://netop.sharewis.com:8000/wechat/',
    user: null,
    client:null,
    shop:null,
    step:0,
    unicornCode:null,
    moveCode:null,
    telecomCode:null,
    mCode:null,
    bCode:null,
    cardArray:[],
    shop_code:''
  },
    function(args) {
        var that = this;
        var header = {
            'content-type': 'application/json; charset=utf-8',
            'cookie': wx.getStorageSync("sessionid")
        };
        reqObj=wx.request({
            url: that.baseUrl + args.url,
            method: "POST",
            header: header,
            data: JSON.stringify(args.data),
            success(res) {
                var cookie = res.header["Set-Cookie"];
                if (cookie != null) {
                    wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
                }
                if (args.success) args.success(res);
            },
            complete(res) {
                if (args.complete) args.complete(res);
            }
        })
    }
})
