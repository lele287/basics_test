Date.prototype.Format = function(fmt) {
    // author: meizz
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        S: this.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1 ?
                o[k] :
                ("00" + o[k]).substr(("" + o[k]).length)
            );
    return fmt;
};
var uName = JSON.parse(sessionStorage['users'])[0].Name
console.log(uName)
window.onload = function() {
    cascadingList(); //下拉级联列表
    uploadPics(); //上传图片
    pickLabel(); //选中标签

    document.querySelector('.submit').onclick = function() {
        var formdata = new FormData();
        var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
        formdata.append("goodName", $('.productName input').val());
        formdata.append("goodMes", $('.product_details textarea').val());
        formdata.append("goodPrice", $('.productPrice input').val());
        formdata.append("goodHits", 0); //点击量，默认是0
        formdata.append("goodnumber", $('.number input').val());
        formdata.append("goodSetterName", uName); //发布人，也就是当前的用户名
        formdata.append("goodClassId", document.querySelector('.goods').querySelectorAll('option')[document.querySelector('.goods').selectedIndex].innerHTML); //这里需要传入id！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
        formdata.append("goodDiscount", flag);
        formdata.append("goodPic", $("#goodPic")[0].files[0]); //把一张图片存到formdata里
        formdata.append("goodSetTime", time);
        console.log(formdata)
        $.ajax({
            url: "http://localhost:3000/goods/addGood",
            type: "post",
            dataType: "json",
            data: formdata,
            cache: false,
            processData: false,
            contentType: false,
            success: function(results) {
                console.log('results', results)
            }
        })
    }

}

$(function() {
    //判断是否登录
    var userInfo = sessionStorage['users'];
    if (userInfo == null) {
        $('#userName').html("未登录");
        $('#login').html('登录/注册')
        $(".modal").modal({
            backdrop: "static",
        });
    } else {
        var user = JSON.parse(sessionStorage['users'])
        $('#userName').html(user[0].Name)
        $('#login').html('退出登录')
    }
    $(".goLogin").on("click", function() {
        location.href = "login.html";
    });
    $(".goIndex").on("click", function() {
        location.href = "index.html";
    });
})
var allGoods = [
    ['华为手机', '苹果手机', '小米手机', '三星手机', 'vivo手机', 'oppo手机'],
    ['华为平板', 'ipad', '小米平板', '微软'],
    ['联想', '戴尔', '惠普', '华硕', '苹果', '小米'],
    ['宁美国度', '联想', '华硕', '惠普', '名龙堂', '技嘉', '苹果'],
    ['鼠标', '键盘', '耳机', '显示器', '音响', '主板']
];

//下拉级联列表
function cascadingList() {
    var category = document.querySelector('.category'); //第一级下拉列表
    var goods = document.querySelector('.goods'); //第二级下拉列表
    category.onchange = function() {
        goods.options.length = 0;
        var index = this.selectedIndex;
        // console.log(category.options[index].text);
        var theGoods = allGoods[index];
        var length = theGoods.length;
        for (var i = 0; i < length; i++) {
            var goodsOption = new Option(theGoods[i], theGoods[i]);
            goods.options.add(goodsOption);
        }
    }
}

//上传一张图片（坏的）
var productPictures;

function uploadPics() {
    var inputFile = document.querySelector('[type="file"]')
    var upload = document.querySelector('.upload');
    upload.onclick = function() {
        inputFile.click();
    }
    inputFile.onchange = function() {
        var newImg = document.createElement('img');
        newImg.className = 'newImg';

        var fileReader = new FileReader()
        var reg = /^image/gi
        var flag = reg.test(inputFile.files[0].type);
        if (inputFile.files[0].size < Math.pow(1024, 2) && flag) {
            fileReader.onload = function(e) {
                newImg.src = e.target.result

            }
            fileReader.readAsDataURL(inputFile.files[0]);
            upload.appendChild(newImg)
        } else {
            alert("图片上传失败！")
                // newImg.parentNode.removeChild(newImg);
        }
        console.log(productPictures != null, productPictures);

        console.log(upload.innerHTML);
    }
}

//选中标签
var flag = 0;

function pickLabel() {
    var label = document.querySelector('.xiaodao span');
    label.onclick = function() {
        if (flag) {
            flag = 0;
            this.style.backgroundColor = '#eee';
            this.style.color = '#000';
        } else {
            flag = 1;
            this.style.backgroundColor = 'rgb(72, 212, 166)';
            this.style.color = '#fff';
        }
    }
    return flag;
}

//将发布内容保存到本地


function out() {
    sessionStorage.clear()
    if ($('#login').html() == '退出登录') {
        location.href = 'index.html'
    } else {
        location.href = 'login.html'
    }
}