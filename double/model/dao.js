var mysql = require('mysql')
function db(sql,params,cb){
    var connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        database: "mydb",
        user: "root",
        password: "123456",
        multipleStatements: true    //支持多语句操作
    });NaN
    connection.connect(function (err) {
        if (err) {
            console.log("数据库连接失败！");
            res.end(
                JSON.stringify({ code: 500, message: "无法查询数据！" })
            );
        } else {
            connection.query(sql, params, function (err, results) {
                if (err) {
                    cb(err,null)    //执行回调函数，并且把参数返回
                } else {
                    cb(null,results)
                }
            });
        }
        connection.end();
    });
}
module.exports = db
