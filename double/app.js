var createError = require('http-errors');
// var http = require("http");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

var indexRouter = require('./routes/index');
var novelsRouter = require('./routes/novels');

//设置web工程的根目录
app.use(express.static(__dirname + '/'));
 
// 允许跨域
app.all('*', function(req, res, next) {
  console.log(req.headers.origin)
  console.log(req.environ)
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  // res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method === "OPTIONS") res.send(200);/*让options请求快速返回*/
  else  next();

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//1.导入第三方验证模块
var passport = require('passport')
//2.导入自定义的验证模块
var myPassport = require('./config/passport')

//加载跟路由
app.use('/', indexRouter);
//加载一级路由
// app.use('/users', usersRouter);
app.use('/novels',novelsRouter)

//3.初始化第三方验证模块
app.use(passport.initialize())
//4.调用自定义的验证模块方法
myPassport(passport)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// http.createServer(app).listen(3000);
module.exports = app;
