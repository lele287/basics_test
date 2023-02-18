var express = require("express");
var router = express.Router();
let collectioncontroller = require("../controllers/collectioncontroller");

/*收藏路由*/
//添加数据路由
router.post("/addMes", function (req, res, next) {
  collectioncontroller.addMes(req, res);
});
//查询数据路由
router.post("/getMes", function (req, res, next) {
  collectioncontroller.getMes(req, res);
});
//删除数据路由
router.post("/delMes", function (req, res, next) {
  collectioncontroller.delMes(req, res);
});
//检查是否已收藏
router.post("/check",function(req,res,next){
  collectioncontroller.check(req,res)
});
//删除选中的路由
router.post("/delChoice", function (req, res, next) {
  collectioncontroller.delChoice(req, res);
});
module.exports = router;
