var express = require('express');
var router = express.Router();
var passport = require('passport')

/* 设置users路由 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//获取所有的员工数据
router.get('/getAllUsers',passport.authenticate('jwt',{session:false}),function(req, res, next) {
  //通过req.user可以获取已经合法登录过的用户信息
  console.log('data:',req.user)
  var users = [
    {uName:'tom',age:18,sex:true},
    {uName:'jack',age:20,sex:true},
    {uName:'mary',age:18,sex:false},
  ]
  res.json({code:200,msg:'获取了全部用户数据！',data:users})
});

//获取指定的员工数据
router.get('/getUserById',passport.authenticate('jwt',{session:false}), function(req, res, next) {
  //连接数据库，获取数据，并发往客户端
  res.json({code:200,msg:'获取了指定ID的用户数据！'})
});

//获取根据姓名模糊查询的员工数据
router.get('/getUserByName',passport.authenticate('jwt',{session:false}), function(req, res, next) {
  //连接数据库，获取数据，并发往客户端
  res.json({code:200,msg:'获取了模糊查询数据！'})
});
//更新员工姓名
router.post('/updUser', function(req, res, next) {
  //连接数据库，获取数据，并发往客户端
  res.json({code:200,msg:'更新了用户数据！'})
});
//删除员工数据
router.get('/delUser', function(req, res, next) {
  //连接数据库，获取数据，并发往客户端
  res.json({code:200,msg:'删除了用户数据！'})
});
module.exports = router;
