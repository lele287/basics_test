<template>
  <div class="OtherGoods container">
    <div class="OtherGoods_content" >
      <div class="rowTitle">
          <img src="../assets/images/line.png" alt="" class="line">
          <span>&nbsp;&nbsp;其 他 商 品&nbsp;&nbsp;</span>
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
        .get("/api/goods/getAllGoods")
        .then((res) => {
        let length = res.data.data.length;
        let index = [];
        let realIndex = [];
        for(let j = 0;j<length;j++){
            index.push(
                res.data.data[j].gId
            )
        }
        function foo(arr){
            let cloneArr = arr.concat();  //数组的复制
            let len = cloneArr.length;
            for(let i = 0 ; i < len ; i++){
                let index = Math.floor(Math.random()*cloneArr.length);
                let temp = cloneArr[index];
                cloneArr[index] = cloneArr[i];
                cloneArr[i] = temp;
            }
            return cloneArr;
        }
        realIndex = foo(index);
          for (let i = 0; i < 12; i++) {
            if(res.data.data[realIndex[i]])
            this.strHtml.push(res.data.data[realIndex[i]]);
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
.OtherGoods_content {
  width: 1260px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
}

.OtherGoods_content {
  max-width: 100%;
}

@media (min-width: 768px) {
  .OtherGoods_content {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .OtherGoods_content {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .OtherGoods_content {
    width: 1170px;
  }
}

.OtherGoods {
  width: 100%;
//   height: 1000px;
  clear: both;
  background-color: rgb(252, 252, 252);
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