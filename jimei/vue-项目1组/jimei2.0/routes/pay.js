var express = require("express");
var router = express.Router();
const AlipaySdk = require('alipay-sdk').default
const AlipayFormData = require('alipay-sdk/lib/form').default

// 初始化插件
const alipaySdk = new AlipaySdk({
  appId: '2021000116682607',
  gateway: 'https://openapi.alipaydev.com/gateway.do',
//   signType: 'RSA2', // 注意这里默认是RSA2, 但是我自己只能用RSA, 所以是RSA, 正常不要配置
  privateKey: 'MIIEpQIBAAKCAQEAu3AoLu4/qLxQTIrET+Sb79i+/iAWp8jsdKU7GqPb+zvMPiJLVHJ6b6E4N/VfOvNN/D2yXzvzX05RUUxP/GwntEcmFl3BFAIGE8dV5d8Ic9eBlgL1B0bdlQLRC9YaEf+XoHIWzQ+qqK7XQ2Xnm5xxfi1HX8BWZaLtMILlFTz7KEsZOMdxick6fn+blwRf1U8kYLmHfbvx4anvYuyxkk6VUNs+wJnGWpCmhufWtwYtpxgJzNAXMXMjCNpMDHr3XwEePQLvIQWwtYJRSO5iM/4MmmMW532xdL6ypFKSTgrVO1GoOMJ8RU+DLuvOQri/BKM5KesX8CJREp3dvY04Ql00HwIDAQABAoIBAQCVfniuJZtkSv2IbszwI5czjp2WNaWcIKZmyjn/n10eXa0iiVuneL6qNd2O1AcmD1PNsK+JQVl0VBSLUOAipWhtYqnAAPqzqIGMWNnrwx0Mt39FVAp1yVGFPX/ZfuPAIyid8SC6YJpuezR5Ltewxu/GAPsCJXdDDNU8ccmgTMjMcutlHOKH+ar646eKEhRhOi32X2J73sCO4qt6Wo7wk4unqUIItT5EFBhSKnUB1MU6ZfADTHsm+EPmSDQ3a2Ww/MoEIIePQpBpYKqa/NB8YpmzkrQV0klJInehUy1ama/1USm7Y0YEhI3i3VK/KLlMAcKLZcOwiPYPeabkUcfGspzRAoGBAOS4wOpkU7oFfeJtRY1FjdZGV0yO00tniGNG9RdVel+UiYL0vkEKzdpAgCxaEt+QKgFKqt4oD0Y3wbw73PVxvk9tRYwehSLN27W/V1j69zfM7AfIrRTMFLW+UMr6/YjTBrQiIMWEJV5ISATw83218ByCICNAsyp4JcPksVR03EXLAoGBANHK8sXF8bES/tTilZ8NLlwtGxAuMKxJlt+g8qtLoxXbF3P8uE/LHH3Sv4ODd3K6YM/+R1twwLy+iwv2Wb+cW/oSo5Pjqn1U33MiMZa4Ph2PqiImago923rRZ0swk8P5P3LbPOdUlz39UdxH3r1/lTHEt388/hmza053sjXdiWB9AoGBAKZ8NTBoRumpBbDDiVUDw/Ks0O7RJ8xDWGurQsvxVFoubMn+DF6b1qt/N80Q45wH/Atkpmt/DV83RrYVfQjL+pMmHvGXZaGn5r2swY/rXfgoGcawtAvnYUvJdFXLzLDDqqWEEgaz4d93DbVLDnH69QRLU8lVVxUaz6J/3PR0+8FxAoGBAI7vEebTTS8SvRJ36e66gUqF5LlqbvkDDksAkjVIzC0430rD9SNQQ/Ip4xeMO5asCwfKu/093eL6gyu8RTt6IWRIzLAW3fKUH8WGl3iTwKZNWmH4AClIKcAM6a5dw18y8xqi6mTFymGOtPY69TPwt8p3t3l2Kb2C82o7vOxcKpvVAoGAUHidsNSw76kNpsdVicAgRHmBiDR+qXZiKTfWhiI+TdIbAw5vRjPqP/HQaSl+apYtp4KjOZSHnfXfZgeIzmrhwjtkoTOLWnpSxrJHGXfRHmEnS45vUi//MO5b3XP1r2TSfsL7ztLLHFk/xIk3od2If831Ryg3XLabM7EIOuUnud4=',
  alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwXsQpyFqQeVAXJcinQ0RlkWe9XPvdBspdAaDEuj5uxAWTsIoZslSC27GPYLscYbdjYSBqHHW01sbUTvbx3IyASsoa08C9D7z/RobxMwaN24i/srtpXyNKGRMbIf5q3QatwjAYYKkHRhcm7XY+zriY57OfEjmT3Vx05aLUA89iuaSdTVgCe0OdUvD9NEH2QBLdvUQvi7ANDeR0oSUTvJXAK/hPvML6mHPHvUaZaeMBJ+uzU4LkHIkdYn2DKmGgRrTpHSecG+qAAMlm8Voq6mJN9v0AybQMYLFlJPZGYhYu7LDS00zt+o5KqVnL6FxWdNpNPj5h7YimIlQnjVKrYzhcwIDAQAB'
})

//支付
router.get('/', function(req, res, next) {
  let price = req.query.Price;
  let oId = req.query.oId;
  console.log(price,oId)
    async function pay () {
        const formData = new AlipayFormData()
        // 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
        formData.setMethod('get')
        // 配置回调接口
        formData.addField('notifyUrl', 'http://www.zzes1314.cn')
        // 设置参数
        formData.addField('bizContent', {
          outTradeNo: oId,
          productCode: 'FAST_INSTANT_TRADE_PAY',
          totalAmount: price,
          subject: '商品',
          body: '商品详情',
        });
        // 请求接口
        const result = await alipaySdk.exec(
          'alipay.trade.page.pay',
          {},
          { formData: formData },
        );
      
        // result 为可以跳转到支付链接的 url
        // console.log(result);
        res.json({code:200,msg:'ok',data:result})
      }
      
      pay()
  });

  module.exports = router
  