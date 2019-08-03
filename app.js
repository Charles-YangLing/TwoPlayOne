//app.js
App({
  AppData: {
    //href: "http://localhost:5802/",
    href: "https://mpmininter.uicrm.net/",
  },
  onLaunch: function (options) {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // 登录
    var scene = decodeURIComponent(options.scene)//参数二维码传递过来的参数
    var query = options.query
    var that = this;
    wx.login({
      //获取code
      success: function (res) {
        wx.request({
          url: that.AppData.href + 'ErHouse/HttpGet',
          data: { code: res.code },
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            wx.setStorage({
              key: 'MemberId',
              data: res.data.MemberId,
            }),
              wx.setStorage({
                key: 'openid',
                data: res.data.openid,
              }),
              wx.setStorage({
                key: 'session',
                data: res.data.session,
              }),
              wx.setStorage({
                key: 'Tel',
                data: res.data.Tel,
              });
            var objz = {};
            objz.avatarUrl = res.data.HeadImageUrl;
            objz.nickName = res.data.Name;
            wx.setStorageSync('userInfo', objz);
            that.globalData.openid = res.data
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(res)
            }
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null
  }
})