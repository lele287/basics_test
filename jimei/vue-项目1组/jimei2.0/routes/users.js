let express = require("express");
let router = express.Router();
let userController = require("../controllers/usercontroller");
let https = require("https");
let formidable = require("formidable")
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
//获取用户数据
router.post("/getMes", function (req, res, next) {
  userController.getMes(req, res);
});
//获取用户名和密码
router.post("/login", function (req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userController.loginUser(req, res);
});
//判断用户名是否已注册
router.post("/checkName", function (req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userController.checkName(req, res);
});
//注册完成添加到数据库
router.post("/register", function (req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userController.addUser(req, res);
});
//获取用户手机号
router.post("/getPhone", function (req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userController.getPhone(req, res);
});
//更改用户默认收货地址
router.post("/changeRec", function (req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userController.changeRec(req, res);
});
//更新信息
router.post("/updateMes", function (req, res, next) {
  console.log(req.body)
  //连接数据库，获取数据，并发往客户端
  userController.updateMes(req, res);
});

router.post("/getHead", function (req, res, next) {
  //连接数据库，获取数据，并发往客户端
  userController.getHead(req, res);
});

//发送短信验证码
router.get("/getValidCode", function (req, res, next) {
  let mobile = req.query["mobile"];
  let code = "0000" + Math.ceil(10000 * Math.random());
  code = code.slice(code.length - 4);
  let url = `https://106.ihuyi.com/webservice/sms.php?method=Submit&account=C83225212&password=a93b4ea150f355e4192445cae740084b&mobile=${mobile}&content=您的验证码是：${code}。请不要把验证码泄露给其他人。`;
  console.log("url:", url);
  https.get(url, function (response) {
    let fullcontent = "";
    response.on("data", function (content) {
      fullcontent += content;
    });
    response.on("end", function () {
      console.log("full:", fullcontent);
      let reg = /<code>(\d)<\/code>/gi;
      let sendResult = reg.exec(fullcontent)[1];
      if (sendResult == 2) {
        res.json({ code: 200, msg: "ok", data: code });
      } else {
        res.jons({ code: 500, msg: "验证码发送失败！" });
      }
    });
  });
});
module.exports = router;
