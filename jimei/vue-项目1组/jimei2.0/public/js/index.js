//获取当前商品的id并放入session中
function check(result) {
  // console.log(result);
  let gId = result.children[1].children[1].innerHTML;
  $.ajax({
    url:'http://localhost:3000/goods/gHitAdd',
    type:'get',
    data:{
      gId:gId
    },
    dataType:'json',
    success:function(){
      let products = [];
      products.push({ gid: gId });
      sessionStorage["products"] = JSON.stringify(products);
      location.href = "good.html";
    }
  })
}
//推荐商品的切换
//上一行
function previous() {
  $(".first-li").addClass("fa-circle");
  $(".first-li").removeClass("fa-circle-o");
  $(".second-li").addClass("fa-circle-o");
  $(".second-li").removeClass("fa-circle");
  $("#hot").css("transform", "translate(0,0)");
}
//下一行
function next() {
  $(".first-li").removeClass("fa-circle");
  $(".first-li").addClass("fa-circle-o");
  $(".second-li").removeClass("fa-circle-o");
  $(".second-li").addClass("fa-circle");
  $("#hot").css("transform", "translate(-100%,0)");
}
let nextPage = null,
  previousPage = null;
function startTimer() {
  $('.third-li').attr('onclick','stopTimer()')
  $('.third-li').removeClass("glyphicon-play")
  $('.third-li').addClass("glyphicon-pause")
  if (nextPage == null && previousPage == null) {
    nextPage = setInterval("next()", 5000);
    previousPage = setInterval("previous()", 10000);
  }
}
function stopTimer() {
  clearInterval(nextPage);
  clearInterval(previousPage);
  nextPage = null;
  previousPage = null;
  $('.third-li').attr('onclick','startTimer()')
  $('.third-li').removeClass("glyphicon-pause")
  $('.third-li').addClass("glyphicon-play")
}

