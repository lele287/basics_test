//本模板主要负责与order订单表进行交互
var dao = require("./dao");

var orderDAL = {
  addOrder: function (order, cb) {
    var sql =
      "INSERT INTO `jimei`.`order` (`oTPrice`, `userInfos_uId`, `oState`, `oTime`, `oGoodsNum`, `goods_gId`) VALUES (?,(select uId from userinfos where uName = ?), '0',?, ?, ?);";
      var params = [order.tPrice,order.userName,order.time,order.goodNum,order.goodId];
      console.log(params);
      dao(sql, params, function (err, results) {
        if (err) {
          cb(err, null);
        } else {
          cb(null, results);
        }
      });
  },
  getTab: function (allMes, cb) {
    var sql =
      "select * from userinfos u join (select * from goods g join (select * FROM jimei.order where userInfos_uId = (select uId from userinfos where uName = ?)) temp on g.gId = temp.goods_gId) t on t.gSetterId=u.uId where oState = ?;";
    var params = [allMes.uName,allMes.uGetTab];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  getOrder: function (user, cb) {
    var sql =
      "select * from userinfos u join (select * from goods g join (select * FROM jimei.order where userInfos_uId = (select uId from userinfos where uName = ?)) temp on g.gId = temp.goods_gId) t on t.gSetterId=u.uId  ORDER BY oTime DESC;";
    var params = user.userName;
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  changeOrder: function (order, cb) {
    var sql = "update `order` set oState = oState+1 where oId = ?";
    var params = [order.orderId];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  delOrder: function (order, cb) {
    var sql = "delete from jimei.order where oId=?";
    var params = [order.orderId];
    console.log(params);
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
};
module.exports = orderDAL;
