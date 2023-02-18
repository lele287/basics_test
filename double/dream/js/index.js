var changeLi = document.getElementsByName('time');
var j = 0;
var k = 0;
//计时器
setInterval(function () {
    var tRecord = concate();
    for (var i = 0; i < changeLi.length; i++) {
        changeLi[i].innerHTML = tRecord[j++];
        if (j == tRecord.length) {
            j = 0;
        }
    }
}, 1000);
//将天时分秒拼接成字符串
function concate() {
    var timeNow = new Date();
    var cutTime = new Date('2020-10-1 20:00:00');
    var poor = cutTime - timeNow;
    var diff = poor / 1000;
    var seconds = Math.floor(diff % 60);
    var minutes = Math.floor((diff / 60) % 60);
    var hours = Math.floor((diff / 60 / 60) % 24);
    var days = Math.floor(diff / 60 / 60 / 24);
    var record = '';
    if (days >= 10) {
        record = days + "";
    } else {
        record += '0';
        record += days + "";
    }
    if (hours >= 10) {
        record += hours + "";
    } else {
        record += '0';
        record += hours + "";
    }
    if (minutes >= 10) {
        record += minutes + "";
    } else {
        record += '0';
        record += minutes + "";
    }
    if (seconds >= 10) {
        record += seconds + "";
    } else {
        record += '0';
        record += seconds + "";
    }
    return record;
}
//侧边固定导航
window.onscroll = function () {
    var fixnav = document.getElementById('fixNav')
    var top = document.documentElement.scrollTop    //获取页面滚动垂直距离
    if (top > 600) {
        fixnav.style.display = 'block'
    } else {
        fixnav.style.display = 'none'
    }

}
//右侧十本
$(function () {
    $(".whole_right_ul li").mouseover(function () {
        $(".whole_right_ul li img").css("display", "none")
        $(".whole_right_ul li span").css("display", "none")
        $(".whole_right_ul li h4").css("display", "none")
        $(this.children).css("display", "block");
        $(".whole_right_ul li i").css("display", "none")
    });
});
//右侧十本导入数据库
$.ajax({
    url: 'http://localhost:3000/novels/overs',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:', res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                    <li>                  
                    <img src="${results[i].novelImgPath}" alt="" style="float: left;" id="d1" onclick="goinfo(this)">
                    <p id="d2">${results[i].novelName}</p>
                    <h4 id="d3">${results[i].authorName}</h4>
                    <span id="d4">${results[i].novelType}</span>
                    <i class="bookId" style="display: none;">${results[i].novelId}</i>
                    </li>
                    `
            }
            $('.whole_right_ul').html(strHTML)
        }
    }
})





//轮播
var imgPath_a = ["lb1.png", "lb2.png", "lb3.png", "lb4.png"]
var a = 0;
var fileData = null
window.onload = function () {
    
    
    if(localStorage.getItem('username') == null){
        document.querySelector('#user1').innerHTML= '登录'
    }else{
        document.querySelector('#user1').innerHTML= '用户：'+localStorage.getItem("username")
    }
    
    
    lunbo()
    function lunbo() {
        //1.找到图片标签
        var img = document.querySelector('.bb')
        //2.创建定时器对象，修改src属性，实现图片切换
        setInterval(function () {
            img.src = "images/" + imgPath_a[a++]
            if (a == imgPath_a.length) {
                a = 0
            }
        }, 3000)
        //添加手动切换
        var lis = document.getElementsByClassName("tupian")
        for (var j = 0; j < lis.length; j++) {
            lis[j].onclick = function () {
                a = this.innerHTML - 1
                img.src = "images/" + imgPath_a[a]
            }
        }
    }
//     var querySex = ''
//     //获取访问当前网页的url
//     var url = location.href
//     //拆分url，获取查询字符串
//     var params = url.split('?')
//     if (params.length > 1) {
//         //从其他页面跳转而来，并带有参数
//         querySex = params[1].replace(/user=/gi, '')
//         querySex = decodeURIComponent(querySex)  //把中文编码的参数解码
//         // document.querySelector('#user1').innerHTML= '您好：'+querySex
        
//     }
//     $.ajax({
//         url:'http://localhost:3000/username',
//         type:'get',
//         data:{
//             param:querySex      //把参数传入服务器接口
//         },
//         dataType:'json',
//         success:function(res){
//             var results = res.data
//             console.log(results[0]);
//             if (results.length > 0) {
//                 $('#user1').innerHTML=`${results[1].userPhoneNumber}`
//             }
//         }
//     })
    
}


//后端连接数据库显示列表  推荐列表

//推荐书单
$.ajax({
    url: 'http://localhost:3000/novels/getAllbooks',
    //设置自定义请求头,可以访问有权限控制的接口或页面
    headers:{Authorization:localStorage.getItem('auth')},
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:', res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <h3>${results[i].novelName}</h3><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        <i class="bookId">${results[i].novelId}</i>
                        </li>
                        `
            }
            $('.menu_txt').html(strHTML)
        }
    }
})
// // 页面跳转，并传参到收藏书单 书架页面
function goinfo(num){
    // console.log($(num).parent().children('.bookId').text());
    var ak =$(num).parent().children('.bookId').text() // 下一个兄弟节点
    location.href = 'BookIntroduction.html?bookId='+ak
}

