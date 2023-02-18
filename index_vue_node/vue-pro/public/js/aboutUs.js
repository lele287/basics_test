window.onload = function(){
    var imgs = document.querySelectorAll('.content4 img')
    var hides = document.querySelectorAll('.hide')
    console.log(hides);
    for(let i =0 ; i< imgs.length;i++){
        imgs[i].onmouseover = function(){
            hides[i].style.display = 'block'
            imgs[i].style.cursor = 'pointer'
        }
        imgs[i].onmouseout = function(){
            hides[i].style.display = 'none'
        }
    }

}