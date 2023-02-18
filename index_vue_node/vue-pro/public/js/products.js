var search = decodeURI(location.search).slice(1).split('=')[1]

$.ajax({
    url: 'http://localhost:3000/productsRouter/getproducts',
    type: 'get',
    dataType: 'json',
    data: {
        key: search
    },
    success: function (res) {
        results = res.data
        if (results.length > 0) {
            initData()
            
        } else {
            console.log('没有查询到数据');
        }
    }
})
//分页
var recordCount = 0   //总数量
var pageSize = 12     //每页显示页数
var pageCount = 0     //总页数
var pageIndex = 0     //当前页的索引值  
var results
var strHTML
function initData() {
    //循坏遍历数据，添加到指定位置
    
    recordCount = results.length
    pageCount = Math.ceil(recordCount / pageSize)
    strHTML = ''
    for (var i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++) {
        if (results[i]) {
            strHTML += `<li>
            <span class="drugs_id">${results[i].drugsId}</span>
            <img src="${results[i].drugsPhoto}" >
            <h4>${results[i].drugsIntroduce}</h4>
            <h3>￥${results[i].drugsPrice}</h3>
            <input type="button" class="btndetail" value="查看详情" onclick="toDetail()">
        </li>`
        }
    }
    $('.products_txt').html(strHTML)
    //跳转到商品详情页面
    var ul = document.querySelector('.products_txt')
    var lis = ul.querySelectorAll('li')
    var ids = document.querySelectorAll('.drugs_id')
    for (let i = 0; i < lis.length; i++) {
        lis[i].onmouseover = function () {
            lis[i].style.boxShadow = '0 0 2px 2px #ccc'
        }
        lis[i].onmouseout = function () {
            lis[i].style.boxShadow = ''
        }
        lis[i].onclick = function () {
            var Id = $(ids[i]).html()
            console.log(Id)
            // location.href='本页名.html?'+encodeURI(retUrl);  
            location.href = 'products_detail.html' + encodeURI('?Id=' + Id);
        }
    }
    //显示当前页
    document.querySelector('.pageNow').innerHTML = '当前为:第' + (pageIndex + 1) + '页'
}
//按钮状态
function setButton(f1, f2, f3, f4) {
    document.getElementById('first').disabled = f1
    document.getElementById('preve').disabled = f2
    document.getElementById('next').disabled = f3
    document.getElementById('last').disabled = f4
}
//第一页
function firstPage() {
    pageIndex = 0
    initData()
    setButton(true, true, false, false)

}
//上一页
function prevePage() {
    pageIndex--
    initData()
    setButton(false, false, false, false)
    if (pageIndex <= 0) {
        setButton(true, true, false, false)
    }
}
//下一页
function nextPage() {
    pageIndex++
    initData()
    setButton(false, false, false, false)
    if (pageIndex == pageCount - 1) {
        setButton(false, false, true, true)
    }
}
//最后一页
function lastPage() {
    index = pageCount
    pageIndex = pageCount - 1
    initData()
    setButton(false, false, true, true)
}



$(function () {
    $('.Types').html(search)
    var oVal = decodeURI(location.search).slice(1).split('=')
    for (var i = 0; i < oVal.length; i++) {
        if (oVal[i] == 'val') {
            $('#txtsearch').val(oVal[i + 1])
        }
    }
    query()
})
function query() {
    // location.href = "../drugStore/products.html"
    if ($('#txtsearch').val().length > 0) {
        $.ajax({
            url: 'http://localhost:3000/productsRouter/query',
            type: 'get',
            data: {
                userName: $('#txtsearch').val()
            },
            dataType: 'json',
            success: function (res) {
                results = res.data
                console.log(results.length);
                if (results.length > 0) {
                    pageIndex = 1     //当前页的索引值 
                    initData()
                    $('.products_txt').show()
                    $('.products_txt1').hide()
                   
                } else {
                    console.log('没有查询到数据');
                    $('.products_txt').hide()
                    $('.products_txt1').show()
                   
                         
                }
            }
        })
        var val = $('#txtsearch').val()
    }
}

window.onload = function () {
    var lis = document.querySelector('.two-level-li1')
    var lis2 = document.querySelectorAll('.two-level-li')
    var ids = document.querySelectorAll('.drugs_id')
    lis.onmouseover = function () {
        lis.style.color = '#06A860'
        for (var i = 0; i < lis2.length; i++) {
            lis2[i].style.color = ''
            lis2[i].onclick = function () {
                this.style.color = '#99ccff'
                var Id = $(ids[i]).html()
                location.href = 'products_detail.html' + encodeURI('?name=' + Id);
            }
            lis2[i].style.display = 'block'
        }
    }
    lis.onmouseout = function () {
        lis.style.color = '#666'
        for (var i = 0; i < lis2.length; i++) {
            lis2[i].style.display = 'none'
        }
    }

    
    // 跳转购物车
    var shopping = document.querySelector(".article-shopping-span")
    shopping.onclick = function () {
        window.location.href = "../shopping.html"
    }
}

//跳转到商品详情页面
function toDetail() {
    location.href = '../drugStore/products_detail.html'

}


