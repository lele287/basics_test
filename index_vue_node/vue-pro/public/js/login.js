function login() {
  var userName = document.querySelector('[type="text"]').value
  var userPwd = document.querySelector('[type="password"]').value
  var isSave = document.querySelector('[type="checkbox"]').checked

  localStorage.setItem("userName", userName)
  //判断是否有记住密码的功能，如果有的话就记录当前正确的登录信息到本地存储
  if (isSave) {
    localStorage.setItem('user',
      JSON.stringify({ "userName": userName, "userPwd": userPwd }))
  } else {
    //如果没有的话就清除之前保存的用户登录信息
    localStorage.removeItem('user')
  }
  $.ajax({
    url: 'http://localhost:3000/users/login',
    type: 'post',
    data: {
      userName: $('#userName').val(),      //获取用户名
      userPwd: $('#userPwd').val()         //获取用户密码
    },
    dataType: 'json',
    success: function (results) {
      if (results.data) {
        localStorage.setItem('auth',results.data)
        location.href = "index.html"
      } else {
        $('.i1').html('*用户名或密码错误，登录失败*')
      }
    }
  })
  // var form = document.querySelector('.in1')
  // form.submit()
}
function register() {
  location.href = "register.html"
}

window.onload = function () {
  $('.name').focus()
  var txtUserName = document.querySelector('#userName')
  var txtPassword = document.querySelector('#userPwd')
  txtUserName.onkeyup = function (e) {
    var keyCode = e.keyCode      //获取按键
    // 判断是否按键是回车键
    if (keyCode == 13) {
      txtPassword.focus()  // 光标聚焦到密码框上
    }
  }
  txtPassword.onkeyup = function (e) {
    var keyCode = e.keyCode      //获取按键
    if (keyCode == 13) {
      login()         //调用提交表单的方法
    }
  }
  if (JSON.parse(localStorage['user']) != null) {
    $('[type="checkbox"]').prop('checked', true)
    var user = JSON.parse(localStorage['user'])
    var Name = user['userName']
    var Pwd = user['userPwd']
    document.querySelector('[type="text"]').value = Name
    document.querySelector('[type="password"]').value = Pwd

  }

}

$(document).keydown(function (event) {
  var x = event.keyCode;
  if (x == 13) {
    $('.in1').click()
  }
});