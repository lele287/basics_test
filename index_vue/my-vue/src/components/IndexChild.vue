<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
      <h1>{{msg}}</h1>
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="(i,index) in count" class="list-item" :key="index">{{ i }}</li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>

<script>
export default {
   data() {
    return {
        name: 'IndexChild',
        props: {
            msg: String
    }
  }
    }
}
</script>