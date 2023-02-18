// 我的收藏
<template>
  <div class="personCollect">
     <div class="collect">
        <div class="mycollect">我的收藏</div>
             <ul class="ulkey">
                <li>图片</li>
                <li>名称</li>
                <li>发布者</li>
                <li>价格</li>
                <li>操作</li>
            </ul>
            <ul class="ulvalue" v-if="flag==true">
                <li v-for="(item,index) in userCollect" :key="index">
                    <span style="display:none;" ref="collectionId">{{item.collectionId}}</span>  
                    <img :src="item.gPic" alt="">                      
                    <span>{{item.gName}}</span>
                    <span>{{item.uName}}</span>
                    <span>{{item.gPrice}}</span>
                    <el-button type="danger" icon="el-icon-delete" circle class="delBtn" @click="delClick(index)"></el-button>
                </li>
                
            </ul>
            <div v-else>
                <img src="../assets/images/heart.png" alt="" style="width:60px;margin-left:300px;margin-top:100px">
                <span>您还没有收藏哦！快去 <a href="/">逛逛</a> 吧</span>
            </div>
     </div>
  </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
     return{
         userCollect:[],
         flag:false, 
     }
    },
    methods:{
          getCollect(){
            this.$axios
            .post("/api/collection/getMes",{uName:this.$store.state.user.userName})
            .then((res)=>{
                 this.userCollect=res.data.data
                //  console.log(this.userCollect)
                 if(this.userCollect.length==0){
                     this.flag = false
                 }else{
                     this.flag = true
                 }
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        delClick(index){
            this.$confirm('您确定要删除嘛','删除商品',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                            this.$axios.post('/api/collection/delMes',{cId:this.$refs.collectionId[index].innerHTML})
            .then((res)=>{
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
                this.reload();
            })
            .catch((err)=>{
                console.log(err)
                })
            }).catch(()=>{
                this.$message({
                type: 'info',
                message: '已取消删除'
                }); 
            })
        }
    },
    mounted(){
          this.getCollect();
    }
}
</script>
<style lang="scss" scoped>
.collect {
    float: left;
    width: 940px;
    background-color: #fff;
    margin-left: 250px;
    margin-top: -350px;
    margin-bottom: 100px;
    padding: 20px;
}

.collect .mycollect {
    /* float: left; */
    margin-left: 430px;
    font-size: 26px;
    position: absolute;
    top: 43px;
    // line-height: 30px;
}

.collect .collectBtn {
    float: right;
    margin-top: 5px;
    width: 100px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    font-size: 18px;
    background-color: rgb(72, 212, 166);
    color: #fff;
    border-radius: 2px;
    border: 1px solid rgb(72, 212, 166);
}

.collect .collectBtn:hover {
    color: rgb(72, 212, 166);
    background-color: #fff;
}

.collect .ulkey {
    margin-bottom: 0 !important;
}

.collect .ulkey {
    clear: both;
    list-style: none;
    margin-top: 95px;
  
}

.collect .ulkey li {
    float: left;    
    width: 180px;
    text-align: center;
    font-size: 18px;
}

.collect ul li a {
    font-size: 18px;
    color: #000 !important;
}

.ulvalue {
    clear: both;
    list-style: none;
    margin-top: 50px;
    li {
        height: 90px;
        img {
        width: 80px;
        height: 80px;
        margin-left: 50px;
        margin-right: 50px;
        margin-top: 5px;
        }
        span{
            display: inline-block;
            width: 180px;
            font-size: 15px;
            vertical-align: middle;    
            height: 90px;
            line-height: 26px;     
            text-align: center;  
        }
    }
}
.delBtn{
    position: absolute;
    margin-top: 25px;
    right: 160px;
}
.collect .supplement {
    margin: 30px 0;
    margin-left: 50px;
    font-size: 18px;
}

.collect .supplement img {
    width: 50px;
    height: 50px;
    margin-left: 260px;
    /* top: 20px; */
}
.supplement span{
 margin-left: 30px;
}
.collect .supplement a {
    color: #00f !important;
}
</style>
