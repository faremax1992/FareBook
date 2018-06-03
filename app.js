//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.getUserInfo((info) => {console.log(info)});
  },
  getUserInfo:function(cb){
    var that = this
    console.log('getUserInfo');
    if(this.globalData.userInfo){
      console.log('not func');
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      console.log('login...');
      wx.login({
        success: function (res) {
          console.log('login...', res);
          wx.getUserInfo({
            success: function (res) {
              console.log('getInfo...', res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function (err) {
              console.log('getInfo error...', err);
            }
          });
        },
        fail: function(err){
          console.log('login error...', err);
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})