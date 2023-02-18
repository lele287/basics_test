<template>
<div class="AvatarData">
       <div class="self" v-for="(item,index) in userInfo" :key="index">
                <div id="bodyRight">
                    <img src="../assets/images/tx.jpg" alt="">
                    <span class="userName">{{item.uName}}</span>
                </div>
                <div class="message">
                    <img src="../assets/images/yhID.png" alt=""><span class="yhId">用户编号: {{item.uId}}</span><br>
                    <div class="addressTitle"><img src="../assets/images/dzh.png" alt=""> 收货地址：</div>
                </div>            
        <div class="address">
             <div class="consignee-scroll">
                     <div v-if="have"  class="emtpy">
                        <span>您还没有添加默认收货地址哦</span>
                     </div>
                 <div v-else>
                        <el-dropdown :placement="placement" :trigger="trigger">
                            <span class="el-dropdown-link">
                                 <ul>
                                    <li>
                                       <span class="addr-name">{{defaultAddress.recName}}</span>
                                       <span class="addr-info">{{defaultAddress.recAddress}}</span>
                                       <span class="addr-tel" v-if="defaultAddress.recPhone">{{defaultAddress.recPhone}}</span>
                                       <span class="addr-tel" v-else>{{userPhone}}</span>
                                       <span class="addr-default">默认地址</span>
                                       <i class="el-icon-arrow-down el-icon--right"></i>
                                    </li>
                                 </ul>
                            </span>
                             <el-dropdown-menu slot="dropdown">
                                <ul>
                                    <el-dropdown-item v-for="(item , index) in addrMes" :key="index" class="toleft">
                                        <li @click="changeRec(index)">
                                            <span class="addr-id" style="display:none" ref="here">{{item.recId}}</span>
                                            <span class="addr-name">{{item.recName}}</span>
                                            <span class="addr-info">{{item.recAddress}}</span>
                                            <span class="addr-tel" v-if="item.recPhone">{{item.recPhone}}</span>
                                            <span class="addr-tel" v-else>{{userPhone}}</span>
                                        </li>
                                    </el-dropdown-item>
                                </ul>
                            </el-dropdown-menu>
                        </el-dropdown>
                 </div>
             </div>
        </div>
             <div class="revise">
                <el-collapse v-model="activeNames" @change="handleChange">
                     <el-collapse-item title="修改个人资料" name="revise">
                         <form action="*" method="POST" enctype="multipart/form-data" target="iframe_display">
                             <table>
                             <tbody>
                                 <b class="bStyle">亲爱的用户，填写真实的资料，有助于好友找到你哦。</b>
                                 <tr class="fir">
                                        <td>当前头像:</td>
                                        <td class="file">
                                        <input type="file" name="userHead" onchange="loadFile(this)">
                                         <div class="upload">
                                            <el-upload
                                                class="avatar-uploader"
                                                action="https://jsonplaceholder.typicode.com/posts/"
                                                :show-file-list="false"
                                                :on-success="handleAvatarSuccess"
                                                :before-upload="beforeAvatarUpload">
                                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                            </el-upload>                          
                                         </div> 
                                        </td>
                                 </tr>
                                 <tr style="display: none;">
                                        <td>用户名：</td>
                                        <td><input type="text" name="userName" id="table_userName"></td>
                                 </tr>
                                <tr>
                                        <td>修改密码:</td>
                                        <td><el-input type="password"  v-model="newUserPassword" placeholder="请输入密码" class="elinput"></el-input></td>
                                </tr>
                                <tr>
                                        <td>手机号:</td>
                                        <td><el-input   v-model="newuserPhone" placeholder="请输入电话号码" class="elinput"></el-input></td>
                                </tr>
                                <tr>
                                        <td>*校园:</td>
                                        <td>
                                            <div class="block">
                                                 <el-cascader
                                                 :options="options"
                                                 v-model="selectedOptions"
                                                 @change="handleChange"  class="elinput">
                                                 </el-cascader>
                                            </div>
                                        </td>
                                </tr>
                            </tbody>
                            </table>
                                                <el-button class="upDate" @click="saveMsg()">保存</el-button>
                                                <input type="submit" value="上传头像隐藏按钮" id="headupload" style="display: none;">
                         </form>
                     <iframe id="iframe_display" name="iframe_display" style="display: none;"></iframe>
                    </el-collapse-item>
             </el-collapse>
            </div>    
            <div class="calendar">
                 <el-calendar v-model="value"></el-calendar>
            </div>
        </div>
