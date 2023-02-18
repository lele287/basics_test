<template>
  <div class="BackgroundImage">
    <div class="about">
      <router-link tag="h2" to="/register">用户注册</router-link>
      <p class="TextPrompt">{{ prompt }}</p>
      <el-input v-model="inputName" @blur="only" placeholder="请输入用户名">
        <i slot="prefix" class="el-input__icon el-icon-s-custom"></i
      ></el-input>
      <el-input placeholder="请输入密码" v-model="inputPwd1" show-password
        ><i slot="prefix" class="el-input__icon el-icon-lock"></i
      ></el-input>
      <el-input placeholder="请确认密码" v-model="inputPwd2" show-password
        ><i slot="prefix" class="el-input__icon el-icon-lock"></i
      ></el-input>
      <el-row>
        <el-button type="success" @click="btnRes">注册</el-button>
        <br /><br />
      </el-row>
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
.about {
  width: 320px;
  margin: 120px auto;
  background-color: #fff;
  padding: 40px 40px;
  border: 1px solid #fff;
  text-align: center;
  position: relative;
}
h2 {
  text-align: center;
  color: rgb(78, 78, 78);
  display: inline-block;
  cursor: pointer;
  margin-top: 0;
}
.el-input >>> .el-input__inner:focus {
  border: 1px solid #0dc572;
}
.about >>> .el-input__inner {
  width: 300px;
  margin: 5px;
}
.el-input--prefix >>> .el-input__icon {
  height: 40px;
  line-height: 40px;
  margin: 5px;
}
.el-button--success {
  width: 300px;
  background-color: #0dc572;
  color: #fff;
  float: right;
  margin-right: 10px;
  margin-top: 30px;
}
.is-checked,
.el-checkbox {
  position: absolute;
  left: 50px;
  top: 245px;
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
.TextPrompt {
  color: #f00;
  font-size: 12px;
  /* font-weight: 700; */
  position: absolute;
  top: 65px;
  left: 60px;
}
</style>
<script>
export default {
  data() {
    return {
      inputName: "",
      inputPwd1: "",
      inputPwd2: "",
      checked: true,
      tips: "错误提示",
      prompt: "",
      switch: false,
    };
  },
  mounted() {
    const urlPah = require("../assets/timg.jpg");
  },
  methods: {
    open3() {
      this.$message({
        message: this.tips,
        type: "warning",
      });
    },
    btnRes() {
      if (this.inputName.trim() && this.inputPwd1.trim()) {
        if (this.inputPwd1 == this.inputPwd2) {
          if (this.switch == false) {
            this.$message.error("用户名重复请重新输入");
          } else {
            this.$axios
              .post("/api/users/addUser", {
                userName: this.inputName,
                userPwd: this.inputPwd1,
              })
              .then((res) => {
                this.$router.push({ path: "/login" });
                console.log("res:", res);
              })
              .catch((err) => {
                console.log("err:", err);
                this.$message.error("注册失败");
              });
          }
        } else {
          this.$message.error("您填写的密码不一致");
        }
      } else {
        this.tips = "请填写账户密码";
        this.open3();
      }
    },
    only() {
      if (this.inputName.trim()) {
        this.$axios
          .get("/api/users/checkName", { params: { userName: this.inputName } })
          .then((res) => {
            console.log("res:", res);
            console.log(res.data.message);
            if (res.data.message == "用户名重复") {
              this.prompt = "用户名重复，请重新输入！";
              this.switch = false;
            } else {
              this.prompt = "";
              this.switch = true;
            }
          })
          .catch((err) => {
            console.log("err:", err);
          });
      }
    },
  },
};
</script>