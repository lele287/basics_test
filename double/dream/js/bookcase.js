if(localStorage.getItem('username') == null){
    alert('您还没有登录！请先登录！')
    location.href = 'login.html'
}
function add() {
    document.querySelector('[type="file"]').click()
}

$(function () {
    $(".main_left ul li").click(function () {
        $(".main_left ul li").css("font-weight", "normal").css("color", "black").css("border", "none");
        $(this).css("font-weight", "bold").css("color", "#8cc3d4").css("border", "1px solid #ccc").css("border-radius", "3px");
    });
});
// 页面跳转，并传参到收藏书单 书架页面
function goinfo(num){
    // console.log($(num).parent().children('.bookId').text());
    var ak =$(num).parent().children('.bookId').text() // 下一个兄弟节点
    location.href = 'BookIntroduction.html?bookId='+ak
}
window.onload = function () {
    var querySex = ''
    //获取访问当前网页的url
    var url = location.href
    //拆分url，获取查询字符串
    var params = url.split('?')
    if (params.length > 1) {
        //从其他页面跳转而来，并带有参数
        querySex = params[1].replace(/充值金额为=/gi, '')
        querySex = decodeURIComponent(querySex).split('=')[1]  //把中文编码的参数解码

        //赋值
        // document.querySelector('#aq').innerHTML = querySex
    }
    var userPhoneNumber = localStorage.getItem("username")
    console.log(userPhoneNumber);
    $.ajax({
        url: 'http://localhost:3000/novels/bookcase',
        type: 'get',
        data: {
            userPhoneNumber:userPhoneNumber,
        },
        dataType: 'json',
        success: function (res) {
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                            <li>
                            <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                            <i class="bookId" style="display: none;">${results[i].novelId}</i>   
                            </li>
                            `
                }
                $('.table-null-x').html(strHTML)
            }
        }
    })
}
