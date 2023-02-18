
function home() {
    location.href = "index.html"
}

function out() {
    sessionStorage.clear()
    if ($('#login').html() == '退出登录') {
        location.href = 'index.html'
    } else {
        location.href = 'login.html'
    }
}

$(function() {
    //获取用户名
    var userinfo = sessionStorage['users']
    if (userinfo == null) {
        $('#userName').html("未登录");
        $('#login').html('登录/注册')
    } else {
        var user = JSON.parse(sessionStorage['users'])
        $('#userName').html(user[0].Name)
        $('#login').html('退出登录')
    }
    let search  = sessionStorage["search"]
    let searchByClassName = sessionStorage['goodsClassName']
    if(search == null&&searchByClassName==null){
        $.ajax({
            url: "http://localhost:3000/goods/getAllGoods",
            type: "get",
            dataType: "json",
            success: function (response) {
              data = response.data
              if(data.length > 0){
                  let strHTML = ``;
                  for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                      if(data[i]){
                          strHTML +=`
                          <li onclick="check(this)">
                          <span style="display:none">${data[i].gId}</span>
                              <img src="${data[i].gPic}" alt="">
                              <p>标题：<span>${data[i].gName}</span></p>
                             <p>价格：<span>${data[i].gPrice}元</span></p>
                          </li>
                      `
                      }
                  }
                  $('.goods-ul').html(strHTML)
                  recordCount = data.length
                  pageCount = Math.ceil(recordCount / pageSize);
                  initPage()
                }
            }
        });
    }else if(searchByClassName != null){
        let searchGoodsByClassName = JSON.parse(sessionStorage["goodsClassName"])
        searchGoodsByCategory(searchGoodsByClassName[0].gClassName)
    }else{
        let search = JSON.parse(sessionStorage["search"])
        searchGoods(search[0].search)
    }
    
    $('.classify:nth-child(2) li a').click(function() {
        if (this.className != 'red') {
            this.classList.add('red')
            $(this).parent().siblings('li').children('a').removeClass('red')
        } else {
            this.classList.remove('red')
        }
    })
    //铵价格升序
    $('.sort').children('a').eq(0).click(function() {
        pageIndex = 0
        function sortprice(a, b) {
            return a.gPrice- b.gPrice
        }
        data.sort(sortprice);
        recordCount = data.length;
        pageCount = Math.ceil(recordCount / pageSize);
        initPage();
        initData();
    })
    //按价格降序
    $('.sort').children('a').eq(1).click(function() {
        pageIndex = 0
        function sortprice(b, a) {
            return a.gPrice- b.gPrice
        }
        data.sort(sortprice);
        recordCount = data.length;
        pageCount = Math.ceil(recordCount / pageSize);
        initPage();
        initData();
    })
    //按热度排行
    $('.sort').children('a').eq(2).click(function(){
        $.ajax({
            url: "http://localhost:3000/goods/getHotGoods",
            type: "get",
            dataType: "json",
            success:function(response){
                data = response.data
                if(data.length > 0){
                    let strHTML = ``;
                    for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                        if(data[i]){
                            strHTML +=`
                            <li onclick="check(this)">
                            <span style="display:none">${data[i].gId}</span>
                                <img src="${data[i].gPic}" alt="">
                                <p>标题：<span>${data[i].gName}</span></p>
                               <p>价格：<span>${data[i].gPrice}元</span></p>
                            </li>
                        `
                        }
                    }
                    $('.noGood').css('display','none')
                    $('.goods-ul').html(strHTML)
                    recordCount = data.length
                    pageCount = Math.ceil(recordCount / pageSize);
                    initPage()
                }else{
                    $('.noGood').css('display','block')
                    $('.goods-ul').html('')
                    recordCount = data.length
                    pageCount = Math.ceil(recordCount / pageSize);
                    initPage()
                }
            }
          });
    })
    //按上市时间
    $('.sort').children('a').eq(3).click(function(){
        pageIndex = 0
        $.ajax({
            url:"http://localhost:3000/goods/getNewGoods",
            type:'get',
            dataType:'json',
            success:function(response){
                data = response.data
                if(data.length > 0){
                    let strHTML = ``;
                    for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                        if(data[i]){
                            strHTML +=`
                            <li onclick="check(this)">
                            <span style="display:none">${data[i].gId}</span>
                                <img src="${data[i].gPic}" alt="">
                                <p>标题：<span>${data[i].gName}</span></p>
                               <p>价格：<span>${data[i].gPrice}元</span></p>
                            </li>
                        `
                        }
                    }
                    $('.noGood').css('display','none')
                    $('.goods-ul').html(strHTML)
                    recordCount = data.length
                    pageCount = Math.ceil(recordCount / pageSize);
                    initPage()
                }else{
                    $('.noGood').css('display','block')
                    $('.goods-ul').html('')
                    recordCount = data.length
                    pageCount = Math.ceil(recordCount / pageSize);
                    initPage()
                }
            }
        })
    })

})
function searchGoodsByCategory(gSearchClassName){
    let gClassName =  gSearchClassName
    $.ajax({
        url:'http://localhost:3000/goods/getGoodsBygClassName',
        type:'get',
        data:{
            gClassName:gClassName
        },
        dataType:'json',
        success:function(results){
            data = results.data
                if(data.length > 0){
                    let strHTML = ``;
                    for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                        if(data[i]){
                            strHTML +=`
                            <li onclick="check(this)">
                            <span style="display:none">${data[i].gId}</span>
                                <img src="${data[i].gPic}" alt="">
                                <p>标题：<span>${data[i].gName}</span></p>
                               <p>价格：<span>${data[i].gPrice}元</span></p>
                            </li>
                        `
                        }
                    }
                    $('.noGood').css('display','none')
                    $('.goods-ul').html(strHTML)
                    recordCount = data.length
                    pageCount = Math.ceil(recordCount / pageSize);
                    initPage()
                }else{
                    $('.noGood').css('display','block')
                    $('.goods-ul').html('')
                    recordCount = data.length
                    pageCount = Math.ceil(recordCount / pageSize);
                    initPage()
                }
        }
    })
}
//通过价格分类
let priceNum
function classifyByPrice(price){
    if(price.innerText=='500以下'){
        priceNum = 1
    }else if(price.innerText=='500-2000'){
        priceNum = 2
    }else if(price.innerText=='2000-3500'){
        priceNum = 3
    }else if(price.innerText=='3500-5000'){
        priceNum = 4
    }else if(price.innerText=='5000以上'){
        priceNum = 5
    }
    $.ajax({
        url:'http://localhost:3000/goods/getGoodsByPriceLevel',
        type:'get',
        data:{
            priceId:priceNum
        },
        dataType:'json',
        success:function(results){
            data = results.data
            if(data.length > 0){
                let strHTML = ``;
                for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                    if(data[i]){
                        strHTML +=`
                        <li onclick="check(this)">
                        <span style="display:none">${data[i].gId}</span>
                            <img src="${data[i].gPic}" alt="">
                            <p>标题：<span>${data[i].gName}</span></p>
                           <p>价格：<span>${data[i].gPrice}元</span></p>
                        </li>
                    `
                    }
                }
                $('.noGood').css('display','none')
                $('.goods-ul').html(strHTML)
                recordCount = data.length
                pageCount = Math.ceil(recordCount / pageSize);
                initPage()
            }else{
                $('.noGood').css('display','block')
                $('.goods-ul').html('')
                recordCount = data.length
                pageCount = Math.ceil(recordCount / pageSize);
                initPage()
            }
        }
    })
}
//通过是否折扣分类
let discountNum;
function classifyByDiscount(discount){
    // console.log(discount.value)
    if(discount.innerText=='可'|| discount.value=='ydao'){
        discountNum = 1;
    }else if(discount.innerText=='否'|| discount.value=='ndao'){
        discountNum = 0;
    }
    $.ajax({
        url:'http://localhost:3000/goods/getGoodsByDiscount',
        type:'get',
        data:{
            gDiscount:discountNum
        },
        dataType:'json',
        success:function(results){
            data = results.data
            if(data.length > 0){
                let strHTML = ``;
                for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                    if(data[i]){
                        strHTML +=`
                        <li onclick="check(this)">
                        <span style="display:none">${data[i].gId}</span>
                            <img src="${data[i].gPic}" alt="">
                            <p>标题：<span>${data[i].gName}</span></p>
                           <p>价格：<span>${data[i].gPrice}元</span></p>
                        </li>
                    `
                    }
                }
                $('.noGood').css('display','none')
                $('.goods-ul').html(strHTML)
                recordCount = data.length
                pageCount = Math.ceil(recordCount / pageSize);
                initPage()
            }else{
                $('.noGood').css('display','block')
                $('.goods-ul').html('')
                recordCount = data.length
                pageCount = Math.ceil(recordCount / pageSize);
                initPage()
            }
        }
    })
}
//填充json数据
let data = null;
let recordCount = 0; //总记录数
let pageSize = 20; //每页显示的记录数
let pageCount = 0; //总页数
let pageIndex = 0; //当前页索引值
function searchGoods(search){
    let searchgName;
    if(search == undefined){
        searchgName = $('[type="text"]').val()
    }else{
        searchgName = search
    }
    pageIndex = 0
    $.ajax({
        url:"http://localhost:3000/goods/searchLikeGoods",
        type:'get',
        data:{
            gName:searchgName
        },
        dataType:'json',
        success:function(response){
            data = response.data
            if(data.length > 0){
                let strHTML = ``;
                for(let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++){
                    if(data[i]){
                        strHTML +=`
                        <li onclick="check(this)">
                        <span style="display:none">${data[i].gId}</span>
                            <img src="${data[i].gPic}" alt="">
                            <p>标题：<span>${data[i].gName}</span></p>
                           <p>价格：<span>${data[i].gPrice}元</span></p>
                        </li>
                    `
                    }
                }
                $('.noGood').css('display','none')
                $('.goods-ul').html(strHTML)
                recordCount = data.length
                pageCount = Math.ceil(recordCount / pageSize);
                initPage()
            }else{
                $('.noGood').css('display','block')
                $('.goods-ul').html('')
                recordCount = data.length
                pageCount = Math.ceil(recordCount / pageSize);
                initPage()
            }
        }
    })
}
// //初始化分页指示符
function initPage() {
    let strPages = '';
    for (let i = 0; i < pageCount; i++) {
        strPages += `<li onclick="showData(${i})">${i+1}</li>`;
    }
    $('.page-ul').html(strPages);
}

// //显示当前页数据的方法
function showData(index) {
    pageIndex = index;
    initData();
}
//显示体数据的方法
function initData() {
    var strHTML = ``;
    for (let i = pageIndex * pageSize; i < (pageIndex + 1) * pageSize; i++) {
        if (data[i]) {
            strHTML += ` 
            <li onclick="check(this)">
            <span style="display:none">${data[i].gId}</span>
            <img src="${data[i].gPic}" alt="">
            <p>标题：<span>${data[i].gName}</span></p>
           <p>价格：<span>${data[i].gPrice}元</span></p>
        </li>`;
        }
    }
    $('.goods-ul').html(strHTML)
}

//获取当前商品的id并放入session中
function check(result) {
    let gId = result.children[0].innerHTML
    $.ajax({
        url:'http://localhost:3000/goods/gHitAdd',
        type:'get',
        data:{
          gId:gId
        },
        dataType:'json',
        success:function(){
            let products = []
            products.push({ gid: gId });
            sessionStorage["products"] = JSON.stringify(products);
            location.href = "good.html";
        }
      })
}