$(function () {
  startTimer();
  $("#box").mouseover(function () {
    $("#u").css("animationPlayState", "paused");
  });
  $("#box").mouseout(function () {
    $("#u").css("animationPlayState", "running");
  });
  //获取推荐商品
  $.ajax({
    url: "http://localhost:3000/goods/getHotGoods",
    type: "get",
    dataType: "json",
    success: function (response) {
      let strHtml = "";
      for (let i = 0; i < 8; i++) {
        if (response.data[i]) {
          strHtml += `
                    <div class="thumbnail" onclick="check(this)">
                    <img src="${response.data[i].gPic}" alt="...">
                        <div class="good-top"><span>${response.data[i].gName}</span>
                        <span style="display:none">${response.data[i].gId}</span>
                        </div>
                        <div class="good-bottom"><p>价格:<span style="color:red">${response.data[i].gPrice}元</span></p></div>
                      </div>
                     `;
        }
      }
      $(".row").eq(0).html(strHtml);
    },
  });
  //获取最新商品
  $.ajax({
    url: "http://localhost:3000/goods/getNewGoods",
    type: "get",
    dataType: "json",
    success: function (response) {
      let strHtml = "";
      for (let i = 0; i < 4; i++) {
        if (response.data[i]) {
          strHtml += `
                        <div class="thumbnail" onclick="check(this)">
                        <img src="${response.data[i].gPic}" alt="...">
                            <div class="good-top"><span>${response.data[i].gName}</span>
                            <span style="display:none">${response.data[i].gId}</span>
                            </div>
                            <div class="good-bottom"><p>价格:<span style="color:red">${response.data[i].gPrice}元</span></p></div>
                        </div>
                         `;
        }
      }
      $(".row").eq(2).html(strHtml);
    },
  });
  //获取全部商品
  $.ajax({
    url: "http://localhost:3000/goods/getAllGoods",
    type: "get",
    dataType: "json",
    success: function (response) {
      let strHtml = "";
      let length = response.data.length;
      let index = [];
      let realIndex = [];
      for(let j = 0 ; j < length ; j++){
        index.push(
          response.data[j].gId
        )
      }
      function foo(arr) {
        var cloneArr = arr.concat();  //数组的复制
        var len = cloneArr.length;
        for(var i = 0 ; i < len ; i++){
            var index = Math.floor(Math.random()*cloneArr.length);
            var temp = cloneArr[index];
            cloneArr[index] = cloneArr[i];
            cloneArr[i] = temp;
        }
        return cloneArr;
    }
      realIndex = foo(index);
      for (let i = 0; i < 12; i++) {
        if (response.data[realIndex[i]]) {
          strHtml += `
                        <div class="thumbnail" onclick="check(this)">
                        <img src="${response.data[realIndex[i]].gPic}" alt="...">
                            <div class="good-top"><span>${response.data[realIndex[i]].gName}</span>
                            <span style="display:none">${response.data[realIndex[i]].gId}</span>
                            </div>
                            <div class="good-bottom"><p>价格:<span style="color:red">${response.data[realIndex[i]].gPrice}元</span></p></div>
                        </div>
                         `;
        }
      }
      $(".row").eq(3).html(strHtml)
    },
  });
  //echarts获取商品类别数量
  let myChart = echarts.init(document.getElementById("data1"));
  $.ajax({
    url: "http://localhost:3000/goods/getGoodSum",
    type: "get",
    dataType: "json",
    success:function(res){
      let classify = []
      $.each(res.data,function(index,item){
        classify.push({
          value:item.amount,
          name:item.cName
        })
      });
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{a}：{c}'
      },
        legend: {
          orient: 'vertical',
          left: 'left',
          
      },
        series: [
          {
            name:'数量',
            data: classify,
            type: "pie",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
            showAllSymbol:true,
          },
        ],
    };
    myChart.setOption(option, true);
    }

  })
  let myChart1 = echarts.init(document.getElementById("data2"));
  var data = [
    {name: '哈尔滨医科大学', value: 9},
    {name: '黑龙江科技大学', value: 12},
    {name: '黑龙江大学', value: 120},
    {name: '哈尔滨工业大学', value: 12},
    {name: '哈尔滨理工大学', value: 14},
    {name: '哈尔滨工程大学', value: 15},
    {name: '东北农业大学', value: 16},
    {name: '东北林业大学', value: 18},
    {name: '黑龙江八一农垦大学', value: 18},
    {name: '东北石油大学', value: 19},
    {name: '大庆职业学院', value: 21},
    {name: '大庆医学高等专科学校', value: 21},
    {name: '大连理工大学', value: 21},
    {name: '沈阳工业大学', value: 22},
    {name: '沈阳航空航天大学', value: 23},
    {name: '沈阳理工大学', value: 24},
    {name: '东北大学', value: 24},
    {name: '辽宁科技大学', value: 25},
    {name: '辽宁工程技术大学', value: 25},
    {name: '辽宁石油化工大学', value: 25},
    {name: '东北电力大学', value: 25},
    {name: '吉林化工学院', value: 25},
    {name: '北华大学', value: 25},
    {name: '吉林农业科技学院', value: 26},
    {name: '油吉林医药学院', value: 26},
    {name: '吉林电子信息职业技术学院', value: 26},
    {name: '江苏科技大学', value: 270},
    {name: '江苏科技大学苏州理工学院', value: 320},
    {name: '常熟理工学院', value:200},
    {name: '苏州工艺美术职业技术学院', value: 28},
    {name: '沙洲职业工学院', value: 29},
    {name: '复旦大学', value: 2},
    {name: '同济大学', value: 3},
    {name: '华东理工大学', value: 110},
    {name: '上海理工大学', value: 22},
    {name: '东华大学', value: 11},
    {name: '上海电力大学', value: 0},
    {name: '华东师范大学', value: 121},
    {name: '华东政法大学', value: 5},
    {name: '齐齐哈尔高等师范专科学校', value: 3},
    {name: '齐齐哈尔医学院', value: 0},
    {name: '黑龙江交通职业技术学院', value: 10},
    {name: '牡丹江师范学院', value: 210},
    {name: '牡丹江大学', value: 10},
    {name: '黑龙江林业职业技术学院', value: 20},
    {name: '清华大学', value: 0},
    {name: '北京交通大学', value: 0},
    {name: '北京工业大学', value: 120},
    {name: '北京理工大学', value: 0},
    {name: '北京科技大学', value: 0},
    {name: '北京化工大学', value: 0},
];
var geoCoordMap = {
    '哈尔滨医科大学':[126.6264,45.707524],
    '黑龙江科技大学':[126.660046,45.824787],
    '黑龙江大学':[126.628135,45.7144],
    '哈尔滨工业大学':[126.639003,45.749057],
    '哈尔滨理工大学':[126.623017,45.721271],
    '哈尔滨工程大学':[126.688328,45.78251],
    '东北农业大学':[126.733936,45.750749],
    '东北林业大学':[126.642516,45.725245],
    '黑龙江八一农垦大学':[125.174669,46.593607],
    '东北石油大学':[125.155612,46.598274],
    '大庆职业学院':[125.157043,46.6807],
    '大庆医学高等专科学校':[125.055655,46.607892],
    '大连理工大学':[121.531261,38.888106],
    '沈阳工业大学':[123.255554,41.742385],
    '沈阳航空航天大学':[123.414885,41.931849],
    '沈阳理工大学':[123.500795,41.733289],
    '东北大学':[123.424477,41.770971],
    '辽宁科技大学':[123.067322,41.109661],
    '辽宁工程技术大学':[121.670459,42.029831],
    '辽宁石油化工大学':[123.798166,41.863659],
    '东北电力大学':[126.509725,43.829381],
    '吉林化工学院':[126.625598,43.906693],
    '北华大学':[126.61234,43.843166],
    '吉林农业科技学院':[126.485394,43.963825],
    '油吉林医药学院':[126.570631,43.809746],
    '吉林电子信息职业技术学院':[126.568898,43.928937],
    '江苏科技大学':[119.476475,32.200768],
    '江苏科技大学苏州理工学院':[120.576862,31.900236],
    '常熟理工学院':[120.743012,31.614752],
    '苏州工艺美术职业技术学院':[120.592312,31.236873],
    '沙洲职业工学院':[120.594373,31.909881],
    '复旦大学':[121.510766,31.301868],
    '同济大学':[121.508532,31.289027],
    '华东理工大学':[121.430226,31.149538],
    '上海理工大学':[121.561335,31.299252],
    '东华大学':[121.221942,31.060823],
    '上海电力大学':[121.898093,30.90808],
    '华东师范大学':[121.411329,31.233563],
    '华东政法大学':[121.20261,31.061249],
    '齐齐哈尔高等师范专科学校':[123.980191,47.320699],
    '齐齐哈尔医学院':[123.957548,47.384783],
    '黑龙江交通职业技术学院':[123.995984,47.327991],
    '牡丹江师范学院':[129.567356,44.594781],
    '牡丹江大学':[129.578552,44.598949],
    '黑龙江林业职业技术学院':[129.573317,44.595274],
    '清华大学':[116.333374,40.009645],
    '北京交通大学':[116.34974,39.957902],
    '北京工业大学':[116.488157,39.881251],
    '北京理工大学':[116.322726,39.966659],
    '北京科技大学':[116.365942,39.996165],
    '北京化工大学':[116.427674,39.977968],

};
let convertData = function (data) {
var res = [];
for (var i = 0; i < data.length; i++) {
  var geoCoord = geoCoordMap[data[i].name];
  if (geoCoord) {
      res.push({
          name: data[i].name,
          value: geoCoord.concat(data[i].value)
      });
  }
}
return res;
};

