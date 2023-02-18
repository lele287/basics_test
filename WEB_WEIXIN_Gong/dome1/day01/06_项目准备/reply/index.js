// 验证服务器有效性模块

const sha1 = require('sha1');
// 引入config模块
const config = require('../config');
const { getUserDataAsync, parseXMLAsync, formatMessage } = require('../utils/tool')
const template = require('./template')
const reply = require('./reply')

module.exports = () => {
    return async(req, res, next) => {
        // console.log(req.query);

        const { signature, echostr, timestamp, nonce } = req.query;
        const { token } = config;
        // 字典排序，sort
        // const arr = [timestamp, nonce, token];
        // const arrSort = arr.sort();
        // console.log(arrSort);

        // sha1加密
        // const str = arr.join('');
        // const sha1Str = sha1(str);
        // console.log(sha1Str);

        const sha1Str = sha1([timestamp, nonce, token].sort().join(''));
        if (req.method === 'GET') {
            // 生成signatrue，与微信做对比
            if (sha1Str === signature) {
                res.send(echostr)
            } else {
                res.end('error')
            }
        } else if (req.method === 'POST') {
            // 验证消息来自于微信服务器
            if (sha1Str !== signature) {
                res.end('error');
            }
            // console.log(req.query);

            const xmlData = await getUserDataAsync(req)
                // console.log(xmlData);

            const jsData = await parseXMLAsync(xmlData)
                // console.log(jsData);

            const message = formatMessage(jsData);
            console.log(message);

            const options = await reply(message);

            let replyMessage = template(options)
            console.log(replyMessage);
            // `
            // <xml>
            //     <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
            //     <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
            //     <CreateTime>${(new Date()).getTime()}</CreateTime>
            //     <MsgType><![CDATA[text]]></MsgType>
            //     <Content><![CDATA[${content}]]></Content>
            //     <MsgId>1234567890123456</MsgId>
            // </xml>`

            // 返回响应给微信服务器
            res.end(replyMessage)
        } else {
            res.end('error')
        }
    }
}