<template>
  <div class="">
    <div class="registrationImg"></div>
    <div class="content">
      <div class="curr animate__animated animate__backInRight MotText">
        <p class="curriculum">在线报名</p>
        <img
          src="https://11092584.s61i.faiusr.com/4/AD0I6ISlBRAEGAAgm8TYvgUouajSMDDCAzgy.png.webp"
          alt=""
        />
        <p class="Satisfaction">以学员满意度、以学员学习效果为本</p>
      </div>
      <div class="signUp">
        <div class="signUpImg">
          <img
            src="https://2.ss.faisys.com/image/materialLib/illustration/000108.jpg?v=201712181730"
            alt=""
          />
        </div>
        <div class="FillForm">
          <div class="FillFormText">
            <p>填表说明：</p>
            <p>1.后面添加“*”为必填内容，请填写完整</p>
            <p>2.招生办将在收到报名表2日内与您联系确认入学时间</p>
          </div>
          <div>
            <p>学生姓名</p>
            <el-input v-model="FullName" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <p>手机号码</p>
            <el-input v-model="phoneNumber" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <p>出生日期</p>
            <div class="block">
              <el-date-picker
                v-model="dateOfBirth"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div>
              <p>家庭地址</p>
            <el-cascader
              size="large"
              :options="options"
              v-model="selectedOptions"
              @change="handleChange"
            >
            </el-cascader>
          </div>
          <el-button
            type="danger"
            class="advantageContentButton"
            >提交</el-button
          >
        </div>
      </div>
    </div>
    <Tail></Tail>
  </div>
</template>

<script>
import Navigation from "../components/Navigation";
import Tail from "../components/Tail";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      FullName: "",
      phoneNumber: "",
      dateOfBirth: "",
      options: regionData,
      selectedOptions: [],
    };
  },
  components: {
    Navigation,
    Tail,
  },
  // this.$router.push({ path: '/College' });
  methods: {
    handleChange(value) {
      console.log(value);
    },
  },
};
</script>

<style land="sass" scoped>
.content {
  width: 1190px;
  margin: 0 auto;
}
.curr > img {
  display: block;
  margin: 0 auto;
}
.curriculum {
  font-size: 50px;
  color: #353535;
  text-align: center;
}
.Satisfaction {
  font-size: 18px;
  color: #777777;
  text-align: center;
}
.registrationImg {
  width: 100%;
  height: 380px;
  cursor: default;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  overflow: hidden;
  display: block;
  outline: none;
  margin: 0px auto;
  position: relative;
  z-index: 1;
  background-size: cover;
  background-image: url("https://11092584.s61i.faiusr.com/2/AD0I6ISlBRACGAAgmMTYvgUopLeOiQIwgA84-AI.jpg");
}
.signUp {
  display: flex;
}
.FillForm{
    margin-left: 100px;
    font-size: 14px;
}
.FillFormText{
    font-size: 12px;
    margin-bottom: 20px;
}
.signUpImg{
    margin-top: 110px;
}
.advantageContentButton {
  width: 200px;
  background-color: #ca0000;
  border-color: #ca0000;
  margin-top: 20px;
}
</style>
