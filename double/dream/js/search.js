// var fileData = null
window.onload = function () {
    //         //1.读取文件数据
    //         $.get('json/xiaoshuo.json', function(result) {
    //             fileData = result
    //             console.log(result)
    //                 //2.循环遍历数据，组合数据，形成innerHTML字符串
    //             var strHTML = ''
    //             for (var i = 0; i < result.data.length; i++) {
    //                 strHTML += ` <li>
    //                                 <img src="${result.data[i].imgPath}" alt="">  
    //                                 <h3>${result.data[i].title}</h3><br>
    //                                 <span>${fileData.data[i].type}</span><br>
    //                                 <p>${result.data[i].introduce}</p>
    //                             </li>`
    //             }
    //             document.querySelector('ul').innerHTML = strHTML
    //         })
    //     }

    //     function showInfo(novel) {
    //         var strHTML = ''
    //         for (var i = 0; i < fileData.data.length; i++) {
    //             if (fileData.data[i].type == novel) {
    //                 strHTML += ` <li>
    //                                 <img src="${fileData.data[i].imgPath}" alt="">
    //                                 <h3>${fileData.data[i].title}</h3><br>
    //                                 <span>${fileData.data[i].type}</span><br>
    //                                 <p>${fileData.data[i].introduce}</p>
    //                             </li>`
    //             }
    //         }
    //         document.querySelector('ul').innerHTML = strHTML

    //     }

    //     function search() {
    //         //1.获取查询的关键字
    //         var novel = document.querySelector('.s-input').value
    //             //循环遍历现有的数据，条件判断类型是否一致
    //         var strHTML = ''
    //         for (var i = 0; i < fileData.data.length; i++) {
    //             //类型相同时，组合数据，拼接innerHTML字符串
    //             if (fileData.data[i].type.indexOf(novel) != -1) {
    //                 strHTML += ` <li>
    //                                     <img src="${fileData.data[i].imgPath}" alt="">
    //                                     <h3>${fileData.data[i].title}</h3><br>
    //                                     <span>${fileData.data[i].type}</span><br>
    //                                     <p>${fileData.data[i].introduce}</p>
    //                                 </li>`
    //             }
    //             //类型不同时，跳过
    //         }
    //         for (var i = 0; i < fileData.data.length; i++) {
    //             //名称相同时，组合数据，拼接innerHTML字符串
    //             if (fileData.data[i].title.indexOf(novel) != -1) {
    //                 strHTML += ` <li>
    //                                     <img src="${fileData.data[i].imgPath}" alt="">
    //                                     <h3>${fileData.data[i].title}</h3><br>
    //                                     <span>${fileData.data[i].type}</span><br>
    //                                     <p>${fileData.data[i].introduce}</p>
    //                                 </li>`
    //             }
    //             //名称不同时，跳过
    //         }
    //         document.querySelector('ul').innerHTML = strHTML
    $.ajax({
        url: 'http://localhost:3000/novels/moviebooks',
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log('res:', res)
            var results = res.data
            if (results.length > 0) {
                var strHTML = ''
                for (var i = 0; i < results.length; i++) {
                    strHTML += `
                    <li>
                    <img src="${results[i].novelImgPath}" alt="" onclick="goinfo(this)">
                        <h3>${results[i].novelName}</h3><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <h4>${results[i].novelUpdateType}</h4>
                        <h5>${results[i].authorName}</h5>
                        <i class="bookId" style="display: none;">${results[i].novelId}</i> 
                        </li>
                    `
                }
                $('.content_div_ul').html(strHTML)
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
                        <h3>${results[i].novelName}</h3><br>
                        <span>${results[i].novelType}</span><br>
                        <p>${results[i].novelInfo}</p>
                        <span>${results[i].novelUpdateType}</span>
                        
                        </li>
                        `
                }
                $('.content_div_ul').html(strHTML)
            }
        }
    })
}
// // 页面跳转，并传参到收藏书单 书架页面
function goinfo(num){
    // console.log($(num).parent().children('.bookId').text());
    var ak =$(num).parent().children('.bookId').text() // 下一个兄弟节点
    location.href = 'BookIntroduction.html?bookId='+ak
}