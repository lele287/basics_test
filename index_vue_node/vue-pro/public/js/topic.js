window.onload = function () {
    var helps = document.querySelector('.tb')
    if (localStorage.getItem("Fabulous") == null) {
        localStorage.setItem("Fabulous", JSON.stringify({ "s": 0 }))
    }
    if (localStorage.getItem("read") == null) {
        localStorage.setItem("read", JSON.stringify({ "a": 0, "a": 0, "a": 0 }))
    }
    var nums = document.querySelector('.number')
    var get = localStorage.getItem("Fabulous")
    //console.log(get)
    var res = JSON.parse(get)
    nums.innerHTML = res['s']

    var index = res['s']

    var span = document.querySelector('.span1')
    var l = JSON.parse(localStorage.getItem("read"))
    span.innerHTML = l[0]['a']

    helps.onmouseover = function () {
        helps.style.cursor = 'pointer'
    }

    helps.onclick = function () {
        index++
        nums.innerHTML = index
        localStorage.setItem("Fabulous", JSON.stringify({ "s": nums.innerHTML }))

    }

}