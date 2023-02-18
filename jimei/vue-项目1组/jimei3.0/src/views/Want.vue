// 求购
<template>
  <div class="allWant">
    <div class="want">
        <div class="wantLable" v-for="(item,index) in strHTML" :key="index">
            <div class="top_Message">
                <span class="userName">{{item.uName}}</span>
                <span class="userSchool">
                    <span v-if="item.uSchool">{{item.uSchool}}</span>
                    <span v-else>保密</span>
                    
                </span>
                <span class="setTime">发布于:{{item.wantTime}}</span>
            </div>
            <div class="want_title">
                <span>{{item.wantName}}</span>
            </div>
            <div class="want_Message">
                <span class="detailed_information">{{item.wantMes}}</span>
                <span class="user_Phone">期望价格：
                    <span>{{item.wantPrice}}</span>
                </span>
                <span class="user_Phone">联系电话：
                    <span v-if="item.wantPhone">{{item.wantPhone}}</span>
                    <span v-else>{{item.uPhone}}</span>
                </span>
            </div>
        </div>

    </div>
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
</template>
<script>
export default {
    data(){
        return {
            strHTML:[],
            pageSize:5,
            pageCount:0,
            total:0,
            currentPage:1
        }
    },
    mounted(){
        this.getMes();
    },
    methods:{
        currentChange(currentPage){
            // console.log(currentPage)
            this.currentPage = currentPage;
            this.getMes(this.strHTML);
        },
        getMes(){
            this.$axios.post('/api/userwant/getAllMes')
            .then((res)=>{
                let getMes = [];
                for(let i = 0 ; i < res.data.data.length ; i++){
                    res.data.data[i].wantTime = res.data.data[i].wantTime.replace(/T/g, " ").substring(0,res.data.data[i].wantTime.replace(/T/g, " ").length-2)
                }
                for(let i = 0 ; i < res.data.data.length ; i++){
                    getMes.push(res.data.data[i])
                }
                // console.log(getMes)
                this.showMes(getMes)
                // console.log(this.strHTML)
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        showMes(data){
            // console.log(data)
            let showData = [];
            this.total = data.length;
            this.pageCount = Math.ceil(this.total / this.pageSize);
            for(let i = (this.currentPage-1) * this.pageSize;i < this.currentPage * this.pageSize;i++){
                if(data[i]){
                // console.log(data[i])
                showData.push(data[i])
                }
                else{
                    break;
                }
            }
            // console.log(showData)
            this.strHTML=showData
            // console.log(this.strHTML)
        }
    }
}
</script>
<style scoped>
.block{
    text-align:center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}
.allWant{
  width: 1260px;
  margin: 0 auto;
  position: relative;
  min-height: 726px;
}
.top_Message {
    margin-bottom: 20px;
}
.want{
    overflow: hidden;
}
.wantLable {
    margin: 50px auto;
    width: 900px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 212px;
    padding: 15px;
}

.userName {
    font-size: 1.1em;
}

.userSchool,
.setTime {
    font-size: 0.9em;
    color: #aaa;
    margin-left: 15px;
}

.want_title span {
    font-size: 1.3em;
    font-weight: 700;
    letter-spacing: 2px;
}

.want_Message {
    margin-top: 10px;
}

.detailed_information {
    display: block;
    margin-bottom: 15px;
    min-height: 100px;
}

.user_Phone {
    font-size: 0.9em;
    color: #aaa;
    margin-right: 10px;
}

.wantLable:hover {
    cursor: default;
    transition: 0.2s ease-out;
    box-shadow: 0px 3px 7px 1px #ccc;
    transform: translate(0, -1px);
}
</style>


