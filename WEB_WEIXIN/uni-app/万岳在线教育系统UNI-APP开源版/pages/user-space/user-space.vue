<template>
	<view>
		<!-- 头部 -->
		<view class="flex align-center p-3 border-bottom avatar-wrap">
			<image src="/static/demo/user4-128x128.jpg"
			 style="width: 150rpx; height: 150rpx;" class="rounded-circle"></image>
			 <view class="pl-3 flex flex-column flex-1 title-wrap">
			 	<view class="name-id-wrap">
					<text>李二狗</text>
					<text>ID:88881234</text>
					<text class="iconfont icon-jinrujiantou"></text>
				</view>
				<view class="guan-wrap">
					<view class="guanzhu">关注讲师<text>28</text></view>
					<button type="primary" size="mini" class="teacher-main-btn" style="">
						讲师主页
					</button>
				</view>
			 </view>
		</view>
		
		
		 <template>
			 <view class="animated fast fadeIn"> 	
				<view class="p-3">
					
					<uni-list-item title="已购买" showExtraIcon>
						<text slot="icon" class="iconfont icon-liulan"></text>
					</uni-list-item>
					<uni-list-item title="意见反馈" showExtraIcon>
						<text slot="icon" class="iconfont icon-renzheng"></text>
					</uni-list-item>
					<uni-list-item title="关于我们" showExtraIcon>
						<text slot="icon" class="iconfont icon-weibiaoti525"></text>
					</uni-list-item>
					<uni-list-item title="设置" showExtraIcon>
						<text slot="icon" class="iconfont icon-weibiaoti525"></text>
					</uni-list-item>
					
				</view>
			</view>
		 </template>
		 
		 <!-- 公共tab -->
		 
		 
		
	</view>
</template>

<script>
	const demo = [
		{
			username:"昵称",
			userpic: "/static/tabbar/avatar.png",
			newstime: "2019-10-20",
			isFollow:false,
			title: "我是标题",
			titlepic:"/static/demo/photo1.png",
			support:{
				type: "support",
				support_count:1,
				unsupport_count:2
			},
			comment_count:2,
			share_num:2
		},
		{
			username:"昵称",
			userpic: "/static/tabbar/avatar.png",
			newstime: "2019-10-20",
			isFollow:false,
			title: "我是标题",
			titlepic:"",
			support:{
				type: "support",
				support_count:1,
				unsupport_count:2
			},
			comment_count:2,
			share_num:2
		},
		{
			username:"昵称",
			userpic: "/static/tabbar/avatar.png",
			newstime: "2019-10-20",
			isFollow:false,
			title: "我是标题",
			titlepic:"",
			support:{
				type: "", //未操作
				support_count:1,
				unsupport_count:2
			},
			comment_count:2,
			share_num:2
		}
	];
	
	import commonList from '@/components/common/common-list.vue';
	import loadMore from '@/components/common/load-more.vue';
	import uniPopup from '@/components/uni-ui/uni-popup/uni-popup.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	
	export default {
		components:{
			commonList,
			loadMore,
			uniPopup,
			uniListItem
		},
		data() {
			return {
				tabIndex:0,
				tabBars:[{
					name: "主页",
				},{
					name: "帖子",
					list: demo,
					loadMore: "上拉加载更多"
				},{
					name:"动态",
					list:[]
				}],
			}
		},
		onNavigationBarButtonTap() {
			this.$refs.popup.open();
		},
		computed:{
			list(){
				return this.tabBars[this.tabIndex].list;
			},
			loadmore(){
				return this.tabBars[this.tabIndex].loadmore;
			}
		},
		methods: {
			changeTab(index){
				this.tabIndex = index;
			},
			// 关注
			follow(e){
				// 拿到当前选项卡对应的list
					let list = this.tabBars[this.tabIndex].list;
					list[e].isFollow = true;
					uni.showToast({
						title: '关注成功'
					});
			},
			//顶踩操作
			doSupport(e){
				//拿到当前的选项卡对应的list
				let list = this.tabBars[this.tabIndex].list;
				//拿到当前对象
				let item = this.list[e.index];
				let msg = e.type === 'support' ? '顶' : '踩';
				
				//判断之前是否已经顶踩
				if(item.support.type === ''){
					item.support[e.type+'_count']++;
				} else if(item.support.type === 'support' && e.type === 'unsupport'){
					//顶 -1
					item.support.support_count--;
					//踩 +1
					item.support.unsupport_count++;
				} else if(item.support.type === 'unsupport' && e.type === 'support'){
					//之前踩了
					// 顶+1
					item.support.support_count++;
					// 踩-1
					item.support.unsupport_count--;
				}
				
				item.support.type = e.type;
				uni.showToast({title: msg + '成功'})	;
			}
			
		}
	}
</script>

<style>
	
	.avatar-wrap {
		background-color: #1FDCA9;
	}
	
	.name-id-wrap {
		height: 120rpx;	
		background-color: #1FDCA9;
		position: relative;
		color: #FFFFFF;
	}
	.name-id-wrap text:first-child {
		display: block;
		margin-top: 40rpx;
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.name-id-wrap text:nth-child(2) {
		display: block;
		margin-top: 10rpx;
	}
	
	.name-id-wrap text:nth-child(3) {
		position: absolute;
		right: 0rpx;
		top: 30%;
		color: #FFFFFF;
	}
	
	/* 关注教师 */
	.guan-wrap {
	    width: 100%;
		height: 60rpx;
		margin-top: 60rpx;
		color: #FFFFFF;
	}
	
	.guanzhu {
		float: left;
	}
	
	.teacher-main-btn {
		float: left;
		height: 50rpx;
		line-height: 50rpx;
		margin-left: 180rpx;
		background-color:transparent; 
		color: #FFFFFF;
		border: 2rpx solid #FFFFFF;
		border-radius: 40rpx 40rpx;
	}
	
	/* 个人中心下半部分文字标题 */
	.user-bottom-icon-left {
		display: inline-block;	
		width: 7%;
	}
	
	.user-bottom-title {
		display: inline-block;
		width: 18%;
	}
	
	.user-bottom-icon {
		display: inline-block;
		text-align: right;
		width: 69%;
	}
	
	
</style>
