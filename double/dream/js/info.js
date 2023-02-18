var imgPath = ["info/t1.png", "info/t2.png", "info/t3.png", "info/t4.png"]
var arr_text = ["《王者归来》","《王者归来》","《权倾盛世》","《顶级跑车》","《全职小保安》"]
var a = 0;
var fileData = null
window.onload = function () {
    lunbo()
    function lunbo() {
        //1.找到图片标签
        var img = document.querySelector('.bb')
        //2.创建定时器对象，修改src属性，实现图片切换
        setInterval(function () {
            img.src = "images/" + imgPath[a++]
            text.innerText =arr_text[a]
            if (a == imgPath.length) {
                a = 0
            }
        }, 3000)
        //添加手动切换
        var lis = document.getElementsByClassName("tupian")
        for (var j = 0; j < lis.length; j++) {
            lis[j].onclick = function () {
                a = this.innerHTML - 1
                img.src = "images/" + imgPath[a]
                text.innerText = arr_text[a]
            }
        }
    }
}