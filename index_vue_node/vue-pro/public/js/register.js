var num = false
function checkName() {
    adda()
}
function adda() {
    $.ajax({
        url: 'http://localhost:3000/users/checkName',
        type: 'get',
        data: {
            userName: $('#userName').val()
        },
        dataType: 'json',
        success: function (results) {
            if (results.message == '用户名重复') {
                $('.tip').html('*用户名已存在*')
                num = false
            } else {
                $('.tip').html('')
                num = true
            }
        }
    })
}
function register() {
    adda()
    var userName = $('#userName').val()
    var userPwd = $('#userPwd').val()


    if (num == true) {
        if (userPwd.length > 0) {
            if (userPwd == $('#ruserPwd').val()) {
                $.ajax({
                    url: 'http://localhost:3000/users/addUser',
                    headers:{Authorization:localStorage.getItem('auth')},
                    type: 'post',
                    data: {
                        userName: userName,
                        userPwd: userPwd
                    },
                    dataType: 'json',
                    success: function (res) {
                        var results = res.data
                        if (results == 1) {
                            location.href = "login.html"
                        } else {
                            alert('用户注册失败！')
                        }
                    }
                })
            } else {
                $('.tip').html('*两次密码不同,请重新输入*')
                // $('#ruserPwd').val('')
            }
        } else { $('.tip').html('*密码不能为空*') }
    } else { num = false }
}
$(document).keydown(function (event) {
    var x = event.keyCode;
    if (x == 13) {
        $('.dian').click()
    }
});
$(function () {
    $('.name').focus()
})