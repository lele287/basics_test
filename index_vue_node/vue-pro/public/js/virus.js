$(function(){

    var oDgn = document.querySelector('.gn')
    var oI = oDgn.querySelectorAll('i')
    var oImg = oDgn.querySelectorAll('img')
    oI[0].onclick = function () {
        oI[0].style.backgroundColor = '#fff'
        oI[1].style.backgroundColor = '#ccc'
        // oImg[1].src = 'images/ditu1.png'
    }
    oI[1].onclick = function () {
        oI[1].style.backgroundColor = '#fff'
        oI[0].style.backgroundColor = '#ccc'
        // oImg[1].src = 'images/ditu2.png'
    }
    oI[2].onclick = function () {
        oI[2].style.backgroundColor = '#69dca8'
        oI[2].style.color = '#fff'
        oI[3].style.color = '#000'
        oI[3].style.backgroundColor = '#ccc'
        // oImg[2].src = 'images/wuzz1.png'
        document.querySelector('#Asymptomatic').style.display = 'block'
        document.querySelector('#diagnosis').style.display = 'none'
    }
    oI[3].onclick = function () {
        oI[3].style.backgroundColor = '#69dca8'
        oI[3].style.color = '#fff'
        oI[2].style.color = '#000'
        oI[2].style.backgroundColor = '#ccc'
        // oImg[2].src = 'images/wuzz2.png'
        document.querySelector('#Asymptomatic').style.display = 'none'
        document.querySelector('#diagnosis').style.display = 'block'
    }
    var oD2 = document.querySelector('.gw')
    var oI2 = oD2.querySelectorAll('i')
    var oImg2 = oD2.querySelectorAll('img')
    oI2[0].onclick = function () {
        oI2[0].style.backgroundColor = '#fff'
        oI2[1].style.backgroundColor = '#ccc'
        oImg2[1].src = 'images/gwpz1.png'
    }
    oI2[1].onclick = function () {
        oI2[1].style.backgroundColor = '#fff'
        oI2[0].style.backgroundColor = '#ccc'
        oImg2[1].src = 'images/gwpz2.png'
    }
    oI2[2].onclick = function () {
        oI2[2].style.backgroundColor = '#69dca8'
        oI2[2].style.color = '#fff'
        oI2[3].style.color = '#000'
        oI2[3].style.backgroundColor = '#ccc'
        // oImg2[2].src = 'images/gwps1.png'
    }
    oI2[3].onclick = function () {
        oI2[3].style.backgroundColor = '#69dca8'
        oI2[3].style.color = '#fff'
        oI2[2].style.color = '#000'
        oI2[2].style.backgroundColor = '#ccc'
        // oImg2[2].src = 'images/gwps2.png'
    }
    var oD3 = document.querySelector('.bb')
    var oI3 = oD3.querySelectorAll('i')
    var oNei = document.querySelector('.nei')
    var oWai = document.querySelector('.wai')
    oI3[0].onclick = function () {
        oI3[0].style.backgroundColor = '#69dca8'
        oI3[0].style.color = '#fff'
        oI3[1].style.color = '#000'
        oI3[1].style.backgroundColor = '#ccc'
        oWai.style.display = 'none'
        oNei.style.display = 'block'
    }
    oI3[1].onclick = function () {
        oI3[1].style.backgroundColor = '#69dca8'
        oI3[1].style.color = '#fff'
        oI3[0].style.color = '#000'
        oI3[0].style.backgroundColor = '#ccc'
        oNei.style.display = 'none'
        oWai.style.display = 'block'
    }
})

window.onscroll = function () {
    var oUl = document.querySelector('.u1')
    var a = document.documentElement.scrollTop
    // console.log(a);
    if (a >= 100) {
        oUl.className = 'fixed u1'
    }
    else {
        oUl.className = 'static u1'
    }
    
}
$(function(){
    $.getJSON('json/score.json', function (res) {
        var courseNames = []
        var scores = []
        $.each(res, function (index, item) {
            courseNames.push(item.courseName)
            scores.push(item.score)
        })
        var Asymptomatic = echarts.init(document.querySelector('#Asymptomatic'), 'light')
        var option = {
            title: {
                text: '全国无症状感染者分布(单位：例)'
            },
            legend: {
                text: '全国无症状感染者分布'
            },
            xAxis: {
                data: courseNames
            },
            yAxis: {},
            series: {
                type: 'bar',
                data: scores,
                barWidth:40,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            
                            return colors = '#e86d48'
                        }
                    },
                }
            }

        }
        Asymptomatic.setOption(option)
    })

    $.getJSON('json/diagnosis.json', function (res) {
        var courseNames = []
        var scores = []
        $.each(res, function (index, item) {
            courseNames.push(item.courseName)
            scores.push(item.score)
        })
        var diagnosis = echarts.init(document.querySelector('#diagnosis'), 'light')
        var option = {
            title: {
                text: '新增确诊分布(单位：例)'
            },
            legend: {
                text: '新增确诊分布'
            },
            xAxis: {
                data: courseNames
            },
            yAxis: {},
            series: {
                type: 'bar',
                data: scores,
                barWidth:40,
                itemStyle: {
                    normal: {

                    },
                }
            }

        }
        diagnosis.setOption(option)
    })

    $.getJSON('json/CountryOfDiagnosis.json', function (res) {
        var courseNames = []
        var scores = []
        $.each(res, function (index, item) {
            courseNames.push(item.courseName)
            scores.push(item.score)
        })
        var CountryOfDiagnosis = echarts.init(document.querySelector('#CountryOfDiagnosis'), 'light')
        var option = {
            title: {
                text: '新增确诊国家Top10（单位：例）'
            },
            legend: {
                text: '新增确诊国家'
            },
            xAxis: {
                data: courseNames
            },
            yAxis: {},
            series: {
                type: 'bar',
                data: scores,
                barWidth:40,
                itemStyle: {
                    normal: {
                        color: function (params) {
                            return colors = '#e86d48'
                        }
                    },
                }
            }

        }
        CountryOfDiagnosis.setOption(option)
    })
})
