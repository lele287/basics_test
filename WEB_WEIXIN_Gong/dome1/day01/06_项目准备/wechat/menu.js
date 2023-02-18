const { url, appId } = require('../config');

module.exports = {
    "button": [{
            "type": "click",
            "name": "开发中。。",
            "key": "CLICK_baoxiu"
        },
        {
            "name": "我要报修",
            "sub_button": [{
                    "type": "view",
                    "name": "报修",
                    "url": `${url}/search`
                },
                // 小程序
                // {
                //     "type": "miniprogram",
                //     "name": "报修小程序",
                //     "url": "http://mp.weixin.qq.com",
                //     "appid": "wx9eb7d7489ec4cb9d",
                //     "pagepath": "pages/index/index"
                // },
                {
                    "type": "scancode_waitmsg",
                    "name": "扫码带提示",
                    "key": "扫码带提示",
                },
                {
                    "type": "scancode_push",
                    "name": "扫码推事件",
                    "key": "扫码推事件",
                }
            ]
        }
    ]
}