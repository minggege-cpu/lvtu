// pages/main/moreCourse.js

Page({

  data: {
    moreCourse:[]
  },

  onLoad: function (options) {
    var that = this;
    var category = options.category;
    // console.log(category);
    wx.request({
      url: 'https://lvtu.mess.plus/getMoreCourse',
      data: {
        category: category,   
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          moreCourse:result.data.result
        })
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