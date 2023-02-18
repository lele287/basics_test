//本模板主要负责与userwant用户求购表进行交互
var dao = require("./dao");

var userwantDAL = {
    getMywant: function (userName, cb) {
    var sql =
      "SELECT * FROM jimei.userwant uw join jimei.userinfos ui on uw.userInfos_uId = ui.uId  where userInfos_uId=(select uId from userinfos where uName = ?)";
    var params = userName;
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  delwant: function (wantId, cb) {
    var sql =
      "DELETE FROM `jimei`.`userwant` WHERE (`wantId` = ?);";
    var params = wantId;
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  addWant: function (allMes, cb) {
    var sql =
      "INSERT INTO `jimei`.`userwant` (`userInfos_uId`, `wantName`, `wantMes`, `wantTime`, `wantPrice`, `wantPhone`) VALUES ((select uId from userinfos where uName = ?), ?, ?, ?, ?, ?);";
    var params = [allMes.uName,allMes.wantName,allMes.wantMes,allMes.wantTime,allMes.wantPrice,allMes.wantPhone];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  getAllMes: function (cb) {
    var sql =
      "SELECT * FROM jimei.userwant uw join jimei.userinfos ui on uw.userInfos_uId = ui.uId;";
      var params = [];
    dao(sql, params, function (err, results) {
        console.log("getAllMesHere",results)
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
};
module.exports = userwantDAL;
