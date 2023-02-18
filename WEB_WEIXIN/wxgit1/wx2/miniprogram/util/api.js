//获取应用实例
const app = getApp()
const GET = 'GET';
const POST = 'POST';
const PUT = 'PUT';
const FORM = 'FORM';
const DELETE = 'DELETE';


function httpRequest(method, url, data) {
  // wx.showLoading({
  //   title: '数据加载中',
  // })

  return new Promise(function (resolve, reject) {
    let header = app.data.header;
    let rUrl = app.data.url + url;
    wx.request({
      url: rUrl,
      method: method,
      data: method === POST ? JSON.stringify(data) : data,
      header: header,
      success(res) {
        //请求成功
        if (res.data.message == 'invalid or expired jwt' || res.statusCode == 401) {
          reject('登录过期请重新登录!');
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
        } else if(res.statusCode <200 || res.statusCode >300){
          console.log(res.data.message);
          if(url=="api/maintainLists/break"){
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1000
            })
          }
          return;
        } else {
          // if(res.data.data===null){
          //   return
          // }
          resolve(res);
        }
        // wx.hideLoading()
      },
      fail(err) {
        //请求失败
        reject(err)
      }
    })
  })
}

// const API = {
//   httpRequest: (method, url, data) => httpRequest(method, url, data),
// };
module.exports = {
  API: httpRequest
}