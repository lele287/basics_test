
// 轮播图
window.addEventListener('load', function () {
    var txtUserName = document.querySelector('#txtsearch')
    
    txtUserName.onkeyup = function (e) {
        var keyCode = e.keyCode      //获取按键
        if (keyCode == 13) {
            query()         //调用提交表单的方法
        }
    }
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 3000);
    });
    var ul = focus.querySelector('.lunbotu');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            num = index;
            circle = index;
            console.log(focusWidth);
            console.log(index);

            animate(ul, -index * focusWidth);
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    var num = 0;
    var circle = 0;
    var flag = true;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function () {
        arrow_r.click();
    }, 3000);
})
// 跳转购物车
window.onload = function () {
    var shopping = document.querySelector(".article-shopping-span")
    shopping.onclick = function () {
        window.location.href = "shopping.html"
    }
    // 侧边栏切换页面
    var styleUl = document.querySelector('.styles_product')
    var stylesLi = styleUl.querySelectorAll('li')
    var yaos = document.querySelectorAll('.yao')
    for (let j = 1; j < stylesLi.length; j++) {
        stylesLi[j].onmouseover = function () {
            stylesLi[j].style.backgroundColor = "#F6AD00"
            stylesLi[j].style.color = "#fff"
        }
        stylesLi[j].onmouseout = function () {
            stylesLi[j].style.backgroundColor = "#3E424C"
        }
        stylesLi[j].onclick = function () {
            var type = $(yaos[j - 1]).html()
            // location.href='本页名.html?'+encodeURI(retUrl);  
            location.href = 'drugStore/products.html' + encodeURI('?name=' + type);
        }
    }
    //关闭手机二维码
    var erweima = document.querySelector(".erweima")
    var erweimaBtn = erweima.querySelector(".erweima-btn")
    erweimaBtn.onclick = function () {
        erweima.style.display = "none"
    }

    var lis = document.querySelectorAll('.coyclassgg-right ul li')

    for (let i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
            lis[i].style.boxShadow = '1px 3px 5px 1px #ddd'
            lis[i].style.transform = 'translateY(-3px)';
        }
        lis[i].onmouseout = function () {
            lis[i].style.boxShadow = ''
            lis[i].style.transform = ''
        }
    }

}
$(function () {

    $('.coyclassgg-right').each(function (j, em) {
        var name = $(this).attr('name')
        $.ajax({
            url: 'http://localhost:3000/productsRouter/PageRendering',
            type: 'get',
            dataType: 'json',
            data: {
                userName: name
            },
            success: function (res) {
                var results = res.data
                if (results.length > 0) {
                    var strLi = ''
                    // for (var j = 0; j < 7; j++) {
                    for (var i = 0; i < 11; i++) {
                        var imgPath = results[i].drugsPhoto
                        var title = results[i].drugsName
                        var price = results[i].drugsPrice
                        var drugsId = results[i].drugsId
                        strLi += `
                        <li onclick="details(this)">
                        <i class="drugsId" style="display: none;">${drugsId}</i>
                        <div class="figure1">
                            <img class="abc2" src="${imgPath}" alt="">
                        </div>
                        <div class="figcaption1">
                            <p>${title}</p>
                            <div class="price">
                                <span class="price-mark"></span>${price}
                                <span class="origin-price">

                                </span>
                            </div>
                        </div>
                        </li>
                                 `
                    }
                    $('.coyclassgg-right ul').eq(j).append(strLi)
                    strLi = ''
                    // }
                } else {
                    console.log('没有查询到数据');
                }
            }
        })

    })

    var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".commodityClass1").offset().top - 200;
    toggleTool();

    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".div_absolute").fadeIn();
        } else {
            $(".div_absolute").fadeOut();
        };
    }
    $(window).scroll(function () {
        toggleTool();
        if (flag) {
            $(".floor .floors").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top - 150) {
                    $(".div_absolute li:lt(6)").eq(i).addClass("current1").siblings().removeClass();
                }
            })
        }
    });
    $(".div_absolute li:lt(6)").click(function () {
        flag = false;
        console.log($(this).index());
        var current = $(".floor .floors").eq($(this).index()).offset().top;
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });
        $(this).addClass("current1").siblings().removeClass();
    })
    $(".div_absolute li:lt(6)").on({
        click: function () {
            $(this).css({
                backgroundColor: "#06A860",
                color: "#fff"
            })

        },
        mouseleave: function () {
            $(this).css({
                backgroundColor: "#fff",
                color: "#333"
            })
        }
    })
    $('.li7').click(function () {
        flag = false;
        $("body,html").stop().animate({
            scrollTop: 0
        }, function () {
            flag = true;
        })
    })
})
function query() {
    var val = $('#txtsearch').val()
    location.href = 'http://localhost:3000/drugStore/products.html' + encodeURI('?val=' + val);
}
function details(num) {
    var Id = num.firstElementChild.innerText
    location.href = '/drugStore/products_detail.html' + encodeURI('?Id=' + Id);
}
window.onscroll = function () {
    var a = document.documentElement.scrollTop
    var navs = document.querySelector('.commodityClass1zt').offsetTop
    if (a > navs) {
        $('.article-tops').slideDown()
        $('.article-top').hide()
    }
    else {
        $('.article-tops').hide()
        $('.article-top').show()
    }
    
}