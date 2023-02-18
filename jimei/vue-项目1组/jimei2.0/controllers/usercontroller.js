//本模块负责处理user路由相关的业务
let userDAL = require('../model/userDAL');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let userController = {
    loginUser: function(req, res) {
        console.log(req.body);

        var userName = req.body.userName
        var password = req.body.userPwd
        userDAL.checkName(userName, function(err, results) {
            if (err) {
                console.log(err.message)
                res.json({ code: 500, msg: '数据查询错误' })
            } else {
                if (results.length > 0) {
                    bcrypt.compare(password, results[0].uPwd,
                        function(err, result) {
                            if (result) {
                                jwt.sign({ userName: results[0].uName }, 'privateKey', { expiresIn: 60 * 60 }, function(err, token) {
                                    console.log(results);
                                    res.json({
                                        code: 200,
                                        msg: '登录成功！',
                                        data: 1,
                                        token: 'Bearer ' + token
                                    })
                                })

                                // res.json({ code: 200, msg: 'ok', data: 1 });
                            } else {
                                res.json({ code: 200, msg: 'ok', data: 0 })
                            }
                        });
                } else {
                    res.json({ code: 200, msg: 'ok', data: 0 })
                }
            }
        })

    },
    checkName: function(req, res) {
        let userName = req.body.userName
        userDAL.checkName(userName, function(err, results) {
            if (err) {
                res.json({ conde: 500, msg: '数据查询错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '用户名重复' }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '用户名不重复' }))
                }
            }
        })
    },
    addUser: function(req, res) {
        let userName = req.body.userName
        let password = req.body.userPwd
        let userPhone = req.body.userPhone
        userDAL.checkName(userName, function(err, results) {
            if (err) {
                res.json({ conde: 500, msg: '数据查询错误' })
            } else {
                if (results.length > 0) {
                    res.json({ code: 200, msg: 'ok', data: -1 })
                } else {
                    //加盐
                    bcrypt.genSalt(10, function(err, salt) {
                        //加密
                        bcrypt.hash(password, salt, function(err, hash) {
                            //hash是加密后的字符串
                            let newUser = { userName: userName, password: hash, userPhone: userPhone }
                            userDAL.addUser(newUser, function(err, results) {
                                if (err) {
                                    console.log(err.message)
                                    res.json({ conde: 500, msg: '数据查询错误' })
                                } else {
                                    if (results.affectedRows > 0) {
                                        res.json({ code: 200, msg: 'ok', data: 1 })
                                    } else {
                                        res.json({ code: 200, msg: 'ok', data: 0 })
                                    }
                                }
                            })
                        });
                    });
                }
            }
        })
    },
    updateMes: function(req, res) {
        let userName = req.body.uName
        let password = req.body.userPassword
        let userPhone = req.body.userPhone
        let userSchool = req.body.userSchool
            //加盐
        bcrypt.genSalt(10, function(err, salt) {
            //加密
            bcrypt.hash(password, salt, function(err, hash) {
                //hash是加密后的字符串
                let userMes = { userName: userName, password: hash, userPhone: userPhone, userSchool: userSchool }
                userDAL.updateMes(userMes, function(err, results) {
                    if (err) {
                        console.log(err.message)
                        res.json({ conde: 500, msg: '数据查询错误' })
                    } else {
                        if (results.affectedRows > 0) {
                            res.json({ code: 200, msg: 'ok', data: 1 })
                        } else {
                            res.json({ code: 200, msg: 'ok', data: 0 })
                        }
                    }
                })
            });
        });
    },
    changeRec: function(req, res) {
        let recId = req.body.recId
        let userName = req.body.userName
        let allMes = { recId: recId, userName: userName }
        userDAL.changeRec(allMes, function(err, results) {
            if (err) {
                res.json({ conde: 500, msg: '数据查询错误' })
            } else {
                if (results.length == 1) {
                    res.end(JSON.stringify({ code: 200, message: 'success', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '失败', data: results }))
                }
            }
        })
    },
    getHead: function(req, res) {
        let userName = req.body.uName
        userDAL.getHead(userName, function(err, results) {
            if (err) {
                res.json({ conde: 500, msg: '数据查询错误' })
            } else {
                if (results.length == 1) {
                    res.end(JSON.stringify({ code: 200, message: 'success', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '失败', data: results }))
                }
            }
        })
    },
    getMes: function(req, res) {
        let userName = req.body.uName
        userDAL.getMes(userName, function(err, results) {
            if (err) {
                res.json({ conde: 500, msg: '数据查询错误' })
            } else {
                if (results.length == 1) {
                    res.end(JSON.stringify({ code: 200, message: 'success', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '失败', data: results }))
                }
            }
        })
    },
    getPhone: function(req, res) {
        let userName = req.body.uName
        userDAL.getPhone(userName, function(err, results) {
            if (err) {
                res.json({ conde: 500, msg: '数据查询错误' })
            } else {
                res.end(JSON.stringify({ code: 200, message: 'ok', data: results }))
            }
        })
    },
}
module.exports = userController