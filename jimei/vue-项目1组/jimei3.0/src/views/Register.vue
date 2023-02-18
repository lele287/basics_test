// 注册
<template>
  <div class="register">
        <form action="" class="register-form">
        <h1>JiMei</h1>
        <div class="txtb">
            <input type="text" v-model="userName" id="userName" required autocomplete="off" @focus="focus($event)" @blur="blur($event)" :class="isChange1?'focus':''">
            <span data-placeholder="用户名"></span>
        </div>
        <div class="txtb">
            <input type="password" v-model="userPassword" id="userPassword" required @focus="focus($event)" @blur="blur($event)" :class="isChange2?'focus':''">
            <span data-placeholder="密码"></span>
        </div>
        <div class="txtb">
            <input type="number" v-model="userNumber" id="userNumber" required autocomplete="off"  @focus="focus($event)" @blur="blur($event)" :class="isChange3?'focus':''">
            <span data-placeholder="手机号"></span>
        </div>
        <input type="button" value="获取验证码" @click="getValidCode" class="getValidCode">
        <div class="txtb">
            <input type="password" v-model="validCode" id="uservalidCode" required  @focus="focus($event)" @blur="blur($event)" :class="isChange4?'focus':''">
            <span data-placeholder="验证码"></span>
        </div>
        <input type="button" value="注册" @click.prevent="register" class="logbtn">
        <div class="bottom-text">
            点错了
          <a href="/login">去登录</a>
        </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data(){
    return{
      userName:'',
      userPassword:'',
      userNumber:'',
      validCode:'',
      gValidCode:'',
      isChange1:false,
      isChange2:false,
      isChange3:false,
      isChange4:false,
    }
  },
  methods:{
    getValidCode(){
      if(this.userNumber==''){
         this.$message({
          message: '手机号填一下吧',
          type: 'warning'
        });
      }else if(!(/^1[3456789]\d{9}$/.test(this.userNumber))){
        this.$message.error('手机号有误，请重填');
        return;
      }else{
        this.$axios.get('/api/users/getValidCode',{
          params:{
            mobile:this.userNumber
          }
        })
        .then((res)=>{
          if(res.data.code==200){
            this.gValidCode = res.data.data
          }else{
            this.$message('验证码发送错误，请重试');
          }
        })
        .catch((err)=>{
          console.log(err)
        })
      }
    },
    register:function(){
        if(this.userName == '' || this.userPassword == ''|| this.userNumber == '' || this.validCode == ''){
          this.$message({
            message: '这些都是必填的哟',
            type: 'warning'
         });
        }else{
          if(!(/^1[3456789]\d{9}$/.test(this.userNumber))){
            this.$message.error('手机号有误，请重填');
          }else if(this.gValidCode != this.validCode){
            this.$message.error('验证码错误');
          }else{
            this.$axios.post("/api/users/register",{
              userName:this.userName,
              userPwd:this.userPassword,
              userPhone:this.userNumber
            })
             .then((res)=>{
               if(res.data.data==1){
                 location.href="/login"
               }else if(res.data.data==-1){
                 this.$message({
                  message: '用户名重复',
                  type: 'warning'
                });
               }else{
                 this.$message({
                  message: '电话号码重复了',
                  type: 'warning'
                });
               }
             })
             .catch((err)=>{

             })
          }
        }
    },
    focus:function(e){
        if(e.target.id=='userName'){
          this.isChange1=true;
        }else if(e.target.id=='userPassword'){
          this.isChange2=true;
        }else if(e.target.id=='userNumber'){
          this.isChange3=true;
        }else{
          this.isChange4=true;
        }
    },
    blur:function(e){
      if(this.userName==''){
        this.isChange1=false
      }
      if(this.userPassword==''){
        this.isChange2=false
      }
      if(this.userNumber==''){
        this.isChange3=false
      }
      if(this.validCode==''){
        this.isChange4=false
      }
    }
  }
}
</script>
<style lang="css" scoped>
.register{
  width: 100%;
  height: 100vh;
  background: linear-gradient(120deg, rgb(72, 212, 166), greenyellow);
}
.register-form {
    width: 460px;
    box-sizing: border-box;
    background-color: rgba(225, 240, 220, 0.9);
    height: 580px;
    padding: 80px 40px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 5px 5px #ccc;
}

.register-form h1 {
    text-align: center;
    margin-bottom: 30px;
}

.txtb {
    border-bottom: 2px solid #ccc;
    position: relative;
    margin: 30px 0
}

.txtb input {
    font-size: 15px;
    color: #333;
    border: none;
    width: 100%;
    height: 40px;
    outline: none;
    background: transparent;
    padding: 0 5px;
}

.txtb span::before {
    content: attr(data-placeholder);
    position: absolute;
    top: 50%;
    left: 5px;
    color: rgb(50, 80, 60);
    transform: translateY(-50%);
    z-index: -1;
    transition: .5s;
}

.txtb span::after {
    content: '';
    position: absolute;
    width: 0%;
    height: 2px;
    left: 0;
    bottom: 0;
    background: linear-gradient(120deg, rgb(72, 212, 166), greenyellow);
    transition: .5s;
}

.focus+span::before {
    top: -5px;
    left: 10px;
}

.focus+span::after {
    width: 100%;
}

.logbtn {
    display: block;
    width: 100%;
    height: 50px;
    border: none;
    background: linear-gradient(120deg, rgb(72, 212, 166), greenyellow);
    background-size: 200%;
    color: #fff;
    outline: none;
    cursor: pointer;
    transition: .5s;
    margin-top: 30px;
}

.logbtn:hover,.getValidCode:hover {
    background-position: right;
}

.bottom-text {
    width: 100%;
    height: 40px;
    text-align: left;
    font-size: 17px;
    margin-top: 30px;
}

.bottom-text a {
    font-size: 17px;
}

.bottom-text a:link {
    color: #000;
}

.bottom-text a:visited {
    color: #000;
}

.bottom-text a:hover {
    color: rgb(38, 133, 101);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
.getValidCode{
    display: block;
    width: 20%;
    height: 35px;
    border: none;
    position: absolute;
    right: 50px;
    margin-top: -70px;
    background: linear-gradient(120deg, rgb(72, 212, 166), greenyellow);
    background-size: 200%;
    border-radius: 5px;
    border: 1px solid #eee;
    color: #333;
    outline: none;
    cursor: pointer;
    transition: .5s;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
