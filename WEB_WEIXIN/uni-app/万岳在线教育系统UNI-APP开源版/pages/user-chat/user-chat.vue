<template>
	<view>
		
		<!-- 聊天列表 -->
		<scroll-view scroll-y="true" style="position: absolute;left:0; top: 0; 
		right: 0; bottom: 100rpx;" :scroll-into-view="scrollInto" scroll-with-animation>
			
			<block v-for="(item,index) in list" :key="index">
				<view :id="'chat' +index">
					<user-chat-list :item="item" :index="index"
					:pretime="index > 0 ? list[index-1].create_time : 0">
					</user-chat-list>
				</view>
			</block>
			
		</scroll-view>
		
		
		<!-- 底部操作条 -->
		<bottom-input @submit="submit"></bottom-input>
		<!-- <view style="height: 100rpx;" class="fixed-bottom flex align-center border-top bg-white">
			<input type="text" v-model="content" value="" class="border flex-1 rounded border-lignt-secondary" 
			style="height: 100%; padding: 0 5rpx;" placeholder="文明发言" @confirm="submit"/>
			<view  class="iconfont icon-fatie_icon flex align-center justify-center font-lg animated" hover-class="jello"
			style="width: 100rpx;" @click="submit"></view>
		</view> -->
		
	</view>
</template>

<script>
	
	import userChatList from '@/components/user-chat/user-chat-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	export default {
		components:{
			userChatList,
			bottomInput
		},
		data() {
			return {
				scrollInto:"",
				list:[{
					user_id:2,
					avatar:"/static/demo/user3-128x128.jpg",
					username:"昵称",
					data: "你好啊",
					type: "text", //image, video
					create_time: 1570783350
					
				},{
						user_id:1,
						avatar:"/static/demo/user3-128x128.jpg",
						data: "你好啊",
						username:"昵称",
						type: "text", //image, video
						create_time: 1570783350
					
				}]
			}
		},
		onReady() {
			this.pageToBottom();
		},
		methods: {
			// 发送
			submit(data){
				var old_time = (new Date()).getTime().toString();
				var create_time = old_time.substr(0,10);
				let obj = {
					user_id:1,
					avatar:"/static/demo/user3-128x128.jpg",
					username:"昵称",
					type: "text", //image, video
					data: data,
					create_time: create_time
				}
				
				this.list.push(obj);
				// 滚动到底部
				this.pageToBottom();
			},
			// 滚动到底部
			pageToBottom(){
				let lastIndex = this.list.length - 1;
				if(lastIndex < 0){
					return;
				}
				this.scrollInto = 'chat' + lastIndex;
			}
		}
	}
</script>

<style>

</style>
