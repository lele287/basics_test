// pages/step/step.js
var app = getApp().globalData;
var common = require('../../util/common.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code:null,
    hint:'',
    stephint:'',
    thirdhint:'',
    secondStep: null,
    method:'',
    codeTypes: '',
    steps:[],
    step: [],
    paddingCodes:[],
    euqipmentCode:'',
    equipment:null,
    recordId:0    //要更新的记录的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop = getApp().globalData.shop;
    wx.setNavigationBarTitle({
      title: shop.shopName,
    })
    
    //设置要测试的四信设备
    this.setData({
      euqipmentCode: options.info_code
    });
    // 查询一下这个门店的测试记录是否完整
    this.isSuccessTest();
  },

  /**
   * 查询当前的测试记录是否完整
   */
  isSuccessTest:function(){
    common.getHttpRequest("getMaxTestRecordByShopId", { "shop_id": app.shop.id},this.doSuccess);
  },
  /**
   * 成功的回调函数
   */
  doSuccess:function(res){
    var that = this;
    var result = res.data;
    if (!result){
      that.resetTestSignal();
      return;
    }

    if (!result.formalCard1){
      console.log('测试未完成');
      wx.showModal({
        title: '提示',
        content: '测试未完成，您是否要恢复？',
        success:function(res){
          if(res.confirm){
            // 恢复未测试完成的数据
            console.log(res);
            var code = { 'm_code': result.mCode, 'b_code': result.bCode };
            var method = 'save';
            var step = [
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '电信' + ',信号值为' + result.tSignal + ',网络类型为' + result.tNettype,
                // 此步骤描述语
                desc: '10.01'
              },
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '移动' + ',信号值为' + result.mSignal + ',网络类型为' + result.mNettype,
                // 此步骤描述语
                desc: '10.01'
              },
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '联通' + ',信号值为' + result.uSignal + ',网络类型为' + result.uNettype,
                // 此步骤描述语
                desc: '10.01'
              },
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '店号:' + app.shop.shopCode,
                // 此步骤描述语
                desc: '10.01'
              },
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '店名:' + app.shop.shopName,
                // 此步骤描述语
                desc: '10.01'
              }
            ];
            var steps = [
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: false,
                // 此步骤显示文案
                text: '步骤一',
                // 此步骤描述语
                desc: '10.01'
              },
              {
                done: false,
                current: false,
                text: '步骤二',
                desc: '10.02'
              },
              {
                done: false,
                current: true,
                text: '步骤三',
                desc: '10.03'
              }
            ];
            var hint = '推荐主卡为' + result.mCode + ',推荐副卡为' + result.bCode + ';请按推荐插入正式卡片';

            that.setData({
              code:code,
              method: method,
              step: step,
              steps: steps,
              hint: hint,
              stephint:'',
              recordId: result.id
            })
          } else if (res.cancel){
            // 取消的话也清空里面的数据
            that.resetTestSignal();
          }
        },
      })
    }else{
      console.log('测试完成');
      // 测试完成清空测试数据
      that.resetTestSignal();
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.resetTestSignal();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 第一次得到两张卡
   */
  
  next:function(){
    var that = this;
    var uriPrefix = app.uriPrefix;
    //拿到3张测试卡
    var moveCode = app.moveCode;
    var unicornCode = app.unicornCode;
    var telecomCode = app.telecomCode;
    //拿到主副卡
    var bCode = app.bCode;
    var mCode = app.mCode;
    
    var codeTypes = this.data.codeTypes;
    //开启加载画面
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100000
    })
    //第一次得到两张测试卡的信号
    wx.request({
      url: uriPrefix +'testSignalByEquNum',
      data:{
        equipment_code: that.data.euqipmentCode
      },
      method:'GET',
      header:{
        'content-type':'x-www-form-urlencoded'
      },
      success:function(res){
        
        //如果得不到卡片的信息，就判定电源未开启，或者卡片拨不上号
        if (res.data.status == 400){
            wx.hideToast();
            wx.showModal({
              title: '提示',
              content: '设备电源未开启,或者卡片拨不上号',
            })
            return;   
        } else if (res.data.status == 200){
          var codeInfo = res.data.data;
          //判断插入的卡片是否是测试卡，如果是正式卡提示他们换测试卡
          var formal_card = [];
          for(var i=0;i<codeInfo.length;i++){
              if (codeInfo[i].code_class == '正式卡'){
                formal_card.push(codeInfo[i]);
              }
          }

          if (formal_card.length != 0){
            wx.hideToast();
            var tite_info = '';
            for (var j = 0; j < formal_card.length;j++){
              tite_info += formal_card[j].code_type + '是' + formal_card[j].code_class +'\r\n';
            }
            // 4月26日修改
            wx.showModal({
              title: '提示',
              content: tite_info+'建议用测试卡测试',
            })
            //如果卡片中有正式卡就返回,4月26日修改成正式卡也可以测试
            // return;
           }
            for (var i = 0; i < codeInfo.length;i++){
              //判断主副卡
              if (codeInfo[i].code_positon == 'b') {
                app.bCode = codeInfo[i];
              }
              if (codeInfo[i].code_positon == 'm') {
                app.mCode = codeInfo[i];
              }
              //判断主副卡结束
              if (moveCode == null) {
                if (codeInfo[i].code_type == '移动') {
                  app.moveCode = codeInfo[i];
                }
              }
              if (unicornCode == null) {
                if (codeInfo[i].code_type == '联通') {
                  app.unicornCode = codeInfo[i];
                }
              }
              if (telecomCode == null) {  
                if (codeInfo[i].code_type == '电信') {
                  app.telecomCode = codeInfo[i];
                }
              }
            }
            //end
            //查找待测卡片
            var paddingCard = '';
            var paddingCards = [];
            if (app.moveCode == null) {
              paddingCard += '移动测试卡';
              paddingCards.push('移动');
            }

            if (app.unicornCode == null) {
              paddingCard += '联通测试卡';
              paddingCards.push('联通');
            }

            if (app.telecomCode == null) {
              paddingCard += '电信测试卡';
              paddingCards.push('电信');
            }
            //end查找待测卡片
            that.data.steps[0].current = false;
            that.data.steps[1].current = true;
            var step = [
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '主卡为' + app.mCode.code_type + ',信号值为' + app.mCode.code_signal + ',网络类型为' + app.mCode.net_type,
                // 此步骤描述语
                desc: '10.01'
              },
              {
                // 此步骤是否当前完成状态
                current: false,
                // 此步骤是否已经完成
                done: true,
                // 此步骤显示文案
                text: '副卡为' + app.bCode.code_type + ',信号值为' + app.bCode.code_signal+',网络类型为' + app.bCode.net_type,
                // 此步骤描述语
                desc: '10.01'
              }
            ]
            wx.hideToast();
            that.setData({
              step: step,
              steps: that.data.steps,
              stephint: paddingCard,
              method: 'secondStep',
              paddingCards: paddingCards
            })   
          
         }else if(res.data.status == 202){
          //如果四信上面有信号，但是NeTOP没有信号
          wx.hideToast();
          var cardInfo = res.data.data;
          var iccid = '';
          for(var i=0;i<cardInfo;i++){
            iccid += cardInfo[i].iccid+'\r\n';
          }
          wx.showModal({
            title: '提示',
            content: '请使用群睿测试卡,当前卡片\r\n' + iccid,
          })
         }
      } 
    })
  },
  secondStep:function(){
    var that = this;
    var uriPrefix = app.uriPrefix;
    //拿到3张卡
    var moveCode = app.moveCode;
    var unicornCode = app.unicornCode;
    var telecomCode = app.telecomCode;
    //拿到待测卡片
    var paddingCards = this.data.paddingCards;

    var secondStep = this.data.secondStep;
    //开启加载画面
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100000
    })
    //调用测试信号的接口
    wx.request({
      url: uriPrefix +'testSignalByEquNum',
      data: { equipment_code: that.data.euqipmentCode},
      method:'GET',
      header:{
        'content-type':'x-www-form-urlencoded'
      },
      success:function(res){
        var cards = res.data.data;
        //如果得不到卡片的信号，就提示没有插入卡片。如果里面有一张卡，或者两张卡，走else
        if (res.data.status == 400) {
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: '设备电源未开启,或者卡片拨不上号',
          })
          return;
        } else if (res.data.status == 200){
          //1.先判断是否有待测卡
          //得到了测试卡
          var isHasPadding = false;
          var paddingCard = null;
          for(var i=0;i<cards.length;i++){
            if (cards[i].code_type == paddingCards[0]) {
              //得到了待测卡
              isHasPadding = true;
              paddingCard = cards[i];
            }  
          }
          if (isHasPadding){
            //如果有待测卡，就判断待测卡是否是正式卡
            if (paddingCard.code_class == '正式卡'){
              wx.hideToast();
              wx.showModal({
                title: '提示',
                content: '当前' + paddingCards[0] +'为正式卡\r\n建议用' + paddingCards[0] + '测试卡',
              })
              //4月26修改成了正式卡也可以测试
              // return;
            }
              //end判断主副卡结束
            switch (paddingCard.code_type) {
              case '移动': app.moveCode = paddingCard; break;
              case '联通': app.unicornCode = paddingCard; break;
              case '电信': app.telecomCode = paddingCard; break;
            }
            var card = that.judgeMAndBCode();
            // 将没有完成的记录保存到数据库
            wx.request({
              url: uriPrefix + 'saveTestRecord',
              method:'POST',
              header:{
                "Content-type" : "application/json"
              },
              data: {
                'moveCode': app.moveCode.iccid,
                'unicornCode': app.unicornCode.iccid,
                'telecomCode': app.telecomCode.iccid,
                'mSignal': app.moveCode.code_signal,
                'uSignal': app.unicornCode.code_signal,
                'tSignal': app.telecomCode.code_signal,
                'mCode': card.m_code,
                'bCode': card.b_code,
                'storeId': getApp().globalData.shop.id,
                'tester': getApp().globalData.user.userName,
                'equipmentCode': that.data.euqipmentCode,
                'isTest': 1,
                "clientId": getApp().globalData.client.id,
                'partnerId': getApp().globalData.user.partnerId,
                'mNettype': app.moveCode.net_type,
                'uNettype': app.unicornCode.net_type,
                'tNettype': app.telecomCode.net_type
              },
              header: {
                "Content-type": "application/json"
              },
              success: function (res) {
                //把保存的记录的自增id拿出来
                var recordId = res.data.data;
                that.setData({
                  recordId: recordId
                })
              }
            })
          }else{
            wx.hideToast();
            wx.showModal({
              title: '提示',
              content: '请换'+paddingCards[0] + '测试卡',
            })
            return;
          }
        }else{
          wx.hideToast();
          var cardInfo = res.data.data;
          var iccid = '';
          for (var i = 0; i < cardInfo; i++) {
            iccid += cardInfo[i].iccid + '\r\n';
          }
          wx.showModal({
            title: '提示',
            content: '请使用群睿测试卡,当前卡片\r\n' + iccid,
          })

        }
      //保存信息
      wx.hideToast(); 
      var method = 'save';
      var step = [
        {
          // 此步骤是否当前完成状态
          current: false,
          // 此步骤是否已经完成
          done: true,
          // 此步骤显示文案
          text: app.telecomCode.code_type + ',信号值为' + app.telecomCode.code_signal + ',网络类型为' + app.telecomCode.net_type,
          // 此步骤描述语
          desc: '10.01'
        },
        {
          // 此步骤是否当前完成状态
          current: false,
          // 此步骤是否已经完成
          done: true,
          // 此步骤显示文案
          text: app.moveCode.code_type + ',信号值为' + app.moveCode.code_signal + ',网络类型为' + app.moveCode.net_type,
          // 此步骤描述语
          desc: '10.01'
        },
        {
          // 此步骤是否当前完成状态
          current: false,
          // 此步骤是否已经完成
          done: true,
          // 此步骤显示文案
          text: app.unicornCode.code_type + ',信号值为' + app.unicornCode.code_signal+',网络类型为' + app.unicornCode.net_type,
          // 此步骤描述语
          desc: '10.01'
        },
        {
          // 此步骤是否当前完成状态
          current: false,
          // 此步骤是否已经完成
          done: true,
          // 此步骤显示文案
          text: '店号:' + app.shop.shopCode,
          // 此步骤描述语
          desc: '10.01'
        },
        {
          // 此步骤是否当前完成状态
          current: false,
          // 此步骤是否已经完成
          done: true,
          // 此步骤显示文案
          text: '店名:' + app.shop.shopName,
          // 此步骤描述语
          desc: '10.01'
        }
      ];
      var steps = that.data.steps;

      steps[1].current = false;
      steps[2].current = true;

      wx.hideToast();
      var hint = '推荐主卡为' + card.m_code + ',推荐副卡为' + card.b_code + ';请按推荐插入正式卡片';

      that.setData({
        method: method,
        step: step,
        hint: hint,
        steps: steps,
        stephint: ''
      });
      }
    })
  },


  save:function(){
    var that = this;
    //保存测试记录
    var moveCode = app.moveCode;
    var telecomCode = app.telecomCode;
    var unicornCode = app.unicornCode;
    //参数的uri前缀
    var uriPrefix = app.uriPrefix; 

    var code = this.data.code;
    //开启加载画面
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 100000
    })
    wx.request({
      url: uriPrefix +'testSignalByEquNum',
      data: { 'equipment_code': that.data.euqipmentCode },
      method:'GET',
      success:function(res){
        if (res.data.status == 400){
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: '卡片未拨上号，请重试',
          })
          return;
        } else if (res.data.status == 202){
          wx.hideToast();
          var cardInfo = res.data.data;
          var iccid = '';
          for (var i = 0; i < cardInfo; i++) {
            iccid += cardInfo[i].iccid + '\r\n';
          }
          wx.showModal({
            title: '提示',
            content: '请使用群睿测试卡,当前卡片\r\n' + iccid,
          })
          return;
        }
        
        //判断卡片的位置是否对,判断卡片是否是测试卡，判断正式卡是否被锁定
        var contentPosition = '';
        var contentIsTest = '';
        var formal_m_code = ''; //主卡正式卡
        var formal_b_code = ''; //备卡正式卡
        var codes = res.data.data;
        for (var i = 0; i < codes.length;i++){
          if (codes[i].code_positon == 'm') {
            if (codes[i].code_type != code.m_code) {
              contentPosition += '主卡不对\r\n';
            }else{
              formal_m_code = codes[i].iccid;
            }      
          }
          if (codes[i].code_positon == 'b'){
            if (codes[i].code_type != code.b_code){
              contentPosition += '副卡不对\r\n';
            }else{
              formal_b_code = codes[i].iccid;
            }
          }
          // 检测是否是正式卡
          if (codes[i].code_class == '测试卡'){
              contentIsTest += (codes[i].code_type + "为测试卡\r\n");
          }

        }

        if (contentIsTest != '' || contentPosition != ''){
          wx.hideToast();
          wx.showModal({
            title: '提示',
            content: contentPosition + contentIsTest,
          })
        }else{
          wx.hideToast();
          //如果卡片的位置对，并且是正式卡片，就检测正式卡片是否能拨上号
          var no_sign = '';
          var card_num = '';
          for (var i = 0; i < codes.length;i++){
            if (codes[i].code_signal == -1){
                no_sign += codes[i].code_type+':'+'已被锁定\r\n';
                card_num += codes[i].code_type + '卡号:' + codes[i].iccid+'\r\n';
            }
          }
          if (no_sign != ''){
            wx.showModal({
              title: '提示',
              content: no_sign + '请重试，或联系群睿运维部解卡\r\n' + card_num,
            })
            return;
          }else{
            //4月26日修改的部分
            //添加测试记录
            //6月27将自增id的测试记录修改
            wx.request({
                url: uriPrefix + 'updateFormalCardById',
                data: { 
                  'id': that.data.recordId,
                  'formalCard1': codes[1].iccid, 
                  'formalCard2': codes[0].iccid
                  },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function (res) {
                  //清理里面的数据 
                  if(res.data.status == 200){
                    that.resetTestSignal();
                    wx.showModal({
                      title: '提示',
                      content: '测试完成',
                    })
                  }else{
                    wx.showModal({
                      title: '提示',
                      content: '服务器内部异常',
                    })
                  }
                 
                }
              })
            //end
          }
        }
      }
    })
  },

  judgeMAndBCode:function(){
    var moveSignal = app.moveCode.code_signal;
    var unicornSignal = app.unicornCode.code_signal;
    var telecomSignal = app.telecomCode.code_signal;

    var Mcode = null;
    var Bcode = null;

    switch (app.moveCode.net_type){
      case 'LTE':
      case 'TDDLET':
      case 'SRLTE':
        moveSignal = moveSignal*2;
        break;
      default:
        moveSignal = moveSignal;
    }

    switch (app.telecomCode.net_type) {
      case 'LTE':
      case 'TDDLET':
      case 'SRLTE':
        telecomSignal = telecomSignal * 2;
        break;
      default:
        telecomSignal = telecomSignal;
    }

    switch (app.unicornCode.net_type) {
      case 'LTE':
      case 'TDDLET':
      case 'SRLTE':
        unicornSignal = unicornSignal * 2;
        break;
      default:
        unicornSignal = unicornSignal;
    }
    // 判断主卡
    if (moveSignal > telecomSignal){
     
        if (moveSignal > unicornSignal){
          Mcode = app.moveCode;
        } else if (moveSignal < unicornSignal){
          Mcode = app.unicornCode;
        } else {
          // 如果移动和联通的信号值一样的话，就判断以前插过那个位置
          if (app.unicornCode.code_positon == 'm' && app.moveCode.code_positon == 'b') {
            Mcode = app.unicornCode;
          }else {
            Mcode = app.moveCode;
          }
        }

    } else if (moveSignal < telecomSignal){

        if (telecomSignal > unicornSignal) {
          Mcode = app.telecomCode;
        } else if (telecomSignal < unicornSignal) {
          Mcode = app.unicornCode;
        } else {
          // 如果电信和联通的信号值一样的话，就判断以前插过那个位置
          if (app.telecomCode.code_positon == 'm' && app.unicornCode.code_positon == 'b') {
            Mcode = app.telecomCode;
          } else {
            Mcode = app.unicornCode;
          }
        }

    } else{
        // 如果移动和电信信号值一样的话，就判断移动和联通的信号值
        if(moveSignal > unicornSignal){
          //移动比联通的信号好，则电信的信号也比联通的信号好，就判断移动和电信的位置
          if (app.telecomCode.code_positon == 'm' && app.moveCode.code_positon == 'b') {
            Mcode = app.telecomCode;
          } else {
            Mcode = app.moveCode;
          }
        } else if (moveSignal < unicornSignal){
          Mcode = app.unicornCode;
        } else {
          // 3个信号值一样的话
          var cardTemp = null;
          if (app.telecomCode.code_positon == 'm' && app.unicornCode.code_positon == 'm'){
            cardTemp = {'m_code': '联通', 'b_code': '移动'};
          } else if (app.telecomCode.code_positon == 'm' && app.moveCode.code_positon == 'm') {
            cardTemp = { 'm_code': '移动', 'b_code': '联通' };
          } else if (app.moveCode.code_positon == 'm' && app.unicornCode.code_positon == 'm') {
            cardTemp = { 'm_code': '移动', 'b_code': '电信' };
          } else if (app.moveCode.code_positon == 'b' && app.unicornCode.code_positon == 'b') {
            cardTemp = { 'm_code': '电信', 'b_code': '移动' };
          } else if (app.moveCode.code_positon == 'b' && app.telecomCode.code_positon == 'b') {
            cardTemp = { 'm_code': '联通', 'b_code': '移动' };
          } else if (app.telecomCode.code_positon == 'b' && app.unicornCode.code_positon == 'b') {
            cardTemp = { 'm_code': '移动', 'b_code': '联通' };
          }
          this.setData({
            code: cardTemp
          })
          return cardTemp;
        }
    }
    // 判断副卡
    // 卡片为移动
    if (Mcode.code_type == '移动') {
      if (unicornSignal >= telecomSignal) {
        if (unicornSignal == telecomSignal){
          //如果联通和电信的信号一样，就根据卡片的位置进行判断
          if (app.telecomCode.code_positon == 'b' && app.unicornCode.code_positon == 'm') {
            Bcode = app.telecomCode;
          } else {
            Bcode = app.unicornCode;
          } 
        }else{
          Bcode = app.unicornCode;
        }
      } else{
        Bcode = app.telecomCode;
      }
    }
    // 主卡为联通
    if (Mcode.code_type == '联通') {
      if (moveSignal >= telecomSignal) {
        if (moveSignal == telecomSignal) {
          //如果联通和电信的信号一样，就根据卡片的位置进行判断
          if (app.telecomCode.code_positon == 'b' && app.moveCode.code_positon == 'm') {
            Bcode = app.telecomCode;
          } else {
            Bcode = app.moveCode;
          }
        }else{
          Bcode = app.moveCode;
        }
      } else {
        Bcode = app.telecomCode;
      }
    }
    // 主卡为电信
    if (Mcode.code_type == '电信') {
      if (moveSignal >= unicornSignal) {
        if (moveSignal == unicornSignal) {
          //如果联通和电信的信号一样，就根据卡片的位置进行判断
          if (app.unicornCode.code_positon == 'b' && app.moveCode.code_positon == 'm') {
            Bcode = app.unicornCode;
          } else {
            Bcode = app.moveCode;
          }
        }else{
          Bcode = app.moveCode;
        }
      } else {
        Bcode = app.unicornCode;
      }
    }

    var code = { 'm_code': Mcode.code_type, 'b_code': Bcode.code_type};
    
    this.setData({
      code: code
    })

    return code;
  },

  resetTestSignal:function(){
    app.unicornCode = null;
    app.moveCode = null;
    app.telecomCode = null;
    app.mCode = null;
    app.bCode = null;

    var hint = '';
    var stephint =  '';
    var thirdhint =  '';
    var secondStep= { 'move': 0, 'unicorn': 0, 'telecom': 0, 'move_nettype': '', 'unicorn_nettype': '', 'telecom_nettype': '' };
    var method = 'next';
    var codeTypes = { 'move': 0, 'unicorn': 0, 'telecom': 0, 'move_nettype': '', 'unicorn_nettype': '', 'telecom_nettype': '' };
    var steps= [
      {
        // 此步骤是否当前完成状态
        current: true,
        // 此步骤是否已经完成
        done: false,
        // 此步骤显示文案
        text: '步骤一',
        // 此步骤描述语
        desc: '10.01'
      },
      {
        done: false,
        current: false,
        text: '步骤二',
        desc: '10.02'
      },
      {
        done: false,
        current: false,
        text: '步骤三',
        desc: '10.03'
      }
    ];
    var step =  [
      {
        // 此步骤是否当前完成状态
        current: false,
        // 此步骤是否已经完成
        done: true,
        // 此步骤显示文案
        text: '关闭设备电源',
        // 此步骤描述语
        desc: '10.01'
      },
      {
        done: true,
        current: false,
        text: '请插入两张测试卡',
        desc: '10.02'
      },
      {
        done: true,
        current: false,
        text: '请开启电源，重启设备',
        desc: '10.03'
      }
    ]
    var paddingCodes =  [];

    this.setData({
      recordId : 0,
      hint: hint,
      stephint: stephint,
      thirdhint: thirdhint,
      secondStep: secondStep,
      method: method,
      codeTypes: codeTypes,
      steps: steps,
      step: step,
      paddingCodes: paddingCodes
    });
  }
})