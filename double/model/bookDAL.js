//模块主要负责与novel数据表进行交互
var dao = require('./dao')
var DALbooks = {
    //注册传表
    register: function (user, cb) {
        // console.log(user)
        var sql = 'insert into users(userNickName,userPwd,userPhoneNumber) values(?,?,?)'
        var params = [user.userName, user.userPwd, user.Tel]
        dao(sql, params, function (err, results) {
            // console.log('我的results',results)
            if (err) {
                // console.log('err:',err.message)
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //登录传表
    login: function (user, cb) {
        // console.log('user:',user)
        var sql = 'select * from users where userPhoneNumber=? and userPwd=?'
        var params = [user.userTel, user.userPwd]

        // console.log('params:',params);

        dao(sql, params, function (err, results) {
            // console.log(results)
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //全部书籍
    getAllbooks: function (cb) {
        var sql = 'select * from novels'
        dao(sql, [], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //查询用户
    user: function (username,cb) {
        // console.log('username',username);
        var sql = `select * from users where userPhoneNumber = ?`
        dao(sql, [username], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //模糊查询
    getAllnames: function (bookname, cb) {
        var sql = `select * from novels where novelType like '%${bookname}%' or novelName like '%${bookname}%'`
        dao(sql, [bookname], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //章节
    chapters: function (cb) {
        var sql = `select novels.novelType,novels.novelName,chapters.chapterName,novels.authorName,date_format(chapterUpdateTime ,'%Y-%m-%d' ) from chapters,novels where novels.novelId = chapters.novelId ORDER  BY date_format(chapterUpdateTime ,'%Y-%m-%d' ) desc`
        dao(sql, [], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //排行榜书单
    rankbooks: function (cb) {
        var sql = 'select * from novels'
        dao(sql, [], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //加入收藏书单查询
    bookcase: function (bookname, cb) {
        var sql = `select * from novels,userbookcase where novels.novelId =userbookcase.novelId and userPhoneNumber = '${bookname}'`
        dao(sql, [bookname], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //加入收藏书单查询是否存在
    bookcase1: function (userTel,novelId, cb) {
        var sql = `select * from userbookcase where userPhoneNumber = '${userTel}' and novelId = '${novelId}'`
        dao(sql, [userTel,novelId], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //加入收藏
    join: function (book, cb) {
        console.log('book',book);
        var sql = 'insert into userbookcase(userPhoneNumber,novelId) values(?,?)'
        var params = [book.userTel,book.novelId]
        // console.log(params);
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },

    //图书详情页面
    bookinfo: function (bookname,cb) {
        var sql = `select * from novels where novelId = '${bookname}'`
        dao(sql, [bookname], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    // 图书详情页面
    bookchapters: function (bookname,cb) {
        // console.log('bookname++++++++++',bookname);
        var sql = `select * from chapters where novelId = '${bookname}'`
        dao(sql, [bookname], function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },

    //添加用户头像
    uploadpic: function (userPic, cb) {
        console.log('用户图片：',userPic);
        console.log('user',userPic);
        var sql = `update users set userImg = '${userPic}' where userPhoneNumber = 'userPic.userName'`
        var params = [userPic.userName,userPic.userPic,userPic.userPwd]
        console.log('params111',params);
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    //修改用户个人信息
    changeuserlist: function (userlist, cb) {
        console.log('user',userlist);

        var sql = `update users set userNickName ='${userlist.nickname}' , userBirth = '${userlist.newdata}' , userAddress ='${userlist.newaddress}' , userIntroduce ='${userlist.placeholder}' where userId = '${userlist.userId}'`


        var params = [userlist.nickname,userlist.userId,userlist.newdata,userlist.newaddress,userlist.placeholder]
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
    
    //删除用户书架图书
    delbook: function (bookId, cb) {
        console.log('user',bookId);
        
        var sql = `delete from userbookcase where userPhoneNumber = '${bookId.userName}' and novelId = '${bookId.bookId}'`
        var params = [bookId.userName,bookId.bookId]
        console.log('params111',params);
        dao(sql, params, function (err, results) {
            if (err) {
                cb(err, null)
            } else {
                cb(null, results)
            }
        })
    },
}
module.exports = DALbooks