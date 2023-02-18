var pay
window.onload = function(){
    var divs = document.querySelectorAll('.cost')
    for(let i = 0; i< divs.length; i++){
        divs[i].onclick = function(){
            pay = $(this).text()
            for(var j = 0 ; j < divs.length; j++){
                divs[j].style.border = ''
            }
            this.style.border = '1px solid #0dc572'
        }
    }
}
$(function(){
    $('.immediately-pay').click(function(){
        if(pay.trim()=='微信'){
            location.href = 'weixin.html'
        }else if(pay.trim()=='支付宝'){
            $.ajax({
                url: 'http://localhost:3000/pay',
                type: 'get',
                dataType: 'json',
                success: function (res) {
                    //跳转到支付宝的支付页面
                    location.href = res.data
                }
            })
        }
    })
})