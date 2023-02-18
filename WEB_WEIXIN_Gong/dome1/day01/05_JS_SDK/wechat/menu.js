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
                    "name": "搜索",
                    "url": "http://www.soso.com/"
                },
                // 小程序
                // {
                //     "type": "miniprogram",
                //     "name": "wxa",
                //     "url": "http://mp.weixin.qq.com",
                //     "appid": "wx286b93c14bbf93aa",
                //     "pagepath": "pages/lunar/index"
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