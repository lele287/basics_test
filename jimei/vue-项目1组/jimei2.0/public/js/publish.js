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

    var uName = JSON.parse(sessionStorage.getItem('users'))[0].Name;
    $.ajax({
        url: 'http://localhost:3000/goods/getMes',
        type: 'post',
        dataType: 'json',
        data: {
            uName: uName
        },
        success: function(results) {
            //发布数据中返回了用户发布表中的id，记得加到页面上并隐藏
            console.log('登录用户发布数据', results.data); 
            var strHTML = ``;
            for (let i = 0; i < results.data.length; i++) {
                strHTML += `<tr class="ulvalue">
                <td>
                    <span style="display:none;">${results.data[i].gId}</span>
                    <img src="http://localhost:3000/upload/${results.data[i].gPic}" alt="alt" class="contentImg"/>
                    <span class="contentTitle">${results.data[i].gName}</span>
                    <span class="contentPrice">${results.data[i].gPrice} </span>
                    <span class="contentStock">${results.data[i].gNum} </span>
                </td>
                </tr>`;
            }
            $('.ulvalue').html(strHTML);
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);
        }
    })
    footerAd(); //底部栏广告
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

function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}