let option = {
title: {
  text: '包括学校',
  left: 'center'
},
tooltip : {
  trigger: 'item'
},
bmap: {
  center: [118.216853,39.142488],
  zoom: 5,
  // roam: true

},
series : [
  {
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: convertData(data),
      symbolSize: function (val) {
          return val[2] / 10;
      },
      encode: {
          value: 2
      },
      label: {
          formatter: '{b}',
          position: 'right',
          show: false
      },
      itemStyle: {
          color: 'rgb(72, 212, 166)'
      },
      emphasis: {
          label: {
              show: true
          }
      }
  },
  {
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      data: convertData(data.sort(function (a, b) {
          return b.value - a.value;
      }).slice(0, 6)),
      symbolSize: function (val) {
          return val[2] / 10;
      },
      encode: {
          value: 2
      },
      showEffectOn: 'render',
      rippleEffect: {
          brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
          formatter: '{b}',
          position: 'right',
          show: true
      },
      itemStyle: {
          color: 'rgb(72, 212, 166)',
          shadowBlur: 10,
          shadowColor: '#333'
      },
      zlevel: 1
  }
]
};;
myChart1.setOption(option, true);


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

  $("#fire").click(function () {
    // $('#fire').css('background-image', '../images/fire.png')
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  //滚动事件
  $(window).scroll(function () {
    let distance = $(document).scrollTop();
    let height = $("nav").height();
    //distance 大于 最上面的的高度  将search设置固定定位
    if (distance >= height) {
      $("#fire").css("display", "block");
      $(".search").attr("class", "fixed");
      $(".classify").css("margin-top", "60px");
    } else {
      //取消固定定位  不脱标
      $("#fire").css("display", "none");
      $(".fixed").attr("class", "search");
      $(".classify").css("margin-top", "0px");
    }

    $('.thumbnail').on('mouseover',function(){
      // $(this).children('div:last-child').slideToggle()
    })
  });

  //获取左侧列表
  var ul = $("#classifyUl");
  //获取右侧大盒子
  var show = $("#show");
  //获取左侧列表项
  var li = $(".classifyLi");
  //获取右侧 所有的小盒子
  var subItem = $(".sub-item");
  //离开右侧盒子时 右侧盒子隐藏
  subItem.mouseleave(function () {
    show.css("opacity", "0");
    show.css('z-index','0')
  });
  ul.mouseleave(function (e) {
    if (e.offsetX < 0 || e.offsetY > 79 || e.offsetY < 0) {
      show.css("opacity", "0");
      show.css('z-index','0')
    }
  });
  //鼠标移动到 左侧某个列表项时 右侧对应的子盒子显示 其他子盒子都是隐藏
  for (let i = 0; i < li.length; i++) {
    //获取列表项的下标 --添加自定义属性index
    li[i].index = i;
    li[i].onmouseenter = function () {
      //其他子盒子隐藏
      for (var j = 0; j < subItem.length; j++) {
        subItem[j].style.opacity = "0";
        subItem[j].style.zIndex = "0";
      }
      //右侧对应的子盒子显示
      show.css("opacity", "1");
      show.css('z-index','2')
      subItem[this.index].style.opacity = "1";
      subItem[this.index].style.zIndex = "1";
    };
  }
});

function searchGoodsByCategory(gClassName){
  sessionStorage.removeItem('search')
  let goodClassName = gClassName.innerText;
  let goodsClassName = [];
  goodsClassName.push({ gClassName: goodClassName });
  sessionStorage["goodsClassName"] = JSON.stringify(goodsClassName);
  location.href = "search.html";
}

function clearSession(){
  sessionStorage.removeItem('search')
  sessionStorage.removeItem('goodsClassName')
}

function out() {
  sessionStorage.clear();
  if ($("#login").html() == "退出登录") {
    location.href = "index.html";
  } else {
    location.href = "login.html";
  }
}

function search() {
  sessionStorage.removeItem('goodsClassName')
  var what = $('[type="text"]').val();
  var search = [];
  search.push({ search: what });
  sessionStorage["search"] = JSON.stringify(search);
  location.href = "search.html";
}
