import Toast from '@vant/weapp/toast/toast'
// import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
// pages/login/login.js
//获取应用实例
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserName: '',
        password: '',
        TipsVal: '',
        TipsPwd: '',
        RememberChecked: false,
        flag: true,
    },
    onChangeUserName(event) {
        this.setData({
            UserName: event.detail,
        });
    },
    onChangePwd(event) {
        this.setData({
            password: event.detail,
        });
    },
    tapName() {
        if (this.data.UserName == "") {
            // Toast.fail('请填入账户密码');
            // Notify('请填入账户密码');
            this.setData({
                TipsVal: '请输入账户'
            })
        } else {
            this.setData({
                TipsVal: ''
            })
        }
        if (this.data.password == "") {
            this.setData({
                TipsPwd: '请输入密码'
            })
        } else {
            this.setData({
                TipsPwd: ''
            })
        }
        if (this.data.UserName != '' && this.data.password != '') {
            let _this = this;
            wx.request({
                url: app.data.url + 'pc/login?wechat=wechat',
                method: 'POST',
                data: {
                    UserName: this.data.UserName,
                    Password: this.data.password,
                    // wechat:"wechat"
                },
                header: {
                    'content-type': 'application/json',
                },
                success(res) {
                    if (res.data.status == 200) {
                        _this.setData({
                            TipsVal: '',
                            TipsPwd: ''
                        })
                        wx.setStorageSync('mytoken', res.data.token)
                        let myUserAccount = res.data.data;
                        delete myUserAccount.allows;
                        delete myUserAccount.AppPrivileges;
                        delete myUserAccount.AppBackgroundPrivileges;
                        wx.setStorageSync('userAccount', myUserAccount)
                        wx.switchTab({
                            url: "/pages/index/index"
                        })
                        if (_this.data.RememberChecked) {
                            wx.setStorage({
                                key: "UserNamePassword",
                                data: {
                                    UserName: _this.data.UserName,
                                    Password: _this.data.password,
                                    RememberChecked: _this.data.RememberChecked
                                }
                            })
                        } else {
                            wx.removeStorage({
                                key: 'UserNamePassword',
                                success(res) {
                                    console.log(res)
                                }
                            })
                        }
                        getApp().data.header.Authorization = 'Bearer ' + wx.getStorageSync('mytoken');
                    } else {
                        wx.showToast({
                            title: res.data.message,
                            icon: 'none',
                            duration: 1500
                        })
                    }
                },
                fail(err) {
                    console.log(err);
                    wx.showToast({
                        title: '登录失败请重试!',
                        icon: 'none',
                        duration: 1500
                    })
                }
            })

        }

    },

    // 记住密码单选框动态绑定
    onRememberChange(event) {
        this.setData({
            RememberChecked: event.detail,
        });
    },

    // 
    changType() {
        this.setData({
            flag: !this.data.flag
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'userAccount',
            success: function (res) {
                if (res.data) {
                    getApp().data.header.Authorization = 'Bearer ' + wx.getStorageSync('mytoken');
                    console.log(getApp().data.header);
                    wx.switchTab({
                        url: "/pages/index/index"
                    })
                } else {
                    console.log(2);
                }
            }
        })
        try {
            var valueRemember = wx.getStorageSync('UserNamePassword')
            if (valueRemember.RememberChecked) {
                this.setData({
                    RememberChecked: valueRemember.RememberChecked,
                    UserName: valueRemember.UserName,
                    password: valueRemember.Password,
                })
            }
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})