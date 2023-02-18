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

    var uName = JSON.parse(sessionStorage.getItem('users'))[0].Name;
    $.ajax({
        url: "http://localhost:3000/userwant/getMywant",
        type: "post",
        dataType: "json",
        data: {
            uName: uName
        },
        success: function(res) {
            console.log("1", res);
            var str = ``;
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].wantPhone == '') {
                    $.ajax({
                        url: "http://localhost:3000/users/getPhone",
                        type: "post",
                        dataType: "json",
                        data: {
                            uName: uName
                        },
                        success: function(resulets) {
                            res.data[i].wantPhone = resulets.data[0].uPhone;
                            // console.log('res.data:', res.data);
                            str += `<tr>
                                <td><input type="checkbox" class="wantItem" onchange="checkChange(this)"/></td>
                                <td>${ res.data[i].wantName}</td>
                                <td>${ res.data[i].wantPrice}</td>
                                <td>${ res.data[i].wantMes}</td>
                                <td>${ res.data[i].wantPhone} </td>
                                <td class="del" onclick="delClick(this)">删除</td>
                                <td style="display:none;" class="wantId">${ res.data[i].wantId}</td>
                                    </tr>`;
                            // console.log('str2:', str);
                            $('.want').html(str);
                            checkOnclick($('#all')); //全选与复选
                        }
                    })
                } else {
                    str += `<tr>
                    <td><input type="checkbox" class="wantItem" onchange="checkChange(this)"/></td>
                        <td>${ res.data[i].wantName}</td>
                        <td>${ res.data[i].wantPrice}</td>
                        <td>${ res.data[i].wantMes}</td>
                        <td>${ res.data[i].wantPhone} </td>
                        <td class="del" onclick="delClick(this)">删除</td>
                        <td style="display:none;" class="wantId">${ res.data[i].wantId}</td>
                            </tr>`;
                }
            }
            // console.log('str1:', str);
            $('.want').html(str);
            checkOnclick($('#all')); //全选与复选

        }
    })
})

var sum = 0;
//全选
function checkOnclick(want) {
    var all = document.getElementById('all');
    var wantItems = document.querySelectorAll('.wantItem');

    all.onclick = function() {
        for (let i = 0; i < wantItems.length; i++) {
            wantItems[i].checked = all.checked;
        }
        if (all.checked) {
            sum = wantItems.length;
        } else {
            sum = 0;
        }
        for (let i = 0; i < wantItems.length; i++) {
            wantItems[i].onclick = function() {
                this.checked == true ? sum++ : sum--;
                console.log(this.checked == true ? sum++ : sum--);
                if (sum == 5) {
                    all.checked = true;
                } else {
                    all.checked = false;
                }
            };
        }
    }
}
var data = null;

function deleteItems() {
    var  wants = $(".wantItem:checked");
    var len =  wants.length;
    for (var i = 0; i < len; i++) {
        var tr = wants[i].parentNode.parentNode;
        var dell = tr.querySelector(".del");

        console.log(dell);
        dell.click();
        
    }
}


//复选
function checkChange(checkbox) {

}
//点击删除按钮
function delClick(delbtn) {
    delbtn.parentNode.parentNode.removeChild(delbtn.parentNode);
    var wantId = delbtn.parentNode.querySelector('.wantId').innerHTML;
    $.ajax({
        url: "http://localhost:3000/userwant/delwant",
        type: "post",
        dataType: "json",
        data: {
            wantId: wantId
        },
        success: function(results) {
            console.log('删除结果：', results);
        }
    })
    footerAd(); //底部栏广告
}

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