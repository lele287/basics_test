//本模板主要负责与user用户数据表进行交互
var dao = require("./dao");

var userDAL = {
    checkName:function(userName,cb){
        var sql='select * from userinfos where uName=?'
        var params = [userName]
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                cb(null,results)
            }
        })
    },
    getMes:function(userName,cb){
        var sql='select * from userinfos where uName=?'
        var params = [userName]
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                cb(null,results)
            }
        })
    },
    addUser:function(newUser,cb){
        var sql=`insert into userinfos(uName,uPwd,uPhone,uHead) value(?,?,?,'images/tx.jpg')`
        var params = [newUser.userName,newUser.password,newUser.userPhone]
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                console.log(results)
                cb(null,results)
            }
        })
    },
    changeRec:function(allMes,cb){
        var sql='UPDATE `jimei`.`userinfos` SET `userRecId` = ? WHERE (`uName` = ?);'
        var params = [allMes.recId,allMes.userName]
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                console.log(results)
                cb(null,results)
            }
        })
    },
    getHead:function(userName,cb){
        var sql='select uHead from userinfos where uName = ?'
        var params = [userName]
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                console.log(results)
                cb(null,results)
            }
        })
    },
    updateMes:function(userMes,cb){
        var sql='UPDATE `jimei`.`userinfos` SET `uPhone` = ?, `uPwd` = ?, `uSchool` = (select schoolId from school where schoolName = ?) WHERE (`uName` = ?);'
        var params = [userMes.userPhone,userMes.password,userMes.userSchool,userMes.userName]
        console.log("updateMes",params)
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                console.log(results)
                cb(null,results)
            }
        })
    },
    getPhone:function(userName,cb){
        console.log("getPhone",userName)
        var sql='select uPhone from userinfos where uName=?'
        var params = [userName]
        console.log("getphone",params)
        dao(sql,params,function(err,results){
            if(err){
                cb(err,null)
            }else{
                cb(null,results)
            }
        })
    },
}
module.exports = userDAL
