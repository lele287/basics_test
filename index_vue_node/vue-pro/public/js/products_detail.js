
window.onload = function () {
    var middle_top = document.querySelector('.middle_top')
    var middle = document.querySelector('.middle')
    middle_top.addEventListener('mousedown', function (e) {
        var x = e.pageX - middle.offsetLeft - 360;
        var y = e.pageY - middle.offsetTop - 252;
        // (2) 鼠标移动的时候，把鼠标在页面中的坐标，减去 鼠标在盒子内的坐标就是模态框的left和top值
        document.addEventListener('mousemove', move)

        function move(e) {
            middle.style.left = e.pageX - x + 'px';
            middle.style.top = e.pageY - y + 'px';
        }
        // (3) 鼠标弹起，就让鼠标移动事件移除
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', move);
        })
    })
    var oText = document.getElementById('text1');
    var oBtn = document.getElementById('btn1')
    var oImg = document.getElementById('portrait')
    var oDiv = document.getElementById('information')
    oBtn.onclick = function () {
        if ($('#text1').val() != '') {

            // oDiv.innerHTML += oText.value + '<br/>';
            // 一.创建img
            var contentImg = document.createElement("img")
            // 设置图片地址
            contentImg.setAttribute("src", oImg.src);
            // 二.创建dev
            var testDev = document.createElement("dev")
            testDev.setAttribute("class", onOff ? 'ee' : 'rr');
            // 把输入的标签填入到dev标签中
            testDev.innerHTML = oText.value;

            // 三.创建dev
            var test = document.createElement("dev");
            // 根据笑脸的状态设置不同的class
            test.setAttribute("class", onOff ? 'leftPost' : 'rightPost');

            // 创建div，放入第二步放入的dev标签
            var Div2 = document.createElement("div").appendChild(testDev);

            // 四.更改img和dev的位置
            if (onOff) {
                // 放入第一步放入的img标签
                test.appendChild(contentImg);
                // 放入第二步放入的dev标签
                test.appendChild(testDev);
            } else {
                test.appendChild(testDev);
                test.appendChild(contentImg);
            }
            // 更改div中的文字样式
            // Div2.className = 'rr'

            //  testDev.style.padding = '2px'
            // 把第三步创建的dev放到dev1下
            oDiv.appendChild(test);
            // 输入框置空
            oText.value = '';
        }

        // 图片切换
        oImg.onclick = function () {
            if (onOff) {
                oImg.src = '../images/yonghutx.png';
                //oDiv.style.textAlign = 'right';
                onOff = false;
            } else {
                oImg.src = '../images/kefutx.png';
                //  oDiv.style.textAlign = 'left';
                onOff = true;
            }
        }
    }
    let count;
    //动态加载商品详情
    var results;
    var getId = decodeURI(location.search).slice(1).split('=')[1];
    $.ajax({
        url: 'http://localhost:3000/productsRouter/getproductsDetail',
        type: 'get',
        dataType: 'json',
        data: {
            key: getId
        },
        success: function (res) {
            results = res.data
            if (results.length > 0) {
                var img = results[0].drugsimg
                var imgs = img.substring(1, img.length - 1).split(',')
                console.log(imgs);
                var strHTML = ''
                strHTML += `<div class="p_details">
                            <div class="details">
                                <div class="details_imgSmall">
                                    <div class="enlarge"></div>
                                    <img src="${results[0].drugsPhoto}" id="small_img">
                                </div>
                                <div class="details_imgBig">
                                    <img src="${results[0].drugsPhoto}" id="big_img">
                                </div>    
                                <div class="details_txt">
                                    <h2>${results[0].drugsName}</h2><br/>
                                    <p>${results[0].drugsIntroduce}</p><br/>
                                    <div class="details_price">
                                        <span>价 格</span>
                                        <span><i class="i1">${results[0].drugsPrice}</i></span>
                                        <span>促 销</span>
                                        <span>月 销 量  <i>5036</i></span>
                                        <span>已销售2297件</span>
                                    </div><br/>
                                    <div class="amount">数量
                                        <input type="button" value="-" class="sub">
                                        <input type="text" value="1" id = "count"  size="3" style="text-align: center;">
                                        <input type="button" value="+" class="add">
                                        <span class="jian">件</span>
                                        <span class="jian kucun">库存22266件</span>
                                    </div><br/>
                                    <div class="addShopping">
                                    <img class="gwcbtn" src="../images/gwc11.png" alt="">
                                        <input type="button" class="btn_add" value="加入购物车">
                                        <span class="service">
                                            <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597839987238&di=f5282a675d09f8f07871c60ef508b0e2&imgtype=0&src=http%3A%2F%2Fpic.soutu123.cn%2Felement_origin_min_pic%2F01%2F40%2F41%2F72573cfccc13fb8.jpg%2521%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue" alt="">
                                            <span class="service" style="font-size: 18px;">联系客服</span>
                                        </span>  
                                    </div>

                                    
                                    <div class="tip">已成功加入购物车，若需购买请前往购物车进行支付</div>
                                    <div class="promise">
                                        <p>服务承诺</p>
                                        <div class="promise_span">
                                        <span>不支持七天无理由退换</span>
                                        <span>破损包退</span>
                                        <span>正品保证</span>
                                        <span>极速退款</span>
                                        <span>退货运费险</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="details_right">
                                    <div class="xuxian">
                                       <s></s>
                                       <p>同功效商品推荐</p>
                                    </div>
                                    <div class="details_right_img">
                                       <img class="sssss" src="../images/abc1.jpg" alt=""> 
                                       <p>瑞珠聚乙烯醇滴眼液眼药水20支视力疲劳干眼症人工泪液滴眼液官方</p>
                                    </div>
                                    <div class="details_right_img">
                                       <img class="sssss" src="../images/abc2.jpg" alt=""> 
                                       <p>感康复方氨酚烷胺片感冒药12片缓解普通感冒咽喉肿痛发热头痛鼻塞</p>
                                    </div>
                                    <div class="details_right_img">
                                       <img class="sssss" src="../images/abc4.jpg" alt=""> 
                                       <p>康森藿香正气水10支 中暑口服液体防暑解表化湿理气和中 批发优惠</p>
                                    </div>
                                               
                                </div>
                            </div>
                            <div class="detail_icon">
                                <ul>
                                    <li>&lt;</li>
                                    <li class="change_icon"><img src=${imgs[0]}></li>
                                    <li><img src=${imgs[1]}></li>
                                    <li><img src=${imgs[2]}></li>
                                    <li>&gt;</li>
                                </ul>
                            </div>
                        </div>
                       
                         `
                $('.p_details').html(strHTML);


            }

        }
    })
    $('.p_details').on('mouseover', '.sssss', function () {
        $(this).css("transform", "scaleX(1.1)")
        $(this).css("transform", "scaleY(1.1)")
    })
    $('.p_details').on('mouseout', '.sssss', function () {
        $(this).css("transform", "scaleX(.9)")
        $(this).css("transform", "scaleX(.9)")
    })
    $('.p_details').on('click', '.service', function () {
        $('.middle').fadeIn(500)
    })

    $('.close').on('click', function () {
        $('.middle').fadeOut(500)
        $('.middle').css("left","50%")
        $('.middle').css("top","50%")
    })
    //加入购物车
    var username = localStorage.getItem('userName') //获取当前登录的用户
    var flag = true
    // console.log(username);
    $('.p_details').on('click', '.btn_add', function () {
        count = parseInt(document.getElementById("count").value); //获取当前商品加入数量
        console.log('c3:', typeof (count));
        $.ajax({
            url: 'http://localhost:3000/productsRouter/checkProducts',
            type: 'get',
            data: {
                key: getId,
                username: username
            },
            dataType: 'json',
            success: function (res) {
                results = res.data
                if (res.message == '该商品已加入过') {
                    // alert('已加过')
                    flag = false
                    count += results[0].drugsCount

                } else {
                    flag = true
                    // alert('未加过')
                }
                adds(flag)
            }
        })
        function adds(flag) {
            $.ajax({
                url: 'http://localhost:3000/productsRouter/addShopping',
                type: 'get',
                dataType: 'json',
                data: {
                    key: getId,
                    userName: username,
                    counts: count,
                    flag: flag
                },
                success: function (res) {
                    var results = res.data
                    if (results == 1) {
                        //显示5s提示
                        $('.tip').css("display", 'block')
                        setTimeout(function () {
                            $('.tip').css("display", 'none')
                        }, 5000)

                    } else {
                        alert('加入失败')
                    }
                }

            })
        }

    })
    //减数量
    $('.p_details').on('click', '.sub', function () {
        if (parseInt($(this).next().val()) > 1) {
            $(this).next().val(parseInt($(this).next().val()) - 1)
        }
    })
    //加数量
    $('.p_details').on('click', '.add', function () {
        $(this).prev().val(parseInt($(this).prev().val()) + 1)
    })
    //显示放大区域及图片
    $('.p_details').on('mouseover', '.details_imgSmall', function () {
        $('.enlarge').css('display', 'block')
        $('.details_imgBig').css('display', 'block')
    })
    //隐藏放大区域及图片
    $('.p_details').on('mouseout', '.details_imgSmall', function () {
        $('.enlarge').css('display', 'none')
        $('.details_imgBig').css('display', 'none')
    })
    //显示块
    $('.p_details').on('mousemove', '.details_imgSmall', function (e) {
        var $x = 0, $y = 0
        $x = e.clientX - $('.details_imgSmall').offset().left - $('.enlarge').width() / 4
        $y = e.clientY - $('.details_imgSmall').offset().top - $('.enlarge').height() / 4
        if ($x < 0) $x = 0
        if ($x > $('.details_imgSmall').width() - $('.enlarge').width())
            $x = $('.details_imgSmall').width() - $('.enlarge').width()
        if ($y < 0) $y = 0
        if ($y > ($('.details_imgSmall').height() - $('.enlarge').height()))
            $y = $('.details_imgSmall').height() - $('.enlarge').height()
        $('.enlarge').css('left', $x + 'px')
        $('.enlarge').css('top', $y + 'px')
        $('#big_img').css('left', -$x * ($('.details_imgBig').width() / $('.enlarge').width()) + 'px')
        $('#big_img').css('top', -$y * ($('.details_imgBig').height() / $('.enlarge').height()) + 'px')
    })
    //选规格
    $('.p_details').on('click', '.qty input', function () {
        $(this).toggleClass("change_qty")
        $(this).siblings().removeClass("change_qty")
    })

    //选择小图标显示大图
    $('.p_details').on('click', '.detail_icon li:not(:first):not(:last)', function () {
        $(this).toggleClass("change_icon")
        $(this).siblings().removeClass("change_icon")
        $('#small_img').attr("src", $(this).children('img').attr("src"))
        $('#big_img').attr("src", $(this).children('img').attr("src"))
    })
    
    // 搜索栏旁的跳转购物车
    var shopping = document.querySelector(".article-shopping-span")
    shopping.onclick = function () {
        window.location.href = "../shopping.html"
    }
}
function query() {
    var val = $('#txtsearch').val()
    location.href = 'http://localhost:3000/drugStore/products.html' + encodeURI('?val=' + val);
}
var onOff = true;
function myFunction(event) {
    var x = event.keyCode;
    if (x == 13) {
        $('#btn1').click()
    }
}
$(function () {
    $(".products_split li").click(function () {
        $(this).addClass("split_listy").siblings().removeClass("split_listy");
        var index = $(this).index();
        console.log(index);
        $(".products_main .products_mains").eq(index).show().siblings().hide();
    });

})