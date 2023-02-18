// 搜索
<template>
  <div class="search">
    <SearchBox @fuzzySearch="fuzzySearch" />
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      style="height: 50px; line-height: 50px; font-size: 15px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>搜索结果</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <div class="row">
        <ul class="classify">
          <li>分类</li>
        </ul>
        <ul class="classify">
          <li>价格：</li>
          <li><a href="#" @click="classifyByPrice('500以下')">500以下</a></li>
          <li><a href="#" @click="classifyByPrice('500-2000')">500-2000</a></li>
          <li>
            <a href="#" @click="classifyByPrice('2000-3500')">2000-3500</a>
          </li>
          <li>
            <a href="#" @click="classifyByPrice('3500-5000')">3500-5000</a>
          </li>
          <li><a href="#" @click="classifyByPrice('5000以上')">5000以上</a></li>
        </ul>
        <!-- <ul class="classify">
          <li>可否小刀：</li>
          <li>
            <input
              type="radio"
              name="dao"
              value="ydao"
              id="ydao"
              @click="classifyByDiscount('可')"
            />
            <label
              for="ydao"
              style="font-weight: 500"
              >可</label
            >
          </li>
          <li>
            <input
              type="radio"
              name="dao"
              value="ndao"
              id="ndao"
              @click="classifyByDiscount('否')"
            />
            <label
              for="ndao"
              style="font-weight: 500"
              >否</label
            >
          </li>
        </ul> -->
      </div>
    </div>
    <el-divider></el-divider>
    <span @click="priceAscending()" class="sort">价格升序 ↑</span>
    <span @click="priceDescending()" class="sort">价格降序 ↓</span>
    <div class="searchGoods container">
      <div class="searchGoods_content">
        <div style="overflow: hidden">
          <div id="hot" ref="goods">
            <div v-if="status" class="noGood">暂时没有商品哦</div>
            <div
              class="thumbnail"
              v-for="(item, index) in strHtml"
              :key="index"
              @click="lookGood(item.gId)"
            >
              <img :src="item.gPic" alt="..." />
              <div class="good-top">
                <span>{{ item.gName }}</span>
                <span style="display: none">{{ item.gId }}</span>
              </div>
              <div class="good-bottom">
                <p>
                  价格:<span style="color: red">{{ item.gPrice }}元</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <el-pagination
          @current-change="changePage"
          :current-page="currentPage"
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="recordCount"
          hide-on-single-page
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import SearchBox from "@/components/SearchBox.vue";
export default {
  name: "Search",
  components: {
    SearchBox,
  },
  data() {
    return {
      data: null,
      currentPage:1,
      recordCount: 0,
      pageSize: 16,
      pageCount: 0,
      priceNum:0,
      discountNum:0,
      status:false,
      strHtml: [],
      newData:[],
    };
  },
  created() {
    if(Object.keys(this.$route.query)[0]=='searchThing'){
      this.fuzzySearch(this.$route.query.searchThing);   
    }
    else{
      this.searchByCategory(this.$route.query.searchgClassId);
    }
  },
  methods: {
    //模糊查询
    fuzzySearch(result) {
      this.newData = [];
      this.strHtml = [];
      this.currentPage = 1;
      this.$axios
        .get("/api/goods/searchLikeGoods", {
          params: {
            gName: result,
          },
        })
        .then((res) => {
          this.data = res.data.data
          this.traverseGoods(this.data)
        })
        .catch((err) => {
          console.log("err", err);
        });
    },
    //遍历商品
    traverseGoods(data){
      this.status=false;
      this.recordCount = data.length;
      this.pageCount = Math.ceil(this.recordCount / this.pageSize);
        if (data.length > 0) {
          for (let i = (this.currentPage-1) * this.pageSize;i < this.currentPage * this.pageSize;i++) {
            if (data[i]) {
              this.strHtml.push(data[i]);
            }
          }
        } else {
          this.status=true;
        }
    },
    //按分类查询
    searchByCategory(result) {
      this.newData = [];
      this.strHtml = [];
      this.currentPage = 1;
      this.$axios
        .get("/api/goods/getGoodsBygClassId", {
          params: {
            gClassId: result,
          },
        })
        .then((res) => {
          this.data = res.data.data
          this.traverseGoods(this.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //按价格区间分类
    classifyByPrice(result) {
      this.currentPage = 1
      this.newData = [];
      this.strHtml = [];
      if(result=='500以下'){
          this.priceNum = 1
      }else if(result=='500-2000'){
          this.priceNum = 2
      }else if(result=='2000-3500'){
          this.priceNum = 3
      }else if(result=='3500-5000'){
          this.priceNum = 4
      }else if(result=='5000以上'){
          this.priceNum = 5
      };
      this.$axios
        .get("/api/goods/getGoodsByPriceLevel",{
          params:{priceId:this.priceNum}
        })
        .then((res)=>{
          for(let i = 0;i<res.data.data.length;i++){
            for(let j = 0;j<this.data.length;j++){
              if((res.data.data[i].gId==this.data[j].gId)&&this.newData.indexOf(res.data.data[i])==-1){
                  this.newData.push(res.data.data[i])
                }
              }
            }
            this.newData=JSON.parse(JSON.stringify(this.newData))
          this.traverseGoods(this.newData)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    //按可否小刀排序
    classifyByDiscount(result) {
      this.currentPage = 1
      if(result=='可'){
        this.discountNum = 1;
      }else if(result=='否'){
        this.discountNum = 0;
      };
      this.$axios
        .get("/api/goods/getGoodsByDiscount",{
          params:{gDiscount:this.discountNum}
        })
        .then((res)=>{
          console.log(res.data.data)
        })
        .catch((err)=>{
          console.log(err)
        })
    },
    //按价格升序
    priceAscending(){
      let newArr=[];
        this.currentPage = 1
        function sortprice(a, b) {
            return a.gPrice- b.gPrice
        }
        if(JSON.parse(JSON.stringify(this.newData)).length == 0){
          newArr = this.data
        }else{
          newArr = this.newData
        }
        newArr.sort(sortprice);
        this.recordCount = newArr.length;
        this.pageCount = Math.ceil(this.recordCount / this.pageSize);
        this.showData(newArr);
    },
    //按价格降序
    priceDescending(){
      let newArr = []
        this.currentPage = 1
        function sortprice(b, a) {
            return a.gPrice- b.gPrice
        }
        if(JSON.parse(JSON.stringify(this.newData)).length == 0){
          newArr = this.data
        }else{
          newArr = this.newData
        }
        newArr.sort(sortprice);
        this.recordCount = newArr.length;
        this.pageCount = Math.ceil(this.recordCount / this.pageSize);
        this.showData(newArr);
    },
    //更换当前页
    changePage(currentPage){
      this.currentPage = currentPage;
      if(JSON.parse(JSON.stringify(this.newData)).length==0){
        this.showData(this.data);
      }else{
        this.showData(this.newData)
      }

    },
    //更换当前页显示数据
    showData(data){
      this.strHtml=[];
        if (data.length > 0) {
          for (let i = (this.currentPage-1) * this.pageSize;i < this.currentPage * this.pageSize;i++) {
              if (data[i]) 
              this.strHtml.push(data[i]);
          }
        }
    },
    //查看商品
    lookGood(id) {
      this.$router.push({
        path: `/detail?gId=${id}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  width: 1260px;
  // height: 1000px;
  margin: 0 auto;
  position: relative;
}

.classify {
  width: 100%;
  height: 48px;
  overflow: hidden;
  margin-bottom: 10px;
  position: relative;
  list-style: none;
  li {
    line-height: 48px;
    width: 200px;
    text-align: center;
    font-size: 20px;
    float: left;
    a {
      width: 100%;
      text-decoration: none;
      display: inline-block;
      color: #333;
      &:hover {
        color: rgb(0, 128, 0);
        background-color: #eee;
      }
    }
  }
}
.searchGoods_content {
  width: 1260px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.searchGoods_content {
  max-width: 100%;
}

.searchGoods {
  width: 100%;
  clear: both;
  background-color: rgb(248, 248, 248);
  position: relative;
  margin-bottom: 20px;
}

#hot {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  transition: 1s ease-in-out;
}
.thumbnail {
  margin: 20px 20px;
  padding: 0;
  border: 1px solid transparent;
  display: grid;
  place-items: center;
  grid-template-columns: 270px;
  grid-template-rows: 230px 60px 50px;
  background-color: rgb(255, 255, 255);
  transition: border 0.2s ease-in-out;
  img {
    width: 160px;
  }
  h3 {
    font-size: 18px;
    margin-left: 1px;
  }
  &:hover {
    cursor: pointer;
    transition: 0.2s ease-out;
    box-shadow: 0px 3px 7px 1px #ccc;
    transform: scale(1.01);
    transform: translate(0, -2px);
    .good-top span {
      transition: 0.2s ease-out;
      font-weight: 600;
    }
    .good-bottom p {
      transition: 0.2s ease-out;
      font-weight: 600;
    }
  }
}
.sort{
  display: inline-block;
  width: 100px;
  height: 30px;
  cursor: pointer;
  text-align: center;
  line-height: 30px;
}
.noGood{
  width: 100%;
  height: 500px;
  font-size: 40px;
  text-align: center;
  line-height: 500px;
}
</style>
