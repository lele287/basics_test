//本模板主要负责与user用户数据表进行交互
var dao = require('./dao')

var userDAL = {
    addUser:function(newUser,cb){
        var sql = 'INSERT into user (userName,userPwd) VALUES(?,?)'
        var params = [newUser.userName,newUser.userPwd]
        // console.log(newUser);
        
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                cb(null,results)
            }
        })
    },
    checkName:function(user,cb){
        var sql = 'select * from user where userName = ?'
        var params = [user.userName]
        // console.log(user.userName)
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    login:function(user,cb){
        var sql = 'select * from user where userName=?'
        var params = [user.userName]
        dao(sql,params,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    preservation:function(user,cb){
        var sql = 'INSERT INTO address (fullName,cellPhone,location,detail,floor,userName) VALUES(?,?,?,?,?,?);'
        var params = [user.name,user.cellPhone,user.location,user.detail,user.floor,user.userName]
        
        dao(sql,params,function(err,results){
            // console.log(results);
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    Profile:function(user,cb){
        // var sql = 'INSERT INTO user (userPhoto,Nickname,userSex,userHigh,userWeight,userAge) VALUES(?,?,?,?,?,?);'
        var sql = "UPDATE user set userPhoto= ?,Nickname= ?,userSex= ?,userHigh= ?,userWeight= ?,userAge= ?  WHERE userName = ?"
        var params = [user.userPhoto,user.Nickname,user.userSex,user.userHigh,user.userWeight,user.userAge,user.userName]
        dao(sql,params,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, params)
            }
        })
    },
    personalData:function(userName,cb){
        var sql = 'select userHealthyId,userPhoto,Nickname,userSex,userHigh,userWeight,userAge from user  where userName = ?;'

        dao(sql,userName,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    AddressInitialization:function(userName,cb){
        var sql = 'select addressId,fullName,cellPhone,location,floor,detail,defaults from address  where userName = ?;'
        dao(sql,userName,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    defaults:function(addressIds,cb){
        var sql = 'UPDATE address SET defaults = 1 WHERE addressId = ?;UPDATE address SET defaults = 0 WHERE not addressId = ? and userName = ?;'
        var addressId = addressIds.addressId
        var userName = addressIds.userName
        // console.log("addressId",addressId);
        // console.log("userName",userName);
        dao(sql,[addressId,addressId,userName],function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    DeleteAddress:function(userName,cb){
        var sql = 'DELETE FROM address WHERE addressId = ?;'

        dao(sql,userName,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    CommodityOrder:function(shopping,cb){
        var sql = 'INSERT into `order` (userName,drugsId,drugsCount,ToBePaid,orderTime) VALUES(?,?,?,?,?);'
        var userName = shopping.userName
        var drugsId = shopping.shoppingId
        var drugsCount = shopping.drugsCount
        var ToBePaid = shopping.ToBePaid
        var orderTime = shopping.orderTime
        var params =[userName,drugsId,drugsCount,ToBePaid,orderTime]
        // console.log('params',params);
        
        dao(sql,params,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    orderNumber:function(orderId,cb){
        var sql = 'select * from drugs left join (select * from `order`  where orderId = ?) temp on drugs.drugsId = temp.drugsId where drugs.drugsId =temp.drugsId;'
        var orderId = orderId.orderId
        dao(sql,[orderId],function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    AddOrder:function(insertId,cb){
        var sql = 'UPDATE `order` SET ToBePaid = 1 WHERE orderId = ?;'
        dao(sql,[insertId],function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    SaveShippingAddress:function(addressIds,cb){
        var sql = 'UPDATE `order` SET addressId = ? WHERE orderId = ?;'
        // var sql = 'INSERT into `order` (addressId) VALUES(?);'
        var addressId = addressIds.addressId
        var insertId = addressIds.insertId
        dao(sql,[addressId,insertId],function(err,results){
            // console.log(results);
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getAllOrder:function(userName,cb){
        var sql = 'select * from `order` left join (select * from drugs) temp on `order`.drugsId = temp.drugsId where userName = ?'
        dao(sql,userName,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getNoPayOrder:function(userName,cb){
        var sql = 'select * from `order` left join (select * from drugs) temp on `order`.drugsId = temp.drugsId where userName = ? and ToBePaid=0'
        dao(sql,userName,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    getPayedOrder:function(userName,cb){
        var sql = 'select * from `order` left join (select * from drugs) temp on `order`.drugsId = temp.drugsId where userName = ? and ToBePaid=1'
        // console.log(userName);
        
        dao(sql,userName,function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    ChangeReceipt:function(data,cb){
        var sql = 'UPDATE address SET fullName=?,cellPhone = ?,location=?,floor=?,detail=? WHERE addressId = ?;'
        dao(sql,[data.fullName,data.cellPhone,data.location,data.floor,data.detail,data.addressId],function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    DeletePending:function(orderId,cb){
        console.log("orderId",orderId);
        var sql = 'DELETE FROM `order` WHERE orderId = ?;'
        dao(sql,[orderId],function(err,results){
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    
}
module.exports = userDAL