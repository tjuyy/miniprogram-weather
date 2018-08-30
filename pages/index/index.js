const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowWeather: '晴天',
    nowTemp: 10,
    nowWeatherBackground: ''
  },

  onPullDownRefresh: function () {
    console.log("refresh executed!")
    this.getNow(
      () => {
        wx.stopPullDownRefresh()
        console.log('stop refresh')
      }
    )
  },

  onLoad() {
    this.getNow()
  },

  getNow(callback) {
    console.log('Hello World!')
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city: '天津市'
      },
      success: res => {
        console.log(res)
        let result = res.data.result
        let temp = result.now.temp
        let weather = result.now.weather
        console.log(temp, weather)
        this.setData({
          nowWeather: weatherMap[weather],
          nowTemp: temp,
          nowWeatherBackground: '/images/' + weather + '-bg.png'
        })
        wx.setNavigationBarColor({
          frontColor: '#000000',
          backgroundColor: weatherColorMap[weather],
        })
      },
      complete: () => {
        // wx.stopPullDownRefresh()
        callback && callback()
      }
    })
  }
})
