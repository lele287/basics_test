$(function() {
    //判断是否登录
    var userinfo = sessionStorage["users"];
    if (userinfo == null) {
        $("#userName").html("未登录");
        $("#login").html("登录/注册");
        $(".modal").modal({
            backdrop: "static",
        });
    } else {
        var user = JSON.parse(sessionStorage["users"]);
        $("#userName").html(user[0].Name);
        $("#login").html("退出登录");
    }
    $(".goLogin").on("click", function() {
        location.href = "login.html";
    });
    $(".goIndex").on("click", function() {
        location.href = "index.html";
    });
    sessionStorage.removeItem('settle')
    $.ajax({
        url: "http://localhost:3000/shoppingCart/getMes",
        type: "post",
        dataType: "json",
        data: {
            uName: user[0].Name,
        },
        success: function(results) {
            if (results.length == 0) {} else {
                var goods = results.data;
                var length = goods.length;
                var strHTML = "";
                for (let i = 0; i < length; i++) {
                    strHTML += `
                    <div class="good">
                          <div class="shoppingCartId" style="display:none">${goods[i].SCRId}</div>
                      <div>
                        <input type="checkbox" name="product" id="" class="cb" style="margin-left:-720px">
                      <div class="gId" style="display:none">${goods[i].gId}</div>
                        <img class="goodsPic" src="${goods[i].gPic}" alt="">
                        <div class="goodsTitle" style="width: 200px; margin-top:auto; margin-bottom:auto;">${goods[i].gName}</div>
                    </div>
                    <div>${goods[i].gPrice}</div>
                    <div>${goods[i].SCRGoodsNum}</div>
                    <div>${goods[i].gPrice * goods[i].SCRGoodsNum}</div>
                    <div>
                        <span class="col">
                        <button onclick="collectionGoods()">收藏</button>
                        </span>
                        <span class="del">
                        <button onclick="delDiv()">删除</button>
                        </span>
                    </div>
                    </div>`;
                }
                $(".goods").html(strHTML);
            }
        },
    });
    pickChecked();
});

function delDiv() {
    var dels = document.getElementsByClassName("del");
    var del_length = dels.length;
    for (let i = 0; i < del_length; i++) {
        dels[i].onclick = function() {
            var shoppingCartId = parseInt(
                document.querySelectorAll(".good")[i].firstElementChild.innerHTML
            );
            this.parentNode.parentNode.parentNode.removeChild(
                this.parentNode.parentNode
            );
            $.ajax({
                url: "http://localhost:3000/shoppingCart/delMes",
                type: "post",
                dataType: "json",
                data: {
                    SCRId: shoppingCartId,
                },
                success: function(results) {
                    console.log("删除返回值", results);
                },
            });
        };
    }
}

function collectionGoods() {
    var user = JSON.parse(sessionStorage["users"])[0].Name;
    var collection = document.querySelectorAll(".col");
    var col_length = collection.length;
    for (let i = 0; i < col_length; i++) {
        collection[i].onclick = function() {
            var goodId = parseInt(document.querySelectorAll(".gId")[i].innerHTML);
            $.ajax({
                url: "http://localhost:3000/collection/addMes",
                type: "post",
                dataType: "json",
                data: {
                    gId: goodId,
                    uName: user
                },
                success: function(results) {
                    console.log("收藏", results);
                },
            });
        };
    }
}

function pickChecked() {
    var all = document.getElementById("all");
    var products = document.getElementsByName("product");
    var count = 0;
    all.onclick = function() {
        for (let i = 0; i < products.length; i++) {
            products[i].checked = all.checked;
        }
        if (all.checked) {
            count = products.length;
        } else {
            count = 0;
        }
        for (let i = 0; i < products.length; i++) {
            products[i].onclick = function() {
                this.checked == true ? count++ : count--;
                console.log(this.checked == true ? count++ : count--);
                if (count == 5) {
                    all.checked = true;
                } else {
                    all.checked = false;
                }
            };
        }
    };
}

var data = null;

function deleteItems() {
    var goods = $(".cb:checked");
    var len = goods.length;
    for (var i = 0; i < len; i++) {
        var tr = goods[i].parentNode.parentNode;
        var dell = tr.querySelector(".del").querySelector("button");
        dell.click();
    }
}

function settlement() {
    let buyGood = []
    let goods = $(".cb:checked");
    if (goods.length > 0) {
        for (let i = 0; i < goods.length; i++) {
            let tr = goods[i].parentNode.parentNode
            let gId = tr.children[1].children[1].innerHTML;
            let img = tr.children[1].children[2].getAttribute('src');
            let title = tr.children[1].children[3].innerHTML;
            let price = tr.children[2].innerHTML;
            let gNum = tr.children[3].innerHTML;
            buyGood.push({
                gid: gId,
                img: img,
                title: title,
                price: price,
                num: gNum
            });
        }
        sessionStorage['buyGood'] = JSON.stringify(buyGood);
        location.href = 'settlement.html'
    } else {
        alert('选中商品之后才能去结算哦！');
    }
}

function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}