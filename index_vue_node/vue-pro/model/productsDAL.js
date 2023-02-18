//本模板主要负责与user用户数据表进行交互
var dao = require('./dao')

var productsDAL = {
    getproducts: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from drugs where drugsType=?'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    query: function (types, cb) {
        var sql = `select * from drugs where drugsName LIKE '%${types}%';`
        dao(sql, [], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getproductsDetail: function (results, cb) {
        var sql = `select * from drugs where drugsId = ?`
        var params = results
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    addShopping: function (adds, cb) {
        var sql
        var params
        // console.log('addsflag',adds.flag);
        //添加商品到购物车
        if (adds.flag == 'true') {
            sql = ' INSERT into shopping (drugsId,userName,drugsCount) VALUES(?,?,?)'
            params = [adds.getId, adds.username, adds.count]
        } else {
            //修改商品数量
            sql = 'update shopping set drugsCount =? where drugsId = ? and userName = ?'
            params = [adds.count, adds.getId, adds.username]
        }

        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    delShopping: function (adds, cb) {
        var sql = 'DELETE from shopping where drugsId in (?) and userName = ?'
        var params = [adds.drId, adds.username]
        // console.log('params',typeof (adds.drId));

        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })

    },
    delAllShopping: function (adds, cb) {
        var sql = 'DELETE from shopping where userName = ?'
        var params = [adds.username]
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })

    },
    checkProducts: function (results, cb) {
        var sql = 'select * from shopping where drugsId = ? and userName = ?'
        // console.log('results:',results);  
        var params = [results.getId, results.username]
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    showShopping: function (results, cb) {
        var sql = 'select drugsCount,temp.* from shopping left join (select * from drugs) temp on shopping.drugsId = temp.drugsId where userName = ?'
        // console.log('results:',results);  
        var params = results
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    PageRendering: function (type, cb) {
        var sql = 'select * from drugs where drugsType=? limit 15'
        dao(sql, type, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    referOrder: function (adds, cb) {
        var sql = 'select * from shopping left join (select * from drugs) temp on shopping.drugsId = temp.drugsId where shopping.drugsId in (?) and userName= ?'
        var params = [adds.drId, adds.username]
        // console.log('params1',params);

        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })

    },
    drugsPlate: function (type, cb) {
        var sql = 'select * from plate where plateType=? limit 4'
        dao(sql, type, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },


}
module.exports = productsDAL