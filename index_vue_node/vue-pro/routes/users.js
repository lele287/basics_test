var express = require('express');
var router = express.Router();
var userControll = require('../controllers/usercontroller')
var passport = require('passport')

const { publicDecrypt } = require('crypto');

/* 设置users路由 */
router.get('/', passport.authenticate('jwt',{session:false}),function(req, res, next) {
  res.send('respond with a resource');
});
//查看用户名是否重复
router.get('/checkName', function(req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userControll.checkName(req,res)
});
//注册用户
router.post('/addUser', function(req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userControll.addUser(req,res)
});
//用户登录登录
router.post('/login',function(req,res,next){
  userControll.login(req,res)
})
//收货地址
router.post('/preservation',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.preservation(req,res)
})
//个人资料，提交
router.post('/Profile',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.Profile(req,res)
})
//获取个人资料，页面渲染
router.post('/personalData',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.personalData(req,res)
})
//获取收货地址，页面渲染
router.post('/AddressInitialization',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.AddressInitialization(req,res)
})
//删除收货地址
router.post('/DeleteAddress',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.DeleteAddress(req,res)
})
//设置默认收货地址
router.post('/defaults',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.defaults(req,res)
})
//商品订单
router.post('/CommodityOrder',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.CommodityOrder(req,res)
})
//获取商品订单
router.post('/orderNumber',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.orderNumber(req,res)
})
//获取商品全部订单
router.post('/getAllOrder',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.getAllOrder(req,res)
})
//获取商品待付款订单
router.post('/getNoPayOrder',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.getNoPayOrder(req,res)
})
//获取商品已付款订单
router.post('/getPayedOrder',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.getPayedOrder(req,res)
})
//添加订单
router.post('/AddOrder',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.AddOrder(req,res)
})
//商品订单,保存收货地址
router.post('/SaveShippingAddress',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.SaveShippingAddress(req,res)
})
//修改地址
router.post('/ChangeReceipt',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.ChangeReceipt(req,res)
})
//删除待付款
router.post('/DeletePending',passport.authenticate('jwt',{session:false}),function(req,res,next){
  userControll.DeletePending(req,res)
})
module.exports = router;
