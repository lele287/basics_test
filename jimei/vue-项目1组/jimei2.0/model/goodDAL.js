//本模板主要负责与user用户数据表进行交互
var dao = require('./dao')
const { all } = require('../routes/goods')

var goodDAL = {
    //推荐商品
    getHotGoods: function(cb) {
        let sql = 'select * from goods order by gHits desc'
        dao(sql, [], function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    // 新品上市
    getNewGoods: function(cb) {
        let sql = 'select * from goods order by gSetTime desc'
        dao(sql, [], function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //普通商品
    getAllGoods: function(cb) {
        let sql = 'select * from goods'
        dao(sql, [], function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getGoodSum: function(cb) {
        let sql = `SELECT fatherName cName,Sum(count) amount FROM (SELECT ClassName ,count(Class_ClassId) count,ClassFather_fahterId FROM goods g RIGHT join class c on g.Class_ClassId = c.ClassId GROUP BY c.ClassId) tem RIGHT JOIN classfather cf on tem.ClassFather_fahterId = cf.fatherId GROUP BY fatherId;`
        dao(sql, [], function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //查找类似商品
    searchLikeGoods: function(gName, cb) {
        let sql = `select * from goods where gName like '%${gName}%'`
        dao(sql, [], function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getGoodMes: function(goodId, cb) {
        var sql = 'select * from goods g left join userInfos u on g.gSetterId = u.uId where gId=?'
        var params = [goodId.goodId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getLikeGoodsMes: function(goodId, cb) {
        var sql = 'select * from goods where Class_classId = (select Class_classId from goods where gId=?)'
        var params = [goodId.goodId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getGoodsByPriceLevel: function(priceId, cb) {
        let sql = 'SELECT * FROM (SELECT gId,gName,gPrice,gPic,PriceId from goods g,pricelevel p where g.gPrice between p.minPrice and p.maxPrice) tem WHERE PriceId = ?'
        let params = [priceId.priceId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    delGood: function(gId, cb) {
        let sql = 'DELETE FROM `jimei`.`goods` WHERE (`gId` = ?)'
        let params = gId;
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getMes: function(uName, cb) {
        let sql = 'select * from goods where gSetterId = (select uId from userinfos where uName = ?)'
        let params = uName;
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getGoodsByDiscount: function(gDiscount, cb) {
        let sql = 'SELECT * from goods where gDiscount = ?'
        let params = [gDiscount.gDiscount];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getGoodsBygClassName: function(gClassName, cb) {
        let sql = 'SELECT * from goods where Class_ClassId = (SELECT ClassId FROM class WHERE ClassName = ?)'
        let params = [gClassName.gClassName];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getGoodsBygClassId: function(gClassId, cb) {
        let sql = 'SELECT * from goods where Class_ClassId = ?'
        let params = [gClassId.gClassId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    gHitAdd: function(gId, cb) {
        let sql = 'update goods set gHits = (gHits + 1) where gId = ?'
        let params = [gId.gId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    goodNumSub: function(gId, cb) {
        let sql = 'update goods set gNum = (gNum - 1) where gId = ?'
        let params = [gId.gId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    setOut: function(allMes, cb) {
        let sql = 'update goods set gNum = (gNum - ?) where gId = ?'
        let params = [allMes.gNum,allMes.gId];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    addGood: function(allMes, cb) {
        let sql = 'INSERT INTO `jimei`.`goods` (`gName`, `gMes`, `gPrice`, `gHits`, `gNum`, `gSetterId`, `gDiscount`, `Class_ClassId`, `gPic`, `gSetTime`) VALUES (?,?, ?, ?, ?,(select uId from userinfos where uName = ?),? ,(SELECT ClassId FROM (SELECT * FROM class where ClassFather_fahterId = (SELECT fatherId FROM classfather where fatherName = ?)) temp WHERE ClassName = ?) , ?, ?)'
        let params = [
            allMes.gName,
            allMes.gMEs,
            allMes.gPrice,
            allMes.gHits,
            allMes.gNum,
            allMes.gSetterName,
            allMes.gDiscount,
            allMes.ClassName1,
            allMes.ClassName2,
            allMes.gPic,
            allMes.gSetTime
        ];
        dao(sql, params, function(err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
}
module.exports = goodDAL