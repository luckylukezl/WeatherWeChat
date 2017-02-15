function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  return [year, month, day].map(formatNumber).join('/');
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatCitys(c){
  var citys = c.HeWeather5;
  var reCitys = new Array
  for(var i=0;i<citys.length;i++){
    if(citys[i].status == 'ok'){
      var city = new Object
      city.city = citys[i].basic.city
      city.prov = citys[i].basic.prov
      city.id = citys[i].basic.id
      reCitys.push(city)
    }
  }
  return reCitys
}

function formatWeather(w){
 var weather = w.HeWeather5
 var reWeather = new Object
 for(var i=0;i<weather.length;i++){
   if(weather[i].status == 'ok'){
     reWeather.tmp = weather[i].now.tmp
     if(weather[i].aqi){
       reWeather.pm = weather[i].aqi.city.aqi
     }else{
       reWeather.pm = "无"
     }
     reWeather.city = weather[i].basic.city
     reWeather.sky = weather[i].now.cond.txt
     return reWeather
   }
 }
}

module.exports = {

  formatWeather : formatWeather,
  formatCitys:formatCitys,
  formatTime: formatTime,
  formatDate: formatDate
}
