// 我的地址
<template>
  <div class="personAddress">
      <div class="content">
          <span>新增地址</span>

          <form action="">
            <table>
            <tbody>
              <tr>
                <td>*收货人姓名:</td>
                <td><input type="text" name="sjName" id="sjName" v-model="sjName" /></td>
              </tr>
              <tr>
                <td>*手机号:</td>
                <td><input type="text" name="phoneNumber" id="phoneNumber" v-model="phoneNumber"/></td>
              </tr>
              <tr>
                <td>*详细地址:</td>
                <td><textarea name="address" id="address" cols="10" rows="2" v-model="uAddress"></textarea>
                </td>
              </tr>
            </tbody>
            </table>
                   <el-button @click="saveAddress()" class="btn1" type="primary">保存</el-button>
                   <input type="reset" class="btn2" value="重置" />
          </form>
        </div>
        <div class="next-table">
             <el-table :data="tableData" style="width: 90%; margin: 0 auto; padding: 20px 0; text-align: center">
             <el-table-column prop="recName" label="收货人姓名" width="180">
             <template slot-scope="scope">
                <em style="margin-left: 10px" ref="recName">{{scope.row.recName}}</em>
            </template>
            </el-table-column>
            <el-table-column prop="recId" label="收货编号" v-if="show">
            </el-table-column>
            <el-table-column prop="recPhone" label="收货人电话" width="180">
            <template slot-scope="scope">
                <em style="margin-left: 10px" ref="recPhone">{{scope.row.recPhone}}</em>
            </template>
        </el-table-column>
        <el-table-column prop="recAddress" label="收获地址"> 
            <template slot-scope="scope">
                <em style="margin-left: 10px" ref="recAddress">{{scope.row.recAddress}}</em>
            </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" @click="handleEdit(scope)">编辑</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="delAddress(scope)"
              class="del"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
inject:['reload'],
  data() {
    return {
      sjName: "",
      phoneNumber: "",
      uAddress: "",
      show:false,
      tableData: [],
    };
  },
  methods: {
    handleEdit(index) {
        console.log(this.$refs.recAddress)
    },
    delAddress(index) {
        this.$axios.post("/api/userRec/deluserRec",{recId:index.row.recId})
        .then((res)=>{
            if(res.data.msg=='ok'){
                this.$message({
                    message:'删除成功',
                    type:'success'
                });
            }
            this.reload();
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    saveAddress() {
        if(!(/^1[3456789]\d{9}$/.test(this.phoneNumber))){
            this.$message.error('手机号有误，请重填');
            return;
        }else{
          this.$axios
            .post("/api/userRec/addUserRec", {
              userName: this.$store.state.user.userName,
              uName: this.sjName,
              uPhone: this.phoneNumber,
              uAddress: this.uAddress,
            })
            .then((res) => {
              if (res.data.msg == "ok") {
                // console.log('成功')
                this.$alert("您已保存成功", "提示", {
                  confirmButtonText: "确定",
                });
                 this.reload();
              } else {
                // console.log('失败');
                this.$alert("保存失败，请重新输入", "提示", {
                  confirmButtonText: "确定",
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }

    },
    // cancel(){
    // },
    getUserRec() {
      this.$axios
        .get("/api/userRec/getMyRec", {
          params: { userName: this.$store.state.user.userName },
        })
        .then((res) => {
          let data = res.data.data;

          for (let i = 0; i < data.length; i++) {
            this.tableData.push({
              recAddress: data[i].recAddress,
              recId: data[i].recId,
              recName: data[i].recName,
              recPhone: data[i].recPhone,
              userInfos_uId: data[i].userInfos_uId,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUserRec();
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-table .cell {
  text-align: center;
}
.content {
  margin-left: 250px;
  width: 980px;
  /* box-shadow: 1px 2px 5px rgb(72, 212, 166); */
  overflow: hidden;
  background-color: #fff;
      span{
        font-size: 26px;
        line-height: 75px;
        display: inline-block;
        width: 120px;
        margin-left: 450px;
      }
}

table {
  width: 950px;
  margin: 0px 20px;
}
table tr {
  height: 70px;
}
table tr td:nth-child(1) {
  padding: 0 20px;
  text-align: right;
  /* position: absolute;
    margin-left:-120px;
    line-height: 30px; */
}
/deep/.el-table th > .cell {
  text-align: center;
}
.tb-edit .el-input {
  display: none
}
.tb-edit .current-row .el-input {
  display: block
}
.tb-edit .current-row .el-input+span {
  display: none
}
input {
  width: 700px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 2px;
}
.btn2 {
  position: absolute;
  top: 346.5px;
  display: block;
  color: #fff;
  // border: 1px solid #DCDFE6;
  // margin: 30px 0;
  background-color: #409eff;
  width: 70px;
  height: 41px;
  cursor: pointer;
  font-weight: 50;
  // white-space: nowrap;
  // transition: .1s;
  // outline: 0;
  border: 0;
  margin: 0px 10px 0px 520px !important;
  border-radius: 4px;
  font-size: 14px;
  outline: 0;
}

.addressContent span {
  display: block;
}
input[type="file"] {
  display: none;
}

.cityWhere {
  width: 290px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.schoolName {
  width: 290px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

textarea {
  max-width: 700px;
  min-width: 700px;
  min-height: 77px;
  max-height: 150px;
  overflow: hidden;
  /* resize: none; */
}
.btn1 {
  margin: 30px 0;
  margin-left: 430px;
}
.btn2 {
  margin-left: 10px;
}
.btnAddress {
  width: 180px;
  height: 30px;
  margin-left: 153px;
  /* border: 1px solid #00f; */
}

[type="checkbox"] {
  width: 13px;
  height: 13px;
}
// .next-table-ul li+li {
//     text-align: center;
//     border-left: 1px solid #fff;
// }

.upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
  background-color: #fcfcfc;
}

.upload img {
  margin: 30px;
  width: 100px;
  height: 100px;
  margin-top: -1px;
  margin-left: -1px;
}

.next-table {
  width: 980px;
  background-color: #fff;
  /* border: 1px solid #f00; */
  margin-top: 10px;
  margin-left: 250px;
  /* float: left; */
}
</style>
