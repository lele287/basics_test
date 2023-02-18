//充值方式列表边框
$(function () {
    $(".money ul li").click(function () {
        $(".money ul li").css("border", "1px solid #ccc");
        $(this).css("border", "1px solid #f00").css("border-radius", "3px");
    });
});
//充值方式列表精灵图片
$(function () {
    $(".money ul li").click(function () {
        $(".border").css("display", "none")
        $(this.firstElementChild).css("display", "block");
    });
});
//充值金额列表边框
$(function () {
    $(".money2 ul li").click(function () {
        $(".money2 ul li").css("border", "1px solid #ccc");
        $(this).css("border", "1px solid #f00").css("border-radius", "3px");
    });
});
//充值金额精灵图片
$(function () {
    $(".money2 ul li").click(function () {
        $(".border2").css("display", "none")
        $(this.firstElementChild).css("display", "block");
    });
});

//支付按钮获取充值金额
window.onload = function () {
    if(localStorage.getItem('username') == null){
        alert('您还没有登录！请先登录！')
        location.href = 'login.html'
    }else{
        document.querySelector('#user1').innerHTML= '用户：'+localStorage.getItem("username")
    }
    var lis = document.getElementById("test").getElementsByTagName("li");
    var pay = document.querySelector('.newpay')
    for (i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            var strhtml = this.children[1].innerHTML
            var pp = document.querySelector('.newpay2').innerHTML= strhtml
        }
    }
    pay.onclick = function () {
        for (i = 0; i < lis.length; i++) {
            var strhtml = (this.children[1].innerHTML).slice(1)
        }
        alert('充值成功')
        location.href='user.html?充值金额为='+ strhtml
    }
}
