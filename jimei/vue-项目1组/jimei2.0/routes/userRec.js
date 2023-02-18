var express = require("express");
var router = express.Router();
let userReccontroller = require("../controllers/userReccontroller");

/*用户默认收货路由*/
router.post("/getUserRec", function (req, res, next) {
  userReccontroller.getUserRec(req, res);
});

/*用户所有收货路由*/
router.get("/getMyRec", function (req, res, next) {
  userReccontroller.getMyRec(req, res);
});

/*添加收货路由*/
router.post("/addUserRec", function (req, res, next) {
  console.log("add",req.body)
  userReccontroller.addUserRec(req, res);
});

/*删除收货路由*/
router.post("/deluserRec", function (req, res, next) {
  userReccontroller.deluserRec(req, res);
});


/*修改收货路由*/
router.post("/changeThisRec", function (req, res, next) {
  userReccontroller.changeThisRec(req, res);
});

module.exports = router;