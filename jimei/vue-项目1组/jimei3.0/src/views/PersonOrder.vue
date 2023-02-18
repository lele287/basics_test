// 我的订单
<template>
  <div class="personOrder">
       
        
       
 
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="所有订单" name="first">
   <div class="orderBody">
            <table class="tb">
                <tr>
                    <td>商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>总价</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
            </table>
            <ul class="orderUl">
                <li v-for="(item,index) in orderInfo" :key="index">
                    <div class="oId" style="display:none" ref="oId">{{item.oId}}</div>
                    <div class="gId" style="display:none" ref="gId">{{item.gId}}</div>
                    <div class="gName"><img :src="item.gPic" alt="">{{item.gName}}</div>
                    <div class="gPrice">{{item.gPrice}}</div>
                    <div class="gNum" ref="gNum">{{item.oGoodsNum}}</div>
                    <div class="gTotal" ref="oTotal">{{item.gPrice*item.oGoodsNum}}</div>
                    <div class="gState" v-if="item.oState == 0">
                        待付款
                    </div>
                    <div class="gState" v-if="item.oState == 1">
                        待收货
                    </div>
                    <div class="gState" v-if="item.oState == 2">
                        待评价
                    </div>
                    <div class="gState" v-if="item.oState == 3">
                        已评价
                    </div>
                    <div class="button" v-if="item.oState == 0">
                        <el-button plain @click="goPay(index)">去付款</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 1">
                        <el-button plain @click="getIt(index)">确认收货</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 2">
                        <el-button plain @click="goEvaluate(index)">去评价</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 3">
                        <el-button plain disabled>已完成</el-button>
                    </div>
                </li>
            </ul>
  <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page="currentPage"
                        hide-on-single-page
                        :page-size='pageSize'
                        layout="prev, pager, next"
                        :page-count="pageCount"
                        :total="total">
                    </el-pagination>
            </div>
        </div>
        </el-tab-pane>
    <el-tab-pane label="待付款" name="second"> <div class="orderBody">
            <table class="tb">
                <tr>
                    <td>商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>总价</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
            </table>
            <ul class="orderUl">
                <li v-for="(item,index) in orderInfo" :key="index">
                    <div class="oId" style="display:none" ref="oId">{{item.oId}}</div>
                    <div class="gId" style="display:none" ref="gId">{{item.gId}}</div>
                    <div class="gName"><img :src="item.gPic" alt="">{{item.gName}}</div>
                    <div class="gPrice">{{item.gPrice}}</div>
                    <div class="gNum" ref="gNum">{{item.oGoodsNum}}</div>
                    <div class="gTotal" ref="oTotal">{{item.gPrice*item.oGoodsNum}}</div>
                    <div class="gState" v-if="item.oState == 0">
                        待付款
                    </div>
                    <div class="gState" v-if="item.oState == 1">
                        待收货
                    </div>
                    <div class="gState" v-if="item.oState == 2">
                        待评价
                    </div>
                    <div class="gState" v-if="item.oState == 3">
                        已评价
                    </div>
                    <div class="button" v-if="item.oState == 0">
                        <el-button plain @click="goPay(index)">去付款</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 1">
                        <el-button plain @click="getIt(index)">确认收货</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 2">
                        <el-button plain @click="goEvaluate(index)">去评价</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 3">
                        <el-button plain disabled>已完成</el-button>
                    </div>
                </li>
            </ul>
  <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page="currentPage"
                        hide-on-single-page
                        :page-size='pageSize'
                        layout="prev, pager, next"
                        :page-count="pageCount"
                        :total="total">
                    </el-pagination>
            </div>
        </div></el-tab-pane>
    <el-tab-pane label="待收货" name="third">
           <div class="orderBody">
            <table class="tb">
                <tr>
                    <td>商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>总价</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
            </table>
            <ul class="orderUl">
                <li v-for="(item,index) in orderInfo" :key="index">
                    <div class="oId" style="display:none" ref="oId">{{item.oId}}</div>
                    <div class="gId" style="display:none" ref="gId">{{item.gId}}</div>
                    <div class="gName"><img :src="item.gPic" alt="">{{item.gName}}</div>
                    <div class="gPrice">{{item.gPrice}}</div>
                    <div class="gNum" ref="gNum">{{item.oGoodsNum}}</div>
                    <div class="gTotal" ref="oTotal">{{item.gPrice*item.oGoodsNum}}</div>
                    <div class="gState" v-if="item.oState == 0">
                        待付款
                    </div>
                    <div class="gState" v-if="item.oState == 1">
                        待收货
                    </div>
                    <div class="gState" v-if="item.oState == 2">
                        待评价
                    </div>
                    <div class="gState" v-if="item.oState == 3">
                        已评价
                    </div>
                    <div class="button" v-if="item.oState == 0">
                        <el-button plain @click="goPay(index)">去付款</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 1">
                        <el-button plain @click="getIt(index)">确认收货</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 2">
                        <el-button plain @click="goEvaluate(index)">去评价</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 3">
                        <el-button plain disabled>已完成</el-button>
                    </div>
                </li>
            </ul>
  <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page="currentPage"
                        hide-on-single-page
                        :page-size='pageSize'
                        layout="prev, pager, next"
                        :page-count="pageCount"
                        :total="total">
                    </el-pagination>
            </div>
        </div>
    </el-tab-pane>
    <el-tab-pane label="待评价" name="fourth">
           <div class="orderBody">
            <table class="tb">
                <tr>
                    <td>商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>总价</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
            </table>
            <ul class="orderUl">
                <li v-for="(item,index) in orderInfo" :key="index">
                    <div class="oId" style="display:none" ref="oId">{{item.oId}}</div>
                    <div class="gId" style="display:none" ref="gId">{{item.gId}}</div>
                    <div class="gName"><img :src="item.gPic" alt="">{{item.gName}}</div>
                    <div class="gPrice">{{item.gPrice}}</div>
                    <div class="gNum" ref="gNum">{{item.oGoodsNum}}</div>
                    <div class="gTotal" ref="oTotal">{{item.gPrice*item.oGoodsNum}}</div>
                    <div class="gState" v-if="item.oState == 0">
                        待付款
                    </div>
                    <div class="gState" v-if="item.oState == 1">
                        待收货
                    </div>
                    <div class="gState" v-if="item.oState == 2">
                        待评价
                    </div>
                    <div class="gState" v-if="item.oState == 3">
                        已评价
                    </div>
                    <div class="button" v-if="item.oState == 0">
                        <el-button plain @click="goPay(index)">去付款</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 1">
                        <el-button plain @click="getIt(index)">确认收货</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 2">
                        <el-button plain @click="goEvaluate(index)">去评价</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 3">
                        <el-button plain disabled>已完成</el-button>
                    </div>
                </li>
            </ul>
  <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page="currentPage"
                        hide-on-single-page
                        :page-size='pageSize'
                        layout="prev, pager, next"
                        :page-count="pageCount"
                        :total="total">
                    </el-pagination>
            </div>
        </div>
    </el-tab-pane>
    <el-tab-pane label="已完成" name="fifth">
           <div class="orderBody">
            <table class="tb">
                <tr>
                    <td>商品</td>
                    <td>单价</td>
                    <td>数量</td>
                    <td>总价</td>
                    <td>状态</td>
                    <td>操作</td>
                </tr>
            </table>
            <ul class="orderUl">
                <li v-for="(item,index) in orderInfo" :key="index">
                    <div class="oId" style="display:none" ref="oId">{{item.oId}}</div>
                    <div class="gId" style="display:none" ref="gId">{{item.gId}}</div>
                    <div class="gName"><img :src="item.gPic" alt="">{{item.gName}}</div>
                    <div class="gPrice">{{item.gPrice}}</div>
                    <div class="gNum" ref="gNum">{{item.oGoodsNum}}</div>
                    <div class="gTotal" ref="oTotal">{{item.gPrice*item.oGoodsNum}}</div>
                    <div class="gState" v-if="item.oState == 0">
                        待付款
                    </div>
                    <div class="gState" v-if="item.oState == 1">
                        待收货
                    </div>
                    <div class="gState" v-if="item.oState == 2">
                        待评价
                    </div>
                    <div class="gState" v-if="item.oState == 3">
                        已评价
                    </div>
                    <div class="button" v-if="item.oState == 0">
                        <el-button plain @click="goPay(index)">去付款</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 1">
                        <el-button plain @click="getIt(index)">确认收货</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 2">
                        <el-button plain @click="goEvaluate(index)">去评价</el-button>
                    </div>
                    <div class="button" v-if="item.oState == 3">
                        <el-button plain disabled>已完成</el-button>
                    </div>
                </li>
            </ul>
  <div class="block">
                    <el-pagination
                        @current-change="currentChange"
                        :current-page="currentPage"
                        hide-on-single-page
                        :page-size='pageSize'
                        layout="prev, pager, next"
                        :page-count="pageCount"
                        :total="total">
                    </el-pagination>
            </div>
        </div>
    </el-tab-pane>
    </el-tabs>

                  
  </div>
