<template>
	<view>
		<!-- 帖子详情页详细信息 -->
		<common-list :item="info" isdetail @follow="follow" @doSupport="doSupport"
		 @doComment="doComment" @doShare="doShare">
			<view>{{info.content}}</view>
			<view>
				<image v-for="(item,index) in info.images" :key="index" :src="item.url" @click="preview(index)"
				 class="w-100" mode="widthFix"></image>
			</view>
		</common-list>
		
		<!-- 分割线 -->
		<divider></divider>
		<view class="p-2 font-md font-weight-bold">
			最新评论 3
		</view>
		<view class="px-2">
			<view class="uni-comment-list">
				<view class="uni-comment-face">
					<image src="/static/demo/avatar5.png" mode="widthFix"></image>
				</view>
				<view class="uni-comment-body">
					<view class="uni-comment-top">
						<text>1111111</text>
					</view>
					<view class="uni-comment-date">
					<view class="uni-comment-content">3333333333</view>
						<text>2222</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<bottom-input @submit="submit"></bottom-input>
		
		<more-share ref="share"></more-share>
		
		
	</view>
</template>

<script>
	import commonList from '@/components/common/common-list.vue'
	import bottomInput from '@/components/common/bottom-input.vue';
	import moreShare from '@/components/common/more-share.vue';
	export default {
		components:{
			commonList,
			bottomInput,
			moreShare
		},
		data() {
			return {
				//当前帖子信息
				info:{
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
					share_num:2,
					content: "我是内容",
					images:[{
						url:"/static/demo/photo1.png"
					},{
						url:"/static/demo/photo1.png"
					}]
					
				}
			}
		},
		onLoad(e){
			//初始化
			if(e.detail){
				this.__init(JSON.parse(e.detail));
			}
		},
		computed:{
			imagesList(){
				return this.info.images.map(item=>item.url);
			}
		},
		onNavigationBarButtonTap() {
			 this.$refs.share.open();
		},
		onBackPress() {
			this.$refs.share.close();
		},
		methods: {
			__init(data){
				//修改标题
				uni.setNavigationBarTitle({
					title: data.title
				})
				// 请求api
				
			},
			// 点击评论
			doComment(){
				
			},
			// 点击分享
			doShare(){
				
			},
			//关注
			follow(){
				this.info.isFollow = true;
				uni.showToast({
					title: '关注成功'
				})
			},
			// 顶踩操作
			doSupport(e){
				// 之前操作过
				if(this.info.support.type === e.type){
					return uni.showToast({
						title: '你已经操作过了'
					});
				}
				let msg = e.type === 'support' ? '顶' : '踩'; 
				// 判断之前有没有操作过
				if(this.info.support.type === '') {
					item.support[e.type + '_count']++;
				} else if(this.info.support.type === 'support' && e.type === 'unsupport'){
					//顶 -1
					this.info.support.support_count--;
					// 踩 +1
					this.info.support.unsupport_count++;
				} else if(this.info.support.type === 'unsupport' && e.type === 'support'){
					//顶 +1
					this.info.support.support_count++;
					// 踩-1
					this.info.support.unsupport_count--;
				}
				this.info.support.type = e.type;
				uni.showToast({
					title: msg
				});
			},
			//预览图片
			preview(index){
				 // 预览图片
				uni.previewImage({
					current:index,
					urls: this.imagesList
					
				});
			},
			// 提交评论
			submit(data){
				console.log(data);
			}
		}
	}
</script>

<style>

</style>
