var allSchoolName = [
    [
        "哈尔滨医科大学",
        "黑龙江科技大学",
        "黑龙江大学",
        "哈尔滨工业大学",
        "哈尔滨理工大学",
        "哈尔滨工程大学",
        "东北农业大学",
        "东北林业大学",
        "其他",
    ],
    [
        "黑龙江八一农垦大学",
        "东北石油大学",
        "大庆师范学院",
        "大庆医学高等专科学校",
        "其他",
    ],
    [
        "大连理工大学",
        "沈阳工业大学",
        "沈阳航空航天大学",
        "沈阳理工大学",
        "东北大学",
        "辽宁科技大学",
        "辽宁工程技术大学",
        "辽宁石油化工大学",
        "其他",
    ],
    [
        "东北电力大学",
        "吉林化工学院",
        "北华大学",
        "吉林农业科技学院",
        "油吉林医药学院",
        "吉林电子信息职业技术学院",
        "其他",
    ],
    [
        "江苏科技大学",
        "江苏科技大学苏州理工学院",
        "常熟理工学院",
        "苏州工艺美术职业技术学院",
        "沙洲职业工学院",
        "其他",
    ],
    [
        "复旦大学",
        "同济大学",
        "华东理工大学",
        "上海理工大学",
        "东华大学",
        "上海电力大学",
        "华东师范大学",
        "华东政法大学",
        "其他",
    ],
    [
        "齐齐哈尔高等师范专科学校",
        "齐齐哈尔医学院",
        "黑龙江交通职业技术学院",
        "其他",
    ],
    ["牡丹江师范学院", "牡丹江大学", "黑龙江林业职业技术学院", "其他"],
    [
        "清华大学",
        "北京交通大学",
        "北京工业大学",
        "北京理工大学",
        "北京科技大学",
        "北京化工大学",
        "其他",
    ],
    ["其他"],
];
//头像更换
$(function() {
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

    var testName = JSON.parse(sessionStorage["users"]);
    testName = testName[0].Name;
    $("#table_userName").val(testName);
    $.ajax({
        url: "http://localhost:3000/users/getHead",
        type: "post",
        dataType: "json",
        data: {
            uName: testName,
        },
        success: function(res) {
            if (res.data[0].uHead != "images/tx.jpg") {
                var str = "../upload/";
                str += res.data[0].uHead;
                $("#table_head").attr("src", str);
            }
        },
    });

    cascadingList(); //下拉级联列表
    var inputFile = document.querySelector('[type="file"]');
    document.querySelectorAll("img")[0].onclick = function() {
        inputFile.click();
    };

    $(".upDate").click(function() {

        var uName = testName;
        var userPassword = $(".userPassword").val();
        var userPhone = $(".userPhone").val();
        var userSchool = document
            .querySelector(".schoolName")
            .querySelectorAll("option")[
                document.querySelector(".schoolName").selectedIndex
            ].innerHTML;
        console.log(userSchool);
        if (userPassword == "" || userPhone == "") {
            alert("请填写数据");
        } else if (!/^1[3456789]\d{9}$/.test(userPhone)) {
            alert("手机号码有误，请重填");
        } else {
            $.ajax({
                url: "http://localhost:3000/users/updateMes",
                type: "post",
                dataType: "json",
                data: {
                    uName: uName,
                    userPassword: userPassword,
                    userPhone: userPhone,
                    userSchool: userSchool,
                },
                success: function(res) {
                    console.log(res);
                },
            });
        }
        $("#headupload").trigger('click');
    });
});

function del(i) {
    var userName = $(".userName").val();
    var userPassword = $(".userPassowrd").val();
    var userNumber = $(".userNumber").val();
    var userSchool1 = $(".schoolName").val();
    var list = JSON.parse(localStorage.getItem("userInfos"));
    list.splice(i, 1);
    list.push({
        userName: userName,
        userPassword: userPassword,
        userSchool: userSchool1,
        userNumber: userNumber,
    });
    localStorage.setItem("userInfos", JSON.stringify(list));
}

function loadFile(inputFile) {
    var fileReader = new FileReader();
    var reg = /^image/gi;
    var flag = reg.test(inputFile.files[0].type);
    if (inputFile.files[0].size < Math.pow(1024, 2) && flag) {
        fileReader.onload = function(e) {
            document.querySelectorAll("img")[0].src = e.target.result;
        };
        fileReader.readAsDataURL(inputFile.files[0]);
    } else {
        alert("图片上传失败！");
    }
}

//将发布内容保存到本地
var cityWhere = document.querySelector(".cityWhere");
var schoolName = document.querySelector(".schoolName");

//下拉级联列表
function cascadingList() {
    var cityWhere = document.querySelector(".cityWhere"); //第一级下拉列表
    var schoolName = document.querySelector(".schoolName"); //第二级下拉列表
    cityWhere.onchange = function() {
        schoolName.options.length = 0;
        var index = this.selectedIndex;
        var theSchoolName = allSchoolName[index];
        var length = theSchoolName.length;
        for (var i = 0; i < length; i++) {
            var schoolNameOption = new Option(theSchoolName[i], theSchoolName[i]);
            schoolName.options.add(schoolNameOption);
        }
    };
}

function out() {
    sessionStorage.clear();
    if ($("#login").html() == "退出登录") {
        location.href = "index.html";
    } else {
        location.href = "login.html";
    }
}