</template>

<script>
export default {
    data(){
        return{
            activeName: 'first',
            orderInfo:[],
            pageSize:9,
            pageCount:0,
            total:0,
            currentPage:1,
            showTab:true,
            tabMes:{},
            clicked:false
        };
    },
    methods:{

         handleClick(tab,clicked) {

             this.tabMes = tab
             console.log(clicked)
             if(clicked!=false)
             {this.currentPage = 1}
             if((tab.index-1)>=0){
                 this.showTab=false;
                  this.$axios.post('/api/order/getTab',{uName:this.$store.state.user.userName,uTab:tab.index-1})
        .then((res)=>{
            this.showOrder(res.data.data)
        })
        .catch((err)=>{

        })
             }
             else{
                 this.showTab=true
                 this.getOrder();
             }
       
      },
        currentChange(currentPage){
            // console.log(currentPage)
            this.currentPage = currentPage;
            if(this.showTab){
                this.getOrder();
            }
            else{
                this.handleClick(this.tabMes,this.clicked)
            }
            
        },
        getOrder(){
            this.$axios
            .post("/api/order/getOrder",{uName:this.$store.state.user.userName})
            .then((res)=>{
                // console.log(res.data.data)
                this.showOrder(res.data.data);
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        showOrder(data){
            let showData = []
            this.total = data.length;
            this.pageCount = Math.ceil(this.total / this.pageSize);
            // console.log("currentPage",this.currentPage)
            for(let i = (this.currentPage-1) * this.pageSize;i < this.currentPage * this.pageSize;i++){
                if(data[i]){
                // console.log(data[i])
                showData.push(data[i])
                }
                else{
                    break;
                }
            }
            this.orderInfo = showData
            console.log(this.orderInfo)
        },
        goPay(index){
            let oId = this.$refs.oId[index].innerHTML;
            let gId = this.$refs.gId[index].innerHTML;
            let oTotal = this.$refs.oTotal[index].innerHTML;
            let gNum = this.$refs.gNum[index].innerHTML;
            console.log(gId)
            console.log(gNum)
            this.$axios.post('/api/order/changeOrder',{oId:oId})
            .then((res)=>{
                this.$axios.get('/api/pay',{params:{oId:oId,Price:oTotal}})
                    .then((res)=>{
                        location.href = res.data.data
                        this.$axios.post('/api/goods/setOut',{gId:gId,gNum:gNum})
                    })
                    .catch((err)=>{
                        console.log("err",err)
                    })
                })
                .catch((err)=>{
                    console.log((err)=>{})
                })
            },
        getIt(index){
            let oId = this.$refs.oId[index].innerHTML;
            this.$confirm('请在拿到商品之后再点击此选项，收货后不可更改', '确认收货', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/api/order/changeOrder',{oId:oId})
                .then((res)=>{
                this.$message({
                type: 'success',
                message: '已收货!'
                    });
                this.getOrder();
                }).catch((err)=>{
                    console.log("err",err)
                })
            }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消收货'
          });          
        })
        },
        goEvaluate(index){
            let oId = this.$refs.oId[index].innerHTML;
            let gId = this.$refs.gId[index].innerHTML;
            let goodsEvaluate = {
                gid:gId,
                oid:oId
            };
            sessionStorage["goodsEvaluate"] = JSON.stringify(goodsEvaluate);
            this.$router.push({
                path:`/Evaluate`
            });
        }
    },
    mounted(){
        this.getOrder()
    }
}
</script>>
<style lang="scss" scoped>
.personOrder{
     float: left;
    width: 940px;
    background-color: #fff;
    margin-left: 250px;
    margin-top: -350px;
    margin-bottom: 100px;
    padding: 20px;
}
/deep/.el-tabs__nav-scroll{
    padding-left: 30px;
}
.block{
    width: 1010px;
    float: right;
    display: flex;
    justify-content:center;
    margin-bottom:20px ;
}
.content {
    overflow: hidden;
    width: 900px;
    margin: 30px auto;
    background-color: #fff;
    // box-shadow: 2px 2px 5px rgb(133, 138, 136);
}
.orderBody{
    width: 1010px;
    min-height: 520px;
    float: right;
}
.orderUl{
    list-style: none;
    margin-left:11px;
}
.gName img{
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-left: 70px;
    margin-right: 10px;
}
.orderUl li{
    margin-right: 30px;
    overflow: hidden;
    margin-top:15px;
    height: 42px;
    line-height: 40px;
}
.orderUl li div{
    color: #666;
    float: left;
    text-align: center;
    vertical-align: middle;
}
.gName{
    text-align: left !important;
    width: 407px;
}
.gPrice{
    width: 107px;
}
.gNum{
    width: 65px;
}
.gTotal{
    width: 133px;
}
.gState{
    width: 134px;
}
.button{
    margin-left:25px ;
}
.order {
    font-size: 26px;
    /* float: left; */
    /* margin-left: 33px; */
    line-height: 50px;
    /* position: relative;
    top: 10px;
    left: 300px; */
}

