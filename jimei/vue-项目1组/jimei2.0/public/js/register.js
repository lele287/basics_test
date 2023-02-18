$(function() {
    $('#userName').focus();
})
let gValidCode
function getValidCode(){
    let phone = $('#userNumber').val()
    if(phone==''){
        alert('手机号填一下吧~')
    }else if(!(/^1[3456789]\d{9}$/.test(phone))) {
        alert("手机号码有误，请重填");
        return;
    }else{
        $.ajax({
            url:'http://localhost:3000/users/getValidCode',
            type:'get',
            data:{
                mobile:phone
            },
            dataType:'json',
            success:function(results){
                if(results.code == 200){
                    gValidCode = results.data
                }else{
                    alert('验证码发送错误')
                }
            }
        })
    }
}
function register() {
    let validCode = $('#uservalidCode').val()
    if ($('#userName').val() == '' || $('#userPassword').val() == '' || $('#userNumber').val() == ''|| $('#uservalidCode').val() =='') {
        alert('这都是必填的哟')
    } else {
        let phone = $('#userNumber').val()
        if (!(/^1[3456789]\d{9}$/.test(phone))) {
            alert("手机号码有误，请重填");
            return;
        }else if(gValidCode != validCode){
            alert('验证码错误')
        }else {
            $.ajax({
                url:'http://localhost:3000/users/register',
                type:'post',
                data:{
                    userName : $('#userName').val(),
                    userPwd:$('#userPassword').val(),
                    userPhone:$('#userNumber').val()
                },
                dataType:'json',
                success:function(results){
                    console.log(results)
                    if(results.data==1){
                        location.href = 'login.html';   
                    }else if(results.data==-1){
                        alert('用户名重复')
                    }else{
                        alert('电话号码重复了')
                    }
                }
            })
        }
    }
}



