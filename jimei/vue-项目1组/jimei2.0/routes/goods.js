var express = require("express");
var router = express.Router();
var path = require('path');
var formidable = require('formidable')
let goodcontroller = require('../controllers/goodcontroller');

/*商品路由*/
//推荐商品
router.get("/getHotGoods", function(req, res, next) {
    goodcontroller.getHotGoods(req, res);
});

//新品上市
router.get("/getNewGoods", function(req, res, next) {
    goodcontroller.getNewGoods(req, res);
});
//普通商品
router.get("/getAllGoods", function(req, res, next) {
    goodcontroller.getAllGoods(req, res);
});
//查找类似商品
router.get("/searchLikeGoods", function(req, res, next) {
    goodcontroller.searchLikeGoods(req, res)
})

//获取某一价格级别的商品
router.get("/getGoodsByPriceLevel", function(req, res, next) {
        goodcontroller.getGoodsByPriceLevel(req, res)
    })
    //根据商品的是否折扣分类
router.get("/getGoodsByDiscount", function(req, res, next) {
        goodcontroller.getGoodsByDiscount(req, res)
    })
    //根据商品的分类来查找商品
router.get("/getGoodsBygClassName", function(req, res, next) {
    goodcontroller.getGoodsBygClassName(req, res)
})
router.get("/getGoodsBygClassId", function(req, res, next) {
        goodcontroller.getGoodsBygClassId(req, res)
    })
    //点击商品之后商品点击量+1
router.get("/gHitAdd", function(req, res, next) {
    goodcontroller.gHitAdd(req, res)
})

router.get("/goodNumSub", function(req, res, next) {
    goodcontroller.goodNumSub(req, res)
})

router.get("/getGoodSum", function(req, res, next) {
    goodcontroller.getGoodSum(req, res)
})

router.get("/GoodMes", function(req, res, next) {
    goodcontroller.getGoodMes(req, res);
});

router.post("/likeGoods", function(req, res, next) {
    goodcontroller.getLikeGoodsMes(req, res);
});

router.post("/setOut",function(req,res,next){
    console.log("setOut",req.body)
    goodcontroller.setOut(req,res)
})

router.post("/addGood", function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, "..", "public", "upload");
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        // console.log("fields:", fields);
        // console.log("files:", files);

        // console.log("goodPic", path.basename(files.goodPic.path))


        var req = {
            goodName: fields.goodName,
            goodMes: fields.goodMes,
            goodPrice: fields.goodPrice,
            goodHits: fields.goodHits,
            goodnumber: fields.goodnumber,
            goodSetterName: fields.goodSetterName,
            goodClassName1: fields.goodClassName1,
            goodClassName2: fields.goodClassName2,
            goodDiscount: fields.goodDiscount,
            goodSetTime: fields.goodSetTime,
            goodPic: path.basename(files.goodPic.path)
        }
        console.log(req)
        goodcontroller.addGood(req, res);
    })

});

router.post("/delGood", function(req, res, next) {
    console.log(req.body)
    goodcontroller.delGood(req, res);
});

router.post("/getMes", function(req, res, next) {
    console.log(req.body)
    goodcontroller.getMes(req, res);
});
module.exports = router;