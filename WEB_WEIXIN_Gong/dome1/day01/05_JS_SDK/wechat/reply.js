module.exports = message => {
    let options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.parse(new Date()),
        msgType: 'text'
    }

    // 判断是否文本消息
    let content = '我听不懂,请换个内容发送试试'
    console.log(message.MsgType);
    if (message.MsgType === 'text') {
        console.log(111111);
        if (message.Content === '1') {
            content = '大吉大利，今晚吃鸡'
        } else if (message.Content === '2') {
            content = '落地成盒'
        } else if (message.Content.match('爱')) {
            content = '我爱你~'
        }
    } else if (message.MsgType === 'image') {
        options.msgType = 'image';
        options.mediaId = message.MediaId;
        console.log(message.PicUrl);
    } else if (message.MsgType === 'voice') {
        options.msgType = 'voice';
        options.mediaId = message.MediaId;
        console.log(message.Recognition);
    } else if (message.MsgType === 'locatio') {
        content = `维度：${message.Location_X}经度：${message.Location_Y}缩放大小：${message.Scale}位置信息：${message.Lable}`
    } else if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            content = '欢迎关注~'
        } else if (message.Event === 'unsubscribe') {
            console.log('无情取关');
        } else if (message.Event === 'SCAN') {
            content = '用户已经关注过，再扫描带参二维码事件'
        } else if (message.Event === 'LOCATION') {
            content = `维度：${message.Latitude}经度：${message.Longitude}精度：${message.Precision}`
        } else if (message.Event === 'CLICK') {
            content = `您点击了按钮：${message.EventKey	}`
        }
    }

    options.content = content;
    console.log(options);

    return options;
}