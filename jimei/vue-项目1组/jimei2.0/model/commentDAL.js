//本模板主要负责与comment评价表进行交互
var dao = require("./dao");

var commentDAL = {
  getEvaluation: function (goodId, cb) {
    var sql =
      "select comMes,comDate,comLevel,uName from userinfos u left join comments c on u.uId = c.userInfos_uId where goods_gId = ? ORDER BY comDate DESC";
    var params = [goodId.goodId];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
  addComment: function (allMes, cb) {
    var sql =
      "INSERT INTO `jimei`.`comments` (`userInfos_uId`, `goods_gId`, `comDate`, `comMes`, `comLevel`) VALUES ((select uId from userinfos where uName = ?), ?, ?, ?, ?);";
    var params = [allMes.userName,allMes.goodId,allMes.time,allMes.mes,allMes.level];
    // console.log(params)
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
