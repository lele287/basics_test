//本模块负责处理user路由相关的业务
var userDAL = require('../model/userDAL')
var qs = require('querystring')
var url = require('url')
var path = require('path')
var formidable = require('formidable');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
const { parse } = require('path');

var userController = {
    addUser: function (req, res) {
        //接受post传参
        var userName = req.body.userName
        var userPwd = req.body.userPwd
        //加盐
        bcrypt.genSalt(10, function (err, salt) {
            //加密
            bcrypt.hash(userPwd, salt, function (err, hash) {
                //hash是加密后的字符串
                // console.log(`原码：${userPwd},加密后：`, hash)
                //写入数据库的代码。。。。。。
                var newUser = { userName: userName, userPwd: hash }
                userDAL.addUser(newUser, function (err, results) {
                    if (err) {
                        // console.log('err:', err.message)
                        res.json({ code: 500, msg: '用户注册错误' })
                    } else {
                        if (results.affectedRows > 0)
                            res.json({ code: 200, msg: 'ok', data: 1 })
                        else
                            res.json({ code: 200, msg: 'ok', data: 0 })
                    }
                })
            });
        });

    },
    checkName: function (req, res) {
        //接受get传参
        // var user = qs.parse(url.parse(req.url).search.slice(1))
        var user = req.query
        // console.log(req.query);
        userDAL.checkName(user, function (err, results) {
            if (err) {
                // console.log('err:', err.message)
                res.end(JSON.stringify({ code: 500, message: '错误！' }))
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '用户名重复' }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '用户名不重复' }))
                }
            }
        })
    },
    login: function (req, res) {
        //接受post传参
        // console.log(req.body);
        var userName = req.body.userName
        var userPwd = req.body.userPwd
        var Usertext = { userName: userName, userPwd: userPwd }
        userDAL.login(Usertext, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '用户登录失败' })
            } else {
                //检验密码正确性
                if (results.length == 0) {
                    res.end(JSON.stringify({ code: 200, message: '登录失败！' }))
                } else {
                    bcrypt.compare(userPwd, results[0].userPwd, function (err, result) {
                        if (result) {
                            jwt.sign({ userName }, 'privateKey', { expiresIn: 60 * 60 * 24 }, function (err, token) {
                                res.end(JSON.stringify({ code: 200, message: '登录成功！', data: 'Bearer ' + token }))
                            })
                        } else {
                            res.end(JSON.stringify({ code: 200, message: '登录失败！' }))
                        }
                    });
                }

            }
        })
    },
    preservation: function (req, res) {
        //接受post传参
        var name = req.body.name
        var cellPhone = req.body.cellPhone
        var location = req.body.location
        var detail = req.body.detail
        var floor = req.body.floor
        var userName = req.body.userName
        var param = { name: name, cellPhone: cellPhone, location: location, detail: detail, floor: floor, userName: userName }
        userDAL.preservation(param, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '添加收货地址错误' })
            } else {
                if (results) {
                    res.end(JSON.stringify({ code: 200, message: '添加成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '添加失败！', data: results }))
                }
            }
        })
    },

    Profile: function (req, res) {
        //接受post传参
        var form = new formidable.IncomingForm()
        form.uploadDir = path.join(__dirname, '..', 'public', 'upload')  //设置路径
        form.keepExtensions = true        //保留文件扩展名
        form.parse(req, function (err, fields, files) {
            // var userPhoto = parse(files.portrait.path).base
            if (files.portrait) {
                var userPhoto = parse(files.portrait.path).base
                // console.log(files.portrait.path);
            } else {
                var userPhoto = parse(fields.portrait).base
            }
            var Nickname = fields.Nickname
            var userSex = fields.men
            var userHigh = fields.height
            var userWeight = fields.weight
            var userAge = fields.Age
            var userName = fields.userName
            //   res.json({code:200,msg:'ok'})
            var param = { userPhoto: userPhoto, Nickname: Nickname, userSex: userSex, userHigh: userHigh, userWeight: userWeight, userAge: userAge, userName: userName }
            userDAL.Profile(param, function (err, results) {
                if (err) {
                    console.log('err:', err.message)
                    res.json({ code: 500, msg: '保存个人资料错误' })
                } else {
                    if (results) {
                        res.end(JSON.stringify({ code: 200, message: '保存个人资料成功！', data: results }))
                    } else {
                        res.end(JSON.stringify({ code: 200, message: '保存个人资料失败！', data: results }))
                    }
                }
            })
        })
    },
    personalData: function (req, res) {
        //接受post传参
        var userName = req.body.userName
        userDAL.personalData(userName, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '获取个人资料错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '获取个人资料成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '获取个人资料失败！', data: results }))
                }
            }
        })
    },
    AddressInitialization: function (req, res) {
        //接受post传参
        var userName = req.body.userName
        userDAL.AddressInitialization(userName, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '获取收货地址错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '获取收货地址成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '获取收货地址失败！', data: results }))
                }
            }
        })
    },
    defaults: function (req, res) {
        //接受post传参
        var addressId = { addressId: req.body.addressId, userName: req.body.userName }
        userDAL.defaults(addressId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '设置默认收货地址错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '设置默认收货地址成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '设置默认收货地址失败！', data: results }))
                }
            }
        })
    },
    DeleteAddress: function (req, res) {
        //接受post传参
        var addressId = req.body.addressId
        userDAL.DeleteAddress(addressId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '删除收货地址错误' })
            } else {
                res.json({ code: 200, msg: '删除收货地址成功' })
            }
        })
    },
    CommodityOrder: function (req, res) {
        //接受post传参
        // var shoppingId = req.body.shoppingId
        // var ToBePaid = req.body.ToBePaid
        var shopping = {userName: req.body.userName, shoppingId: req.body.shoppingId,drugsCount: req.body.drugsCount, ToBePaid: req.body.ToBePaid ,orderTime : req.body.orderTime }
        // console.log(shopping);
        userDAL.CommodityOrder(shopping, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '添加商品订单错误' })
            } else {
                if (results) {
                    res.end(JSON.stringify({ code: 200, message: '添加商品订单成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '添加商品订单失败！', data: results }))
                }
            }
        })
    },
    orderNumber: function (req, res) {
        //接受post传参
        // var userName = req.body.userName
        var orderId = { orderId: req.body.orderId }
        userDAL.orderNumber(orderId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '获取订单号错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号失败！', data: results }))
                }
            }
        })
    },
    getAllOrder: function (req, res) {
        var userName = req.body.userName
        // console.log('ccc',userName);
        
        userDAL.getAllOrder(userName, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '获取订单号错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号失败！', data: results }))
                }
            }
         })
    },
    getNoPayOrder: function (req, res) {
        var userName = req.body.userName
        // console.log('ccc',userName);
        
        userDAL.getNoPayOrder(userName, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '获取订单号错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号失败！', data: results }))
                }
            }
        })
    },
    getPayedOrder: function (req, res) {
        var userName = req.body.userName
        // console.log('ccc',userName);
        
        userDAL.getPayedOrder(userName, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '获取订单号错误' })
            } else {
                if (results.length > 0) {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '获取订单号失败！', data: results }))
                }
            }
         })
    },
    AddOrder: function (req, res) {
        //接受post传参
        var insertId = req.body.insertId.insertId
        userDAL.AddOrder(insertId, function (err, results) {
            if (err) {
                res.json({ code: 500, msg: '添加订单错误' })
            } else {
                if (results) {
                    res.end(JSON.stringify({ code: 200, message: '添加订单成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '添加订单失败！', data: results }))
                }
            }
        })
    },
    
    SaveShippingAddress: function (req, res) {
        //接受post传参
        var addressId = { addressId: req.body.addressId,insertId:req.body.insertId}
        // console.log(addressId);
        userDAL.SaveShippingAddress(addressId, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '保存订单收货地址错误' })
            } else {
                if (results) {
                    res.end(JSON.stringify({ code: 200, message: '保存订单收货地址成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '保存订单收货地址失败！', data: results }))
                }
            }
        })
    },
    ChangeReceipt: function (req, res) {
        //接受post传参
        var addressId = req.body.addressId
        var fullName = req.body.fullName
        var cellPhone = req.body.cellPhone
        var location = req.body.location
        var floor = req.body.floor
        var detail = req.body.detail
        var data = {addressId,fullName,cellPhone,location,floor,detail}
        // console.log(data);
        userDAL.ChangeReceipt(data, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '修改地址错误' })
            } else {
                if (results) {
                    res.end(JSON.stringify({ code: 200, message: '修改地址成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '修改地址失败！', data: results }))
                }
            }
        })
    },
    DeletePending: function (req, res) {
        //接受post传参
        var orderId = req.body.orderId
        userDAL.DeletePending(orderId, function (err, results) {
            if (err) {
                console.log('err:', err.message)
                res.json({ code: 500, msg: '删除待付款错误' })
            } else {
                if (results) {
                    res.end(JSON.stringify({ code: 200, message: '删除待付款成功！', data: results }))
                } else {
                    res.end(JSON.stringify({ code: 200, message: '删除待付款失败！', data: results }))
                }
            }
        })
    },
}
module.exports = userController