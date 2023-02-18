//本模板主要负责与user用户数据表进行交互
var dao = require('./dao')

var indexDAL = {
    //推荐商品

    upload: function(allMes, cb) {
        let sql = 'UPDATE `jimei`.`userinfos` SET `uHead` = ? WHERE (`uName` = ?);'
        let params = [allMes.picStr,allMes.userName]
        console.log("params",params)
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },

}
module.exports = indexDAL