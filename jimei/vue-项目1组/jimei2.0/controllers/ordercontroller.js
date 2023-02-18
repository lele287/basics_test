//本模块负责处理order路由相关的业务
var orderDAL = require("../model/orderDAL");


var orderController = {
  getTab:function(req,res){
    let uName = req.body.uName;
    let uGetTab = req.body.uTab;
    let allMes = {uName:uName,uGetTab:uGetTab};
    orderDAL.getTab(allMes, function (err, results) {
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
  setOrder: function (req, res) {
    //接受get传参
    var goodId = req.query.gId;
    var userId = req.query.uId;
    var order = { userId: userId, goodId: goodId };
    orderDAL.setOrder(order, function (err, results) {
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
  addOrder: function (req, res) {
    //接受post传参
    var userName = req.body.userName
    var goodId = req.body.goodId
    var goodNum = req.body.goodNum
    var time = req.body.time
    var tPrice = req.body.tPrice
    var order = { userName:userName, goodId: goodId,goodNum:goodNum,time:time,tPrice:tPrice };
    orderDAL.addOrder(order, function (err, results) {
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

  getOrder: function (req, res) {
    //接受post传参
    var userName = { userName: req.body.uName };
    orderDAL.getOrder(userName, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        if (results.length > 0)
          //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
          res.json({ code: 200, msg: "ok", data: results });
        else res.json({ code: 200, msg: "ok", data: 0 });
      }
    });
  },
  changeOrder: function (req, res) {
    //接受post传参
    var orderId = { orderId: req.body.oId };
    orderDAL.changeOrder(orderId, function (err, results) {
      if (err) {
        console.log('错误信息为：',err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        if (results.length == 1)
          //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
          res.json({ code: 200, msg: "ok", data: 1 });
        else res.json({ code: 200, msg: "ok", data: 0 });
      }
    });
  },
  delOrder: function (req, res) {
    //接受post传参
    var orderId = { orderId: req.body.oId };
    orderDAL.delOrder(orderId, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        console.log("results:", results);
        if (results.length > 0)
          //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
          res.json({ code: 200, msg: "ok", data: 1 });
        else res.json({ code: 200, msg: "ok", data: 0 });
      }
    });
  }
};
module.exports = orderController;
