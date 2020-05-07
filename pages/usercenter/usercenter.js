// pages/usercenter/usercenter.js


var utils = require("../../utils/util.js");
const app = getApp()
Page({
  data: {
    hasUserInfo:false,
    userInfo:{},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  
  onLoad: function (options) {
    utils.getUserInfo(this)
  },

  getUserInfo: function(e) {
    console.log(e)
    if(e.detail.errMsg=="getUserInfo:fail auth deny"){
      this.setData({
        hasUserInfo: false
      })
    }
    else{
      app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  
    wx.login({
      success: function (res) {
        if (res.code) {  //wx.login获取code。
          console.log(res.code)
          //发起网络请求
          wx.request({
            url: 'https://lvtu.mess.plus/dologin',
            data: {
              code: res.code,   //将code发送到后台服务器。
            },
            success: function (result) {
              console.log(result.data.openid)
              wx.setStorageSync('openID', result.data.openid)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    }
    
  },
  onShareAppMessage: function () {

  }
})
