var express = require("express");
var router = express.Router();
let shoppingCartcontroller = require("../controllers/shoppingCartcontroller");

/*购物车路由*/
//添加信息到购物车
router.post("/addShoppingCart", function (req, res, next) {
  shoppingCartcontroller.addShoppingCart(req, res);
});

//查询登录用户的购物车
router.post("/getMes", function (req, res, next) {
  shoppingCartcontroller.getMes(req, res);
});

//删除相关购物车数据
router.post("/delMEs", function (req, res, next) {
  shoppingCartcontroller.delMes(req, res);
});


module.exports = router;