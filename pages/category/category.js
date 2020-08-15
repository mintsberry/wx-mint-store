const {
  Categories
} = require("../../model/categories");
const {
  px2rpx
} = require("../../utils/utils");
const { SpuListType } = require("../../config/constant");

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    segHeight: 0,
    activeKey: 1,
    currentSubs: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const categories = new Categories()
    await categories.init()
    const roots = categories.getRoots()
    const activeKey = roots[1].id
    const currentSubs = categories.getSubs(activeKey)
    this.setData({
      roots,
      categories,
      activeKey,
      currentSubs
    })
    this._initSegHight()
  },

  onSegChange(event) {
    const activeId = event.detail.activeKey
    const currentSubs = this.data.categories.getSubs(activeId)
    const bannerImg = this.data.categories.getBannerImg(activeId)
    this.setData({
      currentSubs,
      bannerImg
    })
  },


  goSpuList(event) {
    const cid = event.detail.cid;

    wx.navigateTo({
      url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
    })
  },

  goSearch(event) {
    wx.navigateTo({
      url: `/pages/search/search`
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

  },

  _initSegHight() {
    let systemInfo = wx.getSystemInfoSync()
    let height = px2rpx(systemInfo.windowHeight)
    const segHeight = height - 60 - 20 - 2
    this.setData({
      segHeight
    })
  }
})