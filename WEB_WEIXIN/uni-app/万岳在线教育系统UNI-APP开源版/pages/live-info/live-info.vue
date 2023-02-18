<!-- 直播间页面 -->
<template>
	<view class="live-all-wrap">
		<!-- 直播窗口 -->
		
			
			<template v-if="phonetype == 1">
				<view class="video-wrap">
					<TestText ref="videoAdnroid" tel="xxxxxx" class="video-wrap"></TestText>
				</view>
			</template>
			<template v-else-if="phonetype == 2">
				<view class="video-wrap">
					<dc-TestComponent ref="videoIos" appid="xxxxxx" class="video-wrap"></dc-TestComponent>
				</view>
			</template>
			<template v-else-if="phonetype == 3">
				<div id="remoteContainer" ref="remotecontainer">
					<div id="subremoteContainer" class="video-wrap"></div>
				</div>
			</template>
			<template v-else>
				
				<!-- #ifdef MP-WEIXIN -->
				<live-player id="player" class='video-wrap' src="wechatliveurl" mode="RTC" autoplay="true" bindstatechange="playerstatechange" />
				<!-- #endif -->
			</template>
		
		<!-- 聊天区域 -->
		<view class="talk-wrap">
			<!-- tab标签 -->
			<!-- <uni-nav-bar class="tabclass" :border="false" :statusBar="true" @clickRight="openAddInput"> -->
				<view class="flex align-center justify-center font-weight-bold course-tab">
					<view class="mx-5" @click="changeTab(index)" v-for="(item, index) in tabBars" :key="index" :class="tabIndex === index ? 'text-main font-lg' : 'font-md text-light-muted'">
						{{item.name}}
					</view>
				</view>
			<!-- </uni-nav-bar> -->

			<swiper :current="tabIndex" class="swiper-box" :style="{height:scrollH+'rpx'}" @change="onChangeTab">
				<!-- 讲师区 -->
				<swiper-item>
					<!-- 聊天列表 -->
					<scroll-view scroll-y="true" style="position: absolute;left:0; top: 0; 
			        right: 0; bottom: 10rpx;"
					 :scroll-into-view="scrollInto" scroll-with-animation>

						<block v-for="(item,index) in list" :key="index">
							<view v-if="item.user_type == 1" :id="'chat' +index">
								<user-chat-list :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0">
								</user-chat-list>
							</view>
						</block>

					</scroll-view>
				</swiper-item>
				<!-- 讨论区 -->
				<swiper-item>
					<scroll-view scroll-y="true" style="position: absolute;left:0; top: 0; 
			        right: 0; bottom: 10rpx;"
					 :scroll-into-view="scrollInto" scroll-with-animation>
						<block v-for="(item,index) in list" :key="index">
							<view :id="'chat' +index">
								<user-chat-list :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0">
								</user-chat-list>
							</view>
						</block>
					</scroll-view>
				</swiper-item>
				<!-- 问答区 -->
				<swiper-item>
					<scroll-view scroll-y :style="'height:' + scrollH+'rpx;'">
						<block v-if="isQue" v-for="(item,index) in list" :key="index">
							<view v-if="item.msgtype == '1'" :id="'chat' +index">
								<user-chat-list :item="item" :index="index" :pretime="index > 0 ? list[index-1].create_time : 0">
								</user-chat-list>
							</view>
						</block>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 底部操作条 -->
		<bottom-input @submit="submit" @question="question"></bottom-input>
	</view>
</template>

