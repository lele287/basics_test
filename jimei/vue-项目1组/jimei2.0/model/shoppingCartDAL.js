//本模板主要负责与shoppingCart购物车表进行交互
var dao = require("./dao");

var shoppingCartDAL = {
    addShoppingCart: function(allMes, cb) {
        var sql =
            "INSERT INTO `jimei`.`shoppingcart` (`goods_gId`, `SCRGoodsNum`, `userInfos_uId`) VALUES (?,?,(select uId from userinfos where uName = ?));";
        var params = [allMes.goodId, allMes.goodNum, allMes.userName];
        console.log("购物车params", params);
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, results);
            }
        });
    },
    getMes: function(userName, cb) {
        var sql = "select gName,gPic,gPrice,SCRGoodsNum,SCRId,gId,gNum from jimei.goods g join (select * FROM jimei.shoppingcart where userInfos_uId = (select uId from jimei.userinfos where uName = ?)) t on g.gId = t.goods_gId";
        var params = [userName]
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, results);
            }
        });
    },
    delMes: function(SCRId, cb) {
        var sql = "DELETE FROM `jimei`.`shoppingcart` WHERE (`SCRId` = ?);";
        var params = [SCRId]
        console.log(params)
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null);
            } else {
                cb(null, results);
            }
        });
    },
};
module.exports = shoppingCartDAL;