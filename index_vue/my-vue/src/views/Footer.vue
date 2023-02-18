<template>
    <div class="footer">
        <div class="content-bx">
            <div class="content-top">
                <div class="content-top-left">
                    <dl class="dls">
                        <dt>服务指南</dt>
                        <dd>品牌真品防伪码</dd>
                        <dd>正品保证</dd>
                        <dd>专属客服服务</dd>
                    </dl>
                    <dl class="dls">
                        <dt>支付方式</dt>
                        <dd>货到付款</dd>
                        <dd>在线支付</dd>
                        <dd>余额支付</dd>
                        <dd>现金券支付</dd>
                    </dl>
                    <dl class="dls">
                        <dt>配送方式</dt>
                        <dd class="dds1">包邮政策</dd>
                        <dd class="dds">配送说明</dd>
                        <dd class="dds">运费说明</dd>
                        <dd class="dds">验货签收</dd>
                    </dl>
                    <dl class="dls">
                        <dt>售后服务</dt>
                        <dd>正品承诺</dd>
                        <dd>售后咨询</dd>
                        <dd>退货政策</dd>
                        <dd>退货办理</dd>
                    </dl>
                    <dl class="dls">
                        <dt>关注我们</dt>
                        <dd class="ddimg">
                            <el-image :src="ewImg1" class="wbs"></el-image>
                            <span class="wbs1">微信二维码</span>
                            <el-image :src="ewImg2" class="wb"></el-image>
                            <span class="wb1">微博二维码</span>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="content-bx1">
            <div class="content-middle">
                <div class="content-middle-left">
                    <el-image :src="rxImg" class="rxImg"></el-image>
                    <p>服务热线</p>
                    <p>400 - 038 - 5580</p>
                </div>
                <div class="content-middle-right">
                    <el-image :src="wxImg" class="img1"></el-image>
                    <el-image :src="wbImg" class="img2"></el-image>
                    <el-image :src="dyImg" class="img2"></el-image>
                    <el-image :src="qqImg" class="img2"></el-image>
                </div>
            </div>
        </div>
        <div class="content">
            <p> ©2018-2020 驰星教育 版权所有 ICP证: 沪ICP备18024971号-1</p>
            <p><a style="color: rgb(0, 0, 0);"
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010402004802"
                    target="_blank">沪公网安备 31010402004802号</a></p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data(){
            return{
                wxImg:require('../assets/wx.png'),
                wbImg:require('../assets/wb.png'),
                dyImg:require('../assets/dy.png'),
                qqImg:require('../assets/qq.png'),
                ewImg1:require('../assets/erweima1.png'),
                ewImg2:require('../assets/erweima2.jpg'),
                rxImg:require('../assets/rx.png'),
            }
        },
        
    }
</script>
<style lang="css" scoped>
.content-bx{
    width: 1190px;
    height: 150px;
}
.content-top{
    width: 1190px;
    margin: 0 auto;
   
}
.content-top-left{
    height: 140px;
    color: #000;
}
.content-top-left dl{
    float: left;
    width: 237px;
}
.content-top-left dt{
    font-size: 16px;
    font-weight: 500;
    margin: 10px 0;
    letter-spacing:1px;
}
.content-top-left dd{
   font-size: 12px;
   color: rgb(0, 0, 0);
   text-align: left;
   margin-top: 5px;
   margin-left: 84px;
   cursor: pointer;
}
.content-middle-left p:nth-child(2){
    margin-left: 140px;
    margin-top: -70px;
    color: #000;
}
.content-middle-left p:nth-child(3){
    margin-left: 181px;
    margin-top: -20px;
    color: #8ef32f;
    font-size: 15px;
}
.wb,.wbs{
    width: 80px;
    height: 80px;
    margin-top: 12px;
    margin-left: 10px;
}
.content-top-left .ddimg{
    position: relative;
    margin-left: 23px;
    margin-top: -5px;
}
.wbs1{
    position: absolute;
    bottom: -22px;
    right: 41px;
}
.wb1{
    position: absolute;
    bottom: -22px;
    right: 134px;
}
.content-bx1{
    width: 100%;
    height: 80px;
}
.content-middle-right{
    width: 600px;
    height: 50px;
    float: right;
    margin-top: 20px;
}
.img1,.img2{
    float: left;
    margin-left: 20px;
}
.img1{
    width: 45px;
    height: 45px;
    margin-top: -2px;
}
.img2{
    width: 40px;
    height: 40px;
}
.content-middle{
    width: 1190px;
    margin: 0 auto;
}
.content-middle-left{
    width: 300px;
    height: 60px;
    float: left;
    margin-top: 15px;
    margin-left: 250px;
}
.rxImg{
    width: 50px;
    height: 50px;
}

.content{
    width: 100%;
    text-align: center;
    clear: both;
    border-top: 1px solid #ccc;
}
.content p {
    width: 1190px;
    height: 30px;
    margin: 0px auto;
    line-height: 30px;
    color: #000;
    /* margin-top: 10px; */
    
}

</style>