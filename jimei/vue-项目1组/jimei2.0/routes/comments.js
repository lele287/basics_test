var express = require("express");
var router = express.Router();
let commentcontroller = require("../controllers/commentcontroller");

/*评价路由*/
//获取指定商品的所有评价
router.get("/getEvaluation", function (req, res, next) {
  commentcontroller.getEvaluation(req, res);
});

//向数据库添加评价数据
router.post("/addComment", function (req, res, next) {
  commentcontroller.addComment(req, res);
});

module.exports = router;
