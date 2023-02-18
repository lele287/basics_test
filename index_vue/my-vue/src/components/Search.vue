<template>
  <div class="search">
    <div class="article">
      <el-input
        placeholder="请输入内容"
        v-model="input1"
        @keyup.enter.native="submit"
      >
      </el-input>
      <el-button
        type="success"
        class="products"
        icon="el-icon-search"
        @click="products"
        >搜索</el-button
      >
    </div>

    <div class="shopping" @click="shopping">
      <el-image :src="sImg" class="sImg"></el-image>
      <span>购物车</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      input1: "",
      sImg: require("../assets/gwc.png"),
      nowUrl: "",
    };
  },
  methods: {
    products() {
      if (this.input1.trim()) {
        this.$router.push("/drugs?searchs=" + this.input1);
      }
    },
    submit() {
      this.products();
    },
    shopping() {
      if (!localStorage.getItem("MyToken")) {
        this.$message({
          message: "登录信息已过期，请先登录！",
          type: "warning",
        });
        this.nowUrl = this.$route.path;
      this.$router.push({ path: "/login?orginUrl=" + this.nowUrl });
      } else {
        this.$router.push("/shopping");
      }
    },
  },
};
</script>

<style lang="css" scoped>
.el-input /deep/ .el-input__inner {
  border: 1px solid #0dc572;
  border-radius: 0px;
}
.el-button--success {
  border: 0px;
  border-radius: 0px;
}
.el-input /deep/ .el-button {
  border: 0px;
}
.article {
  height: 100px;
}
.search >>> input {
  width: 350px;
  height: 40px;
  position: absolute;
  left: 231px;
}
.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 0px;
  width: 600px;
  right: 261px;
}
.el-input >>> .el-input__inner:focus {
  border: 1px solid #0dc572;
}
.article >>> .el-input-group__append {
  height: 38px;
  position: relative;
  left: 50px;
}
.shopping {
  width: 120px;
  height: 35px;
  border: 1px solid rgb(221, 221, 221);
  margin-left: 950px;
  margin-top: -96px;
}
.sImg {
  position: relative;
  left: -5px;
}
.shopping span {
  display: inline-block;
  position: relative;
  bottom: 12px;
  color: rgb(75, 75, 75);
  padding-left: 0px;
}
.shopping:hover {
  cursor: pointer;
}
.el-input >>> .el-input__inner {
  position: relative;
}
.article >>> .el-button--success {
  height: 40px;
  position: relative;
  left: -156px;
  top: 0.5px;
}
.el-button--success {
  background-color: #0dc572;
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
</style>