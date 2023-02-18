var https = require('https');
var express = require('express');
var router = express.Router();
const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default

// 初始化插件
const alipaySdk = new AlipaySdk({
  appId: '2021000116673193',
  gateway: 'https://openapi.alipaydev.com/gateway.do',
  // signType: 'RSA2', // 注意这里默认是RSA2, 但是我自己只能用RSA, 所以是RSA, 正常不要配置
  privateKey: 'MIIEpQIBAAKCAQEArTOGsqfKHUNlEWwOuqN6dpKXFJFfByscKLJ5l1KUTxGqPopPsWjBljnXak81tGRcBQw8K26TZK816DBkLWVJe6dfbZDa7Ad9WWVs6FWf+evsk6HKfnChctB3bC9f5UxbMXOcDu7cqtNDea1EgstNtdqHuaMeSPJePWLa21hxtYLDP6DLLors+7qE+6tBDrDBQM8/esz+oWdXLJi8N9nBsqJ+dTXhFkahWnfVTMGAdw6dzss69noCYsd9C7hvfrTPsp3M+ngmtbxnZKE2cPC3rKKnFsc/wheNScJbZQOTnetC4rLflm6JnYxDy27YJ8ebfk23VCMP15OlmA4KjP+X4wIDAQABAoIBAFUw0eEQDKbGHnEqUDhW7oZh5fPU6QPSnYAbARmAIbiefLlUOIyPdSCaBK2ilkzLTEOjV/kY42CTmZVCMBPwDOvIUHTI2hVcPbh53c6NRymbdHrNCpeUeKTLiuHoj2duXjB9p9XkgR942GiB4//dVbTL7xRM+jlxFQ9mjzVyVEOtY4lonw4OSxLcG5MWxF+gqfwSrvxuYyS7qorggd8IIRTESrymJ4JseCXppw4NlvcKO2ngvjg9D/MInUOf66vfrQS+0MFSzHYopdFHHN8LQzk1t4JOWh/Iw67SIlZ846zo8hauxw/H4jYxXWxyPKGlBHox1yeqy+MA2Z1Q4ZN9hfECgYEA8gytMWAhlmOUebwExAqUye2lfDUE5Ak/2Kz4SMl89vUMpLTefkKL6t2saaQfBkqWyL9BZOPO1SOBIrzjohG1gqQM9So1WpUJJfIhQJk05lMQBcHwe4gx7wEAoF7W9zzKhApMj0G569LtXC2gKx3Erchidf2Wrl/xBVafOH78MskCgYEAty8G8WvkZsc7vr6wzxD7fuQyWu8UUtQTZD0xuNpcgVIRZTEZIUWY6JSfCOX6oTXCH4FPRgTbGGhOE+EVb/pI7+XNbx4FfURntu/iNKTt/8Xv/KL+fMQPKFJiLtcyisAfD9ZmQJYGuba89YghFgt/04yOYekrAuhIOJFWjz8Tf0sCgYEA5U3JDYuqhhRUZncOdMIpbprqOR7pQTbZ+2Tx2dK3xiUkEy0d0rMsZhYW7gWDNqyW6Br30qJWIWj/P29+ntzz/Y14kRGpdeTWw9H8WnxJtyFdfnbaYc0GsQtcEpGGSLaYjDpNiTGU9qneH4NBx1buKkw5qtnQU+WkKZCESjtSpLECgYEAi11X5uyyxA7nwWLKmX7OF+f893nU+H8okaaM4ZofrrOFUHteJxYQE0KfC+IMIAIKQnXanear2ZHhdPZVnO/J9dnbxaINgxQ74831RyADgghRYN+QxdNTxNWIpSJL7YvlFeODv7dkPn5snFCI+4CcK5JP8OW4N2oJKCBKvoi6iKkCgYEAmyBvOLvb/nRjMyo9ydYhPrxagpO+s+t4hWr1/pp7E/M2a7GJmVsoEs2cyY3Ro29XCbHAsOYZXkNvGpPhgKdy4k7MRWGo5Hcmfv4YranQ2n4KplFJQjT2NpmFN7Va5UgNCI35s3h4/znZQRigrhNTxAp4daLwpXQOFaWFW72PUdc=',
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArTOGsqfKHUNlEWwOuqN6dpKXFJFfByscKLJ5l1KUTxGqPopPsWjBljnXak81tGRcBQw8K26TZK816DBkLWVJe6dfbZDa7Ad9WWVs6FWf+evsk6HKfnChctB3bC9f5UxbMXOcDu7cqtNDea1EgstNtdqHuaMeSPJePWLa21hxtYLDP6DLLors+7qE+6tBDrDBQM8/esz+oWdXLJi8N9nBsqJ+dTXhFkahWnfVTMGAdw6dzss69noCYsd9C7hvfrTPsp3M+ngmtbxnZKE2cPC3rKKnFsc/wheNScJbZQOTnetC4rLflm6JnYxDy27YJ8ebfk23VCMP15OlmA4KjP+X4wIDAQAB'
})
/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('这是首页')
});

//支付路由
router.get('/pay', function (req, res, next) {
  console.log(JSON.parse(req.query.shopping));
  var data = JSON.parse(req.query.shopping)
  async function pay() {
    const formData = new AlipayFormData()
    // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
    formData.setMethod('get')
    // 配置回调接口
    formData.addField('notifyUrl', 'http://www.zzes1314.cn')
    // 设置参数
    formData.addField('bizContent', {
      outTradeNo: data.orderId,
      productCode: 'FAST_INSTANT_TRADE_PAY',
      totalAmount: data.drugsPrice.substring(1) * data.drugsCount,
      subject: data.drugsType,
      body: data.drugsIntroduce,
    });
    // 请求接口
    const result = await alipaySdk.exec(
      'alipay.trade.page.pay',
      {},
      { formData: formData },
    );
    // result 为可以跳转到支付链接的 url
    console.log(result);
    res.json({ code: 200, msg: 'ok', data: result })
  }
  pay()
});
// router.get('/yiqing', function (req, res, next) {
//   let _res = res
//   var content = ''
//   https.get("https://c.m.163.com/ug/api/wuhan/app/data/list-total", function (res) {
//     res.on('data', function (chunk) {
//       content += chunk
//     })
//     res.on('end', function () {
//       console.log(content)
//       _res.json({ code: 200, msg: 'ok', data: content })
//     })
//   })
// });
// router.get('/yiqing', function (req, res, next) {
//   let _res = res
//   var content = ''
//   https.get("https://c.m.163.com/ug/api/wuhan/app/data/list-total", function (res) {
//     res.on('data', function (chunk) {
//       content += chunk
//     })
//     res.on('end', function () {
//       console.log(content)
//       _res.json({ code: 200, msg: 'ok', data: content })
//     })
//   })
// });
module.exports = router;
