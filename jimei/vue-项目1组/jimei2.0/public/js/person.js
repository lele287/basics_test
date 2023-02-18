function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}

function del(cId, delbtn) {
    //删除收藏按钮需要自己添加，添加后将此接口放至单击事件内调用
    // var cId = 6; //需要修改的cId，数据内容为收藏id，就是上述被隐藏的内容
    $.ajax({
        url: 'http://localhost:3000/collection/delMes',
        type: 'post',
        dataType: 'json',
        data: {
            cId: cId
        },
        success: function(results) {
            console.log('删除成功', results.data);
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);
        }
    })

    //删除页面节点
    delbtn.parentNode.remove(delbtn);
    footerAd(); //底部栏广告

}

function getGood(goods) {
    let gId = goods.previousElementSibling.innerHTML
    let products = [];
    products.push({ gid: gId });
    sessionStorage["products"] = JSON.stringify(products);
    location.href = "good.html";
}

$(function() {
    var user = JSON.parse(sessionStorage["users"]);
    var userName = user[0].Name;
    $('.selectDefaultAddress').on('click', function() {
        if ($('.address').css('display') == 'none') {
            $('.address').css('display', 'block')
        } else {
            $('.address').css('display', 'none')
        }
        $.ajax({
            url: "http://localhost:3000/userRec/getMyRec",
            type: "get",
            dataType: "json",
            data: {
                userName: userName
            },
            success: function(results) {
                console.log("用户地址数据:", results.data)
                if (results.data.length == 0) {
                    $('.address ul').html('<li>暂无地址</li>')
                } else {
                    let str = ``;
                    for (let i = 0; i < results.data.length; i++) {
                        if (results.data[i]) {
                            str += ` <li>
                                <span style="display:none;" class="recid">${results.data[i].recId}</span>                                
                                <div class="rname">${results.data[i].recName}</div>
                                <div class="rphone">${results.data[i].recPhone}</div>
                                <div class="raddress">${results.data[i].recAddress}</div>
                                    </li>`;
                        }
                    }
                    $('.address ul').html(str);

                    // 用户点击之后触发下面这个ajax，对该用户的默认收获地址id进行更改
                    $('.address div').on('click', function() {
                        var recId = this.parentNode.querySelector('.recid').innerHTML;
                        console.log(recId);
                        $.ajax({
                            url: "http://localhost:3000/users/changeRec",
                            type: "post",
                            dataType: "json",
                            data: {
                                recId: recId,
                                userName: userName,
                            },
                            success: function(results) {
                                console.log(results.data);
                            },
                        });
                        $('.address').css('display', 'none')
                    })
                }
            }
        })
    })


    // $('.address div').on('click', function() {
    //     var recId = this.parentNode.querySelector('.recid').innerHTML;
    //     console.log(recId);

    //     $.ajax({
    //         url: "http://localhost:3000/users/changeRec",
    //         type: "post",
    //         dataType: "json",
    //         data: {
    //             recId: recId,
    //             userName: userName,
    //         },
    //         success: function(results) {
    //             console.log(results.data);
    //         },
    //     });
    //     $('.address').css('display', 'none')
    // })
})


