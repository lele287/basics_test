//本模块负责处理collection路由相关的业务
var collectionDAL = require("../model/collectionDAL");

var collectioncontroller = {
  addMes: function (req, res) {
    //接受post传参
    var goodId = req.body.gId;
    var userName = req.body.uName;
    var allMes = { goodId: goodId, userName: userName };
    console.log("添加收藏", allMes);
    collectionDAL.addMes(allMes, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "success"});
      }
    });
  },
  check:function(req,res){
    var gId = req.body.gId;
    var uName = req.body.uName;
    let allMes = { gId:gId,uName:uName};
    collectionDAL.check(allMes,function(err,results){
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      }
      else{
        res.json({code:200 ,msg:"success" , data:results})
      }
    })
  },
  delChoice:function(req,res){
    var gId = req.body.gId;
    var uName = req.body.uName;
    let allMes = { gId:gId,uName:uName};
    collectionDAL.delChoice(allMes,function(err,results){
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      }
      else{
        res.json({code:200 ,msg:"success" , data:results})
      }
    })
  },
  getMes: function (req, res) {
    //接受post传参
    var userName = req.body.uName;
    collectionDAL.getMes(userName, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "success",data:results});
      }
    });
  },
  delMes: function (req, res) {
    //接受post传参
    var cId = req.body.cId;
    collectionDAL.delMes(cId, function (err, results) {
      if (err) {
        console.log("err:", err.message);
        res.json({ code: 500, msg: "错误！" });
      } else {
        res.json({ code: 200, msg: "success"});
      }
    });
  },
};
module.exports = collectioncontroller;
