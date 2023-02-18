// 优质二手
<template>
  <div class="qualitySecond">
    <div class="container">
        <div class="row">
            <div class="lineLeft"><img src="(../assets/images/help.png" alt=""></div>
            <span class="helpThings">优 质 二 手</span>
            <div class="lineRight"><img src="(../assets/images/help.png" alt=""></div>
            <div class="goods">
                <h3>出售二手的好处</h3>
                <span class="goods1">环保。放在家里不用也是浪费，何必制造那么多垃圾呢？</span>
                <span class="goods1">赚零花钱。能赚多少主要看你的东西价值。</span></div>
            <div class="sellingInstructions">
                <h3>出售须知</h3>
                <span class="Instructions">不是所有东西都值得去卖二手。</span>
                <span class="Instructions"> 卖二手很难作为赚钱之道。</span></div>
            <div class="details">
                <h3>省心卖二手</h3> <span class="details1">无需丰富的图片信息，只要仔细对着物品各个面拍，能看清文字信息更佳。</span>
                <span class="details1">说明瑕疵程度，避免争议。</span>
                <span class="details1">写清楚线上还是线下交易。</span>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped>
.qualitySecond{
  width: 1260px;
  height: 800px;
  margin: 0 auto;
  position: relative;
  /* background-color: rgb(253, 213, 253); */
}

.lineLeft {
    position: absolute;
    left: 160px;
    top: 60px;
    width: 240px;
    height: 1px;
    background-color: #ccc;
}

.helpThings {
    font-size: 30px;
    font-weight: 700px;
    width: 100%;
    text-align: center;
    margin-top: 40px;
    /* margin-left:500px; */
}

.lineRight {
    position: absolute;
    left: 860px;
    top: 60px;
    width: 240px;
    height: 1px;
    background-color: #ccc;
}

.row {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.goods,
.sellingInstructions,
.details {
    width: 240px;
    height: 300px;
    background-color: #fff;
    border: 1px solid #ccc;
}

.goods {
    margin-top: 120px;
    display: grid;
    grid-template-columns: 238px;
    grid-template-rows: repeat(3, 70px);
    row-gap: 10px;
    place-items: center;
    margin-left: 80px;
}

.goods h3,
.sellingInstructions h3,
.details h3 {
    font-size: 18px;
    text-align: center;
}

.goods1 {
    display: grid;
    grid-template-columns: 200px;
    text-indent: 2em;
    font-size: 16px;
}

.sellingInstructions {
    margin-top: 120px;
    display: grid;
    grid-template-columns: 238px;
    grid-template-rows: repeat(3, 70px);
    row-gap: 10px;
    place-items: center;
     margin-left: 0px;
}

.Instructions {
    display: grid;
    grid-template-columns: 200px;
    text-indent: 2em;
    font-size: 16px;
}

.details {
    margin-top: 116px;
    display: grid;
    grid-template-columns: 238px;
    grid-template-rows: repeat(3, 70px);
    row-gap: 10px;
    place-items: center;
    margin-right: 80px;
}

.details1 {
    display: grid;
    grid-template-columns: 200px;
    text-indent: 2em;
    font-size: 16px;
}

.ad {
    width: 950px;
    height: 300px;
    margin: 100px auto;
}

.ad img {
    width: 950px;
    height: 300px;
    margin: 0 auto;
}

</style>