window.onload = function() {
    var user = JSON.parse(sessionStorage["users"]);
    var userName = user[0].Name;
    $.ajax({
            url: "http://localhost:3000/userRec/getUserRec",
            type: "post",
            dataType: "json",
            data: {
                userName: userName,
            },
            success: function(results) {
                console.log("用户收货地址", results);
                if (results.data == 0) {
                    $('#defaultRec').html('暂无地址')
                } else {
                    let strHTML = ``
                    for (let i = 0; i < results.data.length; i++) {
                        if (results.data[i]) {
                            strHTML += `
                <option value="${results.data[i].recId}">${results.data[i].recAddress}</option>
                `
                        }
                    }
                    $('#allRec').html(strHTML)
                }
            }
        })
        // $.ajax({
        //     url: "http://localhost:3000/userRec/getMyRec",
        //     type: "get",
        //     dataType: "json",
        //     data: {
        //         userName: userName
        //     },
        //     success: function(results) {
        //         console.log("用户地址数据:", results.data)
        //         if (results.data == 0) {
        //             $('#defaultRec').html('暂无地址')
        //         } else {
        //             let strHTML = ``
        //             for (let i = 0; i < results.data.length; i++) {
        //                 if (results.data[i]) {
        //                     strHTML += `
        //             <option value="${results.data[i].recId}">${results.data[i].recAddress}</option>
        //             `;
        //                 }
        //             }
        //             $('#allRec').html(strHTML)
        //         }
        //     }
        // })

    // // 用户点击之后触发下面这个ajax，对该用户的默认收获地址id进行更改
    // $('#allRec').change(function() {

    //     let recId = this.value
    //     $.ajax({
    //         url: "http://localhost:3000/users/changeRec",
    //         type: "post",
    //         dataType: "json",
    //         data: {
    //             recId: recId,
    //             userName: userName,
    //         },
    //         success: function(results) {
    //             console.log(results.data);
    //         },
    //     });
    // })


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
    var inputFile = document.querySelector('[type="file"]')
    document.querySelectorAll('img')[0].onclick = function() {
        inputFile.click()
    }

    // footerAd(); //底部栏广告
    var uName = user[0].Name;

    //获取用户信息接口
    $.ajax({
        url: 'http://localhost:3000/users/getMes',
        type: 'post',
        dataType: 'json',
        data: {
            uName: uName
        },
        success: function(results) {
            let user = results.data
            console.log('登录用户数据', user);
            $('.userName').html(user[0].uName)
            $('.yhId').html('用户ID ：' + user[0].uId)

            if (user[0].uHead != "images/tx.jpg") {
                var str = "../upload/";
                str += user[0].uHead;
                $('#bodyRight img').attr("src", str);
            }
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);
        }
    })

    //获取该用户的收藏 
    $.ajax({
        url: 'http://localhost:3000/collection/getMes',
        type: 'post',
        dataType: 'json',
        data: {
            uName: uName
        },
        success: function(results) {
            //收藏数据中返回了用户收藏表中的id，记得加到页面上并隐藏
            console.log('登录用户收藏数据', results.data);
            if (results.data != '') {
                var strHTML = ``;
                for (var i = 0; i < results.data.length; i++) {
                    strHTML += `<li>
                        <span style="display:none;">${results.data[i].gId}</span>
                        <b onclick="getGood(this)" style="cursor:pointer">
                        <img src="${results.data[i].gPic}" alt="alt" class="collectImg"/>
                        <span class="collectTitle">${results.data[i].gName}</span>
                        </b>
                        <span class="collectShop">${results.data[i].uName}</span>
                        <span class="collectPrice">${results.data[i].gPrice} </span>
                        <span class="collectDel" onclick="del(${results.data[i].collectionId},this)" style="cursor:pointer">删除</span>
                            </li>`;
                }
                $('.ulvalue').html(strHTML);
                //不显示心碎
                $('.supplement').css('display', 'none');
            } else {
                //显示心碎
                $('.supplement').css('display', 'block');
            }
        },
        error: function(e) {
            console.log('GoodMes错误信息' + e.message);
        }
    })


    var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];
    var holder = document.getElementById("days");
    var prev = document.getElementById("prev");

    var next = document.getElementById("next");
    var ctitle = document.getElementById("calendar-title");
    var cyear = document.getElementById("calendar-year");
    var my_date = new Date();
    var my_year = my_date.getFullYear();
    var my_month = my_date.getMonth();
    var my_day = my_date.getDate();

    function dayStart(month, year) {
        var tmpDate = new Date(year, month, 1);
        return (tmpDate.getDay());
    }

    function daysMonth(month, year) {
        var tmp = year % 4;
        if (tmp == 0) {
            return (month_olympic[month]);
        } else {
            return (month_normal[month]);
        }
    }

    function refreshDate() {
        var str = "";
        var totalDay = daysMonth(my_month, my_year); //获取该月总天数
        var firstDay = dayStart(my_month, my_year); //获取该月第一天是星期几
        var myclass;
        for (var i = 1; i < firstDay; i++) {
            str += "<li></li>"; //为起始日之前的日期创建空白节点
        }
        for (var i = 1; i <= totalDay; i++) {
            if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
                myclass = " class='lightgrey'"; //当该日期在今天之前时，以浅灰色字体显示
            } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
                myclass = " class='green greenbox'"; //当天日期以绿色背景突出显示
            } else {
                myclass = " class='darkgrey'"; //当该日期在今天之后时，以深灰字体显示
            }
            str += "<li" + myclass + ">" + i + "</li>"; //创建日期节点
        }
        holder.innerHTML = str; //设置日期显示
        ctitle.innerHTML = month_name[my_month]; //设置英文月份显示
        cyear.innerHTML = my_year; //设置年份显示

    }

    refreshDate(); //执行该函数

    prev.onclick = function(e) {
        e.preventDefault();
        my_month--;
        if (my_month < 0) {
            my_year--;
            my_month = 11;
        }
        refreshDate();
    }
    next.onclick = function(e) {
        e.preventDefault();
        my_month++;
        if (my_month > 11) {
            my_year++;
            my_month = 0;
        }

        refreshDate();
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