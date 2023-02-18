//本模块负责处理good路由相关的业务
let indexDAL = require("../model/indexDAL");

let indexController = {
  upload: function (req, res) {
    //接受get传参
    var allMes = req;
    console.log("indexController",req);
    indexDAL.upload(allMes, function (err, results) {
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
module.exports = indexController;
