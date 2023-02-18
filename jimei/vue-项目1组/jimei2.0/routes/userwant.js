var express = require("express");
var router = express.Router();
let userwantcontroller = require("../controllers/userwantcontroller");

/*求购路由*/
//获取登录用户求购商品
router.post("/getMywant", function (req, res, next) {
  userwantcontroller.getMywant(req, res);
});

//删除选择的求购信息
router.post("/delwant",function(req,res,next){
    userwantcontroller.delwant(req,res);
})

//获取所有求购信息
router.post("/getAllMes",function(req,res,next){
    userwantcontroller.getAllMes(req,res);
})

//发布求购信息
router.post("/addWant",function(req,res,next){
    userwantcontroller.addWant(req,res);
})
module.exports = router;
