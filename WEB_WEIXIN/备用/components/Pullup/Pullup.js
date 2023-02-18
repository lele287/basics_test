// components/PullUp/PullUp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 要接受的名称
    lele: {
      //type 要接受的类型
      type: Object,
      //value 默认值
      value: {}
    },
    Device: {
      //type 要接受的类型
      type: String,
      //value 默认值
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    Deviceto:''
  },


  // 启用插槽
  options: {
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 子传父
    SonToFather() {
      this.triggerEvent("itemChange", this.data.Deviceto)
    },
    onClose() {
      this.setData({
        show: false
      });
    },

    onSelect(event) {
      console.log(event.detail);
      this.setData({
        Deviceto: event.detail.name
      })
    },
    showPopup() {
      this.setData({
        show: true
      });
    },

    onCloseBtn() {
      this.setData({
        show: false
      });
    },
    // 点击取消按钮
    onCancelBtn() {
      this.setData({
        show: false
      });
    },
  }
})