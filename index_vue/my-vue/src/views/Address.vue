<template>
  <div class="address">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ Pop }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="收货人：" :label-width="formLabelWidth">
          <el-input v-model="consignee" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" :label-width="formLabelWidth">
          <el-input v-model="number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所在地区：" :label-width="formLabelWidth">
          <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input v-model="Detailed" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="门牌号:" :label-width="formLabelWidth">
          <el-input v-model="House" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="collect">确 定</el-button>
      </div>
    </el-dialog>

    <h2>地址信息</h2>
    <div class="artion_diz_main">
      <el-button type="text" class="newly" icon="el-icon-plus" @click="XinZeng"
        >新增收货地址</el-button
      >
      <div
        class="information"
        v-for="(shou, index) in initialization"
        :key="index"
      >
        <div class="diz_main1">
          <ul>
            <li>
              <label>收货人：</label>
              <p class="diz_name">{{ shou.fullName }}{{ shou.name }}</p>
            </li>
            <li>
              <label>手机号：</label>
              <p class="diz_name1">{{ shou.cellPhone }}</p>
            </li>
            <li>
              <label>所在地区：</label>
              <p class="diz_name2">{{ shou.location }}</p>
            </li>
            <li>
              <label>详细地址：</label>
              <p class="diz_name3">
                {{ shou.detail }}&nbsp;&nbsp;{{ shou.floor }}
              </p>
            </li>
          </ul>
        </div>
        <div class="tags">
          <span class="tag" @click="defaults(index)"
            ><span
              class="el-icon-star-on"
              v-if="initialization[index].defaults"
            ></span
            >设为默认地址</span
          >
        </div>
        <div class="diz_main_button">
          <span @click="modify(index)">修改</span>
          <span>|</span>
          <!-- <span class="btnshanchu">删除</span> -->
          <el-button type="text" class="shan" @click="deletes(index)"
            >删除</el-button
          >
          <i
            class="addressId"
            ref="address"
            :key="index"
            style="display: none"
            >{{ shou.addressId }}</i
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { regionData, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      options: regionData,
      selectedOptions: [],
      codeTo: "",
      consignee: "",
      number: "",
      Detailed: "",
      House: "",
      initialization: [],
      sign: "",
      signs: "",
      userName: "",
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: false,
      },
      formLabelWidth: "120px",
      dialogVisible: false,
      Pop: "模态框",
      value: "",
      ChangeReceipt: true,
      addressIds: "",
    };
  },
  methods: {
    // 新增收货地址
    XinZeng() {
      this.dialogFormVisible = true;
      this.ChangeReceipt = true;
      this.addressIds = ''
      this.consignee = ''
      this.number = ''
      this.selectedOptions = ''
      this.Detailed = ''
      this.House = ''
    },
    // 默认地址
    defaults(index) {
      console.log(this.initialization);
      this.userName = localStorage.getItem("userName");
      this.$axios
        .post("/api/users/defaults", {
          addressId: this.initialization[index].addressId,
          userName: this.userName,
        })
        .then((res) => {
          console.log("res:", res);
          for (var i = 0; i < this.initialization.length; i++) {
            this.initialization[i].defaults = 0;
          }
          this.initialization[index].defaults = 1;
          this.$message({
            message: "设置默认收货地址成功！",
            type: "success",
          });
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    handleChange(value) {
      for (var i = 0; i < value.length; i++) {
        this.codeTo += CodeToText[value[i]] + "  ";
      }
      console.log(this.codeTo);
    },
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    },
    open2() {
      this.$message({
        message: "恭喜你，添加收货地址成功！",
        type: "success",
      });
    },
    open3() {
      this.$message({
        message: "删除收货地址成功！",
        type: "success",
      });
    },
    open4() {
      this.$message.error("错了哦，添加收货地址失败！");
    },
    open5() {
      this.$message.error("还没有添加收货地址！快去添加吧！");
    },
    open6() {
      this.$message.error("删除收货地址失败！");
    },
    collect() {
      this.userName = localStorage.getItem("userName");
      // console.log(this.number.trim().length);
      if (!this.consignee.trim()) {
        this.$message.error("请输入收货人");
      } else if (!this.number.trim()) {
        this.$message.error("请输入手机号");
      } else if (this.number.trim().length !== 11) {
        this.$message.error("正确的手机号码");
      } else if (!this.codeTo.trim()) {
        this.$message.error("请输入所在地区");
      } else if (!this.Detailed.trim()) {
        this.$message.error("请输入详细地址");
      } else if (!this.House.trim()) {
        this.$message.error("请输入门牌号");
      } else {
        this.dialogFormVisible = false;
        // console.log(this.codeTo);
        // console.log(this.consignee);
        // console.log(this.number);
        // console.log(this.Detailed);
        // console.log(this.House);
        if (this.ChangeReceipt) {
          this.$axios
            .post("/api/users/preservation", {
              name: this.consignee.trim(),
              cellPhone: this.number.trim(),
              location: this.codeTo.trim(),
              detail: this.Detailed.trim(),
              floor: this.House.trim(),
              userName: this.userName,
            })
            .then((res) => {
              console.log("res:", res);
              if (res.data.code >= 200 && res.data.code <= 300) {
                var data = res.config.data;
                this.initialization.push(JSON.parse(data));
                this.open2();
              } else {
                this.open4();
              }
            })
            .catch((err) => {
              console.log("err:", err);
              this.open4();
            });
        } else {
          console.log(this.codeTo);
          this.$axios
            .post("/api/users/ChangeReceipt", {
              addressId: this.addressIds,
              fullName: this.consignee,
              cellPhone: this.number,
              location: this.codeTo,
              detail: this.Detailed,
              floor: this.House,
            })
            .then((res) => {
              console.log("res:", res);
              this.$message({
                message: "修改收货地址成功！",
                type: "success",
              });
            })
            .catch((err) => {
              console.log("err:", err);
              this.$message.error("修改收货地址失败！");
            });
        }
      }
    },
    deletes(_this) {
      this.dialogVisible = true;
      this.Pop = "确定删除吗？";
      var addText = this.$refs["address"][_this];
      this.signs = _this;
      this.sign = addText.innerText;
      console.log(this.sign);
    },
    determine() {
      this.dialogVisible = false;
      this.$axios
        .post("/api/users/DeleteAddress", { addressId: this.sign })
        .then((res) => {
          console.log("res:", res);

          this.open3();
          this.initialization.splice(this.signs, 1);
        })
        .catch((err) => {
          console.log("err:", err);
          this.open6();
        });
    },
    modify(index) {
      this.ChangeReceipt = false;
      var data = this.initialization[index];
      // console.log(CodeToText);
      console.log(data);
      this.addressIds = this.initialization[index].addressId;
      this.dialogFormVisible = true;
      this.consignee = data.fullName;
      this.number = data.cellPhone;
      this.selectedOptions = data.location.split("  ");
      this.Detailed = data.detail;
      this.House = data.floor;
    },
  },
  beforeCreate() {
    //收货地址初始化
    this.userName = localStorage.getItem("userName");
    this.$axios
      .post("/api/users/AddressInitialization", { userName: this.userName })
      .then((res) => {
        // console.log("res:", res.data.data);
        this.initialization = res.data.data;
        console.log(res.data.data);
        if (!res.data.data) {
          this.open5();
        }
        // console.log(this.initialization);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  },
};
</script>
<style lang="css" scoped>
.address {
  width: 100%;
  background-color: #fff;
  padding: 10px 50px;
  margin-top: 20px;
}
.el-row >>> .el-button--info {
  background-color: #fff;
  color: #000;
  border: 1px solid #ccc;
}

.diz_main1 {
  width: 880px;
  height: 140px;
  margin: 10px auto;
  padding: 5px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 20px;
  background-color: #fff;
}
.diz_main1:hover {
  border: 1px solid #0dc572;
}
.diz_main1 ul li label {
  display: inline-block;
  width: 70px;
  height: 22px;
  line-height: 22px;
  color: #999;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 5px;
}
.diz_main1 ul {
  margin: 6px 10px;
  padding: 0;
}
.diz_main1 ul li {
  list-style: none;
}
.diz_main1 ul li p {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  color: #666;
  font-size: 14px;
}
.diz_main1 ul li .diz_name {
  font-weight: 700;
  position: relative;
}

.tags .tag {
  position: absolute;
  top: 10px;
  right: 40px;
  display: inline-block;
  margin-left: 5px;
  padding: 0 6px;
  height: 24px;
  line-height: 24px;
  background-color: #d4f5e6;
  font-size: 12px;
  color: #0dc572;
}
.diz_main_button {
  position: absolute;
  top: 100px;
  right: 40px;
}
.diz_main_button span {
  height: 24px;
  line-height: 24px;
  color: #333;
  font-size: 12px;
  background-color: #fff;
  border: none;
  margin: 5px;
  cursor: pointer;
}
.tag {
  cursor: pointer;
}
.diz_main1 ul li {
  height: 25px;
}
body {
  overflow-x: hidden;
}
.column {
  margin: 0 0 20px 140px;
}
.column span {
  font-size: 16px;
  color: #000;
}

.independence-foot-btn1 {
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #666;
  margin-left: 20px;
}
.independence-foot {
  height: 40px;
  background-color: #fff;
}
.app-popup-mask {
  position: fixed;
  z-index: 5000;
  opacity: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-out 0ms;
  background: rgba(0, 0, 0, 0.5);
  /* display: none; */
}
.shan >>> span {
  color: #000;
  color: #333;
  font-size: 12px;
}
.newly >>> span {
  color: #000;
  margin-right: 10px;
}
.newly {
  border: 1px solid #ccc;
}
.newly >>> .el-icon-plus {
  color: #000;
  margin-left: 10px;
}
.newly:hover {
  border: 1px solid #ccc;
}
.information {
  position: relative;
}
</style>