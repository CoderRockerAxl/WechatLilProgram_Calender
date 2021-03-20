// businessReport/selectCalender/selectCalender.js
const moment = require('../../utils/moment.min.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sysW: null,
    weekArr: ['日', '一', '二', '三', '四', '五', '六'],
    monthDataArr: [],
    yearDataArr: [],
    tradeData: {}
  },

  didSelectWeek(e) {
    let {month, index, weekStartDate, weekEndDate, year} = e.currentTarget.dataset.seldata
    let date = year + '-' + month + ' 第' + index + '周 ' + weekStartDate + '-' + weekEndDate
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      selectDate: date, // 这里是修改了上一个页面数据:name
      selectWeekData: e.currentTarget.dataset.seldata
    })

    wx.navigateBack({
      delta: 1 // 返回上一级页面。
    })
  },

  monthsDataGet: function () {
    let yearDataArr = []
    let monthDataArr = []
    let lastYear = ''
    let yearData = {}
    for (let i = 0; i < 7; i++) {
      let momentDate = moment().subtract(6 - i, 'months')
      let date = momentDate._d

      if (i == 6) {
        date = new Date()
      }

      let monthDataBox = {}
      let year = date.getFullYear();
      let month = date.getMonth();
      let months = date.getMonth() + 1;
      //获取现今年份
      monthDataBox.year = year;
      if (i == 0) {
        lastYear = year
      }
      //获取现今月份
      monthDataBox.month = months;
      
      //获取今日日期
      monthDataBox.getDate = date.getDate();
      //最后一天是几号
      let d = new Date(year, months, 0);
      if(months < 10) {
        months = '0' + months
      }
      monthDataBox.lastDay = d.getDate();
      //第一天星期几
      let firstDay = new Date(year, month, 1);
      monthDataBox.firstDay = firstDay.getDay();
      monthDataBox.marLet = firstDay.getDay();
      monthDataBox.arr = []
      monthDataBox.weekArr = []

      //根据得到今月的最后一天日期遍历 得到所有日期
      for (let j = 1; j < monthDataBox.lastDay + 1; j++) {
        let itemDate = new Date(year, month, j);
        let weekNum = itemDate.getDay();
        let weekItem = {}
        if(weekNum == 1) {
          if(itemDate > new Date()) {
            break
          }
          let startDay = j
          if(j < 10) {
            startDay = '0' + j
          }
          
          weekItem.weekStartDate = months + '.' + startDay
          weekItem.month = months
          weekItem.year = year
          weekItem.index = monthDataBox.weekArr.length + 1
          weekItem.dataIndex = year.toString() + months.toString() + '-' + (monthDataBox.weekArr.length + 1).toString()
          let weekEndDay = j + 6
          if(weekEndDay <= monthDataBox.lastDay) { //最后一周没有超出当月
            if(weekEndDay < 10) {
              weekEndDay = '0' + weekEndDay
            }
            weekItem.weekEndDate = months + '.' + weekEndDay
            weekItem.endYear = year
            j = j + 6
          } else { //最后一周的最后一天超出当月
            let nextMonthDate = moment().subtract(5 - i, 'months')
            let nextMonth = nextMonthDate._d
            let nextMonths = nextMonth.getMonth() + 1;
            weekItem.endYear = nextMonth.getFullYear()
            let lastDayMoment = new Date(year, month, monthDataBox.lastDay);
            let lastDayWeekNum = lastDayMoment.getDay()
            let lastDay = 7 - lastDayWeekNum
            if(lastDay < 10) {
              lastDay = '0' + lastDay
            }
            if(nextMonths < 10) {
              nextMonths = '0' + nextMonths
            }
            weekItem.weekEndDate = nextMonths + '.' + lastDay
            j = monthDataBox.lastDay
          }
          monthDataBox.weekArr.push(weekItem)
        }
      }


      if (lastYear !== year && i !== 0) {
        let lastYearData = {
          year: lastYear,
          monthDataArr: monthDataArr
        }
        lastYear = year
          yearDataArr.push(lastYearData)
        monthDataArr = []
      }

      if(monthDataBox.weekArr.length > 0) {
        monthDataArr.push(monthDataBox)
      }

      if (i == 6) {
        yearData.year = year
        yearData.monthDataArr = monthDataArr
        yearDataArr.push(yearData)
      }
    }
    this.setData({
      yearDataArr: yearDataArr
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.monthsDataGet();
    let res = wx.getSystemInfoSync();
    this.setData({
      sysW: res.windowWidth / 4, //更具屏幕宽度变化自动设置宽度
    }, () => {
    });
    this.gotoPageBottom()
    this.getTradeData()
  },

  getTradeData: function() {
    let testData = {
      "202009-1": 0.49,
      "202009-2": 0.32,
      "202009-3": 0.03,
      "202010-1": 0.01,
      "202010-2": 0.09,
      "202010-4": 0.06,
      "202011-1": 0.02,
      "202011-2": 0.06,
      "202011-3": 0.04,
      "202011-4": 0.21,
      "202011-5": 0.06,
      "202012-1": 0,
      "202012-2": 0.08,
      "202012-3": 0.06,
      "202012-4": 29,
      "202101-1": 0.17,
      "202101-2": 0.32,
      "202101-3": 0.07,
      "202101-4": 0.52,
      "202102-1": 0.2,
    }
    this.setData({
      tradeData: testData
    })
  },

  gotoPageBottom: function () {
    wx.pageScrollTo({
      scrollTop: 5000,
      duration: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})