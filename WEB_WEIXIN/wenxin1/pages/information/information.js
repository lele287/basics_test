
Page({
  num1:"",
  num2:"",
  sum1:"",
  data: {

  },
  chang(e){
    let num = Number(e.detail.value)
    let id = e.target.id
    this[id]=num
    console.log(this[id]);
  },
  changSum(e){
    this.sum1 = e.detail.value
    console.log(this.sum1);
    
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  onLoad: function () {

  }
})
