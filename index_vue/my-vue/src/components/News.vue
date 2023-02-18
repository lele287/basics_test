<template>
    <div class="news">
        <el-tabs type="border-card" class="manager">
        <el-tab-pane label="国内疫情">
            <!-- <div class="nei" > -->
                <span class="neiA" v-for="(diagnosis,index) in news" :key="index" @click.prevent="getId(diagnosis.epidemicId)">{{diagnosis.epidemicTitle}}</span>
            <!-- </div> -->
        </el-tab-pane>
        <el-tab-pane label="国外疫情">
            <!-- <div class="wai"> -->
                <span class="neiA" v-for="(diagnosis,index) in newss" :key="index" @click.prevent="getId(diagnosis.epidemicId)">{{diagnosis.epidemicTitle}}</span>
                <!-- </div> -->
        </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
export default {
    name:"News",
    data(){
        return{
            diaTit:[],
            news:[],
            newss:[]
        }
    },
    methods:{
        getId(Id){
            console.log('dd',Id);
            this.$router.push("/DetailAssey?id=" +Id)
        }
        
    },
    created(){
        this.$axios
        .get("/api/nousRouter/getVirus", { params: { userName: '国内疫情' } })
        .then(res => {
            this.news = res.data.data;
            // console.log(this.news);
        })
        .catch(err => {
            console.log("err:", err);
        });
        this.$axios
        .get("/api/nousRouter/getVirus", { params: { userName: '国外疫情' } })
        .then(res => {
            this.newss = res.data.data;
            console.log(this.news);
        })
        .catch(err => {
            console.log("err:", err);
        });
    }
}
</script>

<style lang="css" scoped>
.neiA{
    line-height: 40px;
    margin: 10px;
    padding: 0 15px;
    font-size: 18px;
    background-color: #eee;
    border: 1px solid transparent;
    border-radius: 5px 5px;
    cursor: pointer;
    display: inline-block;
    width: 900px;
    height: 40px;
    color: #000;
    text-decoration: none;
}
    .news{
        width: 100%;
        height: 200px;
        background-color: #fff;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .news >>> .el-tabs ,.el-tabs--top ,.el-tabs--border-card{
        background-color: #fff;
        border: none;
        box-shadow: none;
        /* color: #0dc572; */
    }
    .news >>> .el-tabs__item ,.is-top is-active{
        color: #0dc572;
    }
    .manager >>> .el-tabs__item is-top{
        color: #0dc572;
    }
    .news >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
        color: #0dc572;
    }
    .news >>> .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        color: #0dc572;
    }
</style>