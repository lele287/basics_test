var express = require('express');
var router = express.Router();
//加载token模块
var jwt = require('jsonwebtoken') 

/* 设置根路由. */
router.get('/', function(req, res, next) {
  res.json({code:200,msg:'ok',data:[]})
});
//设置登录路由
router.post('/login', function(req, res, next) {
  //1.接受传参
  var loginUser = req.body
  //2.验证
  if(loginUser.userTel == '13988888888' && loginUser.userPwd == '888'){
    //创建token并返回
    jwt.sign(
      {userTel:loginUser.userTel,useHeadPic:'face.jpg',userEmail:'alex@163.com'},
    'privateKey',
    {expiresIn:60*60},
    function(err,token){
      res.json({code:200,msg:'登录成功！',data:'Bearer ' + token})
    })
  }else{
    res.json({code:200,msg:'登录失败！'})
  }
});
module.exports = router;
