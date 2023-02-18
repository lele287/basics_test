window.onload = function() {
    var strHTML = "";
    $.ajax({
        url: "http://localhost:3000/userwant/getAllMes",
        type: "post",
        dataType: "json",
        success: function(req) {
            var length = req.data.length;
            var thisPhone;
            var thisSchool;
            var thisMes;
            for (let i = 0; i < length; i++) {
                var thisTime = req.data[i].wantTime.replace(/T/g, " ")
                if (req.data[i].wantPhone == null) {
                    thisPhone = req.data[i].uPhone;
                } else {
                    thisPhone = req.data[i].wantPhone
                }
                if (req.data[i].uSchool == null) {
                    thisSchool = '保密';
                } else {
                    thisSchool = req.data[i].uSchool
                }
                if (req.data[i].wantMes == null) {
                    thisMes = '';
                } else {
                    thisMes = req.data[i].wantMes;
                }
                strHTML += `
                <div class="wantLable">
                <div class="top_Message">
                    <span class="userName">${req.data[i].uName}</span>
                    <span class="userSchool">${thisSchool}</span>
                    <span class="setTime">发布于:${thisTime.substring(0,thisTime.length-2)}</span>
                </div>
    
                <div class="want_title"><span>${req.data[i].wantName}</span></div>
                <div class="want_Message">
                    <span class="detailed_information">${thisMes}</span
              >
              <span class="user_Phone">联系电话：${thisPhone}</span>
                </div>
            </div>
                `
            }
            $("#main").html(strHTML);
            console.log(req)
        }
    })
}