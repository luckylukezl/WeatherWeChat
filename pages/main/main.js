// pages/main/main.js
var util = require('../../utils/util.js')
var app = getApp()
Page({
  data:{
    cityWeather:[],
    date:null,
    week:null,
    citys:[],
    index:0,
    loading:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("onLoad");

    this.setData({
      date:util.formatDate(new Date)
    })
    

    wx.setNavigationBarTitle({
      title: 'weather by zl',
      success: function(res) {
        console.log(res);
      }
    })

    var citys = wx.getStorageSync('citys')
    if(citys){
      //wx.setStorageSync('citys', new Array)
    }else{
      wx.setStorageSync('citys', new Array)
    }

    this.refresh()
    //console.log(this.data.citySum)
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log("onShow");
    var length = wx.getStorageSync('citys').length
    
    if(!this.data.loading){
      this.refresh()
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onShareAppMessage:function(){
    return {
      title: '自定义分享标题',
      desc: '自定义分享描述',
      path: '/pages/citys/citys'
    }
  },
  queryWeather:function (cityId) {
    var that = this;
    //console.log(cityId)
    wx.request({
      url: app.globalData.url + 'weather',
      data: { city: cityId , key:app.globalData.key },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //header: { apikey: 'c2bea5ed22ec9e25def6d93d0e39fa7e' }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        // success
        //console.log(res.data.errMsg)
        var weather = util.formatWeather(res.data)

        var weathers = that.data.cityWeather;
        weathers.push(weather);

        that.setData({
         
          cityWeather:weathers
        })

        //console.log(citys);

      },
      fail: function () {
        // fail
        console.log("net request failed")
      },
      complete: function () {
        var i = that.data.index + 1;
        that.setData({
          index:i
        })
        if(i < app.globalData.citySum){
          that.queryWeather(that.data.citys[i].id);
        }else{
          that.setData({
            loading:false
          })
        }
      }
    })
  },
  more_button:function(){
    wx.navigateTo({
      url: '/pages/citys/citys',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  delete_tab:function(event){
    console.log(event);
  },
  onPullDownRefresh:function(){
    //this.onLoad();
  
   this.refresh()
    wx.stopPullDownRefresh()
  },
  refresh:function(){
    var citys = wx.getStorageSync('citys');
    console.log(citys)
    if(citys && citys.length > 0){
      
      app.globalData.citySum = citys.length;
      this.setData({
        citys:citys,
        index:0,
        cityWeather:[],
        loading:true
      })
      this.queryWeather(citys[0].id);
      
    }else{

    }
  }
})