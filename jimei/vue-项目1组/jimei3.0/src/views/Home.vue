// 首页
<template>

<div>  
  <div class="home">
    <!-- 搜索 -->
    <SearchBox/>
    <!-- 侧边分类 -->
    <TopBanner/>
    <!-- 轮播图 -->
    <SlideShow/>
    <!-- 回到顶部 -->
    <GoTop/>
  </div>
    <!-- 热门商品 -->
    <HotGoods/>
    <!-- 本站数据 -->
    <WebData/>
    <!-- 新品上市 -->
    <NewGoods/>
    <!-- 其他商品 -->
    <OtherGoods/>
  </div>
</template>
<script>
import SearchBox from '@/components/SearchBox.vue'
import SlideShow from '@/components/SlideShow.vue'
import TopBanner from '@/components/TopBanner.vue'
import GoTop from '@/components/GoTop.vue'
import HotGoods from '@/components/HotGoods.vue'
import WebData from '@/components/WebData.vue'
import NewGoods from '@/components/NewGoods.vue'
import OtherGoods from '@/components/OtherGoods.vue'
export default {
  name: 'Home',
  components: {
    SearchBox,
    SlideShow,
    TopBanner,
    GoTop,
    HotGoods,
    WebData,
    NewGoods,
    OtherGoods
  }
}
</script>
<style lang="scss">
.home{
  width: 1260px;
  margin: 0 auto;
  position: relative;
  background-color: rgb(255,255,255);
}
.anchorBL{
        display:none
    }
.rowTitle{
  height: 80px;
  overflow: hidden;
  color:rgb(72, 212, 166);
  span{
    width: 150px;
    font-size:22px;
    line-height: 80px;
    display: inline-block;
  }
  .line {
    vertical-align: top;
    line-height: 80px;
    height: 80px;
    max-width: 20%;
  }
}
</style>
