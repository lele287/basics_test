//本模板主要负责与user用户数据表进行交互
var dao = require('./dao')

var nousDAL={
    getNous: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from news where newsTypeDetail=?'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getNousId: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from news where newId=?'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getSort: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from news where newsTypeDetail=? order by newsTime desc'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getByIdType: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from news where newsTypeDetail = (select newsTypeDetail from news where newId = ?)'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    addComment: function (texts, cb) {
        var params = [texts.userName,texts.newId,texts.commentContent,texts.commentDate]
        var sql = 'insert into comment (userName,newId,commentContent,commentDate) value(?,?,?,?)'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getComment: function (texts, cb) {
        var params = [texts.key]
        var sql = 'select * from news right join (select * from comment ) temp on news.newId = temp.newId where newsTypeDetail = ?'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getCommentId: function (texts, cb) {
        var params = [texts.key]
        var sql = 'select * from comment where newId = ? order by commentId desc'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getVirus: function (types, cb) {
        var params = [types.type]
        console.log(params);
        var sql = 'select * from epidemic where epidemicType=?'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getVirusId: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from epidemic where epidemicId=?'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getByIdTypes: function (types, cb) {
        var params = [types.type]
        var sql = 'select * from epidemic where epidemicType = (select epidemicType from epidemic where epidemicId = ?)'
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
}
module.exports = nousDAL
