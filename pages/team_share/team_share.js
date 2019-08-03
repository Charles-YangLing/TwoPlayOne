// pages/team_share/team_share.js
var App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QRImage: '',
    house_name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.showLoading({
      title: '二维码加载中',
    })
    wx.request({
      url: App.AppData.href + '/ErHouse/HttpGetToken',
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        
        wx.request({
          url: App.AppData.href + '/ErHouse/PostMoths',
          data: {
            access_token: res.data.access_token,
            scene:page.options.Id,
            //requestMethod:"POST",
            //json: "firstName:Bill"
            //page:pages/team_integral/team_integral
          },
          header: {
            'content-type': 'json'
          },
          success: function (res2) {
            console.log(res2.data)
            let base64Image = 'data:image/png;base64,' + wx.arrayBufferToBase64(res2.data);
            if (res2.statusCode == 200) {
              page.setData({
                QRImage: base64Image,  // data 为接口返回的base64字符串，直接添加到image的src中可显示，在canvas上绘图，模拟器显示，但是真机不显示（待解）
              })
              wx.hideLoading()
            }
          }
        })
      }
    })
  },

  previewImage: function (e) {
    wx.previewImage({
      urls: [this.data.QRImage], // 需要预览的图片http链接列表 
      success:function(){
        console.log('预览成功')
      },
      // current: this.data.imgalist, // 当前显示图片的http链接   
         
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
  onShow: function (options) {
    var page = this;
    page.setData({
      house_name:page.options.Id
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