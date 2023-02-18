var express = require("express");
var router = express.Router();
let ordercontroller = require('../controllers/ordercontroller')

/*评价路由*/
router.post("/setOrder", function (req, res, next) {
  ordercontroller.setOrder(req, res);
});

router.post("/getOrder", function (req, res, next) {
  ordercontroller.getOrder(req, res);
});

router.post("/changeOrder", function (req, res, next) {
  ordercontroller.changeOrder(req, res);
});

router.post("/delOrder", function (req, res, next) {
  ordercontroller.delOrder(req, res);
});

router.post("/addOrder", function (req, res, next) {

  ordercontroller.addOrder(req, res);
});

router.post("/getTab", function (req, res, next) {
console.log(req.body);
  ordercontroller.getTab(req, res);
});

module.exports = router;
