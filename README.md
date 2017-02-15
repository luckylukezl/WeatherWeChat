# WeatherWeChat
## GIF展示
![Image](https://github.com/luckylukezl/WeatherWeChat/blob/master/gif/show.gif)
## 代码逻辑
微信程序，逻辑层与页面层，主要由逻辑js，公共设置json，页面逻辑wxml，样式表wxss文件组成。

框架：数据获取，数据存储，数据显示。

城市查询页面：

通过require获取城市的json数据，处理之后显示（省市区），收藏的城市保存在本地缓存。当搜索出已收藏的城市时，显示其为选中状态。

天气显示页面：

从本地缓存读取收藏城市，更加城市名与ID访问。

并发问题处理：微信小程序最多5个，所以采用逐一请求，完成一个之后，在completed方法中继续执行下一个请求，直到满足停止条件

