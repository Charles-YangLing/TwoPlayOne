// pages/home/home.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option: '',
    team_name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this
    App.userInfoReadyCallback = res => {
      wx.request({
        url: App.AppData.href + 'ErHouse/GetOpenPlay',
        data: {
          Id: wx.getStorageSync('MemberId'),
        },
        success: function (res) {
          page.setData({
            option: res.data.status,
          })
          if (res.data.status == 'Toteam_integral') {
            page.setData({
              team_name: res.data.jieguo[0],
            })
          }
        }
      })
    };
  },
  Toteam_edit_option: function() {
    wx.navigateTo({
      url: '../edit_team/edit_team',
      fail: function() {
        wx.reLaunch({
          url: '../edit_team/edit_team'
        })
      }
    })
  },
  Toteam_integral: function() {
     var page = this;
    wx.navigateTo({
      url: '../team_integral/team_integral?Id=' + page.data.team_name,
      fail: function() {
        wx.reLaunch({
          url: '../team_integral/team_integral?Id=' + page.data.team_name
        })
      }
    })
  },
  Toteam_list_option: function() {
    wx.navigateTo({
      url: '../team_list/team_list',
      fail: function() {
        wx.reLaunch({
          url: '../team_list/team_list'
        })
      }
    })
  },
  Toteam_history_option: function() {
    wx.navigateTo({
      url: '../team_history/team_history',
      fail: function() {
        wx.reLaunch({
          url: '../team_history/team_history'
        })
      }
    })
  },
  ToSan: function (e) {
    wx.navigateToMiniProgram({
      appId: 'wx816769dd39e0078a'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    var page = this
    if (App.globalData.openid) {
    wx.request({
      url: App.AppData.href + 'ErHouse/GetOpenPlay',
      data: {
        Id: wx.getStorageSync('MemberId'),
      },
      success: function(res) {
        page.setData({
          option: res.data.status,
        })
        if (res.data.status == 'Toteam_integral') {
          page.setData({
            team_name: res.data.jieguo[0],
          })
        }
      }

    })
    }
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