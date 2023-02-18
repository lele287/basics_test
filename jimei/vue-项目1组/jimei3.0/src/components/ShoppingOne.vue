//购物车中的数据
<template>
    <div id="shoppingOne">
        <el-row v-for="(one,index) in shopData" :key="index" class="row">
            <el-col :span="2">
                <div class="grid-content">
                    <input type="checkbox" value="one.SCRId"  v-model="one.checked">
                </div>
            </el-col>

            <el-col :span="9">
                <div class="grid-content">
                    <img :src="one.gPic" alt="" class="gPic">
                    <div class="gName"> <span>{{one.gName}}</span></div>
                </div>
            </el-col>
            <el-col :span="2"><div class="grid-content">￥{{one.gPrice}}</div></el-col>
            
            <el-col :span="5">
                <el-input-number v-model="one.buyNum" :min="1" :max="one.gNum" class="numm"></el-input-number>
                <!-- <div class="grid-content">{{one.SCRGoodsNum}}</div> -->
            </el-col>
            <el-col :span="2"><div class="grid-content">￥{{one.gPrice*one.SCRGoodsNum}}</div></el-col>
            <el-col :span="4">
                <div class="grid-content">
                    <el-button type="warning" icon="el-icon-star-off" circle @click="delCollect(index,one.gId)" v-if="one.collected"></el-button>
                    <el-button type="success" icon="el-icon-star-off" circle @click="addCollect(index,one.gId)" v-else></el-button>

                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteThis(one.SCRId)"></el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    inject:['reload'],
    data(){
        return {
        }
    },
    methods:{
        collectedcheck(i,gid){
            this.$axios.post('/api/collection/check',{gId:gid,uName:this.$store.state.user.userName})
            .then((res)=>{
                console.log('res:',res);
                if(res.data.data[0].num == 0){
                    this.shopData[i].collected = false;
                    // this.collected = false
                    // this.$set(this.shoppingData.allData[i],'collected',false);
                }
                else{
                    // this.collected = true
                    // this.$set(this.shoppingData.allData[i],'collected',true);
                    this.shopData[i].collected = true;

                }
                console.log( this.shopData[i].collected);
                
                // this.reload();
            })
            // return this.shoppingData.allData[i]
        },
        addCollect(index,gId){
            this.$axios
            .post("/api/collection/addMes",{gId:gId,uName:this.$store.state.user.userName})
            .then((res) => {
                if(res.data.code=='200'){
                   this.$message({
                        message: '收藏成功！',
                        type: 'success'
                    });
                    // this.shopData[index].collected=true;
                    // console.log(this.shopData[index].collected);
                    this.collectedcheck(index,gId)
                    // this.reload();
                    // this.collected=false; 
                }else{
                    this.$message.error('收藏失败!');
                }
            })
            .catch((err) => {
                console.log("err:", err);
            })
        },
        delCollect(index,gId){
            this.$axios.post('/api/collection/delChoice',{gId:gId,uName:this.$store.state.user.userName})
            .then((res)=>{
                if(res.data.code=='200'){
                   this.$message({
                        message: '取消收藏成功',
                        type: 'success'
                    });
                    this.collectedcheck(index,gId)
                    // this.shopData[index].collected=false
                    // console.log(this.shopD ata[index].collected);
                    // this.reload();
                }else{
                    this.$message.error('取消收藏失败!');
                }
            })
            .catch((err)=>{
                console.log("err",err)
            })
        },
        deleteThis(SCRId){
            this.$axios.post("/api/shoppingCart/delMes",{SCRId:SCRId})
            .then((res) => {
                // console.log('res:',res);
                if(res.data.code=='200'){
                   this.$message({
                        message: '删除成功！',
                        type: 'success'
                    });
                    this.reload();
                }else{
                    this.$message.error('删除失败!');
                }
            })
            .catch((err) => {
                console.log("err:", err);
            })
        }
    },
    watch:{
        shopData: {
            handler: function(newVal, oldVal) {
                // console.log('子newVal:',newVal);
                // console.log('子oldVal:',oldVal);
            },
            deep: true 
        }

    },
    mounted(){
        // console.log('子组件获取：',JSON.parse(JSON.stringify(this.shopData)));
    },
    props:['shopData']
}
</script>
<style scoped>
.row:hover{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.gPic{
    float: left;
    width: 125px;
    height: 125px;
    margin: 10px 20px;
}
.gName{
    float:right;
    width: 200px;
    margin: 60px 20px;
    line-height: 25px;
}
.grid-content{
    padding: 10px 0;
    line-height: 145px;
    text-align: center;
}
.numm{
    margin-top: 63px;
}
</style>