// pages/team_history/team_history.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    history: [],
    wode:'class="status">[进行中] </div>'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.request({
      url: App.AppData.href + 'ErHouse/GetTeamName',
      data: {
        openId: wx.getStorageSync("openid")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        page.setData({
          logs: res.data.Jieguo,
        });
        if (res.data.shuju){
          wx:wx.showModal({
            title: '提示',
            content: '您还没有创建过房间或绑定过房间',
            showCancel: false,
            success:function(){
              wx.redirectTo({
                url: '../home/home',
              })
            }
          })
        }
      }
    })
  },
  to_team_show: function (e) {
    var page = this;
    wx.navigateTo({
      url: '../team_integral/team_integral?Id=' + e.target.id,
      fail: function () {
        wx.reLaunch({
          url: '../team_integral/team_integral?Id=' + e.target.id,
        })
      }
    })
  }, 
  Toadvice: function(e) {
    var page = this;
    wx.navigateTo({
      url: '../advice/advice',
      fail: function () {
        wx.reLaunch({
          url: '../advice/advice',
        })
      }
    })
  }, 
  Toadvice: function (e) {
    wx.navigateTo({
      url: '../advice/advice',
      fail: function () {
        wx.reLaunch({
          url: '../advice/advice',
        })
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
    var page = this;
    wx.request({
      url: App.AppData.href + 'ErHouse/GetTeamName',
      data: {
        openId: wx.getStorageSync("openid")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        page.setData({
          logs: res.data.Jieguo,
        });
        if (res.data.shuju) {
          wx: wx.showModal({
            title: '提示',
            content: '您还没有创建过房间或绑定过房间',
            showCancel: false,
            success: function () {
              wx.redirectTo({
                url: '../home/home',
              })
            }
          })
        }
      }
    })
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