<template>
  <div class="NewGoods container">
    <div class="NewGoods_content" >
      <div class="rowTitle">
          <img src="../assets/images/line.png" alt="" class="line">
          <span>&nbsp;&nbsp;新 品 上 市&nbsp;&nbsp;</span>
          <img src="../assets/images/line.png" alt="" class="line">
      </div>
      <div style="overflow:hidden">
      <div id="hot" ref='goods'>
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
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        strHtml: [],
    };
  },
  methods: {
    getHotGoods() {
      this.$axios
        .get("/api/goods/getNewGoods")
        .then((res) => {
          for (let i = 0; i < 4; i++) {
            this.strHtml.push(res.data.data[i]);
          }
        })
        .catch((err) => {
          console.log("err:", err);
        });
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
  },
};
</script>
<style lang="scss" scoped>
.NewGoods_content {
  width: 1260px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.NewGoods_content {
  max-width: 100%;
}

@media (min-width: 768px) {
  .NewGoods_content {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .NewGoods_content {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .NewGoods_content {
    width: 1170px;
  }
}

.NewGoods {
  width: 100%;
  clear: both;
  background-color: rgb(248, 248, 248);
  position: relative;
}

#hot {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  transition: 1s ease-in-out;
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