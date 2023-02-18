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

function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}
$(function() {
    //获取用户名
    var userinfo = sessionStorage["users"];
    if (userinfo == null) {
        $("#userName").html("未登录");
        $("#login").html("登录/注册");
        $(".modal").modal({
            backdrop: "static",
        });
    } else {
        var user = JSON.parse(sessionStorage["users"]);
        $("#userName").html(user[0].Name);
        $("#login").html("退出登录");
    }
    $(".goLogin").on("click", function() {
        location.href = "login.html";
    });
    $(".goIndex").on("click", function() {
        location.href = "index.html";
    });
    //将发布内容保存到本地
    releaseWant();
    footerAd(); //底部栏广告
});

//将发布内容保存到本地
function releaseWant() {
    var productName = document.querySelector('.productName').querySelector('input');
    var wantPrice = document.querySelector('.wantPrice').querySelector('input');
    var want_details = document.querySelector('.want_details').querySelector('textarea');
    var tel = document.querySelector('.tel').querySelector('input');

    var submitBtn = document.querySelector('.submit');

    var releaseWant = [];
    submitBtn.onclick = function() {
        releaseWant.push({
            "productName": productName.value,
            "wantPrice": wantPrice.value,
            "want_details": want_details.value,
            "tel": tel.value
        })
        console.log(releaseWant)
        var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        var uName = $("#userName").html();
        $.ajax({
                url: "http://localhost:3000/userwant/addWant",
                type: "post",
                dataType: "json",
                data: {
                    uName: uName,
                    wantName: releaseWant[0].productName,
                    wantMes: releaseWant[0].want_details,
                    wantTime: time,
                    wantPrice: releaseWant[0].wantPrice,
                    wantPhone: releaseWant[0].tel
                },
                success: function(res) {
                    console.log(res)
                }

            })
            // localStorage['releaseWant'] = JSON.stringify(releaseWant);
            // localStorage.setItem('releaseWant', JSON.stringify(releaseWant));
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