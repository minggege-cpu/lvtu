// pages/main/selectCourse/selectCourse.js
Page({

  data: {
    course:[]
  },

  
  onLoad: function (options) {
    var search_keywords = options.text;
    var that = this;
    wx.request({
      url: 'https://lvtu.mess.plus/userSelect',
      data: {
        search_keywords:search_keywords
      },
      success: function (result) {
        if(result.data.course == ""){
          wx.showToast({
            title: '暂时没有数据',
            icon: 'none',
            duration: 1500,
            
          })  
        }
        else{
          that.setData({
            course:result.data.course
          })
        }     
      }
    })   
  },
  goCourseDetail:function(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    wx: wx.navigateTo({
      url: '../courseDetail/courseDetail?courseID='+id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
 
  onShareAppMessage: function () {

  }
})