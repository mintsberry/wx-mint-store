// pages/search/search.js

const { HistorySearch } = require("../../model/history-search")
const { HotSearch } = require("../../model/hot-search")
const { Search } = require("../../model/search")

const history = new HistorySearch()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    historyTags: [],
    hotTags: [],
    search: true,
    keyword: null,
    result: [],
    empty: false,
  },

  async onSearch(event) {
    let keyword = event.detail.value || event.detail.name
    keyword = keyword.trim()
    if (!keyword) return 
    const historyTags = history.save(keyword)
    this.setData({
      historyTags,
      keyword,
      search: false
    })
    const paging = Search.search(keyword)
    // wx.lin.showLoading({
    //   color:'#157658',
    //   type:'flash',
    //   fullScreen:true
    // })
    let res = await paging.getMoreData()
    // wx.lin.hideLoading()
    this.setData({
      result: res.accumulator,
      empty: res.empty,
    })
  },

  onCancel() {
    this.setData({
      search: true,
      empty: false,
      result: [],
    })
  },

  onDeleteHistory() {
    history.clean()
    this.setData({
      historyTags: []
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historyTags = history.get()
    const hotTags = await HotSearch.getHotTags()
    this.setData({
      hotTags,
      historyTags
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