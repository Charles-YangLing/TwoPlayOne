// pages/edit_team/edit_team.js
var App = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TeamHistory: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  formSubmit: util.throttle(function(e) {
    var page = this;
    var datalist = e.detail.value;
    datalist.open_Id = wx.getStorageSync("openid");
    var input1 = e.detail.value.player1_name;
    var input2 = e.detail.value.player2_name;
    var input3 = e.detail.value.player3_name;
    if (input1 == "" || input2 == "" || input3 == "") {
      wx.showToast({
        title: '提交信息不完整',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: App.AppData.href + 'ErHouse/SetHouseCreate',
        data: datalist,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if (res.data.Code == "Success") {
            wx.showModal({
              content: '您有未结束的房间，请先结束其他房间',
              showCancel: false,
              success(res){
                if(res.confirm){
                  wx.navigateTo({
                    url: '../team_history/team_history',
                    fail: function () {
                      wx.reLaunch({
                        url: '../team_history/team_history',
                      })
                    }
                  })
                }
              }
            })
          } else {
            wx.showToast({
                title: '提交成功',
                duration: 2000
              }),
              setTimeout(function() {
                wx.navigateTo({
                  url: '../team_integral/team_integral?Id=' + res.data.house_name,
                  fail: function() {
                    wx.reLaunch({
                      url: '../team_integral/team_integral?Id=' + res.data.house_name,
                    })
                  }
                })
              }, 1000)
          }
        }
      })
    }
  },5000),
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