<template>
  <div>
    <div class="header-navs">
      <div class="header-nav">
        <ul class="left">
          <router-link tag="li" to="/">欢迎来到康乐窝窝</router-link>
          <router-link tag="li" to="/">首页</router-link>
        </ul>
        <ul class="right">
          <router-link tag="li" to="">手机版</router-link>
          <li @click="shopping">
            <span class="el-icon-shopping-cart-2"></span>
            购物车
          </li>
          <li @click="order">我的窝窝</li>
          <div v-if="!userName">
            <li @click="getNowURL()">请登录</li>
            <router-link tag="li" to="/register">免费注册</router-link>
          </div>
          <div v-if="userName">
            <li>{{ userName }}</li>
            <li @click="signOut">退出登录</li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: require("../assets/logo2.jpg"),
      userName: "",
      nowUrl: "",
    };
  },
  methods: {
    signOut() {
      localStorage.removeItem("userName");
      localStorage.removeItem("MyToken");
      this.userName = "";
    },
    getNowURL() {
      this.nowUrl = this.$route.path;
      this.$router.push({ path: "/login?orginUrl=" + this.nowUrl });
    },
    order() {
      if (!localStorage.getItem("MyToken")) {
        this.$message({
          message: "登录信息已过期，请先登录！",
          type: "warning",
        });
      this.nowUrl = this.$route.path;
      this.$router.push({ path: "/login?orginUrl=" + this.nowUrl });
      } else {
        this.$router.push("/personal/order");
      }
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
  mounted() {
    if (localStorage.getItem("MyToken")) {
      this.userName = localStorage.getItem("userName");
      // console.log(this.userName);
    } else {
      this.$message.error("身份验证已过期，请重新登录！");
    }
  },
};
</script>


<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}
.header-navs {
  width: 100%;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  border-bottom: 1px solid #eee;
}
.header-nav {
  width: 1190px;
  height: 20px;
  margin: 0 auto;
}
.header-nav ul {
  list-style: none;
  font-size: 14px;
}
.header-nav .left li {
  float: left;
  margin: 10px;
}
.header-nav .right li {
  float: right;
  margin: 10px;
}
.header-nav .right li,
.header-nav .left li {
  cursor: pointer;
  font-size: 12px;
  color: #6c6c6c;
}
.header-nav .left li:hover {
  color: #0dc572;
}
.header-nav .right li:hover {
  color: #0dc572;
}
.el-image {
  width: 100px;
  height: 100px;
  margin-top: 30px;
}
</style>
