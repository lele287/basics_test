<template>
  <div class="HotGoods container">
    <div class="HotGoods_content" >
      <div class="rowTitle">
          <img src="../assets/images/line.png" alt="" class="line">
          <span>&nbsp;&nbsp;推 荐 商 品&nbsp;&nbsp;</span>
          <img src="../assets/images/line.png" alt="" class="line">
      </div>
      <div style="overflow:hidden">
      <div id="hot" style="transform: translate(0, 0)" ref='goods'>
        <div class="thumbnail" v-for="(item, index) in strHtml" :key="index" @click="lookGood(item.gId)">
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
            <ul class="pager">
              <li class="fa fa-circle" @click="previous" ref="firstLi"></li>
              <li class="fa fa-circle-o" @click="next" ref="secondLi"></li>
              <li class="fa fa-play" @click="controlTimer" ref="thirdLi"></li>
            </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        nextPage:null,
        previousPage:null,
        strHtml: [],
    };
  },
  methods: {
    getHotGoods() {
      this.$axios
        .get("/api/goods/getHotGoods")
        .then((res) => {
          for (let i = 0; i < 8; i++) {
            this.strHtml.push(res.data.data[i]);
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
    },
    next(){
        this.$refs.firstLi.setAttribute('class',"fa fa-circle-o");
        this.$refs.secondLi.setAttribute('class',"fa fa-circle");
        this.$refs.goods.setAttribute('style',"transform: translate(-100%, 0)");
    },
    previous(){
        this.$refs.firstLi.setAttribute('class',"fa fa-circle");
        this.$refs.secondLi.setAttribute('class',"fa fa-circle-o");
        this.$refs.goods.setAttribute('style',"transform: translate(0, 0)");
    },
    controlTimer(){
      if(this.$refs.thirdLi.getAttribute('class')=='fa fa-pause'){
          clearInterval(this.nextPage);
          clearInterval(this.previousPage);
          this.nextPage = null;
          this.previousPage = null;
          this.$refs.thirdLi.setAttribute('class','fa fa-play');
      }else{
        if(this.nextPage == null && this.previousPage == null){
          this.nextPage = setInterval(this.next, 5000);
          this.previousPage = setInterval(this.previous, 10000);
          this.$refs.thirdLi.setAttribute('class','fa fa-pause');
        }
      }
    },
    lookGood(id){
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
  },
  mounted() {
    this.getHotGoods();
    this.controlTimer();
  },
  beforeDestroy() {
      clearInterval(this.nextPage);
      clearInterval(this.previousPage);
  },
};
</script>
<style lang="scss" scoped>
.HotGoods_content {
  width: 1260px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.HotGoods_content {
  max-width: 100%;
}

@media (min-width: 768px) {
  .HotGoods_content {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .HotGoods_content {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .HotGoods_content {
    width: 1170px;
  }
}

.HotGoods {
  width: 100%;
  height: 520px;
  clear: both;
  background-color: rgb(248,248,248);
  position: relative;
  top: 50px;
}

#hot {
  display: flex;
  flex-wrap: nowrap;
  justify-content: start;
  transition: 1s ease-in-out;
}
.pager{
  li{
    margin: 5px;
  }
}
.thumbnail {
  margin: 20px 20px;
  padding: 0;
  border: 1px solid transparent;
  display: grid;
  place-items: center;
  grid-template-columns: 250px;
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
</style>