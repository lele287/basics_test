$(function() {
    //获取用户名
    var userinfo = sessionStorage["users"];
    if (userinfo == null) {
        $("#userName").html("未登录");
        $("#login").html("登录/注册");
    } else {
        var user = JSON.parse(sessionStorage["users"]);
        $("#userName").html(user[0].Name);
        $("#login").html("退出登录");
    }
    footerAd(); //底部栏广告

})

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
    console.log('in');

    var winheight = document.documentElement.clientHeight;
    var docheight = document.body.offsetHeight;
    if (docheight < winheight) {
        var ad = `<div class="ad"><img src="images/ad.jpg" alt=""> </div>`;
        $(ad).insertBefore($('#footer'))
    } else if ($('.ad')) {
        $('.ad').css('display', 'none');
    }
}