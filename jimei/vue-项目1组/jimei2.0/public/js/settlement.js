function out() {
  sessionStorage.clear();
  if ($("#login").html() == "退出登录") {
    location.href = "index.html";
  } else {
    location.href = "login.html";
  }
}
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
$(function () {
  //获取用户名
  var userinfo = sessionStorage["users"];
  if (userinfo == null) {
    $("#userName").html("未登录");
    $("#login").html("登录/注册");
  } else {
    var user = JSON.parse(sessionStorage["users"]);
    $("#userName").html(user[0].Name);
    $("#login").html("退出登录");
  }

  var userName = user[0].Name;
  //收货地址
  //显示默认收货地址
  $.ajax({
    url: "http://localhost:3000/userRec/getUserRec",
    type: "post",
    dataType: "json",
    data: {
      userName: userName,
    },
    success: function (results) {
      console.log("用户收货地址", results);
      if (results.data.length == 0) {
        // alert("请完善个人信息！");
        // location.href = "address.html";
      } else {
        $(".userName").html(
          "收&nbsp;&nbsp;货&nbsp;&nbsp;人：" + results.data[0].recName
        );

        $(".userTel").html(
          "手&nbsp;&nbsp;机&nbsp;&nbsp;号：" + results.data[0].recPhone
        );
        $(".userAddress").html("收货地址：" + results.data[0].recAddress);
      }
    },
  });
  //获取商品信息显示到页面
  var buyGoods = JSON.parse(sessionStorage["buyGood"]);
  if (buyGoods == null) {
    location.href = "index.html";
  } else {
    var str = ``;
    for (let i = 0; i < buyGoods.length; i++) {
      str += `<li>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
            <img src="${buyGoods[i].img}" alt="" class="img">
            <span class="title">${buyGoods[i].title}</span>
            <span class="price">${buyGoods[i].price}</span>
            <span class="count">${buyGoods[i].num}</span>
            <span class="sumPrice">${buyGoods[i].price * buyGoods[i].num}</span>
                </li>`;
    }
    console.log("str:", str);
    $(".allMes ul").html(str);
    // console.log("result:", $(".allMes ul").html());
  }
  footerAd(); //底部栏广告
});

window.onload = function () {
  document.querySelector(".cancel").onclick = function () {
    location.href = document.referrer;
  };
  document.querySelector(".pay").onclick = function () {
    var length = JSON.parse(sessionStorage["buyGood"]).length;
    console.log(length)
    userName = userName.innerHTML
    for (let i = 0; i < length; i++) {
      var thisGood = JSON.parse(sessionStorage["buyGood"])[i];
      var goodId = thisGood.gid;
      var goodNum = thisGood.num;
      var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
      var tPrice = thisGood.price*thisGood.num;
      
      console.log("userName",userName,"goodId",goodId,"goodNum",goodNum,"time",time,"tPrice",tPrice)
      $.ajax({
        url: "http://localhost:3000/order/addOrder",
        type: "post",
        dataType: "json",
        data: {
          userName: userName,
          goodId:goodId,
          goodNum:goodNum,
          time:time,
          tPrice:tPrice
        },
        success: function (results) {
        },
      });
    }
    location.href = 'order.html';
  };
};

//底部栏广告放置
function footerAd() {
  var winheight = document.documentElement.clientHeight;
  var docheight = document.body.offsetHeight;
  if (docheight < winheight) {
    var ad = `<div class="ad"><img src="images/ad.jpg" alt=""> </div>`;
    $(ad).insertBefore($("#footer"));
  }
}
