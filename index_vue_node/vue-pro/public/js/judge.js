$(function () {
    var oDeng = document.querySelector('.wdl')
    var oYong = document.querySelector('.ydl')
    var oLi2 = oYong.querySelectorAll('li')
    var judge = localStorage.getItem('userName')
    if (judge) {
        oDeng.style.display = 'none'
        oYong.style.display = 'block'
        oLi2[0].querySelector('a').innerHTML = judge
        oLi2[1].onclick = function () {
            localStorage.removeItem('userName')
        }
    } else {
        oDeng.style.display = 'block'
        oYong.style.display = 'none'
        alert('请先登录')
        location.href = '../login.html'
    }
})