<template>
  <div class="BackgroundImage">
    <div class="about">
      <div class="divs">
        <div class="div1">
          <router-link tag="h2" to="/login">欢迎回来</router-link>
          <el-input
            v-model="inputName"
            placeholder="请输入内容"
            @keyup.enter.native="submit"
          >
            <i slot="prefix" class="el-input__icon el-icon-s-custom"></i
          ></el-input>
          <el-input
            placeholder="请输入密码"
            v-model="inputPwd"
            show-password
            ref="mima"
            @keyup.enter.native="submitPwd"
            ><i slot="prefix" class="el-input__icon el-icon-lock"></i
          ></el-input>
          <el-checkbox v-model="checked" class="Remember">记住密码</el-checkbox>
          <el-row>
            <el-button type="success" @click="btnClick">登录</el-button>
          </el-row>
        </div>
        <div class="div2">
          <div class="gas"></div>
          <div class="con">
            <span id="reg">还未注册？</span>
            <p>立即注册，健康常在！</p>
            <router-link tag="span" to="/register" class="regs"
              >注册</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.BackgroundImage {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("../assets/timg.jpg");
  background-size: cover;
}
.divs {
  width: 530px;
  margin: 140px auto;
}
.div1 {
  float: left;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  background-color: #fff;
  padding: 40px 40px;
  text-align: center;
  position: relative;
}
.div2 {
  background-image: url(../assets/timg.png);
  float: right;
  width: 120px;
  height: 250px;
  background-color: #aaa;
  margin: 0 auto;
  padding: 40px 40px;
  text-align: center;
}
.gas {
  margin-left: -40px;
  margin-top: -40px;
  width: 200px;
  height: 330px;
  opacity: 0.5;
  background-color: rgb(99, 98, 98);
}
.con {
  position: relative;
  top: -290px;
}
#reg {
  color: #fff;
  font-size: 20px;
}
.regs {
  display: inline-block;
  width: 70px;
  height: 30px;
  padding-left: 10px;
  letter-spacing: 10px;
  line-height: 30px;
  border-radius: 15px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #fff;
  margin-top: 120px;
}
.regs:hover {
  cursor: pointer;
}
.div2 p {
  font-size: 12px;
  color: #fff;
}
h2 {
  text-align: center;
  color: rgb(78, 78, 78);
  display: inline-block;
  cursor: pointer;
  margin-top: 0px;
}
.el-input >>> .el-input__inner:focus {
  border: 1px solid #0dc572;
}
.about >>> .el-input__inner {
  width: 230px;
  margin: 5px;
}
.el-input--prefix >>> .el-input__icon {
  height: 40px;
  line-height: 40px;
  margin: 5px;
}
.el-button--success {
  width: 230px;
  background-color: #0dc572;
  color: #fff;
  float: right;
  margin-right: 11px;
  margin-top: 30px;
}
.is-checked,
.el-checkbox {
  position: absolute;
  left: 50px;
  top: 195px;
}
.is-checked >>> .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #0dc572;
  border-color: #0dc572;
}
.is-checked >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #0dc572;
}
.el-checkbox >>> .el-checkbox__input span {
  border: 1px solid #0dc572;
}
.el-checkbox >>> .el-checkbox__label {
  color: #0dc572;
}
.el-input >>> .el-input__suffix {
  margin-right: 20px;
  line-height: 20px;
}
el-button--success {
  background-color: #0dc572;
}
.el-button--success,
.el-button--success:focus,
.el-button--success.is-active,
.el-button--success:active {
  background: #0dc572;
  border: 1px solid rgb(255, 255, 255);
}
.el-button--warning,
.el-button--warning:focus,
.el-button--warning.is-active,
.el-button--warning:active {
  background: #0dc572;
}
.el-button--success:hover {
  background: #25e48e;
  border-color: #25e48e;
  color: #fff;
}
.el-button--warning:hover {
  background: #25e48e;
  border-color: #25e48e;
  color: #fff;
}
.el-button--success {
  margin-top: 35px;
}
.Remember {
  margin: 5px 0;
}
</style>
<script>
export default {
  data() {
    return {
      inputName: "",
      inputPwd: "",
      checked: false,
      orginUrl: "",
    };
  },
  methods: {
    btnClick() {
      if (this.inputName.trim() && this.inputPwd.trim()) {
        this.$axios
          .post("/api/users/login", {
            userName: this.inputName,
            userPwd: this.inputPwd,
          })
          .then((res) => {
            console.log(res.data.message);
            if (res.data.message == "登录成功！") {
              if(this.orginUrl==undefined){
                 this.$router.push({ path: '/' });
              }
              else{
                this.$router.push({ path: this.orginUrl });
              }
              
              localStorage.setItem("userName", this.inputName);
              //1.保存Token本地存储中
              // console.log(res.data.data);
              localStorage.setItem("MyToken", res.data.data);
              // console.log("res:", res);
              if (this.checked) {
                localStorage.setItem(
                  "Remember",
                  JSON.stringify({ Name: this.inputName, Pwd: this.inputPwd })
                );
              } else {
                localStorage.removeItem("Remember");
              }
            } else {
              this.$message.error("登录失败");
            }
          })
          .catch((err) => {
            console.log("err:", err);
            this.$message.error("登录失败");
          });
        //1.保存Token本地存储中
        // localStorage.setItem("MyToken", res.data.data);
      } else {
        this.$message.error("请输入账号密码");
      }
    },
    submit() {
      this.$refs.mima.focus();
    },
    submitPwd() {
      this.btnClick();
    },
  },
  created() {
    this.orginUrl = this.$route.query.orginUrl;
    console.log(this.orginUrl);
  },

  beforeMount() {
    if (localStorage.getItem("Remember")) {
      this.inputName = JSON.parse(localStorage.getItem("Remember")).Name;
      this.inputPwd = JSON.parse(localStorage.getItem("Remember")).Pwd;
      this.checked = true;
    }
  },
};
</script>
