//本模板主要负责与collection收藏表进行交互
var dao = require("./dao");

var commentDAL = {
  addMes: function (allMes, cb) {
    var sql =
      "INSERT INTO `jimei`.`collection` (`userInfos_uId`, `goods_gId`) VALUES ((select uId from userinfos where uName = ?), ?)";
    var params = [allMes.userName,allMes.goodId];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  check:function(allMes,cb){
    let sql = "SELECT COUNT(*) num FROM (SELECT * FROM collection WHERE userInfos_uId = (SELECT uId FROM userinfos where uName = ?)) temp WHERE goods_gId = ?";
    let params = [allMes.uName,allMes.gId];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  delChoice:function(allMes,cb){
    let sql = "DELETE from collection WHERE (userinfos_uId = (SELECT uid from userinfos where uName = ?)&& goods_gId = ?)";
    let params = [allMes.uName,allMes.gId];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  getMes: function (userName, cb) {
    var sql =
      "select * from (select * from goods g join (SELECT * FROM collection WHERE userInfos_uId = (SELECT uId FROM userinfos where uName = ?)) temp on g.gId = temp.goods_gId) temp2 join userinfos u on temp2.gSetterId = u.uId;";
    var params = userName;
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },  
  delMes: function (cId, cb) {
    var sql =
      "DELETE FROM `jimei`.`collection` WHERE (`collectionId` = ?);";
    var params = cId;
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
};
module.exports = commentDAL;
