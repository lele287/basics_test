var express = require('express');
var router = express.Router();
var Newbooks = require('../controllers/Newbook')
var bcrypt = require('bcrypt')

//支付宝沙箱初始化导入
const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default

// 支付宝初始化插件
const alipaySdk = new AlipaySdk({
  appId: '2016102600767769',
  gateway: 'https://openapi.alipaydev.com/gateway.do',
  signType: 'RSA2', // 注意这里默认是RSA2, 但是我自己只能用RSA, 所以是RSA, 正常不要配置
  privateKey: 'MIIEogIBAAKCAQEAmH6tEYLpQEQfIfN2tQM5fhi0Bsau9zd1pokxMaDKlGrnAJjN8WrXffqgvyCiIrQOriUxwjCRMkR0yjvgkMfSMdj5GP0pxIVJq5ZBepghNzKk3tZuNnWkHodFb+v1Iu/mWO8TSR24p1bb9v99loHkCC6zUSEA3DGHvhnDAlWPCUkeQg866JR2cLGRGdOkUsG9+s1mk5kUUBpGyd2IlGy0JMsFApDs1dB/TO9HaSw76epBr3nHZ0DZWSubtSO0+1EMWVYb9U7Rrk0P1Y92t4+/qiDw9/d/WfKiVzJAMDdbFdzeeAm0LmUzZwOS4AH0npb9kWzBe30doAWIAdU3uWZA8wIDAQABAoIBAA5OzGQ5OTNbcORZmIixTcKkBLgiCiaN4I8IjkIOyRMV2Ki4rZH6KU/bpRtpr2y8Iih6uulybx0dSSv0ZESRSwp8RhrvHe0faGMeDPS4s10fdlKmId8gOI7YuE4hAHYPtjgf7lpM3Jdu0eKh5CGr/D48S3zQMOl4CDlw51gfuPTw7zT4Rb4zZgeuBg30ysI8mkzMpLpBAVIdiQOSCyKMizKDIkDgerXmaRWdf0pn7/nBLz/M6ZcGrykPuPVw+CX4RyQruZbtLVms8kZfl6aADcvZ/3eF3gbdT0B0PSm6sdEAEEfRAdHqwlkvDztATOJpfyYjRoyR3CwXcpg3tP7gc3kCgYEAzvecGSOXLhX7gPv3plQJiqhk6gh4qLKsq0FRyotU+X7EilZqDTKZtLMGZUFh6p9gBdaXJfpBlOU3wlMc4D0PFICP5EVtkI3shsb+RKWVlG7z/kC026utrZpy0YhMQ0WIceeS/SKd90W2rP49Fw6PM4NmJ7Djmif1wtl2GYF5KvcCgYEAvJ9cVEAXdcW/MQyL5w3b24BqK+ev/OiKKYnVhyOK+q1sEqxfAwJ2/WRjKa9A/ymaDdf2bnhEqVb7IlEVy1YzGcJBqzDeNCSnJYqOHSAFEHcX/lnyg9fDY9LK8Ffn8qX+hiHAC6WhAUOBa9fhQN5ouop9ebLvaaifCqghSNN9PuUCgYA6CCO0yM3zFibXG89sy9OBFYZ2OLncU30m58HPURIagvkI8QH7gVyn1irM6XBTIS0DdhAbjfglj7/6tOM73OMFlKbEEtON3L2dbN6O0P8IB7RSbkJH9fNU4iGfrt/zXOPNTGlioPo6A0odZ4wpkuOERiu2pVqsNtgqMl9y92LKMQKBgCmvAgVwYH7bY4QgZK58BpE8kLoBKog2j4ncdv61YRpCxvZdd2W/3rHixHNK0o9RD0Vt63zAQVQ276rGxo04EHTp0/9T/lcBnpqSQxO2psfbucaw9AIk5X4i8Ewq8QxTmKrlvH4WbT1NQMWnYJUoUXaf8li5rWTpKbR+MVTZv/ztAoGAQMLS0X6RkLDTONb8IF8W9Qwn4n13N2y9FAyNbLo/OhovVVdwHIGTntn3IjPP9g2igtE1octxp/5aKA0Vzvl+fmnPuZqel0fYZ1XcPB8FvecEdA0HStm3SX/3yXciV+Tyd7Qbgt5GleaV3RsCro7iqiJORVJ+xJSAypLUxBNpl7A=',
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmH6tEYLpQEQfIfN2tQM5fhi0Bsau9zd1pokxMaDKlGrnAJjN8WrXffqgvyCiIrQOriUxwjCRMkR0yjvgkMfSMdj5GP0pxIVJq5ZBepghNzKk3tZuNnWkHodFb+v1Iu/mWO8TSR24p1bb9v99loHkCC6zUSEA3DGHvhnDAlWPCUkeQg866JR2cLGRGdOkUsG9+s1mk5kUUBpGyd2IlGy0JMsFApDs1dB/TO9HaSw76epBr3nHZ0DZWSubtSO0+1EMWVYb9U7Rrk0P1Y92t4+/qiDw9/d/WfKiVzJAMDdbFdzeeAm0LmUzZwOS4AH0npb9kWzBe30doAWIAdU3uWZA8wIDAQAB'
})

//加载token模块

var jwt = require("jsonwebtoken");
var passport = require('passport')

/* 一级路由 */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 登录
router.post('/login', function (req, res, next) {
  Newbooks.login(req, res)
});

//注册
router.post('/register', function (req, res, next) {
  Newbooks.register(req, res)
});

//获取全部书籍
router.get('/getAllbooks', function (req, res, next) {
  Newbooks.getAllbooks(req, res)
})
//用户单人
router.post('/user', passport.authenticate('jwt', { session: false }), function (req, res, next) {
  Newbooks.user(req, res)
})

//模糊查询
router.get('/getAllnames', function (req, res, next) {
  Newbooks.getAllnames(req, res)
});
//章节
router.get('/chapters',  function (req, res, next) {
  Newbooks.chapters(req, res)
});

//充值传参
router.get('/aa', function (req, res, next) {
  Newbooks.aa(req, res)
});

//加入收藏,存储到数据库
router.get('/join', function (req, res, next) {
  Newbooks.join(req, res)
});
//加入收藏
router.get('/bookcase', function (req, res, next) {
  Newbooks.bookcase(req, res)
});

//图书详情
router.get('/bookinfo', function (req, res, next) {
  Newbooks.bookinfo(req, res)
});
//图书详情章节
router.get('/bookchapters', function (req, res, next) {
  Newbooks.bookchapters(req, res)
});
//上传头像
router.get('/uploadpic', function (req, res, next) {
  Newbooks.uploadpic(req, res)
});
//删除书架图书
router.get('/delbook', function (req, res, next) {
  Newbooks.delbook(req, res)
});
//修改个人信息
router.get('/changeuserlist', function (req, res, next) {
  Newbooks.changeuserlist(req, res)
});
 
//支付路由
router.get('/gopay', function (req, res, next) {
  // console.log("pay+++",req.query);
    async function pay() {
      const formData = new AlipayFormData()
      // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
      formData.setMethod('get')
      // 配置回调接口
      formData.addField('notifyUrl', 'http://www.zzes1314.cn')
      // 设置参数
      formData.addField('bizContent', {
        outTradeNo: '1582976759798',
        productCode: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: req.query.price,
        subject:'阅读币',
        body: '图书',
      });
      // 请求接口
      const result = await alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
      );
      // result 为可以跳转到支付链接的 url
      // console.log('result',result);
      res.json({code:200,msg:'ok',data:result})
    }
    pay()
});

module.exports = router;
