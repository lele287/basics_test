var loopPics = ['4.jpeg', '5.jpeg', '6.jpeg']
var index = 0

window.onload = function () {
    initLi()     //设置手动轮播
    autoLoop()  //设置自动轮播
}
//自动轮播的方法
function autoLoop() {
    //自动轮播
    setInterval(function () {
        showImg()
        setLiStyle()
        index++
        if (index > 2) {
            index = 0
        }
    }, 2000);
}
//手动轮播的方法
function initLi() {
    var lis = document.getElementsByClassName('loo')   //获取所有的列表项
    for (var i = 0; i < lis.length; i++) {
        //手动轮播控制
        lis[i].onclick = function () {
            var currentIndex = this.value       //获取点击标签内部的内容
            index = currentIndex - 1
            showImg()
            setLiStyle()
        }
    }
}
//让img标签加载图片
function showImg() {
    var myImg = document.getElementById('loopPic')
    myImg.src = 'images/' + loopPics[index]
}
//修改图片指示符的选中项的样式
function setLiStyle() {
    var lis = document.getElementsByClassName('loo')   //获取所有的列表项
    for (var j = 0; j < lis.length; j++) {
        lis[j].style.backgroundColor = '#000'     //让所有的图片指示符颜色变黑
    }
    lis[index].style.backgroundColor = '#8CC3D4'
}
//新书速递
$.ajax({
    url: 'http://localhost:3000/novels/Newbook',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:',res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                    <li>
                    <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                    <span>${results[i].novelName}</span><br>
                    <h3>${results[i].novelType}</h3><br>
                    <i class="bookId" style="display: none;">${results[i].novelId}</i> 
                    <p>${results[i].novelUpdateType}</p>
                    </li>
                    `
            }
            $('.con_new_img').html(strHTML)
        }
    }
})
//推荐现代
$.ajax({
    url: 'http://localhost:3000/novels/now',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:',res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                    <li>
                    <i class="bookId" style="display: none;">${results[i].novelId}</i> 
                    <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                    <h3>${results[i].novelName}</h3><br>
                    <span>${results[i].authorName}</span><br>
                    <p>${results[i].novelInfo}</p>
                    </li>
                    `
            }
            $('.menu_txt').html(strHTML)
        }
    }
})
// // 页面跳转，并传参到收藏书单 书架页面
function goinfo(num){
    // console.log($(num).parent().children('.bookId').text());
    var ak =$(num).parent().children('.bookId').text() // 下一个兄弟节点
    location.href = 'BookIntroduction.html?bookId='+ak
}
//现代章节
$.ajax({
    url: 'http://localhost:3000/novels/nowchapters',
    type: 'get',
    dataType: 'json',
    success: function (res) {
        console.log('res:',res)
        var results = res.data
        if (results.length > 0) {
            var strHTML = ''
            for (var i = 0; i < results.length; i++) {
                strHTML += `
                    <li>
                    <span class="type">[${results[i].novelType}]</span>
                    <span class="name">${results[i].novelName}</span>
                    <span class="chap">${results[i].chapterName}</span>
                    <span class="aut">${results[i].authorName}</span>
                    <span class="tim">${results[i].chapterUpdateTime}</span>
                    </li>
                    `
            }
            $('.content6_ul').html(strHTML)
        }
    }
})
//查询
function search() {
    $.ajax({
        url: 'http://localhost:3000/novels/getAllnames',
        type: 'get',
        dataType: 'json',
        data: {
            bookname: $('#speca').val()
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
                $('.menu_txt').html(strHTML)
            }
        }
    })
}