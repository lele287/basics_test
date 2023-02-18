$(function () {
    //提交订单
    var username = localStorage.getItem('userName') //获取当前登录的用户
    var drIds = JSON.parse(localStorage.getItem('drugsId'))
    var drId = []
    for (var i = 0; i < drIds.length; i++) {
        drId.push(drIds[i].jj);

    }

    $.ajax({
        url: 'http://localhost:3000/productsRouter/referOrder',
        type: 'get',
        dataType: 'json',
        data: {
            userName: username,
            drId: drId
        },
        success: function (res) {
            var results = res.data
            var total = 0  //订单商品金额
            var payable = 0  //应付金额
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    var sum = parseInt(results[i].drugsCount) * parseInt(results[i].drugsPrice.slice(1))
                    total += sum
                    payable += sum
                    strHTML += `<li class="img1">
                    <div class="imgshopp">
                    <img src="${results[i].drugsPhoto}" alt="">
                    </div>
                    <div class="infor">
                        <span class="title">${results[i].drugsName}</span><br>
                        <span class="gg">${results[i].drugsIntroduce}</span>
                    </div>
                    <div class="pps">
                        <span class="p2">${results[i].drugsPrice}</span>
                        <span class="p3">${results[i].drugsCount}</span>
                        <span class="p4">￥${sum}</span>
                    </div>
                </li>
                                `
                }

                $('.ulshopp').html(strHTML)
                $('#Toatal').html('￥' + total)
                $('.price').html('￥' + payable)

            }
        }
    })

    $('#toPay').click(function () {
        location.href = "pay.html"
    })
})




$(function () {
    var artionMain = ''
    artionMain = `<div class="artion_diz_main">
                    
                    <div class="diz_main1">
                        <ul>
                            <li>
                                <label>收货人：</label>
                                <p class="diz_name"></p>
                            </li>
                            <li>
                                <label>手机号：</label>
                                <p class="diz_name1"></p>
                            </li>
                            <li>
                                <label>所在地区：</label>
                                <p class="diz_name2"></p>
                            </li>
                            <li>
                                <label>详细地址：</label>
                                <p class="diz_name3"></p>
                            </li>

                        </ul>
                    </div>
                    <div class="tags">
                        <span class="tag">默认地址</span>
                    </div>
                </div>
                <form action="" class = "AddressList"></form>
    `
    $('.artion_diz').append(artionMain)
    // 收货地址页面初始化
    var userName = localStorage.getItem('userName')
    $.ajax({
        url: 'http://localhost:3000/users/AddressInitialization',
        type: 'post',
        data: {
            userName: userName
        },
        dataType: 'json',
        success: function (res) {
            var results = res.data
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
                var AddressList = `  
                    <div class = "column">          
                    <input name="radio" type="radio" class = "" value="" /><span></span>
                    </div>
                `
                    $('.AddressList').append(AddressList)
                if (results[i].defaults == 1) {
                    $('.diz_name').eq(0).text(results[i].fullName)
                    $('.diz_name1').eq(0).text(results[i].cellPhone)
                    $('.diz_name2').eq(0).text(results[i].location)
                    $('.diz_name3').eq(0).text(results[i].detail + results[i].floor)
                    $('.column').eq(i).empty()
                }else{
                    
                    $('.AddressList').children('div').eq(i).children('span').text(results[i].fullName + results[i].cellPhone + results[i].location + results[i].detail + results[i].floor)    
                }

               
            }

        }
    })
})