.top [type="button"] {
    width: 150px;
    height: 30px;
    float: right;
    font-size: 16px;
    /* border: 1px solid rgb(72, 212, 166); */
    background-color: #fff;
    /* color: rgb(72, 212, 166); */
    /* border-radius: 2px; */
}
.delItem{
    /* margin-left: 1020px; */
    margin-left: 727px;
    width: 150px;
    height: 30px;
    font-size: 16px;
    position: absolute;
    top: 55px;
    /* border-radius: 2px; */
}
.top {
    padding: 20px 0;
    width: 980px;
    line-height: 20px;
    height: 20px;
    /* height: 570px; */
    margin: 0 250px;
    /* background-color: #fff; */
}
/deep/.el-tabs__item{
    font-size: 18px;
    line-height: 20px;
}
.tb {
    /* clear: both; */
    // width: 980px !important;
    border-collapse: collapse;
   /* box-shadow: 2px 2px 5px rgb(133, 138, 136); */
    text-align: center;
    // background-color: #fff;
    /* width: 941px; */
    /* border: 1px solid #ddd; */
    margin: 10px 30px 0;
}

.tb tr td:nth-child(1) {
    width: 395px;
    height: 40px;
}

.tb tr td:nth-child(3) {
    width: 65px;
    height: 40px;
}
.tb tr td:nth-child(4) {
    width: 135px;
    height: 40px;
}
.tb tr td:nth-child(5) {
    width: 145px;
    height: 40px;
}
.tb tr td:nth-child(6) {
    width: 120px;
    height: 40px;
}
.goods_mes li:nth-child(1) {
    width: 406px;
}

