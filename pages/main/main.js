// pages/main/main.js

Page({

  
  data: {
    searchStatus:false,
    text:"",
    add1:"add1",
    add2:"",
    add3:"",
    underLine1:"underLine1",
    underLine2 : "",
    underLine3 : "",
    allcourse:[],
    getMore:"xbrm"
  },

  
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'https://lvtu.mess.plus/getCourseList',
      data: {
        category: "xbrm",   
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          allcourse:result.data.result
        })
      }
    })

  },

  searchBind: function(event){
    var text = event.detail.value;
    if(text == ""){
      wx.showToast({
        title: '关键字不能为空',
        icon: 'none',
        duration: 1500,
        
      })  
    }
    else{
      wx: wx.navigateTo({
        url: 'selectCourse/selectCourse?text='+text,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
      this.setData({
        searchStatus:false,
        text:""
      })
    }
    
  },
  searchBind2:function(){
    this.setData({
      searchStatus:true,
    })
  },
  onCancelImgTap:function(event){
  
    this.setData({
      searchStatus:false,
      text:""
    })
  },
  changeStyle1:function(){
    var that = this
    wx.request({
      url: 'https://lvtu.mess.plus/getCourseList',
      data: {
        category: "xbrm",   
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          allcourse:result.data.result
        })
      }
    })
    this.setData({
      add1:"add1",
      add2:"",
      add3:"",
      underLine1:"underLine1",
      underLine2:"",
      underLine3:"",
      getMore:"xbrm"
    })
  },
  changeStyle2:function(){
    var that = this
    wx.request({
      url: 'https://lvtu.mess.plus/getCourseList',
      data: {
        category: "jcjj",   
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          allcourse:result.data.result
        })
      }
    })
    this.setData({
      add1:"",
      add2:"add2",
      add3:"",
      underLine1:"",
      underLine2:"underLine2",
      underLine3:"",
      getMore:"jcjj"
    })
  },
  changeStyle3:function(){
    var that = this
    wx.request({
      url: 'https://lvtu.mess.plus/getCourseList',
      data: {
        category: "zxyp",   
      },
      success: function (result) {
        console.log(result.data)
        that.setData({
          allcourse:result.data.result
        })
      }
    })
    this.setData({
      add1:"",
      add2:"",
      add3:"add3",
      underLine1:"",
      underLine2:"",
      underLine3:"underLine3",
      getMore:"zxyp"
    })
  },
  getMoreCourse:function(event){
    
    var category = event.currentTarget.dataset.category;
    // console.log(category)
    wx: wx.navigateTo({
      url: 'moreCourse/moreCourse?category='+category,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  goCourseDetail:function(event){
    var id = event.currentTarget.dataset.id;
    // console.log(id);
    wx: wx.navigateTo({
      url: 'courseDetail/courseDetail?courseID='+id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  
  onShareAppMessage: function () {

  }
})