<script>
	//<live-player id="player" src="{{wechatliveurl}}" mode="RTC" bindstatechange="playerStateChange" object-fit="fillCrop" />

	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import userChatList from '@/components/user-chat/user-chat-list.vue';
	import bottomInput from '@/components/common/bottom-input.vue';
	import io from '@hyoga/uni-socket.io';
	import md5_js from "@/static/js/md5.js";
	// #ifdef H5
	import AgoraRTCH5 from "./AgoraRTCSDK-3.0.1.js";
	// #endif
	// #ifdef MP-WEIXIN
	import AogoraWechat from "./Agora_Miniapp_SDK_for_WeChat.js"
	// #endif

	const app = getApp();
	//连接socket
	const socket = io((app.globalData.socket_url), {
		query: {},
		transports: ['websocket', 'polling'],
		timeout: 5000
	});
	export default {
		components: {
			uniNavBar,
			userChatList,
			bottomInput
		},
		data() {
			return {
				scrollH: 500,
				tabIndex: 0,
				tabBars: [{
					name: "讲师区"
				}, {
					name: "讨论区"
				}, {
					name: "问答区"
				}],
				scrollInto: "",
				scrollTop: "",
				list: [],
				chatContent: '', //聊天内容
				isConnectSocket: false, //是否连接socket
				liveInfo: {
					'liveuid': '',
					'courseid': ''
				},
				userInfo: {},
				isQue: false,
				//直播添加
				agoraappid: '',
				agoramRoomName: '',
				agorauid: '',
				phonetype: 0,
				wechatliveurl: ''
			}
		},
		//agora离开通道
		onUnload: function() {
			// #ifdef H5
			AgoreRTCH5.client().leave();
			// #endif
			// #ifdef MP-WEIXIN
			AogoraWechat.Client().level();
			// #endif
		},
		onReady() {
			this.pageToBottom();
		},
		onLoad(option) {
			if (app.globalData.userinfo == '') {
				uni.navigateTo({
					url: '../login/login'
				})
				return;
			}
			// #ifdef MP-WEIXIN
			console.log("运行在小程序");
			this.phonetype = 4;
			// #endif
			// #ifdef H5
			console.log("运行在H5");
			this.phonetype = 3;
			// #endif
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform === 'android') {
				console.log("运行在android");
				this.phonetype = 1;
			} else if (uni.getSystemInfoSync().platform === 'ios') {
				this.phonetype = 2;
				console.log("运行在ios");
			}
			// #endif
			this.userInfo = app.globalData.userinfo;
			this.liveInfo.liveuid = option.liveuid;
			this.liveInfo.courseid = option.courseid;
			// 接收直播liveuid courseid 
			this.enterLive(option.liveuid, option.courseid);
			uni.getSystemInfo({
				success: (res) => {
					this.scrollH = res.windowHeight - res.statusBarHeight - 25;
				}
			})
			socket.emit('conn', {
				uid: this.userInfo.id, //进入该房间的学生id 假如等于下面的房间id, 那即为老师进入房间
				roomnum: this.liveInfo.liveuid, //房间号,即老师id
				nickname: this.userInfo.user_nickname,
				stream: this.liveInfo.liveuid + '_' + this.liveInfo.courseid + '_0', //老师id_课程id_课时id
				equipment: 'uni-app', //环境
				token: this.userInfo.token,
				avatar: this.userInfo.avatar,
				sign: 0, //签名 默认为0
				usertype: this.userInfo.type, //0学生, 1老师
			});
			socket.on('conn', (data) => {
				console.log('ws 已连接 ' + data);
				this.isConnectSocket = true; //已连接
			});
			let that = this;
			//监听服务端消息
			socket.on('broadcastingListen', (data) => {
				let msgInfo = JSON.parse(data).msg[0];
				if (msgInfo.content != undefined) {
					this.list.push(msgInfo);
				}
				console.log('收到消息' + msgInfo);
				// 滚动到底部
				this.pageToBottom();
			});
		},
		methods: {
			decypt(code) {
				var newcode = '';
				var str = '1ecxXyLRB.COdrAi:q09Z62ash-QGn8VFNIlb=fM/D74WjS_EUzYuw?HmTPvkJ3otK5gp';
				for (var i = 0; i < code.length; i++) {
					var codeIteam = code[i];
					for (var j = 0; j < str.length; j++) {
						var stringIteam = str[j];
						if (codeIteam == stringIteam) {
							if (j == 0) {
								newcode += str[j];
							} else {
								newcode += str[j - 1];
							}
						}
					}
				}
				return newcode;
			},
			agoraWechat(agoraappid, agorastream, uid) {
				//在小程序里编写代码
				console.log('进入小程序方法');
				setTimeout(() => {
					//初始化
					let client = new AogoraWechat.Client();
					client.setRole('audience');
					client.init(this.decypt(agoraappid), () => {
						console.log('小程序初始化成功');
						//加入通道
						client.join('', agorastream, uid, () => {
							console.log('加入通道成功');
						}, e => {
							console.log('加入通道失败')
						});

					}, e => {
						console.log('小程序初始化失败');
					});

					//订阅远端流
					client.on("stream-added", e => {
						client.subscribe(evt.uid, (res) => {
							console.log("订阅视频流成功playUrl" + res);
							this.wechatliveurl = res;
						}, (err) => {
							console.log("订阅视频流错误", err);
							uni.showToast({
								icon: "none",
								title: "订阅视频流错误"
							});
						});
					});
					//远端流移除
					client.on("stream-removed", e => {
						console.log('远端流移除');
					});
					//重连机制
					client.rejoin('', agorastream, uid, '', () => {
						console.log('重连加入通道成功');
					}, e => {
						console.log('重连加入通道失败');
					});


				}, 0);
			},
			agoraH5(agoraappid, agorastream) {

				var _this = this;
				setTimeout(() => {
					// var isgo = AgoreRTCH5.checkSystemRequirements();
					// if (!isgo) {
					// 	alert('当前浏览器不支持，请更换浏览器或者升级该浏览器，如:谷歌浏览器');
					// }
					// 4ff617f955ec4e5f89414cc06855cd46
					//demoChannel1

					let client = AgoraRTCH5.createClient({
						mode: "live",
						codec: "vp8",
					});
					AgoraRTCH5.client = client;
					client.init(_this.decypt(agoraappid));
					client.setClientRole('audience');
					// 加入频道
					client.join("", agorastream, null, (uid) => {
						console.log("H5加入通道成功")
					}, null);
					// 有远端用户发布流时进行订阅 
					client.on("stream-added", function(evt) {
						client.subscribe(evt.stream, null);
					});
					// 订阅成功后播放主播的流
					client.on("stream-subscribed", function(evt) {
						let stream = evt.stream;
						let streamId = String(stream.getId());
						console.log("订阅成功后播放主播的流streamId：" + streamId)
						//let streamDiv = document.createElement("div");
						let streamDiv = document.getElementById("subremoteContainer")
						streamDiv.id = streamId;
						//streamDiv.style.transform = "rotateY(180deg)";
						document.getElementById("remoteContainer").appendChild(streamDiv);
						stream.play(streamId);
					});
					// 远端用户取消发布流时，关闭及移除对应的流。
					client.on("stream-removed", function(evt) {
						let stream = evt.stream;
						let streamId = String(stream.getId());
						stream.close();
						console.log("远端用户取消发布流时，关闭及移除对应的流。");

					});
					// 远端用户离开频道时，关闭及移除对应的流。
					client.on("peer-leave", function(evt) {
						let stream = evt.stream;
						let streamId = String(stream.getId());
						stream.close();
						console.log("远端用户离开频道时，关闭及移除对应的流。");
					});
				}, 0);

			},
			// 进入直播
			enterLive(liveuid, courseid) {
				var _this = this;
				let gData = app.globalData;
				_this.agorauid = gData.userinfo.id;
				//console.log(courseid);
				//console.log(liveuid);
				uni.request({
					url: gData.site_url + 'Live.Enter',
					method: 'GET',
					data: {
						'liveuid': liveuid,
						'courseid': courseid,
						'lessonid': '',
						'token': gData.userinfo.token,
						'uid': gData.userinfo.id,
					},
					success: res => {
						_this.agoraappid = res.data.data.info[0].sound_appid,
							_this.agoramRoomName = res.data.data.info[0].stream,
							console.log("获取数据agoraappid：" + _this.agoraappid);
						console.log("获取数据agoramRoomName：" + _this.agoramRoomName);
						if (_this.phonetype == 2) {
							console.log('接口返回进入ios')
							setTimeout(() => {
								_this.$nextTick(() => {
									_this.$refs.videoIos.focus({
										'appid': _this.agoraappid,
										'mRoomName': _this.agoramRoomName,
										'uid': gData.userinfo.id
									});
								});
							}, 0);
						} else if (_this.phonetype == 1) {
							console.log('接口返回进入android')

							setTimeout(() => {
								_this.$nextTick(() => {
									_this.$refs.videoAdnroid.clearTel(
										_this.agoraappid + '声' + _this.agoramRoomName + '网' + gData.userinfo.id
									);
								});
							}, 0);

						} else if (_this.phonetype == 3) {
							console.log('接口返回进入H5')
							_this.agoraH5(_this.agoraappid, _this.agoramRoomName);
						} else if (_this.phonetype == 4) {
							_this.agoraWechat(_this.agoraappid, _this.agoramRoomName, gData.userinfo.id)
						}
					}
				});
			},

			//发送消息
			submit(data) {

				let userInfo = app.globalData.userinfo;
				let msgtype = (this.isQue === true) ? "1" : "0";

				//发送消息
				let obj = {
					"msg": [{
						"_method_": "SendMsg",
						"action": "0",
						"token": userInfo.token,
						"uid": '' + userInfo.id,
						"user_nickname": '' + userInfo.user_nickname,
						"avatar": '' + userInfo.avatar,
						"liveuid": '' + this.liveInfo.liveuid,
						"content": '' + data,
						"equipment": "uni-app",
						"create_time": Math.floor((new Date()).getTime().toString() / 1000),
						"msgtype": msgtype
					}],
					"retcode": "000000",
					"retmsg": "OK"
				};

				if (this.isConnectSocket == true) {
					socket.emit('broadcast', obj);
					this.tabIndex = 1;
					let gData = app.globalData;
					let liveuid = this.liveInfo.liveuid;
					let courseid = this.liveInfo.courseid;
					// 签名
					let sign = this.sort2url({
						// uid liveuid courseid lessonid type content url user_type
						'uid': this.userInfo.id,
						'liveuid': liveuid,
						'courseid': courseid,
						'lessonid': '0',
						'type': '0',
						'content': data,
						'url': '',
						'user_type': this.userInfo.type,
					});
					//记录聊天信息
					uni.request({
						url: gData.site_url + 'Live.SetChat',
						method: 'GET',
						data: {
							'uid': this.userInfo.id,
							'token': this.userInfo.token,
							'liveuid': liveuid,
							'courseid': courseid,
							'lessonid': 0,
							'type': 0,
							'content': data,
							'url': '',
							'length': 0,
							'status': msgtype,
							'user_type': this.userInfo.type,
							'sign': sign
						},
						success: res => {
							// console.log(res);
						},
						fail: () => {
							uni.showToast({
								icon: 'none',
								title: '网络错误'
							});
						},
					});
				}
			},
			question(isQue) {
				console.log(isQue);
				if (isQue) {
					// 切换到问答区
					this.tabIndex = 2;
					this.isQue = true;
				} else {
					this.tabIndex = 0;
					this.isQue = false;
				}
			},
			// 字典序排序
			sort2url(arr1) {
				var newkey = Object.keys(arr1).sort();
				var newObj = {};
				for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
					newObj[newkey[i]] = arr1[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
				}

				var text = "";
				for (var index in newObj) {
					text = text + index + "=" + newObj[index] + "&";
				}
				text = text.substr(0, text.length - 1);
				text += '&' + app.globalData.sign_key;
				return md5_js.hex_md5(text);
			},
			//切换选项卡
			changeTab(index) {
				this.tabIndex = index
			},
			//滑动
			onChangeTab(e) {
				//切换当前索引
				this.tabIndex = e.detail.current
			},
			// 滚动到底部
			pageToBottom() {
				let lastIndex = this.list.length - 1;

				if (lastIndex < 0) {
					return;
				}
				// 大坑, vue采用虚拟dom, 刚发送消息时最后一条dom元素是取不到的!!! 必须用异步等元素渲染
				var _this = this;
				setTimeout(() => {
					_this.scrollInto = 'chat' + lastIndex;
				}, 500);

			},
		},

	}
</script>


<style>
	.live-all-wrap {
		background-color: #F5F5F5;
	}
	.video-wrap {
		width: 750rpx;
		height: 400rpx;
		background-color: #000000;
	}
	
	.tabclass {}

	.course-tab {
		width: 850rpx;
		left: -70rpx;
		flex-direction: row;
		height: 80rpx;
		position: relative;
		background-color: #FFFFFF;
	}

	/* 聊天区域 */
	.talk-wrap {
		background-color: #F5F5F5;
		min-height: 1100rpx;
		
	}
	
	.swiper-box {
		height: calc(62vh);
		/* min-height: 900rpx; */
	}

	/* 聊天框 */
	.chat-box {
		background-color: #FFFFFF;
		height: 60rpx;
	}

	/* 输入框区域 */
	.input-box {
		height: 100rpx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
	}

	.left-icon-jianpan {
		font-size: 55rpx;
		height: 100%;
		float: left;
	}

	.right-icon-xiaolian {
		font-size: 55rpx;
		height: 100%;
		float: right;
	}

	.input-shuru {
		float: left;
		height: 100%;
		width: 70%;
		margin-left: 50rpx;
	}
</style>
