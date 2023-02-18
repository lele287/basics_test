// pages/ReportForRepair/ReportForRepair.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        countries1: ["请输入信息", "中国", "美国", "英国"],
        countryIndex1: 0,

        countries2: ["请输入信息", "中国", "美国", "英国"],
        countryIndex2: 0,

        countries3: ["请输入信息", "中国", "美国", "英国"],
        countryIndex3: 0,

        countries4: ["请输入信息", "中国", "美国", "英国"],
        countryIndex4: 0,

        formData: {
            administrators: "管理员"
        },
        formRemarks: {

        },
        switch1Checked: true,
    },
    bindCountryChange: function(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex1: e.detail.value
        })
    },
    bindCountryChange2: function(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex2: e.detail.value
        })
    },
    bindCountryChange3: function(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex3: e.detail.value
        })
    },
    bindCountryChange4: function(e) {
        console.log('picker country 发生选择改变，携带值为', e.detail.value);

        this.setData({
            countryIndex4: e.detail.value
        })
    },
    formInputChange(e) {
        console.log(this.data.formData);
        const { field } = e.currentTarget.dataset
        this.setData({
            [`formData.${field}`]: e.detail.value
        })
        console.log(this.data.formData);
    },
    remarks(e) {
        console.log(this.data.formRemarks);
        const { field } = e.currentTarget.dataset
        this.setData({
            [`formRemarks.${field}`]: e.detail.value
        })
        console.log(this.data.formRemarks);
    },
    switch1Change() {
        this.setData({
            switch1Checked: !this.data.switch1Checked
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})