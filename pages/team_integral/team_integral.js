// pages/team_integral/team_integral.js
var App = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: [],
    Id: [],
    player1name: '',
    player2name: '',
    player3name: '',
    setinter: '',
    chushi:0,
    Xianshi:'none',
    player:'',
    jushu:[],
    user:'user',
    userA:'',
    userB:'',
    userC: '',
    userD: '',
    switch: true,
    ischecked: false,
    index: 0,
    list: 0,
    player1_Lishi: '',
    player2_Lishi: '',
    player3_Lishi: '',
    erci:true,
    jishi:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.request({
      url: App.AppData.href + 'ErHouse/GetHouseShowNameshengyu',
      data: {
        Id: page.options.Id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        page.setData({
          player1name: res.data.Name[0].player_name,
          player2name: res.data.Name[1].player_name,
          player3name: res.data.Name[2].player_name,
        })
        wx.request({
          url: App.AppData.href + 'ErHouse/GetHouseDetail',
          data: {
            Id: res.data.Id,
            name1: res.data.Name[0].Id,
            name2: res.data.Name[1].Id,
            name3: res.data.Name[2].Id,
            openId: wx.getStorageSync("openid"),
            index: 0,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            page.setData({
              list: res.data.Count
            })
            var arrey = new Array;
            for (var i = 1; i <= page.data.list; i++) {
              arrey[i - 1] = res.data.myArrary[res.data.jushu - i]
            }
            //为房主标识赋值
            if (res.data.fangzhushi == 1) {
              page.setData({
                userA: page.data.user
              })
            } else if (res.data.fangzhushi == 2) {
              page.setData({
                userB: page.data.user
              })
            } else if (res.data.fangzhushi == 3) {
              page.setData({
                userC: page.data.user
              })
            } 
            page.setData({
              logs: res.data,
              Id: page.options.Id,
              chushi: 0,
              index:0,
              player: res.data.player,
              jushu: arrey,
              player1_Lishi: res.data.player1_Lishi,
              player2_Lishi: res.data.player2_Lishi,
              player3_Lishi: res.data.player3_Lishi,
            })
            wx.hideLoading();
            if (!res.data.fangzhu && page.data.jishi) {
              page.data.setinter = setInterval(function () {
                page.onLoad();
              }, 60000);
              page.data.jishi = false;
            }
          }
        })
      }
    })
  },
  //上传得分用，表单提交
  formSubmit: util.throttle(function(e) {
    var page = this;
    var datalist = e.detail.value;
    var shuliang = 0;
    if (datalist.player1_integral != 0) {
      shuliang++
    }
    if (datalist.player2_integral != 0) {
      shuliang++
    }
    if (datalist.player3_integral != 0) {
      shuliang++
    }
    if (datalist.player1_integral == 0 && datalist.player2_integral == 0 && datalist.player3_integral == 0) {
      wx.showModal({
        title: '提示',
        content: '请输入庄家得分',
      })
    } else if (shuliang != 1){
      wx.showModal({
        title: '提示',
        content: '请只输入一位庄家得分',
      })
    } else if (datalist.player1_integral % 2 != 0 || datalist.player2_integral % 2 != 0 || datalist.player3_integral % 2 != 0) {
      wx.showModal({
        title: '分值似乎有问题...',
        content: '请输入可以被2整除的得分',
        showCancel: false
      })
    }else {
      datalist.Id = page.data.Id;
      datalist.player1_name = page.data.player1name;
      datalist.player2_name = page.data.player2name;
      datalist.player3_name = page.data.player3name;
      datalist.checaked = e.detail.value.checkbox
      wx.request({
        url: App.AppData.href + 'ErHouse/GetHouseintegral',
        data: datalist,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          wx.showToast({
              title: '提交成功',
              duration: 1000
            }),
            page.setData({
            Xianshi: 'none',
            switch: e.detail.value.switch
            })
            page.onLoad();
          if (page.data.switch) {
            var voiceurl = App.AppData.href + "Mp3/" + page.options.Id + ".mp3?" + Math.random() / 9999;
            const innerAudioContext = wx.createInnerAudioContext()
            innerAudioContext.autoplay = true
            innerAudioContext.src = voiceurl
            innerAudioContext.onPlay(() => {
            })
          }
        }

      })
    }
  }, 5000),
  //添加得分弹出框
  Tianjia:function(e){
    var page = this
    page.setData({
      Xianshi:'block',
      ischecked: false,
      chushi: 0
    })
  },
  CloseTianjia: function (e) {
    var page = this
    page.setData({
      Xianshi: 'none'
    })
  },
  //游戏结束，改变状态
  gameover: function(e) {
    var page = this;
    wx.request({
      url: App.AppData.href + 'ErHouse/Changeover',
      data: {
        id: e.target.id,
        name1: page.data.player1name,
        name2: page.data.player2name,
        name3: page.data.player3name,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        page.onLoad();
      }
    })
  },
  //分享给好友
  share:function(e){
    var page = this;
    wx.navigateTo({
      url: '../team_share/team_share?Id=' + e.target.id,
      fail: function () {
        wx.reLaunch({
          url: '../team_share/team_share=' + e.target.id,
        })
      }
    })
  },
  //退出房间
  ToEndHouse:function(e){
    var page = this;
    wx.request({
      url: App.AppData.href + 'ErHouse/EndHouse',
      data: {
        id: e.target.id,
        peopleId: wx.getStorageSync("openid"),
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.showToast({
          title: '已成功退出房间',
          duration:1500
        })
        setTimeout(function () {
          wx.navigateBack({
            delta:1,
          })
        }, 1500)
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
    var that = this;
    clearInterval(that.data.setinter)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var page = this;
    if (page.data.erci) {
      wx.showLoading({
        title: '玩命加载中',
      })
    }
    wx.request({
      url: App.AppData.href + 'ErHouse/GetHouseShowNameshengyu',
      data: {
        Id: page.options.Id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        page.setData({
          player1name: res.data.Name[0].player_name,
          player2name: res.data.Name[1].player_name,
          player3name: res.data.Name[2].player_name,
        })
        wx.request({
          url: App.AppData.href + 'ErHouse/GetHouseDetail',
          data: {
            Id: res.data.Id,
            name1: res.data.Name[0].Id,
            name2: res.data.Name[1].Id,
            name3: res.data.Name[2].Id,
            openId: wx.getStorageSync("openid"),
            index: page.data.index + 1,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            page.setData({
              list: page.data.list + res.data.Count
            })
            var arrey = new Array;
            for (var i = 1; i <= page.data.list; i++) {
              arrey[i - 1] = res.data.myArrary[res.data.jushu - i]
            }
            var list1 = page.data.player1_Lishi
            var list2 = page.data.player2_Lishi
            var list3 = page.data.player3_Lishi
            for (var i = 0; i < res.data.Count; i++) {
              list1.push(res.data.player1_Lishi[i]);
              list2.push(res.data.player2_Lishi[i]);
              list3.push(res.data.player3_Lishi[i]);
            }
            //为房主标识赋值
            if (res.data.fangzhushi == 1) {
              page.setData({
                userA: page.data.user
              })
            } else if (res.data.fangzhushi == 2) {
              page.setData({
                userB: page.data.user
              })
            } else if (res.data.fangzhushi == 3) {
              page.setData({
                userC: page.data.user
              })
            }
            page.setData({
              //logs: moment_list,
              player1_Lishi: list1,
              player2_Lishi: list2,
              player3_Lishi: list3,
              jushu: arrey,
              index: ++page.data.index,
            })
            if (res.data.Count == 0 && page.data.erci) {
              wx.showModal({
                content: '没有更多对局了',
                showCancel: false
              }),
                page.data.erci = false;
            }
            wx.hideLoading();
          }
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})