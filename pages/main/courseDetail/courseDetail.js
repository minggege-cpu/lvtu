function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
var utils = require("../../../utils/util.js");
const app = getApp();

Page({ 
  inputValue: '',
  data: {
    userInfo:[],
    course:[],
    teacher:[],
    lesson:[],
    video:[],
    comment:[],
    hasStudy:"",
    statusBarHeight:app.globalData.statusBarHeight,
    playTime:"",
    playTime1:"",
    src: '',
    uncomment:true,
    url:"",
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],
    show:"",
    comments:""
  },
  // onReady: function (res) {
  //   var playTime = this.data.playTime1;
  //   console.log(playTime);
  //   this.videoContext = wx.createVideoContext('myVideo')
  //   this.videoContext.seek(playTime);
  // },
  onLoad: function (options) {
    utils.getUserInfo(this);
    var that = this
    var courseID = options.courseID;
    var openID =  wx.getStorageSync('openID');
    // console.log(courseID);
    wx.request({
      url: 'https://lvtu.mess.plus/getCourseDetail',
      data: {
        courseID: courseID,
        openID:openID
      },
      success: function (result) {
        that.videoContext = wx.createVideoContext('myVideo')
        that.videoContext.seek(result.data.playTime);
        console.log(result.data)
        that.setData({
          url:result.data.url,
          playTime1:result.data.playTime,
          course:result.data.course,
          lesson:result.data.lesson,
          teacher:result.data.teacher,
          comment:result.data.comment,
          hasStudy:result.data.hasStudy
        })
      }
    })
    
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value
  },

  bindButtonTap: function() {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front','back'],
      success: function(res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },

  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  openCaptor:function(event){
    var captorID = event.currentTarget.dataset.captorid;
    if(this.data.show==""){
    // console.log(captorID);
    this.setData({
      show:captorID
    })
    }
    else if(this.data.show!==captorID){
      this.setData({
        show:captorID
      })
    }
    else{
      this.setData({
        show:""
      })
    }
    var that = this
    wx.request({
      url: 'https://lvtu.mess.plus/getVideo',
      data: {
        lessonID: captorID,   
      },
      success: function (result) {
        
        that.setData({
          video:result.data.video
        })
      }
    })
  },
  changeUrl:function(event){
    var url = event.currentTarget.dataset.url;
    this.setData({
      url:url
    })
  },
  commentTap:function(event){
    var userInfo = event.currentTarget.dataset.userinfo;
    // console.log(event);
    // console.log(userInfo);
    if(userInfo == null){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        duration: 1500,
        
      })  
    }
    else{
      this.setData({
        uncomment:false
      })
    }
    
  },
  backDetail:function(e){
    this.setData({
      uncomment:true
    })
  },
  
  bindFormSubmit:function(event){
    var that = this;
    var comment = event.detail.value.textarea
    if(comment==""){
      wx.showToast({
        title: '评论不能为空',
        icon: 'none',
        duration: 1500,
        
      })  
    }else{
        var nickName = event.currentTarget.dataset.nickname;
        var iconUrl =  event.currentTarget.dataset.iconurl;
        var courseID = event.currentTarget.dataset.courseid;
        // console.log(courseID);
        // console.log(iconUrl);
        wx.request({
          url: 'https://lvtu.mess.plus/userComment',
          data: {
            comments: comment,
            courseID:courseID,
            nickName:nickName,
            iconUrl:iconUrl
          },
          success: function (result) {
            console.log(result)
          }
        })
        
        wx.request({
          url: 'https://lvtu.mess.plus/getCourseComment',
          data: {
            courseID:courseID,
          },
          success: function (result) {
            console.log(result)
            that.setData({
              comment:result.data.comment
            })
          }
        })
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1500, 
        })
        this.setData({
          comments:""
        })  
    }    
  },
  studyTap:function(event){
      var userInfo = event.currentTarget.dataset.userinfo;
      if(userInfo == null){
        wx.showToast({
          title: '请先登录',
          icon: 'none',
          duration: 1500,        
        })  
      }
      else{
        var courseID = event.currentTarget.dataset.courseid;
        var openID =  wx.getStorageSync('openID')
        var that = this;
        wx.request({
          url: 'https://lvtu.mess.plus/userStudy',
          data: {
            courseID:courseID,
            openID:openID
          },
          success: function (result) {
            that.setData({
              hasStudy:'true'
            })
          }
        })
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 1500, 
        })
      }      
  },
  bind1:function(e){
    
    this.setData({
      playTime:e.detail.currentTime
      // playTime1:e.detail.currentTime
    })
  },
  onUnload:function(){
    var courseID = this.data.course[0].id;
    var openID =  wx.getStorageSync('openID');
    var playTime = this.data.playTime;
    var url = this.data.url;
    console.log(url)
    wx.request({
      url: 'https://lvtu.mess.plus/updateStudyRate',
      data: {
        courseID:courseID,
        openID:openID,
        playTime:playTime,
        url:url
      },
      success: function (result) {
        console.log(result.data)
      }
    })
  }

})
