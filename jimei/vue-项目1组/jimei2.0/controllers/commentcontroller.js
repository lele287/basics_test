//本模块负责处理comment路由相关的业务
var commentDAL = require("../model/commentDAL");

var commentController = {
  getEvaluation: function (req, res) {
    //接受get传参
    var goodId = { goodId: req.query.gid };
    commentDAL.getEvaluation(goodId, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        console.log("results:", results);
        if (results.length > 0)
          //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
          res.json({ code: 200, msg: "ok", data: results });
        else res.json({ code: 200, msg: "no", data: 0 });
      }
    });
  },
  addComment: function (req, res) {
    //接受get传参
    var goodId = req.body.gid ;
    var userName = req.body.uName;
    var time = req.body.time;
    var level = req.body.level;
    var mes = req.body.mes;
    var allMes = {userName:userName,goodId:goodId,time:time,level:level,mes:mes}
    commentDAL.addComment(allMes, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {

         res.json({ code: 200, msg: "finish" });
      }
    });
  },
};
module.exports = commentController;