
    function pay1() {
        $.ajax({
            url: 'http://localhost:3000/novels/gopay',
            type: 'get',
            dataType: 'json',
            data: {
                price: '20',
            },
            success: function (res) {
                //跳转到支付宝得支付页面
                location.href = res.data
            }
        })
    }
    

