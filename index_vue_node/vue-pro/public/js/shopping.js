// 动态添加数据
var results
$(function () {
    var username = localStorage.getItem('userName') //获取当前登录的用户
    $.ajax({
        url: 'http://localhost:3000/productsRouter/showShopping',
        type: 'get',
        dataType: 'json',
        data: {
            username: username
        },
        success: function (res) {
            results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    // console.log('d:', results[0].drugsPhoto);
                    var sum = parseInt(results[i].drugsCount) * parseInt(results[i].drugsPrice.slice(1))
                    // console.log(sum);

                    strHTML += `<div class="cart-item container " style="width: 1190px; margin-left:0 ;">
                                    <div>
                                        <div class="dl row">
                                            <div class="p-checkbox col-xs-1">
                                                <input type="checkbox" data-shopping_id="${results[i].drugsId}" class="j-checkbox">
                                            </div>
                                            <div class="p-goods col-xs-11 col-sm-3">
                                                <div class="p-img">
                                                    <img src="${results[i].drugsPhoto}" alt="">
                                                </div>
                                                <div id="hide">${results[i].drugsId}</div>
                                                <div class="p-msg">${results[i].drugsIntroduce}</div>
                                            </div>
                                        </div>
                                        <div class="aa dr row">
                                            <div class="p-price col-sm-2 col-xs-2">${results[i].drugsPrice}</div>
                                            <div class="p-num col-sm-4 col-xs-4">
                                                <div class="quantity-form">
                                                    <input type="button" class="decrement" value="-">
                                                    <input type="text" class="itxt" value="${results[i].drugsCount}">
                                                    <input type="button" class="increment" value="+">
                                                </div>
                                            </div>
                                            <div class="p-sum col-sm-2 col-xs-2">￥${sum}</div>
                                            <div class="p-action col-sm-4 col-xs-4">
                                                <a href="#" data-toggle="modal" data-target="#myModal">删除</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                `
                }

            } else {
                strHTML = `  <div class="null">购物车空啦,快去添加商品吧~~</div> `

            }
            var oDiv = document.querySelector('.cart-item-list')
            var b = document.createElement('div')
            // a.className('cart-item')
            b.innerHTML = strHTML
            oDiv.appendChild(b)

        }
    })

    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给小的按钮（j-checkbox）就可以了
    // 事件可以使用change

    $(".checkall").change(function () {
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");


        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");

        }
        if ($(".j-checkbox:checked").length == 0) {
            $('.btn-area').css({ "backgroundColor": "#ccc", "cursor": "not-allowed" })
            getSum()
        }
        else {

            $('.btn-area').css({ "backgroundColor": "#E2231A", "cursor": "pointer" })
            getSum()
        }
        getSum()
    });

    // 2. 如果小复选框被选中的个数等于所有复选框的个数 就应该把全选按钮选上，否则全选按钮不选。
    $(".cart-item-list").on('change', '.j-checkbox,.btn-area', function () {

        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {


            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
            getSum()
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        if ($(".j-checkbox:checked").length == 0) {
            $('.btn-area').css({ "backgroundColor": "#ccc", "cursor": "not-allowed" })
            getSum()
        }
        else {

            $('.btn-area').css({ "backgroundColor": "#E2231A", "cursor": "pointer" })
            getSum()
        }

    })

    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    //加数量
    var counts
    var flag = false
    var getId
    var username = localStorage.getItem('userName') //获取当前登录的用户
    $(".cart-item-list").on('click', '.increment', function () {
        // 得到当前兄弟文本框的值
        counts = $(this).siblings(".itxt").val();
        getId = $(this).parents('.aa').prev().children('.p-goods').children('#hide').html()//获取当前点击的商品id
        console.log("getId", getId);

        // console.log(n);
        counts++;
        $(this).siblings(".itxt").val(counts);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p  
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        var price = (p * counts).toFixed(2);
        // 小计模块 
        // toFixed(2) 可以让我们保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);

        updata(flag)


    })
    //减数量
    $(".cart-item-list").on('click', '.decrement', function () {
        getId = $(this).parents('.aa').prev().children('.p-goods').children('#hide').html()//获取当前点击的商品id
        // 得到当前兄弟文本框的值
        counts = $(this).siblings(".itxt").val();
        if (counts == 1) {
            return false;
        }
        // console.log(n);
        counts--;
        $(this).siblings(".itxt").val(counts);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        // 小计模块 
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * counts).toFixed(2));

        updata(flag)
    })

    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function () {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 5. 计算总计和总额模块
    getSum();
    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱

        $('.j-checkbox:checked').each(function () {
            var num = $(this).parents('.dl').siblings('.aa').children('.p-num').children('.quantity-form').children('.itxt').val()
            var sum = $(this).parents('.dl').siblings('.aa').children('.p-sum').text().slice(1)
            console.log("sum", sum);

            count += parseInt(num);
            money += parseFloat(sum)
        });
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + money.toFixed(2));
    }


    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    var delTr = null
    $('#myModal').on('show.bs.modal', function (e) {
        delTr = $(e.relatedTarget).parent().parent().parent().parent()
    })
    $('#delRow').click(function () {
        getId = delTr.children().children('.aa').prev().children('.p-goods').children('#hide').html();
        // delTr.remove()
        del(getId)
        history.go(0)
        getSum();
    })
    // (2) 删除选中的商品
    $('#myModalCheck').on('show.bs.modal', function (e) {
        delTr = $(e.relatedTarget)
    })
    $('#delCheck').click(function () {
        // 删除的是小的复选框选中的商品
        var str = []
        $.each($(".j-checkbox:checked"), function () {
            str.push($(this).parents(".p-checkbox").next().children('#hide').html())
        })
        // console.log(str);

        del(str)
        history.go(0)
        // $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();

    })

    // (3) 清空购物车 删除全部商品
   
    $('#delALL').click(function () {
        // $(".cart-item").remove();
        delAll()
        history.go(0)
        getSum();
    })
    //修改商品数量到数据库
    function updata(flag) {
        $.ajax({
            url: 'http://localhost:3000/productsRouter/addShopping',
            type: 'get',
            dataType: 'json',
            data: {
                key: getId,
                userName: username,
                counts: counts,
                flag: flag
            },
            success: function (res) {
                var results = res.data
                if (results == 1) {
                    // alert('修改成功')
                } else {
                    // alert('修改失败')
                }
            }
        })
    }
    //删除选中商品
    function del(drId) {
        $.ajax({
            url: 'http://localhost:3000/productsRouter/delShopping',
            type: 'get',
            dataType: 'json',
            data: {
                userName: username,
                drId: drId
            },
            success: function (res) {
                var results = res.data
                if (results == 1) {
                    // alert('删除成功')
                } else {
                    // alert('删除失败')
                }
            }

        })
    }
    //删除所有商品，清空购物车
    function delAll() {
        $.ajax({
            url: 'http://localhost:3000/productsRouter/delAllShopping',
            type: 'get',
            dataType: 'json',
            data: {
                userName: username
            }

        })
    }
    //跳转到结算页面
    $('#toRefOrder').on('click', function () {
        var str = []
        if ($(".j-checkbox:checked").length > 0) {
            // $('.tips').fadeOut(3000)
            $.each($(".j-checkbox:checked"), function () {
                str.push({ "jj": $(this).parents(".p-checkbox").next().children('#hide').html() })

            })
            localStorage.setItem("drugsId", JSON.stringify(str))
            location.href = "accounts.html"
        } else {
            $('.tips').fadeIn(2000)
            $('#toRefOrder').on('mouseout', function () {
                $('.tips').fadeOut(2000)
               
            })
        }
    })




})








