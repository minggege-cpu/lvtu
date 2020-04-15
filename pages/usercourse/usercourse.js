
const app = getApp()
Page({

  
  data: {
      userCourse:[],
      hasUserInfo:false
  },

  onLoad: function (options) {
    var openID =  wx.getStorageSync('openID');
    var that = this;
    if (app.globalData.userInfo) {
      wx.request({
      url: 'https://lvtu.mess.plus/getUserCourse',
      data: {
        openID: openID,   //将code发送到后台服务器。
      },
      success: function (result) {
        // console.log(result.data.userCourse)
       that.setData({
        userCourse:result.data.userCourse,
        hasUserInfo:true
       })
      }
    })
    
  }
  },
  
  onPullDownRefresh: function () {
    wx.showToast({
      title:'拼命加载中',
      icon:'loading',
      duration: 1500, 
  });
    var openID =  wx.getStorageSync('openID');
    var that = this;
    wx.request({
      url: 'https://lvtu.mess.plus/getUserCourse',
      data: {
        openID: openID,   //将code发送到后台服务器。
      },
      success: function (result) {
        // console.log(result.data.userCourse)
       that.setData({
        userCourse:result.data.userCourse,
        hasUserInfo:true
       })
      }
    })
  },
  goCourseDetail:function(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    wx: wx.navigateTo({
      url: '../main/courseDetail/courseDetail?courseID='+id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },

  
  onShareAppMessage: function () {

  }
})