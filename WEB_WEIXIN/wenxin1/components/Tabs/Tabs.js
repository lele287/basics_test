// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 要接受的名称
    lele:{
      //type 要接受的类型
      type:String,
      //value 默认值
      value:""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  // 启用插槽
  options:{
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
  // 子传父
  SonToFather(){
    
    this.triggerEvent("itemChange","康康")
  },
  }
})
