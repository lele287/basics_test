// 我的求购
<template>
  <div class="personWant">
    
        <div class="content">
            <div class="pageTitle">  
          
            <div class="delItem">
                <span>我的求购</span>
            </div>
        </div>
            <table>
                <tr>
                    <td>物品名称</td>
                    <td>期望价格</td>
                    <td>详细描述</td>
                    <td>联系方式</td>
                    <td>操作</td>
                </tr>
            </table>
           
            <table class="want">
                <tr v-for="(item,index) in data" :key="index">
                    <td>{{item.wantName}}</td>
                    <td>{{item.wantPrice}}</td>
                    <td>{{item.wantMes}}</td>
                    <td v-if="item.wantPhone">{{item.wantPhone}}</td>
                    <td v-else>{{item.uPhone}}</td>
                    <td class="del" @click="delClick(index)">删除</td>
                    <td style="display:none" ref="wantId">{{item.wantId}}</td>
                </tr>
            </table>

            <ul class="pages">
            </ul>
        </div>
  </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return{
            data:[],
        }
    },
    methods:{
        getMywant(){
            this.$axios.post("/api/userwant/getMywant",{uName:this.$store.state.user.userName})
            .then((res)=>{
                this.data = res.data.data
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        delClick(index){
            this.$axios.post("/api/userwant/delwant",{wantId:this.$refs.wantId[index].innerHTML})
            .then((res)=>{
                if(res.data.msg=='ok'){
                     this.$message({
                        message: '提交成功！',
                        type: 'success'
                    });
                }
                this.reload();
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.getMywant()
    },
}
</script>
<style scoped lang="scss">
.pageTitle {
    margin: 20px 0;
}

.pageTitle img {
    width: 100px;
    height: 40px;
    vertical-align: middle;
    margin-right: 20px;
}

.delItem{
    width: 1300px;
    height: 50px;
}
.delItem span {
    font-size: 26px;
    line-height: 40px;
    // top: 43px;
    margin-left: 450px;
    
}
.delItem button{
    /* margin-left: 1020px; */
    margin-left: 727px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    /* border-radius: 2px; */
}
.content {
    overflow: hidden;
    width: 980px;
    margin: 0px auto;
    background-color: #fff;
    // box-shadow: 2px 2px 5px rgb(133, 138, 136);
}

a {
    font-size: 18px;
}

a:link {
    color: #000;
}

a:visited {
    color: #000;
}

a:hover {
    color: green;
}

table {
    font-size: 16px;
    width: 950px;
    margin: 20px auto;
}

table:nth-child(1) {
    font-size: 18px;
    color: rgb(141, 140, 140);
}


/* table:nth-child(1) tr:nth-child(1) {
    font-weight: 700;
} */

td {
    text-align: center;
    padding: 1-px;
    color: black;
}

table:nth-child(2) tr {
    height: 100px;
}

tr td:nth-child(1) {
    width: 100px;
}

tr td:nth-child(2) {
    width: 120px;
}

tr td:nth-child(3) {
    width: 100px;
}

tr td:nth-child(4) {
    width: 180px;
}

tr td:nth-child(5) {
    width: 100px;
}

tr td:nth-child(6) {
    width: 50px;
    cursor: pointer;
}

tr td:nth-child(6):hover {
    color: rgb(72, 212, 166);
    font-weight: 700;
}

.content ul {
    /* 宽度不固定的盒子水平居中可以用display: table; */
    display: table;
    height: 20px;
    margin: 10px auto;
}

.content ul li {
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    border: 1px solid rgb(72, 212, 166);
    float: left;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 50%;
}

.ad {
    width: 1190px;
    height: 300px;
    margin: 100px auto;
}

.ad img {
    width: 1190px;
    height: 300px;
    margin: 0 auto;
}

</style>