.tb tr td:nth-child(2) {
    width: 125px;
    height: 39px;
}

.goods_mes li:nth-child(2) {
    width: 106px;
    line-height: 80px;
}

.goods_mes img {
    width: 80px;
    height: 80px;
    /* margin: 10px; */
}

.goods_mes .title {
    width: 250px;
}

.goods_mes .img {
    width: 100px;
    height: 100px;
    border: 0;
}

.nav tr td:nth-child(3) {
    width: 54px;
    height: 39px;
}

.goods_mes li:nth-child(3) {
    width: 65px;
    line-height: 80px;
}

.nav tr td:nth-child(4) {
    width: 128px;
    height: 39px;
}

.goods_mes li:nth-child(4) {
    width: 128px;
    line-height: 80px;
}

.nav tr td:nth-child(5) {
    width: 117px;
    height: 39px;
    line-height: 80px;
}

.goods_mes li:nth-child(5) {
    width: 117px;
    line-height: 80px;
}

.nav tr td:nth-child(6) {
    width: 128px;
    height: 39px;
    line-height: 80px;
}

.goods_mes li:nth-child(6) {
    width: 128px;
    border-right: 1px solid #ccc;
}

.goods_mes li:nth-child(6) button {
    border: 1px solid #666;
    /* border: 1px solid transparent; */
    background-color: #fff;
    color: #333;
    outline: 0 none !important;
    margin-top: 46px;
    margin-left: 25px;
}

.goods {
    border-collapse: collapse;
    background-color: #eee;
    width: 941px;
    border: 1px solid #ddd;
    margin: 20px auto;
}

.goods :first-child {
    height: 25px;
    vertical-align: middle;
}

.goods :first-child :nth-child(1) :nth-child(2) {
    height: 25px;
    vertical-align: middle;
}

.goods_nav {
    width: 950px;
    height: 25px;
    background-color: rgba(66, 212, 66, .3);
    margin: 0 auto;
    color: #666;
}

.goods_nav li {
    float: left;
    height: 25px;
    line-height: 25px;
}

.goods_nav li:nth-child(1) {
    width: 50px;
    margin-left: 20px;
}

.goods_nav li:nth-child(2) {
    width: 450px;
    /* text-align: center; */
}

.goods_nav li:nth-child(3) {
    width: 250px;
}

.goods_nav li:nth-child(4) {
    float: right;
    width: 130px;
    text-align: center;
    cursor: pointer;
}

.goods_nav li:nth-child(4) i {
    font-size: 16px;
}

.goods_mes {
    width: 950px;
    height: 150px;
    margin: 0 auto;
    /* margin-top: -20px; */
}

.goods_mes span {
    display: block;
    margin-top: 20px;
    text-align: center;
}

.goods_mes li {
    float: left;
    border: 1px solid #ddd;
    border-right: 0px;
    height: 120px;
}

.goods_mes li:first-child span:nth-child(2) {
    float: left;
    padding-top: 30px;
    font-size: 13px;
}

.img {
    width: 80px;
    height: 80px;
    display: block;
    border: 1px solid #ccc;
    background-size: 100% 100%;
    float: left;
    margin-top: 20px;
    margin-left: 20px;
}
</style>