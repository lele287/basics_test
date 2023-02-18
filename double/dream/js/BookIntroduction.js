window.onload = function () {
    var querySex = ''
    //获取访问当前网页的url
    var url = location.href
    //拆分url，获取查询字符串
    var params = url.split('?')
    if (params.length > 1) {
        //从其他页面跳转而来，并带有参数
        querySex = params[1].replace(/bookId=/gi, '')
        querySex = decodeURIComponent(querySex)  //把中文编码的参数解码 
        // document.querySelector('.info_center_img p').innerHTML = querySex  
    }
    // console.log(querySex);
    // console.log('111111111',params);
    $.ajax({
        url:'http://localhost:3000/novels/bookinfo',
        type:'get',
        data:{
            param:querySex,   //把参数传入服务器接口
        },
        dataType:'json',
        success:function(res){
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                            <img src="${results[i].novelImgPath}" alt="">
                            <a>签约作品</a>
                            <p>${results[i].novelName}</p><br>
                            <span>${results[i].novelType}</span><br>
                            <h6>${results[i].novelUpdateType}</h6><br>  
                            `
                }
                $('.info_center_img').html(strHTML)
            }
        }
    })
    $.ajax({
        url:'http://localhost:3000/novels/bookinfo',
        type:'get',
        data:{
            param:querySex,   //把参数传入服务器接口
        },
        dataType:'json',
        success:function(res){
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                            <p>简介</p>
                            <span>${results[i].novelInfo}</span><br>
                            <div class="chapter">
                                
                            </div>
                            `
                }
                $('.content').html(strHTML)
            }
        }
    })
    $.ajax({
        url:'http://localhost:3000/novels/bookchapters',
        type:'get',
        data:{
            param:querySex,   //把参数传入服务器接口
        },
        dataType:'json',
        success:function(res){
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                            <p>${results[i].chapterName}</p><br>
                            <span>${results[i].chapterContent}</span><br>
                            `
                }
                $('.chapter').html(strHTML)
            }
        }
    })
    $.ajax({
        url:'http://localhost:3000/novels/bookchapters',
        type:'get',
        data:{
            param:querySex,   //把参数传入服务器接口
        },
        dataType:'json',
        success:function(res){
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                            <p>${results[i].chapterName}</p><br>
                            <span>${results[i].chapterContent}</span><br>
                            `
                }
                $('.chapter').html(strHTML)
            }
        }
    })
}