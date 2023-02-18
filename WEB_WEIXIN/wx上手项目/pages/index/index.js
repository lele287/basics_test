//Page Object
Page({
  data: {
    
  },
  //options(Object)
  onLoad: function(options){
    wx.request({
      url:'http://v.juhe.cn/joke/content/list.php',
      data:{
        sort: 'asc',
        time: '1418816972',
        key: '741b7700753f135ce4d1ac77d2bdedc3',
        page: 10,
        pagesize: 7
      },
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res.data)
      }
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});