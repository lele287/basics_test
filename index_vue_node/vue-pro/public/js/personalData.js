// const e = require("express");
$(function () {
    $('.sale img').on('click',function(){
        $('.middle').fadeIn(500)
    })
    // console.log($('.sale img'));
    $('.close').on('click', function () {
        $('.middle').fadeOut(500)
        $('.middle').css("left", "50%")
        $('.middle').css("top", "50%")
    })
})
var citys = [[], ['郑州', '洛阳'], ['苏州', '南京'], ['深圳', '东莞']]
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



    var shopping = document.querySelector(".article-shopping-span")
    shopping.onclick = function () {
        window.location.href = "../shopping.html"
    }
    var btn = document.querySelectorAll('.ssss')
    var lis = document.querySelector('.div_ul').querySelectorAll('.li-all')
    var divss = document.querySelectorAll('.all-order')
    // var square = document.querySelectorAll('.square1')
    for (let k = 0; k < btn.length; k++) {
        btn[k].onclick = function () {
            for (var i = 0; i < btn.length; i++) {
                btn[i].style.backgroundColor = ""
                btn[i].style.color = "#666"
            }
            this.style.backgroundColor = "#23c2aa"
            this.style.color = "#fff"
            this.style.border = ""
        }
        lis[k].onclick = function () {
            for (var i = 0; i < lis.length; i++) {
                lis[i].style.backgroundColor = ""
                lis[i].style.color = "#666"
                divss[i].style.display = 'none'
            }
            this.style.backgroundColor = "#23c2aa"
            this.style.color = "#fff"
            divss[k].style.display = 'block'
        }
    }

    //收缩列表
    var square = document.querySelectorAll('.square1')
    for (let i = 0; i < square.length; i++) {
        square[i].onclick = function () {
            var display = document.querySelectorAll('.all-order-first-bottom')[i].style.display
            if (display == 'block') {
                document.querySelectorAll('.all-order-first-bottom')[i].style.display = 'none'
                square[i].className = 'square2'
            } else {
                document.querySelectorAll('.all-order-first-bottom')[i].style.display = 'block'
                square[i].className = 'square1'
            }
        }
    }
    var sel = document.querySelector("#province")
    sel.options.add(new Option('河南省', '河南省'))
    sel.options.add(new Option('江苏省', '江苏省'))
    sel.options.add(new Option('广东省', '广东省'))

}
function changeCity() {
    var sel1 = document.querySelector('#province')
    var selIndex = sel1.selectedIndex
    var selCity = document.querySelector('#city')
    selCity.options.length = 0
    for (var i = 0; i < citys[selIndex].length; i++) {
        selCity.options.add(new Option(citys[selIndex][i], citys[selIndex][i]))
    }

}

function sculpture() {
    var oTr1 = document.querySelector('.trSculpture')
    oTr1.querySelector('input').click()
}
var name = null
function adda(inputFile) {
    // 读取文件
    var fileReader = new FileReader()
    // 绑定事件
    fileReader.onload = function (e) {
        var inputFile = document.querySelector('[type="file"]')
        var fileReader = new FileReader()
        var reg = /^image/gi
        var flag = reg.test(inputFile.files[0].type)
        console.log(inputFile.files[0]);
        if (inputFile.files[0].size < Math.pow(1024, 2) && flag) {
            fileReader.onload = function (e) {
                // document.querySelector('img').src = e.target.result
                $('.trSculpture img').attr('src', e.target.result)
                console.log(e.target.result);
            }
            fileReader.readAsDataURL(inputFile.files[0])
        } else {
            alert("图片上传失败！")
        }
    }
    // 读取文件
    fileReader.readAsDataURL(inputFile.files[0])
    name = inputFile.files[0].name
    // console.log(name);
}
var falgss = true
function promptBox() {
    $(".overallbtn").animate({
        opacity: .8
    }, 1000, function () {
        $(".overallbtn").animate({
            opacity: 0
        }, 2000)
        falgss = true
    })
}
function preservation() {
    var userName = localStorage.getItem('userName')

    if (falgss == true) {
        falgss = false;
        var name = $('.full-name').val()
        var cellPhone = $('.cell-phone').val()
        var location = $('#province').val()
        var detail = $('.Detailed-address').val()
        var floor = $('.House-number').val()

        var city = $('#city').val()
        function promptBox() {
            $(".overallbtn").animate({
                opacity: .8
            }, 1000, function () {
                $(".overallbtn").animate({
                    opacity: 0
                }, 2000)
                falgss = true
            })
        }
        if (name.length == 0) {
            promptBox()
            $('.overallbtn').text('收货人不能为空！')
        }
        else if (cellPhone.length == 0) {
            promptBox()
            $('.overallbtn').text('手机号不能为空！')
        }
        else if (location == "请选择省/城市") {
            promptBox()
            $('.overallbtn').text('所在地区不能为空！')
        }
        else if (detail.length == 0) {
            promptBox()
            $('.overallbtn').text('详细地址不能为空！')
        }
        else if (floor.length == 0) {
            promptBox()
            $('.overallbtn').text('楼层门牌不能为空！')
        }
        else {
            //收货地址存储
            $.ajax({
                url: 'http://localhost:3000/users/preservation',
                type: 'post',
                data: {
                    name: name,
                    cellPhone: cellPhone,
                    location: location,
                    detail: detail,
                    floor: floor,
                    userName: userName
                },
                dataType: 'json',
                // success: function (results) {
                //   if (results.data.length > 0) {

                //   } else {

                //   }
                // }
            })

            promptBox()
            $('.overallbtn').text('添加收货地址成功')
            preservemain()
            $('#myModal').modal('hide')
            $('.artion_diz').css("display", "block")
            var name = $('.full-name').val()
            var cellPhone = $('.cell-phone').val()
            var location = $('#province').val()
            var city = $('#city').val()
            var detail = $('.Detailed-address').val()
            var floor = $('.House-number').val()
            $('.diz_name').html(name)
            $('.diz_name1').html(cellPhone)
            $('.diz_name2').html(location + city)
            $('.diz_name3').html(detail + floor)
        }


    }
}



