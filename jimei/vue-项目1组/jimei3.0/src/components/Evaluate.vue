// 商品评价
<template>
<div class="large">
    <h2>商品评价</h2>
    <div v-if="show">
    <div class="one" v-for="( item , index) in strHTML" :key="index">
        <ul>
            <li>        
                <div style="display:flex; align-items:center;">
                    <el-rate v-model="showValue[index]" disabled text-color="#ff9900"> </el-rate>
                    <span class="time">{{item.comDate}}</span>
                </div>
            </li>
            <li>
                <span class="person">{{item.uName}}</span>
            </li>
            <li>
                <span class="message">{{item.comMes}}</span>
            </li>
        </ul>
    </div>
    </div>
    <div v-else  class="noMes">
        <span>暂时还没有人评价过哦
        </span>
    </div>

</div>

</template>
<script>
export default {
    data(){
        return {
            value:5,
            strHTML:[],
            showValue:[],
            show:false
        }
    },
    mounted(){
        this.showMes();
    },
    watch:{
    '$route':'showMes'
    },
    methods:{
        showMes(){
            let result = this.$route.query.gId;
            this.strHTML=[];
            this.$axios.get('/api/comments/getEvaluation',{params:{gid:result}})
            .then((res)=>{
                if(res.data.data == 0){
                    this.show=false;
                }
                else{
                    this.show=true;
                    for(let i = 0 ; i < res.data.data.length ; i++){
                    res.data.data[i].comDate = res.data.data[i].comDate.replace(/T/g, " ").substring(0,res.data.data[i].comDate.replace(/T/g, " ").length-5);
                    this.showValue.push(res.data.data[i].comLevel);
                    }
                    for(let i = 0 ; i < res.data.data.length ; i++){
                        this.strHTML.push(res.data.data[i])
                    }
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
h2{
    text-align: center;
    font-weight: 400;
}
.large{
    width: 1050px;
    margin: 0 auto;
    margin-top: 50px ;
    margin-bottom: 50px ;
}
.noMes{
    margin-top:50px ;
    text-align: center;
    height: 55px;
    line-height: 50px;
    color: #666;
    font-family: tahoma,arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
    font: 14px/1.5 tahoma,arial,"\5b8b\4f53";
}
    ul{
        list-style: none;
    }
    ul li{
        margin-top: 10px;
    }
    .one{
        width: 525px;
        display: inline-block;
    }
    .person{
        font-weight: bold;
        font-size: 14px;
    }
    .message{
        margin-bottom: 20px;
        font-size: 15px;
    }
    .time{
        margin-left: 8px;
        color: rgb(51, 51, 51);
        line-height: 30px;
    }
</style>