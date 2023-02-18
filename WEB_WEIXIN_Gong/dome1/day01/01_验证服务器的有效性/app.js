const { query } = require('express');
const express = require('express');
const sha1 = require('sha1');
const app = express();
//  request-promise-native

// 配置对象
const config = {
    token: 'atguiguHTML0524',
    appId: 'wx9eb7d7489ec4cb9d',
    appsecret: 'f2568a85394bcab6f282484a0d52be25'
}

app.use((req, res, next) => {
    console.log(req.query);

    const { signature, echostr, timestamp, nonce } = req.query;
    const { token } = config;

    // 字典排序，sort
    const arr = [timestamp, nonce, token];
    const arrSort = arr.sort();
    console.log(arrSort);

    // sha1加密
    const str = arr.join('');
    const sha1Str = sha1(str);
    console.log(sha1Str);

    // 生成signatrue，与微信做对比
    if (sha1Str === signature) {
        res.send(echostr)
    } else {
        res.end('error')
    }
})

// {
//     signature: 'b4472d396267239c9881882302051630f0762598',   微信加密签名
//     echostr: '1542609670009519087',     微信的随机字符串
//     timestamp: '1606124363',            微信发送请求的时间戳
//     nonce: '2029190179'                 微信的随机数字
//   }

// http://dbcc800c38b5.ngrok.io
// atguiguHTML0524

// 监听端口号
app.listen(3000, () => console.log('服务器启动成功了~'));