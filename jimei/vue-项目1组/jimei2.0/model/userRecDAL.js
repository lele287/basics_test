//本模板主要负责与userRec用户数据表进行交互
var dao = require("./dao");

var userRecDAL = {
    getUserRec: function (userName, cb) {
    var sql =
      "select * from userrec where recId = (select userRecId from userinfos where uName = ?)";
    var params = [userName];
    console.log("userRecParams",params)
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  getMyRec: function (userName, cb) {
    var sql =
      "select * from userrec where userInfos_uId = (select uId from userinfos where uName = ?)";
    var params = [userName];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  deluserRec: function (recId, cb) {
    var sql =
      "DELETE FROM `jimei`.`userrec` WHERE (`recId` = ?);";
    var params = recId;
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  changeThisRec: function (allMes, cb) {
    var sql =
      "UPDATE `jimei`.`userrec` SET `recName` = ?, `recAddress` = ?, `recPhone` = ? WHERE (`recId` = ?);";
    var params = [allMes.uName,allMes.address,allMes.uPhone,allMes.recId];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },

  addUserRec: function (allMes, cb) {
    var sql =
      " INSERT INTO `jimei`.`userrec` (`userInfos_uId`, `recName`, `recPhone`, `recAddress`) VALUES ((select uId from userinfos where uName = ?), ?, ?, ?);";
    var params = [allMes.userName,allMes.uName,allMes.userPhone,allMes.uAddress];
    dao(sql, params, function (err, results) {
      if (err) {
        cb(err, null);
      } else {
        cb(null, results);
      }
    });
  },
};
module.exports = userRecDAL;
