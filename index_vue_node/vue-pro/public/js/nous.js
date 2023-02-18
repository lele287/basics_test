const { ajax } = require("jquery");
 $(function(){
    $.ajax({
        url: 'http://localhost:3000/nousRouter/getNous',
        type: 'get',
        dataType: 'json',
        data: {
            key: '老人'
        },
        success: function (res) {
            results = res.data
            console.log(results);
            if (results.length > 0) {
                console.log(results);
                    
            } else {
                console.log('没有查询到数据');
            }
        }
    })
})
