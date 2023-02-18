    $(function() {
        $('#userName').focus();
    })

    function login() {
        $.ajax({
            url: 'http://localhost:3000/users/login',
            type: 'post',
            data: {
                userName: $('#userName').val(),
                userPwd: $('#userPassword').val()
            },
            dataType: 'json',
            success: function(results) {
                console.log(results);

                if (results.data == 1) {
                    let user = []
                    user.push({ "Name": $('#userName').val() });
                    sessionStorage['users'] = JSON.stringify(user);
                    location.href = 'index.html';
                } else if (results.data == -1) {
                    alert('没有该用户哦')
                } else {
                    alert('用户名、密码错误，登录失败！')
                }
            }
        })
    }