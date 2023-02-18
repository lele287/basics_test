const express = require('express');
const app = express();
const auth = require('./wechat/auth');

app.use(auth());

// 监听端口号
app.listen(3000, () => console.log('服务器启动成功了~'));