</div>
</template>
<script>
  export default {
       inject:['reload'],
    data() {
      return {
        activeNames: ['1'],
        value: new Date(),
        imageUrl: '',
        newUserPassword:'',
        newuserPhone:'',
        defaultAddress:[],
        userPhone:"",
        addrMes:[],
        userInfo:[],
        have:true,
        placement:"bottom",
        trigger:"click",
        options:[{
                value: 'Harbin',
                label:'哈尔滨',
                children:[{
                    value: 'HarbinShiFan',
                    label:'哈尔滨师范学院'
                },{
                    value: 'Dongbeinongye',
                    label:'东北农业大学'
                },{
                    value: 'Dongbeilinye',
                    label:'东北林业大学'
                },{
                    value: 'Harbingongcheng',
                    label:'哈尔滨工程大学'
                },{
                    value: 'Harbinligong',
                    label:'哈尔滨理工大学'
                },{
                    value: 'Harbingongye',
                    label:'哈尔滨工业大学'
                },{
                    value: 'Heilongjiang',
                    label:'黑龙江大学'
                },{
                    value: 'Heilongjiangkeji',
                    label:'黑龙江科技大学'
                },{
                    value: 'Harbinyike',
                    label:'哈尔滨医科大学'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Daqing',
                label:'大庆',
                children:[{
                    value: 'Bayinongken',
                    label:'黑龙江八一农垦大学'
                },{
                    value: 'Dongbeishiyou',
                    label:'东北石油大学'
                },{
                    value: 'Daqingshifan',
                    label:'大庆师范学院'
                },{
                    value: 'Daqingyike',
                    label:'大庆医学高等专科学校'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Liaoning',
                label:'辽宁',
                children:[{
                    value: 'Dalianligong',
                    label:'大连理工大学'
                },{
                    value: 'Shenyanggongye',
                    label:'沈阳工业大学'
                },{
                    value: 'Shenyanghangkong',
                    label:'沈阳航空航天大学'
                },{
                    value: 'Liaoningligong',
                    label:'沈阳理工大学'
                },{
                    value: 'Dongbeidaxue',
                    label:'东北大学'
                },{
                    value: 'Liaoningkeji',
                    label:'辽宁科技大学'
                },{
                    value: 'Liaoninggongchengkeji',
                    label:'辽宁工程技术大学'
                },{
                    value: 'Liaoningshiyouhuagong',
                    label:'辽宁石油化工大学'
                },{
                    value: 'Liaoningdaxue',
                    label:'辽宁大学'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Jilin',
                label:'吉林',
                children:[{
                    value: 'Dongbeidianli',
                    label:'东北电力大学'
                },{
                    value: 'Jilindaxue',
                    label:'吉林大学'
                },{
                    value: 'Jilinhuagong',
                    label:'吉林化工学院'
                },{
                    value: 'Beihua',
                    label:'北华大学'
                },{
                    value: 'Jilinnongyekeji',
                    label:'吉林农业科技学院'
                },{
                    value: 'Jilinyiyao',
                    label:'吉林医药学院'
                },{
                    value: 'Jilindianzixinxizhiye',
                    label:'吉林电子信息职业技术学院'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Suzhou',
                label:'苏州',
                children:[{
                    value: 'Jiangsukeji',
                    label:'江苏科技大学'
                },{
                    value: 'Suzhoukeji',
                    label:'苏州科技大学'
                },{
                    value: 'Jiangsukejidaxuesuzhouligong',
                    label:'江苏科技大学苏州理工学院'
                },{
                    value: 'Changshu',
                    label:'常熟理工学院'
                },{
                    value: 'Suzhougongyimeishu',
                    label:'苏州工艺美术职业技术学院'
                },{
                    value: 'Shazhouzhiye',
                    label:'沙洲职业工学院'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Shanghai',
                label:'上海',
                children:[{
                    value: 'Fudan',
                    label:'复旦大学'
                },{
                    value: 'Shanghaijiaotong',
                    label:'上海交通大学'
                },{
                    value: 'Tongji',
                    label:'同济大学'
                },{
                    value: 'Huadong',
                    label:'华东理工大学'
                },{
                    value: 'Shanghailigong',
                    label:'上海理工大学'
                },{
                    value: 'Donghua',
                    label:'东华大学'
                },{
                    value: 'Shanghaidianli',
                    label:'上海电力大学'
                },{
                    value: 'Huadongshifan',
                    label:'华东师范大学'
                },{
                    value: 'Huadongzhengfa',
                    label:'华东政法大学'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Qiqihair',
                label:'齐齐哈尔',
                children:[{
                    value: 'Qiqihairdaxue',
                    label:'齐齐哈尔大学'
                },{
                    value: 'Qiqihairgaodengshifan',
                    label:'齐齐哈尔高等师范专科学校'
                },{
                    value: 'Qiqihairyixueyuan',
                    label:'齐齐哈尔医学院'
                },{
                    value: 'Qiqihairjiaotongzhiyejishu',
                    label:'黑龙江交通职业技术学院'
                },{
                    value: 'Qita',
                    label:'其他'
                }]
            },{
                value: 'Mudanjiang',
                label:'牡丹江',
                children:[{
                    value: 'Mudanjiangshifan',
                   label:'牡丹江师范学院' 
                },{
                    value: 'Mudanjiangyixueyuan',
                    label:'牡丹江医学院'
                },{
                    value: 'Mudanjiangdaxue',
                   label:'牡丹江大学'
                },{
                    value: 'Heilongjianglinyezhiyejishu',
                   label:'黑龙江林业职业技术学院'
                },{
                    value: 'Qita',
                   label:'其他'
                }]
            },{
                value: 'Beijing',
                label:'北京',
                children:[{
                   value: 'Qinghua',
                   label:'清华大学'
                },{
                    value: 'Beijingdaxue',
                    label:'北京大学'
                },{
                    value: 'Beijingjiaotong',
                    label:'北京交通大学'
                },{
                    value: 'Beijinggongye',
                  label:'北京工业大学'
                },{
                    value: 'Beijingligong',
                  label:'北京理工大学'
                },{
                    value: 'Beijingkeji',
                  label:'北京科技大学'
                },{
                    value: 'Beijinghuagong',
                  label:'北京化工大学'
                },{
                    value: 'Qita',
                  label:'其他'
                }]
            },{
                value: 'QiTa',
                label:'其他'
            }],
        selectedOptions:[]
      };
    },
    methods: {
           showAddr(uName){
      this.addrMes = [];
      this.userPhone="";
      this.$axios.all([
        this.$axios.get("/api/userRec/getMyRec",{params:{userName:uName}}),
        this.$axios.post("/api/users/getPhone",{uName:uName})
      ])
      .then(this.$axios.spread((userAddrRes,userPhoneRes)=>{
        for(let i = 0 ; i < userAddrRes.data.data.length ;i++){
          this.addrMes.push(userAddrRes.data.data[i])
        };
        this.userPhone = userPhoneRes.data.data[0].uPhone;
      }))
      .catch((err)=>{
        console.log("err",err)
      })
    },
           getAddr(uName){
      this.have=false
      this.defaultAddress = [];
      this.userPhone="";
      this.$axios.all([
        this.$axios.post("/api/userRec/getUserRec",{userName:uName}),
        this.$axios.post("/api/users/getPhone",{uName:uName})
      ])
      .then(this.$axios.spread((userAddrRes,userPhoneRes)=>{
        this.defaultAddress=(JSON.parse(JSON.stringify(userAddrRes.data.data[0])))
        this.userPhone = userPhoneRes.data.data[0].uPhone;
      }))
      .catch((err)=>{
        console.log("err",err)
      })
    },
           changeRec(index){
             console.log("index",index)
             console.log("recId",this.$refs.here[index].innerHTML)
      this.$axios.post("/api/users/changeRec",{recId:this.$refs.here[index].innerHTML,userName:this.$store.state.user.userName})
      .then((res)=>{
        this.getAddr(this.$store.state.user.userName)
      })
      .catch((err)=>{
        console.log("err",err)
      })
    },
           handleChange(value){
            console.log(value);
        },
           handleChange(val) {
        console.log(val);
      },
           handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
           beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
           saveMsg(){
          if(this.newUserPassword==""||this.newUserPassword ==""){
              alert('格式错误，请重新输入')
          }else{
              this.$axios
              .post("/api/users/updateMes",{uName:this.$store.state.user.userName,userPassword:this.newUserPassword,userPhone:this.newuserPhone})
                  console.log(this.newuserPhone,this.newUserPassword);
          }
          this.reload();
      },
           getUserMes(){
          this.$axios
          .post("/api/users/getMes",{uName:this.$store.state.user.userName})
          .then((res)=>{
              this.userInfo=res.data.data
            //   if(user[0].userHead !=null){
            //       let str = "../assets/images/";
            //       str +=user[0].userHead;
            //       $('#bodyRight img').attr("src",str)
            //   }
              console.log('个人基本信息：',this.userInfo);
          })    
          .catch((err)=>{
              console.log(err);
          })
      }
    },
    mounted(){
        this.getUserMes()
        this.getAddr(this.$store.state.user.userName)
        this.showAddr(this.$store.state.user.userName)
    }
  }
</script>

<style lang="scss" scoped>

  .el-dropdown-link {
    cursor: pointer;
    ul{
        list-style: none;
    }
  }

  .el-dropdown-link ul{
      list-style: none;

  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
         :hover{
             border-color: #409EFF;
    }
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
/deep/.el-collapse-item__header,.el-collapse-item__header.active{
    padding-left:20px
}
  .addnew a{
    text-decoration: none;
    color: #606266;
}
 .addnew:hover a{
    color: #409EFF;
}
 .el-collapse-item__header{
    padding: 0 20PX;
}
.calendar{
    width: 340px;
    height:100px;
    margin-left: 900px;
    position: absolute;
    left: -250px;
    top: 0;
}
/deep/.calendar .el-calendar-table .el-calendar-day{
    height: 30px !important;
}
.calendar-day {
  text-align: center;
  color: #202535;
  height: 50px !important;
  line-height: 30px;
  font-size: 12px;
}
.bStyle{
    padding-left: 20px;
}
.self {
    float: left;
    width: 580px;
    margin-left: 20px;
    background-color: #fff;
    padding: 20px 30px;
    position: relative;
    height: 400px;
    #bodyRight {
        img {
            width: 130px;
            height: 130px;
            border: 1px solid #ccc;
            border-radius: 50%;
        }
        span {
            font-size: 24px;
        } 
        input {
            display: none;
        }
    }
}

.userName{
    position: absolute;
    top: 45px;
    margin-left:52px;
}
.address {
    width: 500px;
    margin: 0 auto;
    span{
    width: auto;
    height: auto;
    }
    li{
        overflow: hidden;
         margin-bottom: 20px;
        div{
         float: left;
         font-size: 16px;
    }
            .rname{
                 width: 60px;
                 text-align: center;
    }
            .rphone{
                 width: 110px;
    }
            .raddress{
                 width: 290px;
    }
}
}
.addAddress{
    margin-left: 5px;
    a{
         text-decoration: none;
         margin-left: 0px;
    }
}
.revise{
  position: absolute;
  top: 445px;
  left: 0;
  width: 640px;
}
.fir{
  display: inline-block;
  width: 300px;
}
.message {
    position: absolute;
    top: 90px;
    left: 160px;
    img{
    width: 30px;
    height: 30px;
    margin-left: 20px;
    padding-top: 5px;
    }
}

table{
    width: 540px;
    margin: 0px auto;
    tr td:nth-child(1){
            padding: 0 20px;
    }
}
input {
    width: 400px;
    height: 25px;
    border: 1px solid #ccc;
    border-radius: 2px;
    margin-left:-365px;
}
input[type='file'] {
    display: none;
}
.elinput{
    width: 440px;
    margin-left: -300px;;
}
.upDate{
  margin: 20px 0 0 148px;
}
.upload {
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    background-color: #FCFCFC;
    img{
         margin: 30px;
         width: 100px;
         height: 100px;
         margin-top: 0px;
         margin-left: 0px;
    }
}
.yhId{
    position: absolute;
    width: 560px;
    margin-left: 5px;
    top: 10px;
}
.consignee-scroll ul ,.emtpy{
    margin-top: 20px;
    margin-bottom:20px ;
  width: 650px;
}
.consignee-scroll li ,.emtpy{
  height: 30px;
  line-height: 30px;
  width: 99.8%;
}
.consignee-scroll li span ,.toleft li span{
  display: inline-block;
  margin-left: 10px;
}
.consignee-scroll .addr-default {
  margin: 5px 10px;
  background-color: #999;
  color: white;
  padding: 0 3px;
  line-height: 20px;
}
</style>