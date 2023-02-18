<template>
	<view class="content">
		<view class="in">
			首页
		</view>
		<view v-for="(item,i) in list" :key="item">
			hollo wode
		</view>
		<view class="">
			111
		</view>
		<button @click="open">打开弹窗</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="base" content="提示信息" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		<button type="default" @click="duan()">短震动</button>
		<button type="default" @click="chang()">长震动</button>
	</view>
</template>

<script>
	import {
		uniBadge
	} from '@dcloudio/uni-ui'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniBadge,
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				list: [1, 2, 3, 4, 5]
			}
		},
		onLoad() {

		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close(done) {
				// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
				// ...
				done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done, value) {
				done();
				wx.vibrateLong();
			},
			chang() {
				wx.vibrateLong({

					success: res => {

						console.log(res)

						console.log('长颤抖')

					},

					fail: err => {

						console.log('我就问你为什么不抖动了')

					}

				})
			},
			duan() {
				wx.vibrateShort({
					type:'heavy',

					success: res => {

						console.log(res)

						console.log('短颤抖')

					},

					fail: err => {

						console.log('我就问你为什么不抖动了')

					}

				})
			}
		},

	}
</script>

<style>
	.in {
		font-size: 30rpx;
	}
</style>
