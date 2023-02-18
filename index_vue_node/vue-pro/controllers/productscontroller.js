//本模块负责处理products路由相关的业务
var productsDAL = require('../model/productsDAL')
var qs = require('querystring')
var url = require('url')

var productscontroller = {
    getproducts: function (req, res) {
        //接受get传参
        var type = req.query.key
        var types = { type: type }
        productsDAL.getproducts(types, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })


            }
        })
    },
    query: function (req, res) {
        //接受get传参
        var type = req.query.userName
        productsDAL.query(type, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    getproductsDetail: function (req, res) {
        //接受get传参
        var getId = req.query.key
        // console.log('接收：' + getId);
        productsDAL.getproductsDetail(getId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    addShopping: function (req, res) {
        //接受get传参
        var getId = req.query.key
        var username = req.query.userName
        var count = req.query.counts
        var flag = req.query.flag
        var texts = { getId: getId, username: username, count: count, flag: flag }
        // console.log('text:',texts);

        productsDAL.addShopping(texts, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '商品加入失败' })
            } else {
                if (results.affectedRows > 0)
                    res.json({ code: 200, msg: 'ok', data: 1 })
                else
                    res.json({ code: 200, msg: 'ok', data: 0 })
            }
        })
    },
    delShopping: function (req, res) {
        var username = req.query.userName;
        var drId = req.query.drId;
        // console.log(drId);
        
        var texts = { drId: drId, username: username }
        console.log("texts",texts);
        productsDAL.delShopping(texts, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '商品删除错误', data: 0 })
            } else {
                res.json({ code: 200, msg: 'ok', data: 1 })

            }
        })
    },
    delAllShopping: function (req, res) {
        var username = req.query.userName;
        var texts = { username: username }
        productsDAL.delAllShopping(texts, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '商品删除错误' })
            } else {
                res.json({ code: 200, msg: 'ok' })

            }
        })
    },
    checkProducts: function (req, res) {
        //接受get传参
        var getId = req.query.key
        var username = req.query.username
        var texts = { getId: getId, username: username }
        // console.log('getId：',getId)
        productsDAL.checkProducts(texts, function (err, results) {
            if (err) {
                // console.log('err:', err.message)
                res.end(JSON.stringify({ code: 500, message: '错误！' }))
            } else {
                if (results.length > 0) {
                    // console.log('d1:', results);

                    res.end(JSON.stringify({ code: 200, message: '该商品已加入过', data: results }))
                } else {
                    // console.log('d2:', results);
                    res.end(JSON.stringify({ code: 200, message: '该商品还未加入过', data: results }))
                }
            }
        })
    },

    showShopping: function (req, res) {
        var userName = req.query.username
        // console.log('userName',userName);

        productsDAL.showShopping(userName, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },

    PageRendering: function (req, res) {
        //接受get传参
        var type = [req.query.userName]
        productsDAL.PageRendering(type, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    referOrder: function (req, res) {
        var username = req.query.userName;
        var drId = req.query.drId;
       
        // console.log("d1",drId);
       
        var texts = { drId: drId, username: username }
        console.log(texts);
        
        productsDAL.referOrder(texts, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '订单提交失败' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    drugsPlate: function (req, res) {
        //接受get传参
        var type = [req.query.userName]
        productsDAL.drugsPlate(type, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
}
module.exports = productscontroller