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
    //填充数据
    var evaluate = JSON.parse(sessionStorage.getItem('goodsEvaluate')); //从订单页获取sessionStorage
    $.ajax({
        url: "http://localhost:3000/goods/GoodMes",
        type: "get",
        dataType: "json",
        data: {
            gid: evaluate.gid,
        },
        success: function(results) {
            console.log('获取到商品数据：', results)
            var str = `<div class="img">
                            <img src="${results.data[0].gPic}" alt="">
                        </div>
                        <div class="title">
                            <span>${results.data[0].gName}</span><br/>
                            <span>￥${results.data[0].gPrice}</span><br/>
                            <span>出售人：${results.data[0].uName}</span>
                        </div>`;
            $('.goods').html(str);
        },
    });

    //返回评价结果
    $('.submitbtn').on('click', function(e) {
        if (starScore == 0) {
            $('.starOrder').html('请点击星星，为商品评分').css('color', '#f00').css('font-size', '18px');
            e.preventDefault();
            return false;
        } else if ($('.describe textarea').val() == '') {
            $('.describe textarea').val('评价内容不能为空哦！').css('color', '#f00').css('font-size', '18px');
            e.preventDefault();
            return false;
        } else {
            var flag = 0;
            var uName = JSON.parse(sessionStorage.getItem('users'))[0].Name
            var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
            var mes = $('.describe textarea').val();
            $.ajax({
                url: "http://localhost:3000/comments/addComment",
                type: "post",
                dataType: "json",
                data: {
                    uName: uName,
                    gid: evaluate.gid,
                    time: time,
                    mes: mes,
                    level: starScore
                },
                success: function(results) {
                    console.log(results)
                    flag++;
                    if (flag == 2) {
                        alert('评价成功！');
                        location.href = 'index.html';
                    }
                },
            });
            $.ajax({
                url: "http://localhost:3000/comments/addComment", //这里改成修改订单状态的的路由！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
                type: "post",
                dataType: "json",
                data: {
                    oid: evaluate.oid
                },
                success: function(results) {
                    console.log(results)
                    flag++;
                    if (flag == 2) {
                        alert('评价成功！');
                        location.href = 'index.html';
                    }
                },
            });


        }
    })
    footerAd(); //底部栏广告

    //五星评分
    var starScore = 0;
    $('#star').raty({
        click: function(score, evt) {
            starScore = score;
        }
    });

    //提醒选择星星
    $('#star').on('mouseout', function() {
        if (starScore == 0) {
            $('.starOrder').html('请点击星星，为商品评分').css('color', '#f00').css('font-size', '18px');
        } else {
            $('.starOrder').html('');
        }
    })

    //提醒输入评价内容
    $('.describe textarea').on('mouseout', function() {
        if ($('.describe textarea').val() == '') {
            $('.describe textarea').val('评价内容不能为空哦！').css('color', '#f00').css('font-size', '20px');
        } else if ($('.describe textarea').val() == '评价内容不能为空哦！') {
            $('.describe textarea').css('color', '#f00').css('font-size', '20px')
        } else {
            $('.describe textarea').css('color', '#000').css('font-size', '16px')
        }
    })
    $('.describe textarea').on('focus', function() {
        if ($('.describe textarea').val() == '评价内容不能为空哦！') {
            $('.describe textarea').val('')
            $('.describe textarea').css('color', '#000').css('font-size', '16px')
        }
    })
    $('.describe textarea').on('blur', function() {
        if ($('.describe textarea').val() == '') {
            $('.describe textarea').val('评价内容不能为空哦！').css('color', '#f00').css('font-size', '20px');
        }
    })
})

//底部栏广告放置
function footerAd() {
    var winheight = document.documentElement.clientHeight;
    var docheight = document.body.offsetHeight;
    if (docheight < winheight) {
        var ad = `<div class="ad"><img src="images/ad.jpg" alt=""> </div>`;
        $(ad).insertBefore($('#footer'))
    }
}