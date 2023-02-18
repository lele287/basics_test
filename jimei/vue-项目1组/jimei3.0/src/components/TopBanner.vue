<template>
	<div class="top-banner clearfix">
		<div class="site-category"
			@mouseleave="evtSideLeave">
			<div class="top-side-left">
				<ul class="side-left">
					<li class="side-item" @mouseenter="evtSideEnter(item.type)" v-for="(item,index) in sideItems" :key="index">
						{{item.content}}
					</li>
				</ul>
			</div>
			<div class="site-category-detail" v-show="goodsStatus">
				<ul class="category-items" v-for="(goods,index) in filterCurrGoods" :key="index">
					<li class="category-goods" v-for="(item,index) in goods" :key="index">
							<a :href="item.sourceUrl"><img :src='item.imgUrl' alt=""/></a>
							<div class="text-name" >
								<a :href="item.sourceUrl">
									{{item.name}}
								</a>
							</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			currGoods: [],
			goodsStatus: false,
			sideItems: [
				{type: 'phones', content: '手机'},
				{type: 'tablet', content: '平板'},
				{type: 'notebook', content: '笔记本'},
				{type: 'desktop', content: '台式机'},
				{type: 'accessories', content: '电脑配件'},],
			phones: [
				{sourceUrl: '/search?searchgClassId=1', imgUrl: require('../assets/images/s1.jpg'), name: '苹果手机'},
				{sourceUrl: '/search?searchgClassId=2', imgUrl: require('../assets/images/s2.jpg'), name: '小米手机'},
				{sourceUrl: '/search?searchgClassId=3', imgUrl: require('../assets/images/s3.jpg'), name: '华为手机'},
				{sourceUrl: '/search?searchgClassId=4', imgUrl: require('../assets/images/s4.jpg'), name: '三星手机'},
				{sourceUrl: '/search?searchgClassId=5', imgUrl: require('../assets/images/s5.jpg'), name: 'oppo手机'},
				{sourceUrl: '/search?searchgClassId=6', imgUrl: require('../assets/images/s6.jpg'), name: 'vivo手机'},
			],
			tablet: [
				{sourceUrl: '/search?searchgClassId=7', imgUrl: require('../assets/images/b1.jpg'), name: '华为平板'},
				{sourceUrl: '/search?searchgClassId=8', imgUrl: require('../assets/images/b2.jpg'), name: 'ipad'},
				{sourceUrl: '/search?searchgClassId=9', imgUrl: require('../assets/images/b3.jpg'), name: '小米平板'},
				{sourceUrl: '/search?searchgClassId=10', imgUrl: require('../assets/images/b4.jpg'), name: '微软'}
			],
			notebook: [
				{sourceUrl: '/search?searchgClassId=11', imgUrl: require('../assets/images/r1.jpg'), name: '联想'},
				{sourceUrl: '/search?searchgClassId=12', imgUrl: require('../assets/images/r2.jpg'), name: '戴尔'},
				{sourceUrl: '/search?searchgClassId=13', imgUrl: require('../assets/images/r3.jpg'), name: '惠普'},
				{sourceUrl: '/search?searchgClassId=14', imgUrl: require('../assets/images/r4.jpg'), name: '华硕'},
				{sourceUrl: '/search?searchgClassId=15', imgUrl: require('../assets/images/r5.jpg'), name: '苹果'},
				{sourceUrl: '/search?searchgClassId=16', imgUrl: require('../assets/images/r6.jpg'), name: '小米'},
			],
			desktop: [
				{sourceUrl: '/search?searchgClassId=17', imgUrl: require('../assets/images/x1.jpg'), name: '宁美国度'},
				{sourceUrl: '/search?searchgClassId=18', imgUrl: require('../assets/images/x2.jpg'), name: '联想'},
				{sourceUrl: '/search?searchgClassId=19', imgUrl: require('../assets/images/x3.jpg'), name: '华硕'},
				{sourceUrl: '/search?searchgClassId=20', imgUrl: require('../assets/images/x4.jpg'), name: '惠普'},
				{sourceUrl: '/search?searchgClassId=21', imgUrl: require('../assets/images/x5.jpg'), name: '名龙堂'},
				{sourceUrl: '/search?searchgClassId=22', imgUrl: require('../assets/images/x6.jpg'), name: '技嘉'},
				{sourceUrl: '/search?searchgClassId=23', imgUrl: require('../assets/images/x7.jpg'), name: '苹果'},
			],
			accessories: [
				{sourceUrl: '/search?searchgClassId=24', imgUrl: require('../assets/images/y1.jpg'), name: '鼠标'},
				{sourceUrl: '/search?searchgClassId=25', imgUrl: require('../assets/images/y2.jpg'), name: '键盘'},
				{sourceUrl: '/search?searchgClassId=26', imgUrl: require('../assets/images/y3.jpg'), name: '耳机'},
				{sourceUrl: '/search?searchgClassId=27', imgUrl: require('../assets/images/y4.jpg'), name: '显示器'},
				{sourceUrl: '/search?searchgClassId=28', imgUrl: require('../assets/images/y5.jpg'), name: '音响'},
				{sourceUrl: '/search?searchgClassId=29', imgUrl: require('../assets/images/y6.jpg'), name: '主板等'},
			],
		}
	},
	ready () {
	},
	computed: {
		filterCurrGoods: function () {
			let filterGoods = [[]]
			this.currGoods.forEach((item, index)=> {
				let goodsIndex = Math.floor(index / 8)
				filterGoods[goodsIndex].push(item)
			})
			return filterGoods
		}
	},
	methods: {
		evtSideEnter (currType) {
			this.currGoods = this[currType]
			this.goodsStatus = true
		},
		evtSideLeave () {
			this.goodsStatus = false
		}
	},
}
</script>

<style scoped lang="scss">
.top-banner {
	position: relative;
	width: 1226px;
	height: auto;
	margin: 0 auto;
}
.site-category {
	position: absolute;
	left: 0;
	top: 0;
	width: 235px;
	height: auto;
	background: rgba(0, 0, 0, 0.3);
	z-index: 15;
}

.side-left {
	margin: 0;
	padding: 0;
	width: 235px;
	height: 500px;
	list-style: none;
	.side-item {
		width: 100%;
		height: 100px;
		line-height: 100px;
		font-size: 18px;
		color: #fff;
		text-align: center;
        overflow: hidden;
        transition: 0.5s ease-out;
		cursor: pointer;
        &:hover {
        background-color: rgb(72, 212, 166);
        color: #fff;
        }
	}
}

.site-category-detail {
	width: 800px;
	height: 500px;
	position: absolute;
	left: 235px;
	top: 0;
	z-index: 10;
	border: 1px solid #e0e0e0;
	box-shadow: 3px 8px 16px rgba(0,0,0,0.18);
	.category-items {
		display: grid;
		height: 500px;
    	place-items: center;
		background-color: #fff;
    	gap:10px;
    	grid-template-columns: repeat(4,180px);
    	grid-template-rows: repeat(2,240px);
	}
	.category-goods {
		display: grid;
  		grid-template-columns: 160px;
  		grid-template-rows: 140px 60px;
  		place-items: center;
  		border: 2px solid transparent;
		&:hover{
			cursor: pointer;
  			transition: .2s ease-out;
  			box-shadow: 0px 0px 7px 1px #ccc;
  			transform: scale(1.01);
		}
		img{
			width: 130px;
  			height: 130px;
		}
		.text-name {
			line-height: 60px;
			font-size: 16px;
			text-align: center;
				a{
					color: tomato;
					text-decoration: none;
				}
		}
		
	}
}
</style>
