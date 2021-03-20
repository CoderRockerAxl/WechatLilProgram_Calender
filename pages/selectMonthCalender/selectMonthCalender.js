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

  didSelectMonth(e) {
    let {
      month,
      year
    } = e.currentTarget.dataset.seldata
    let date = year + '-' + month
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      selectDate: date, // 这里是修改了上一个页面数据:name
      selectMonthData: e.currentTarget.dataset.seldata
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
      let months = date.getMonth() + 1;
      //获取现今年份
      monthDataBox.year = year;
      if (i == 0) {
        lastYear = year
      }
      //获取现今月份
      monthDataBox.month = months;
      if (months < 10) {
        monthDataBox.month = '0' + months.toString()
      }
      let monthWithZero = ''
      if (months < 10) {
        monthWithZero = '0' + months.toString()
      } else {
        monthWithZero = months.toString()
      }
      monthDataBox.dataIndex = year.toString() + monthWithZero

      if (lastYear !== year && i !== 0) {
        let lastYearData = {
          year: lastYear,
          monthDataArr: monthDataArr
        }
        lastYear = year
        yearDataArr.push(lastYearData)
        monthDataArr = []
      }

      monthDataArr.push(monthDataBox)

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
    }, () => {});
    this.gotoPageBottom()
    this.getTradeData()
  },

  getTradeData: function () {
    
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