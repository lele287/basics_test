// // 页面跳转，并传参到收藏书单 书架页面
function goinfo(num){
    // console.log($(num).parent().children('.bookId').text());
    var ak =$(num).parent().children('.bookId').text() // 下一个兄弟节点
    location.href = 'BookIntroduction.html?bookId='+ak
}

function showInfo(index) {
    //1.把所有的dl全部隐藏
    var dls = document.querySelectorAll('.w_right ul')
    for (var i = 0; i < dls.length; i++) {
        dls[i].style.display = 'none'
    }
    //2.把指定位置的dl显示出来
    dls[index].style.display = 'block'
}
var fileData = null
window.onload = function () {
    document.querySelector('#user1').innerHTML= '用户：'+localStorage.getItem("username")
    //数据库
    $.ajax({
        url: 'http://localhost:3000/novels/rankbooks',
        // headers:{Authorization:localStorage.getItem('auth')},
        type: 'get',
        dataType: 'json',
        success: function (res) {
            // console.log('res:',res)
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>    
                        <h4>${results[i].novelName}</h4><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        </li>
                        `
                }
                $('#ul01').html(strHTML)
            }
        }
    })
    $.ajax({
        url: 'http://localhost:3000/novels/rankbooks2',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            // console.log('res:',res)
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>    
                        <h4>${results[i].novelName}</h4><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        </li>
                        `
                }
                $('#ul02').html(strHTML)
            }
        }
    })
    $.ajax({
        url: 'http://localhost:3000/novels/rankbooks3',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            // console.log('res:',res)
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <h4>${results[i].novelName}</h4><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>    
                        </li>
                        `
                }
                $('#ul03').html(strHTML)
            }
        }
    })
    $.ajax({
        url: 'http://localhost:3000/novels/rankbooks4',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            // console.log('res:',res)
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <h4>${results[i].novelName}</h4><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>    
                        </li>
                        `
                }
                $('#ul04').html(strHTML)
            }
        }
    })
//滚动
$.ajax({
    url: 'http://localhost:3000/novels/rankbooks',
    headers:{Authorization:localStorage.getItem('auth')},
    type: 'get',
    dataType: 'json',
    success: function (res) {
        var results = res.data
        console.log('results',results);
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="">
                        <div class="mask">
                            <p class="display" onclick="goShopping(this)">加入收藏</p>
                         <i>${results[i].novelId}</i>
                        </div>
                        `
            }
            $('#u').html(strHTML)
        } 
    }
})
}
//查询
function search() {
    $.ajax({
        url: 'http://localhost:3000/novels/getAllnames',
        type: 'get',
        dataType: 'json',
        data: {
            bookname: $('#spec').val()
        },
        success: function (res) {
            console.log('res:', res)
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                        <li>
                        <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <i class="bookId" style="display: none;">${results[i].novelId}</i>  
                        <h3>${results[i].novelName}</h3><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        </li>
                        `
                }
                $('#ul01').html(strHTML)
            }
        }
    })
}
