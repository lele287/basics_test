<template>
  <div class="data">
    <div class="artion_zl">
      <h2 class="grzl">个人资料</h2>
      <div class="xian"></div>
      <form
        action="/api/users/Profile"
        method="POST"
        enctype="multipart/form-data"
      >
        <table class="personal">
          <tr class="trSculpture">
            <td>
              <img :src="imgsrc" alt="" @click="tou" />
              <input
                type="file"
                name="portrait"
                ref="fil"
                id=""
                @change="selFile"
              />
            </td>
            <td>当前头像</td>
          </tr>
          <tr>
            <td>昵称：</td>
            <td>
              <el-input
                class="nic"
                v-model="inputName"
                placeholder="请输入您的昵称"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>健康号：</td>
            <td class="HealthNumber" v-html="Health">163506090701</td>
          </tr>
          <tr>
            <td>性别：</td>
            <td>
              <template>
                <el-radio v-model="radio" label="男">男</el-radio>
                <el-radio v-model="radio" label="女">女</el-radio>
              </template>
            </td>
          </tr>
          <tr>
            <td>体征：</td>
            <td class="td_text">
              <div class="d_text">
                <span>身高：</span>
                <el-input
                  v-model="inputHigh"
                  placeholder="0"
                  style="display: inline"
                ></el-input>
                <span>cm</span>
              </div>
              <div class="d_text">
                <span>体重：</span>
                <el-input
                  v-model="inputWeight"
                  placeholder="0"
                  style="display: inline"
                ></el-input>
                <span>kg</span>
              </div>
              <div class="d_text">
                <span>年龄:</span>
                <el-input
                  v-model="inputAge"
                  placeholder="0"
                  style="display: inline"
                ></el-input>
                <span>岁</span>
              </div>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input
                type="hidden"
                name="userName"
                value=""
                class="hidden"
                v-model="userName"
              />
              <!-- <input type="submit" value="保存" class="btn_bc1" /> -->
              <el-button type="success" @click.prevent="uploadPic"
                >保存</el-button
              >
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios"; //局部引用
export default {
  data() {
    return {
      inputName: "",
      radio: "男",
      inputHigh: "",
      inputWeight: "",
      inputAge: "",
      userName: "",
      file: null,
      imgsrc: require("../assets/touxiang.jpg"), //将图片作为模块加载进去
      Health: "20200001",
    };
  },
  name: "App",
  methods: {
    tou() {
      // document.querySelector('#aa').click()
      this.$refs["fil"].click();
    },
    selFile($event) {
      this.file = $event.target.files[0];
      let paramsData = new FormData();
      paramsData.append("portrait", this.file); //添加文件表单元素
      this.$axios
        .post("/api/users/Profile", paramsData)
        .then((res) => {
          this.imgsrc = "http://localhost:3000/upload/" + res.data.data[0];
          console.log("res:", res.data.data);
          console.log(this.imgsrc);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    open2() {
      this.$message({
        message: "恭喜你，保存个人资料成功",
        type: "success",
      });
    },
    open4() {
      this.$message.error("错了哦，保存个人资料失败");
    },
    uploadPic() {
      this.userName = localStorage.getItem("userName");
      let paramsData = new FormData();
      paramsData.append("Nickname", this.inputName);
      paramsData.append("men", this.radio);
      paramsData.append("height", this.inputHigh);
      paramsData.append("weight", this.inputWeight);
      paramsData.append("Age", this.inputAge);
      paramsData.append("userName", this.userName);
      if (!this.file) {
        paramsData.append("portrait", this.imgsrc);
      } else {
        paramsData.append("portrait", this.file); //添加文件表单元素
      }
      this.$axios
        .post("/api/users/Profile", paramsData)
        .then((res) => {
          // this.imgsrc = 'http://localhost:3000/upload/'+res.data.data[0]
          console.log("res:", res);
          this.open2();
        })
        .catch((err) => {
          console.log("err:", err);
          this.open4();
        });
    },
  },
  beforeCreate() {
    this.userName = localStorage.getItem("userName");
    this.$axios
      .post("/api/users/personalData", { userName: this.userName })
      .then((res) => {
        console.log("res:", res.data.data[0]);
        var data = res.data.data[0];
        if (data.Nickname !== 'null'&& data.Nickname) {
          this.inputName = data.Nickname;
        }
        if (data.userSex !== 'null'&& data.userSex) {
          this.radio = data.userSex;
        }
        if (data.userHigh !== 'null'&& data.userHigh) {
          this.inputHigh = data.userHigh;
        }
        if (data.userWeight !== 'null'&& data.userWeight) {
          this.inputWeight = data.userWeight;
        }
        if (data.userAge !== 'null'&& data.userAge) {
          this.inputAge = data.userAge;
        }
        this.Health = data.userHealthyId;
        if (data.userPhoto !== 'null'&& data.userPhoto) {
           this.imgsrc = "http://localhost:3000/upload/" + data.userPhoto;
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
};
</script>
<style lang="css" scoped>
.data {
  background-color: #fff;
  padding: 10px 50px;
  margin-top: 20px;
}
.trSculpture img {
  width: 60px;
  height: 60px;
}
.trSculpture input {
  display: none;
}
.el-input >>> .el-input__inner {
  width: 70px;
  height: 30px;
}
.nic >>> .el-input__inner {
  width: 200px;
  height: 30px;
}
.el-input__inner {
  vertical-align: top;
}
.d_text {
  display: inline-block;
  margin-right: 50px;
}
.personal {
  margin-left: 15px;
}
.personal >>> tr {
  height: 50px;
  line-height: 50px;
}
.el-input >>> .el-input__inner:focus {
  border: 1px solid #0dc572;
}
.el-button--success {
  background-color: #0dc572;
  border: 1px solid #0dc572;
}
.el-button--success,
.el-button--success:focus,
.el-button--success.is-active,
.el-button--success:active {
  background: #0dc572;
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
.is-checked >>> .el-radio__input.is-checked + .el-radio__label {
  color: #0dc572;
}
.is-checked >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: #0dc572;
  background: #0dc572;
}
</style>