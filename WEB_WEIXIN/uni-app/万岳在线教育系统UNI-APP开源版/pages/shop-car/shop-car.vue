<template>

	<view class="liveinfo-wrap">
		<!-- 直播课列表 -->
		<view class="live-list" v-for="(item, index) in live_info" :key="index">
			<view class="live-list-img-wrap">
				<image class="live-list-img" :src="item.thumb" mode="aspectFill"></image>
				<!-- <text class="course-title-icon">直播</text> -->
			</view>

			<view class="live-list-info">
				<view class="live-c-title">{{item.name}}</view>
				<view class="live-status living-status" v-if="item.islive == 1">
					{{item.lesson}}
				</view>
				<view class="live-status" v-else>
					{{item.lesson}}
				</view>
				<view class="live-teacher-price">
					<image class="live-teacher-avatar" :src="item.avatar" mode="aspectFill"></image>
					<text class="teacher-name">{{item.user_nickname}}</text>
					<view class="price-wrap">

						<text class="numPrice">
							{{'¥' + item.payval}}
						</text>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	const app = getApp();

	export default {
		data() {
			return {
				live_info: {}
			}
		},
		onLoad() {
			this.getLiveCourseList();
		},
		methods: {
			getLiveCourseList() {
				let gData = app.globalData;
				uni.request({
					url: gData.site_url + 'Cart.GetList',
					method: 'GET',
					data: {
						'uid': gData.userinfo.id,
						'token': gData.userinfo.token,
					},
					success: res => {
						console.log(res);
						this.live_info = res.data.data.info[0].list;
					},
				});
			},
		}
	}
</script>

<style>
	/* 大班课/内容列表公共样式 */
	@import url("/static/css/course_list.css");

	/* 大班课单独样式 */
	.liveinfo-wrap {
		padding-top: 2rpx;
		min-height: 1500rpx;
		background-color: #FAFAFA;
	}

	.live-list {
		width: 90%;
		height: 190rpx;
		margin: 30rpx auto;
		padding-top: 20rpx;
		box-shadow: 0rpx 0rpx 4rpx 2rpx rgba(0, 0, 0, 0.1);
		border-radius: 8rpx;
		background-color: #FFFFFF;
	}

	.live-c-title {
		line-height: 35rpx;
		height: 40%;
	}

	/* .live-teacher-price {
		margin-top: 10rpx;
	} */
</style>
