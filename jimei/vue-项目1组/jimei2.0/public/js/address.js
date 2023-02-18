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

    //获取全部收货地址
    var userName = JSON.parse(sessionStorage.getItem('users'))[0].Name;
    $.ajax({
        url: 'http://localhost:3000/userRec/getMyRec', 
        type: 'get',
        dataType: 'json',
        data: {
            userName: userName
        },
        success: function(results) {
            console.log("getMyRec",results)
            var strHTML = ``;
            for (let i = 0; i < results.data.length; i++) {
                
                strHTML += `<li>
                    <span class="recId" style="display:none;">${results.data[i].recId}</span>
                    <span class="name">${results.data[i].recName}</span>
                    <span class="phone">${results.data[i].recPhone}</span> 
                    <span class="address">${results.data[i].recAddress}</span>
                    <span><button onclick="editAddress(this)">修改地址</button></span>
                    <span><button onclick="delAddress(this)">删除</button></span>
                            </li>`;
            }
            $('.addressContent').html(strHTML);
            footerAd(); //底部栏广告
        }
    })

    //添加收货地址
    $('.button').on('click', function() {
        var uName = $('#sjName').val();
        var uPhone = $('#phoneNumber').val();
        var uAddress = $('#address').val();
        $.ajax({
            url: 'http://localhost:3000/userRec/addUserRec', 
            type: 'post',
            dataType: 'json',
            data: {
                userName:userName,
                uName: uName,
                uPhone: uPhone,
                uAddress: uAddress,
            },
            success: function(results) {
                console.log('添加收货地址结果：', results);
            }
        })
    })
})

//修改收货地址
function editAddress(btn) {
    if(btn.innerHTML=='修改地址'){
        btn.parentNode.parentNode.querySelector('.name').innerHTML=`<input type="text" value="${btn.parentNode.parentNode.querySelector('.name').innerHTML}">`;
        btn.parentNode.parentNode.querySelector('.phone').innerHTML=`<input type="text" value="${btn.parentNode.parentNode.querySelector('.phone').innerHTML}">`;
        btn.parentNode.parentNode.querySelector('.address').innerHTML=`<input type="text" value="${btn.parentNode.parentNode.querySelector('.address').innerHTML}">`; 
        btn.innerHTML='保存地址'
    }else{
       
        console.log(btn.parentNode.parentNode.querySelector('.name input').value);
        btn.parentNode.parentNode.querySelector('.name').innerHTML= btn.parentNode.parentNode.querySelector('.name input').value;
        btn.parentNode.parentNode.querySelector('.phone').innerHTML=btn.parentNode.parentNode.querySelector('.phone input').value;
        btn.parentNode.parentNode.querySelector('.address').innerHTML=btn.parentNode.parentNode.querySelector('.address input').value;
        var uName =  btn.parentNode.parentNode.querySelector('.name').innerHTML
        var uPhone = btn.parentNode.parentNode.querySelector('.phone').innerHTML
        var uAddress =  btn.parentNode.parentNode.querySelector('.address').innerHTML
        var recId = btn.parentNode.parentNode.querySelector('.recId').innerHTML  
        btn.innerHTML='修改地址'

    $.ajax({
        url: 'http://localhost:3000/userRec/changeThisRec', 
        type: 'post',
        dataType: 'json',
        data: {
            uName: uName,
            uPhone: uPhone,
            uAddress: uAddress,
            recId:recId
        },
        success: function(results) {
            console.log('修改收货地址结果：', results);
            btn.innerHTML=='修改地址'
        }
    })
    }
    
}
//删除收货地址
function delAddress(btn){
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode)
    var recId = btn.parentNode.parentNode.querySelector('.recId').innerHTML;
    $.ajax({
        url:"http://localhost:3000/userRec/deluserRec",
        type:"post",
        dataType:"json",
        data:{
            recId:recId
        },
        success:function(results){
            console.log('删除',results)
        }
    })
}

// //用户点击之后触发下面这个ajax，对该用户的默认收获地址id进行更改
// function changeRecId(){
//     // var recId = $('.addressContent li .recId').innerHTML;
//     console.log(recId);
//     $.ajax({
//       url: "http://localhost:3000/users/changeRec",
//       type: "post",
//       dataType: "json",
//       data: {
//         recId: recId,
//         userName: userName,
//       },
//       success: function (results) {
//         console.log(results.data);
//       },
//     });
// }

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