//查询
function search() {
    $.ajax({
        url: 'http://localhost:3000/novels/getAllnames',
        type: 'get',
        dataType: 'json',
        data: {
            bookname: $('#spec').val()
        },
        
        success: function (res) {
            // console.log('res:', res)
            var results = res.data
            console.log('results',results);
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>   
                        <h3>${results[i].novelName}</h3><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        </li>
                        `
                }
                $('.menu_txt').html(strHTML)
            }
        }
    })
}
//新书速递
$.ajax({
    url: 'http://localhost:3000/novels/Newbook',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:', res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <span>${results[i].novelName}</span>
                        <h3>${results[i].novelType}</h3>                     
                        <p>${results[i].novelUpdateType}</p>
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>
                        </li>
                        `
            }
            $('.con_new').html(strHTML)
        }
    }
})
//章节
$.ajax({
    url: 'http://localhost:3000/novels/chapters',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:', res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                        <li>
                        <span class="type">[${results[i].novelType}]</span>
                        <span class="name visible-lg-inline-block visible-md-inline-block">${results[i].novelName}</span>
                        <span class="chap">${results[i].chapterName}</span>
                        <span class="aut visible-lg-inline-block">${results[i].authorName}</span>
                        <span class="tim">${results[i].chapterUpdateTime}</span>
                        </li>
                        `
            }
            $('.content6_ul').html(strHTML)
        }
    }
})


//页面跳转，并传参跳转到个人中心页面
function gouser(){
    location.href = 'user.html?user='+ $('#user1').innerHTML
    console.log(user1);
}

























//模糊查询
// function search() {
//     //1.获取查询的关键字
//     var novel = document.querySelector('.s-input').value
//     //循环遍历现有的数据，条件判断类型是否一致
//     var strHTML = ''
//     for (var i = 0; i < fileData.data.length; i++) {
//         //类型相同时，组合数据，拼接innerHTML字符串
//         if (fileData.data[i].type.indexOf(novel) != -1) {
//             strHTML += ` <li>
//                                <img src="${fileData.data[i].imgPath}" alt="">
//                                <h3>${fileData.data[i].title}</h3><br>
//                                <span>${fileData.data[i].type}</span><br>
//                                <p>${fileData.data[i].introduce}</p>
//                            </li>`
//         }
//         //类型不同时，跳过
//     }
//     for (var i = 0; i < fileData.data.length; i++) {
//         //名称相同时，组合数据，拼接innerHTML字符串
//         if (fileData.data[i].title.indexOf(novel) != -1) {
//             strHTML += ` <li>
//                                <img src="${fileData.data[i].imgPath}" alt="">
//                                <h3>${fileData.data[i].title}</h3><br>
//                                <span>${fileData.data[i].type}</span><br>
//                                <p>${fileData.data[i].introduce}</p>
//                            </li>`
//         }
//         //名称不同时，跳过
//     }
// }
// 导入json数据文件
    // 1.读取文件数据
    // $.get('json/novel.json', function (result) {
    //     fileData = result
    //     // console.log(result)
    //     //2.循环遍历数据，组合数据，形成innerHTML字符串
    //     var strHTML = ''
    //     for (var i = 0; i < result.data.length; i++) {
    //         strHTML += ` <li>
    //                            <a href="reg.html"><img src="${result.data[i].imgPath}"alt=""></a> 
    //                            <h3>${result.data[i].title}</h3><br>
    //                            <span>${fileData.data[i].type}</span><br>
    //                            <p>${result.data[i].introduce}</p>
    //                            <span>${result.data[i].chapter}</span>
    //                        </li>`
    //     }
    //     //3.赋值DOM节点
    //     document.querySelector('.menu').innerHTML = strHTML
    // })