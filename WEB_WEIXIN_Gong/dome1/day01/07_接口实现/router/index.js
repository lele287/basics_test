const express = require('express');
const sha1 = require('sha1')
const reply = require('../reply');
const Wechat = require('../wechat/wechat');
const { url } = require('../config');

const Router = express.Router;
const router = new Router();

// 创建实例对象
const wechatApi = new Wechat();

// 页面路由
router.get('/search', async(req, res) => {
    // 获取随机字符串
    // const noncestr = Math.random().split('.')[1];
    const noncestr = 'argwerrgadfagaq';
    // 获取时间戳
    const timestamp = new Date().getTime();
    // 获取票据
    const { ticket } = await wechatApi.fetchTicket();

    const arr = [
            `jsapi_ticket=${ticket}`,
            `noncestr=${noncestr}`,
            `timestamp=${timestamp}`,
            `url=${url}/search`
        ]
        // 进行字典排序，以 & 拼接在一起
    const str = arr.sort().join('&');
    console.log(str);
    // sha1加密
    const signature = sha1(str);

    res.render('search', {
        signature,
        noncestr,
        timestamp
    })
})

// 页面路由
router.get('/user', async(req, res) => {
    res.render('user')
})

router.use(reply());

module.exports = router;