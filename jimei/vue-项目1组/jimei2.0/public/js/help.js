window.onload = function() {
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

    $('.box1').on('mouseenter', function() {
        var str = `<span class="sell2">卖家通过注册成为卖家，发布商品、价格以及位置等详细信息即可</span>`;
        $(this).html(str);
    });
    $('.box1').on('mouseleave', function() {
        var str = `<img src="images/seller.png" alt=""><span class="sell">卖家</span>`;
        $(this).html(str);
    })
    $('.box2').on('mouseenter', function() {
        var str = `<span class="dispatch2">卖家负责提供免费配送服务</span>`;
        $(this).html(str);
    });
    $('.box2').on('mouseleave', function() {
        var str = `<img src="images/dispatching.png" alt=""><span class="dispatch">配送</span>`;
        $(this).html(str);
    })
    $('.box3').on('mouseenter', function() {
        var str = `<span class="contact2">如出现任何商品问题可以直接通过平台与卖家联系</span>`;
        $(this).html(str);
    });
    $('.box3').on('mouseleave', function() {
        var str = `<img src="images/contact.png" alt=""><span class="contact">联系我们</span>`;
        $(this).html(str);
    })
    $('.box4').on('mouseenter', function() {
        var str = `<span class="buyer2">买家通过注册成为买家，填写学校、详细地址、电话等信息即可</span>`;
        $(this).html(str);
    });
    $('.box4').on('mouseleave', function() {
        var str = `<img src="images/buyer.png" alt=""><span class="buy">买家</span>`;
        $(this).html(str);
    })
    $('.box5').on('mouseenter', function() {
        var str = `<span class="pay2">买家可选择微信、支付宝两种方式付款</span>`;
        $(this).html(str);
    });
    $('.box5').on('mouseleave', function() {
        var str = `<img src="images/pay.png" alt=""><span class="pay">支付</span>`;
        $(this).html(str);
    })
    $('.box6').on('mouseenter', function() {
        var str = `<span class="return2">如出现与实际描述不符合或不喜欢等问题买家可通过平台联系卖家进行退货退款</span>`;
        $(this).html(str);
    });
    $('.box6').on('mouseleave', function() {
        var str = `<img src="images/return.png" alt=""><span class="return">退货和退款</span>`;
        $(this).html(str);
    })
}

function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}