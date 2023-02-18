//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    buttons:['C','D','E','F','G','A','B'],
    imgPath:'c.png'
  },
  onLoad: function () {

  },
  showImg(e) {
    console.log(e.target.dataset.id)
    let path = e.target.dataset.id + '.png'
    this.setData({imgPath:path})
  }
})