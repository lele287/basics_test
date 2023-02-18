//本模块负责处理good路由相关的业务
let shoppingCartDAL = require("../model/shoppingCartDAL");

let shoppingCartController = {
  addShoppingCart: function (req, res) {
    //接受get传参
    var userName = req.body.uName;
    var goodId = req.body.gid;
    var goodNum = req.body.goodNum;
    var allMEs = { goodId: goodId, userName: userName,goodNum:goodNum};
    shoppingCartDAL.addShoppingCart(allMEs, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        console.log("购物车返回数据", results);
        if (results.length == 1)
          //如果查询到数据应该只有一条，因此长度只有1
          res.json({ code: 200, msg: "ok", data: 1 });
        else res.json({ code: 200, msg: "ok", data: 0 });
      }
    });
  },
  getMes: function (req, res) {
    var userName = req.body.uName;
    shoppingCartDAL.getMes(userName, function (err, results) {
      if (err) {
        console.log("err:", err.message);
      } else {
        if (results.length > 0) {
          res.json({ code: 200, msg: "存在", data: results });
        } else {
          res.json({ code: 200, msg: "购物车为空", data: results });
        }
      }
    });
  },
  delMes: function (req, res) {
    var SCRId = req.body.SCRId;
    shoppingCartDAL.delMes(SCRId, function (err, results) {
      if (err) {
        console.log("err:", err.message);
      } else {
        res.json({ code: 200, msg: "删除成功", data: results });
      }
    });
  },
};
module.exports = shoppingCartController;
