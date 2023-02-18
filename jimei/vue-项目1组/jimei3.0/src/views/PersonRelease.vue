// 我的发布
<template>
  <div class="personRelease">
        <div class="content"> 
             <span>我的发布</span>
            <table>  
                <tr class="ulkey">
                    <td>商品</td>
                    <td>物品名称</td>
                    <td>发布价格</td>
                    <td>库存</td>
                </tr>
        
            </table>

            <table class="publish">
                <tr v-for="(item,index) in data" :key="index">
                    <td style="display:none">{{item.gId}}</td>
                    <td><img :src="item.gPic" alt=""></td>
                    <td>{{item.gName}}</td>
                    <td>{{item.gPrice}}</td>
                    <td>{{item.gNum}}</td>
                </tr>
            </table>

            <ul class="pages">
            </ul>
        </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            data:[],
        }
    },
    methods:{
        getMes(){
            this.$axios.post('/api/goods/getMes',{uName:this.$store.state.user.userName})
            .then((res)=>{
                this.data=res.data.data;
            })
            .catch((err)=>{
                console.log(err);
            })
        }       
    },
    mounted(){
        this.getMes()
    }
}
</script>
<style scoped lang="scss">
.content{
    margin: 20px 0;
    img {
    width: 100px;
    height: 40px;
    vertical-align: middle;
    margin-right: 20px;
    }
    span {
    font-size: 26px;
    line-height: 80px;
    /* margin-right: 0px; */
    display: inline-block;
    width: 120px;
    margin-left: 450px;
    }
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
    color: rgb(141, 140, 140);
    font-size: 18px;
}

td {
    text-align: center;
    padding: 10px;
    width: 200px;
}
.publish td{
    img{
    height: 110px;
    }
    overflow: hidden;
}

</style>