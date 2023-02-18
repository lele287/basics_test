//本模块负责处理news路由相关的业务
var nousDAL = require('../model/nousDAL')
var qs = require('querystring')
var url = require('url')

var nouscontroller = {
    getNous: function (req, res) {
        //接受get传参
        var type = req.query.key
        var types = { type: type }
        nousDAL.getNous(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getNousId: function (req, res) {
        //接受get传参
        var type = req.query.key
        var types = { type: type }
        nousDAL.getNousId(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getSort: function (req, res) {
        //接受get传参
        var type = req.query.key
        var types = { type: type }
        nousDAL.getSort(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getByIdType: function (req, res) {
        //接受get传参
        var type = req.query.key
        var types = { type: type }
        nousDAL.getByIdType(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    addComment: function (req, res) {
        //接受get传参
        var userName = req.query.userName
        var newId= req.query.newId
        var commentContent = req.query.commentContent
        var commentDate = req.query.commentDate
        var text = { userName:userName,newId:newId,commentContent:commentContent,commentDate:commentDate }
        console.log('text',text);
        
        nousDAL.addComment(text, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getComment: function (req, res) {
        //接受get传参
        var key = req.query.key
        var text = { key:key}
  
        nousDAL.getComment(text, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getCommentId: function (req, res) {
        //接受get传参
        var key = req.query.key
        var text = { key:key}
  
        nousDAL.getCommentId(text, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getVirus: function (req, res) {
        //接受get传参
        var type = req.query.userName
        var types = { type: type }
        nousDAL.getVirus(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getVirusId: function (req, res) {
        //接受get传参
        var type = req.query.userName
        var types = { type: type }
        nousDAL.getVirusId(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getByIdTypes: function (req, res) {
        //接受get传参
        var type = req.query.userName
        var types = { type: type }
        nousDAL.getByIdTypes(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
}
module.exports = nouscontroller