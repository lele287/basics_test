// 类似商品
<template>
    <div class="thismain">
        <h2>类似商品</h2>
        <el-row :gutter="10">
            <el-col :xs="12" :sm="12" :md="6" v-for="(item , index) in strHTML" :key="index">
                <div class="good" @click="goGood(item.gId)">
                    <div class="img">
                        <img :src="item.gPic" alt="">
                    </div>
                    <div class="title">{{item.gName}}</div>
                    <div class="price">{{item.gPrice}}</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            strHTML:[]
        }
    },
    mounted(){
        this.getMes();
    },
    watch:{
    '$route':'getMes'
    },
    methods:{
        getMes(){
            let result = this.$route.query.gId;
            this.strHTML=[];
            this.$axios.post('/api/goods/likeGoods',{gid:result})
            .then((res)=>{
                for(let i = 0 ; i < 4 ; i++){
                    this.strHTML.push(res.data.data[i])
                }
                // console.log(this.strHTML)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        goGood(id){
            let gId = id
            this.$axios.get('/api/goods/gHitAdd',{
              params:{
                gId:gId
              }
            })
            .then((res)=>{
                this.$router.push({
                  path:`/detail?gId=${gId}`
                })
            })
            .catch((err)=>{
              console.log(err);
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.thismain{
    margin-top:45px ;
}
h2{
text-align: center;
font-weight: 400;
margin-bottom: 25px;
}
.good{
    width: 250px;
    height: 300px;

}
.img{
    width: 165px;
    height: 165px;
    margin: 0 auto;
    margin-bottom: 9.1%;
}
.img img{
    width: 100%;
    height: 100%;
}
.title{
    height: 55px;
    margin-bottom: 5px;
    text-align: center;
    line-height: 18px;
    font: inherit;
    color: rgb(51, 51, 51);
    letter-spacing: 0.1em;
}
.price{
    text-align: center;
    line-height: 18px;
}
  .good:hover {
    cursor: pointer;
    transition: 0.2s ease-out;
    box-shadow: 0px 3px 7px 1px #ccc;
    transform: scale(1.01);
    transform: translate(0, -2px);
        .title{
      transition: 0.2s ease-out;
      font-weight: 600;
    }
    .price{
      transition: 0.2s ease-out;
      font-weight: 600;
    }
  }
</style>