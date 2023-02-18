// 登录
<template>
  <div class="login">
  <form action="" class="login-form">
        <h1>JiMei</h1>
        <div class="txtb">
            <input type="text" id="userName" required autocomplete="off" @focus="focus($event)" @blur="blur($event)" :class="isChange1?'focus':''" v-model="userName">
            <span data-placeholder="用户名"></span>
        </div>
        <div class="txtb">
            <input type="password" id="userPassword" required  @focus="focus($event)" @blur="blur($event)" :class="isChange2?'focus':''"  v-model="userPassword">
            <span data-placeholder="密码"></span>
        </div>
        <button @click.prevent="login" class="logbtn">登录</button>
        <div class="bottom-text">
            没有用户
            <a href="/register">去注册</a>
        </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data(){
    return{
      userName:'',
      userPassword:'',
      isChange1:false,
      isChange2:false,
    }
  },  
  methods:{
    login:function(){
      this.$axios.post("/api/users/login",{userName:this.userName,userPwd:this.userPassword})
      .then(res=>{
        // console.log('res:',res);
        localStorage.setItem('userToken',res.data.token)
        this.$store.state.user = {userName:this.userName}
        this.$router.replace('/')
        
      })
      .catch(err=>{
        console.log('err:',err); 
      })
    },
    focus:function(e){
        if(e.target.id=='userName'){
          if(this.userPassword==''){
            this.isChange2=false
          }
          this.isChange1=true;
        }else{
          this.isChange2=true;
        }
    },
    blur:function(e){
      if(this.userName==''){
        this.isChange1=false
      }
      if(this.userPassword==''){
        this.isChange2=false
      }
    }
  }
}
</script>
<style lang="css" scoped>
.login{
  width: 100%;
  height: 100vh;
  background: linear-gradient(120deg, rgb(72, 212, 166), greenyellow);
}
.login-form {
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

.login-form h1 {
    text-align: center;
    margin-bottom: 60px;
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
    margin-top: 50px;
}

.logbtn:hover {
    background-position: right;
}

.bottom-text {
    width: 100%;
    height: 40px;
    text-align: right;
    font-size: 17px;
    margin-top: 50px;
}

.bottom-text a {
    font-size: 17px;
    text-decoration: none;
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
</style>
