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
    //订单状态有3个：0待收货，1待评价，2已评价
    var order = [];
    var count = 0;
    $.ajax({
        url: 'http://localhost:3000/order/getOrder',
        type: 'post',
        dataType: 'json',
        data: {
            uName: user[0].Name
        },
        success: function(results) {
            console.log('用户订单', results);
            var str = ``;
            for (var i = 0; i < results.data.length; i++) {
                //判断订单状态
                var state = '';
                var btnState = '';
                if (results.data[i].oState == 0) {
                    state = '待付款';
                    btnState = '去付款';
                } else if (results.data[i].oState == 1) {
                    state = '待收货';
                    btnState = '确认收货';
                } else if (results.data[i].oState == 2) {
                    state = '待评价';
                    btnState = '去评价';
                }else if (results.data[i].oState == 3) {
                    state = '已评价';
                    btnState = '已完成';
                } else {
                    console.log('订单状态异常！');
                }
                //填充数据
                str += `
                    <div class="good">
                    <ul class="goods_nav">
                        <li><input type="checkbox" name="" id="" class="check"></li>
                        <li><span >订单号：</span><span class="oid">${results.data[i].oId}</span></li>
                        <li><span class="shop">出售人：${results.data[i].uName}</span></li>
                        <li><span class="del" onclick="delclick(this)"><i class="fa fa-trash" aria-hidden="true"></i> 删除</span></li>
                        <li style="display:none;"><span>商品编号：</span><span class="gid">${results.data[i].gId}</span></li>
                    </ul>
                    <ul class="goods_mes">
                        <li><span class="img"><img src="${results.data[i].gPic}" alt=""></span><span class="title">${results.data[i].gName}</span></li>
                        <li><span class="price">${results.data[i].gPrice}</span></li>
                        <li><span class="num">${results.data[i].oGoodsNum}</span></li>
                        <li><span class="sum">${results.data[i].gPrice*results.data[i].oGoodsNum}</span></li>
                        <li><span class="state">${state}</span></li>
                        <li><button onclick="btnclick(this)" class="btn">${btnState}</button></li>
                    </ul>
                    </div>`;
            }
            var orderBody = document.querySelector('.orderBody');
            orderBody.innerHTML = str;
            var disbtn = document.querySelectorAll('.good .btn');
            for (var i = 0; i < disbtn.length; i++) {
                if (disbtn[i].innerHTML == '已完成') {
                    disbtn[i].disabled = true;
                }
            }

            footerAd(); //底部栏广告
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);
        }
    })

    //删除选中商品
    var delAll = document.querySelector('.delAll'); //删除选中的按钮
    delAll.onclick = function() {
        var goods = $(".check:checked");
        var len = goods.length;
        for (var i = 0; i < len; i++) {
            var row = goods[i].parentNode.parentNode;
            row.querySelector('.del').click();
        }
        console.log(order);
    }

}

//点击按钮改变订单状态 
function btnclick(btn) {
    var oid = btn.parentNode.parentNode.parentNode.querySelector('.oid').innerHTML
    var state = btn.parentNode.previousElementSibling.firstElementChild.innerHTML;
    var stbtnStateate = btn.innerHTML;
    var img = btn.parentNode.parentNode.querySelector('img').getAttribute('src')
    var title = btn.parentNode.parentNode.querySelector('.title').innerHTML;
    var gid = btn.parentNode.parentNode.parentNode.querySelector('.gid').innerHTML
    let price = btn.parentNode.parentNode.querySelector('.sum').innerHTML
    console.log(price)
    $.ajax({
        url: 'http://localhost:3000/order/changeOrder',
        type: 'post',
        dataType: 'json',
        data: {
            oId: oid
        },
        success: function(results) {
            console.log('更改完成，信息为', results);
            //判断订单状态
            if(state =='待付款'){
                state = '待收货';
                stbtnStateate = '确定收货';
                let gid = btn.parentNode.parentNode.parentNode.querySelector('.gid').innerHTML
                $.ajax({
                    url:'http://localhost:3000/goods/goodNumSub',
                    type:'get',
                    data:{
                        gId:gid,
                    },
                    dataType:'json',
                    success:function(res){
                        console.log(res.data)
                    }
                })
                let oid = btn.parentNode.parentNode.parentNode.querySelector('.oid').innerHTML
                let price = btn.parentNode.parentNode.querySelector('.sum').innerHTML
                $.ajax({
                        url:'http://localhost:3000/pay',
                        type:'get',
                        data:{
                            oId:oid,
                            Price:price,
                        },
                        dataType:'json',
                        success:function(res){
                          //跳转到支付宝支付页面
                        location.href = res.data
                    }
                })

            }else if (state == '待收货') {
                if (confirm('您确定要点击确认收货吗?')) {
                    state = '待评价';
                    stbtnStateate = '去评价';
                }
            }else if (state == '待评价') {
                location.href = "evaluate.html";
                //本地存储订单号，图片，title
                var goodsEvaluate = {
                    oid: oid,
                    img: img,
                    title: title,
                    gid: gid
                }
                sessionStorage["goodsEvaluate"] = JSON.stringify(goodsEvaluate);
                // 在评价页里判断，如果评价完成，就ajax请求一下，改变订单状态
            } else {
                console.log('订单状态异常！');
            }
            btn.parentNode.parentNode.querySelector('.state').innerHTML = state;
            btn.innerHTML = stbtnStateate;
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);
        }
    })
}
//点击删除按钮
function delclick(delbtn) {
    var oid = delbtn.parentNode.parentNode.querySelector('.oid').innerHTML;
    console.log(delbtn.parentNode.parentNode.parentNode);

    document.querySelector('.orderBody').removeChild(delbtn.parentNode.parentNode.parentNode)

    $.ajax({
        url: 'http://localhost:3000/order/delOrder',
        type: 'post',
        dataType: 'json',
        data: {
            oId: oid
        },
        success: function(results) {
            console.log('删除完成', results);
            footerAd(); //底部栏广告
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);

        }
    })
}

//底部栏广告放置
function footerAd() {
    var winheight = document.documentElement.clientHeight;
    var docheight = document.body.offsetHeight;
    if (docheight < winheight) {
        var ad = `<div class="ad"><img src="images/ad.jpg" alt=""> </div>`;
        $(ad).insertBefore($('#footer'))
    } else if ($('.ad')) {
        $('.ad').css('display', 'none');
    }
}