// pages/Advice/advice.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Memberid: wx.getStorageSync('MemberId')
  },
  formSubmit: function (e) {
    var page = this;
    var input1 = e.detail.value.message;
    if (input1 == "") {
      wx.showToast({
        title: '提交信息不完整',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: App.AppData.href + 'ErHouse/GetOpinionEdit',
        data: {
          memberid: wx.getStorageSync('MemberId'),
          message: e.detail.value.message,
          Version:"斗地主"
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.showToast({
            title: '感谢您的反馈',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack({
              delta:1
            })
          }, 1000)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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