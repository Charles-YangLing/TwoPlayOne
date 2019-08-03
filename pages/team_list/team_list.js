// pages/team_list/team_list.js
var App = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    logs: '',
    teamName: '',//房间号
    setinter: '',//计时器参数
    sharename: '',//是否扫二维码进入的参数
    erweima:true,
    Tijiao:true,
    //array: [],
    //index: 0,//选择器数值参数
    manuyan: true,//房间已满参数
    manuyan1:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this;
    if (!!options.scene) {
      console.log('判断成功，页面已赋值')
      page.setData({
        sharename: options.scene
      })
    }else{
      console.log('普通进入')
    }
  },
  formSubmit: function(e) {
    var page = this;
    var input1 = e.detail.value.team_name;
    if (input1 == "") {
      wx.showToast({
        title: '提交信息不完整',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: App.AppData.href + 'ErHouse/GetHouseShowName',
        data: {
          Id: e.detail.value.team_name,
          openId: wx.getStorageSync("openid")
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          page.setData({
            logs: res.data,
            teamName: e.detail.value.team_name,
            Tijiao:false
          });
        }
      })
    }
  },
  chooes: function(e) {
    var page = this;
    console.log(e)
    wx.request({
      url: App.AppData.href + 'ErHouse/UpdateOpenId',
      data: {
        teamName: page.data.teamName,
        playerName: e.detail.value.radio,
        openId: wx.getStorageSync("openid")
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        wx.showModal({
          title: '加入成功',
          showCancel: false,
          content:'即将跳转至得分页面',
          success: function(res) {
            wx.navigateTo({
              url: '../team_integral/team_integral?Id='+page.data.teamName,
              fail: function() {
                wx.reLaunch({
                  url: '../team_integral/team_integral?Id=' + page.data.teamName,
                })
              }
            })
          }
        })
      }
    })
  },
  Back: function(e) {
    wx.navigateTo({
      url: '../home/home',
      fail: function() {
        wx.navigateBack({
          url: '../home/home',
        })
      }
    })
  },
  scanCode() {
    const that = this
    wx.scanCode({
      success(res) {
        wx.navigateTo({
          url: '../../'+res.path,
          fail: function () {
            wx.navigateBack({
              url: '../../' + res.path,
            })
          }
        })
      },
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
  onShow: function () {
    var page = this;
    if (!!page.data.sharename) {
      wx.request({
        url: App.AppData.href + 'ErHouse/GetHouseShowName',
        data: {
          Id: page.data.sharename,
          openId: wx.getStorageSync("openid")
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          page.setData({
            logs: res.data,
            teamName: page.data.sharename,
            erweima: false
          });
          if (res.data.Name == '') {
            page.setData({
              manuyan: false,
              manuyan1: true
            });
          }
        }
      })
    }else{
      console.log('普通进入2')
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;
    clearInterval(that.data.setinter)
    console.log('清除计时器：' + that.data.setinter)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})