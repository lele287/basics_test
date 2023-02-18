//收获地址存储
function place() {
    var info = localStorage['userInfos']
    var user = JSON.parse(sessionStorage['users'])
    var phone = $('#phoneNum').val()
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
        alert("手机号码有误，请重填");
        return;
    } else {
        if (info == null) {
            alert('请先去登录吧')
            location.href = "login.html"
        } else {
            data = JSON.parse(localStorage.getItem('userInfos'))
            console.log($('#address').val())
            for (var i = 0; i < data.length; i++) {
                var name = user[0].Name
                if (data[i].userName == name) {
                    data[i].address = $('#address').val()
                    data[i].sjName = $('#sjName').val()
                    data[i].phoneNum = $('#phoneNum').val()
                }
            }
            localStorage['userInfos'] = JSON.stringify(data);
            location.href = "settlement.html"
        }
    }

}