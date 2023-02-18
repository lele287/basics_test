var uriPrefix = getApp().globalData.uriPrefix;

function getHttpRequest(url,params,doSuccess){
      //开启加载画面
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 100000
      })
      wx.request({
        url: uriPrefix+url,
        data: params,
        method:"GET",
        header:{
          "Content-Type":"application/x-www-form-urlencoded"
        },
        success:function(res){
          wx.hideToast();
          doSuccess(res.data);
        }
      })
}

function postHttpRequest(url, params, doSuccess){
  //开启加载画面
  wx.showToast({
    title: '加载中',
    icon: 'loading',
    duration: 100000
  })
  wx.request({
    url: uriPrefix+url,
    data:params,
    method:"POST",
    header:{
      "Content-type":"application/json"
    },
    success:function(res){
      wx.hideToast();
      doSuccess(res.data);
    }
  })
}
module.exports = {
  getHttpRequest : getHttpRequest,
  postHttpRequest: postHttpRequest
}