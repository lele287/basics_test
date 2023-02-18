<template>
	<view>
		
		<!-- tab -->
		<view class="flex align-center" style="height: 100rpx;">
			<view class="flex-1 flex align-center justify-center"
			v-for="(item,index) in tabBars" :key="index"
			:class="index === tabIndex ? 'text-main font-lg font-weight-bold':'font-md'"
			@click="changeTab(index)">{{item.name}} 
			<text v-if="item.num > 0" class="ml-2">{{item.num}}</text>
			</view>
		 </view>
			
			<!-- 列表 -->
		<view class="uni-tab-bar">
			<swiper class="swiper-box" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="onChangeTab">
				<swiper-item v-for="(items,index) in newlist" :key="index">
					<scroll-view scroll-y class="list" @scrolltolower="loadmore(index)">
					  <template v-if="items.list.length>0">
						<!-- 列表 -->
					   <block v-for="(item2,index2) in items.list" :key="index2">
							<!-- 列表样式 -->
							<user-list :item="item2" :index="index"></user-list>
						
					   </block>
					   <!-- 上拉加载 -->
					   <load-more v-if="items.list.length > 10" :loadmore="items.loadmore"></load-more>
					   </template>
					   
					   <template v-else>
						  <no-thing></no-thing>
					   </template>
					  
					</scroll-view>
				</swiper-item>
			</swiper>
			
		</view>	
			 

	</view>
</template>

<script>
	
	const demo = [{
		avatar:"/static/demo/avatar2.png",
		username:"昵称",
		sex:1, //0未知, 1女性, 2男性
		age:24,
		isFollow:true
	},{
		avatar:"/static/demo/avatar5.png",
		username:"昵称",
		sex:2, //0未知, 1女性, 2男性
		age:24,
		isFollow:false
	}];
	
	import loadMore from '@/components/common/load-more.vue';
	import noThing from '@/components/common/no-thing.vue';
	import userList from '@/components/user-list/user-list.vue';
	export default {
		components:{
			loadMore,
			noThing,
			userList
		},
		data() {
			return {
				// 列表高度 
				swiperheight:600,
				tabIndex:0,
				tabBars:[{
					name: "互关",
					num:0
				},{
					name: "关注",
					num:2
				},{
					name:"粉丝",
					num:30
				}],
				newlist:[]
			}
		},
		// 监听点击输入框事件
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url: '../search/search?type=user'
			});
		},
		onNavigationBarButtonTap() {
			uni.navigateBack({
				delta: 1
			});
		},
		onLoad() {
			uni.getSystemInfo({
				success:(res)=>{
					let height = res.windowHeight-uni.upx2px(100)
					this.swiperheight = height;
				}
			 })
			 // 根据选项生成列表
			 this.getData();
		},
		methods: {
			// 获取数据 
			getData(){
				var arr = [];
				for (let i = 0; i < this.tabBars.length; i++) {
					let obj = {
						loadmore:"",
						list:[]
					}
					if(i<2) {
						obj.list = demo;
						obj.loadmore = '上拉加载更多';
					}
					arr.push(obj);
				}
				this.newlist = arr;
			},
			changeTab(index){
				this.tabIndex = index;
			},
			//监听滚动
			onChangeTab(e){
				// this.changeTab(e.detail.current);
				this.tabIndex = e.detail.current;
			},
			// 上拉加载更多
			loadmore(index){
				//拿到当前列表
				let item = this.newlist[index];
				// 判断是否处于可加载状态
				if(item.loadmore !== '上拉加载更多') return;
				
				item.loadmore = '加载中...';
				//模拟数据请求
				setTimeout(()=>{
					// 加载数据
					item.list = [...item.list,...item.list];
					item.loadmore = '上拉加载更多';
				},2000);
			}
		}
	}
</script>

<style>

</style>
