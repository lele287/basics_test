var datas = []  //创建保存数据的数组
$(function () {
    $.getJSON('json/nous.json', function (response) {
        var strLi = ''
        for (var i = 0; i < response.length; i++) {
            var first = response[i].first
            strLi += `<li onclick="showContent(${i})">${first}</li>`
        }
        $('.main-ul').html(strLi)
        datas = response
    })
    
})
function showContent(index) {
    //在右侧显示标题对应的内容
    if(index>0){
        $('.main-right').html(datas[index].second)
    }
    
    //记录操作历史信息
    if (window.history.pushState) {
        window.history.pushState(datas[index].second, '', '?first=' + datas[index].first)
    } else {
        alert('您的浏览器不支持历史API,请升级！')
    }
}
window.addEventListener('popstate', function (e) {
    $('.main-right').html(e.state)  //读取历史数据，并回显
})