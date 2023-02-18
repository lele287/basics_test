function register() {
       var isError = true;
       var oUname = document.getElementById("username").value
       var oUTelNum = document.getElementById("TelNum").value
       var oUpass1 = document.getElementById("password").value
       var oUpass2 = document.getElementById("password2").value
       if (oUname.length <= 19 && oUname.length >= 5) {
           if (oUTelNum.length == 11) {
               if (oUpass1 == oUpass2) {
                   $.ajax({
                       url: 'http://localhost:3000/novels/register',
                       type: 'post',
                       data: {
                           userName: $('#username').val(),
                           userPwd: $('#password').val(),
                           Tel: $('#TelNum').val()
                       },
                       dataType: 'json',
                       success: function (results) {
                           if (results.data> 0) {
                               alert('注册成功！')
                               location.href = 'login.html'
                           } else {
                               alert('注册失败！')
                           }
                       }
                   })
               }else{
                   alert('两次密码输入的不正确')
               }
           }else{
               alert('手机号必须在11位')
           }
       } else {
           alert('用户名在6-20位之间')
       }
   }
