<template>
  <div class="SearchBox">
    <div class="search_content">
    <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
    <el-button icon="el-icon-search" circle @click="search()"></el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchBox",
  data() {
    return {
      input: "",
    };
  },
  methods:{
    search(){
      this.$emit('fuzzySearch',this.input)
      this.$router.push({
          path:'search',query:{searchThing:this.input}
      })
    }
  }
};

</script>
<style lang="css" scoped>
.el-input{
    float: left;
    width: 600px;
    line-height: 60px;
}
.el-button {
    margin-top: 10px;
}
.SearchBox {
  width: 100%;
  height: 60px;
  background-color:transparent;
}
.search_content{
  width: 650px;
  height: 60px;
  margin: 0 auto;
}
</style>