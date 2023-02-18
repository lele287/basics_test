const express = require('express');
const app = express();
// const sha1 = require('sha1')
// const reply = require('./reply');
// const Wechat = require('./wechat/wechat')
// const { url } = require('./config')
const router = require('./router');

// 配置模板资源目录
app.set('views', './views');
// 配置模板引擎
app.set('view engine', 'ejs');

// 应用路由器
app.use(router);

// 监听端口号
app.listen(3000, () => console.log('服务器启动成功了~'));