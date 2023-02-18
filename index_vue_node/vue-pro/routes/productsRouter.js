var express = require('express');
var router = express.Router();
var productsControll = require('../controllers/productscontroller')
var passport = require('passport')

/* 设置users路由 */
router.get('/',passport.authenticate('jwt',{session:false}), function (req, res, next) {
  res.send('respond with a resource');
});
//查询分类药品
router.get('/getproducts',function(req,res,next){
  productsControll.getproducts(req,res)
})

//查询药品
router.get('/query',function(req,res,next){
  productsControll.query(req,res)
})
//查询药品详情
router.get('/getproductsDetail',function(req,res,next){
  productsControll.getproductsDetail(req,res)
})
//将点击的药品信息存入数据库
router.get('/addShopping',passport.authenticate('jwt',{session:false}),function(req,res,next){
  productsControll.addShopping(req,res)
})
//删除购物车某些商品
router.get('/delShopping',passport.authenticate('jwt',{session:false}),function(req,res,next){
  productsControll.delShopping(req,res)
})
//删除购物车所有商品
router.get('/delAllShopping',passport.authenticate('jwt',{session:false}),function(req,res,next){
  productsControll.delAllShopping(req,res)
})
//重复加入相同商品，若已加入则增加数量
router.get('/checkProducts',passport.authenticate('jwt',{session:false}),function(req,res,next){
  productsControll.checkProducts(req,res)
})
//查询当前用户的购物车商品
router.get('/showShopping',passport.authenticate('jwt',{session:false}),function(req,res,next){
  productsControll.showShopping(req,res)
})
//首页面渲染
router.get('/PageRendering',function(req,res,next){
  productsControll.PageRendering(req,res)
})
//提交订单
router.get('/referOrder',passport.authenticate('jwt',{session:false}),function(req,res,next){
  productsControll.referOrder(req,res)
})
//品牌
router.get('/drugsPlate',function(req,res,next){
  productsControll.drugsPlate(req,res)
})
module.exports = router;