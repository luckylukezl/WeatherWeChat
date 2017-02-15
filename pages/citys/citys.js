// pages/citys/citys.js
var util = require("../../utils/util")
var app = getApp()
Page({
  data: {
    citys: [],
    queryCityName: '朝阳',
    storeCitys:[]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //this.queryCity('朝阳');
    var citys = wx.getStorageSync('citys') || [];
    //console.log(citys)
    this.setData({
      storeCitys:citys
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  fromSubmit: function (event) {
    //查询
    //console.log(event.detail.value.input);
    this.queryCity(event.detail.value.input);
  },
  //收藏保持
  swichChange: function (event) {
    var cityData = event.target.dataset;
    var city = new Object
    city.id = cityData.id
    city.prov = cityData.province
    city.city = cityData.city
    try {
      var citys = wx.getStorageSync('citys');
      if (citys) {
        //console.log("ee");
      } else {
        citys = new Array
      }

      console.log(citys)
      if (event.detail.value) {
        //收藏
        citys.push(city);
        
      } else {
        //删除
        for (var i = 0; i < citys.length; i++) {
          if (citys[i].id == city.id) {
            citys.splice(i, 1);
            break;
          }
        }
      }

      var findCitys = this.data.citys;
      for (var i = 0; i < findCitys.length; i++) {
          if (findCitys[i].id == city.id) {
            findCitys[i].checked = !findCitys[i].checked;
            break;
          }
      }

      wx.setStorageSync('citys', citys)

      this.setData({
        storeCitys:citys,
        citys:findCitys
      })
      
    } catch (e) {
      console.log(e);
    }
  },
  queryCity: function (cityId) {
    //网络请求
    var that = this;
    wx.request({
      url: app.globalData.url + 'search',
      data: { city: cityId ,key: '7c9ef99d65414b08b429d2ee2fa712b8'},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //header: { apikey: 'c2bea5ed22ec9e25def6d93d0e39fa7e' }, // 设置请求的 header
      success: function (res) {
        // success
        //console.log(res.data.errMsg)
        console.log(res.data)
        var citys = util.formatCitys(res.data)  //[]
        console.log(citys)
        try {
          var storageCitys = wx.getStorageSync('citys');
          if (storageCitys) {
            for (var i = 0; i < citys.length; i++) {
              if (that.cityExist(storageCitys, citys[i].id)) {
                citys[i].checked = true;
              } else {
                citys[i].checked = false;
              }
            }
          }
        } catch (e) {

        }



        that.setData({
          citys: citys
        })

        //console.log(citys);

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  cityExist: function (datas, id) {
    for (var i = 0; i < datas.length; i++) {
      if (datas[i].id == id) {
        return true;
      }
    }
    return false;
  },
  deleteCity:function(event){
    //点击删除
    var id = event.target.dataset.id;
    var citys = this.data.storeCitys;
    for (var i = 0; i < citys.length; i++) {
          if (citys[i].id == id) {
            citys.splice(i, 1);
            break;
          }
    }
    

    var findCitys = this.data.citys;
    //console.log(findCitys);
    for (var i = 0; i < findCitys.length; i++) {
          if (findCitys[i].id == id) {
            findCitys[i].checked = false;
            //console.log(findCitys[i].area_id)
            break;
          }
    }
    
    this.setData({
      storeCitys:citys,
      citys:findCitys
    })

    wx.setStorageSync('citys', citys)
  }
})