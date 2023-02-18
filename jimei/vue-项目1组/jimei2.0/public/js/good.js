// var Random = Mock.Random;
Date.prototype.Format = function(fmt) {
    // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ?
                o[k] :
                ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};

$(function() {
    //放大镜
    $("#left").mouseover(function() {
        $("#mask").css("display", "block");
        $("#right").css("display", "block");
    });
    $("#left").mouseout(function() {
        $("#mask").css("display", "none");
        $("#right").css("display", "none");
    });
    $("#left").mousemove(function(e) {
        $x =
            e.clientX -
            parseInt($("#left").offset().left) -
            parseInt($("#mask").width()) / 2;
        $y =
            e.clientY -
            parseInt($("#left").offset().top) -
            parseInt($("#mask").height()) / 2;
        if ($x < 0) {
            $x = 0;
        }
        if ($x > parseInt($("#left").width()) - parseInt($("#mask").width())) {
            $x = parseInt($("#left").width()) - parseInt($("#mask").width());
        }
        if ($y < 0) {
            $y = 0;
        }
        if ($y > parseInt($("#left").height()) - parseInt($("#mask").height())) {
            $y = parseInt($("#left").height()) - parseInt($("#mask").height());
        }
        $("#mask")
            .css("left", $x + "px")
            .css("top", $y + "px");
        var $imgleft = parseInt($("#right").width()) / parseInt($("#mask").width());
        $("#thisPic2")
            .css("marginLeft", -$x * $imgleft + "px")
            .css("marginTop", -$y * $imgleft + "px");
    });

    footerAd(); //底部栏广告

    var gid;
    var products = JSON.parse(sessionStorage["products"]);
    if (products == null) {
        location.href = "index.html";
    } else {
        gid = products[0].gid;
    }
    let goodMes = {};
    $.ajax({
        url: "http://localhost:3000/goods/GoodMes",
        type: "get",
        dataType: "json",
        data: {
            gid: gid,
        },
        success: function(results) {
            goodMes = results.data[0];
            $(".title").html(goodMes.gName);
            $(".price").html(goodMes.gPrice);
            $(".shop").html(goodMes.uName);
            var strPic1 = `<div id="mask"></div>
                <img src="${goodMes.gPic}" alt="" class="thisPic1">`;
            var strPic2 = `<img src="${goodMes.gPic}" alt="" id="thisPic2">`;
            $("#left").html(strPic1);
            $("#right").html(strPic2);
            $("#gHits").html(goodMes.gHits);
            $("#gNum").html(goodMes.gNum);
            if (goodMes.gDiscount == 1) {
                $("#gDiscount").html("可小刀");
            } else {
                $("#gDiscount").html("不可小刀");
            }
            $(".goodMessage").html(goodMes.gMes);
        },
        error: function(e) {
            console.log("GoodMes错误信息" + e.message);
        },
    });

    //根据库存量控制购买数量

    var num = $('.inputNum').val();
    $('.subNum').on('click', function() {
        if (num > 1) {
            num--;
            $('.inputNum').val(num);
        } else {
            alert('已经够少了，不要再减了哦！');
        }
    });
    $('.addNum').on('click', function() {
        var gNum = $("#gNum").html();
        if (num < gNum) {
            num++;
            $('.inputNum').val(num)
        } else {
            alert('库存没有这么多了，不要再加了哦！');
        }

    });
    $(".inputNum").keyup(function(e) { // 按键弹起时触发的事件，如果输入的不是数字，就输入不进去
        var gNum = $("#gNum").html();
        if ((e.keyCode < 48 || e.keyCode > 57) && e.keyCode != 8) {
            $('.inputNum').val(num);
        } else if ($('.inputNum').val() > gNum) {
            $('.inputNum').val(num);
            alert('库存没有这么多了，不要再加了哦！');
        } else {
            num = $('.inputNum').val();
        }
    });
    $(".inputNum").on('blur', function() { //文本框失去焦点时，如果文本框内容为空，就将文本框内容设置为1
        if ($('.inputNum').val() == '' || $('.inputNum').val() == '0') {
            $('.inputNum').val(1);
            num = 1;
        }
    })


    $.ajax({
        url: "http://localhost:3000/goods/likeGoods",
        type: "post",
        dataType: "json",
        data: {
            gid: gid,
        },
        success: function(results) {
            let len;
            if (results.data.length > 5) {
                len = 5;
            } else len = results.data.length;
            var likeGood = "";
            for (let i = 0; i < len; i++) {
                likeGood += `<li class="like_goods_message" onclick="check(this)">
                <span style="display:none">${results.data[i].gId}</span>
        <img src="${results.data[i].gPic}" alt="" class="likePic">
        <span class="likeName">${results.data[i].gName}</span>
                        </li>`;
            }
            $(".like_goods").html(likeGood);
        },
    });
    $.ajax({
        url: "http://localhost:3000/comments/getEvaluation",
        type: "get",
        dataType: "json",
        data: {
            gid: gid,
        },
        success: function(results) {
            if (results.data == 0) {
                $('.noEvaluation').css('display', 'block')
                $(".evaluation").html('')
            } else {
                var strHTML = "";
                var level = '';
                for (var i = 0; i < results.data.length; i++) {
                    if (results.data[i].comLevel == 1) {
                        level = '非常差'
                    } else if (results.data[i].comLevel == 2) {
                        level = '比较差'
                    } else if (results.data[i].comLevel == 3) {
                        level = '还可以'
                    } else if (results.data[i].comLevel == 4) {
                        level = '比较好'
                    } else if (results.data[i].comLevel == 5) {
                        level = '非常好'
                    }
                    var date = results.data[i].comDate.substring(0, results.data[i].comDate.length - 2);
                    date = date.replace(/[A-Za-z]/gi, ' ');
                    strHTML += `
                        <li>
                            <div class="message">${results.data[i].comMes}</div>
                            <div class="messagetitle">
                                <span class="evaluation_time">${date}</span>
                                <span class"level">${level}</span>
                                <span class="userName">${results.data[i].uName}</span>
                            </div>
                        </li>`;
                }
                $('.noEvaluation').css('display', 'none');
                $(".evaluation").html(strHTML);
            }

        },
        error: function(e) {
            console.log("错误信息" + e.message);
        },
    });
    var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var userinfo = sessionStorage['users']
    if (userinfo == null) {
        $('#userName').html("未登录");
        $('#login').html('登录/注册')
    } else {
        var user = JSON.parse(sessionStorage['users'])
        $('#userName').html(user[0].Name)
        $('#login').html('退出登录')
    }

    //添加购物车
    $(".setShoppingCart").on("click", function() {
        let goodNum = $('.inputNum').val();
        console.log(goodNum)
        $.ajax({
            url: "http://localhost:3000/shoppingCart/addShoppingCart",
            type: "post",
            dataType: "json",
            data: {
                gid: gid,
                time: time,
                goodNum: goodNum,
                uName: user[0].Name
            },
            success: function(results) {
                console.log('添加购物车返还信息', results);
            },
            error: function(e) {
                console.log("添加购物车" + e.message);
            },
        });
    })

    //点击购买按钮时，将商品信息存入本地，供结算页面获取
    $(".toSettlement").on("click", function() {
        var productInfo = sessionStorage["products"];
        console.log('productInfo:', productInfo);

        var gId = JSON.parse(productInfo);
        var buyGood = [];
        buyGood.push({
            gid: gId[0].gid,
            img: $('#left .thisPic1').attr('src'),
            title: $('.goodMes .title').html(),
            price: $('.goodMes .price').html(),
            num: $('.inputNum').val()
        });
        sessionStorage["buyGood"] = JSON.stringify(buyGood);
        var userInfo = sessionStorage["users"];
        if (userInfo == null) {
            $(".modal").modal({
                backdrop: "static",
            });
        } else {
            location.href = "settlement.html";
        }
    });

    $(".goLogin").on("click", function() {
        location.href = "login.html";
    });

    //   Mock.mock("http://localhost:3000/comments/getEvaluation", function () {
    //     var result = [];
    //     for (var i = 0; i < 4; i++) {
    //       var rndEva = Mock.mock({
    //         userName: Random.cname(3),
    //         userMessage: Random.cparagraph(),
    //         time: Random.datetime("y-M-d HH:mm:ss"),
    //       });
    //       result.push(rndEva);
    //     }
    //     return result;
    //   });
});

function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}

//底部栏广告放置
function footerAd() {
    var winheight = document.documentElement.clientHeight;
    var docheight = document.body.offsetHeight;
    if (docheight < winheight) {
        var ad = `<div class="ad"><img src="images/ad.jpg" alt=""> </div>`;
        $(ad).insertBefore($('#footer'))
    }
}
//获取当前商品的id并放入session中
function check(result) {
    let gId = result.children[0].innerHTML;
    $.ajax({
        url: 'http://localhost:3000/goods/gHitAdd',
        type: 'get',
        data: {
            gId: gId
        },
        dataType: 'json',
        success: function() {
            let products = [];
            products.push({ gid: gId });
            sessionStorage["products"] = JSON.stringify(products);
            location.href = "good.html";
        }
    })
}