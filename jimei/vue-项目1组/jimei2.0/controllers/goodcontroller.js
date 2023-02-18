//本模块负责处理good路由相关的业务
let goodDAL = require("../model/goodDAL");

let goodController = {
    //推荐商品
    getHotGoods: function(req, res) {
        goodDAL.getHotGoods(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: "数据查询错误" });
            } else {
                res.json({ code: 200, msg: "ok", data: results });
            }
        });
    },
    // 新品上市
    getNewGoods: function(req, res) {
        goodDAL.getNewGoods(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: "数据查询错误" });
            } else {
                res.json({ code: 200, msg: "ok", data: results });
            }
        });
    },
    // 普通商品
    getAllGoods: function(req, res) {
        goodDAL.getAllGoods(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: "数据查询错误" });
            } else {
                res.json({ code: 200, msg: "ok", data: results });
            }
        });
    },
    getGoodSum: function(req, res) {
        goodDAL.getGoodSum(function(err, results) {
            if (err) {
                res.json({ code: 500, msg: "数据查询错误" });
            } else {
                res.json({ code: 200, msg: "ok", data: results });
            }
        });
    },
    //查找类似商品
    searchLikeGoods: function(req, res) {
        let gName = req.query.gName;
        goodDAL.searchLikeGoods(gName, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: "数据查询错误" });
            } else {
                res.json({ code: 200, msg: "ok", data: results });
            }
        });
    },
    getGoodMes: function(req, res) {
        //接受get传参
        var goodId = { goodId: req.query.gid };
        goodDAL.getGoodMes(goodId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length == 1)
                //如果查询到数据应该只有一条，因此长度只有1
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },

    getLikeGoodsMes: function(req, res) {
        var goodId = { goodId: req.body.gid };
        goodDAL.getLikeGoodsMes(goodId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    //根据商品价格级别分类
    getGoodsByPriceLevel: function(req, res) {
        let priceId = { priceId: req.query.priceId };
        goodDAL.getGoodsByPriceLevel(priceId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    gHitAdd: function(req, res) {
        let gId = { gId: req.query.gId };
        goodDAL.gHitAdd(gId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    goodNumSub: function(req, res) {
        let gId = { gId: req.query.gId };
        goodDAL.goodNumSub(gId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    //根据商品是否打折分类
    getGoodsByDiscount: function(req, res) {
        let gDiscount = { gDiscount: req.query.gDiscount };
        goodDAL.getGoodsByDiscount(gDiscount, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    //根据商品的分类来查找商品
    getGoodsBygClassName: function(req, res) {
        let gClassName = { gClassName: req.query.gClassName };
        goodDAL.getGoodsBygClassName(gClassName, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    getGoodsBygClassId: function(req, res) {
        let gClassId = { gClassId: req.query.gClassId };
        goodDAL.getGoodsBygClassId(gClassId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    delGood: function(req, res) {
        let gId = req.body.gId;
        goodDAL.delGood(gId, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    getMes: function(req, res) {
        let uName = req.body.uName;
        goodDAL.getMes(uName, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results.length > 0)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
    setOut: function(req,res){
        console.log("test")
        let gId = req.body.gId;
        let gNum = req.body.gNum;
        let allMes = {
            gId:gId,
            gNum:gNum
        }
        console.log("setOutAllMes",allMes)
        goodDAL.setOut(allMes, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                    res.json({ code: 200, msg: "ok"});
            }
        });
    },
    searchLikeGoods: function(req, res) {
        let gName = req.query.gName;
        goodDAL.searchLikeGoods(gName, function(err, results) {
            if (err) {
                res.json({ code: 500, msg: "数据查询错误" });
            } else {
                res.json({ code: 200, msg: "ok", data: results });
            }
        });
    },
    addGood: function(req, res) {
        var gName = req.goodName;
        var gMes = req.goodMes;
        var gPrice = req.goodPrice;
        var gHits = req.goodHits;
        var gNum = req.goodnumber;
        var gSetterName = req.goodSetterName;
        var gDiscount = req.goodDiscount;
        var ClassName1 = req.goodClassName1;
        var ClassName2 = req.goodClassName2;
        var gPic = req.goodPic;
        var gSetTime = req.goodSetTime;
        var allMes = {
            gName: gName,
            gMes: gMes,
            gPrice: gPrice,
            gHits: gHits,
            gNum: gNum,
            gSetterName: gSetterName,
            gDiscount: gDiscount,
            ClassName1: ClassName1,
            ClassName2: ClassName2,
            gPic: gPic,
            gSetTime: gSetTime,
        };
        goodDAL.addGood(allMes, function(err, results) {
            if (err) {
                console.log("err:", err.message);
                res.json({ code: 500, msg: "错误！" });
            } else {
                if (results == 1)
                //查询返回的是数据，他有条数，可以用length。而增删改这能返回的是一个影响行数。
                    res.json({ code: 200, msg: "ok", data: results });
                else res.json({ code: 200, msg: "ok", data: 0 });
            }
        });
    },
};
module.exports = goodController;