window.onload = function () {
    var Fabulous = document.querySelector('.relation')
    if (localStorage.getItem("Fabulous") == null) {
        localStorage.setItem("Fabulous", JSON.stringify({ "s": 0 }))
    }
    var f = JSON.parse(localStorage.getItem("Fabulous"))
    Fabulous.innerHTML = f['s']

    
    if (localStorage.getItem("read") == null) {
        var rr = []
        $('.tit').each(function (i, nn) {
            rr.push({ "a": $('.num').eq(i).text() })
            localStorage.setItem("read", JSON.stringify(rr))
        })
    }else{
        $('.tit').each(function (i, nn) {
             $('.num').eq(i).text(JSON.parse(localStorage.getItem("read"))[i].a)
        })
    }
    var tits = document.querySelectorAll('.tit')

    for (let i = 0; i < tits.length; i++) {
        tits[i].onmouseover = function () {
            tits[i].style.color = "#06A860"
        }
        tits[i].onmouseout = function () {
            tits[i].style.color = "#666"
        }
        tits[i].onclick = function () {
            var read = parseInt($(this).next().children('.num').text()) + 1
            var Fabulous = parseInt($(this).next().children('.relation').text())
            $('.num').eq($(this).index('.tit')).text(read)

            var rr = []
            $('.tit').each(function (i, nn) {
                rr.push({ "a": $('.num').eq(i).text() })
                localStorage.setItem("read", JSON.stringify(rr))
            })
            location.href = "topic.html"
        }
    }


}