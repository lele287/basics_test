<template>
    <div class="detailAssey">
        <div class="tatle">
            <div class="d1">
                <h1 class="h1">{{newsT}}</h1>
            </div>
        </div>
        <div class="d2">
            <div class="left">
                <div>
                <el-image :src="newsI" class="xwImg"></el-image>
                </div>
                <div class="p1">
                    <p>{{newsC}}</p>
                </div>
            </div>
            <div class="right1">
                <h2>最新文章</h2>
                <div v-for="(item,id) in news.slice(0,3)" :key="id"  class="newP">
                <p>{{item.epidemicTitle}}</p>
                </div>
                <h2>相关文章</h2>
                <p v-for="(items,id) in news.slice(0,1)" :key="id">{{items.epidemicNewTitle}}</p>
                <!-- <img src="images/wen1.jpg" alt=""> -->
                <el-image :src="wImg1" class="wImg"></el-image>
                <p v-for="(items,id) in news.slice(1,2)" :key="id">{{items.epidemicNewTitle}}</p>
                <!-- <img src="images/wen2.jpg" alt=""> -->
                <el-image :src="wImg2" class="wImg"></el-image>
                <p v-for="(items,id) in news.slice(2,3)" :key="id">{{items.epidemicNewTitle}}
                </p>
                <!-- <img src="images/wen3.jpg" alt=""> -->
                <el-image :src="wImg3" class="wImg"></el-image>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from "../components/Footer";
export default {
    data(){
        return{
            xwImg:require('../assets/xinwen.jpeg'),
            wImg1:require('../assets/wen1.jpg'),
            wImg2:require('../assets/wen2.jpg'),
            wImg3:require('../assets/wen3.jpg'),
            nId:"",
            newsT:"",
            newsC:"",
            newsI:"",
            news:[],
            newsTypeD:""
        }
    },
    methods:{

    },
    created(){
        var search = decodeURI(location.search)
        .slice(1)
        .split("=")[1];
        this.nid = search;
        this.$axios
        .get("/api/nousRouter/getVirusId", { params: { userName: this.nid } })
        .then(res => {
            this.newsT = res.data.data[0].epidemicTitle;
            // this.newsT = res.data.data[0].epidemicNewTitle;
            // console.log(this.newsT);
            this.newsC = res.data.data[0].epidemicNews;
            this.newsI = res.data.data[0].epidemicImg;
            this.newsTypeD = res.data.data[0].epidemicType;
        })
        .catch(err => {
            console.log("err:", err);
      });
      this.$axios
      .get("/api/nousRouter/getByIdTypes", { params: { userName: this.nid } })
      .then(res => {
        // console.log("res:", res);
        this.news = res.data.data;
        // console.log(this.news);
      })
      .catch(err => {
        console.log("err:", err);
      });
    },
    components:{
        Footer
    }
}
</script>

<style lang="css" scoped>

.newP{
    margin-left: 20px;
}
.detailAssey /deep/ .down{
  height: 300px;
}
.detailAssey /deep/.content-top-left dd{
   margin-top: 5px;
}
.detailAssey /deep/.content-middle-left p:nth-child(2){
    margin-left: 140px;
    margin-top: -55px;
    color: #8ef32f;
}
.detailAssey /deep/.content-middle-left p:nth-child(3){
    margin-left: 181px;
    margin-top: 19px;
    color: #8ef32f;
    font-size: 15px;
}
.detailAssey /deep/ .wbs{
    position: absolute;
    bottom: -65px;
    right: 41px;
}
.detailAssey /deep/ .ddimg span{
    position: relative;
    top: 80px;
    left: 12px;
}
.detailAssey /deep/ .wb{
    position: absolute;
    bottom: -65px;
    right: 134px;
}
.tatle{
    width: 100%;
    height: 100px;
    background-color: #f4f4f4;
}
.d1{
    width: 1190px;
    height: 150px;
    margin: 40px auto;
   
}
.d2{
    width: 1190px;
    display: flex;
    margin: 0 auto;
    position: relative; 
    /* left: -100px; */
}
.h1 {
    font-size: 30px;
    margin-top: 1px;
    text-align: center;
    text-indent: 0em;
    line-height: 100px;
}

.left {
    /* border: 1px solid #eee; */
    border-right: 1px solid #ccc;
    border-top: 1px solid #ccc;
    width: 800px;
}
.xwImg{
    width: 640px;
    height: 295px;
    float: right;
    margin: 25px 80px;

}
.p1{
    margin: 0 50px;
    font-size: 18px;
    text-indent: 2em;
    line-height: 30px;
}
.right1{
    width: 400px;
    border-top: 1px solid #ccc;
}
.right1>p{
    margin-left: 30px;
    font-size: 14px;
    
}
.right1>h2{
    /* display: inline-block; */
    font-size: 18px;
    margin-left: 20px;
}
.wImg{
    transform: scale(0.7);
}
</style>