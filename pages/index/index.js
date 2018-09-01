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
    nowWeatherBackground: '',
    hourlyWeather: [],
    todayTemp: "",
    todayDate: ""
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
        // console.log(res)
        let result = res.data.result
        // console.log(result)
        this.setNow(result)
        this.setHourlyWeather(result)
        this.setToday(result)
      },
      complete: () => {
        // wx.stopPullDownRefresh()
        callback && callback()
      }
    })    
  },

  setNow(result) {
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

  setHourlyWeather(result) {
    let forecast = result.forecast
    let nowHour = new Date().getHours()
    let hourlyWeather = []
    for (let i = 0; i < 8; i ++) {
      hourlyWeather.push({
        time: (i * 3 + nowHour) % 24 + '时',
        iconPath : '/images/' + forecast[i].weather + '-icon.png',
        temp: forecast[i].temp + '°'
      })
    }
    hourlyWeather[0].time = '现在'
    this.setData({
      hourlyWeather: hourlyWeather
    })
  },
  setToday(result) {
    let date = new Date()
    this.setData({
      todayDate: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} 今天`,
      todayTemp: `${result.today.minTemp}° - ${result.today.maxTemp}°`
    })
  },

  onTapDayWeather() {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  }

})
