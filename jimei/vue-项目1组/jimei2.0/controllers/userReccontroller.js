//本模块负责处理userRec路由相关的业务
var userRecDAL = require("../model/userRecDAL");

var userRecController = {
  getUserRec: function (req, res) {
    var userName = req.body.userName;
    userRecDAL.getUserRec(userName, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "ok", data: results });
      }
    });
  },

  addUserRec: function (req, res) {
    var userName = req.body.userName;
    var uName = req.body.uName;
    var userPhone = req.body.uPhone;
    var uAddress = req.body.uAddress;
    var allMes = {uName:uName,userName:userName,userPhone:userPhone,uAddress:uAddress}
    userRecDAL.addUserRec(allMes, function (err, results) {
      if (err) {
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "ok", data: results });
      }
    });
  },

  deluserRec: function (req, res) {
    var recId = req.body.recId;
    userRecDAL.deluserRec(recId, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "ok", data: results });
      }
    });
  },

  changeThisRec: function (req, res) {
    var recId = req.body.recId;
    var uName = req.body.uName;
    var uPhone = req.body.uPhone;
    var address = req.body.uAddress;
    var allMes = {recId:recId,uName:uName,uPhone:uPhone,address:address}
    userRecDAL.changeThisRec(allMes, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "ok", data: results });
      }
    });
  },

  getMyRec: function (req, res) {
    var userName = req.query.userName ;
    userRecDAL.getMyRec(userName, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        console.log("results:", results);
        if (results.length > 0)
          //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
          res.json({ code: 200, msg: "ok", data: results });
        else res.json({ code: 200, msg: "ok", data: 0 });
      }
    });
  },
};
module.exports = userRecController;
