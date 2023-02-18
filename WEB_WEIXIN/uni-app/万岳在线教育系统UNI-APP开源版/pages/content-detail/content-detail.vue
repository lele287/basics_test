<template>
	<view class="cdetail-all-wrap">
		<view class="content-title">{{name}}</view>
		<view class="content-time">{{adddtime}}</view>
		<rich-text :nodes="content"></rich-text>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				liveInfo: {},
				name:'',
				adddtime:'',
				content:''
			}
		},
		onLoad(option) {
			this.name = option.name;
			this.adddtime = option.add_time;
			this.content = option.content;
		console.log('aaaaaaa：'+this.content);
		},
		methods: {
			
		}
	}
</script>

<style>
	
	.cdetail-all-wrap {
		width: 92%;
		padding-left: 10rpx;
		margin-top: 60rpx;
	}
	
	.content-title {
		height: 40rpx;
		font-weight: bold;
	}
	
	.content-time {
		font-size: 20rpx;
		color: #969696;
		margin-top: 90rpx;
		margin-bottom: 40rpx;
	}
	
	

</style>