function xinzeng() {
    $('.independence').css("display", "block")
    $('.app-popup-mask').css("display", "block")

}
function cancel() {
    $('.independence').css("display", "none")
    $('.app-popup-mask').css("display", "none")
}

function preserve() {
    var userName = localStorage.getItem('userName')
    var input111 = $('.input111').val()
    var input222 = $('.input222').val()
    var input333 = $('.input333').val()
    var input444 = $('.input444').val()
    var input555 = $('.input555').val()
    console.log(input111);
    if (input111.length == 0) {
        promptBox()
        $('.overallbtn').text('收货人不能为空！')
    }
    else if (input222.length == 0) {
        promptBox()
        $('.overallbtn').text('手机号不能为空！')
    }
    else if (input333.length == 0) {
        promptBox()
        $('.overallbtn').text('所在地区不能为空！')
    }
    else if (input444.length == 0) {
        promptBox()
        $('.overallbtn').text('详细地址不能为空！')
    }
    else if (input555.length == 0) {
        promptBox()
        $('.overallbtn').text('楼层门牌不能为空！')
    }
    else {
        $('.independence').css("display", "none")
        $('.app-popup-mask').css("display", "none")
        preservemain()
        $('.diz_name').text(input111)
        $('.diz_name1').text(input222)
        $('.diz_name2').text(input333)
        $('.diz_name3').text(input444 + input555)
        //收货地址存储
        $.ajax({
            url: 'http://localhost:3000/users/preservation',
            type: 'post',
            data: {
                name: input111,
                cellPhone: input222,
                location: input333,
                detail: input444,
                floor: input555,
                userName: userName
            },
            dataType: 'json',
            // success: function (results) {
            //   if (results.data.length > 0) {

            //   } else {

            //   }
            // }
        })

    }

    history.go(0)
}
function preservemain() {

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
                <span class="tag" onclick = "defaults(this)">设为默认地址</span>
            </div>
            <div class="diz_main_button">
                <button>修改</button>
                <span>|</span>
                <button class="btnshanchu" onclick="shanchubtn(this)">删除</button>
                <i class="addressId" style="display: none;"></i>
            </div>
            </div>
    `
    $('.artion_diz').append(artionMain)
}
//设置默认地址
function defaults(sum) {
    promptBox()
    $('.overallbtn').text('设置默认地址成功')
    var addressId = $(sum).eq(0).parent().next().children().eq(3).text()
    console.log(addressId);
    // 收货地址页面初始化
    $.ajax({
        url: 'http://localhost:3000/users/defaults',
        type: 'post',
        data: {
            addressId: addressId
        },
        dataType: 'json',
        // success: function (res) {

        // }
    })
}
//删除
function shanchubtn(num) {
    location.reload()
    // var oId = $('.btnshanchu').next().text()
    // var btnshanchu = oId.slice(num*2, 2)
    var btnshanchu = $(num).next().text()
    $.ajax({
        url: 'http://localhost:3000/users/DeleteAddress',
        type: 'post',
        data: {
            addressId: btnshanchu
        },
        dataType: 'json',
        // success: function (results) {
        //   if (results.data.length > 0) {

        //   } else {

        //   }
        // }
    })
    $(num).parent().parent().remove()
    promptBox()
    $('.overallbtn').text('删除成功！')
}




function query() {
    var val = $('#txtsearch').val()
    location.href = 'http://localhost:3000/drugStore/products.html' + encodeURI('?val=' + val);
}

$(function () {
    var userName = localStorage.getItem('userName')
    $('.hidden').prop('value', userName)
    //个人资料页面初始化
    $.ajax({
        url: 'http://localhost:3000/users/personalData',
        headers:{Authorization:localStorage.getItem('auth')},
        type: 'post',
        data: {
            userName: userName
        },
        dataType: 'json',
        success: function (res) {
            var results = res.data
            if (results[0].userPhoto) {
                $('.headPortrait').prop('src', 'http://localhost:3000/upload/' + results[0].userPhoto)
                $('.input1').val(results[0].Nickname)
                $('.HealthNumber').text(results[0].userHealthyId)
                if (results[0].userSex == '男') {
                    $('.d_radio').eq(0).children().prop('checked', true)
                    $('.d_radio').eq(1).children().prop('checked', false)
                } else {
                    $('.d_radio').eq(0).children().prop('checked', false)
                    $('.d_radio').eq(1).children().prop('checked', true)
                }

                $('.userHigh').val(results[0].userHigh)
                $('.userWeight').val(results[0].userWeight)
                $('.userAge').val(results[0].userAge)

            } else {
                $('.HealthNumber').text(results[0].userHealthyId)
            }
        }
    })


})

$(function () {

    var userName = localStorage.getItem('userName')
    // 收货地址页面初始化
    $.ajax({
        url: 'http://localhost:3000/users/AddressInitialization',
        type: 'post',
        data: {
            userName: userName
        },
        dataType: 'json',
        success: function (res) {
            var results = res.data
            var lis_1 = document.querySelector(".lis_1")
            var lis_2 = document.querySelector(".lis_2")
            var lis_3 = document.querySelector(".lis_3")
            var lis_4 = document.querySelector(".lis_4")
            var div_zl = document.querySelector(".artion_zl")
            var div_dz = document.querySelector(".artion_dz")
            var div_dd = document.querySelector(".artion_dd")
            var div_sh = document.querySelector(".artion_sh")
            var div_diz = document.querySelector(".artion_diz")
            lis_1.onclick = function () {
                div_dz.className = "zzz"
                div_dd.className = "zzz"
                div_sh.className = "zzz"
                div_zl.className = "zzzz"
                sessionStorage.setItem('diplay', 1)
            }
            lis_2.onclick = function () {
                if (results.length == 0) {
                    div_zl.className = "zzz"
                    div_dd.className = "zzz"
                    div_sh.className = "zzz"
                    div_dz.className = "zzzz"
                    sessionStorage.setItem('diplay', 2)
                } else {
                    div_zl.className = "zzz"
                    div_dd.className = "zzz"
                    div_sh.className = "zzz"
                    div_dz.className = "zzz"
                    div_diz.className = "zzzz"
                    // sessionStorage.setItem('diplay',3)
                }

            }
            lis_3.onclick = function () {
                div_zl.className = "zzz"
                div_dz.className = "zzz"
                div_sh.className = "zzz"
                div_dd.className = "zzzz"
                sessionStorage.setItem('diplay', 4)
            }
            lis_4.onclick = function () {
                div_zl.className = "zzz"
                div_dz.className = "zzz"
                div_dd.className = "zzz"
                div_sh.className = "zzzz"
                sessionStorage.setItem('diplay', 5)
            }
            // if(results>0){
            //     $('.artion_dz').css("display","none") 
            //     $('.artion_diz').css("display","block") 

            // }
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                preservemain()
                // $('.diz_name')[i].text(results[i].floor)
                $('.diz_name').eq(i).text(results[i].fullName)
                $('.diz_name1').eq(i).text(results[i].cellPhone)
                $('.diz_name2').eq(i).text(results[i].location)
                $('.diz_name3').eq(i).text(results[i].detail + results[i].floor)
                $('.addressId').eq(i).text(results[i].addressId)
                // console.log($('.btnshanchu')[i]);
            }
        }
    })
})
