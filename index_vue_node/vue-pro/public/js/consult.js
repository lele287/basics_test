window.onload = function () {
    var first = document.querySelector("#first")
    var lis = first.querySelectorAll("li")
    var uls = document.querySelectorAll(".second1-ul")
    for (let i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i);
        lis[i].onclick = function () {
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = ''
            }
            this.className = 'first-li'
            var index = this.getAttribute('index')
            for (var i = 0; i < uls.length; i++) {
                uls[i].style.display = 'none';
            }
            // 留下我自己 让对应的item 显示出来
            uls[index].style.display = 'block';
        }
        
    }
    var divss = document.querySelector('.content1')
    var divs = document.querySelector('.div2')
    var liss = divs.querySelectorAll('li')
    for(let j = 0; j < liss.length; j++){
        liss[j].setAttribute('index', j);
            liss[j].onclick = function(){
                for(var j = 0 ; j < liss.length; j++){
                    liss[j].className = ''
                }
                this.className = 'second-ul'
                var index = this.getAttribute('index')
                for (var j = 0; j < divss.length; j++) {
                    divss[j].style.display = 'none';
                }
                divss[index].style.display = 'block';
            }
            
        }
    
    
}