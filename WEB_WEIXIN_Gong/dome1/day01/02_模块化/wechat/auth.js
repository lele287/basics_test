// 验证服务器有效性模块

const sha1 = require('sha1');
// 引入config模块
const config = require('../config');


module.exports = () => {
    return (req, res, next) => {
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
    }
}