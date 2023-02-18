import Toast from '@vant/weapp/toast/toast'
// import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        UserName: 'admin',
        password: '',
        TipsVal: '',
        TipsPwd: '',
    },
    onChangeUserName(e) {
        // e.detail 为当前输入的值
        console.log(e.detail);
        this.setData({
            UserName: e.detail,
        });
    },
    onChangePwd(event) {
        console.log(event.detail);
        this.setData({
            password: event.detail,
        });
    },
    tapName() {
        console.log(this.data.UserName);
        if (!this.data.UserName) {
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
        if (!this.data.password) {
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
                url: 'https://netop.sharewis.com:8000/server/pc/login', //仅为示例，并非真实的接口地址
                method: 'POST',
                data: {
                    UserName: this.data.UserName,
                    Password: this.data.password
                },
                header: {
                    'content-type': 'application/json' // 默认值
                },
                success(res) {
                    console.log(res.data)
                    if (res.data.status == 200) {
                        _this.setData({
                            TipsVal: '',
                            TipsPwd: ''
                        })
                        wx.setStorageSync('mytoken', res.data.token)
                        wx.setStorageSync('userAccount', {
                            UserName: _this.data.UserName,
                            password: _this.data.password,
                            NickName: res.data.data.NickName,
                            FullNameEn: res.data.data.FullNameEn,
                            CreateByUserID: res.data.data.Id,
                        })
                        wx.switchTab({
                            url: "/pages/index/index"
                        })
                    } else {
                        console.log(res.data.message);
                        // Toast.fail(res.data.message);
                        Toast(res.data.message);
                    }

                },
                fail(err) {
                    console.log(err);
                    Toast.fail('登录失败，请重试！');
                }
            })

        }

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'userAccount',
            success: function (res) {
                console.log(res.data)
                if (res.data) {
                    wx.switchTab({
                        url: "/pages/index/index"
                    })
                } else {
                    console.log(2);
                }
            }
        })
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