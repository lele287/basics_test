function add(){
    document.querySelector('[type="file"]').click()
}
$(function () {
    $(".main_left ul li").click(function () {
        $(".main_left ul li").css("font-weight", "normal").css("color","black").css("border","none");
        $(this).css("font-weight", "bold").css("color","red").css("border","1px solid #ccc").css("border-radius","3px");
    });
});
window.onload = function () {
    // if(localStorage.getItem('username') == null){
    //     alert('您还没有登录！请先登录！')
    //     location.href = 'login.html'
    // }else{
    //     document.querySelector('#user1').innerHTML= '用户：'+localStorage.getItem("username")
    // }
    
    var querySex = ''
    //获取访问当前网页的url
    var url = location.href
    //拆分url，获取查询字符串
    var params = url.split('?')
    if (params.length > 1) {
        //从其他页面跳转而来，并带有参数
        querySex = params[1].replace(/充值金额为=/gi, '')
        querySex = decodeURIComponent(querySex).split('=')[1]  //把中文编码的参数解码
        document.querySelector('#aq').innerHTML= querySex
        document.querySelector('#bb').innerHTML= querySex +'00'
    }
    $.ajax({
        url:'http://localhost:3000/',
        type:'get',
        data:{
            param:querySex      //把参数传入服务器接口
        },
        dataType:'json',
        success:function(res){
            //获取返回的数据结果res
        }
    })
}
$.ajax({
    url: 'http://localhost:3000/novels/user',
    type: 'post',
    dataType: 'json',
    success: function (res) {
        console.log('res:', res.data)
        var results = res.data
        console.log('results',results);
        
    }
})
//用户上传头像
$.ajax({
    url: 'http://localhost:3000/novels/uploadpic',
    type: 'get',
    dataType: 'json',
    data:{
        userpic:'',
        username:'',
        // userpwd:'',
    },
    success: function (res) {
    }
})
//用户删除图书
$.ajax({
    url: 'http://localhost:3000/novels/delbook',
    type: 'get',
    dataType: 'json',
    data:{
        bookid:'',
        username:'',
    },
    success: function (res) {
    }
})