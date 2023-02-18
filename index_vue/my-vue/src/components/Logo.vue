<template>
    <div class="logo">
        <el-image :src="logoImg" class="logoImg"></el-image>
    </div>
</template>

<script>
export default {
    name:'Logo',
    data(){
        return{
            logoImg: require("../assets/logo.gif"),
        }
    }
}
</script>

<style lang="css" scoped>
.logoImg {
    width: 190px;
    height: 60px;
    position: relative;
    top: 55px;
    left: -500px;
}
</style>