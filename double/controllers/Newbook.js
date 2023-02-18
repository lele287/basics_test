//本模块处理novel路由相关业务
var DALbooks = require('../model/bookDAL')
var url = require('url')
const { parse } = require('path')
const { query } = require('express')
var jwt = require("jsonwebtoken");
var Newbooks = {
    //注册
    register: function (req, res) {
        var userName = req.body.userName
        var userPwd = req.body.userPwd
        var Tel = req.body.Tel
        var newUser = { userName: userName, userPwd: userPwd, Tel: Tel }
        DALbooks.register(newUser, function (err, results) {
            if (err) {
                res.json({ code: 500, message: '用户注册错误！' })
            } else {
                if (results.affectedRows > 0) {
                    res.json({ code: 200, msg: '注册成功！', data: 1 })
                } else {
                    res.json({ code: 200, msg: '注册成功！', data: 0 })
                }
            }
        })
    },
    //登录
    login: function (req, res) {
        var userTel = req.body.userTel
        var userPwd = req.body.userPwd
        var newUser = { userTel: userTel, userPwd: userPwd }
        DALbooks.login(newUser, function (err, results) {
            if (err) {
                res.json({ code: 500, message: '用户登录错误！', data: err })
            } else {
                if (results.length) {
                    //创建token并返回
                    jwt.sign({ userTel }, 'privateKey', { expiresIn: 60 * 60 * 24 }, function (err, token) {
                        res.json({ code: 200, msg: '登录成功！', data: 'Bearer ' + token })
                    })
                    // res.json({ code: 200, msg: '登录成功！', data: 'Bearer ' + token })
                } else {
                    res.json({ code: 200, msg: '登录失败!', data: 0 })
                }
            }
        })
    },
    //查询全部书单
    getAllbooks: function (req, res) {
        DALbooks.getAllbooks(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '推荐书籍数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //查询用户
    user: function (req, res) {
        var username = req.user.userTel
        DALbooks.user(username, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '推荐书籍数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //模糊查询
    getAllnames: function (req, res) {
        var bookname = req.query.bookname
        DALbooks.getAllnames(bookname, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '数据模糊查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //章节
    chapters: function (req, res) {
        DALbooks.chapters(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '推荐书籍数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //排行榜书单
    rankbooks: function (req, res) {
        DALbooks.rankbooks(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '排行榜书单查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //充值传参
    aa: function (req, res) {
        DALbooks.aa(function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '影视文学数据查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //查询加入个人书架得图书
    bookcase: function (req, res) {
        var bookname = req.query.userPhoneNumber
        DALbooks.bookcase(bookname, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '加入收藏书单查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //加入收藏并判断图书是否存在
    join: function (req, res) {
        var aa = parse(req.originalUrl).name.split('?')[1].split('&')
        var userTel = aa[0].replace(/userPhoneNumber=/gi, '')
        var novelId = aa[1].replace(/ak=/gi, '')
        DALbooks.bookcase1(userTel, novelId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '加入个人书单错误' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 500, msg: '数据已经存在' })
                } else {
                    var newUser = { userTel: userTel, novelId: novelId }
                    DALbooks.join(newUser, function (err, results) {
                        if (err) {
                            res.json({ code: 500, message: '用户插入错误！' })
                        } else {
                            if (results.affectedRows > 0) {
                                res.json({ code: 200, msg: '加入成功！', data: 1 })
                            } else {
                                res.json({ code: 200, msg: '注册成功！', data: 0 })
                            }
                        }
                    })
                }
            }
        })
    },
    //图书详情信息
    bookinfo: function (req, res) {
        var bookname = req.query.param
        DALbooks.bookinfo(bookname, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '加入收藏书单查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //图书详情章节
    bookchapters: function (req, res) {
        var bookname = req.query.param
        DALbooks.bookchapters(bookname, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '加入收藏书单查询错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //用户加载头像
    uploadpic: function (req, res) {
        console.log('req.query',req.query);
        var userPic = req.query.userpic
        var userName = req.query.username
        // var userPwd = req.query.userpwd
        var list = {userPic,userName}
        DALbooks.uploadpic(list, function (err, results) {
            if (err) {
                console.log('err1',err);
                res.json({ code: 500, msg: '添加头像错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
    //修改用户个人信息
    changeuserlist: function (req, res) {
        console.log('req.query',req.query);
        var nickname = req.query.nickname
        var userId = req.query.userId
        var newdata = req.query.newdata
        var newaddress = req.query.newaddress
        var placeholder = req.query.placeholder
        var list = {nickname,userId,newdata,newaddress,placeholder}
        DALbooks.changeuserlist(list, function (err, results) {
            if (err) {
                console.log('err1',err);
                res.json({ code: 500, msg: '修改个人信息错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },








    
    //删除用户书架图书
    delbook: function (req, res) {
        console.log('req.query',req.query);
        var bookId = req.query.bookid
        var userName = req.query.username
        var list = {bookId,userName}
        console.log('list',list);
        DALbooks.delbook(list, function (err, results) {
            if (err) {
                console.log('err1',err);
                res.json({ code: 500, msg: '删除用户图书错误' })
            } else {
                res.json({ code: 200, msg: 'ok', data: results })
            }
        })
    },
}
module.exports = Newbooks