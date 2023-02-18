window.onload = function(){
    var di = document.querySelector('.di')
    for(var i = 1 ; i <= 18 ; i++){
        di.innerHTML +=`<img src="" alt="">`
        di.lastElementChild.setAttribute('src','images/news'+i+'.png')
    }
}