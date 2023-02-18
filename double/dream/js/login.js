function login() {
    var userTel = document.querySelector('#username').value
    var userPwd = document.querySelector('#password').value
    if (userTel != '' && userPwd != '') {
        $.ajax({
            url: 'http://localhost:3000/novels/login',
            type: 'post',
            data: {
                userTel: $('#username').val(), //获取用户名
                userPwd: $('#password').val()   //获取用户密码
            },
            dataType: 'json',
            success: function (results) {
                console.log('results',results);
                if (results.data) {
                    // console.log('results.data',results.data);
                    alert('登录成功！')
                    console.log('results.data',results.data);
                    // localStorage.setItem("username",$('.fa-user-circle').val())
                    localStorage.setItem('auth',results.data)
                    location.href = 'index.html'
                }
                else {
                    alert('登录失败1111！')
                }
            }
        })
    } else {
        alert('用户密码不能为空！')
    }
}