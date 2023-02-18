// pages/uploadPictures/uploadPictures.js
var app = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: []
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },
  handleTitleInput(e) {
    const value = e.detail.value;
    this.data.title = value;
    this.data.titleCount = value.length;
    this.setData({
      title: value,
      titleCount: value.length
    });
  },
  /**
   * 点击选择照片之后
   */
  chooseImg: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  /**
   * 选择照片
   */
  chooseImg1: function () {
    var that = this;
    var images = that.images;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        for (var i = 0; i < tempFilePaths.length;i++){
          images.push(tempFilePaths[i]);
        }
        that.setData({
          images: images
        })
      }
    })
  },

  /**
   * 上传照片
   */
  uploadImg: function () {
    var that = this;
    for(var i=0;i<that.data.images.length;i++){

      wx.uploadFile({
        url: 'http://localhost:9000/0122_binding/addEquipmentPictures', //仅为示例，非真实的接口地址
        filePath: that.data.images[i],
        name: 'file',
        formData: {
          'shop_id': 1
        },
        success: function (res) {
          var data = res.data
          console.log(data)
          //do something
        }
      })
    } 
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    this.setData({
      images: this.data.images
    });
  },
  handleContentInput(e) {
    const value = e.detail.value
    this.setData({
      content: value,
      contentCount: value.length
    });
  },
  chooseWxImage: function (type) {
    let _this = this;
    var images =  _this.data.images;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths);
        for (var j = 0; j < res.tempFilePaths.length;j++){
          images.push(res.tempFilePaths[j]);
        }
        _this.setData({
          images: images,
        })
      }
    })
  }
})
