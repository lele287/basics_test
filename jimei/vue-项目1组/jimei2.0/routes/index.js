var express = require('express');
var router = express.Router();
var formidable = require("formidable")
var path = require('path');


var indexcontroller = require('../controllers/indexcontroller')

const { domain } = require('process');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//用户头像上传
router.post("/upload", function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '..', 'public', 'upload');
    form.keepExtensions = true //设置保留文件扩展名
        //接收并做后续处理
    form.parse(req, function(err, fields, files) {
        console.log("fields:", fields.userName)
        console.log("files:", files.userHead.path)
        var mes = { userName: fields.userName, picStr: path.basename(files.userHead.path) }
        indexcontroller.upload(mes, res);
    })
});
module.exports = router;