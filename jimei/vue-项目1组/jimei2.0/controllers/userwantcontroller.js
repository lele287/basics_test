//本模块负责处理userwant路由相关的业务
var userwantDAL = require("../model/userwantDAL");

var userwantController = {
  getMywant: function (req, res) {
    var userName = req.body.uName;
    userwantDAL.getMywant(userName, function (err, results) {
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

  delwant: function (req, res) {
    var wantId = req.body.wantId;
    userwantDAL.delwant(wantId, function (err, results) {
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

  getAllMes: function (req, res) {
    userwantDAL.getAllMes(function (err, results) {
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

  addWant: function (req, res) {
    var uName = req.body.uName;
    var wantName = req.body.wantName;
    var wantMes = req.body.wantMes;
    var wantTime = req.body.wantTime;
    var wantPrice = req.body.wantPrice;
    var wantPhone = req.body.wantPhone;
    var allMes = {
      uName: uName,
      wantName: wantName,
      wantMes: wantMes,
      wantTime: wantTime,
      wantPrice: wantPrice,
      wantPhone: wantPhone,
    };
    console.log("addWant",allMes)
    userwantDAL.addWant(allMes, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        console.log("results:", results);
        if (results== 1)
          //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
          res.json({ code: 200, msg: "ok", data: results });
        else res.json({ code: 200, msg: "ok", data: 0 });
      }
    });
  },
};
module.exports = userwantController;
