<template>
  <div class="personal">
    <div class="top_personal">
      <Logo></Logo>
      <Search></Search>
    </div>
    <div class="pContent">
      <el-row>
        <el-col :span="4">
          <div class="personals">
            <div id="od">
              <h3>订单中心</h3>
              <router-link
                tag="p"
                to="/personal/order"
                active-class="active"
                exact
                >我的订单</router-link
              >
              <router-link
                tag="p"
                to="/personal/sale"
                active-class="active"
                exact
                >我的售后</router-link
              >
            </div>
            <div id="ps">
              <h3>个人信息</h3>
              <router-link
                tag="p"
                to="/personal/data"
                active-class="active"
                exact
                >个人资料</router-link
              >
              <router-link
                tag="p"
                to="/personal/address"
                active-class="active"
                exact
                >收货地址</router-link
              >
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="details">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import Logo from "../components/Logo";
import Search from "../components/Search";
export default {
  data() {
    return {
      nowUrl: "",
    };
  },
  components: {
    Footer,
    Logo,
    Search,
  },
  beforeMount() {
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
};
</script>

<style lang="css" scoped>
.top_personal /deep/ .el-button--success {
  height: 40px;
  position: relative;
  left: 95px;
  top: 8.5px;
}
.top_personal /deep/ .logoImg {
  position: relative;
  left: 0px;
}
.top_personal /deep/.el-input,
.el-input-group,
.el-input-group--append {
  position: relative;
  top: 8px;
  right: -115px;
}
.top_personal /deep/ .shopping {
  margin-top: -88px;
}
.top_personal /deep/ .shopping span {
  position: relative;
  bottom: 9px;
}
.top_personal /deep/ .sImg {
  /* position: relative; */
  margin-left: 15px;
}

.personal /deep/ .down {
  margin-top: 40px;
  height: 300px;
}
.personal /deep/.content-top-left dd {
  margin-top: 5px;
}
.personal /deep/.content-middle-left p:nth-child(2) {
  margin-left: 140px;
  margin-top: -55px;
  color: #8ef32f;
}
.personal /deep/.content-middle-left p:nth-child(3) {
  margin-left: 181px;
  margin-top: 19px;
  color: #8ef32f;
  font-size: 15px;
}
.personal /deep/ .wbs {
  position: absolute;
  bottom: -65px;
  right: 41px;
}
.personal /deep/ .ddimg span {
  position: relative;
  top: 80px;
  left: 12px;
}
.personal /deep/ .wb {
  position: absolute;
  bottom: -65px;
  right: 134px;
}
.pContent {
  margin-top: 5px;
}
.active {
  background-color: #fff;
  color: #0dc572;
  font-weight: 900;
  border-left: 2px solid #0dc572;
}
.personals {
  margin-top: 20px;
  margin-right: 20px;
  padding: 10px;
  background-color: #fff;
}
#od >>> p,
#ps >>> p {
  margin: 30px 0;
  padding-left: 10px;
  cursor: pointer;
}
.el-col-4 {
  width: 15%;
  margin-top: 30px;
}
.el-col-20 {
  width: 80%;
  margin-top: 30px;
}
</style>